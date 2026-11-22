# 数据模型说明

> 所有游戏化训练平台的数据统一定义在 `onboarding/js/data.js`，页面通过
> `onboarding/js/app.js` 消费。新增内容必须先在此模型下结构化，禁止在 HTML 硬编码。

## 1. 课程 LESSONS

```json
{
  "id": "l1",
  "icon": "🎯",
  "title": "01 · 诊断课",
  "path": "lessons/0001-diagnostic.html",
  "summary": "一句话说明本课解决什么",
  "points": ["知识点1", "知识点2", "知识点3"]
}
```

- `id`：唯一，前缀 `l`。
- `path`：相对项目根的完整课程文件路径。
- `points`：本课核心知识点数组。

## 2. 场景 SCENARIOS

```json
{
  "d": "职场",
  "name": "面试与自我介绍",
  "blurb": "场景一句话定位",
  "expr": "核心表达示例（英文）",
  "task": "练习任务描述"
}
```

- `d`：领域，取值必须属于 `SCEN_DOMAINS`。
- `name`：唯一，与 `PRACTICE` 的键名一一对应。
- `expr`：场景核心表达，用于场景卡预览。
- `task`：该场景的练习任务，用于演练完成页建议。

## 3. 场景领域 SCEN_DOMAINS

字符串数组，如 `['考试','生活','职场','出行','留学','旅行','社交']`，用于场景城切换标签。

## 4. 模块 MODULES

```json
{
  "id": "m01",
  "icon": "🔊",
  "title": "01 · 发音深度训练",
  "p": "P0",
  "path": "modules/01-发音深度训练/",
  "blurb": "模块解决什么问题",
  "files": "文件1 / 文件2 / 文件3"
}
```

- `id`：唯一，前缀 `m`。
- `p`：优先级，取值 `P0` / `P1` / `P2`。
- `files`：模块包含文件，用 ` / ` 分隔。

## 5. 徽章 BADGES（批次4 重构）

```json
{
  "id": "b14",
  "em": "🎯",
  "name": "迈出第一步",
  "cat": "测评",
  "desc": "完成四科入学诊断",
  "cond": { "t": "arr", "f": "diag", "min": 1 }
}
```

- `id`：唯一，`b01`–`b25`，覆盖课程/场景/模块/测评/复习/坚持/进阶七个维度。
- `cat`：徽章分类，用于成就殿堂展示。
- `cond`：解锁条件 DSL，支持 `arr / scenDomain / modP / checkinDays / refresh / mock /
  mockBest / streak / level / all`（各类型字段见 `validate-data.js` 与 `app.js` `badgeCond()`）。
- 解锁由 `app.js` `checkBadges()` → `badgeCond()` 在每次渲染时自动判定，
  达成即写入 `done.badges`、弹出提示、记入 `learning-records`。

## 6. 场景演练 PRACTICE

键为场景 `name`（与 SCENARIOS 对齐），值为：

```json
{
  "roleA": "你的角色",
  "roleB": "搭档角色",
  "ex": [
    { "b": { "q": "搭档英文", "zh": "搭档中文" }, "a": { "q": "参考回答英文", "zh": "参考回答中文" } }
  ],
  "checks": ["自检项1", "自检项2", "自检项3"],
  "words": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "phrases": [["I'd like to...", "我想…"], ["...", "..."]],
  "adv": [["进阶表达英文", "中文"], ["...", "..."]],
  "tips": ["易错提醒1", "易错提醒2", "易错提醒3"],
  "dialogs": [
    {
      "title": "对话一 · 标题",
      "lines": [
        { "who": "A", "q": "英文", "zh": "中文", "vars": ["变体1", "变体2"] }
      ]
    }
  ]
}
```

- `roleA / roleB`：演练舱角色卡展示。
- `ex`：回合制对话（兼容精简结构），搭档先开口（`b`），考生参考回答（`a`）；至少 3 回合。
- `checks`：自检清单，3–4 条；演练完成需全部勾选。
- `words`：6 个高频词（词卡墙）。
- `phrases`：6 组基础句型，`[英文, 中文]` 对（句型卡）。
- `adv`：5 组进阶表达，`[英文, 中文]` 对（表达卡）。
- `tips`：3 条易错提醒（易错提醒卡）。
- `dialogs`：2 段完整对话，每段含 `title` 与 `lines`；每行 `{who, q, zh, vars}`，`vars` 为该句的其他说法变体（2–3 个），演练舱内以变体芯片切换。

> **批次 1 落地说明**：完整内容包数据从 `scripts/_full1/2/3.py` 经
> `scripts/gen_practice_full.py` 合并原 `PRACTICE`（`roleA/roleB/ex/checks`）
> 生成独立文件 `onboarding/js/practice-full.js`（`PRACTICE_FULL`），
> `data.js` 中 `PRACTICE = PRACTICE_FULL`。加载顺序为
> `practice-full.js → data.js → app.js`。校验工具会先加载 `practice-full.js` 再校验全部字段。

