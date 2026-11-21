
/* ============ 数据 ============ */
const LESSONS = [
  {id:'l1', icon:'🎯', title:'01 · 诊断课', path:'lessons/0001-diagnostic.html',
   summary:'理解 7.5 评分标准，完成自我诊断，记录初始卡点，定下起点。',
   points:['四维度评分标准（流利度/词汇/语法/发音）','自我诊断与初始卡点记录','个人训练计划的建立']},
  {id:'l2', icon:'🔁', title:'02 · 连读弱读', path:'lessons/0002-connected-speech.html',
   summary:'掌握英语语流中的连读、弱读规律，从"逐词听"到"听语流"。',
   points:['连读与弱读的核心规律','语流中的识别与运用','跟读训练方法']},
  {id:'l3', icon:'💬', title:'03 · 口语 Part 1', path:'lessons/0003-speaking-part1.html',
   summary:'Part 1 问答策略：A-R-E 结构、短答节奏与真实细节。',
   points:['A-R-E 回答结构','2–4 句的短答节奏','用个人细节体现真实感']},
  {id:'l4', icon:'🗂️', title:'04 · 口语 Part 2', path:'lessons/0004-speaking-part2.html',
   summary:'话题卡通关策略：结构、提纲与一材多用的基础。',
   points:['话题卡结构（开场-主体-收尾）','1 分钟提纲法','素材的拆解与储备']},
  {id:'l5', icon:'🧩', title:'05 · 口语 Part 3', path:'lessons/0005-speaking-part3.html',
   summary:'Part 3 论证框架：观点、解释、举例、让步的完整输出。',
   points:['观点-解释-举例-让步框架','抽象问题的应对策略','论证的展开与收束']},
  {id:'l6', icon:'🎧', title:'06 · 听力 Section 1-2', path:'lessons/0006-listening-section12.html',
   summary:'基础听力场景：预读、预测与信息抓取。',
   points:['读题与预测技巧','场景词汇与定位','基础题型的抓取方法']},
  {id:'l7', icon:'🔁', title:'07 · 同义替换识别', path:'lessons/0007-listening-paraphrase.html',
   summary:'雅思听力的底层逻辑——同义替换的识别与积累。',
   points:['同义替换的类型','题目与音频的对应逻辑','替换表达的积累方法']},
  {id:'l8', icon:'📚', title:'08 · 听力 Section 3-4', path:'lessons/0008-listening-section34.html',
   summary:'学术场景听力：配对、选择与摘要填空的进阶策略。',
   points:['Section 3/4 的题型特点','复杂语料的信息处理','进阶题型的应对']},
  {id:'l9', icon:'🗣️', title:'09 · 发音与语调', path:'lessons/0009-speaking-pronunciation.html',
   summary:'发音评分的落地训练：重音、语调与可懂度。',
   points:['句子重音与节奏','语调的功能性','可懂度自检']},
  {id:'l10', icon:'🏅', title:'10 · Part 2 精通', path:'lessons/0010-speaking-part2-mastery.html',
   summary:'Part 2 进阶：故事模板、临场组织与稳定输出。',
   points:['故事模板与归类','临场组织与填充','稳定讲满 2 分钟']},
  {id:'l11', icon:'⏱️', title:'11 · 模考冲刺', path:'lessons/0011-mock-exam-sprint.html',
   summary:'全真模考流程、错题归因与考前冲刺，直通退出标准。',
   points:['全真模考流程','错题归因与复盘','考前一周安排与退出标准']},
];

