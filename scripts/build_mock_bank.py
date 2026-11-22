#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mock Bank 组装器：把分卷素材（scripts/mock-parts/*.json）组装为 scripts/mock-bank.json（唯一数据源）。
用法：python3 scripts/build_mock_bank.py
说明：
  - 每卷由 mock-parts/ 下的 {卷-meta,卷-listening-s1..s4,卷-part1,卷-part2,卷-part3}.json 组成；
  - 话题 id 与 materials/mock/topic-matrix.json 对齐校验；
  - 组装时去掉 part1/part3 的冗余 part 标签（引擎按数组位置标注 Part 1/2/3）。
"""
import json, re, sys, glob, os
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PARTS = os.path.join(ROOT, 'scripts', 'mock-parts')
MATRIX = os.path.join(ROOT, 'materials', 'mock', 'topic-matrix.json')
OUT = os.path.join(ROOT, 'scripts', 'mock-bank.json')

def load(p):
    with open(p, encoding='utf8') as f:
        return json.load(f)

def main():
    matrix = load(MATRIX)
    p1_ids = {t['id'] for t in matrix['p1']}
    p2_ids = {t['id'] for t in matrix['p2']}
    p3_ids = {t['id'] for t in matrix['p3']}
    all_ids = p1_ids | p2_ids | p3_ids

    meta_files = sorted(glob.glob(os.path.join(PARTS, '*-meta.json')))
    if not meta_files:
        sys.exit('❌ 未找到任何 *-meta.json，先在 scripts/mock-parts/ 准备分卷素材')

    sets = []
    for mf in meta_files:
        meta = load(mf)
        month = meta['month']
        assert re.fullmatch(r'\d{4}-(0[1-9]|1[0-2])', month), f'{mf}: month 非法：{month}'
        vol = month
        listening = []
        for s in range(1, 5):
            sp = os.path.join(PARTS, f'{vol}-listening-s{s}.json')
            if not os.path.exists(sp):
                sys.exit(f'❌ 缺少 {sp}')
            d = load(sp)
            listening.append({'section': d['section'], 'passage': d['passage'].strip(), 'questions': d['questions']})
        part1 = load(os.path.join(PARTS, f'{vol}-part1.json'))
        part2 = load(os.path.join(PARTS, f'{vol}-part2.json'))
        part3 = load(os.path.join(PARTS, f'{vol}-part3.json'))

        # 结构计数
        assert len(listening) == 4, f'{vol}: listening 需 4 Section'
        for L in listening:
            assert len(L['questions']) == 10, f"{vol} {L['section']}: 需 10 题，实际 {len(L['questions'])}"
        assert len(part1) == 40, f'{vol}: part1 需 40 问，实际 {len(part1)}'
        assert len(part2) == 5, f'{vol}: part2 需 5 卡，实际 {len(part2)}'
        assert len(part3) == 40, f'{vol}: part3 需 40 问，实际 {len(part3)}'

        # part1 话题分布：8 话题×5 问；话题必须在矩阵 P1
        c1 = Counter(q['topic'] for q in part1)
        for t in c1:
            assert t in p1_ids, f'{vol}: part1 未知话题 id {t}'
        for t, n in c1.items():
            assert n == 5, f'{vol}: part1 话题 {t} 需 5 问，实际 {n}'
        assert len(c1) == 8, f'{vol}: part1 需 8 话题，实际 {len(c1)}'

        # part2：卡与话题在矩阵 P2
        c2 = Counter(q['topic'] for q in part2)
        for t in c2:
            assert t in p2_ids, f'{vol}: part2 未知话题 id {t}'

        # part3：类别在矩阵 P3；必须覆盖 7 个类别
        c3 = Counter(q['topic'] for q in part3)
        for t in c3:
            assert t in p3_ids, f'{vol}: part3 未知类别 id {t}'
        missing_p3 = p3_ids - set(c3)
        assert not missing_p3, f'{vol}: part3 缺类别 {missing_p3}'

        # 去掉冗余 part 标签
        p1_clean = [{k: v for k, v in q.items() if k != 'part'} for q in part1]
        p2_clean = [{k: v for k, v in q.items() if k != 'part'} for q in part2]
        p3_clean = [{k: v for k, v in q.items() if k != 'part'} for q in part3]

        actual_cov = set(c1) | set(c2) | set(c3)
        declared_cov = set(meta.get('coverage', []))
        assert declared_cov <= all_ids, f'{vol}: coverage 含未知 id {declared_cov - all_ids}'
        if declared_cov != actual_cov:
            extra = declared_cov - actual_cov
            miss = actual_cov - declared_cov
            print(f'⚠️  {vol}: coverage 与实际题目不一致' + (f'（声明多出 {sorted(extra)}）' if extra else '') + (f'（实际多出 {sorted(miss)}）' if miss else ''))
            meta['coverage'] = sorted(actual_cov)
            print(f'    → 已自动修正 coverage 为 {sorted(actual_cov)}')

        sets.append({
            'id': meta['id'],
            'month': month,
            'title': meta['title'],
            'difficulty': meta['difficulty'],
            'theme': meta['theme'],
            'blurb': meta['blurb'],
            'coverage': sorted(set(meta['coverage'])),
            'listening': listening,
            'speaking': {'part1': p1_clean, 'part2': p2_clean, 'part3': p3_clean},
        })

    sets.sort(key=lambda s: s['month'])
    months = [s['month'] for s in sets]
    assert len(set(months)) == len(months), 'month 重复'
    assert len({s['id'] for s in sets}) == len(sets), 'id 重复'

    with open(OUT, 'w', encoding='utf8') as f:
        json.dump(sets, f, ensure_ascii=False, indent=2)

    total_q = sum(len(L['questions']) for s in sets for L in s['listening']) + \
              sum(len(s['speaking']['part1']) + len(s['speaking']['part2']) + len(s['speaking']['part3']) for s in sets)
    print(f'✅ mock-bank.json 已生成：{len(sets)} 卷 · 共 {total_q} 题 → {os.path.relpath(OUT, ROOT)}')
    for s in sets:
        p1t = len({q['topic'] for q in s['speaking']['part1']})
        p3c = len({q['topic'] for q in s['speaking']['part3']})
        print(f"   {s['month']}《{s['title']}》听力 40 · P1 {len(s['speaking']['part1'])}问/{p1t}话题 · P2 {len(s['speaking']['part2'])}卡 · P3 {len(s['speaking']['part3'])}问/{p3c}类别 · max=150")

if __name__ == '__main__':
    main()