## 7. 状态状态（localStorage）

键：`ielts75_onboard`，结构：

```json
{
  "lesson": ["l1"],
  "scen": ["场景名"],
  "mod": ["m01"],
  "practice": ["场景名"],
  "diag": ["diag4"],
  "badges": [],
  "quiz": ["lesson:l1", "mod:m01"],
  "quizPass": ["lesson:l1"],
  "lessonView": ["l1"],
  "lessonEx": ["l1"],
  "modTasks": ["m01t1"],
  "modCheckins": ["m01:2026-11-20"],
  "review": [{ "name": "场景名", "weak": true, "practicedAt": 0, "stage": 0 }],
  "errors": [{ "type": "quiz|mock", "id": "...", "detail": "...", "ts": 0 }],
  "mock": true,
  "mockBest": 16,
  "badges": ["b01"],
  "experience": 120,
  "streak": 3,
  "bestStreak": 5,
  "streakFreeze": 1,
  "lastStreakDate": "2026-11-20",
  "level": 2,
  "journey": ["ch1"]
}
```

- 数组字段记录已完成的课程/场景/模块/演练/诊断/测验。
- `lessonView / lessonEx / quizPass`（批次2）：课程三步骤完成判定（知识点+课内练习+小测通过）。
- `modTasks`（批次2）：模块任务卡已勾选任务 id；`modCheckins` 模块打卡记录（`模块id:日期`）。
- 另有独立 localStorage 键 **`learning-records`**：学习行为流水 `{ts,action,id,detail}`，
  动作包括 lesson-open / lesson-practice / lesson-complete / lesson-to-pod / scenario-practice /
  quiz-pass / module-open / module-task / module-complete / module-checkin / module-to-pod，上限 500 条。
- `review`：间隔复习记录，`stage` 对应间隔天数索引（1/3/7 天），`weak` 标记薄弱场景。
- `errors`：错题本，单元测验未通过、模考答错/低分自动记录（按 `type+id` 去重）。
- `mock`：是否完成过模考冲刺。
- `experience / streak / level` 为游戏化系统字段（批次 4 启用）。
- `mockBest`（批次4）：模考最佳得分；`badges` 存已解锁徽章 id 列表（由 `checkBadges()` 计算）。
- `bestStreak / lastStreakDate / streakFreeze`（批次4）：连续训练天数、上次打卡日期、断签补偿券数量。
- `journey`（批次4）：已达成的旅程章节 id 列表（ch1–ch6）。
- 读取时经 `migrateState()` 补齐缺失字段，保证向前兼容。

### 游戏化系统（批次 4）

- **徽章**（`data.js` `BADGES`）：每枚 `{id, em, name, cat, desc, cond}`，`cond` 为条件 DSL
  （`arr/scenDomain/modP/checkinDays/refresh/mock/mockBest/streak/level/all`），
  由 `app.js` `badgeCond()` 解释；`checkBadges()` 在每次 `renderAll()` 时自动解锁并提示。
- **等级经验**（`app.js`）：`LEVEL_XP` 累计阈值、`LEVEL_TITLES` 10 级称号；
  `awardXP(n, reason)` 累加经验、判定升级并触发反馈；`renderHeader()` 同步
  header 的等级称号、经验条、连续天数与 `body[data-level]` 外观。
- **连续打卡**（`app.js`）：`logLearning()` 任何学习行为触发 `updateStreak()`；
  同日不重复计数，昨日连续则 +1；断签恰好 1 天且有补偿券 → 消耗 1 张补偿券连续保留；
  每满 7 天连续奖励 1 张补偿券；`learning-records` 记录 streak-freeze / streak-reward。
- **旅程**（`app.js` `JOURNEY`）：6 章「从 6.0 到 7.5 的旅程」，前置章节达成后依次解锁，
  里程碑触发剧情弹窗与 XP 奖励（ch6 终章：P0/P1 全模块完成且模考最佳 ≥120/150）。

## 10. 工程化功能（批次 5）

- **学习记录导出**（`app.js`）：`exportBundle()` 汇总训练进度、状态快照与
  `learning-records` 流水；JSON（完整备份）与 CSV（BOM + RFC4180 转义）两种格式，
  经 Blob 下载；hero「📤 导出学习记录」入口。导出动作记入 `learning-records`（export）。
- **移动端**：`style.css` 900/560px 断点；`html,body` 禁横向滚动；演练舱/弹窗收缩；
  录音 `pickAudioMime()` 探测 `audio/webm|mp4|aac|ogg` 兼容 iOS/Android。
