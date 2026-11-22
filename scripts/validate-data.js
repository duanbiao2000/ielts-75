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
const courseFile = path.join(ROOT, 'onboarding', 'js', 'course.js');
const bankFile = path.join(ROOT, 'onboarding', 'js', 'mock-bank.js');
const topicMatrixFile = path.join(ROOT, 'materials', 'mock', 'topic-matrix.json');
// 加载顺序：practice-full → data → mock-bank → training → course（data.js 中 PRACTICE 引用 PRACTICE_FULL）
const fullSrc = fs.readFileSync(fullFile, 'utf8');
const src = fullSrc + '\n' + fs.readFileSync(dataFile, 'utf8') + '\n' + fs.readFileSync(bankFile, 'utf8') + '\n' + fs.readFileSync(trainFile, 'utf8') + '\n' + fs.readFileSync(courseFile, 'utf8');

let data;
try {
  // 以 const 声明全局变量，用 Function 在沙箱中执行并捕获
  const sandbox = {};
  const fn = new Function('window', 'self', 'globalThis', src + '\n;return {LESSONS,SCENARIOS,SCEN_DOMAINS,MODULES,BADGES,PRACTICE,DIAG_SUBJECTS,QUIZ_LESSONS,QUIZ_MODS,MOCK_BANK,LESSON_PACKS,MODULE_PACKS};');
  data = fn(sandbox, sandbox, sandbox);
} catch (e) {
  console.error('❌ 数据文件语法/解析错误：' + e.message);
  process.exit(1);
}

