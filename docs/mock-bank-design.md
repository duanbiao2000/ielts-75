# 月度模考题库 Mock Bank · 设计定稿（v3·2026-11-22）

> 甲方已拍板：10 卷（2026-11 ～ 2027-08，每月 1 卷）；**每卷满分 150**；听力配完整 passage；
> 内容覆盖雅思历史口语全部话题；内容由 AI 批量生成、每批 1 卷人工验收；本地开发，统一推送。

v1.0（tag，commit 52cac21）单卷 `MOCK_EXAM`（6 口语×2 分 + 8 听力 = 20 分）**并入改写为 `mock-2026-11`**，引擎从此只认题库。

## 1. 总分与换算（每卷 150 分）

| 板块 | 题量/卷 | 单题分 | 小计 |
|---|---|---|---|
| 听力选择题（Section 1–4 各 10 题，含完整 passage） | 40 | 1 | **40** |
| Part 1 简答（8 话题 × 5 问 = 40 问；74 历史话题分卷覆盖） | 40 | 1 | **40** |
| Part 2 提纲独白（cue card） | 5 卡 | 6 | **30** |
| Part 3 深度追问（独立命题） | 40 | 1 | **40** |
| **每卷合计** | **125 题** | | **150** |

- 换算（雅思 9 分制）：`band = round(raw / 150 × 9 × 2) / 2`
  150→9.0 · 133→8.0 · 125→7.5 · 116→7.0 · 108→6.5 · 100→6.0 · 83→5.0 · 66→4.0
- 全库 = 1250 题；内容编写工作量 ≈ 6–8 万字/卷（含 passage 与全部参考回答）。
- 分数粒度：全部整数，无 0.25/0.5 分，展示 `x/150 ≈ 7.5 分`。
- 旅程 ch6：全部 P0/P1 模块完成且**单卷最佳 ≥ 120/150**（80%）→ 120/150；
  ch5 文案 `/20` → `/150`；徽章 mockBeast 类：`mockBest ≥ 120/150`（文案「月刊 · 120/150」）；
  首页/卷架 mock 展示 `x/150 ≈ 7.5`。
- 旧 `mockBest`（≤20）迁移：不回写，`mockBest` 从下一次完成新卷起生效；`mockSets` 新字段逐卷记录 {best, takes, lastAt}。
- `done.mock` = 任意卷完成为 true（旅程 ch5、导出口径不变）。

## 2. 数据架构（单一数据源 + 生成器 + 门禁）

```
scripts/mock-bank.json        ← 唯一数据源（人工/AI 编辑）：10 卷，每卷母字段如下
scripts/gen_mock_bank.py      ← 生成 onboarding/js/mock-bank.js（const MOCK_BANK）
onboarding/js/mock-bank.js    ← 生成产物（提交入库，离线可用）
onboarding/js/training.js     ← 删除硬编码 MOCK_EXAM → 别名 MOCK_EXAM = MOCK_BANK[MOCK_BANK.length-1]
```

```jsonc
{
  "id": "mock-2026-11",
  "month": "2026-11",           // 唯一，YYYY-MM
  "title": "2026年11月刊 · 全景诊断",
  "difficulty": "冲刺",          // 基础|进阶|冲刺
  "theme": "考试",
  "blurb": "卷首语",
  "coverage": ["…"],            // 本卷覆盖的雅思历史话题（id 列表，见 topic-matrix）
  "listening": [                 // Section 1–4，每 Section 一篇 passage + 10 题
    {"section": "Section 1", "type": "四选一",
     "passage": "……完整英文原文 500–900 词……",
     "questions": [{"q": "…", "opts": ["a×4"], "right": 0, "explain": "…"} × 10 ]}
  ],
  "speaking": {
    "part1": [{"topic": "Hometown", "q": "…", "ref": "…", "keywords": ["…"]} × 40],
    "part2": [{"card": "Describe a person who …", "points": ["…"], "ref": "…", "keywords": ["…"]} × 5],
    "part3": [{"q": "…", "ref": "…", "keywords": ["…"]} × 40]
  }
}
```

**CRUD = 一条命令**：`python3 scripts/gen_mock_bank.py && node scripts/validate-data.js && node scripts/audit-content.js && node scripts/audit-coverage.js && node scripts/test-paths.js`

## 3. 话题覆盖矩阵（全量承诺）

- 基准全集（公开题库近一年）：Part 1 ≈ 74 话题（Work/Study/Hometown…）、Part 2&3 ≈ 112 话题（人物/事物/事件/地点/抽象）。
- 10 卷内：P1 400 问覆盖全部 74 话题（每话题 ≥5 问，分布到各卷）；
  Part 2 50 卡覆盖 ≥45%（含全部超高频：a person you admire / an interesting book / a journey / a skill…）；
  Part 3 400 问按 P3 话题类别（abstract/discussion 类：society/technology/education/environment/media/work/culture）全覆盖。
