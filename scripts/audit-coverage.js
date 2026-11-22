#!/usr/bin/env node
/**
 * 模考题库覆盖审计（Mock Bank · 全量承诺）：
 *  ① 每卷 coverage 字段与该卷实际题目话题一致；
 *  ② 每卷 Part 3 覆盖全部 7 个话题类别；
 *  ③ 卷内单一 P1 话题占比 ≤ 25%（防换皮）；
 *  ④ 全库 P1 历史话题覆盖率 = 100%（74/74，满 10 卷后强制断言；不足 10 卷时打印进度）；
 *  ⑤ 全库 Part 2 覆盖 ≥ 45%（60 张历史卡中不少于 27 张，满 10 卷后强制断言）。
 * 用法：node scripts/audit-coverage.js   失败退出码 1。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'onboarding', 'js', 'mock-bank.js'), 'utf8');
const fn = new Function('window', 'self', 'globalThis', src + '\n;return MOCK_BANK;');
const MOCK_BANK = fn({}, {}, {});
const matrix = JSON.parse(fs.readFileSync(path.join(ROOT, 'materials', 'mock', 'topic-matrix.json'), 'utf8'));
const P1_IDS = matrix.p1.map(t => t.id);
const P2_IDS = new Set(matrix.p2.map(t => t.id));
const P3_IDS = matrix.p3.map(t => t.id);

const errors = [];
const notes = [];

if (!Array.isArray(MOCK_BANK) || MOCK_BANK.length === 0) {
  console.error('❌ MOCK_BANK 缺失或为空');
  process.exit(1);
}

const fullP1 = new Set();
const fullP2 = new Set();
const fullP3 = new Set();

MOCK_BANK.forEach(s => {
  const tag = `MOCK(${s.id})`;
  const sp = s.speaking || {};
  const p1 = sp.part1 || [], p2 = sp.part2 || [], p3 = sp.part3 || [];
  const used = new Set([...p1, ...p2, ...p3].map(q => q.topic));
  const declared = new Set(s.coverage || []);

  // ④ 卷内 coverage 与实际一致
  const onlyDecl = [...declared].filter(id => !used.has(id));
  const onlyUsed = [...used].filter(id => !declared.has(id));
  if (onlyDecl.length) errors.push(`${tag} coverage 声明了未用到的话题：${onlyDecl.join(', ')}`);
  if (onlyUsed.length) errors.push(`${tag} 题目用到但 coverage 未声明：${onlyUsed.join(', ')}`);

  // ① P3 七类全覆盖（每卷）
  const p3Used = new Set(p3.map(q => q.topic));
  const p3Missing = P3_IDS.filter(id => !p3Used.has(id));
  if (p3Missing.length) errors.push(`${tag} Part 3 缺类别：${p3Missing.join(', ')}`);

  // ② 卷内单一 P1 话题占比 ≤ 25%
  const p1Count = {};
  p1.forEach(q => { p1Count[q.topic] = (p1Count[q.topic] || 0) + 1; });
  Object.entries(p1Count).forEach(([t, n]) => {
    const share = n / p1.length;
    if (share > 0.25) errors.push(`${tag} P1 话题 ${t} 占比 ${(share * 100).toFixed(0)}% > 25%`);
  });

  p1.forEach(q => fullP1.add(q.topic));
  p2.forEach(q => fullP2.add(q.topic));
  p3.forEach(q => fullP3.add(q.topic));
});

// ③ 全库 P1 / Part2 覆盖
const p1Cov = P1_IDS.filter(id => fullP1.has(id));
const p1Pct = Math.round((p1Cov.length / P1_IDS.length) * 100);
const p2Count = [...fullP2].filter(id => P2_IDS.has(id)).length;
const p2Pct = Math.round((p2Count / P2_IDS.size) * 100);
const IS_FULL_BANK = MOCK_BANK.length >= 10;
notes.push(`P1 历史话题覆盖：${p1Cov.length}/${P1_IDS.length}（${p1Pct}%）`);
notes.push(`Part 2 卡片覆盖：${p2Count}/${P2_IDS.size}（${p2Pct}%，目标 ≥45%）`);
notes.push(`Part 3 类别覆盖：${fullP3.size}/${P3_IDS.length}`);
if (IS_FULL_BANK) {
  if (p1Cov.length !== P1_IDS.length) errors.push(`全库 P1 覆盖率 ${p1Pct}% < 100%（缺 ${P1_IDS.filter(id => !fullP1.has(id)).join(', ')}）`);
  if (p2Pct < 45) errors.push(`全库 Part 2 覆盖率 ${p2Pct}% < 45%`);
  if (fullP3.size !== P3_IDS.length) errors.push('全库 Part 3 类别未全覆盖');
} else {
  notes.push(`（当前 ${MOCK_BANK.length}/10 卷，满 10 卷后强制断言 100% / 45% / 7 类全覆盖）`);
}

console.log('覆盖审计：');
notes.forEach(n => console.log('  · ' + n));
if (errors.length) {
  console.error('\n❌ 覆盖审计失败（' + errors.length + ' 项）：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('✅ 覆盖审计通过。');