const { LESSONS, SCENARIOS, SCEN_DOMAINS, MODULES, BADGES, PRACTICE, DIAG_SUBJECTS, QUIZ_LESSONS, QUIZ_MODS, MOCK_BANK, LESSON_PACKS, MODULE_PACKS } = data;
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
const BADGE_CATS = ['课程', '场景', '模块', '测评', '复习', '坚持', '进阶'];
const BADGE_COND = ['arr', 'scenDomain', 'modP', 'checkinDays', 'refresh', 'mock', 'mockBest', 'streak', 'level', 'all'];
BADGES.forEach((b, i) => {
  if (!b.id || !b.name || !b.desc || !b.em) errors.push(`BADGES[${i}] 缺少 id/em/name/desc`);
  if (!BADGE_CATS.includes(b.cat)) errors.push(`BADGES[${i}]（${b.name}）cat 非法：${b.cat}`);
  const c = b.cond;
  if (!c || !BADGE_COND.includes(c.t)) { errors.push(`BADGES[${i}]（${b.name}）cond.t 非法`); return; }
  const need = (condArr, keys) => { keys.forEach(k => { if (condArr[k] === undefined) errors.push(`BADGES[${i}]（${b.name}）cond 缺少 ${k}`); }); };
  if (c.t === 'arr') need(c, ['f', 'min']);
  if (c.t === 'scenDomain') need(c, ['d', 'min']);
  if (c.t === 'modP') { need(c, ['p', 'min']); if (c.p && !['P0', 'P1', 'P2'].includes(c.p)) errors.push(`BADGES[${i}] modP 优先级非法`); }
  if (['checkinDays', 'refresh', 'mockBest', 'streak', 'level'].includes(c.t)) need(c, ['min']);
  if (c.t === 'all') { if (!Array.isArray(c.of) || !c.of.every(p => Array.isArray(p) && p.length === 2)) errors.push(`BADGES[${i}] all.of 需为 [[field,min],…]`); }
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
// T-3.3 月度模考题库（每卷 125 题 / 150 分）
let topicMatrix = null;
try { topicMatrix = JSON.parse(fs.readFileSync(topicMatrixFile, 'utf8')); }
catch (e) { errors.push('topic-matrix.json 解析失败：' + e.message); }
const matrixIds = topicMatrix ? new Set([...topicMatrix.p1, ...topicMatrix.p2, ...topicMatrix.p3].map(t => t.id)) : new Set();
if (!Array.isArray(MOCK_BANK) || MOCK_BANK.length === 0) {
  errors.push('MOCK_BANK 缺失或为空');
} else {
  uniq(MOCK_BANK, x => x.id, 'MOCK_BANK');
  uniq(MOCK_BANK, x => x.month, 'MOCK_BANK');
  MOCK_BANK.forEach((s, i) => {
    const tag = `MOCK_BANK[${i}]（${s.id || '?'}）`;
    if (!s.id || !/^mock-\d{4}-(0[1-9]|1[0-2])$/.test(s.id)) errors.push(`${tag} id 需为 mock-YYYY-MM`);
    if (!s.month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(s.month)) errors.push(`${tag} month 非法：${s.month}`);
    if (s.id && s.month && s.id !== 'mock-' + s.month) errors.push(`${tag} id 与 month 不一致`);
    if (!s.title || !s.blurb) errors.push(`${tag} 缺少 title/blurb`);
    if (!['基础', '进阶', '冲刺'].includes(s.difficulty)) errors.push(`${tag} difficulty 非法：${s.difficulty}`);
    if (!s.theme) errors.push(`${tag} 缺少 theme`);
    // 听力：4 Section × 10 题 × 1 分
    if (!Array.isArray(s.listening) || s.listening.length !== 4) {
      errors.push(`${tag} listening 需 4 个 Section`);
    } else {
      s.listening.forEach((L, j) => {
        const ltag = `${tag} listening[${j}]（${L.section || '?'}）`;
        if (!L.section) errors.push(`${ltag} 缺少 section`);
        const words = String(L.passage || '').trim().split(/\s+/).filter(Boolean).length;
        if (words < 300) errors.push(`${ltag} passage 少于 300 词（${words}）`);
        if (!Array.isArray(L.questions) || L.questions.length !== 10) {
          errors.push(`${ltag} 需 10 题`);
        } else {
          L.questions.forEach((q, k) => {
            if (!q.q) errors.push(`${ltag} q[${k}] 缺少题干`);
            if (!Array.isArray(q.opts) || q.opts.length !== 4) errors.push(`${ltag} q[${k}] 需 4 个选项`);
            else {
              const norm = q.opts.map(o => String(o).trim().toLowerCase());
              if (new Set(norm).size !== 4) errors.push(`${ltag} q[${k}] 选项重复`);
            }
            if (typeof q.right !== 'number' || q.right < 0 || q.right > 3) errors.push(`${ltag} q[${k}] right 越界`);
            if (!q.explain) errors.push(`${ltag} q[${k}] 缺少 explain`);
          });
        }
      });
    }
    // 口语：Part 1 40 问 / Part 2 5 卡 / Part 3 40 问
    const sp = s.speaking || {};
    const p1 = sp.part1 || [], p2 = sp.part2 || [], p3 = sp.part3 || [];
    if (p1.length !== 40) errors.push(`${tag} Part 1 需 40 问，实际 ${p1.length}`);
    if (p2.length !== 5) errors.push(`${tag} Part 2 需 5 卡，实际 ${p2.length}`);
    if (p3.length !== 40) errors.push(`${tag} Part 3 需 40 问，实际 ${p3.length}`);
    const speakCheck = (arr, label, minKw) => arr.forEach((q, k) => {
      if (!q.q && !q.card) errors.push(`${tag} ${label}[${k}] 缺少题干/卡片`);
      if (!q.ref) errors.push(`${tag} ${label}[${k}] 缺少 ref`);
      if (!Array.isArray(q.keywords) || q.keywords.length < minKw) errors.push(`${tag} ${label}[${k}] keywords 少于 ${minKw} 个`);
      if (q.topic && !matrixIds.has(q.topic)) errors.push(`${tag} ${label}[${k}] 未知话题 id：${q.topic}`);
    });
    speakCheck(p1, 'part1', 3);
    speakCheck(p2, 'part2', 3);
    speakCheck(p3, 'part3', 3);
    p2.forEach((c, k) => {
      if (!Array.isArray(c.points) || c.points.length < 3) errors.push(`${tag} part2[${k}] points 少于 3 条`);
    });
    // coverage：必须为话题矩阵内 id
    if (!Array.isArray(s.coverage) || s.coverage.length === 0) {
      errors.push(`${tag} coverage 缺失`);
    } else {
      s.coverage.forEach(id => { if (!matrixIds.has(id)) errors.push(`${tag} coverage 未知话题 id：${id}`); });
    }
  });
}

// ---- 课程与模块训练数据（批次2） ----
const scenNameSet = new Set(scenNames);
// T-2.1 LESSON_PACKS
if (!LESSON_PACKS || typeof LESSON_PACKS !== 'object') {
  errors.push('LESSON_PACKS 缺失');
} else {
  lessonIds.forEach(id => {
    const p = LESSON_PACKS[id];
    if (!p) { errors.push(`LESSON_PACKS[${id}] 缺失`); return; }
    if (typeof p.est !== 'number' || p.est <= 0) errors.push(`LESSON_PACKS[${id}] est 需为正数`);
    if (!Array.isArray(p.takeaways) || p.takeaways.length < 3) errors.push(`LESSON_PACKS[${id}] takeaways 少于 3 条`);
    (p.scenes || []).forEach(sn => { if (!scenNameSet.has(sn)) errors.push(`LESSON_PACKS[${id}].scenes 引用不存在场景：${sn}`); });
    if (!Array.isArray(p.scenes) || p.scenes.length === 0) errors.push(`LESSON_PACKS[${id}] scenes 需至少 1 个`);
    if (!Array.isArray(p.practice) || p.practice.length < 2) errors.push(`LESSON_PACKS[${id}] practice 少于 2 题`);
    (p.practice || []).forEach((q, i) => {
      if (!q.stem) errors.push(`LESSON_PACKS[${id}].practice[${i}] 缺少 stem`);
      if (q.type === 'choice') {
        if (!Array.isArray(q.opts) || q.opts.length !== 4) errors.push(`LESSON_PACKS[${id}].practice[${i}] choice 需 4 个 opts`);
        if (typeof q.right !== 'number' || q.right < 0 || q.right > 3) errors.push(`LESSON_PACKS[${id}].practice[${i}] right 越界`);
      } else if (q.type === 'fill') {
        if (!q.answer) errors.push(`LESSON_PACKS[${id}].practice[${i}] fill 需 answer`);
      } else errors.push(`LESSON_PACKS[${id}].practice[${i}] type 非法`);
      if (!q.explain) errors.push(`LESSON_PACKS[${id}].practice[${i}] 缺少 explain`);
    });
  });
  Object.keys(LESSON_PACKS).forEach(k => { if (!lessonIds.includes(k)) errors.push(`LESSON_PACKS 多余键：${k}`); });
}
// T-2.4 MODULE_PACKS
if (!MODULE_PACKS || typeof MODULE_PACKS !== 'object') {
  errors.push('MODULE_PACKS 缺失');
} else {
  modIds.forEach(id => {
    const p = MODULE_PACKS[id];
    if (!p) { errors.push(`MODULE_PACKS[${id}] 缺失`); return; }
    if (!p.target) errors.push(`MODULE_PACKS[${id}] 缺少 target`);
    if (!Array.isArray(p.linkScenes) || p.linkScenes.length === 0) errors.push(`MODULE_PACKS[${id}] linkScenes 需至少 1 个`);
    (p.linkScenes || []).forEach(sn => { if (!scenNameSet.has(sn)) errors.push(`MODULE_PACKS[${id}].linkScenes 引用不存在场景：${sn}`); });
    if (!Array.isArray(p.tasks) || p.tasks.length < 3) errors.push(`MODULE_PACKS[${id}] tasks 少于 3 个`);
    const tids = new Set();
    (p.tasks || []).forEach((t, i) => {
      if (!t.id || !t.id.startsWith(id)) errors.push(`MODULE_PACKS[${id}].tasks[${i}] id "${t.id}" 需以 ${id} 开头`);
      if (tids.has(t.id)) errors.push(`MODULE_PACKS[${id}].tasks[${i}] id 重复`);
      tids.add(t.id);
      if (!t.text) errors.push(`MODULE_PACKS[${id}].tasks[${i}] 缺少 text`);
      if (typeof t.est !== 'number' || t.est <= 0) errors.push(`MODULE_PACKS[${id}].tasks[${i}] est 需为正数`);
      if (t.scene && !scenNameSet.has(t.scene)) errors.push(`MODULE_PACKS[${id}].tasks[${i}].scene 引用不存在场景：${t.scene}`);
    });
    // 至少一个可演练任务（双向同步锚点）
    if (!(p.tasks || []).some(t => t.scene)) errors.push(`MODULE_PACKS[${id}] 需至少 1 个带 scene 的演练任务`);
  });
  Object.keys(MODULE_PACKS).forEach(k => { if (!modIds.includes(k)) errors.push(`MODULE_PACKS 多余键：${k}`); });
}

// ---- 输出 ----
console.log('数据校验：LESSONS=' + LESSONS.length + '，SCENARIOS=' + SCENARIOS.length +
  '，MODULES=' + MODULES.length + '，BADGES=' + BADGES.length +
  '，PRACTICE=' + Object.keys(PRACTICE || {}).length +
  '，DIAG=' + (DIAG_SUBJECTS||[]).length + '科' +
  '，QUIZ=' + Object.keys(QUIZ_LESSONS||{}).length + '+' + Object.keys(QUIZ_MODS||{}).length +
  '，MOCK=' + (MOCK_BANK?MOCK_BANK.length:0) + '卷×150分' +
  '，COURSE=课' + Object.keys(LESSON_PACKS||{}).length + '/模块' + Object.keys(MODULE_PACKS||{}).length);

if (errors.length) {
  console.error('\n❌ 校验失败（' + errors.length + ' 项）：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('✅ 校验通过：结构完整、键名对齐、字段合法。');
