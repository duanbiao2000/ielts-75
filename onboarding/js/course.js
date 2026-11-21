/* ============ 课程与模块训练数据（批次2） ============
   LESSON_PACKS：每课 = 知识点(takeaways) + 课内练习(practice) + 关联场景(scenes)
   MODULE_PACKS：每模块 = 目标(target) + 练习清单(tasks) + 关联场景(linkScenes)
   task.scene 表示该任务可通过场景演练舱自动完成（双向同步）。
   由 scripts/gen_course.py 可重跑再生成；本文件已直接包含完整内容。 */

const LESSON_PACKS = {
  l1: { est:25, scenes:['考场应答与考官互动'],
    takeaways:['7.5 四维度：流利度与连贯、词汇资源、语法范围与准确性、发音。','自我定位：用一段录音对照四档描述，记录当前档位而不是凭感觉。','最小可行训练量：每天 25 分钟，重输出轻积累。','初始卡点写入复盘日志，每两周回看一次。'],
    practice:[
      {type:'choice', stem:'IELTS 口语 7.5 更接近哪种描述？', opts:['语法越复杂越好，长度优先','四科均衡，偶有小失误但不影响沟通','背熟高分范文即可拿高分','全程不犯任何语法错误'], right:1, explain:'7.5 要求四科均衡发展，允许少量失误，但不能持续影响沟通。'},
      {type:'fill', stem:'IELTS 口语评分的四个维度：流利度与连贯、词汇资源、语法范围与准确性、____。', answer:'发音', explain:'四维度缺一不可，发音决定答案的可懂度。'},
    ]},
  l2: { est:30, scenes:['银行与电话客服'],
    takeaways:['辅音结尾 + 元音开头 → 自然连读（an apple）。','to / of / and 等功能词常弱读（/tə/、/əv/、/ən/）。','实词重读、功能词弱读，形成英语节奏感。','用影子跟读（shadowing）把语流模式练进肌肉记忆。'],
    practice:[
      {type:'choice', stem:'下列哪一项是 and 的弱读形式？', opts:['/ænd/','/ən/','/ənd/','/ændə/'], right:1, explain:'and 在非强调位置常弱读为 /ən/，如 bread and butter。'},
      {type:'fill', stem:'辅音结尾的词遇到元音开头的词时，两个词之间会发生 ____。', answer:'连读', explain:'连读是语流的核心之一，如 pick it up → /ˌpɪkɪtˈʌp/。'},
    ]},
  l3: { est:35, scenes:['日常寒暄与介绍'],
    takeaways:['A-R-E 结构：Answer → Reason → Example，2–4 句完成。','不要展开成 Part 3 式长论证，短答+细节最佳。','加入个人细节（时间/地点/人物），真实感立刻提升。','开头可以直接答，不必 “Umm, let me think” 太久。'],
    practice:[
      {type:'choice', stem:'Part 1 的理想回答长度是？', opts:['只说 Yes / No','2–4 句，含理由或细节','一口气讲满 2 分钟','先沉默 5 秒再答'], right:1, explain:'Part 1 考察即兴短答，2–4 句最稳妥。'},
      {type:'fill', stem:'Part 1 回答结构 A-R-E：Answer、Reason 和 ____。', answer:'Example', explain:'给出例子比抽象论证更有说服力，也更自然。'},
    ]},
  l4: { est:40, scenes:['旅行中的社交与体验'],
    takeaways:['话题卡四要素逐个覆盖，卡住也不要空着。','1 分钟提纲：开场（是什么）→ 主体（细节）→ 收尾（感受）。','一个万能故事可复用到人/经历/地点多张卡片。','至少准备 3 个具体细节（When / Where / Who / How）。'],
    practice:[
      {type:'choice', stem:'Part 2 卡片上考官会给你多少思考时间？', opts:['30 秒','1 分钟','2 分钟','无限制'], right:1, explain:'1 分钟提纲+笔记，讲满 2 分钟。'},
      {type:'fill', stem:'Part 2 提纲三段式：开场、____、收尾。', answer:'主体', explain:'主体部分按 Who/When/Where/What 展开细节。'},
    ]},
  l5: { est:40, scenes:['课堂与学术沟通'],
    takeaways:['四步框架：观点 → 解释 → 举例 → 让步。','抽象题先限定范围（时间/人群/场景），再展开。','让步句型 While it is true that..., however... 显论证成熟。','避免背诵腔：用真实逻辑推进，让评分官听到“思考过程”。'],
    practice:[
      {type:'choice', stem:'Part 3 遇到抽象问题，第一步最好？', opts:['立刻给最终结论','先界定讨论范围/角度','讲一个 2 分钟故事','反问考官'], right:1, explain:'限定范围让论证更有条理，也显得思考成熟。'},
      {type:'fill', stem:'让步句型：While it is true that..., ____。', answer:'however', explain:'让步+转折是 Part 3 的高分信号，体现辩证思维。'},
    ]},
  l6: { est:35, scenes:['机场与航班'],
    takeaways:['读题 20–30 秒，圈关键词，预判答案类型。','Section 1/2 高频场景：租房、预约、旅游、活动。','盯紧数字、日期、拼写（人名/地名）这些易错点。','跟丢就放弃当前题，立刻看向下一题。'],
    practice:[
      {type:'choice', stem:'听力读题时最有效的做法是？', opts:['逐句翻译题目','圈关键词并预判答案类型','完全不读题直接听','先看全部听力文本'], right:1, explain:'带着预期去听，定位关键词即可抓住答案。'},
      {type:'fill', stem:'Section 1/2 最常考的细节包括数字、日期和人名 ____。', answer:'拼写', explain:'拼写题按字母逐个念，跟不上要立即写下首字母补全。'},
    ]},
  l7: { est:30, scenes:['银行与电话客服'],
    takeaways:['听力的底层逻辑：题干词 ≠ 音频原词，而是同义替换。','建立替换对积累：begin→commence, ask→enquire。','否定式替换要警惕：not uncommon 实际是 common。','平时精听时标注每一组同义替换。'],
    practice:[
      {type:'choice', stem:'音频把 “expensive” 说成 “costly”，属于？', opts:['语法错误','同义替换','口音差异','答非所问'], right:1, explain:'雅思听力大量使用同义替换，识别它们是拿分关键。'},
      {type:'fill', stem:'begin 的同义替换之一是 ____。', answer:'commence', explain:'常见替换：begin→commence, buy→purchase, show→demonstrate。'},
    ]},
  l8: { est:40, scenes:['课堂与学术沟通'],
    takeaways:['Section 3 是讨论型对话：抓住观点对比与逻辑关系。','Section 4 是学术讲座：抓结构信号词（firstly/however/for example）。','配对题先读选项再读题干，用排除法定位。','摘要填空严格遵守词数限制与词性要求。'],
    practice:[
      {type:'choice', stem:'Section 4 讲座中，信息密度最高的通常是？', opts:['每个例子都同等重要','结构信号词之后的内容','最后一句话','只有开头一句'], right:1, explain:'讲座结构信号词（cause/impact/however）之后往往是重点。'},
      {type:'fill', stem:'摘要填空要符合 ____ 要求，例如只填一个词就不能填两个词。', answer:'词数', explain:'超出词数直接判错，写完务必检查。'},
    ]},
  l9: { est:30, scenes:['面试与自我介绍'],
    takeaways:['句子重音落在实词（名词/动词/形容词），功能词弱读。','陈述句降调、一般疑问句升调、列举句先升后降。','可懂度优先于“像不像母语”，清晰准确是评分核心。','用录音回放与原声对比，逐句纠正重音与语调。'],
    practice:[
      {type:'choice', stem:'陈述句末尾通常用什么语调？', opts:['升调','降调','先升后降','平调'], right:1, explain:'陈述句末尾降调，收束感强，听起来确定。'},
      {type:'fill', stem:'一般疑问句句尾通常用 ____。', answer:'升调', explain:'“Are you ready?” 句尾上扬，听者才能判断是在提问。'},
    ]},
  l10: { est:45, scenes:['旅行中的社交与体验'],
    takeaways:['准备 3 类万能故事：人物、经历、地点，覆盖 80% 题卡。','故事模板：背景 → 冲突/转折 → 行动 → 收获。','临场填充句（That was a turning point…）让录音不空白。','节奏控制：每类故事练到稳定讲满 2 分钟。'],
    practice:[
      {type:'choice', stem:'“Describe a journey you have been on” 最自然的落点是？', opts:['描述一个人','描述一段经历（旅途/过程）','描述一个物品','描述一个习惯'], right:1, explain:'journey 题卡属于经历类，套用万能经历故事即可。'},
      {type:'fill', stem:'Part 2 故事模板四步：背景、冲突、行动、____。', answer:'收获', explain:'收尾讲收获/感受，自然升华并撑满时间。'},
    ]},
  l11: { est:45, scenes:['考场应答与考官互动'],
    takeaways:['考前一周：每天一套全真模考，当天复盘当天补。','错题归因三步：定位（哪题错）→ 原因（为什么错）→ 补法（怎么改）。','退出标准：连续 2 场模考四科达标即具备出分条件。','考前 24 小时：早睡、轻复习、正向心理暗示。'],
    practice:[
      {type:'choice', stem:'考前一周最有效的安排是？', opts:['只背词汇不做题','每天一套模考并当天复盘','刷大量新题不复盘','考前熬夜突击技巧'], right:1, explain:'模考+复盘形成闭环，比单纯刷量有效得多。'},
      {type:'fill', stem:'错题归因三步：定位、____、补法。', answer:'原因', explain:'说不出错因就补不了，错题本的核心是“为什么错”。'},
    ]},
};