const SCENARIOS = [
  {d:'考试', name:'考场应答与考官互动', blurb:'考试当天的流程互动：问候、确认、过渡与收尾。', expr:'Could you repeat that, please? / That\'s an interesting question.', task:'模拟一次完整考试互动，含一次没听清与一次追问。'},
  {d:'考试', name:'考前考后交流与情绪表达', blurb:'表达紧张、放松与感受，谈备考与考试心态。', expr:'I felt a bit nervous, but I stayed calm.', task:'用 3 个情绪词描述一次你紧张又稳住的经历。'},
  {d:'生活', name:'租房与居住沟通', blurb:'咨询房源、说明需求、协商租赁条件。', expr:'I\'m looking for a place near the subway.', task:'角色扮演：向房东咨询一套房源的三个细节。'},
  {d:'生活', name:'购物与退换', blurb:'购物咨询、说明问题、提出退换要求。', expr:'I\'d like to return this — it doesn\'t work properly.', task:'角色扮演：退换一件有问题的商品，礼貌但明确。'},
  {d:'生活', name:'餐饮与点餐', blurb:'点餐、说明饮食偏好与忌口、提出请求。', expr:'Could I have the menu, please? I\'m allergic to nuts.', task:'角色扮演：在餐厅点餐并说明一个忌口。'},
  {d:'生活', name:'医疗与就诊', blurb:'描述症状、说明病史、咨询医生建议。', expr:'I\'ve had a headache since this morning.', task:'角色扮演：向医生描述症状并询问建议。'},
  {d:'生活', name:'银行与电话客服', blurb:'电话沟通：说明来意、描述问题、确认方案。', expr:'I\'m calling about my account — there seems to be an issue.', task:'角色扮演：致电客服解决一个账户问题。'},
  {d:'职场', name:'面试与自我介绍', blurb:'面试问答与自我介绍的完整结构。', expr:'I\'ve got three years of experience in this field.', task:'准备 2 分钟自我介绍 + 回答一个面试追问。'},
  {d:'职场', name:'入职与日常沟通', blurb:'入职咨询、请教流程、确认理解。', expr:'Just to be clear, what should I do first?', task:'角色扮演：向老同事请教一个工作流程。'},
  {d:'职场', name:'会议与汇报', blurb:'会议发言、工作汇报与回应追问。', expr:'Let me summarise what we\'ve agreed on.', task:'模拟一次 2 分钟项目进展汇报并回答追问。'},
  {d:'职场', name:'请假加班与离职沟通', blurb:'请假申请、加班协商、离职面谈表达。', expr:'I\'d like to request some time off next week.', task:'角色扮演：向主管申请一次请假并说明理由。'},
  {d:'职场', name:'客户沟通与商务洽谈', blurb:'需求沟通、方案介绍、异议处理与让步协商。', expr:'What we\'re looking for is a solution that fits your budget.', task:'角色扮演：与"客户"洽谈，让步必须带条件。'},
  {d:'职场', name:'演示与公开表达', blurb:'演示开场、分点展开与 Q&A 应对。', expr:'Today I\'d like to walk you through three points.', task:'录一段 2 分钟电梯演讲：结论先行 + 两个要点。'},
  {d:'职场', name:'电话与线上会议', blurb:'电话礼仪、会议发言切入与听不清应对。', expr:'Could I jump in here? Sorry, you\'re on mute.', task:'角色扮演：一次电话业务沟通 + 一次会议发言。'},
  {d:'职场', name:'商务社交与应酬', blurb:'商务寒暄、安全话题与自然过渡到业务。', expr:'It\'s a pleasure to meet you. What brings you here?', task:'角色扮演：商务场合寒暄并自然过渡到业务。'},
  {d:'职场', name:'投诉处理与应急沟通', blurb:'安抚情绪、确认诉求、给方案与时间承诺。', expr:'I completely understand how frustrating that must be.', task:'角色扮演：处理一位不满客户的投诉。'},
  {d:'职场', name:'培训与带教', blurb:'讲解结构、引导尝试与具体反馈。', expr:'Why don\'t you try it first, and I\'ll watch?', task:'角色扮演：带教新人完成一个操作并给反馈。'},
  {d:'出行', name:'机场与航班', blurb:'值机咨询、航班信息询问与需求表达。', expr:'I\'d like to check in for my flight to London.', task:'角色扮演：在机场办理值机并询问一个信息。'},
  {d:'出行', name:'酒店入住与退房', blurb:'办理入住、提出房间问题、确认细节。', expr:'I have a reservation under the name Wang.', task:'角色扮演：办理入住并提出一个房间问题。'},
  {d:'出行', name:'交通与问路', blurb:'问路、指路与方位确认。', expr:'Excuse me, how do I get to the nearest subway station?', task:'角色扮演：问路并复述确认路线。'},
  {d:'出行', name:'旅行突发情况', blurb:'延误、丢失物品等突发状况的求助与说明。', expr:'My flight has been delayed — what should I do?', task:'角色扮演：遇到突发情况向工作人员求助。'},
  {d:'留学', name:'申请与入学注册', blurb:'咨询申请流程、入学注册与材料要求。', expr:'Could you walk me through the application process?', task:'角色扮演：咨询入学申请流程并确认细节。'},
  {d:'留学', name:'课堂与学术沟通', blurb:'课堂提问、表达观点与学术讨论。', expr:'I\'d like to ask a question about this topic.', task:'角色扮演：课堂上向老师提问并表达观点。'},
  {d:'留学', name:'校园生活服务', blurb:'咨询校园设施与服务、说明需求。', expr:'I\'d like to know more about the campus facilities.', task:'角色扮演：咨询一项校园服务并说明需求。'},
  {d:'留学', name:'留学适应与跨文化沟通', blurb:'描述跨文化适应经历与感受。', expr:'At first it was challenging, but I gradually adapted.', task:'自答：描述一个适应新环境的经历（困难—应对—收获）。'},
  {d:'旅行', name:'行程规划与预订', blurb:'咨询行程、说明偏好、确认预订细节。', expr:'I\'d like to plan a trip — what do you recommend?', task:'角色扮演：咨询行程并确认一个预订。'},
  {d:'旅行', name:'旅行中的社交与体验', blurb:'旅行见闻交流与体验描述。', expr:'The most memorable part was the local food.', task:'自答：描述一次难忘的旅行体验（有细节有感受）。'},
  {d:'社交', name:'日常寒暄与介绍', blurb:'寒暄、自我介绍与开启话题。', expr:'Nice to meet you. So, what brings you here?', task:'角色扮演：初次见面寒暄并自我介绍。'},
  {d:'社交', name:'聚会邀请与回应', blurb:'发出邀请、接受与婉拒。', expr:'I\'d love to come — thanks for the invitation.', task:'角色扮演：接受一次邀请并询问细节。'},
  {d:'社交', name:'情绪与关系表达', blurb:'表达情绪、说明原因与回应他人。', expr:'I was a bit worried, but things worked out.', task:'自答：向朋友表达一种情绪并说明原因。'},
];

