#!/usr/bin/env node
/**
 * 数据校验工具：检查 onboarding/js/data.js 的结构完整性、
 * 引号转义（由 node 解析保证）、键名对齐等。
 * 用法：node scripts/validate-data.js
 * 校验失败退出码 1，成功 0。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const dataFile = path.join(ROOT, 'onboarding', 'js', 'data.js');
const fullFile = path.join(ROOT, 'onboarding', 'js', 'practice-full.js');
const trainFile = path.join(ROOT, 'onboarding', 'js', 'training.js');
// 加载顺序：practice-full → data → training（data.js 中 PRACTICE 引用 PRACTICE_FULL）
const fullSrc = fs.readFileSync(fullFile, 'utf8');
const src = fullSrc + '\n' + fs.readFileSync(dataFile, 'utf8') + '\n' + fs.readFileSync(trainFile, 'utf8');

let data;
try {
  // 以 const 声明全局变量，用 Function 在沙箱中执行并捕获
  const sandbox = {};
  const fn = new Function('window', 'self', 'globalThis', src + '\n;return {LESSONS,SCENARIOS,SCEN_DOMAINS,MODULES,BADGES,PRACTICE,DIAG_SUBJECTS,QUIZ_LESSONS,QUIZ_MODS,MOCK_EXAM};');
  data = fn(sandbox, sandbox, sandbox);
} catch (e) {
  console.error('❌ 数据文件语法/解析错误：' + e.message);
  process.exit(1);
}

const { LESSONS, SCENARIOS, SCEN_DOMAINS, MODULES, BADGES, PRACTICE, DIAG_SUBJECTS, QUIZ_LESSONS, QUIZ_MODS, MOCK_EXAM } = data;
const errors = [];
const warns = [];

function uniq(arr, get, label) {
  const seen = new Set();
  const dup = [];
  for (const x of arr) {
    const k = get(x);
    if (seen.has(k)) dup.push(k);
    seen.add(k);
  }
  if (dup.length) errors.push(`${label} 存在重复键：${dup.join(', ')}`);
}

// ---- LESSONS ----
if (!Array.isArray(LESSONS) || LESSONS.length === 0) errors.push('LESSONS 为空或非数组');
uniq(LESSONS, x => x.id, 'LESSONS');
LESSONS.forEach((l, i) => {
  if (!l.id || !l.title || !l.path) errors.push(`LESSONS[${i}] 缺少 id/title/path`);
  if (!Array.isArray(l.points) || l.points.length === 0) errors.push(`LESSONS[${i}] points 为空`);
});

// ---- SCENARIOS ----
if (!Array.isArray(SCENARIOS) || SCENARIOS.length === 0) errors.push('SCENARIOS 为空或非数组');
uniq(SCENARIOS, x => x.name, 'SCENARIOS');
SCENARIOS.forEach((s, i) => {
  if (!s.name || !s.blurb || !s.expr || !s.task) errors.push(`SCENARIOS[${i}] 缺少 name/blurb/expr/task`);
  if (!SCEN_DOMAINS.includes(s.d)) errors.push(`SCENARIOS[${i}]（${s.name}）领域 "${s.d}" 不在 SCEN_DOMAINS`);
});

// ---- SCEN_DOMAINS ----
if (!Array.isArray(SCEN_DOMAINS) || SCEN_DOMAINS.length === 0) errors.push('SCEN_DOMAINS 为空或非数组');

// ---- MODULES ----
if (!Array.isArray(MODULES) || MODULES.length === 0) errors.push('MODULES 为空或非数组');
uniq(MODULES, x => x.id, 'MODULES');
MODULES.forEach((m, i) => {
  if (!m.id || !m.title || !m.path) errors.push(`MODULES[${i}] 缺少 id/title/path`);
  if (!['P0', 'P1', 'P2'].includes(m.p)) errors.push(`MODULES[${i}]（${m.title}）优先级 "${m.p}" 非法`);
});

// ---- BADGES ----
if (!Array.isArray(BADGES) || BADGES.length === 0) errors.push('BADGES 为空或非数组');
uniq(BADGES, x => x.id, 'BADGES');
BADGES.forEach((b, i) => {
  if (!b.id || !b.name || !b.desc) errors.push(`BADGES[${i}] 缺少 id/name/desc`);
});

// ---- PRACTICE 与 SCENARIOS 键名对齐 ----
const scenNames = SCENARIOS.map(s => s.name);
const pracKeys = Object.keys(PRACTICE || {});
const missing = scenNames.filter(n => !pracKeys.includes(n));
const extra = pracKeys.filter(k => !scenNames.includes(k));
if (missing.length) errors.push('PRACTICE 缺失场景：' + missing.join(', '));
if (extra.length) errors.push('PRACTICE 多余场景（SCENARIOS 无）：' + extra.join(', '));

// ---- PRACTICE 结构 ----
(Object.entries(PRACTICE || {})).forEach(([name, d]) => {
  if (!d.roleA || !d.roleB) errors.push(`PRACTICE[${name}] 缺少 roleA/roleB`);
  if (!Array.isArray(d.ex) || d.ex.length < 3) errors.push(`PRACTICE[${name}] ex 少于 3 回合`);
  if (!Array.isArray(d.checks) || d.checks.length < 3 || d.checks.length > 4) errors.push(`PRACTICE[${name}] checks 数量需在 3-4 条`);
  (d.ex || []).forEach((t, i) => {
    if (!t.b || !t.b.q || !t.b.zh) errors.push(`PRACTICE[${name}].ex[${i}] 缺少 b.q/b.zh`);
    if (!t.a || !t.a.q || !t.a.zh) errors.push(`PRACTICE[${name}].ex[${i}] 缺少 a.q/a.zh`);
  });
  // 完整内容包字段（批次1）
  if (!Array.isArray(d.words) || d.words.length < 6) errors.push(`PRACTICE[${name}] words 少于 6 个`);
  if (!Array.isArray(d.phrases) || d.phrases.length < 6) errors.push(`PRACTICE[${name}] phrases 少于 6 条`);
  (d.phrases || []).forEach((p, i) => {
    if (!Array.isArray(p) || p.length < 2 || !p[0] || !p[1]) errors.push(`PRACTICE[${name}].phrases[${i}] 需为 [en, zh]`);
  });
  if (!Array.isArray(d.adv) || d.adv.length < 5) errors.push(`PRACTICE[${name}] adv 少于 5 条`);
  (d.adv || []).forEach((p, i) => {
    if (!Array.isArray(p) || p.length < 2 || !p[0] || !p[1]) errors.push(`PRACTICE[${name}].adv[${i}] 需为 [en, zh]`);
  });
  if (!Array.isArray(d.tips) || d.tips.length < 3) errors.push(`PRACTICE[${name}] tips 少于 3 条`);
  if (!Array.isArray(d.dialogs) || d.dialogs.length !== 2) errors.push(`PRACTICE[${name}] dialogs 需为 2 段`);
  (d.dialogs || []).forEach((dl, i) => {
    if (!dl.title || !Array.isArray(dl.lines)) errors.push(`PRACTICE[${name}].dialogs[${i}] 缺少 title/lines`);
    (dl.lines || []).forEach((l, j) => {
      if (!l.who || !l.q || !l.zh) errors.push(`PRACTICE[${name}].dialogs[${i}].lines[${j}] 缺少 who/q/zh`);
      if (!Array.isArray(l.vars) || l.vars.length < 2) errors.push(`PRACTICE[${name}].dialogs[${i}].lines[${j}] vars 少于 2 个变体`);
    });
  });
});

// ---- 训练闭环数据（批次3） ----
// T-3.1 四科诊断
(DIAG_SUBJECTS || []).forEach(s => {
  if (!s.id || !s.name || !Array.isArray(s.questions) || s.questions.length < 3)
    errors.push(`DIAG_SUBJECTS[${s.id}] 需含 id/name 且 questions≥3`);
  (s.questions || []).forEach((q, i) => {
    if (!q.stem || !Array.isArray(q.opts) || typeof q.right!=='number')
      errors.push(`DIAG_SUBJECTS[${s.id}].questions[${i}] 缺少 stem/opts/right`);
    if (!q.explain) errors.push(`DIAG_SUBJECTS[${s.id}].questions[${i}] 缺少 explain`);
  });
});
// T-3.2 单元测验
function validateQuiz(map, label, keys) {
  if (!map || typeof map!=='object') { errors.push(`${label} 缺失`); return; }
  keys.forEach(k => {
    if (!map[k]) { errors.push(`${label}[${k}] 缺失`); return; }
    if (!Array.isArray(map[k]) || map[k].length < 2) errors.push(`${label}[${k}] 测验题少于 2 题`);
    (map[k]||[]).forEach((q, i) => {
      if (!q.stem) errors.push(`${label}[${k}].q[${i}] 缺少 stem`);
      if (q.type==='choice') {
        if (!Array.isArray(q.opts) || typeof q.right!=='number') errors.push(`${label}[${k}].q[${i}] choice 需 opts/right`);
      } else if (q.type==='fill') {
        if (!q.answer) errors.push(`${label}[${k}].q[${i}] fill 需 answer`);
      } else errors.push(`${label}[${k}].q[${i}] type 非法`);
      if (!q.explain) errors.push(`${label}[${k}].q[${i}] 缺少 explain`);
    });
  });
}
const lessonIds = (LESSONS||[]).map(l=>l.id);
const modIds = (MODULES||[]).map(m=>m.id);
validateQuiz(QUIZ_LESSONS, 'QUIZ_LESSONS', lessonIds);
validateQuiz(QUIZ_MODS, 'QUIZ_MODS', modIds);
// T-3.3 模考
if (MOCK_EXAM) {
  (MOCK_EXAM.speaking||[]).forEach((q,i)=>{
    if (!q.part || !q.q || !q.ref || !Array.isArray(q.keywords) || q.keywords.length<3)
      errors.push(`MOCK_EXAM.speaking[${i}] 需 part/q/ref/keywords(≥3)`);
  });
  (MOCK_EXAM.listening||[]).forEach((q,i)=>{
    if (!q.section || !q.q || !Array.isArray(q.opts) || typeof q.right!=='number')
      errors.push(`MOCK_EXAM.listening[${i}] 需 section/q/opts/right`);
  });
} else errors.push('MOCK_EXAM 缺失');

// ---- 输出 ----
console.log('数据校验：LESSONS=' + LESSONS.length + '，SCENARIOS=' + SCENARIOS.length +
  '，MODULES=' + MODULES.length + '，BADGES=' + BADGES.length +
  '，PRACTICE=' + Object.keys(PRACTICE || {}).length +
  '，DIAG=' + (DIAG_SUBJECTS||[]).length + '科' +
  '，QUIZ=' + Object.keys(QUIZ_LESSONS||{}).length + '+' + Object.keys(QUIZ_MODS||{}).length +
  '，MOCK=口语' + (MOCK_EXAM?MOCK_EXAM.speaking.length:0) + '/听力' + (MOCK_EXAM?MOCK_EXAM.listening.length:0));

if (errors.length) {
  console.error('\n❌ 校验失败（' + errors.length + ' 项）：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('✅ 校验通过：结构完整、键名对齐、字段合法。');
