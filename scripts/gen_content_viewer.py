#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
内容阅读器素材同步器：把仓库根目录的 lessons/*.html 同步到 onboarding/content/lessons/
（应用内阅读器以同源 iframe 内嵌，gh-pages 只部署 onboarding/，故不可直接引用根目录）。
用法：python3 scripts/gen_content_viewer.py
说明：生成产物提交入库；每次修改 lessons/ 后必须重跑本脚本并 bump SW CACHE。
"""
import os, sys, shutil

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'lessons')
DST = os.path.join(ROOT, 'onboarding', 'content', 'lessons')

def main():
    if not os.path.isdir(SRC):
        sys.exit('❌ 未找到 lessons/ 目录')
    os.makedirs(DST, exist_ok=True)
    htmls = sorted(f for f in os.listdir(SRC) if f.endswith('.html'))
    if not htmls:
        sys.exit('❌ lessons/ 下没有 .html 文件')
    for f in htmls:
        s, d = os.path.join(SRC, f), os.path.join(DST, f)
        shutil.copy2(s, d)
        assert os.path.getsize(s) == os.path.getsize(d), f'{f} 同步后大小不一致'
    # 清理目标里多余的旧文件
    for f in os.listdir(DST):
        if f.endswith('.html') and f not in htmls:
            os.remove(os.path.join(DST, f))
            print(f'  已删除过期文件 content/lessons/{f}')
    total = sum(os.path.getsize(os.path.join(DST, f)) for f in htmls)
    print(f'✅ content/lessons 已同步：{len(htmls)} 份 · {total/1024:.1f} KB')

if __name__ == '__main__':
    main()
