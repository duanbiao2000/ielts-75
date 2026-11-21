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
const src = fs.readFileSync(dataFile, 'utf8');

let data;
try {
  // data.js 以 const 声明全局变量，用 Function 在沙箱中执行并捕获
  const sandbox = {};
  const fn = new Function('window', 'self', 'globalThis', src + '\n;return {LESSONS,SCENARIOS,SCEN_DOMAINS,MODULES,BADGES,PRACTICE};');
  data = fn(sandbox, sandbox, sandbox);
} catch (e) {
  console.error('❌ 数据文件语法/解析错误：' + e.message);
  process.exit(1);
}

const { LESSONS, SCENARIOS, SCEN_DOMAINS, MODULES, BADGES, PRACTICE } = data;
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
});

// ---- 输出 ----
console.log('数据校验：LESSONS=' + LESSONS.length + '，SCENARIOS=' + SCENARIOS.length +
  '，MODULES=' + MODULES.length + '，BADGES=' + BADGES.length +
  '，PRACTICE=' + Object.keys(PRACTICE || {}).length);

if (errors.length) {
  console.error('\n❌ 校验失败（' + errors.length + ' 项）：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('✅ 校验通过：结构完整、键名对齐、字段合法。');