- **无障碍**：卡片/tab 可聚焦（`tabindex=0` + Enter/Space 激活）；弹窗打开聚焦关闭按钮、
  关闭恢复原焦点；Escape 分级关闭（mock → pod → modal）；语义地标与 aria（dialog /
  navigation / toast aria-live）；skip-link；`:focus-visible`；主文本对比度实测 ≥ 4.5。
- **PWA**（`sw.js` + `manifest.json` + `icon.svg`）：版本化缓存 `ielts75-v<n>`，
  预缓存全部静态资源（含 `practice-full.js` 供离线演练）；cache-first；
  activate 清理旧缓存；GET 之外不拦截；离线回落 `index.html` 外壳。
  **发布新版本时需 bump `CACHE` 版本号**，否则客户端沿用旧缓存。
  SW 仅在 http(s) 环境注册；预览 iframe 与 file:// 下静默跳过，下载后经静态服务器访问即可离线。
- **性能**：`practice-full.js`（184KB）不在首屏加载，`data.js` 惰性引用 `PRACTICE`，
  首次进入演练舱时 `ensurePracticeData()` 动态注入（快路径数据已加载则同步打开）；
  其余本地脚本 `defer`；长列表 `content-visibility:auto`；首屏 JS ≈ 130KB。

## 8. 训练闭环数据（`onboarding/js/training.js`，批次 3）

由 `scripts/gen_training.py` 生成，`index.html` 加载顺序为
`practice-full.js → data.js → mock-bank.js → training.js → app.js`（月度模考题库见 §8 MOCK_BANK）。

- **DIAG_SUBJECTS**（T-3.1）：四科诊断，每科 `{id,name,icon,color,questions[]}`，
  每题 `{stem,opts,right,explain}`；共 4 科 × 3 题。
- **QUIZ_LESSONS / QUIZ_MODS**（T-3.2）：课程/模块单元测验，按课/模块 id 索引，
  每题 `{type:'choice'|'fill', stem, opts?, right?, answer?, explain}`；每单元 2 题。
- **MOCK_BANK**（月度模考题库，批次6）：由 `scripts/gen_mock_bank.py` 从
  `scripts/mock-bank.json`（唯一数据源）生成 `js/mock-bank.js`，加载顺序
  `practice-full.js → data.js → mock-bank.js → training.js → course.js → app.js`。
  - 结构：每卷 `{id:'mock-YYYY-MM', month, title, difficulty, theme, blurb, coverage,
    listening:[{section,passage,questions:[{q,opts,right,explain}]}],
    speaking:{part1:[…],part2:[{topic,card,points,ref,keywords}],part3:[…]}}`。
  - 每卷 **125 题 / 150 分**：听力 4 Section × 10 题 × 1 分；Part 1 8 话题 × 5 问 × 1 分；
    Part 2 5 卡 × 6 分（`round(命中率×6)`）；Part 3 40 问 × 1 分（命中率 ≥ 70% 得 1 分）。
  - 成绩按 **雅思 9 分制**换算：`band = round(raw / 150 × 9 × 2) / 2`（150→9.0、125→7.5、116→7.0）。
  - 每卷最佳记录写入 `done.mockSets[setId] = {best, takes, lastAt}`；`done.mockBest`（0–150）
    取历史最佳；`done.mock` 任意一卷完成置 true；`done.mockBankBest` 预留未启用。
  - 错题本 id：`mock:<setId>:speak:<i>` / `mock:<setId>:listen:<section>:<qIdx>`。
  - UI：模考入口为**月刊卷架**（`openMock()` 渲染卷架卡片：月份 · 标题 · 难度 · 主题 · 本卷最佳/未挑战 · 最新角标），
    `openMockVolume(setId)` 选卷后进入口语/听力/完整三种模式，成绩页展示总分/150 + 雅思换算 + 四板块分项条。

训练闭环：诊断定路线 → 单元测验 → 场景演练（含反馈）→ 模考验证 → 复习巩固。

## 9. 课程与模块训练数据（`onboarding/js/course.js`，批次 2）

由手工整理 + 校验工具保证结构。`index.html` 加载顺序为
`practice-full.js → data.js → training.js → course.js → app.js`。

- **LESSON_PACKS**（T-2.1）：按课程 id 索引，`{est 建议用时, takeaways 本课要点×4+,
  practice 课内练习（choice/fill，2 题）, scenes 关联场景（演练舱跳转锚点）}`。
- **MODULE_PACKS**（T-2.4）：按模块 id 索引，`{target 模块目标, linkScenes 关联场景,
  tasks 练习清单}`；`tasks[]` 每项 `{id, text, est 预估分钟, scene? 可自动演练的场景}`。
  `task.scene` 为模块↔场景双向同步锚点：模块页「去演练」跳转演练舱，演练完成自动勾选该任务。