const MODULE_PACKS = {
  m01: { target:'消除明显发音错误，提升可懂度与语调自然度',
    linkScenes:['考场应答与考官互动','面试与自我介绍'],
    tasks:[
      {id:'m01t1', text:'阅读 01-音标与易错音，记录你的易错音清单', est:20},
      {id:'m01t2', text:'跟读 02-连读弱读进阶与语调，每段读 5 遍', est:15},
      {id:'m01t3', text:'用 03-发音自检清单录一段录音并自评', est:15},
      {id:'m01t4', text:'完成场景演练：考场应答与考官互动', est:10, scene:'考场应答与考官互动'},
    ]},
  m02: { target:'减少卡顿与填充词，稳定连续输出',
    linkScenes:['演示与公开表达'],
    tasks:[
      {id:'m02t1', text:'建立填充词黑名单（um/like/就是说）并替换练习', est:15},
      {id:'m02t2', text:'限时反应训练：30 秒内快答 20 题', est:20},
      {id:'m02t3', text:'自我纠正控制：错了就用更正句继续，不重来', est:10},
      {id:'m02t4', text:'完成场景演练：演示与公开表达', est:10, scene:'演示与公开表达'},
    ]},
  m03: { target:'用词块思维告别逐词翻译',
    linkScenes:['会议与汇报','课堂与学术沟通'],
    tasks:[
      {id:'m03t1', text:'功能词块库分类记忆，每类记 10 个', est:20},
      {id:'m03t2', text:'同义替换表每日 20 组（begin→commence…）', est:15},
      {id:'m03t3', text:'Part 1 → Part 3 语域转换：同一话题两种说法', est:20},
      {id:'m03t4', text:'完成场景演练：会议与汇报', est:10, scene:'会议与汇报'},
    ]},
  m04: { target:'用模考和自评客观追踪分数变化',
    linkScenes:['考场应答与考官互动'],
    tasks:[
      {id:'m04t1', text:'完整模考一套（口语 + 听力）', est:30},
      {id:'m04t2', text:'填写 02-四维度自评表并打档', est:10},
      {id:'m04t3', text:'更新 03-分数追踪表，最弱一项写复盘', est:15},
      {id:'m04t4', text:'完成场景演练：考场应答与考官互动', est:10, scene:'考场应答与考官互动'},
    ]},
  m05: { target:'高频结构准确多样，不为复杂而复杂',
    linkScenes:['课堂与学术沟通'],
    tasks:[
      {id:'m05t1', text:'过 01-高频语法结构清单，划出不熟的结构', est:20},
      {id:'m05t2', text:'对照 02-常见错误自查表，复盘最近录音', est:15},
      {id:'m05t3', text:'语法多样性训练：交替使用定从/分词/虚拟语气', est:20},
      {id:'m05t4', text:'完成场景演练：课堂与学术沟通', est:10, scene:'课堂与学术沟通'},
    ]},
  m06: { target:'通过输入量 + 影子跟读补足听力根基',
    linkScenes:['机场与航班','银行与电话客服'],
    tasks:[
      {id:'m06t1', text:'精听一段对话，逐句听到完全听懂', est:25},
      {id:'m06t2', text:'影子跟读 02-02 影子跟读进阶的 4 步流程', est:15},
      {id:'m06t3', text:'收集并盲听 2 段多口音素材', est:10},
      {id:'m06t4', text:'完成场景演练：机场与航班', est:10, scene:'机场与航班'},
    ]},
  m07: { target:'用故事模板吃透 Part 2 全部题卡',
    linkScenes:['旅行中的社交与体验','留学适应与跨文化沟通'],
    tasks:[
      {id:'m07t1', text:'5 个故事模板各写一个 1 分钟提纲', est:20},
      {id:'m07t2', text:'题库归类：30 张快题按人/事/物/地归类', est:15},
      {id:'m07t3', text:'临场改编：随机抽卡，改编讲满 2 分钟', est:15},
      {id:'m07t4', text:'完成场景演练：旅行中的社交与体验', est:10, scene:'旅行中的社交与体验'},
    ]},
  m08: { target:'抽象议题有论证骨架，不现场空想',
    linkScenes:['课堂与学术沟通','会议与汇报'],
    tasks:[
      {id:'m08t1', text:'四大议题分类论证句各背、各输出 5 句', est:25},
      {id:'m08t2', text:'高频抽象问题口头示范论证 10 题', est:25},
      {id:'m08t3', text:'示范变体改写：同一论点换 3 个角度', est:15},
      {id:'m08t4', text:'完成场景演练：课堂与学术沟通', est:10, scene:'课堂与学术沟通'},
    ]},
  m09: { target:'进入状态快，松弛但不出线',
    linkScenes:['考前考后交流与情绪表达'],
    tasks:[
      {id:'m09t1', text:'紧张自评 + 4-7-8 呼吸调节练习 5 分钟', est:10},
      {id:'m09t2', text:'考场技巧清单过一遍：礼貌短语与时间管理', est:10},
      {id:'m09t3', text:'录一段 2 分钟演讲，检查声音与肢体语言', est:15},
      {id:'m09t4', text:'完成场景演练：考前考后交流与情绪表达', est:10, scene:'考前考后交流与情绪表达'},
    ]},
  m10: { target:'建立 90 天可持续的训练节奏，不断线',
    linkScenes:['行程规划与预订'],
    tasks:[
      {id:'m10t1', text:'阶段路线图定位当前周次，写下本周目标', est:10},
      {id:'m10t2', text:'把间隔复习（1/3/7 天）排进日程', est:10},
      {id:'m10t3', text:'对照晋级与退出标准自检一次', est:10},
      {id:'m10t4', text:'完成场景演练：行程规划与预订', est:10, scene:'行程规划与预订'},
    ]},
  m11: { target:'知道 7 分和 8 分差在哪，停止自我感觉良好',
    linkScenes:['考场应答与考官互动','面试与自我介绍'],
    tasks:[
      {id:'m11t1', text:'四档分数校准库：每档听一段样本并对照自评', est:25},
      {id:'m11t2', text:'考官批注：找一段答案写 3 条考官批注', est:15},
      {id:'m11t3', text:'追问压力题库：连续被追问 5 轮不卡壳', est:15},
      {id:'m11t4', text:'完成场景演练：考场应答与考官互动', est:10, scene:'考场应答与考官互动'},
    ]},
  m12: { target:'识别 7 类题型陷阱，先于音频预判答案',
    linkScenes:['银行与电话客服','机场与航班'],
    tasks:[
      {id:'m12t1', text:'7 大题型各看 1 个例题，写下陷阱总结', est:25},
      {id:'m12t2', text:'预测技巧训练：读题猜词性/范围/数字', est:15},
      {id:'m12t3', text:'时间分配演练：40 分钟完整走一遍流程', est:40},
      {id:'m12t4', text:'完成场景演练：银行与电话客服', est:10, scene:'银行与电话客服'},
    ]},
};
