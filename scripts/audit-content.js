#!/usr/bin/env node
/**
 * 内容抽查工具（T-6.1）：在 validate-data.js（结构层）之上做语义层抽查——
 * 重复词/句、中英覆盖比、答案泄露、关键词覆盖、引用一致性。
 * 用法：node scripts/audit-content.js   失败退出码 1。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const load = (f) => fs.readFileSync(path.join(ROOT, 'onboarding', 'js', f), 'utf8');
const src = ['practice-full.js', 'data.js', 'mock-bank.js', 'training.js', 'course.js'].map(load).join('\n');
const fn = new Function('window', 'self', 'globalThis', src +
  '\n;return {SCENARIOS, PRACTICE, DIAG_SUBJECTS, QUIZ_LESSONS, QUIZ_MODS, MOCK_BANK, LESSONS, MODULES, LESSON_PACKS, MODULE_PACKS};');
const D = fn({}, {}, {});
const errors = [];
const warns = [];

// ---- 1. 场景内容：重复词 / 空内容 / 中英覆盖比 ----
(Object.entries(D.PRACTICE)).forEach(([name, d]) => {
  // words 重复（忽略大小写）
  const wLower = d.words.map(w => String(w).toLowerCase());
  const dupW = wLower.filter((w, i) => wLower.indexOf(w) !== i);
  if (dupW.length) errors.push(`PRACTICE[${name}] words 重复：${[...new Set(dupW)].join(', ')}`);
  // phrases/adv 英文重复
  ['phrases', 'adv'].forEach(k => {
    const en = d[k].map(p => String(p[0]).toLowerCase());
    const dup = en.filter((w, i) => en.indexOf(w) !== i);
    if (dup.length) errors.push(`PRACTICE[${name}].${k} 英文重复：${[...new Set(dup)].join(', ')}`);
    // 中文释义为空或仍是英文
    d[k].forEach((p, i) => {
      if (!/[一-鿿]/.test(p[1])) warns.push(`PRACTICE[${name}].${k}[${i}] 缺中文释义：${p[0]}`);
    });
  });
  // tips 空串
  d.tips.forEach((t, i) => { if (String(t).trim().length < 6) warns.push(`PRACTICE[${name}].tips[${i}] 过短`); });
  // 对话：q 与 vars 不应完全重复；zh 应含中文；q 不应超过 40 个单词（保持可跟读）
  d.dialogs.forEach((dl, di) => {
    dl.lines.forEach((l, li) => {
      const vars = l.vars || [];
      if (vars.includes(l.q)) errors.push(`PRACTICE[${name}].dialogs[${di}].lines[${li}] vars 含与原句相同的变体`);
      if (!/[一-鿿]/.test(l.zh || '')) errors.push(`PRACTICE[${name}].dialogs[${di}].lines[${li}] 缺少中文翻译`);
      const words = String(l.q).trim().split(/\s+/).filter(Boolean).length;
      if (words > 40) warns.push(`PRACTICE[${name}].dialogs[${di}].lines[${li}] 英文句过长（${words} 词）`);
      if (String(l.q).trim().length < 2) errors.push(`PRACTICE[${name}].dialogs[${di}].lines[${li}] 英文句过短`);
    });
  });
  // 场景 task 应与对话角色一致（至少提及演练方式）
  if (!/角色扮演|模拟|自答/.test((D.SCENARIOS.find(s => s.name === name) || {}).task || ''))
    warns.push(`SCENARIOS[${name}].task 缺少演练方式关键词`);
});

// ---- 2. 测验：答案泄露 / 选项重复 / 填空题答案应可判定 ----
function auditQuiz(map, label) {
  Object.entries(map || {}).forEach(([id, list]) => {
    list.forEach((q, i) => {
      if (q.type === 'choice') {
        const opts = q.opts.map(o => String(o).trim());
        const dup = opts.filter((o, k) => opts.indexOf(o) !== k);
        if (dup.length) errors.push(`${label}[${id}].q[${i}] 选项重复：${[...new Set(dup)].join(', ')}`);
      } else if (q.type === 'fill') {
        if (String(q.stem).includes(q.answer)) warns.push(`${label}[${id}].q[${i}] 填空题 stem 直接包含答案「${q.answer}」`);
        if (String(q.answer).trim().length > 12) warns.push(`${label}[${id}].q[${i}] fill 答案过长，建议选择题`);
      }
      if (String(q.explain || '').length < 4) warns.push(`${label}[${id}].q[${i}] 解析过短`);
    });
  });
}
auditQuiz(D.QUIZ_LESSONS, 'QUIZ_LESSONS');
auditQuiz(D.QUIZ_MODS, 'QUIZ_MODS');
(D.DIAG_SUBJECTS || []).forEach(s => s.questions.forEach((q, i) => {
  const opts = q.opts.map(o => String(o).trim());
  if (new Set(opts).size !== opts.length) errors.push(`DIAG[${s.id}].q[${i}] 选项重复`);
}));

// ---- 3. 月度模考题库：关键词 ⊆ 参考答案 · 听力选项不重 · 参考答案长度 ----
(D.MOCK_BANK || []).forEach(s => {
  const tag = `MOCK(${s.id})`;
  const speak = [];
  ['part1', 'part3'].forEach(k => (s.speaking && s.speaking[k] || []).forEach(q => speak.push({ ...q, label: k })));
  (s.speaking && s.speaking.part2 || []).forEach(q => speak.push({ ...q, label: 'part2' }));
  speak.forEach((q, i) => {
    const ref = String(q.ref).toLowerCase();
    const missing = (q.keywords || []).filter(k => !ref.includes(String(k).toLowerCase()));
    if (missing.length) errors.push(`${tag}.${q.label}[${i}] keywords 未出现在参考答案：${missing.join(', ')}`);
    const refWords = String(q.ref).trim().split(/\s+/).filter(Boolean).length;
    if (q.label !== 'part2' && refWords < 25) warns.push(`${tag}.${q.label}[${i}] 参考答案偏短（${refWords} 词）`);
    if (/[一-鿿]/.test(q.q || q.card || '')) warns.push(`${tag}.${q.label}[${i}] 题干含中文`);
  });
  (s.listening || []).forEach(L => {
    (L.questions || []).forEach((q, i) => {
      const opts = (q.opts || []).map(o => String(o).trim().toLowerCase());
      if (new Set(opts).size !== opts.length) errors.push(`${tag}.${L.section} q[${i}] 选项重复`);
      if (!q.explain) errors.push(`${tag}.${L.section} q[${i}] 缺少 explain`);
    });
  });
});

// ---- 4. 课程/模块数据包：引用一致 ----
Object.entries(D.LESSON_PACKS || {}).forEach(([id, p]) => {
  (p.scenes || []).forEach(sn => {
    if (!D.PRACTICE[sn]) errors.push(`LESSON_PACKS[${id}].scenes 引用未定义场景：${sn}`);
  });
});
Object.entries(D.MODULE_PACKS || {}).forEach(([id, p]) => {
  (p.tasks || []).forEach(t => {
    if (t.scene && !D.PRACTICE[t.scene]) errors.push(`MODULE_PACKS[${id}].tasks 引用未定义场景：${t.scene}`);
  });
  (p.linkScenes || []).forEach(sn => {
    if (!D.PRACTICE[sn]) errors.push(`MODULE_PACKS[${id}].linkScenes 引用未定义场景：${sn}`);
  });
});

// ---- 输出 ----
console.log('内容抽查：场景 ' + Object.keys(D.PRACTICE).length +
  ' 个 · 课程 ' + Object.keys(D.LESSON_PACKS).length + ' · 模块 ' + Object.keys(D.MODULE_PACKS).length +
  ' · 测验 ' + (Object.keys(D.QUIZ_LESSONS).length + Object.keys(D.QUIZ_MODS).length) + ' 套');
if (warns.length) {
  console.log('\n⚠️ 建议复核（' + warns.length + ' 项，不阻断）：');
  warns.slice(0, 20).forEach(w => console.log('  - ' + w));
  if (warns.length > 20) console.log('  … 其余 ' + (warns.length - 20) + ' 项省略');
}
if (errors.length) {
  console.error('\n❌ 抽查失败（' + errors.length + ' 项）：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('\n✅ 内容抽查通过：无重复/泄露/引用错误。');
