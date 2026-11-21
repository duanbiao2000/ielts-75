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

## 5. 徽章 BADGES

```json
{
  "id": "b1",
  "em": "🎯",
  "name": "迈出第一步",
  "desc": "解锁条件说明"
}
```

- `id`：唯一，前缀 `b`。
- `em`：徽章图标（emoji 或后续 SVG）。
- 解锁条件在 `app.js` 的 `renderBadges()` 中以代码定义，后续可迁移到数据。

## 6. 场景演练 PRACTICE

键为场景 `name`（与 SCENARIOS 对齐），值为：

```json
{
  "roleA": "你的角色",
  "roleB": "搭档角色",
  "ex": [
    { "b": { "q": "搭档英文", "zh": "搭档中文" }, "a": { "q": "参考回答英文", "zh": "参考回答中文" } }
  ],
  "checks": ["自检项1", "自检项2", "自检项3"]
}
```

- `roleA / roleB`：演练舱角色卡展示。
- `ex`：回合制对话，搭档先开口（`b`），考生参考回答（`a`）；至少 3 回合。
- `checks`：自检清单，3–4 条；演练完成需全部勾选。

> **完整内容包扩展预留**（批次 1）：后续每场景将扩展为
> `words / phrases / adv / tips / dialogs`，`dialogs` 每句含 `vars`（其他说法变体）。
> 现有 `ex/checks` 结构保持兼容，扩展字段直接追加。

## 7. 状态状态（localStorage）

键：`ielts75_onboard`，结构：

```json
{
  "lesson": ["l1"],
  "scen": ["场景名"],
  "mod": ["m01"],
  "practice": ["场景名"],
  "diag": ["quiz"],
  "badges": [],
  "experience": 0,
  "streak": 0,
  "level": 1
}
```

- 数组字段记录已完成的课程/场景/模块/演练/诊断。
- `experience / streak / level` 为游戏化系统预留字段（批次 4 使用）。
- 读取时经 `migrateState()` 补齐缺失字段，保证向前兼容。