const SCEN_DOMAINS = ['考试','生活','职场','出行','留学','旅行','社交'];

const MODULES = [
  {id:'m01', icon:'🔊', title:'01 · 发音深度训练', p:'P0', path:'modules/01-发音深度训练/',
   blurb:'音标、易错音、连读弱读进阶、韵律与可懂度、发音自检。', files:'01-音标与易错音 / 02-连读弱读进阶与语调 / 03-发音自检清单 / 04-韵律与可懂度'},
  {id:'m02', icon:'⚡', title:'02 · 流利度专项', p:'P0', path:'modules/02-流利度专项/',
   blurb:'填充词控制、自我纠控制、快速组织与限时反应训练。', files:'01-填充词与自我纠控制 / 02-快速组织与限时反应 / 03-流利度训练计划'},
  {id:'m03', icon:'🧱', title:'03 · 词块与同义替换系统', p:'P0', path:'modules/03-词块与同义替换系统/',
   blurb:'功能词块库、同义替换表、语域意识与 Part 1/3 语域转换训练。', files:'01-功能词块库 / 02-同义替换表 / 03-语域意识 / 04-part1-part3语域转换训练'},
  {id:'m04', icon:'📊', title:'04 · 模拟反馈与进度追踪', p:'P0', path:'modules/04-模拟反馈与进度追踪/',
   blurb:'模考流程、四维度自评表、分数追踪与复盘日志。', files:'01-模考题库与模拟流程 / 02-四维度自评表 / 03-分数追踪与复盘日志'},
  {id:'m05', icon:'🧪', title:'05 · 语法系统强化', p:'P1', path:'modules/05-语法系统强化/',
   blurb:'高频语法结构、常见错误自查、语法多样性训练。', files:'01-高频语法结构清单 / 02-常见错误自查表 / 03-语法多样性训练'},
  {id:'m06', icon:'🎧', title:'06 · 听力输入与跟读计划', p:'P1', path:'modules/06-听力输入与跟读计划/',
   blurb:'精听泛听周计划、影子跟读四步进阶、多口音适应。', files:'01-精听泛听周计划 / 02-影子跟读进阶 / 03-多口音适应'},
  {id:'m07', icon:'🎭', title:'07 · Part 2 变题题库与临场改编', p:'P1', path:'modules/07-part2-变题题库与临场改编/',
   blurb:'5 个故事模板、题库归类策略、临场改编与反背诵训练。', files:'01-故事模板库 / 02-题库归类策略 / 03-临场改编练习'},
  {id:'m08', icon:'🧠', title:'08 · Part 3 抽象议题语料库', p:'P1', path:'modules/08-part3-抽象议题语料库/',
   blurb:'四大议题分类论证句、高频问题示范论证与变体策略。', files:'01-抽象议题分类与论证句 / 02-高频抽象问题与示范论证 / 03-示范变体与反背诵警告'},
  {id:'m09', icon:'🧘', title:'09 · 考场表现与心理管理', p:'P2', path:'modules/09-考场表现与心理管理/',
   blurb:'紧张与状态管理、考场技巧、声音与身体语言。', files:'01-紧张与状态管理 / 02-考场技巧与身体语言'},
  {id:'m10', icon:'🗓️', title:'10 · 长期节奏系统', p:'P2', path:'modules/10-长期节奏系统/',
   blurb:'阶段路线图、间隔复习循环、晋级与退出标准。', files:'01-阶段路线图 / 02-复习循环与晋级标准'},
  {id:'m11', icon:'🎯', title:'11 · 考官视角与分数校准', p:'P0', path:'modules/11-考官视角与分数校准/',
   blurb:'四档分数校准库、考官评分批注、追问压力题库。', files:'01-分数校准库 / 02-考官视角批注 / 03-考官追问题库'},
  {id:'m12', icon:'🧩', title:'12 · 听力题型拆解', p:'P1', path:'modules/12-听力题型拆解/',
   blurb:'7 大题型陷阱、时间分配与预测技巧。', files:'01-题型特点与常见陷阱 / 02-时间分配与预测技巧'},
];