- `materials/mock/topic-matrix.json`：全集话题清单 + 每卷覆盖指派；`audit-coverage.js` 对照断言：
  ① P1 话题覆盖率 = 100%；② P3 类别无空缺；③ 卷间单一高频话题占比 ≤ 25%（防换皮）；④ coverage 字段与卷实际题目一致。

## 4. 引擎 / UI 改动（一次性）

1. `index.html` 引入 `js/mock-bank.js`（training.js 之前）。
2. `app.js` 模考新入口：**卷架**（10 张月刊卡：月份 · 标题 · 难度 · 主题 · 本卷最佳 / 未挑战 · 最新角标）。选卷 → 现有 intro（口语/听力/完整）→ speak/listen/done，流程不变。
3. 评分：Part1/Part3 = 关键词命中≥70%→1 分；Part2 = ≥80%→2/更多档（6 分：按命中比×6 四舍五入到整数）；听力 = 判分；`mockMax()=150`。
4. 成绩页：总分 x/150 ≈ band + 各 Section/Part 得分条 + 返回卷架；首次完成某卷 → toast「📮 YYYY-MM 月刊入册」。
5. 错题本 id：`mock:<setId>:speak:<i>` / `mock:<setId>:listen:<section>:<i>`。
6. 状态迁移（migrateState）：`mockSets={}` 补齐；`mockBankBest=0` 预留；`mockBest` 旧值保留但 ≥21 无意义，新逻辑只写 ≤150；`mock` 完成后 `mockSets[setId]` 更新 best/takes/lastAt。
7. 导出 summary 附加 `mockSets`、`mockBest(/150)`；学习记录 mock 条目 detail 含 setId 和分数。
8. `sw.js`：PRECACHE 增 `js/mock-bank.js`；发布统一推送时 `CACHE` 升 `ielts75-v4`。
9. v1.0 旧 `MOCK_EXAM` 内容 = `mock-2026-11` 底稿（扩为 40 听力/passage、P1 40 问、P2 5 卡、P3 40 问）。

## 5. 校验与门禁（把"批量生成不出错"工程化）

`validate-data.js`：Bank=10 · id/month 唯一 · month=YYYY-MM · 每卷 listening 4 Section×10 题 · opts=4 不重 · right∈[0,3] · passage 长度 ≥300 词 · speaking Part1=40/Part2=5/Part3=40 · 每题 ref/keywords 非空 · difficulty/theme 枚举 · coverage 为话题矩阵内 id。

`audit-content.js`：keywords 全部落在 ref（不敏感）· 无重复选项 · explain 非空 · P1/P3 参考答案 ≥25 词。

`audit-coverage.js`：见 §3①②③④。

`test-paths.js` / `_test_mock.js`：断言改 150 分制（单卷满分、mockSets 累积、band 换算、ch6 阈值 120）。

## 6. 交付节奏（每批 1 卷，验收后下一卷）

**批次 0（架构，本次已启动）**：§2 数据骨架 + §5 门禁框架 + §4 引擎/UI/卷架（此时 mock-bank.json 只含 mock-2026-11 占位重构完成）+ mock 相关测试改 150 制。验收：现有行为回归全绿，卷架可切换，2026-11 卷内容成型。

**批次 1 … 10**：每卷内容生成 → 全套门禁 → 提交 → 你验收 → 下一卷。建议验收清单：每卷 passage 是否成段落、P1 话题是否贴合 coverage、Part 3 是否真的在追问而不是套话、band 换算是否一致、听力是否每 Section 都能定位 passage。

**估算**：每批内容编写 ≈ 0.5–1 天（AI 生成+自检+门禁），10 批合计约 1–2 周。

## 7. 风险与开放项

1. 内容规模大：严格走门禁 + 分批验收，不憋大招。
2. 听力 passage 无音频：靠 passage 阅读替代，C-5 录音兼容不受影响。
3. `mockBest` 旧备份兼容：v1.0 导出备份可导入（migrate 容忍 ≤20 或 ≤150）。
4. SW 预缓存 +1 文件（mock-bank.js 体积可能较大：10 卷全量后约 500–800KB）—— 若超 300KB，考虑分卷懒加载（与 practice-full.js 同策略，T-5.5 已验证模式）。
5. 9 分制 boredom 感：band 仅换算展示，内部分数仍为整数 150。

## 8. 已确认决策记录（2026-11-22）

- 范围：10 卷 2026-11 ～ 2027-08（每月一期）。✅
- 满分：每卷 150 分；band 9 分制换算展示。✅
- 覆盖：雅思历史口语全部话题（P1 74 全覆盖 + Part 2/3 类全覆盖，见 §3）。题量承诺优先于节奏。✅
- 配分：方案 A（听力 40×1 + P1 40×1 + P2 5×6 + P3 40×1）。✅
- 听力：含 passage 原文。✅
- Part 3：独立命题。✅
- 旧卷：改写并入 mock-2026-11。✅
- 生成节奏：每批 1 卷，逐卷验收。✅
- 交付：本地开发，统一推送（含 compat/compat-test 生产冒烟）。✅
