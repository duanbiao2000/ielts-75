#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mock Bank 生成器：把 scripts/mock-bank.json（唯一数据源）生成 onboarding/js/mock-bank.js。
用法：python3 scripts/gen_mock_bank.py
生成产物提交入库，保证离线可用；一般不要带参数手改 mock-bank.js。
"""
import json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'scripts', 'mock-bank.json')
DST = os.path.join(ROOT, 'onboarding', 'js', 'mock-bank.js')

def main():
    with open(SRC, encoding='utf8') as f:
        sets = json.load(f)
    assert isinstance(sets, list) and sets, 'mock-bank.json 需为非空数组'
    body = json.dumps(sets, ensure_ascii=False, indent=2)
    out = (
        '/* 月度模考题库 Mock Bank —— 由 scripts/gen_mock_bank.py 自动生成，请勿手改\n'
        '   数据源：scripts/mock-bank.json（唯一可信来源），分卷素材：scripts/mock-parts/\n'
        '   结构：MOCK_BANK = [{id, month, title, difficulty, theme, blurb, coverage,\n'
        '                        listening:[{section, passage, questions:[{q, opts, right, explain}]}],\n'
        '                        speaking:{part1:[{topic,q,ref,keywords}], part2:[{topic,card,points,ref,keywords}],\n'
        '                                  part3:[{topic,q,ref,keywords}]}}]\n'
        '   每卷 125 题 · 150 分（听力 40×1 + Part1 40×1 + Part2 5×6 + Part3 40×1）\n'
        '   发布流程：编辑 mock-bank.json → python3 scripts/gen_mock_bank.py → 全套门禁 → 提交 */\n'
        'const MOCK_BANK = ' + body + ';\n'
    )
    with open(DST, 'w', encoding='utf8') as f:
        f.write(out)
    total = sum(40 + len(s['speaking']['part1']) + len(s['speaking']['part2']) + len(s['speaking']['part3']) for s in sets)
    kb = len(out.encode('utf8')) / 1024
    print(f'✅ mock-bank.js 已生成：{len(sets)} 卷 · {total} 题 · {kb:.1f} KB → {os.path.relpath(DST, ROOT)}')
    if kb > 300:
        print('⚠️ 体积超过 300KB，后续卷数增多后考虑按 T-5.5 模式分卷懒加载')

if __name__ == '__main__':
    main()
