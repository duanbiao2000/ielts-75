#!/usr/bin/env python3
"""生成 onboarding/js/practice-full.js：完整内容包数据。
从原 data.js 提取 roleA/roleB/ex/checks，合并 _full1/2/3.py 的
words/phrases/adv/tips/dialogs，输出 PRACTICE_FULL。
"""
import json, re, subprocess, sys, os

ROOT = '/home/user/ielts-75'
DATA_JS = os.path.join(ROOT, 'onboarding', 'js', 'data.js')
OUT_JS = os.path.join(ROOT, 'onboarding', 'js', 'practice-full.js')

# 1. 用 node 提取原 PRACTICE（roleA/roleB/ex/checks）
node_cmd = [
    'node', '-e',
    "const fs=require('fs');"
    "const src=fs.readFileSync(process.argv[1],'utf8');"
    "const fn=new Function(src+'\\nreturn PRACTICE;');"
    "const p=fn();"
    "process.stdout.write(JSON.stringify(p));"
    , DATA_JS
]
out = subprocess.run(node_cmd, capture_output=True, text=True)
if out.returncode != 0:
    sys.exit('提取原 PRACTICE 失败: ' + out.stderr)
orig = json.loads(out.stdout)

# 2. 合并三批完整字段
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
from _full1 import FULL1
from _full2 import FULL2
from _full3 import FULL3

full = {}
all_batches = {**FULL1, **FULL2, **FULL3}

# 校验场景名一致
orig_names = set(orig.keys())
new_names = set(all_batches.keys())
if orig_names != new_names:
    missing = orig_names - new_names
    extra = new_names - orig_names
    sys.exit(f'场景名不一致：缺失 {missing}，多余 {extra}')

for name in orig_names:
    o = orig[name]
    n = all_batches[name]
    full[name] = {
        'roleA': o['roleA'],
        'roleB': o['roleB'],
        'ex': o['ex'],
        'checks': o['checks'],
        'words': n['words'],
        'phrases': n['phrases'],
        'adv': n['adv'],
        'tips': n['tips'],
        'dialogs': n['dialogs'],
    }

# 3. 输出 JS
js = '/* 场景演练完整内容包（自动生成，勿手工编辑） */\nconst PRACTICE_FULL = ' + \
    json.dumps(full, ensure_ascii=False, indent=2) + ';\n'
with open(OUT_JS, 'w', encoding='utf-8') as f:
    f.write(js)

print('生成完成：' + OUT_JS)
print('场景数：' + str(len(full)))
for name, d in full.items():
    dlg_lines = sum(len(dl['lines']) for dl in d['dialogs'])
    print(f'  {name}: words={len(d["words"])} phrases={len(d["phrases"])} adv={len(d["adv"])} tips={len(d["tips"])} dialogs={len(d["dialogs"])} lines={dlg_lines}')
