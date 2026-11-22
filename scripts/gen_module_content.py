#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
模块工坊内容生成器：把 modules/*/*.md 转成 onboarding/content/modules/<id>.js（懒加载卷）。
用法：python3 scripts/gen_module_content.py
- id 由目录数字前缀推导：modules/01-发音深度训练 → m01
- README.md 作为「00 · 模块导览」放首位；其余按文件名排序
- 链接一律降级为纯文本（阅读器内不允许跳转破坏流程）；<script> 剔除
- 生成产物提交入库；修改任何 modules/*.md 后必须重跑并 bump SW CACHE
"""
import os, re, sys, json
import mistune

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'modules')
DST = os.path.join(ROOT, 'onboarding', 'content', 'modules')

md = mistune.create_markdown(escape=True, plugins=['table', 'strikethrough'])

def md_to_html(text):
    html = md(text)
    html = re.sub(r'<script.*?</script>', '', html, flags=re.S | re.I)
    # 链接降级为纯文本，保留可读内容
    html = re.sub(r'<a [^>]*>(.*?)</a>', r'\1', html, flags=re.S)
    return html

def title_of(text, fallback):
    m = re.search(r'^\s*#\s+(.+)$', text, flags=re.M)
    return m.group(1).strip() if m else fallback

def main():
    if not os.path.isdir(SRC):
        sys.exit('❌ 未找到 modules/ 目录')
    os.makedirs(DST, exist_ok=True)
    dirs = sorted(d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d)))
    ids = set()
    total_bytes = 0
    for d in dirs:
        m = re.match(r'^(\d+)', d)
        if not m:
            print(f'  跳过非数字前缀目录：{d}')
            continue
        mid = 'm' + m.group(1)
        ids.add(mid)
        md_files = [f for f in os.listdir(os.path.join(SRC, d)) if f.endswith('.md')]
        md_files.sort(key=lambda f: (0 if f.upper() == 'README.MD' else 1, f))
        docs = []
        for f in md_files:
            raw = open(os.path.join(SRC, d, f), encoding='utf-8').read()
            title = title_of(raw, f[:-3])
            if f.upper() == 'README.MD':
                title = '00 · 模块导览'
            docs.append({'file': f[:-3], 'title': title, 'html': md_to_html(raw)})
        js = 'window.MODULE_CONTENT = window.MODULE_CONTENT || {};\nwindow.MODULE_CONTENT[%s] = %s;\n' % (
            json.dumps(mid), json.dumps({'docs': docs}, ensure_ascii=False))
        out = os.path.join(DST, mid + '.js')
        open(out, 'w', encoding='utf-8').write(js)
        total_bytes += len(js.encode('utf-8'))
        print(f'  {mid} ← {d}（{len(docs)} 份文档）')
    # 清理过期
    for f in os.listdir(DST):
        if f.startswith('m') and f.endswith('.js') and f[:-3] not in ids:
            os.remove(os.path.join(DST, f))
            print(f'  已删除过期文件 content/modules/{f}')
    print(f'✅ content/modules 已生成：{len(ids)} 个模块 · {total_bytes/1024:.0f} KB')

if __name__ == '__main__':
    main()