/* ============ 徽章（条件 cond 由 app.js badgeCond 解释，多维度可配置） ============
   cond.t 支持：
   arr{ f, min }            —— done[f] 数组长度 ≥ min（lesson/scen/mod/practice/diag/quizPass/modTasks/review）
   scenDomain{ d, min }     —— 打卡某领域场景数 ≥ min
   modP{ p, min }           —— 完成某优先级模块数 ≥ min
   checkinDays{ min }       —— 累计打卡去重天数 ≥ min
   refresh{ min }           —— 完成间隔复习（stage≥1）次数 ≥ min
   mock                     —— 完成过模考
   mockBest{ min }          —— 模考最佳得分 ≥ min
   streak{ min } / level{ min } —— 连续天数 / 等级 ≥ min
   all{ of:[[f,min],…] }    —— 多数组同时达标 */
const BADGES = [
  // 课程
  {id:'b01', em:'🚩', name:'课程启程', cat:'课程', desc:'完成第 1 个课程关卡', cond:{t:'arr', f:'lesson', min:1}},
  {id:'b02', em:'🚶', name:'课程入门', cat:'课程', desc:'完成 3 个课程关卡', cond:{t:'arr', f:'lesson', min:3}},
  {id:'b03', em:'⛰️', name:'半程勇士', cat:'课程', desc:'完成 6 个课程关卡', cond:{t:'arr', f:'lesson', min:6}},
  {id:'b04', em:'🧗', name:'课程通览', cat:'课程', desc:'完成全部 11 个课程关卡', cond:{t:'arr', f:'lesson', min:11}},
  // 场景
  {id:'b05', em:'🎮', name:'演练起步', cat:'场景', desc:'完成 5 个场景演练', cond:{t:'arr', f:'practice', min:5}},
  {id:'b06', em:'🏙️', name:'演练达人', cat:'场景', desc:'完成 10 个场景演练', cond:{t:'arr', f:'practice', min:10}},
  {id:'b07', em:'👑', name:'全场景制霸', cat:'场景', desc:'完成全部 30 个场景演练', cond:{t:'arr', f:'practice', min:30}},
  {id:'b08', em:'🗺️', name:'场景收藏家', cat:'场景', desc:'打开全部 30 个场景卡片', cond:{t:'arr', f:'scen', min:30}},
  {id:'b09', em:'🏭', name:'职场达人', cat:'场景', desc:'打开全部 10 个职场场景', cond:{t:'scenDomain', d:'职场', min:10}},
  // 模块
  {id:'b10', em:'🛠️', name:'模块先锋', cat:'模块', desc:'完成全部 12 个模块', cond:{t:'arr', f:'mod', min:12}},
  {id:'b11', em:'🛡️', name:'P0 守卫者', cat:'模块', desc:'完成全部 5 个 P0 模块', cond:{t:'modP', p:'P0', min:5}},
  {id:'b12', em:'✅', name:'任务完成者', cat:'模块', desc:'累计勾选 20 个模块任务', cond:{t:'arr', f:'modTasks', min:20}},
  {id:'b13', em:'📅', name:'打卡达人', cat:'坚持', desc:'累计打卡 7 天', cond:{t:'checkinDays', min:7}},
  // 测评与模考
  {id:'b14', em:'🎯', name:'迈出第一步', cat:'测评', desc:'完成四科入学诊断', cond:{t:'arr', f:'diag', min:1}},
  {id:'b15', em:'✍️', name:'测验新星', cat:'测评', desc:'通过 5 次单元测验', cond:{t:'arr', f:'quizPass', min:5}},
  {id:'b16', em:'🎓', name:'全科通关', cat:'测评', desc:'通过全部 23 次单元测验', cond:{t:'arr', f:'quizPass', min:23}},
  {id:'b17', em:'⏱️', name:'模考挑战者', cat:'测评', desc:'完成一次模考', cond:{t:'mock'}},
  {id:'b18', em:'🥇', name:'模考高分', cat:'测评', desc:'模考最佳得分 ≥ 16 / 20', cond:{t:'mockBest', min:16}},
  // 复习
  {id:'b19', em:'🔁', name:'温故知新', cat:'复习', desc:'完成 5 次间隔复习', cond:{t:'refresh', min:5}},
  // 坚持
  {id:'b20', em:'🔥', name:'三日之约', cat:'坚持', desc:'连续训练 3 天', cond:{t:'streak', min:3}},
  {id:'b21', em:'⚡', name:'一周不间断', cat:'坚持', desc:'连续训练 7 天', cond:{t:'streak', min:7}},
  {id:'b22', em:'🌟', name:'半月炉火', cat:'坚持', desc:'连续训练 14 天', cond:{t:'streak', min:14}},
  // 进阶
  {id:'b23', em:'🏆', name:'全域解锁', cat:'进阶', desc:'课程、场景、模块全部完成', cond:{t:'all', of:[['lesson',11],['scen',30],['mod',12]]}},
  {id:'b24', em:'📈', name:'进阶学者', cat:'进阶', desc:'达到 Lv.3', cond:{t:'level', min:3}},
  {id:'b25', em:'🎖️', name:'考场强者', cat:'进阶', desc:'达到 Lv.5', cond:{t:'level', min:5}},
];

/* ============ 场景演练数据（30 场景 × 对话回合 + 自检项） ============ */
const PRACTICE = PRACTICE_FULL;
