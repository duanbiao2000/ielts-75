/* 月度模考题库 Mock Bank —— 由 scripts/gen_mock_bank.py 自动生成，请勿手改
   数据源：scripts/mock-bank.json（唯一可信来源），分卷素材：scripts/mock-parts/
   结构：MOCK_BANK = [{id, month, title, difficulty, theme, blurb, coverage,
                        listening:[{section, passage, questions:[{q, opts, right, explain}]}],
                        speaking:{part1:[{topic,q,ref,keywords}], part2:[{topic,card,points,ref,keywords}],
                                  part3:[{topic,q,ref,keywords}]}}]
   每卷 125 题 · 150 分（听力 40×1 + Part1 40×1 + Part2 5×6 + Part3 40×1）
   发布流程：编辑 mock-bank.json → python3 scripts/gen_mock_bank.py → 全套门禁 → 提交 */
const MOCK_BANK = [
  {
    "id": "mock-2026-11",
    "month": "2026-11",
    "title": "2026年11月刊 · 全景诊断",
    "difficulty": "基础",
    "theme": "考试",
    "blurb": "开卷即测：全景诊断你的雅思真实水平——听力 4 个完整场景、口语 125 题覆盖高频话题，做完直接拿到 9 分制换算。",
    "coverage": [
      "p1-accommodation",
      "p1-books",
      "p1-free-time",
      "p1-hometown",
      "p1-music",
      "p1-shopping",
      "p1-weather",
      "p1-work-study",
      "p2-book-exc",
      "p2-journey-long",
      "p2-person-admire",
      "p2-skill-learn",
      "p2-tech-daily",
      "p3-culture",
      "p3-education",
      "p3-environment",
      "p3-media",
      "p3-society",
      "p3-technology",
      "p3-work"
    ],
    "listening": [
      {
        "section": "Section 1",
        "passage": "Receptionist: Good morning, City College language centre, booking office. How can I help you?  Student: Oh hello. My name is Jenny Chen, I would like to ask about the short course in Marketing Communication that you run every term. Receptionist: Of course. Which intake were you interested in? It starts on the 8th of December and finishes on the 26th. Student: That sounds good. How many weeks is it, and what days? Receptionist: It runs for three weeks, every Tuesday and Thursday evening, from 6:30 to 8:30. The maximum group size is twelve students, and we keep it small so everyone gets feedback. Student: Great. And where exactly is the class held? Receptionist: In the North Building, room 204, just opposite the main library. Student: I see. How much is the fee? Receptionist: The full fee is 380 dollars, but if you book before the end of this month you get a 10 percent early-bird discount, so you would pay 342. Student: I would like to take the early-bird offer. What does the course include? Receptionist: Everything is included: ten hours of tuition, the textbook Marketing Essentials, weekly practice tests and one individual tutorial with the tutor. Student: What about books to buy myself? Receptionist: Nothing else is needed. However, if you want to keep Marketing Essentials, you can buy it after the course at half price from the college bookshop. Student: Lovely. Now, what if I finish work late and cannot attend one session? Receptionist: Each student can miss up to two sessions and we make them up the following week during the lunch break. Student: That is very flexible. How do I pay, and how do I confirm? Receptionist: You pay when you arrive, in cash or by card, but we need your confirmation by Friday. You can confirm online through the enrolment form on our website, or you can email me directly. Student: I will confirm online this evening. Can you tell me the tutor's name and background? Receptionist: The tutor is Dr Marcus Whitfield. He worked as a brand manager for a global cosmetics company before he started teaching here four years ago. He is known for practical cases and lots of role-plays. Student: Sounds perfect. One last question: is there a certificate at the end? Receptionist: Yes, all students who attend at least 80 percent of the sessions receive a certificate of completion. Student: Excellent. I will book now. My email is jenny.chen2026 at mail dot com. Receptionist: Let me note that down: jenny dot chen 2026 at mail dot com. Is that correct? Student: Yes, exactly. Thank you very much. Receptionist: You are welcome, and good luck with the course.",
        "questions": [
          {
            "q": "What is the maximum number of students in the Marketing Communication short course?",
            "opts": [
              "10",
              "12",
              "15",
              "20"
            ],
            "right": 1,
            "explain": "原文：The maximum group size is twelve students."
          },
          {
            "q": "When does the course start?",
            "opts": [
              "8 November",
              "18 November",
              "8 December",
              "26 December"
            ],
            "right": 2,
            "explain": "原文：It starts on the 8th of December."
          },
          {
            "q": "How is the class scheduled?",
            "opts": [
              "Every day for three weeks",
              "Every Tuesday and Thursday evening",
              "Every Saturday morning",
              "Twice a week in the afternoon"
            ],
            "right": 1,
            "explain": "原文：every Tuesday and Thursday evening, from 6:30 to 8:30."
          },
          {
            "q": "Where is the class held?",
            "opts": [
              "The main building, room 102",
              "The South Building, room 118",
              "The North Building, room 204",
              "The library, room 204"
            ],
            "right": 2,
            "explain": "原文：In the North Building, room 204, just opposite the main library."
          },
          {
            "q": "If Jenny books early, how much will she pay?",
            "opts": [
              "$380",
              "$360",
              "$342",
              "$310"
            ],
            "right": 2,
            "explain": "原文：early-bird discount…you would pay 342。"
          },
          {
            "q": "Which of the following is NOT included in the fee?",
            "opts": [
              "Ten hours of tuition",
              "The textbook Marketing Essentials",
              "Weekly practice tests",
              "Free lunch at the college café"
            ],
            "right": 3,
            "explain": "原文：Everything is included: ten hours of tuition, the textbook, weekly practice tests and one tutorial — 未含午餐。"
          },
          {
            "q": "What is the rule about missing sessions?",
            "opts": [
              "Missing one session means disqualification",
              "Students can miss up to two sessions and make them up the following week",
              "Missed sessions are refunded",
              "Students must make up missed sessions next term"
            ],
            "right": 1,
            "explain": "原文：Each student can miss up to two sessions and we make them up the following week during the lunch break。"
          },
          {
            "q": "How should Jenny confirm her booking?",
            "opts": [
              "By paying cash in person next week",
              "By posting a letter to the college",
              "By confirming online through the enrolment form or by email",
              "By calling the office every day"
            ],
            "right": 2,
            "explain": "原文：confirm online through the enrolment form on our website, or you can email me directly。"
          },
          {
            "q": "What was the tutor's previous career?",
            "opts": [
              "A university lecturer",
              "A brand manager at a cosmetics company",
              "A shop manager",
              "An advertising agency owner"
            ],
            "right": 1,
            "explain": "原文：He worked as a brand manager for a global cosmetics company。"
          },
          {
            "q": "What percentage of sessions must a student attend to receive the certificate?",
            "opts": [
              "50%",
              "60%",
              "80%",
              "100%"
            ],
            "right": 2,
            "explain": "原文：all students who attend at least 80 percent of the sessions receive a certificate of completion。"
          }
        ]
      },
      {
        "section": "Section 2",
        "passage": "Good morning everyone, and welcome to City College. My name is Priya Nair, I am the head of student services, and this is your orientation talk. I will walk you through the four facilities you will use most: the library, the student centre, the sports complex and the dining hall. Let us start with the library. It opens at 8 am and closes at 10 pm on weekdays, and at weekends it closes at 6 pm. You enter with your student card — remember to bring it every time, because the electronic door does not open otherwise. The first floor has silent study desks, and you may not use your phone there at all. The second floor has group study rooms, which you can book online for up to two hours a day. On the third floor you will find the quiet lounge with dictionaries and computers. Please do not move furniture between floors. Now the student centre: it is the heart of campus life. There is a counselling service, a careers desk and a printing service. Printing costs 5 cents a page for black and white, and 20 cents in colour. Lost property is kept here for three months. The sports complex is free for all students. It includes a gym, a swimming pool and three outdoor courts. You must wear sports shoes inside, and you must shower immediately after swimming. No food or drink is allowed on the poolside. Finally, the dining hall: it serves breakfast until 9:30, lunch between 11:30 and 2 pm, and dinner until 8 pm. Vegetarian, halal and gluten-free options are always available, and dishes are labelled clearly. If you have a special diet, the kitchen can prepare a personal menu — just register at the counter within your first week. One important note: the college closes the north entrance after 9 pm for safety, so after 9 you must use the main gate on Riverside Road. Please also keep the campus tidy: use the recycling bins in every building, because we are aiming to recycle 60 percent of our waste this year. If you have any questions during the week, come to the information desk and ask for Priya. Enjoy your time here!",
        "questions": [
          {
            "q": "When does the library close on weekends?",
            "opts": [
              "6 pm",
              "8 pm",
              "9 pm",
              "10 pm"
            ],
            "right": 0,
            "explain": "原文：at weekends it closes at 6 pm."
          },
          {
            "q": "What must students show before entering the library?",
            "opts": [
              "A borrowing slip",
              "Their student card",
              "A photo ID from home",
              "Their course timetable"
            ],
            "right": 1,
            "explain": "原文：You enter with your student card … otherwise the door does not open."
          },
          {
            "q": "On which floor can students study in groups?",
            "opts": [
              "First floor",
              "Second floor",
              "Third floor",
              "Ground floor"
            ],
            "right": 1,
            "explain": "原文：The second floor has group study rooms … book online for up to two hours a day."
          },
          {
            "q": "What is the rule for the first floor of the library?",
            "opts": [
              "Phones are allowed in silent mode",
              "Group study is allowed until 10 pm",
              "No phone use at all",
              "Food can be consumed"
            ],
            "right": 2,
            "explain": "原文：you may not use your phone there at all。"
          },
          {
            "q": "How much does colour printing cost per page?",
            "opts": [
              "5 cents",
              "10 cents",
              "20 cents",
              "50 cents"
            ],
            "right": 2,
            "explain": "原文：20 cents in colour。"
          },
          {
            "q": "What can students find in the student centre?",
            "opts": [
              "A bank branch",
              "A 24-hour gym",
              "Counselling, careers and printing services",
              "Free tutoring every evening"
            ],
            "right": 2,
            "explain": "原文：There is a counselling service, a careers desk and a printing service。"
          },
          {
            "q": "Which sentence is correct about the sports complex?",
            "opts": [
              "It charges a monthly membership fee",
              "Students must shower after swimming and wear sports shoes inside",
              "Food is allowed on the poolside",
              "Courts must be booked online a week ahead"
            ],
            "right": 1,
            "explain": "原文：You must wear sports shoes inside, and you must shower immediately after swimming. No food or drink is allowed on the poolside."
          },
          {
            "q": "Until what time does the dining hall serve breakfast?",
            "opts": [
              "8:30",
              "9:00",
              "9:30",
              "10:00"
            ],
            "right": 2,
            "explain": "原文：it serves breakfast until 9:30。"
          },
          {
            "q": "What should a student with a special diet do?",
            "opts": [
              "Bring food from home every day",
              "Register for a personal menu at the counter within the first week",
              "Eat only from the vegetarian section",
              "Email the head chef directly"
            ],
            "right": 1,
            "explain": "原文：If you have a special diet, the kitchen can prepare a personal menu — just register at the counter within your first week."
          },
          {
            "q": "What changes after 9 pm?",
            "opts": [
              "The library extends hours",
              "The north entrance closes and everyone must use the Riverside Road main gate",
              "The dining hall serves late-night snacks",
              "The sports complex opens for swimming"
            ],
            "right": 1,
            "explain": "原文：the college closes the north entrance after 9 pm for safety, so after 9 you must use the main gate on Riverside Road。"
          }
        ]
      },
      {
        "section": "Section 3",
        "passage": "Tutor: Right, today's tutorial is about your group presentation on campus recycling. Where have you got to so far?  Student A (Mei): We did the survey. We interviewed 120 students about their recycling habits, and we found that 74 percent know the bins exist but only 31 percent say they use them regularly. Student B (Owen): The biggest problem seems to be confusion — the labels are too small and many people cannot tell general waste from recycling. Tutor: That is interesting. So what did you do next? Mei: We drafted a proposal: clearer bin stickers with pictures, a short leaflet in freshers' week packs, and a competition between halls. Owen: And a pilot scheme in two halls for three weeks, to measure if the stickers actually change behaviour. Tutor: Good practical approach. What about the data for the presentation — what will your graphs show? Mei: One bar chart comparing awareness and actual use, one line graph of recycling rates during the pilot, and one pie chart of students' reasons for not recycling. Tutor: How are you dividing the work? Mei: I will do the data analysis and build the graphs. Owen will write the introduction and conclusion. We both do the script. Tutor: When will you practise the delivery? Owen: This Sunday afternoon, in the library group room 3, from 2 to 4 pm. The presentation itself is on the 15th of November. Tutor: That gives you three rehearsals counting backwards. One warning: the rubric has a section on critical evaluation of methodology. What will you say about your survey's weaknesses? Mei: The sample was opportunistic — we asked students in the canteen at lunchtime — so it is not fully representative of the whole college. We will also mention that self-reported behaviour might differ from what actually happens at the bins. Tutor: Excellent awareness. And how long should the presentation last? Mei: Exactly twelve minutes, plus three minutes for questions. Tutor: That is tight. Rehearse with a timer. Owen, did you email the administration office about the sticker cost? Owen: Yes — the stickers cost 45 dollars for 500, and the office agreed to cover it if the pilot shows at least a 15 percent improvement in recycling rates. Tutor: Perfect. So you have a funding condition attached. Remind me: who leads the questions if the audience has none? Mei: I will, citing the survey limit, and Owen will add the policy implications. Tutor: Great work team. See you at the rehearsal on Sunday.",
        "questions": [
          {
            "q": "How many students did Mei and Owen interview?",
            "opts": [
              "74",
              "100",
              "120",
              "150"
            ],
            "right": 2,
            "explain": "原文：We interviewed 120 students."
          },
          {
            "q": "What proportion of interviewed students recycle regularly?",
            "opts": [
              "31%",
              "54%",
              "74%",
              "80%"
            ],
            "right": 0,
            "explain": "原文：only 31 percent say they use them regularly."
          },
          {
            "q": "According to Owen, what is the biggest problem?",
            "opts": [
              "There are not enough bins",
              "Bins are too far from the canteen",
              "Students cannot tell general waste from recycling because labels are too small",
              "Recycling bins are locked"
            ],
            "right": 2,
            "explain": "原文：the labels are too small and many people cannot tell general waste from recycling."
          },
          {
            "q": "Which action was NOT part of the proposal?",
            "opts": [
              "Clearer bin stickers with pictures",
              "A leaflet in freshers' week packs",
              "A hall-versus-hall competition",
              "A permanent ban on single-use plastic"
            ],
            "right": 3,
            "explain": "原文：clearer bin stickers with pictures, a short leaflet in freshers' week packs, and a competition between halls —— 无一次性塑料禁令。"
          },
          {
            "q": "What does the pilot scheme aim to measure?",
            "opts": [
              "How much the leaflet costs",
              "Whether the stickers change behaviour",
              "Which hall recycles the most overall",
              "How many bins are missing"
            ],
            "right": 1,
            "explain": "原文：a pilot scheme in two halls for three weeks, to measure if the stickers actually change behaviour."
          },
          {
            "q": "Which graphs will the presentation include?",
            "opts": [
              "Awareness vs use, pilot recycling rates over time, reasons for not recycling",
              "Budget forecast, hall rankings, staff attitudes",
              "Bin locations, sticker sales, ticket prices",
              "Only a bar chart"
            ],
            "right": 0,
            "explain": "原文：One bar chart comparing awareness and actual use, one line graph of recycling rates during the pilot, and one pie chart of students' reasons."
          },
          {
            "q": "What weakness of the survey method does Mei identify?",
            "opts": [
              "Online-only sample",
              "The sample was opportunistic (lunch-time canteen) and not fully representative",
              "Questions were biased towards freshers",
              "The sample was too small to analyse"
            ],
            "right": 1,
            "explain": "原文：The sample was opportunistic…so it is not fully representative of the whole college."
          },
          {
            "q": "How long should the presentation last?",
            "opts": [
              "10 minutes",
              "Exactly 12 minutes plus 3 minutes of questions",
              "20 minutes",
              "8 minutes including questions"
            ],
            "right": 1,
            "explain": "原文：Exactly twelve minutes, plus three minutes for questions."
          },
          {
            "q": "What condition must be met for the office to pay the sticker cost?",
            "opts": [
              "The pilot must show at least a 15% improvement in recycling",
              "The survey must reach 200 students",
              "All halls must sign up",
              "The presentation must win the college prize"
            ],
            "right": 0,
            "explain": "原文：the office agreed to cover it if the pilot shows at least a 15 percent improvement in recycling rates."
          },
          {
            "q": "Where and when is the rehearsal?",
            "opts": [
              "Saturday 9 am",
              "Sunday 2–4 pm in library group room 3",
              "Sunday 9–11 pm at home",
              "Monday after the presentation"
            ],
            "right": 1,
            "explain": "原文：This Sunday afternoon, in the library group room 3, from 2 to 4 pm。"
          }
        ]
      },
      {
        "section": "Section 4",
        "passage": "Today's lecture continues our series on study skills. I want to share five evidence-based strategies that consistently improve results: retrieval practice, spaced repetition, interleaving, elaboration and focused attention. Let us take them one by one. First, retrieval practice. Actively trying to recall information from memory is far more powerful than re-reading your notes. You can close the book and write everything you remember about a topic, or use self-testing with flashcards. Re-reading creates a false sense of fluency, whereas testing exposes the gaps in your memory and forces the brain to reconstruct knowledge. Research shows students who use retrieval practice remember about 50 percent more after one week than those who only re-read. Second, spaced repetition means spacing your practice sessions out over time instead of cramming the night before. A review that took place one day, three days and one week after first learning is far more effective. Your brain consolidates memories during sleep, so all-night revision is actively counterproductive. Third, interleaving means mixing different topics or problem types within one study session, rather than studying Topic A for two hours and then Topic B for two hours. Interleaving feels harder in the moment, but it dramatically improves your ability to distinguish between problem types in the exam. Fourth, elaboration means explaining the material in your own words, connecting new concepts to what you already know, or even teaching it to someone else. Feynman's rule: if you cannot explain it in plain English, you do not understand it yet. Drawing mind-maps and asking 'why' repeatedly also help build deeper understanding. Fifth, focused attention. Divided attention is the enemy of deep learning. Switching between textbook and phone can cut your learning efficiency by up to 60 percent. Use timed sessions of 25 minutes, called the Pomodoro technique, take five-minute breaks for movement and water, and keep your phone in another room. To summarise, the ingredients of effective study are: recall from memory, spaced review, mixed practice, explaining in your own words, and full attention for short sprints. Replace one re-reading habit with one of these this week, and measure the difference yourself. Any questions before the next class?",
        "questions": [
          {
            "q": "What does the lecturer say is more powerful than re-reading notes?",
            "opts": [
              "Highlighting key sentences",
              "Actively recalling information from memory",
              "Reading chapters twice",
              "Copying notes by hand"
            ],
            "right": 1,
            "explain": "原文：Actively trying to recall information from memory is far more powerful than re-reading."
          },
          {
            "q": "What is the main danger of re-reading alone?",
            "opts": [
              "It takes too long",
              "It creates a false sense of fluency",
              "It damages your notes",
              "It is banned in the exam"
            ],
            "right": 1,
            "explain": "原文：Re-reading creates a false sense of fluency."
          },
          {
            "q": "According to the lecturer, spaced repetition works because",
            "opts": [
              "The brain consolidates memories during sleep",
              "You repeat everything ten times",
              "Teachers check your schedule",
              "Cramming has no effect at all"
            ],
            "right": 0,
            "explain": "原文：Your brain consolidates memories during sleep, so all-night revision is actively counterproductive."
          },
          {
            "q": "Compared with re-readers, students using retrieval practice after one week remember roughly",
            "opts": [
              "10 percent more",
              "20 percent more",
              "30 percent more",
              "50 percent more"
            ],
            "right": 3,
            "explain": "原文：remember about 50 percent more after one week."
          },
          {
            "q": "Interleaving means",
            "opts": [
              "Studying one topic for two hours straight",
              "Mixing different topics or problem types in one session",
              "Studying only past exam papers",
              "Asking a friend to quiz you"
            ],
            "right": 1,
            "explain": "原文：Interleaving means mixing different topics or problem types within one study session."
          },
          {
            "q": "Why is interleaving hard in the moment but valuable?",
            "opts": [
              "It is slower but improves exam accuracy",
              "It feels harder but improves distinguishing problem types",
              "It is more enjoyable",
              "It covers more topics per hour"
            ],
            "right": 1,
            "explain": "原文：Interleaving feels harder in the moment, but it dramatically improves your ability to distinguish between problem types."
          },
          {
            "q": "Feynman's rule says you truly understand something when you can",
            "opts": [
              "Recite the definition",
              "Explain it in plain English",
              "Answer a test question correctly",
              "Draw the mind-map from memory"
            ],
            "right": 1,
            "explain": "原文：if you cannot explain it in plain English, you do not understand it yet."
          },
          {
            "q": "What is divided attention's effect on learning efficiency?",
            "opts": [
              "It improves efficiency by 30 percent",
              "It has no effect if the phone is silent",
              "It can cut efficiency by up to 60 percent",
              "It only affects maths subjects"
            ],
            "right": 2,
            "explain": "原文：Switching between textbook and phone can cut your learning efficiency by up to 60 percent."
          },
          {
            "q": "What is a Pomodoro session exactly?",
            "opts": [
              "45-minute study followed by 15-minute nap",
              "25-minute timed focus with a 5-minute break",
              "90-minute morning session only",
              "A whole weekend of revision"
            ],
            "right": 1,
            "explain": "原文：timed sessions of 25 minutes, called the Pomodoro technique, take five-minute breaks."
          },
          {
            "q": "What is the lecturer's final recommendation?",
            "opts": [
              "Enrol in more courses",
              "Replace one re-reading habit with one of the new strategies and measure the difference",
              "Study all night before the exam",
              "Buy the textbook and read it twice"
            ],
            "right": 1,
            "explain": "原文：Replace one re-reading habit with one of these this week, and measure the difference yourself."
          }
        ]
      }
    ],
    "speaking": {
      "part1": [
        {
          "topic": "p1-work-study",
          "q": "Do you work or are you a student? Tell me about it.",
          "ref": "I'm currently working as a junior accountant in a logistics company. It's my first full-time job after graduation, and I mainly handle invoices and monthly ledgers, which I find quite satisfying.",
          "keywords": [
            "work",
            "accountant",
            "logistics",
            "first",
            "graduation"
          ]
        },
        {
          "topic": "p1-work-study",
          "q": "What do you like most about your job or studies?",
          "ref": "What I like most is that every week teaches me something new. Dealing with real clients makes the work meaningful, and I'm improving my communication skills every day.",
          "keywords": [
            "like",
            "new",
            "clients",
            "meaningful",
            "communication"
          ]
        },
        {
          "topic": "p1-work-study",
          "q": "Would you like to change your job or major in the future? Why or why not?",
          "ref": "Not at the moment. I still have a lot to learn in this field, and changing too quickly would waste the experience I've already built up.",
          "keywords": [
            "changing",
            "learn",
            "experience",
            "field",
            "quickly"
          ]
        },
        {
          "topic": "p1-work-study",
          "q": "Do you think your subject or job will be useful in the future?",
          "ref": "Absolutely. Financial literacy matters in every industry, so even if I switch companies or countries one day, these skills will always travel with me.",
          "keywords": [
            "absolutely",
            "financial",
            "industry",
            "switch",
            "skills"
          ]
        },
        {
          "topic": "p1-work-study",
          "q": "What do you usually do after work or classes?",
          "ref": "Usually I read for half an hour and then go for a walk. It clears my mind completely, and it helps me sleep better at night.",
          "keywords": [
            "read",
            "walk",
            "clears",
            "sleep",
            "night"
          ]
        },
        {
          "topic": "p1-hometown",
          "q": "Where is your hometown and what is it like?",
          "ref": "My hometown is a mid-sized city in the Yangtze River delta. It's known for its canals, relaxed pace of life and the little snacks sold along the riverbank.",
          "keywords": [
            "hometown",
            "delta",
            "canals",
            "pace",
            "snacks"
          ]
        },
        {
          "topic": "p1-hometown",
          "q": "What do you like most about your hometown?",
          "ref": "I like the calm riverside and the neighbourhood markets in the evenings, where everyone knows each other and dinner is always fresh and cheap.",
          "keywords": [
            "calm",
            "riverside",
            "markets",
            "evenings",
            "fresh"
          ]
        },
        {
          "topic": "p1-hometown",
          "q": "Is there anything you dislike about your hometown?",
          "ref": "The traffic in summer is terrible, honestly. The roads are narrow and when the rain comes the whole city moves at a walking pace.",
          "keywords": [
            "traffic",
            "terrible",
            "narrow",
            "rain",
            "walking"
          ]
        },
        {
          "topic": "p1-hometown",
          "q": "Has your hometown changed much in recent years?",
          "ref": "Hugely. New metro lines and a riverfront park went in last year, so it's now much easier to get around and there are more weekend events.",
          "keywords": [
            "metro",
            "riverfront",
            "park",
            "easier",
            "events"
          ]
        },
        {
          "topic": "p1-hometown",
          "q": "Would you like to live in your hometown in the future?",
          "ref": "Maybe for a few years, but I'd rather see more of the world first. My hometown is comfortable, but comfort can also become a very small world.",
          "keywords": [
            "hometown",
            "maybe",
            "world",
            "comfortable",
            "comfort"
          ]
        },
        {
          "topic": "p1-accommodation",
          "q": "Do you live in a house or an apartment?",
          "ref": "I live in a two-bedroom apartment on the eighth floor, with a small balcony overlooking the neighbourhood garden. It's quiet and well connected to the bus line.",
          "keywords": [
            "apartment",
            "bedroom",
            "balcony",
            "garden",
            "bus"
          ]
        },
        {
          "topic": "p1-accommodation",
          "q": "What is your favourite part of your home?",
          "ref": "My desk by the window. The morning light hits it perfectly, and it's where I do all my reading and video calls — it's basically my private base.",
          "keywords": [
            "desk",
            "window",
            "light",
            "reading",
            "base"
          ]
        },
        {
          "topic": "p1-accommodation",
          "q": "Would you like to move to a different kind of home? Why?",
          "ref": "One day I'd love a small house with a garden. I miss having plants around me, and a garden would also give me a quiet place to run in the mornings.",
          "keywords": [
            "house",
            "garden",
            "plants",
            "quiet",
            "morning"
          ]
        },
        {
          "topic": "p1-accommodation",
          "q": "How is your home different from when you were a child?",
          "ref": "Back then we shared a tiny three-room flat with my grandparents. Now I have my own space, my own habits and a lot more quiet — and I really value that.",
          "keywords": [
            "shared",
            "flat",
            "grandparents",
            "space",
            "quiet"
          ]
        },
        {
          "topic": "p1-accommodation",
          "q": "Is it better to live alone or with others, in your opinion?",
          "ref": "Short-term I prefer living alone — it's peaceful and you learn to be disciplined. But long-term, living with someone you trust teaches you compromise and warmth.",
          "keywords": [
            "alone",
            "peaceful",
            "discipline",
            "living",
            "compromise"
          ]
        },
        {
          "topic": "p1-music",
          "q": "What kind of music do you like listening to?",
          "ref": "Mostly indie folk and some old Mandarin rock. I like music with honest lyrics — songs that feel like the writer actually lived the story.",
          "keywords": [
            "folk",
            "rock",
            "lyrics",
            "songs",
            "story"
          ]
        },
        {
          "topic": "p1-music",
          "q": "Do you play any musical instruments?",
          "ref": "Only the guitar, badly. I've been practising for two years — I can play maybe five songs slowly. Progress is slow but the habit is joyful.",
          "keywords": [
            "guitar",
            "practising",
            "years",
            "songs",
            "joyful"
          ]
        },
        {
          "topic": "p1-music",
          "q": "Has your taste in music changed over time?",
          "ref": "Definitely. In school I only listened to pop. Now I prefer quieter songs with acoustic instruments, because they let me concentrate while I work.",
          "keywords": [
            "pop",
            "quieter",
            "acoustic",
            "concentrate",
            "school"
          ]
        },
        {
          "topic": "p1-music",
          "q": "Do you prefer listening to music alone or with others?",
          "ref": "Both, honestly. Alone when I'm studying, with friends at live houses or KTV. Music is how we bond after a long week of work and deadlines.",
          "keywords": [
            "alone",
            "studying",
            "friends",
            "bond",
            "deadlines"
          ]
        },
        {
          "topic": "p1-music",
          "q": "How often do you go to concerts or live shows?",
          "ref": "Maybe two or three times a year. Tickets and the crowds are expensive in terms of energy, but a great live show can recharge me for weeks.",
          "keywords": [
            "tickets",
            "crowds",
            "live",
            "recharge",
            "year"
          ]
        },
        {
          "topic": "p1-books",
          "q": "Do you like reading? What do you read?",
          "ref": "Yes, every single night before bed — usually essays or non-fiction on psychology and business. Fiction feels like dessert, non-fiction like a conversation with the author.",
          "keywords": [
            "night",
            "bed",
            "essays",
            "psychology",
            "fiction"
          ]
        },
        {
          "topic": "p1-books",
          "q": "Do you prefer paper books or e-books?",
          "ref": "Paper for long reading sessions, e-ink reader for commuting. Paper has that lovely weight and smell; e-books win on convenience and built-in dictionary.",
          "keywords": [
            "paper",
            "e-ink",
            "commuting",
            "weight",
            "dictionary"
          ]
        },
        {
          "topic": "p1-books",
          "q": "How many books did you read last year?",
          "ref": "About a dozen — mostly under 300 pages. I keep a reading log, and the streak matters to me more than the count itself.",
          "keywords": [
            "dozen",
            "pages",
            "log",
            "streak",
            "reading"
          ]
        },
        {
          "topic": "p1-books",
          "q": "What do you usually do with a book after you finish it?",
          "ref": "I lend it to a friend with a sticky note inside — the best recommendation I ever received was via a borrowed book with handwriting in the margin.",
          "keywords": [
            "lend",
            "friend",
            "sticky",
            "recommendation",
            "margin"
          ]
        },
        {
          "topic": "p1-books",
          "q": "Where do you usually read?",
          "ref": "In a café with low music and unlimited coffee, or on the window seat on the metro. Somehow the gentle background noise makes pages turn faster.",
          "keywords": [
            "café",
            "music",
            "window",
            "metro",
            "noise"
          ]
        },
        {
          "topic": "p1-shopping",
          "q": "How often do you go shopping?",
          "ref": "Once or twice a month in person, but I browse online almost daily — mostly for skincare and books. Buying is rare; researching is a daily habit.",
          "keywords": [
            "month",
            "person",
            "online",
            "skincare",
            "researching"
          ]
        },
        {
          "topic": "p1-shopping",
          "q": "Do you prefer shopping alone or with friends?",
          "ref": "With friends for clothes — they know my colours and stop me from impulse-buying. Alone for essentials, because friends make grocery trips three times longer.",
          "keywords": [
            "friends",
            "clothes",
            "impulse",
            "alone",
            "grocery"
          ]
        },
        {
          "topic": "p1-shopping",
          "q": "Have you ever bought something you later regretted?",
          "ref": "A white linen shirt, impulsively, at midnight. It was expensive and it looked tired after one wash — a classic lazy-buy lesson I repeat every season.",
          "keywords": [
            "linen",
            "impulsively",
            "midnight",
            "expensive",
            "lesson"
          ]
        },
        {
          "topic": "p1-shopping",
          "q": "What kind of shops are popular in your hometown?",
          "ref": "Wet markets and snack streets rule. People queue at 5 pm for the red-bean buns and the dumpling shop that opens only three hours a day.",
          "keywords": [
            "markets",
            "snack",
            "queue",
            "buns",
            "dumpling"
          ]
        },
        {
          "topic": "p1-shopping",
          "q": "Do you think online shopping will replace physical stores?",
          "ref": "For staples, yes — everything arrives in hours. But stores offering experience, like bookshop cafés or demo kitchens, will survive because we shop there for feeling too.",
          "keywords": [
            "staples",
            "stores",
            "experience",
            "bookshop",
            "feeling"
          ]
        },
        {
          "topic": "p1-free-time",
          "q": "What do you usually do in your free time?",
          "ref": "I take photos of old streets around Shanghai. It costs nothing and it's become my way of seeing the city slowly, frame by frame.",
          "keywords": [
            "photos",
            "streets",
            "Shanghai",
            "costs"
          ]
        },
        {
          "topic": "p1-free-time",
          "q": "Do you think people nowadays have enough free time?",
          "ref": "Not really. Evenings blur into message notifications and weekend plans fill before Friday ends. Real idleness — doing nothing on purpose — is almost a luxury.",
          "keywords": [
            "evenings",
            "notifications",
            "plans",
            "idleness",
            "luxury"
          ]
        },
        {
          "topic": "p1-free-time",
          "q": "Would you like to have a hobby that needs more skill?",
          "ref": "Yes — pottery. It involves patience, physical feel and forgiving mistakes with your hands. Every bowl teaches you to accept imperfection beautifully.",
          "keywords": [
            "pottery",
            "patience",
            "physical",
            "mistakes",
            "imperfection"
          ]
        },
        {
          "topic": "p1-free-time",
          "q": "How has your free time changed compared to five years ago?",
          "ref": "I used to chase ten hobbies; now I protect two — cooking and running — and I do them deeply. Focus beats variety once you accept you have limited evenings.",
          "keywords": [
            "hobbies",
            "cooking",
            "running",
            "focus",
            "variety"
          ]
        },
        {
          "topic": "p1-free-time",
          "q": "How do you make plans for your free time?",
          "ref": "Loosely. I keep a running list of things that sound delicious — restaurants, exhibitions, long walks — and let friends invite me to the ones we can share.",
          "keywords": [
            "list",
            "restaurants",
            "exhibitions",
            "walks",
            "friends"
          ]
        },
        {
          "topic": "p1-weather",
          "q": "What is the weather usually like in your hometown?",
          "ref": "Humid summers with plum rains, cold damp winters, and two magical weeks in October and April. Basically a climate that keeps you guessing your wardrobe daily.",
          "keywords": [
            "humid",
            "plum",
            "rains",
            "winters",
            "wardrobe"
          ]
        },
        {
          "topic": "p1-weather",
          "q": "Does the weather affect your mood or plans?",
          "ref": "Enormously. Grey rainy days make me want films and soup; clear autumn skies make me walk fifteen extra minutes just to stay outside a little longer.",
          "keywords": [
            "grey",
            "soup",
            "autumn",
            "walk",
            "outside"
          ]
        },
        {
          "topic": "p1-weather",
          "q": "What kind of weather do you prefer?",
          "ref": "Crisp sunny mornings around 20 degrees — the kind that makes you open windows before you even check your phone. Mild weather is a quiet medicine.",
          "keywords": [
            "crisp",
            "sunny",
            "windows",
            "mild",
            "medicine"
          ]
        },
        {
          "topic": "p1-weather",
          "q": "Has the weather in your city changed over the years?",
          "ref": "Yes — summers are hotter now and sudden downpours are more common. When I was small, the plum rains lasted longer, but now the rain arrives in heavier bursts with thunderstorms.",
          "keywords": [
            "hotter",
            "summers",
            "rain",
            "downpours",
            "thunderstorms"
          ]
        },
        {
          "topic": "p1-weather",
          "q": "Does rainy weather stop people from going out where you live?",
          "ref": "Not anymore. Everyone carries clear umbrellas and shops stay open; only the riverfront saxophonist disappears when the rain starts.",
          "keywords": [
            "umbrellas",
            "shops",
            "open",
            "riverfront",
            "rain"
          ]
        }
      ],
      "part2": [
        {
          "topic": "p2-person-admire",
          "card": "Describe a person you admire.",
          "points": [
            "Who this person is",
            "How you know them",
            "What qualities they have",
            "And explain why you admire them"
          ],
          "ref": "I'd like to talk about my uncle, Li Zhi, who runs a tiny car-repair shop near our old neighbourhood. He left school at fifteen but taught himself everything by reading manuals at night. People call him when dealers give them a bad deal, because he explains every detail honestly and never invents defects. What I admire most is that he fixes what matters and charges fairly, even when struggling himself. He told me once: earn slowly, stand straight. Watching him hold that principle for twenty years shaped how I work. Admiring him isn't about money or success; it's about trust being built one honest repair at a time.",
          "keywords": [
            "uncle",
            "repair",
            "taught",
            "honestly",
            "trust",
            "principle"
          ]
        },
        {
          "topic": "p2-journey-long",
          "card": "Describe a memorable journey you have made.",
          "points": [
            "Where you went",
            "Who you went with",
            "What you did",
            "And explain why it was memorable"
          ],
          "ref": "Last October I took an overnight train from Shanghai to Kunming with a friend from work — nineteen hours watching the landscape shift from river delta to misty mountains. We had no Wi-Fi, so we actually talked: about his doctorate, my job fears, the book in his bag. At dawn the train reached the high plateau and the light went golden over the farmland — completely unused to seeing. A journey this long forces you to slow down, share food, and surprisingly, see your companion as a real person for the first time.",
          "keywords": [
            "train",
            "Kunming",
            "friend",
            "mountains",
            "Wi-Fi",
            "plateau",
            "journey",
            "talked"
          ]
        },
        {
          "topic": "p2-skill-learn",
          "card": "Describe a skill you would like to learn.",
          "points": [
            "What the skill is",
            "Why you want to learn it",
            "How you would learn it",
            "And explain what difference it would make"
          ],
          "ref": "I want to learn to cook Sichuanese dishes properly. Growing up we ordered takeaways; my mother cooked simple Cantonese food at best, so every time I eat out in Chengdu I feel culture envy. I'd start with a weekend class — twice weekly for two months — then practise on colleagues who volunteer as judges. Imagine hosting a dinner where the fish-fragrant aubergine actually tastes like the restaurant. Beyond taste, cooking teaches patience and heat control — two skills that transfer directly into my job, where details decide everything before clients ever see the result.",
          "keywords": [
            "cook",
            "Sichuanese",
            "class",
            "weekly",
            "patience",
            "colleagues",
            "practise"
          ]
        },
        {
          "topic": "p2-book-exc",
          "card": "Describe an exciting book you have enjoyed reading.",
          "points": [
            "What the book is about",
            "When and where you read it",
            "Why it was exciting",
            "And explain what you learned from it"
          ],
          "ref": "The book is 'Folding Beijing'. I read it on the metro during the February travel rush, finishing it in three compartments. It imagines a futuristic city where different social classes share the same space in repeating 24-hour shifts — the rich wake at dawn, the middle class at noon, and labourers at night. What thrilled me was the structure of the story and the politics hiding beneath it. It reframed how I see my own city's inequalities. Since reading it, I notice invisible layers everywhere — in who gets the earliest table, the better seat, the quieter carriage.",
          "keywords": [
            "Folding Beijing",
            "metro",
            "classes",
            "shifts",
            "thrilled",
            "layers"
          ]
        },
        {
          "topic": "p2-tech-daily",
          "card": "Describe a piece of technology you use every day.",
          "points": [
            "What it is",
            "How often and for what you use it",
            "Why it is important to you",
            "And explain what you would do without it"
          ],
          "ref": "My phone is my entire life — navigation, WeChat groups, payment, camera, dictionary. I use it from waking to sleep, maybe six or seven hours honestly. But the feature I depend on most is the map app in real time: it rescued me in rainstorms in Chongqing, rerouted me around jams, and found me the only open noodle shop at midnight. Without it, I'd miss the bus three times a week and order food badly. Still, I set an app limit: no phone in bed after 12:30, or I lie awake doom-scrolling like everyone else.",
          "keywords": [
            "phone",
            "navigation",
            "map",
            "hours",
            "limit",
            "bus"
          ]
        }
      ],
      "part3": [
        {
          "topic": "p3-education",
          "q": "Do you think exams are the fairest way to measure students' abilities?",
          "ref": "Exams measure how you perform under pressure on one particular day, not who you really are. They reward memorisation over real understanding. That said, written exams are cheap to run at scale and hard to fake, so some standard measurement is useful. The fairer model is a blend: a few high-stakes exams plus coursework, presentations and practical projects that sample your abilities across the term. Pure exam pressure tells you little about a student's creativity, teamwork or practical judgement.",
          "keywords": [
            "exams",
            "pressure",
            "memorisation",
            "coursework",
            "practical"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Should schools pay more attention to practical skills than to academic knowledge?",
          "ref": "Both matter, but the balance is off. Schools produce exam-fit students who freeze on a form, a contract or a team conflict. Adding mandatory practical courses — financial literacy, conflict resolution, basic cooking or first aid — would change young people's lives far more than one more formula to memorise. Academic knowledge is the map; practical skill is the driving test. A map without driving practice is nearly useless in an emergency.",
          "keywords": [
            "balance",
            "practical",
            "course",
            "literacy",
            "map",
            "driving"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Do you think online education will replace traditional classrooms?",
          "ref": "For motivated adult learners, absolutely — platforms now deliver world-class lectures to a bedroom in a county town. But for most teenagers, school is also social training: discipline, friendship, teamwork and handling boredom. Online can supplement, but replacing the social layer would produce a generation of brilliant solo learners who cannot survive a meeting. Hybrid will win, not pure online.",
          "keywords": [
            "online",
            "platforms",
            "social",
            "discipline",
            "hybrid"
          ]
        },
        {
          "topic": "p3-education",
          "q": "What makes a good teacher, in your view?",
          "ref": "A good teacher changes how you think, not just what you know. They notice when you're lost before you do, ask you the question you're avoiding, and treat mistakes as information instead of shame. My best teachers shared three habits: they explained patiently, they told stories from real life, and they made you feel the answer belonged to you. Caring plus craft beats qualifications alone.",
          "keywords": [
            "think",
            "lost",
            "explained",
            "stories",
            "caring"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Should university education be free for everyone?",
          "ref": "Free tuition would widen access for students from poorer families, and society recovers the investment through taxation later. But zero cost usually means rationing by exam score, which hurts creative or vocational students. A smarter model is full scholarships for the bottom third of income plus generous income-contingent loans like Australia. Education should be affordable and ambitious, not merely free and crowded.",
          "keywords": [
            "tuition",
            "access",
            "taxation",
            "scholarships",
            "affordable"
          ]
        },
        {
          "topic": "p3-education",
          "q": "How important is lifelong learning in today's economy?",
          "ref": "In a world where software rewrites jobs every five years, one degree is a snapshot, not a career plan. Lifelong learning is now the baseline licence to stay relevant — it protects older workers whose expertise expires and helps young workers avoid obsolete specialisms. The future belongs to people who stay curious in public, learning in communities, not just alone at a screen.",
          "keywords": [
            "lifelong",
            "relevant",
            "career",
            "expertise",
            "curious"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Do you think technology has made people more alone or more connected?",
          "ref": "Both directions at once. Video calls stitch distant families together nightly — my grandmother and I watch opera together across 1,000 kilometres. But feed culture replaces depth with scrolling, and many 'connected' people eat alone headphones-in. The tool doesn't decide; how you use it does. Presence in your own home matters more than presence in the cloud.",
          "keywords": [
            "connected",
            "video",
            "scrolling",
            "depth",
            "presence"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Will artificial intelligence make many jobs disappear?",
          "ref": "AI will absorb routine work fastest — data entry, basic drafting, simple translation. But jobs built on trust, taste and physical presence — carers, negotiators, great teachers — will persist. The real divide is not jobs but tasks. The people who redefine their work around judgement and care will thrive; those who only memorise will be automated out by breakfast.",
          "keywords": [
            "AI",
            "routine",
            "trust",
            "judgement",
            "automated"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Do you think people spend too much time on social media?",
          "ref": "Yes — average daily use keeps climbing past three hours, and nobody feels better after. Social media is engineered like a casino: variable rewards, infinite scroll. Used for news, network and work it's powerful; used as default anaesthetic for every boredom pang, it erodes attention span and sleep. The fix is friction — timers, grey scale, one-screen rooms — not total abstinence, which never lasts.",
          "keywords": [
            "hours",
            "casino",
            "scroll",
            "attention",
            "friction"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Should there be more regulation of technology companies?",
          "ref": "Yes, but smart regulation beats blunt bans. Require transparency for recommendation algorithms, data portability across platforms, age-appropriate design for under-16, and independent audits. Europe is experimenting with the AI Act; China requires algorithm registration. The industry's self-regulation failed publicly for fifteen years. Regulation done well raises trust; done badly, it freezes innovation — neither extreme is acceptable.",
          "keywords": [
            "regulation",
            "transparency",
            "algorithms",
            "audits",
            "innovation"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "How has technology changed the way people shop?",
          "ref": "Shopping went from a Saturday errand to a background process. Now price comparison happens in seconds, authentic reviews steer choices, and delivery fits in an hour in big cities. Physical stores survive as experience centres — try, entertain, then order online. The skill shift is real: modern shoppers need scepticism for fake reviews and discipline for one-click impulses.",
          "keywords": [
            "comparison",
            "reviews",
            "delivery",
            "experience",
            "discipline"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "What new technology excites you most right now?",
          "ref": "Honestly, low-cost energy storage. Battery breakthroughs stretching electric buses further each year change air quality more than any trending app does. Also long-context AI assistants that remember your projects and deadlines — genuinely transformative for real work. Space launches thrill me, but boring infrastructure miracles like quiet motors and dead-cheap storage matter to people like us every single day.",
          "keywords": [
            "energy",
            "electric",
            "battery",
            "infrastructure",
            "storage"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Do you think modern cities have become less friendly?",
          "ref": "Superficially yes — everyone walks headphones-in and shares no eye contact. But look at weekend volunteer groups, community kitchens and neighbourhood rescue dogs. Friendliness in big cities moved from strangers in queues to chosen micro-communities. The friendship is there; the venue changed — from the market square to the group chat you chose on purpose.",
          "keywords": [
            "headphones",
            "communities",
            "volunteer",
            "neighbourhood",
            "friendship"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Do you believe celebrities have a responsibility to behave well?",
          "ref": "Yes, simply because millions copy them. A singer who quits smoking publicly moves more behaviour than a hundred posters. But purity policing every influencer's private life is unfair and impossible. The reasonable line: public speech and profit-linked endorsements must carry honesty — no selling pills you wouldn't take, no campaigning on hollow values. Actions in public view, yes; sainthood, never.",
          "keywords": [
            "singer",
            "copy",
            "endorsements",
            "honesty",
            "public"
          ]
        },
        {
          "topic": "p3-society",
          "q": "What role should grandparents play in raising children today?",
          "ref": "Grandparents provide continuity — language, patience, unhurried meals, stories with no agenda. In many Chinese families they carry daily care while parents work long hours, which keeps costs survivable. The tension is between loving indulgence and modern discipline: grandparents soften rules at exactly the moment consistency matters most. Best: grandparents as warmth and memory, parents as boundary-setters, both at the table weekly.",
          "keywords": [
            "continuity",
            "patience",
            "chinese",
            "warmth",
            "parents"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Is it true that people today are lonelier than before?",
          "ref": "Surveys say yes — and so do my own eyes. Door delivery, single households, WFH and algorithmic feeds make 'social' life individualistic. But loneliness isn't cured by more people near you; it's cured by few real ones around you. Urban loneliness is worst among the young elderly and the over-connected. Designing weekly rituals with actual neighbours beats any chat-app membership.",
          "keywords": [
            "surveys",
            "households",
            "WFH",
            "neighbours",
            "rituals"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Do you think tipping culture will ever work in China?",
          "ref": "Probably not — Chinese pricing culture bundles service into the listed price, and adding post-payment sums feels awkward here. Hong Kong and tourist districts run mixed models. Where quality differentiates, tips signal excellence without being mandatory. If Chinese consumers get transparent choice plus visibly better service for extra payment, fine; forced tipping screens at cafés will correctly annoy people like everyone.",
          "keywords": [
            "tipping",
            "service",
            "price",
            "tourist",
            "transparent"
          ]
        },
        {
          "topic": "p3-society",
          "q": "How important is punctuality in your society?",
          "ref": "Extremely. In interviews, pitches and group projects, five minutes early is the baseline. But formality relaxes among friends — 8 pm dinner starts at 8:20 in many circles. The cost of lateness is trust erosion: colleagues quietly re-route around unreliable people regardless of talent. Being five minutes early solves 90 behaviour problems nobody else ever sees.",
          "keywords": [
            "lateness",
            "trust",
            "reliable",
            "early",
            "interviews"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Do you recycle at home, and why or why not?",
          "ref": "Yes, mainly kitchen waste and paper. Our district fines non-compliance and the new bins are actually labelled with pictures now, so the learning curve is real. I don't always do it perfectly — festival packaging overwhelms everyone — but the habit now feels automatic, not virtuous. China recycled about 22 percent of municipal waste last year; it should be much higher by 2030.",
          "keywords": [
            "recycle",
            "kitchen",
            "bins",
            "habit",
            "packaging"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Should flights be taxed heavily to fight climate change?",
          "ref": "A blanket flight tax punishes ordinary families, not the polluters. Smarter: frequent-flyer pricing where the first annual flights stay affordable, business class pays more, and short-haul routes under 800km face meaningful carbon levies. Also, taxing jet fuel, not tickets, targets actual emissions. Aviation decarbonisation needs money and fairness, not slogans.",
          "keywords": [
            "flight",
            "frequent",
            "business",
            "carbon",
            "emissions"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Will electric cars really solve city air pollution?",
          "ref": "They solve tailpipe pollution, yes — my street feels measurably cleaner since half the courier bikes went electric. But total emissions depend on the grid mix: coal-heavy power just moves smoke to the upwind city. Real progress combines EVs, better buses, cycling lanes and shorter delivery chains. No single technology substitutes for urban design.",
          "keywords": [
            "electric",
            "tailpipe",
            "grid",
            "emissions",
            "buses"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Should companies be forced to reduce plastic packaging?",
          "ref": "Yes, gradually and with teeth. Extended-producer-responsibility fees, banned microbeads, mandatory recycled content targets — these force redesign that one shopper's boycott never will. Companies respond fast when numbers bite. The current Chinese crackdown echoes the EU's 2021 single-use directive — same logic, good direction. Give industry five years, not ten, or we'll drown politely.",
          "keywords": [
            "teeth",
            "microbeads",
            "recycled",
            "directive",
            "redesign"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "What is the best way to encourage people to use public transport?",
          "ref": "Make it faster, cheaper and kinder than the car, in that order. Dedicated bus lanes, metro expansion beyond tier-one cities, timetables that respect transfers, and stations with light, CCTV and clean toilets — these convert reluctant drivers more than posters ever will. Add congestion pricing on peak plates, and the math finally tips.",
          "keywords": [
            "faster",
            "cheaper",
            "bus",
            "metro",
            "congestion"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Do you think fake news is a serious problem?",
          "ref": "Yes, devastatingly. Health scares, election stories, disaster clips travel faster than corrections ever do. The damage lasts: vaccine hesitancy, financial panic, public distrust of legitimate journalism. Democracies now fund media-literacy curricula and verification hotlines — Sweden teaches schoolkids to fact-check TikTok. Technology will never fully solve it; citizen scepticism is the firewall.",
          "keywords": [
            "election",
            "corrections",
            "scepticism",
            "verification",
            "hesitancy"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Should journalists have completely free speech, or limits?",
          "ref": "Journalists deserve maximal speech protection plus maximal responsibility for accuracy. Libel law, source protection, right-to-reply — all fair. Publishing lies that endanger lives is not speech, it's sidearms. Independent press councils beat government censorship every time: they oversee conduct without owning the verdict. Free enough to challenge power, accountable enough to correct it.",
          "keywords": [
            "journalists",
            "speech",
            "libel",
            "responsibility",
            "censorship"
          ]
        },
        {
          "topic": "p3-media",
          "q": "What role do influencers play in shaping public opinion?",
          "ref": "Massive — often bigger than outlets for under-30s. A skincare influencer with 4 million followers moves product faster than any TV ad, and one malicious review can kill a brand in a day. Most influencers are educators without credentials or journalists without ethics training. Platforms should require disclosure, some literacy, and a verification track. Influence itself needs a licence plate.",
          "keywords": [
            "influencers",
            "followers",
            "disclosure",
            "verification",
            "influence"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Is entertainment more important than education in the media today?",
          "ref": "Yes, decisively. Entertainment feeds autoplay loops and ad revenue; education shows up when it entertains enough — think 200-episode documentaries or meme-based science accounts. The danger isn't that entertainment exists; it always did. It's that serious topics now have to disguise themselves as fun to be heard at all. Quality hides everywhere; make the boring thrilling and it wins.",
          "keywords": [
            "entertainment",
            "autoplay",
            "revenue",
            "documentaries",
            "thrilling"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Should we trust what we read on social media less than traditional newspapers?",
          "ref": "Absolutely, but with nuance. Quality newspapers maintain corrections, fact desks and named bylines — real accountability. Social media is a rumour engine unless the post is from a verified expert or primary source. The skill is triage: my rule is social media says 'what might be happening', newspaper says 'what did happen'. Treat feeds as hints, then verify with one good outlet.",
          "keywords": [
            "social",
            "newspapers",
            "corrections",
            "verified",
            "verify"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Do you think people today work longer hours than before?",
          "ref": "Both true and hidden. Officially we work shorter weeks, but connectivity bleeds work into evenings — Slack pings at 10 pm, WeChat group demands on Sundays. Tech blurs every boundary until people feel always on. The rise of996 culture in China against a global push for four-day weeks tells you the fight is about attention, not just hours. True rest requires rules, not good intentions.",
          "keywords": [
            "hours",
            "connectivity",
            "evenings",
            "attention",
            "996"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should everyone be forced to retire at a fixed age?",
          "ref": "A rigid line ignores reality. Some 55-year-olds sprint while some 45-year-olds crawl; average health, role type and personal preference vary wildly. Flexible retirement with phased hours and strong pensions serves teams better. Mandatory age exits waste expertise and punish the healthy. Society needs gradual exits, not cliff edges — knowledge passed on through mentoring, not boxed away at midnight on a birthday.",
          "keywords": [
            "retire",
            "flexible",
            "pensions",
            "mentoring",
            "expertise"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Is working from home good for employees or employers?",
          "ref": "Both, when designed well: employees save commutes and deep focus; employers save space and widen talent pools internationally. The weakness is weak culture — new joiners miss the corridor osmosis learning from veterans. Hybrid models now win: two anchor days together, three remote for heads-down work. Trust-based home work beats surveillance-based home work every single time.",
          "keywords": [
            "commutes",
            "focus",
            "culture",
            "hybrid",
            "remote"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Do you think salary or job satisfaction matters more when choosing work?",
          "ref": "Salary buys stability; satisfaction buys years. Underpay skilled people and they leave by March; bored high earners burn out by year three. The smart default is competence plus meaning — you practise work you respect, for pay that respects you. Extremes both fail: starving for art demoralises; overpaid misery destroys health slowly. Compensation first for survival, satisfaction second for survival-of-the-soul.",
          "keywords": [
            "salary",
            "satisfaction",
            "stability",
            "burn",
            "meaning"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should companies hire based on qualifications or practical experience?",
          "ref": "Practical experience for 80 percent of roles. Degrees prove you can sit still and memorise; hands-on work proves you can ship. The exceptions are medicine and engineering, where foundations are non-negotiable. Modern hiring should weight portfolios, trials and referrals heavily — skills interviews over school prestige. Hire for evidence of behaviour, not paper promises of potential.",
          "keywords": [
            "degrees",
            "experience",
            "portfolios",
            "evidence",
            "behaviour"
          ]
        },
        {
          "topic": "p3-work",
          "q": "How will offices change in the next decade?",
          "ref": "Offices become clubs for collaboration, not warehouses for execution. Individual tasks move home permanently; the office sells whiteboards, workshops and unplanned serendipity. Floor plans shrink, booking systems rise, acoustic privacy becomes premium. The best offices will feel like creative hubs with coffee and silence zones — attendance by purpose, never by default.",
          "keywords": [
            "collaboration",
            "execution",
            "serendipity",
            "purpose",
            "hubs"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Is it important for young people to learn about their own culture?",
          "ref": "Yes — cultural literacy is identity armour. Without knowing dumpling origins, dialect expressions and folk stories, young people drift into generic global consumers. Culture tells you who you are before you decide who to be. The trick is teaching it lively, not as test material: festivals as parties, dialects as comedy, history as mystery novels. Boring culture class creates resentment; living culture creates pride.",
          "keywords": [
            "cultural",
            "identity",
            "dialect",
            "history",
            "festivals"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "How can governments protect traditional customs?",
          "ref": "Fund living practice, not museums behind glass. Apprenticeships for craftspeople, festivals with real budgets, school visits with hands-on workshops, and tax relief for heritage businesses. UNESCO lists status helps visibility but money sustains survival. Protect customs by making them economically viable and emotionally fun — then young people choose them, not just preserve them out of guilt.",
          "keywords": [
            "customs",
            "workshops",
            "festivals",
            "heritage",
            "viable"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Do you think modern lifestyles are destroying traditional culture?",
          "ref": "Changing it, not destroying it. Global style dominates surfaces — coffee over tea in capsules, basketball over shuttlecock — but deep structure persists: Spring Festival travel, ancestral halls, zhong soup when sick. Cultures evolve or die; forced preservation produces theme parks. The question is not old versus new but meaningful versus disposable. Keep what teaches, adapt what feeds, drop what merely repeats.",
          "keywords": [
            "destroying",
            "festival",
            "evolve",
            "ancestral",
            "meaningful"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Should museums be free to enter?",
          "ref": "Yes, like libraries — free entry is social infrastructure. Charges filter out exactly the curious poor who need them most. Funding can come from gift shops, memberships, tourist tickets and city budgets. The British Museum and Palace Museum prove accessibility works: attendance explodes when free, trust grows, education compounds. Pay the curators; waive the entrance gate.",
          "keywords": [
            "museum",
            "libraries",
            "infrastructure",
            "accessibility",
            "curators"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "What is the value of art in everyday life?",
          "ref": "Art trains the attention we waste on screens. A good poster makes you pause; a street violinist resets your commute; a subway mural teaches colour before language. Art democratises beauty — hospitals with paintings heal measurably faster. Everyone deserves culture without a ticket price. When cities invest in public art, they invest in citizens' mental health and civic pride simultaneously.",
          "keywords": [
            "art",
            "attention",
            "commute",
            "beauty",
            "public"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Do you prefer spending money on experiences or possessions?",
          "ref": "Experiences, decisively. Memories survive apartment moves and phone upgrades; objects depreciate and clutter. A weekend in Dali outlasts any jacket. That said, possessions like books, instruments and well-made tools earn their space by enabling more experiences. Spend on doing, not having — except the few things that upgrade every doing forever.",
          "keywords": [
            "experiences",
            "memories",
            "objects",
            "possessions",
            "books"
          ]
        }
      ]
    }
  },
  {
    "id": "mock-2026-12",
    "month": "2026-12",
    "title": "2026年12月刊 · 年末假期",
    "difficulty": "基础",
    "theme": "年末假期",
    "blurb": "双旦与春运之间：年末假期主题全真演练——春运购票、社区灯会、节庆经济专题讲座，90 分钟后你会知道自己的雅思口语和听力到底站在哪一档。",
    "coverage": [
      "p1-chocolate",
      "p1-family",
      "p1-films",
      "p1-gifts",
      "p1-holidays",
      "p1-meals",
      "p1-travelling",
      "p1-weekends",
      "p2-event-happy",
      "p2-event-shop",
      "p2-event-weekend",
      "p2-people-family",
      "p2-thing-gift",
      "p3-culture",
      "p3-education",
      "p3-environment",
      "p3-media",
      "p3-society",
      "p3-technology",
      "p3-work"
    ],
    "listening": [
      {
        "section": "Section 1",
        "passage": "Woman: Good morning, Spring Air official ticket office, how can I help you?\nMan: Hello, I'd like to book two tickets for the high-speed train from Shanghai to Guangzhou on the 31st of this month.\nWoman: Of course. Which class would you like — first class or second class?\nMan: Second class, please. And we'd prefer the earliest morning departure if possible.\nWoman: Let me check. On the 31st there's a departure at 7:10 and another at 8:45. The 7:10 has only three seats left together; the 8:45 has plenty of availability.\nMan: We'll take the 7:10 then. How long does the journey take?\nWoman: About six hours and twenty minutes, with a quiet carriage and power sockets at every seat. Snacks are included, and if you download our app, you can also order hot meals delivered to your seat during the journey.\nMan: That's convenient. How much is it for two?\nWoman: Second class is 862 yuan per person, so that's 1,724 yuan total. If you take the 8:45 instead, there's a holiday promotion — 10 percent off bookings of two or more tickets.\nMan: Hmm. 1,552 yuan for two on the 8:45 sounds tempting, but honestly, catching the 7:10 matters more — we need to prepare the New Year dinner before the evening rush.\nWoman: No problem. Can I have the names as on your ID cards?\nMan: Sure — Chen Wei and Chen Xiaoyu.\nWoman: And a phone number for the booking?\nMan: 138-2654-9012.\nWoman: Right. Payment can be made now by card, or within 30 minutes via our app. I'm holding the seats for 15 minutes while you decide.\nMan: Let's pay now. By the way — what about festive overcrowding at the station? I've heard it's chaos before the holiday.\nWoman: It's busy, yes. We suggest arriving at least 40 minutes early. Security checks are strict, and the gates close five minutes before departure.\nMan: Noted. One more thing — can we change to a different train later if plans change?\nWoman: Yes, free of charge up to 15 days before departure; after that, a fee of 20 percent applies within 48 hours of departure.\nMan: Understood. Please go ahead and charge my card.\nWoman: All done. Your booking reference is SF-2031874. Have a safe trip, and happy New Year in advance!\nMan: Thank you very much. Goodbye!",
        "questions": [
          {
            "q": "When does the man want to travel?",
            "opts": [
              "On the 1st of next month",
              "On the 31st of this month",
              "For the whole New Year week",
              "Next Friday afternoon"
            ],
            "right": 1,
            "explain": "男士说：on the 31st of this month。"
          },
          {
            "q": "Why does the man prefer the 7:10 train?",
            "opts": [
              "It is cheaper",
              "It has power sockets",
              "He needs to prepare the New Year dinner",
              "The 8:45 is full"
            ],
            "right": 2,
            "explain": "原文：catching the 7:10 matters more — we need to prepare the New Year dinner。"
          },
          {
            "q": "How many seats are left together on the 7:10?",
            "opts": [
              "One",
              "Two",
              "Three",
              "Plenty"
            ],
            "right": 2,
            "explain": "原文：The 7:10 has only three seats left together。"
          },
          {
            "q": "How long is the journey?",
            "opts": [
              "About six hours and twenty minutes",
              "Four hours",
              "Eight hours",
              "Seven hours and ten minutes"
            ],
            "right": 0,
            "explain": "原文：About six hours and twenty minutes。"
          },
          {
            "q": "What is included in second class?",
            "opts": [
              "Hot meals by default",
              "Snacks",
              "A window seat guarantee",
              "Free Wi-Fi only"
            ],
            "right": 1,
            "explain": "原文：Snacks are included。"
          },
          {
            "q": "How can passengers order hot meals on board?",
            "opts": [
              "By asking the conductor directly",
              "By phone to the restaurant car",
              "By downloading the app",
              "By pre-paying at the station"
            ],
            "right": 2,
            "explain": "原文：if you download our app, you can also order hot meals delivered to your seat。"
          },
          {
            "q": "How much does the man pay in total?",
            "opts": [
              "862 yuan",
              "1,552 yuan",
              "1,724 yuan",
              "2,000 yuan"
            ],
            "right": 2,
            "explain": "862 × 2 = 1,724 元；促销价 1,552 仅适用于 8:45 车次。"
          },
          {
            "q": "How early is it suggested to arrive at the station?",
            "opts": [
              "10 minutes before departure",
              "20 minutes before departure",
              "At least 40 minutes before departure",
              "2 hours before departure"
            ],
            "right": 2,
            "explain": "原文：arriving at least 40 minutes early。"
          },
          {
            "q": "Until when can the man change trains for free?",
            "opts": [
              "Up to 48 hours before departure",
              "Up to 15 days before departure",
              "Any time, always free",
              "Only on the day of travel"
            ],
            "right": 1,
            "explain": "原文：free of charge up to 15 days before departure。"
          },
          {
            "q": "What is the booking reference for the man's tickets?",
            "opts": [
              "SF-2031874",
              "NY-1182737",
              "TR-9981205",
              "SF-6023187"
            ],
            "right": 0,
            "explain": "原文：Your booking reference is SF-2031874。"
          }
        ]
      },
      {
        "section": "Section 2",
        "passage": "Good evening everyone, and welcome to Community Radio, broadcasting from the Jing'an district community centre. Today we have a very special announcement about this year's Winter Light Festival, happening on Saturday the 26th of December from 6 pm until 10 pm in People's Park, right here in Jing'an.\nFirst, a word about how to get there. If you're taking the metro, please exit at Gate 3 of People's Square station and follow the blue lantern signs. For those driving, parking around the park will be extremely limited on the night, and the northern car park will close at 4 pm for event setup, so public transport is strongly recommended. There will also be extra bus runs: the 42 and the 109 will run every 8 minutes between 6 and 10:30 pm.\nNow the programme highlights. At 6:30, the official opening ceremony will feature the district choir and the lighting of the main Christmas tree, which stands 18 metres tall this year. At 7:30, the drone light show begins — weather permitting — forming the characters for 'New Year's greetings' above the lake. At 8:30, the community seniors will perform a traditional lion dance near the main stage. And from 9 to 10 pm, there's a fireworks finale on the hour.\nFood and drink: fourteen stalls will line the south promenade, offering roast chestnuts, hot wonton soup, baked sweet potatoes, mulled cider and festive pastries. All stalls are cashless this year — they accept mobile payment only — so please bring your phone or a payment card.\nFor families, the children's craft tent stays open until 9:30 pm, with free make-your-own lantern workshops. The library tent collects donated storybooks for the winter book donation drive — last year we gathered over 3,000 books for rural primary schools, and this year the organiser hopes to beat that number.\nA few important notices. Entry is free, but the number of visitors is capped at around 8,000 for safety. Arrive before 7 pm for comfortable viewing. The lion-dance area will be cordoned off for 15 minutes after each performance. And please remember: do not touch or climb any light installations — they are works by local artists and quite fragile.\nIf you have any questions, call the community centre hotline on 12345-678 or check our official WeChat account, jing'ancommunity. The festival is organised by the district cultural bureau together with twelve local universities and more than forty volunteers. See you there, and happy holidays!",
        "questions": [
          {
            "q": "When and where is the Winter Light Festival?",
            "opts": [
              "Sunday 25th at Fuxing Park",
              "Saturday 26th of December at People's Park",
              "Friday 25th at People's Square",
              "Thursday 24th at People's Park"
            ],
            "right": 1,
            "explain": "原文：on Saturday the 26th of December ... in People's Park。"
          },
          {
            "q": "What will close early for event setup?",
            "opts": [
              "The metro station",
              "The northern car park",
              "Gate 3",
              "The south promenade"
            ],
            "right": 1,
            "explain": "原文：the northern car park will close at 4 pm for event setup。"
          },
          {
            "q": "How often will bus 42 and bus 109 run during the event?",
            "opts": [
              "Every 5 minutes",
              "Every 10 minutes",
              "Every 8 minutes",
              "Every 15 minutes"
            ],
            "right": 2,
            "explain": "原文：the 42 and the 109 will run every 8 minutes。"
          },
          {
            "q": "What happens at 7:30?",
            "opts": [
              "The opening ceremony",
              "The lion dance",
              "The fireworks finale",
              "The drone light show"
            ],
            "right": 3,
            "explain": "原文：At 7:30, the drone light show begins。"
          },
          {
            "q": "How tall is the Christmas tree this year?",
            "opts": [
              "12 metres",
              "15 metres",
              "18 metres",
              "20 metres"
            ],
            "right": 2,
            "explain": "原文：which stands 18 metres tall this year。"
          },
          {
            "q": "How will payment work at the food stalls?",
            "opts": [
              "Cash only",
              "Cashless, mobile payment and cards",
              "Tokens bought at the gate",
              "Free for all visitors"
            ],
            "right": 1,
            "explain": "原文：All stalls are cashless this year — they accept mobile payment only。结合 brings phone or payment card。"
          },
          {
            "q": "Until what time does the children's craft tent stay open?",
            "opts": [
              "8:30 pm",
              "9 pm",
              "9:30 pm",
              "10 pm"
            ],
            "right": 2,
            "explain": "原文：the children's craft tent stays open until 9:30 pm。"
          },
          {
            "q": "What is the library tent collecting?",
            "opts": [
              "Food donations",
              "Winter clothes",
              "Storybooks for rural schools",
              "Toys for orphanages"
            ],
            "right": 2,
            "explain": "原文：collects donated storybooks for the winter book donation drive。"
          },
          {
            "q": "What is the attendance cap for the festival?",
            "opts": [
              "5,000 visitors",
              "8,000 visitors",
              "10,000 visitors",
              "No limit"
            ],
            "right": 1,
            "explain": "原文：the number of visitors is capped at around 8,000。"
          },
          {
            "q": "What are parents asked NOT to do?",
            "opts": [
              "Bring food into the park",
              "Climb or touch light installations",
              "Arrive after 9 pm",
              "Use the craft tent"
            ],
            "right": 1,
            "explain": "原文：do not touch or climb any light installations。"
          }
        ]
      },
      {
        "section": "Section 3",
        "passage": "Sarah: So for our project on the economics of festivals, do we still agree on comparing the Spring Festival travel rush with Western Christmas markets?\nTom: Yes, but we need to narrow it down. Comparing everything will be vague. Let's focus on one thing: holiday consumer behaviour — what people buy, why, and what that does to local economies.\nSarah: Agreed. My grandmother's town in Fujian comes alive every Lunar New Year — the temple fair, the sugar-painting stalls, the paper-burning rituals. Meanwhile last year in Basel, I saw Christmas market stalls selling gingerbread to tourists at triple the price locals would pay. Same festival logic, different mechanism.\nTom: I like that pairing — temple fairs versus Christmas markets. It shows both the cultural pull and the commercial layer on top.\nSarah: Shall we do interviews?\nTom: We have a sample problem. We only have time for about fifteen interviews. Fieldwork there is expensive — I'd need at least three days travelling.\nSarah: Alternatively, we collect secondary data — the National Bureau of Statistics publishes festive retail sales every year, and the EU does the same for December trade. Then interviews are only illustrative, not our evidence base.\nTom: That's more realistic. Two days of data cleaning versus a week of fieldwork — and the numbers will be stronger anyway.\nSarah: For the presentation, we need a structure. I'll do the introduction and the Chinese data section, you handle the European data and the comparative analysis, then we both discuss what each model gets right.\nTom: And our discussion chapter needs a critical angle — festive consumption isn't just tradition; it's engineered urgency. Marketing manufactures 'must-buy' lists for gifts, feasts and travel. Without them, what would we even celebrate?\nSarah: Careful — that sounds a bit cynical for academic writing.\nTom: But it's true and it's interesting. We can phrase it properly: 'commercialisation amplifies festive behaviour without replacing its cultural core' — that's an arguable thesis, not a rant.\nSarah: I like it. Now practicalities: our tutor said the report is due the 15th of January, four weeks before the symposium on the 12th of February.\nTom: Presentation first, then the written version?\nSarah: No — tutor said report first on the 15th, symposium in February. And we present slides, not a paper, at the symposium.\nTom: Right. And please, nobody start the data section with the 2019 baseline — use 2020 onward, that's the pre- and post-pandemic shift everyone cares about.\nSarah: Action items: I'll request the NBS data tomorrow, you grab the Eurostat reports by Friday, and we meet again on Wednesday to agree the interview questions.\nTom: Deal. One last thing — the bibliography. I hate doing bibliographies.\nSarah: Fine, I'll draft it early so we don't suffer later.",
        "questions": [
          {
            "q": "What topic have the students agreed to narrow their project down to?",
            "opts": [
              "Festivals worldwide",
              "Holiday consumer behaviour",
              "Travel marketing",
              "Winter sports tourism"
            ],
            "right": 1,
            "explain": "Tom：focus on one thing: holiday consumer behaviour。"
          },
          {
            "q": "Which comparison does Sarah suggest?",
            "opts": [
              "Temple fairs in Fujian vs Christmas markets in Basel",
              "Chinese New Year trains vs Western airports",
              "Christmas trees vs Lunar lanterns",
              "Street food vs supermarket deals"
            ],
            "right": 0,
            "explain": "原文：temple fairs versus Christmas markets。"
          },
          {
            "q": "Why did Tom reject doing fieldwork?",
            "opts": [
              "It is academically weak",
              "He dislikes interviewing",
              "It is expensive and time-consuming",
              "His tutor forbade it"
            ],
            "right": 2,
            "explain": "Tom：Fieldwork there is expensive — I'd need at least three days travelling。"
          },
          {
            "q": "Where will their main evidence come from?",
            "opts": [
              "Interviews with tourists",
              "Online questionnaires",
              "Secondary statistics from official sources",
              "Newspaper articles"
            ],
            "right": 2,
            "explain": "Sarah：we collect secondary data — the National Bureau of Statistics ... and the EU does the same。"
          },
          {
            "q": "How many interviews are they able to do?",
            "opts": [
              "About five",
              "About fifteen",
              "About fifty",
              "None"
            ],
            "right": 1,
            "explain": "原文：We only have time for about fifteen interviews。"
          },
          {
            "q": "Who will present the comparative analysis section?",
            "opts": [
              "Sarah alone",
              "Tom",
              "Both together",
              "Their tutor"
            ],
            "right": 1,
            "explain": "Sarah：you handle the European data and the comparative analysis。"
          },
          {
            "q": "What critical angle does Tom want in the discussion?",
            "opts": [
              "Festivals are disappearing",
              "Celebration is manufactured urgency by marketing",
              "Tourists ruin everything",
              "Statistics are unreliable"
            ],
            "right": 1,
            "explain": "Tom：marketing manufactures 'must-buy' lists ... engineered urgency。"
          },
          {
            "q": "When is the written report due?",
            "opts": [
              "The 15th of January",
              "The 12th of February",
              "The 1st of January",
              "The 26th of December"
            ],
            "right": 0,
            "explain": "原文：the report is due the 15th of January。"
          },
          {
            "q": "How will they present at the symposium?",
            "opts": [
              "With the full written paper",
              "With posters",
              "With slides only",
              "With a video"
            ],
            "right": 2,
            "explain": "原文：we present slides, not a paper, at the symposium。"
          },
          {
            "q": "From which year does Tom want the data analysis to start?",
            "opts": [
              "2015",
              "2018",
              "2019",
              "2020"
            ],
            "right": 3,
            "explain": "Tom：use 2020 onward, that's the pre- and post-pandemic shift。"
          }
        ]
      },
      {
        "section": "Section 4",
        "passage": "Today's lecture continues our series on consumer psychology, and the topic is festive consumption — what exactly happens to buying behaviour during December and the Lunar New Year season. Let me paint the overall picture first. Retail trade in December alone accounts for roughly 18 to 25 percent of annual turnover for many gift-and-food retailers, yet December is only about 8 percent of the calendar. Why is the gap so enormous?\nThe first mechanism is social signalling. Gifts are never just objects; they carry messages about relationship status, gratitude, and belonging. A 300-yuan gift to a colleague says 'we work well together'; an empty-handed visit to relatives implies indifference. Anthropologists call this the 'obligation to reciprocate' — once you receive, you must return something of comparable value, and the cycle compounds across the season.\nThe second mechanism is manufactured urgency. Shops run countdowns, limited editions and 'festival exclusives'. Neurologically, scarcity triggers loss aversion: the fear of missing out on something 'limited' peaks when time pressure is explicit — 48-hour offers, daily deal counts, stock counters. People buy not because they need the item, but because missing it feels like a loss.\nThird: memory and identity. Festive consumption is ritual glue. The same sweets every year, the same empty candy tray refilled before guests arrive, the same box of longans from the same brand — these repetitions stabilise identity across generations. Children who watch their parents buy the same pineapple cake every New Year inherit not just a snack preference but a ritual map of 'what our family does'.\nNow the numbers, briefly. In 2025, Chinese New Year spending during the golden week reached an estimated 1.2 trillion yuan, led by food, travel and digital red packets. Cross-border e-commerce saw a 30 percent spike in 'gift boxes' shipments. Research across cultures finds the same curve: festive peaks cluster around three categories — food and dinner parties, gifting, and experience purchases like cinema, travel and dining out.\nSo what are the practical consequences? For households: budget creep — people typically overspend by 15 to 30 percent during festive seasons versus ordinary months; set a written list before entering any supermarket. For young workers: financial stress peaks in January, so employers offering festive bonuses reduce anxiety more than equivalent salary in June. For retailers: the real competition starts in November, because habits are set early — early-bird buyers define the season's narrative.\nFinally, a reflective note. Not all of this is pathology. Festive spending supports millions of livelihoods — artisans, shopkeepers, delivery drivers, caterers. The healthy stance is conscious participation: celebrate, but with a deliberate list, a real budget, and one moment of asking 'is this gift for them, or for how I want to look?' That single question cuts unnecessary spending by roughly a fifth in our survey data. Next lecture: the psychology of hospitality — why 'the more you host, the more you show'.",
        "questions": [
          {
            "q": "What percentage of annual turnover do many gift-and-food retailers make in December?",
            "opts": [
              "About 8 percent",
              "About 18 to 25 percent",
              "About 50 percent",
              "About 30 percent"
            ],
            "right": 1,
            "explain": "原文：Retail trade in December alone accounts for roughly 18 to 25 percent of annual turnover。"
          },
          {
            "q": "What does the lecturer mean by 'obligation to reciprocate'?",
            "opts": [
              "Shops must refund unwanted gifts",
              "Once you receive a gift you must return something of comparable value",
              "Everyone should spend the same amount",
              "Gifts should only flow one way"
            ],
            "right": 1,
            "explain": "原文：once you receive, you must return something of comparable value。"
          },
          {
            "q": "What psychological effect does scarcity trigger?",
            "opts": [
              "Loss aversion",
              "Confirmation bias",
              "Survivorship bias",
              "Anchoring on price"
            ],
            "right": 0,
            "explain": "原文：scarcity triggers loss aversion。"
          },
          {
            "q": "Why do festive rituals repeat the same items every year?",
            "opts": [
              "They are cheapest that way",
              "They stabilise identity across generations",
              "Shops force it by law",
              "Nothing else tastes as good"
            ],
            "right": 1,
            "explain": "原文：these repetitions stabilise identity across generations。"
          },
          {
            "q": "According to the lecturer, festive peaks cluster around which three categories?",
            "opts": [
              "Clothes, phones and cars",
              "Food and dinner parties, gifting, experience purchases",
              "Beauty, electronics and travel",
              "Games, books and films"
            ],
            "right": 1,
            "explain": "原文：festive peaks cluster around three categories — food and dinner parties, gifting, and experience purchases。"
          },
          {
            "q": "How much did Chinese New Year golden week spending reach in 2025?",
            "opts": [
              "Around 500 billion yuan",
              "Around 800 billion yuan",
              "Around 1.2 trillion yuan",
              "Around 2 trillion yuan"
            ],
            "right": 2,
            "explain": "原文：reached an estimated 1.2 trillion yuan。"
          },
          {
            "q": "By how much do households typically overspend during festive seasons?",
            "opts": [
              "5 to 10 percent",
              "15 to 30 percent",
              "40 percent",
              "They do not overspend"
            ],
            "right": 1,
            "explain": "原文：people typically overspend by 15 to 30 percent。"
          },
          {
            "q": "When does the lecturer say employers can most reduce employee anxiety with bonuses?",
            "opts": [
              "June",
              "November",
              "January",
              "August"
            ],
            "right": 2,
            "explain": "原文：financial stress peaks in January, so employers offering festive bonuses reduce anxiety more than equivalent salary in June。"
          },
          {
            "q": "When does 'the real competition' for retailers begin?",
            "opts": [
              "December",
              "February",
              "October",
              "November"
            ],
            "right": 3,
            "explain": "原文：the real competition starts in November, because habits are set early。"
          },
          {
            "q": "What single question cuts unnecessary festive spending by about a fifth?",
            "opts": [
              "Is this the cheapest option?",
              "Is this gift for the recipient, or for how I want to look?",
              "Will this still be useful in June?",
              "Can I return it later?"
            ],
            "right": 1,
            "explain": "原文：'is this gift for them, or for how I want to look?' ... cuts unnecessary spending by roughly a fifth。"
          }
        ]
      }
    ],
    "speaking": {
      "part1": [
        {
          "topic": "p1-holidays",
          "q": "Do you have any special holidays coming up soon?",
          "ref": "Yes, Spring Festival is coming up in February. My company gives us seven days off this year, so my plan is to go back to my grandparents' village for the first few days and simply rest, eat well and see relatives I haven't met since last year.",
          "keywords": [
            "Spring Festival",
            "days off",
            "village",
            "rest",
            "relatives"
          ]
        },
        {
          "topic": "p1-holidays",
          "q": "How do you usually spend your holidays?",
          "ref": "Mostly around family. We have a big dinner on New Year's Eve, sleep in until noon for a couple of days, and then take one short trip somewhere — last year we went to Hangzhou for the lantern festival by West Lake.",
          "keywords": [
            "family",
            "dinner",
            "sleep",
            "trip",
            "lantern"
          ]
        },
        {
          "topic": "p1-holidays",
          "q": "Which is your favourite holiday of the year?",
          "ref": "Without question, Spring Festival. The whole city slows down, every restaurant serves family reunion banquets, and you get this rare feeling that everyone is home at the same time — it feels like the one week when the country actually rests.",
          "keywords": [
            "Spring Festival",
            "rests",
            "reunion",
            "city"
          ]
        },
        {
          "topic": "p1-holidays",
          "q": "Do you prefer holidays at home or travelling?",
          "ref": "It depends on the length. For three or four days, travelling is tempting, but Spring Festival crowds make trains exhausting, so I usually just stay home for the peak days and save travelling for the quiet weeks afterwards.",
          "keywords": [
            "depends",
            "travelling",
            "crowds",
            "home"
          ]
        },
        {
          "topic": "p1-holidays",
          "q": "Do you think people nowadays take enough holidays?",
          "ref": "Legally, yes, but in practice many people don't use their full allowance. Some feel guilty taking time off, and others simply cannot escape work messages. Resting properly should be a skill we teach, not a luxury people apologise for.",
          "keywords": [
            "allowance",
            "guilty",
            "messages",
            "luxury"
          ]
        },
        {
          "topic": "p1-gifts",
          "q": "Do you enjoy giving gifts to your friends?",
          "ref": "I really do. Choosing a gift forces you to pay attention — you remember what someone mentioned weeks ago. Last autumn I noticed a colleague kept admiring a certain teapot, so I found the exact one for her birthday.",
          "keywords": [
            "choosing",
            "attention",
            "colleague",
            "birthday"
          ]
        },
        {
          "topic": "p1-gifts",
          "q": "What is the most memorable gift you have ever received?",
          "ref": "A fountain pen from my grandfather when I finished university. It wasn't expensive, but he'd repaired cars for forty years and this was the pen he'd used to sign every contract. It means more to me than anything money could buy.",
          "keywords": [
            "pen",
            "grandfather",
            "university",
            "contract"
          ]
        },
        {
          "topic": "p1-gifts",
          "q": "Do you prefer giving gifts or receiving them?",
          "ref": "Giving, honestly. Receiving is pleasant, but the real joy is watching someone's face when they realise the gift truly shows you know them — that gap between 'they got me something' and 'they really get me' is everything.",
          "keywords": [
            "giving",
            "joy",
            "watching",
            "know"
          ]
        },
        {
          "topic": "p1-gifts",
          "q": "How do you usually choose a gift for someone?",
          "ref": "I start with their habits, not their wish list. I ask myself: what do they complain about, what do they light up over, what did they almost buy? A good gift answers one of those three questions better than they could themselves.",
          "keywords": [
            "habits",
            "complain",
            "light",
            "answers"
          ]
        },
        {
          "topic": "p1-gifts",
          "q": "Is gift-giving important in your culture?",
          "ref": "Extremely. During Spring Festival we exchange red envelopes, gift boxes of tea, fruit or nuts, and nobody shows up empty-handed to a relative's home. Gifts there are not really about objects — they're a way of saying 'I value this relationship enough to think about you'.",
          "keywords": [
            "envelopes",
            "gift",
            "relationship",
            "Spring Festival"
          ]
        },
        {
          "topic": "p1-meals",
          "q": "What do you usually eat for breakfast?",
          "ref": "Something simple — soy milk and a couple of eggs, or congee from the breakfast shop downstairs when I'm running late. I used to skip breakfast entirely, but I get headaches by 11 am now if I do.",
          "keywords": [
            "soy milk",
            "eggs",
            "congee",
            "headaches"
          ]
        },
        {
          "topic": "p1-meals",
          "q": "Do you prefer eating at home or eating in restaurants?",
          "ref": "Mostly home. Cooking for myself is cheaper and I control the salt and oil, which I care about. Restaurants are for occasions — birthdays, reunions — when the cooking itself is part of the celebration rather than just feeding people.",
          "keywords": [
            "home",
            "cooking",
            "occasions",
            "reunions"
          ]
        },
        {
          "topic": "p1-meals",
          "q": "What was your favourite meal when you were a child?",
          "ref": "My mother's soup dumplings on Sunday mornings — little pork parcels you had to eat with the skin in one bite, burning your tongue every single time. I still think about that texture when food gets stressful at work.",
          "keywords": [
            "mother",
            "dumplings",
            "bite",
            "burning"
          ]
        },
        {
          "topic": "p1-meals",
          "q": "Do you think people eat too much fast food these days?",
          "ref": "Absolutely, and mostly for time reasons rather than taste. When you're ordering at 9 pm after a double shift, a burger beats chopping vegetables every time. The problem is when it becomes every meal, because then sodium and fried oil compound quietly for years.",
          "keywords": [
            "time",
            "ordering",
            "sodium",
            "compound"
          ]
        },
        {
          "topic": "p1-meals",
          "q": "What would your ideal dinner be?",
          "ref": "Hotpot, without question — a pot of bubbling broth in the middle, everyone reaching for a dipping bowl, arguing over which meat went in too soon. It's chaotic, loud and social, which is exactly what eating should be more often than it is.",
          "keywords": [
            "hotpot",
            "broth",
            "social",
            "chaotic"
          ]
        },
        {
          "topic": "p1-weekends",
          "q": "How do you usually spend your weekends?",
          "ref": "Slow mornings for sure — I never set an alarm on Saturdays. Then gym or a long walk, one proper meal cooked at home, and either a film or meeting friends in the evening. Sundays are for laundry, tidying and preparing the week so Monday doesn't bite.",
          "keywords": [
            "slow",
            "gym",
            "cooked",
            "Sundays"
          ]
        },
        {
          "topic": "p1-weekends",
          "q": "Do you have the same routine every weekend?",
          "ref": "Roughly. The skeleton stays the same — sleep in, one outing, one good meal — but the middle is flexible. Some weekends I hike with friends, others I just plant myself on the sofa with a book and call it self-care.",
          "keywords": [
            "skeleton",
            "flexible",
            "hike",
            "self-care"
          ]
        },
        {
          "topic": "p1-weekends",
          "q": "What did you do last weekend?",
          "ref": "We drove to a suburban IKEA in the morning — yes, it's basically a sport at this point — then had hotpot for lunch. In the afternoon I repotted two dying houseplants and somehow resurrected one of them. Small victory.",
          "keywords": [
            "IKEA",
            "hotpot",
            "afternoon",
            "houseplants"
          ]
        },
        {
          "topic": "p1-weekends",
          "q": "Would you like to have more free time on weekends?",
          "ref": "Everyone would, but I'd probably fill it badly. Two days off sounds ideal until you remember half of it evaporates into errands. Maybe I'd rather have one proper four-day break per season than endless flat weekends that blur into laundry.",
          "keywords": [
            "errands",
            "four-day",
            "weekends",
            "laundry"
          ]
        },
        {
          "topic": "p1-weekends",
          "q": "Do you think weekends are important?",
          "ref": "Completely. They're where your nervous system resets. Without weekends, the week becomes one long Tuesday, and you start making strange decisions like buying espresso machines you'll never use. Rest is not the reward for work; it's the fuel for it.",
          "keywords": [
            "nervous",
            "resets",
            "reward",
            "fuel"
          ]
        },
        {
          "topic": "p1-family",
          "q": "Do you live with your family?",
          "ref": "I live with my parents and my grandmother in the same apartment block — different units, which keeps everyone sane. In a way it's the classic Chinese three-generation setup, just with more delivery food and video calls than the old days.",
          "keywords": [
            "parents",
            "grandmother",
            "three-generation",
            "apartment"
          ]
        },
        {
          "topic": "p1-family",
          "q": "Who in your family do you spend the most time with?",
          "ref": "My mother, overwhelmingly. She cooks when she visits, reorganises my bookshelf without asking, and somehow knows when I'm stressed before I do. She denies it is hovering; I call it loving surveillance.",
          "keywords": [
            "mother",
            "cooks",
            "bookshelf",
            "stressed"
          ]
        },
        {
          "topic": "p1-family",
          "q": "Did your family eat dinner together when you were young?",
          "ref": "Almost every night. My father would wait until seven, then make us put our phones in a drawer — which felt oppressive at fourteen and feels heroic at twenty-eight. Those dinners were where I learned half of what I know about storytelling.",
          "keywords": [
            "dinner",
            "father",
            "phones",
            "storytelling"
          ]
        },
        {
          "topic": "p1-family",
          "q": "Are you similar to or different from the other members of your family?",
          "ref": "I'm the quiet one — my brother talks for a living, my mother narrates everything, and my father operates in meaningful silence. I inherited the silence but not the patience for long monologues, so I usually retreat into books.",
          "keywords": [
            "quiet",
            "brother",
            "silence",
            "books"
          ]
        },
        {
          "topic": "p1-family",
          "q": "Have your family habits changed over the years?",
          "ref": "Noticeably. Ten years ago we'd sit at the same table arguing about the news; now the news competes with two TikTok feeds and a WeChat sports group. We eat together, yes — but silence has a different flavour when everyone is scrolling.",
          "keywords": [
            "table",
            "news",
            "scrolling",
            "WeChat"
          ]
        },
        {
          "topic": "p1-films",
          "q": "Do you like watching films?",
          "ref": "Hugely. Cinema is my monthly ritual — I don't even check the reviews anymore, I just trust the opening weekend vibe. The big-screen experience does something a laptop can never replicate for fight scenes and soundtracks.",
          "keywords": [
            "cinema",
            "monthly",
            "ritual",
            "soundtracks"
          ]
        },
        {
          "topic": "p1-films",
          "q": "What kinds of films do you enjoy most?",
          "ref": "Light comedies and character-driven dramas. I tried hard-core arthouse once and lasted forty minutes before checking into a thriller I actually enjoyed. Life is already complicated enough; my popcorn budget deserves a happy ending occasionally.",
          "keywords": [
            "comedies",
            "dramas",
            "thriller",
            "popcorn"
          ]
        },
        {
          "topic": "p1-films",
          "q": "When was the last time you went to the cinema?",
          "ref": "Last month — we saw a sci-fi epic that was mostly visual spectacle, which is exactly what cinema should be. Tickets plus popcorn plus parking came to over 150 yuan, and I regretted none of it.",
          "keywords": [
            "sci-fi",
            "tickets",
            "popcorn",
            "regretted"
          ]
        },
        {
          "topic": "p1-films",
          "q": "Do you prefer watching films at home or at the cinema?",
          "ref": "Home wins for comfort — pause anytime, no noisy strangers, whatever snack I want — but cinema wins for spectacle. So my rule is simple: if it's a visual feast, big screen; if it's dialogue-heavy, sofa and a cup of tea.",
          "keywords": [
            "home",
            "comfort",
            "spectacle",
            "dialogue"
          ]
        },
        {
          "topic": "p1-films",
          "q": "Have your tastes in films changed over time?",
          "ref": "Completely. Teenage me wanted explosions every ten minutes; adult me cries at reunion scenes in quiet family dramas and tolerates action only when the choreography is genuinely clever. Growing up apparently recalibrates your dopamine.",
          "keywords": [
            "explosions",
            "reunion",
            "dramas",
            "recalibrates"
          ]
        },
        {
          "topic": "p1-chocolate",
          "q": "Do you like chocolate?",
          "ref": "Very much, but I've graduated from milk chocolate to dark chocolate over the years. Now I treat chocolate like coffee — a small square after dinner, not a bar in front of the TV at midnight.",
          "keywords": [
            "dark",
            "square",
            "dinner",
            "midnight"
          ]
        },
        {
          "topic": "p1-chocolate",
          "q": "How often do you eat chocolate?",
          "ref": "Realistically two or three times a week. Weekends are the danger zone — a film night with a proper bar is my one indulgence. Weekdays I'm better behaved, mostly due to the 70-percent rule I pretend to follow.",
          "keywords": [
            "weekends",
            "indulgence",
            "weekdays",
            "70-percent"
          ]
        },
        {
          "topic": "p1-chocolate",
          "q": "What kind of chocolate do you prefer?",
          "ref": "Dark, 70 percent or above, preferably with sea salt or orange peel. Milk chocolate tastes like dessert; dark chocolate tastes like an opinion. Nuts are acceptable; nougat and caramel are traps I walk into knowingly.",
          "keywords": [
            "dark",
            "70 percent",
            "salt",
            "caramel"
          ]
        },
        {
          "topic": "p1-chocolate",
          "q": "Was chocolate popular when you were a child?",
          "ref": "Enormously — it was the currency of good behaviour. Every Spring Festival, the table would fill up with boxes of chocolates and fruit, and we kids treated the chocolate box as a competitive sport. Now those gift boxes are pricier than ever.",
          "keywords": [
            "Spring Festival",
            "boxes",
            "competitive",
            "gift"
          ]
        },
        {
          "topic": "p1-chocolate",
          "q": "Do you think chocolate is healthy?",
          "ref": "Dark chocolate in small amounts, honestly, yes — the flavanol headlines are partly true. But the moment it becomes three bars a week it's dessert with a marketing department. Everything about food is dose and context, as my nutritionist keeps reminding me.",
          "keywords": [
            "dark",
            "flavanol",
            "dessert",
            "marketing"
          ]
        },
        {
          "topic": "p1-travelling",
          "q": "Do you like travelling?",
          "ref": "Very much. Technically, two weeks of holidays a year is all I get, so I've learned to do intense short trips — three days somewhere with one good meal, one good walk and one strange museum beats a two-week blur every time.",
          "keywords": [
            "holidays",
            "trips",
            "museum",
            "walk"
          ]
        },
        {
          "topic": "p1-travelling",
          "q": "Where did you travel most recently?",
          "ref": "Xitang, the water town near Shanghai, this autumn. We rented a little guesthouse by the canal, ate zongzi for breakfast, took the boat ride at dusk, and got caught in sudden rain — which honestly made it better.",
          "keywords": [
            "Xitang",
            "canal",
            "dusk",
            "rain"
          ]
        },
        {
          "topic": "p1-travelling",
          "q": "Do you prefer travelling alone or with other people?",
          "ref": "With others, because shared anticipation is half the fun — splitting the map, arguing about dinner, sending each other photos. Alone travelling sounds romantic until you're eating noodles by yourself and checking the same fork menu for the tenth time.",
          "keywords": [
            "others",
            "shared",
            "arguing",
            "alone"
          ]
        },
        {
          "topic": "p1-travelling",
          "q": "What kind of places do you most enjoy visiting?",
          "ref": "Old towns and mountains. Old towns give me layered history frozen into streets — a bit of Ming architecture, a bit of Qing signage — and mountains give me silence and altitude, which is the closest my city life ever gets to meditation.",
          "keywords": [
            "Old towns",
            "mountains",
            "history",
            "silence"
          ]
        },
        {
          "topic": "p1-travelling",
          "q": "Would you like to travel abroad in the future?",
          "ref": "Yes, very much — Japan first, then maybe Italy for the architecture and the food. I've been saving points and pretending it's 'for emergencies' while quietly researching ryokans instead. Next year, realistically, if the budget cooperates.",
          "keywords": [
            "Japan",
            "Italy",
            "points",
            "budget"
          ]
        }
      ],
      "part2": [
        {
          "topic": "p2-thing-gift",
          "card": "Describe a gift you gave to someone.",
          "points": [
            "What the gift was",
            "Who you gave it to",
            "When and why you gave it",
            "And explain how they reacted"
          ],
          "ref": "Last New Year I gave my mother a fountain pen — actually, not just any pen, but the same model of pen my grandfather used to sign his first shop contract. She has run the family eatery for fifteen years, and every New Year she writes the year's first menu by hand in ink. When I handed it to her on Chinese New Year's Eve, she went quiet, then laughed and said 'this one actually lasts'. She still opens it only for that first menu of each year, which makes it worth every minute I spent hunting down an original.",
          "keywords": [
            "New Year",
            "pen",
            "mother",
            "menu",
            "New Year's Eve",
            "laughed"
          ]
        },
        {
          "topic": "p2-people-family",
          "card": "Describe a member of your family you get on very well with.",
          "points": [
            "Who this person is",
            "What you do together",
            "What they are like",
            "And explain why you get on so well"
          ],
          "ref": "This is my grandmother, Nai, who will be eighty-two this spring. We do almost everything together — she reads the evening paper aloud, correcting her own reading; we shell peanuts while the Spring Festival gala plays; she teaches me card games from the old countryside. She is sharp, stubborn in the best way, and completely without embarrassment. We get on because she treats me as a colleague in life rather than a child to manage. I can tell her anything, and she has never once told my mother.",
          "keywords": [
            "grandmother",
            "together",
            "peanuts",
            "games",
            "sharp",
            "mother"
          ]
        },
        {
          "topic": "p2-event-happy",
          "card": "Describe a happy event you remember from your childhood.",
          "points": [
            "What the event was",
            "When it happened",
            "Who was there",
            "And explain why it was so happy"
          ],
          "ref": "The happiest day of my childhood was the afternoon our family moved from a two-room walk-up into our own apartment — new keys, new elevator, and a balcony. I was nine. My father celebrated with a tray of strawberries, which were absurdly expensive that year, and we ate them sitting on the empty floor. What made it unforgettable wasn't the apartment itself; it was watching my parents exhale for the first time I had ever seen. I still remember the hum of the empty fridge and strawberry-stained hands.",
          "keywords": [
            "apartment",
            "keys",
            "strawberries",
            "nine",
            "exhale"
          ]
        },
        {
          "topic": "p2-event-shop",
          "card": "Describe a memorable shopping experience you had.",
          "points": [
            "What you bought or shopped for",
            "Where and when it was",
            "Who you were with",
            "And explain what made it memorable"
          ],
          "ref": "I'll never forget hunting for a Spring Festival coat with my mother at a small market in Chengdu last January. It was chaos — steam from spicy-hotpot stalls, bargaining over wool blends, a vendor playing erhu over the loudspeaker. After two hours I found a deep green wool coat, half the asking price, and the vendor finally smiled and said 'you have an eye — take it'. Wearing it home on the metro felt like I'd won a treasure rather than bought a jacket.",
          "keywords": [
            "coat",
            "market",
            "bargaining",
            "green",
            "won"
          ]
        },
        {
          "topic": "p2-event-weekend",
          "card": "Describe a weekend you really enjoyed.",
          "points": [
            "When it was",
            "Where you went or what you did",
            "Who you spent it with",
            "And explain why it was enjoyable"
          ],
          "ref": "This was the winter weekend in December 2023 when the whole family drove to the reservoir for a 'fake fishing' day — actually barbecuing, playing mahjong in the car, and watching black kites circling over the far shore. My aunt brought some homemade dumplings, my cousin taught my grandmother to use a tablet, and nobody looked at a work message for two entire days. It was enjoyable because it was ordinary abundance — no agenda, no itinerary, just shared morning light and too much food.",
          "keywords": [
            "reservoir",
            "family",
            "mahjong",
            "tablet",
            "abundance"
          ]
        }
      ],
      "part3": [
        {
          "topic": "p3-education",
          "q": "Should schools have longer holidays?",
          "ref": "Longer holidays would give children breathing room, but the real question is what they do with the time. Unstructured weeks can widen gaps between privileged and poor students — the former travel, the latter drift. Longer holidays work best paired with structured camps, reading programmes and proper rest culture at home.",
          "keywords": [
            "breathing room",
            "gaps",
            "travel",
            "culture",
            "holidays"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Do you think homework should be banned during holidays?",
          "ref": "Banned entirely is too blunt, but reduced drastically, yes. Holiday homework that replaces rest with more worksheets teaches resentment, not learning. Better: one open-ended project you choose yourself — a family interview, a photo essay, cooking one new dish — because autonomy beats obligation for retaining anything meaningful.",
          "keywords": [
            "banned",
            "worksheets",
            "project",
            "autonomy",
            "meaningful"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Is it important for children to learn about festivals from other cultures?",
          "ref": "Deeply. Festivals compress a culture's values into one edible, shareable day — learning Thanksgiving, Diwali or Eid teaches food ethics, gratitude and solidarity better than any textbook. It also vaccinates against casual prejudice; knowing why someone fasts changes how you sit next to them at lunch.",
          "keywords": [
            "festivals",
            "values",
            "food",
            "prejudice",
            "gratitude"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Do exams really show what a student can do?",
          "ref": "Only a slice of it. Exams are excellent at measuring preparation under pressure, but they miss collaboration, creativity, persistence and practical judgment. The fix isn't abandoning exams — it's balancing them with projects, orals and portfolios so a quiet builder doesn't lose to a loud test-taker.",
          "keywords": [
            "exams",
            "pressure",
            "collaboration",
            "creativity",
            "portfolios"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Should universities help students find jobs after graduation?",
          "ref": "Yes — a degree should be a launchpad, not just a certificate. Career coaching, CV workshops, alumni networks and mock interviews convert academic knowledge into employability. When universities treat careers as someone else's job, students graduate with skills and no map. Employability support is part of the product now.",
          "keywords": [
            "universities",
            "career",
            "alumni",
            "employability",
            "map"
          ]
        },
        {
          "topic": "p3-education",
          "q": "What can adults learn that children cannot?",
          "ref": "Adults learn with context. A child memorises vocabulary; an adult connects it to a negotiation, a lease or a lover's apology — that stakes-driven learning sticks harder. Adults also tolerate ambiguity better, ask sharper questions and accept feedback without collapsing. Motivation matures along with the corpus of scars.",
          "keywords": [
            "adults",
            "context",
            "questions",
            "feedback",
            "motivation"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Should there be limits on children's screen time during holidays?",
          "ref": "Reasonable limits, not bans. Holidays are about rest, and screens genuinely rest tired brains — but three hours of short video is sedation, not rest. My household rule: mornings are physical, afternoons are free, evenings are co-screened film nights. Quality and context outrank raw timer counts.",
          "keywords": [
            "limits",
            "rest",
            "video",
            "physical",
            "context"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Will delivery apps make festive cooking obsolete?",
          "ref": "For everyday meals maybe, but festivals survive on slowness. The point of making dumplings for Spring Festival dinner is the hours together around the table — no courier can deliver that feeling. Apps will compress weekday cooking, but ritual cooking during holidays will persist precisely because it is inefficient and human.",
          "keywords": [
            "Apps",
            "festivals",
            "slowness",
            "dumplings",
            "human"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Is online shopping good or bad for local businesses during holidays?",
          "ref": "Both at once. Online shopping gives micro-vendors national reach for festive gifts, but it bulldozes the family-run shop on the corner that survives on seasonal traffic. The healthy model is omnichannel — local shops using WeChat stores and delivery, plus physical experience during festive peaks.",
          "keywords": [
            "online",
            "local",
            "festive",
            "omnichannel",
            "delivery"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Do smart homes actually make life easier?",
          "ref": "For daily chores, yes — lights, locks and robot vacuums genuinely compress effort. But every smart device is also a small subscription to someone else's server: accounts expire, apps vanish, privacy quietly evaporates. Use smart tech for chores you hate, keep manual backups for the things you love — including the kettle.",
          "keywords": [
            "smart",
            "chores",
            "privacy",
            "manual",
            "kettle"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Should AI be allowed to write greeting cards and wishes?",
          "ref": "It can draft, but humans must sign. A wish matters because someone paused to think about you — if AI writes it, the gift arrives without the sender ever having been present in the message. The lovely use of AI is brainstorming lines for the shy, not replacing the feeling itself.",
          "keywords": [
            "AI",
            "wish",
            "think",
            "sender",
            "feeling"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "How will robots change hospitality in the future?",
          "ref": "Robots will absorb the repetitive backbone — towel delivery, table clearing, check-in at 3 am — and free humans for the moments that actually matter: calming a crying child, remembering a returning guest's tea. Hospitality will split into invisible automation and high-touch warmth; the middle ground will disappear entirely.",
          "keywords": [
            "robots",
            "hospitality",
            "automation",
            "warmth",
            "guest"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Does modern life leave enough space for family time?",
          "ref": "Technically yes, culturally no. We have more time than our grandparents did, yet family time gets fragmented into notification slices. The bottleneck isn't hours, it's attention. Households that succeed treat dinner as a device-free zone — twenty minutes of full presence beats three distracted hours every time.",
          "keywords": [
            "family",
            "notification",
            "attention",
            "device-free",
            "presence"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Should governments mandate paid public holidays?",
          "ref": "Paid holidays are already mandated almost everywhere — the question is enforcement and fairness across gig work. Delivery riders and factory shift workers often can't stop, even when the law says they can. A public holiday you cannot take is decoration, not policy. Extend coverage to contract and gig workers first.",
          "keywords": [
            "holidays",
            "enforcement",
            "gig",
            "workers",
            "policy"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Is traditional community spirit disappearing in big cities?",
          "ref": "It mutated rather than vanished. The old courtyard gossip moved to WeChat groups of neighbours sharing matcha reviews and lost-cat alerts. What's missing is accidental encounter — corridor hellos, shared queues, borrowed ladders. Design must now engineer serendipity: shared tables, open kitchens, co-working lobbies, festivals in the square.",
          "keywords": [
            "Courtyard",
            "WeChat",
            "encounter",
            "festivals",
            "serendipity"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Do older people get the respect they deserve in China today?",
          "ref": "Formally yes — filial duty is still preached — but structurally it's eroding. Nuclear families, migration to tier-one cities and youthful consumer culture leave many elderly invisible in daily life. Respect needs practice, not posters: shared meals, real conversations, elders teaching craft and stories, not just being 'cared for'.",
          "keywords": [
            "elderly",
            "respect",
            "migration",
            "stories",
            "shared"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Should festivals be public holidays for everyone or regional only?",
          "ref": "Regional festivals are precious precisely because they're not national — dragon boat races in the south, lantern fairs in the west. Making everything a national holiday flattens local culture into a single televised script. Better: national core holidays plus regional floating rest days that let local identity breathe.",
          "keywords": [
            "festivals",
            "regional",
            "national",
            "local",
            "culture"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Is it true that people are more stressed during holiday seasons?",
          "ref": "For many, yes — travel chaos, family friction, gift budgets, forced fun. Festive pressure is a documented cortisol bump. The antidote is expectation management: fewer dinners, honest conversations, pre-agreed budgets, and the radical act of doing nothing on purpose with people you like.",
          "keywords": [
            "travel",
            "budgets",
            "conversations",
            "cortisol",
            "pressure"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Do festive celebrations create too much waste?",
          "ref": "Yes, dramatically — wrapping paper, fruit baskets with non-recyclable foam, disposable tableware for reunion dinners. The fix isn't cancelling joy; it's swapping materials. Beeswax wraps, steel lanterns, reusable plates, shared platters — every festive choice can whisper 'celebrate, but gently' instead of shouting 'landfill'.",
          "keywords": [
            "wraps",
            "reusable",
            "landfill",
            "festive",
            "swapping"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Should fireworks be banned completely?",
          "ref": "Partial bans work; total bans breed black markets and resentment. The honest approach: restrict in dense cities, subsidise eco-friendly drones or light shows, and let rural towns keep tradition with moderation. Smoke over Beijing is bad air; light over a village square is culture. Regulate the dose, not the desire.",
          "keywords": [
            "bans",
            "drones",
            "tradition",
            "regulate",
            "markets"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Is holiday travel compatible with carbon budgets?",
          "ref": "Only if travel patterns shift, not disappear. One long-haul trip a year plus regional rail holidays is reasonable for most people. Flying short-haul when high-speed rail exists is hard to justify on any honest carbon ledger. Choose slower journeys — the extra six hours on a train is the price of a quieter conscience.",
          "keywords": [
            "carbon",
            "rail",
            "Flying",
            "ledger",
            "journeys"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Should gift culture move toward experiences instead of objects?",
          "ref": "Mostly yes — a museum membership or a cooking class outlives any box of trinkets, and it keeps money circulating in local culture. But objects have their place: a handmade scarf is still love in fabric form. The healthy mix is experiences first, meaningful objects second, plastic novelties never.",
          "keywords": [
            "experiences",
            "objects",
            "trinkets",
            "handmade",
            "plastic"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "How can cities become greener during festive seasons?",
          "ref": "LED installations instead of incandescent bulbs, real potted trees instead of plastic forests, pedestrian-only promenades, shared e-bike fleets for the last mile. Cities already compete on their festive light shows — let the competition be about kilowatt-hours saved rather than watts dazzled.",
          "keywords": [
            "LED",
            "trees",
            "promenades",
            "kilowatt",
            "light"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Does festive advertising manipulate consumers unfairly?",
          "ref": "Absolutely — it sells obligation wrapped as love. The message is always: 'you don't really care unless you buy this'. Awareness is the defence; when you see an ad and feel vague guilt, that is the emotion being engineered, not affection. Buy for people, not for ads.",
          "keywords": [
            "obligation",
            "love",
            "guilt",
            "engineered",
            "people"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Is the Spring Festival Gala still relevant to young people?",
          "ref": "Partly. It's ritual background music for the reunion dinner — less watched for content, more for the shared clock. Young audiences prefer highlight clips on Douyin, yet the live viewership still spikes at midnight. Its role shifted from 'must-watch programme' to 'national gathering signal' — different, but alive.",
          "keywords": [
            "ritual",
            "Douyin",
            "viewership",
            "midnight",
            "background"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Should news channels avoid broadcasting during major holidays?",
          "ref": "No — holidays are exactly when major events happen: weather crises, travel disasters, accidents. What should change is tone: fewer panels of pundits, more service journalism — road closures, weather alerts, hospital schedules. News during festivals should be a lighthouse, not a shouting match.",
          "keywords": [
            "news",
            "holidays",
            "weather",
            "service",
            "journalism"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Do holiday movies make us feel better?",
          "ref": "For most people, genuinely yes. Comfort rewatching — the same Home Alone, the same sentimental reunion dramas — regulates mood the way a warm blanket does. The danger is only when comfort becomes avoidance; a film a night is self-care, five films a day is hiding from your family with a remote.",
          "keywords": [
            "Comfort",
            "mood",
            "avoidance",
            "blanket",
            "comfort"
          ]
        },
        {
          "topic": "p3-media",
          "q": "How honest is influencer content about holiday lifestyle?",
          "ref": "Mostly curated theatre. The 'perfect family reunion dinner' on Douyin is twelve takes, rented dishes and ring-light negotiation. Some influencers now do behind-the-scenes honesty about this, and those videos build real trust. Enjoy the fantasy, but calibrate expectations — your real aunt will never pose like that.",
          "keywords": [
            "influencer",
            "curated",
            "Douyin",
            "honesty",
            "fantasy"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should companies be forced to give staff bonuses before Spring Festival?",
          "ref": "Mandating bonuses would help cash-poor employees in a culture where the holiday is expensive — but one-size bonuses punish good companies and subsidise bad ones. Better: tax incentives for festive bonuses, transparency requirements, and strong enforcement of existing bonus promises in contracts.",
          "keywords": [
            "bonuses",
            "enforcement",
            "contracts",
            "incentives",
            "companies"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Is the nine-nine-six work culture still tolerable today?",
          "ref": "Tolerated by many, embraced by fewer every year. 996 trades health and family for equity and speed — a bad deal for most roles outside early-stage startups. The backlash is real: regulators, courts and talent are all pushing back. Sustainable pace wins in the long run; burnout is not a moat.",
          "keywords": [
            "996",
            "health",
            "equity",
            "burnout",
            "pace"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Do people really rest during holidays if they work from home?",
          "ref": "Rarely fully. Remote work means the laptop is always within reach, and 'checking in' for five minutes becomes two hours of emails. True rest needs boundaries: out-of-office replies, silenced groups, and a household agreement that holiday hours belong to the people in the room.",
          "keywords": [
            "remote",
            "boundaries",
            "emails",
            "silenced",
            "household"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should interns and part-timers get paid holidays too?",
          "ref": "Yes — proportional leave is basic fairness. If a student works three months before Spring Festival, they've earned some release time. Hospitality, retail and delivery rely on these workers exactly at the festive peak. Paying only 'full staff' treats half the workforce as disposable; proportional rights fix most of that gap.",
          "keywords": [
            "leave",
            "release",
            "workers",
            "proportional",
            "rights"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Will the gig economy change how holidays feel in China?",
          "ref": "It's changing them already — riders, drivers and couriers work through every festival while office towers empty. Festive convenience is built on invisible labour. Society should either guarantee festive pay multipliers and rest for gig workers, or stop pretending holidays are restful for everyone equally.",
          "keywords": [
            "gig",
            "riders",
            "festival",
            "labour",
            "multipliers"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Is career success defined by money or meaning by 2026?",
          "ref": "For young Chinese professionals the honest answer is both, in tension — money buys security, meaning buys sleep. The post-2020 generation increasingly optimises for 'enough money plus work that doesn't hollow me out'. Hustle culture lost some shine; sustainable ambition is the new status signal.",
          "keywords": [
            "money",
            "meaning",
            "security",
            "ambition",
            "sleep"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Are traditional festivals becoming too commercial?",
          "ref": "Commercialisation amplifies festivals without fully replacing them. The shopping pressure is real, yet the core rituals — ancestor visits, reunion dinners, red envelopes — persist precisely because they're emotional infrastructure, not products. The test for each festival is simple: would this still happen if nobody made money from it? Spring Festival passes.",
          "keywords": [
            "commercial",
            "rituals",
            "envelopes",
            "emotional",
            "infrastructure"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Should young people learn festive rituals if they feel meaningless?",
          "ref": "Yes — but as lived experience, not lecture. Rituals only feel hollow when learned as obligations; they bloom when children cook, paste couplets and light lamps alongside elders. Meaning is negotiated in the doing. Teach the motion and the reasons will follow.",
          "keywords": [
            "rituals",
            "hollow",
            "couplets",
            "elders",
            "motion"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Is Lunar New Year more important than Christmas in China today?",
          "ref": "Culturally yes, commercially close. Lunar New Year is the national heartbeat — family, food, homecoming — while Christmas has become a lifestyle festival of lights and shopping without religious weight. Both coexist easily: December for aesthetics and dates, February for the soul of the country.",
          "keywords": [
            "Lunar New Year",
            "Christmas",
            "homecoming",
            "aesthetics",
            "soul"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "How should museums make festivals relevant for schools?",
          "ref": "By making festivals hands-on: dumpling workshops, lantern-making labs, story corners where elders speak. Museums should be loud during festival weeks, not silent — food smells, soundscapes, costume try-ons. A museum a child remembers beats a worksheet about heritage every single time.",
          "keywords": [
            "museums",
            "workshops",
            "lantern",
            "food",
            "heritage"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Will global culture erase local festivals eventually?",
          "ref": "No — local festivals are stubborn precisely because they're embodied: the foods, the firecrackers, the dialects. Globalisation adds layers, it doesn't bleach them. The real risk is insider apathy: young people who can't be bothered. Keep festivals edible, participatory and slightly chaotic, and they will outlive every trend.",
          "keywords": [
            "global",
            "local",
            "dialects",
            "apathy",
            "participatory"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "What do festivals teach children that schools cannot?",
          "ref": "Festivals teach belonging. No syllabus delivers the feeling of thirty relatives arguing happily over mahjong in one room and a pot too big to lift alone. They transmit values non-verbally — generosity, endurance, patience, memory — through repetition of shared action. Schools inform; festivals initiate.",
          "keywords": [
            "festivals",
            "belonging",
            "relatives",
            "generosity",
            "initiate"
          ]
        }
      ]
    }
  },
  {
    "id": "mock-2027-01",
    "month": "2027-01",
    "title": "2027年1月刊 · 新年自测",
    "difficulty": "进阶",
    "theme": "新年自测",
    "blurb": "一月一测，年初立的 flag 能扛到几月？新年决心专题——健身房咨询、社区 Reset Week、习惯心理学讲座，做完整卷，看清自己是哪种人。",
    "coverage": [
      "p1-early-bird",
      "p1-money",
      "p1-new-activities",
      "p1-patience",
      "p1-promises",
      "p1-punctuality",
      "p1-sleeping",
      "p1-sport",
      "p2-abstract-change",
      "p2-abstract-habit",
      "p2-abstract-healthy",
      "p2-skill-learn",
      "p2-thing-money",
      "p3-culture",
      "p3-education",
      "p3-environment",
      "p3-media",
      "p3-society",
      "p3-technology",
      "p3-work"
    ],
    "listening": [
      {
        "section": "Section 1",
        "passage": "Woman: Riverside Community Leisure Centre, good morning, how can I help you?\nMan: Hi, I saw your poster about the New Year Reset programme and I'd like some details.\nWoman: Of course. What would you like to know?\nMan: First of all, what exactly does it involve?\nWoman: It's a six-week health course starting on Monday the 5th of January — gym access three times a week, one 45-minute fitness assessment, and a nutrition consultation with our dietitian.\nMan: That sounds good. How much does it cost?\nWoman: Six hundred and eighty yuan for the whole six weeks, which works out much cheaper than individual visits.\nMan: And can I try it before signing up?\nWoman: Yes, we offer one free trial session in either of the first two weekends of January.\nMan: Great. Is the swimming pool included?\nWoman: The pool is optional — eighty yuan extra if you want regular lane swimming. Three lane sessions per week, mornings only.\nMan: I'll take the pool as well then. What are your opening hours in January?\nWoman: Weekdays six thirty in the morning until ten at night, and weekends eight until nine. Last entry is half an hour before closing.\nMan: Good to know. My cousin asked about it too — is there a family discount?\nWoman: There is. If two or more people from the same household sign up together, each gets fifty yuan off.\nMan: Perfect. Oh — and I heard the first fifty people to register this month get something free?\nWoman: You heard right — a free stainless-steel water bottle, while stocks last.\nMan: How do I book my sessions once I'm in?\nWoman: Everything goes through our app — book, cancel or reschedule classes up to four hours in advance. You just scan your member card at the gate.\nMan: And if I change my mind after joining?\nWoman: If you cancel within seven days of signing up and you haven't started the course yet, you get a full refund. After that it's non-refundable, I'm afraid.\nMan: Fair enough. One last thing — do I need a doctor's note?\nWoman: Only if you have a heart condition or recent surgery. Otherwise, the assessment covers everything.\nMan: Then please count me in. I'll come by this weekend to register.\nWoman: Wonderful. See you then, and happy New Year!",
        "questions": [
          {
            "q": "What is the man asking about?",
            "opts": [
              "A swimming pool membership",
              "The New Year Reset programme",
              "A yoga class schedule",
              "A nutrition consultation"
            ],
            "right": 1,
            "explain": "男士说：I saw your poster about the New Year Reset programme。"
          },
          {
            "q": "When does the programme start?",
            "opts": [
              "1 January",
              "Monday the 5th of January",
              "15 January",
              "The last weekend of January"
            ],
            "right": 1,
            "explain": "原文：starting on Monday the 5th of January。"
          },
          {
            "q": "What is included in the six-week course?",
            "opts": [
              "Free swimming and meals",
              "Gym access, a fitness assessment and a nutrition consultation",
              "Personal training twice a week",
              "Gym access and free parking"
            ],
            "right": 1,
            "explain": "原文：gym access three times a week, one 45-minute fitness assessment, and a nutrition consultation。"
          },
          {
            "q": "How much does the six-week course cost?",
            "opts": [
              "680 yuan",
              "860 yuan",
              "550 yuan",
              "750 yuan"
            ],
            "right": 0,
            "explain": "原文：Six hundred and eighty yuan for the whole six weeks。"
          },
          {
            "q": "What does the centre offer before signing up?",
            "opts": [
              "A free fitness assessment",
              "One free trial session",
              "50% off the first week",
              "A free nutrition consultation"
            ],
            "right": 1,
            "explain": "原文：we offer one free trial session。"
          },
          {
            "q": "How much extra is the swimming pool?",
            "opts": [
              "50 yuan",
              "60 yuan",
              "80 yuan",
              "100 yuan"
            ],
            "right": 2,
            "explain": "原文：The pool is optional — eighty yuan extra。"
          },
          {
            "q": "What are the weekend opening hours in January?",
            "opts": [
              "6:30–22:00",
              "8:00–21:00",
              "7:00–20:00",
              "9:00–22:00"
            ],
            "right": 1,
            "explain": "原文：weekends eight until nine。"
          },
          {
            "q": "What do the first fifty sign-ups receive?",
            "opts": [
              "A free fitness assessment",
              "A free stainless-steel water bottle",
              "Fifty yuan off",
              "A free month of pool access"
            ],
            "right": 1,
            "explain": "原文：a free stainless-steel water bottle, while stocks last。"
          },
          {
            "q": "How do members book and cancel classes?",
            "opts": [
              "By phone with reception",
              "By email",
              "Through the centre's app",
              "At the front desk in person"
            ],
            "right": 2,
            "explain": "原文：Everything goes through our app — book, cancel or reschedule classes。"
          },
          {
            "q": "Under what condition can the man get a full refund?",
            "opts": [
              "Within 30 days of signing up",
              "Within seven days of signing up and before the course starts",
              "Only at the first session",
              "If he has a doctor's note"
            ],
            "right": 1,
            "explain": "原文：If you cancel within seven days of signing up and you haven't started the course yet, you get a full refund。"
          }
        ]
      },
      {
        "section": "Section 2",
        "passage": "Good morning, everyone, and welcome to our community centre. Before the main announcement, note that the reading room opens at nine every day this week. Our programme of events for the New Year Reset Week runs from the 2nd to the 9th of January, and this year it is completely free. On Friday the 2nd we kick off at seven in the evening with our Lanterns and Letters evening in the main hall — please bring one sentence that sums up last year and one word for this year. On Saturday morning at ten, local GP Dr. Huang gives a talk in Room 2 on why most New Year resolutions fail and what your body actually needs from one: sleep, movement, and protein first — cardio second. Admission is free but space is limited to forty seats, so please register at the front desk. Also on Saturday afternoon at two, there is a Repair Café in the courtyard — bring broken lamps, kettles or zips, and our volunteers will fix them for free. On Sunday at three, we run a Clothes Swap in the small hall: every guest brings up to five items in good condition and takes home up to five different ones. On Wednesday the 7th at seven, there is a Money Habits clinic — a short session with a certified financial planner on budgeting apps, automatic saving and why eighteen percent of people abandon resolutions before February. Remember, you don't need to sign up for most events; just arrive ten minutes early. The week closes on Friday the 9th at eight with a “Goodbye to Last Year” wall: pin your old habit on the wall, take a new one from the jar, and share one thing you're letting go of. Tea and biscuits provided. One practical note — the courtyard events move indoors on rainy days, so check our notice board at the entrance. For enquiries contact Ms. Zhou on extension 12, or visit the front desk. See you all there!",
        "questions": [
          {
            "q": "What event starts the New Year Reset Week on January 2nd?",
            "opts": [
              "A financial planning seminar",
              "Lanterns and Letters evening",
              "A clothes swap",
              "A fitness challenge"
            ],
            "right": 1,
            "explain": "原文：On Friday the 2nd we kick off … with our Lanterns and Letters evening。"
          },
          {
            "q": "What should guests bring to the Friday evening event?",
            "opts": [
              "A lantern and a candle",
              "One sentence about last year and one word for this year",
              "A photograph of last year",
              "A handwritten resolution"
            ],
            "right": 1,
            "explain": "原文：please bring one sentence that sums up last year and one word for this year。"
          },
          {
            "q": "What will Dr. Huang's talk focus on?",
            "opts": [
              "How to run a marathon",
              "Why most New Year resolutions fail and what the body needs",
              "How to cook healthy meals",
              "How to organise a community event"
            ],
            "right": 1,
            "explain": "原文：why most New Year resolutions fail and what your body actually needs。"
          },
          {
            "q": "How many seats are available for Dr. Huang's talk?",
            "opts": [
              "Twenty",
              "Thirty",
              "Forty",
              "Sixty"
            ],
            "right": 2,
            "explain": "原文：space is limited to forty seats。"
          },
          {
            "q": "What happens at the Repair Café on Saturday afternoon?",
            "opts": [
              "Volunteers repair broken items for free",
              "People learn to sew and knit",
              "A jumble sale is held",
              "Electronics are sold cheaply"
            ],
            "right": 0,
            "explain": "原文：bring broken lamps, kettles or zips, and our volunteers will fix them for free。"
          },
          {
            "q": "How many items can each guest bring to the Clothes Swap?",
            "opts": [
              "Two",
              "Three",
              "Five",
              "As many as they like"
            ],
            "right": 2,
            "explain": "原文：every guest brings up to five items in good condition。"
          },
          {
            "q": "What is the Money Habits clinic about?",
            "opts": [
              "Getting out of debt",
              "Budgeting apps, automatic saving and resolution dropout rates",
              "Investing in the stock market",
              "Buying a house"
            ],
            "right": 1,
            "explain": "原文：a short session … on budgeting apps, automatic saving and why eighteen percent of people abandon resolutions。"
          },
          {
            "q": "When is the closing event?",
            "opts": [
              "Friday 2nd at seven",
              "Thursday 8th at eight",
              "Friday 9th at eight",
              "Saturday 10th at two"
            ],
            "right": 2,
            "explain": "原文：The week closes on Friday the 9th at eight。"
          },
          {
            "q": "What do participants do at the closing event?",
            "opts": [
              "They sign a community pledge",
              "They pin an old habit on the wall and take a new one",
              "They plant a tree in the courtyard",
              "They donate to charity"
            ],
            "right": 1,
            "explain": "原文：pin your old habit on the wall, take a new one from the jar。"
          },
          {
            "q": "What should people do if it rains?",
            "opts": [
              "Bring an umbrella",
              "Check the notice board at the entrance",
              "Call extension 12",
              "Stay home"
            ],
            "right": 1,
            "explain": "原文：the courtyard events move indoors on rainy days, so check our notice board at the entrance。"
          }
        ]
      },
      {
        "section": "Section 3",
        "passage": "Dr. Reed: Right, come in. So for your research project you want to study New Year resolutions — talk me through it.\nAnna: We're comparing two groups: people who wrote resolutions down versus people who only said them out loud. We'll follow both for six weeks into February.\nDr. Reed: A classic design — self-report versus written commitment. How many participants do you need?\nMo: We were thinking twenty per group, but with dropouts we'd better recruit fifty in total — twenty-five per group.\nDr. Reed: Sensible. Recruiting them?\nAnna: A notice on the campus board and two WeChat groups for postgraduates. We've already got nine sign-ups from the campus group alone.\nDr. Reed: You'll need informed consent forms — remember ethics approval before you collect a single name. And make sure the survey is anonymous; don't record names next to the answers.\nMo: Got it. We'll store the data in an encrypted file on the university drive, and destroy it after the submission deadline.\nDr. Reed: Good. What are you actually measuring? How do you define “success”?\nAnna: We're not asking “did you succeed” directly — instead, weekly check-ins: “How many days this week did you act on your resolution?” Zero to seven. Then we compare the two groups.\nDr. Reed: And the analysis?\nMo: Descriptive stats for the progress charts, and a simple t-test to compare the two groups' mean scores at week six.\nDr. Reed: Fine for an undergraduate project. One caution — self-report bias. People will say they did better than they did. Consider asking a friend or family member to verify one behaviour, like going to the gym.\nAnna: That's a good point. We could add a “behaviour check” question at week three and week six: “Did someone else witness this habit?”\nDr. Reed: Exactly. And the timeline — when is the write-up due?\nMo: The 20th of March. Interviews done by mid-February, analysis March 1st to 10th, draft by the 15th, final version the 20th.\nDr. Reed: Tight but doable. One last thing — if someone's resolution involves mental health, don't try to advise them. Refer them to the university counselling service.\nAnna & Mo: Of course.\nDr. Reed: Then good luck — and don't make resolution number one be “don't change the research question halfway through”!",
        "questions": [
          {
            "q": "What are Anna and Mo comparing in their study?",
            "opts": [
              "People who recycle versus people who do not",
              "People who write resolutions down versus people who say them aloud",
              "Gym members versus non-members",
              "Students versus working adults"
            ],
            "right": 1,
            "explain": "原文：people who wrote resolutions down versus people who only said them out loud。"
          },
          {
            "q": "How long will the study follow participants?",
            "opts": [
              "Three weeks",
              "Six weeks",
              "Eight weeks",
              "One semester"
            ],
            "right": 1,
            "explain": "原文：We'll follow both for six weeks into February。"
          },
          {
            "q": "How many participants do they plan to recruit in total?",
            "opts": [
              "Twenty",
              "Twenty-five",
              "Forty",
              "Fifty"
            ],
            "right": 3,
            "explain": "原文：we'd better recruit fifty in total。"
          },
          {
            "q": "Where have they already collected nine sign-ups from?",
            "opts": [
              "A WeChat group for postgraduates",
              "The campus notice board",
              "A psychology lecture",
              "A fitness class"
            ],
            "right": 0,
            "explain": "原文：We've already got nine sign-ups from the campus group alone（指前面提到的 postgraduates WeChat groups）。"
          },
          {
            "q": "What must they do before collecting any names?",
            "opts": [
              "Buy a voice recorder",
              "Get ethics approval and use informed consent forms",
              "Pay participants",
              "Print the weekly questionnaire"
            ],
            "right": 1,
            "explain": "原文：You'll need informed consent forms — remember ethics approval before you collect a single name。"
          },
          {
            "q": "How will they measure progress each week?",
            "opts": [
              "By asking participants if they succeeded",
              "By asking how many days they acted on the resolution",
              "By checking bank statements",
              "By weighing participants"
            ],
            "right": 1,
            "explain": "原文：weekly check-ins: “How many days this week did you act on your resolution?”。"
          },
          {
            "q": "Which analysis method will they use?",
            "opts": [
              "A regression model",
              "Descriptive stats and a simple t-test",
              "A meta-analysis",
              "Only interviews"
            ],
            "right": 1,
            "explain": "原文：Descriptive stats for the progress charts, and a simple t-test。"
          },
          {
            "q": "What risk does Dr. Reed flag about self-reported data?",
            "opts": [
              "Poor spelling",
              "Self-report bias",
              "Ethics violations",
              "Small sample size"
            ],
            "right": 1,
            "explain": "原文：One caution — self-report bias。"
          },
          {
            "q": "What additional check do they agree to add?",
            "opts": [
              "A medical exam at week six",
              "A behaviour verification by a friend or family member",
              "A final exam on psychology theory",
              "A group interview"
            ],
            "right": 1,
            "explain": "原文：Consider asking a friend or family member to verify one behaviour… we could add a “behaviour check” question。"
          },
          {
            "q": "When is the final write-up due?",
            "opts": [
              "The 20th of February",
              "The 1st of March",
              "The 10th of March",
              "The 20th of March"
            ],
            "right": 3,
            "explain": "原文：The 20th of March。"
          }
        ]
      },
      {
        "section": "Section 4",
        "passage": "Good morning. Today I want to talk about one of the most familiar rituals of modern life: the New Year's resolution. Every January, millions of people set goals — exercise more, spend less, read more, call home more often. Yet the research is humbling. Roughly a quarter of people keep their resolution past the first month, and only about one in ten reaches December with the habit intact. Psychologists call this the false hope syndrome — the expectation that a single calendar date can rewire deeply ingrained behaviour. So why do resolutions fail? Three reasons come up again and again. First, the goals are vague. “Get fit” is a wish; “walk for twenty minutes before breakfast, Monday to Saturday” is a plan. Second, goals are set as events rather than identities. Research by Professor James Clear popularised this distinction: you don't rise to the level of your goals, you fall to the level of your systems — and identity change comes before behaviour change. Third, most people rely on willpower. Willpower, like a muscle, fatigues by the evening — which is why gyms are packed on January the 2nd and empty by February. What actually works? Psychologist Peter Gollwitzer found that “implementation intentions” — “when X happens, I will do Y” — roughly double to triple follow-through. BJ Fogg's tiny habits research shows that anchoring a new behaviour to an existing one, and making the first step laughably small — two push-ups, not two hundred — builds the neural pathway before motivation is needed. Environment design matters too: keeping trainers by the door, deleting the delivery app, or putting the fruit bowl where the biscuit tin used to live. Finally, social accountability helps — telling one person your plan increases your odds of completing it substantially. Now, none of this means resolutions are pointless. The act of reflecting on the past year and choosing one change is genuinely valuable — goals give you a direction, and direction is the first requirement of change. The trick is to treat January the 1st not as a finish line but as a starting gun for a very slow race. Thank you.",
        "questions": [
          {
            "q": "Approximately how many people keep their resolution past the first month?",
            "opts": [
              "About one in ten",
              "Roughly a quarter",
              "Half",
              "Almost everyone"
            ],
            "right": 1,
            "explain": "原文：Roughly a quarter of people keep their resolution past the first month。"
          },
          {
            "q": "What term do psychologists use for the expectation that a date alone can change behaviour?",
            "opts": [
              "The willpower gap",
              "False hope syndrome",
              "The January effect",
              "Habit reversal"
            ],
            "right": 1,
            "explain": "原文：Psychologists call this the false hope syndrome。"
          },
          {
            "q": "According to the lecture, which is a plan rather than a wish?",
            "opts": [
              "Get fit",
              "Be more organised",
              "Walk for twenty minutes before breakfast, Monday to Saturday",
              "Save more money"
            ],
            "right": 2,
            "explain": "原文：“Get fit” is a wish; “walk for twenty minutes before breakfast, Monday to Saturday” is a plan。"
          },
          {
            "q": "What popular distinction did James Clear's research highlight?",
            "opts": [
              "Goals versus systems and identity change before behaviour change",
              "Speed versus accuracy in habit change",
              "Internal versus external motivation",
              "Short-term versus long-term goals"
            ],
            "right": 0,
            "explain": "原文：you don't rise to the level of your goals… identity change comes before behaviour change。"
          },
          {
            "q": "Why are gyms full on January 2nd and empty by February?",
            "opts": [
              "Membership prices rise in February",
              "People rely on willpower, which fatigues",
              "Gyms close in February",
              "Equipment breaks down"
            ],
            "right": 1,
            "explain": "原文：Willpower, like a muscle, fatigues by the evening — which is why gyms are packed on January the 2nd and empty by February。"
          },
          {
            "q": "What are Peter Gollwitzer's 'implementation intentions'?",
            "opts": [
              "Plans written on January 1st",
              "Statements like 'when X happens, I will do Y'",
              "Weekly reviews of progress",
              "Public commitments announced to friends"
            ],
            "right": 1,
            "explain": "原文：“when X happens, I will do Y” — roughly double to triple follow-through。"
          },
          {
            "q": "According to BJ Fogg, how should a new habit begin?",
            "opts": [
              "With two hundred push-ups a day",
              "With a very small first step anchored to an existing habit",
              "With a written contract",
              "With a monthly reward"
            ],
            "right": 1,
            "explain": "原文：making the first step laughably small… anchoring a new behaviour to an existing one。"
          },
          {
            "q": "Which of these is an example of environment design mentioned in the lecture?",
            "opts": [
              "Setting an alarm for 5am",
              "Deleting the delivery app or keeping trainers by the door",
              "Hiring a personal trainer",
              "Downloading five habit apps"
            ],
            "right": 1,
            "explain": "原文：keeping trainers by the door, deleting the delivery app, or putting the fruit bowl where the biscuit tin used to live。"
          },
          {
            "q": "What does the lecture say about telling one person your plan?",
            "opts": [
              "It makes little difference",
              "It increases your odds of completing the plan substantially",
              "It only works for fitness goals",
              "It makes you feel guilty"
            ],
            "right": 1,
            "explain": "原文：telling one person your plan increases your odds of completing it substantially。"
          },
          {
            "q": "How should January the 1st be treated, according to the lecture?",
            "opts": [
              "As a finish line",
              "As a starting gun for a very slow race",
              "As a day to rest completely",
              "As a deadline for change"
            ],
            "right": 1,
            "explain": "原文：treat January the 1st not as a finish line but as a starting gun for a very slow race。"
          }
        ]
      }
    ],
    "speaking": {
      "part1": [
        {
          "topic": "p1-promises",
          "q": "Do you often make promises to other people?",
          "ref": "Yes, fairly often, but I try to make few and keep them. To me a promise is a small contract — when I tell a friend I'll be there at eight, I'll be there at eight, or I don't say it at all.",
          "keywords": [
            "often",
            "contract",
            "there at eight",
            "few",
            "tell a friend"
          ]
        },
        {
          "topic": "p1-promises",
          "q": "Do you find it easy to keep your promises?",
          "ref": "Mostly yes, because I only promise what I know I can do. The rare failures happen when I misjudge the time a task needs, like promising a colleague a document by noon and only finishing it at two.",
          "keywords": [
            "Mostly yes",
            "what I know",
            "rare failures",
            "misjudge",
            "document"
          ]
        },
        {
          "topic": "p1-promises",
          "q": "Why do people sometimes break their promises?",
          "ref": "Usually because they over-promise in the moment — saying yes feels good, and the social cost of refusing seems high. Later, reality arrives, the thing is harder than expected, and the quiet temptation to let it slide wins.",
          "keywords": [
            "over-promise",
            "saying yes",
            "refusing",
            "harder",
            "slide"
          ]
        },
        {
          "topic": "p1-promises",
          "q": "Did you make any resolutions for this New Year?",
          "ref": "Yes — I wrote three: walk before breakfast four times a week, call my parents every Sunday, and stop ordering dinner so late. I did the same last year and kept one, so this time I've taped them next to the bathroom mirror.",
          "keywords": [
            "three",
            "walk before breakfast",
            "call my parents",
            "tape",
            "mirror"
          ]
        },
        {
          "topic": "p1-promises",
          "q": "Do you prefer making promises verbally or in writing?",
          "ref": "In writing, strangely enough. A written promise sits on the page and won't let me off the hook, while a verbal one can conveniently evaporate — 'I said I might, not that I would'. A shared note in our family chat works best.",
          "keywords": [
            "writing",
            "won't let me off",
            "evaporate",
            "family chat",
            "might"
          ]
        },
        {
          "topic": "p1-new-activities",
          "q": "Have you tried any new activities recently?",
          "ref": "Yes — in January I started swimming again after ten years away, and in October I finally signed up for a beginner's calligraphy class. Both were terrifying in week one and oddly meditative by week three.",
          "keywords": [
            "swimming",
            "ten years",
            "calligraphy",
            "terrifying",
            "meditative"
          ]
        },
        {
          "topic": "p1-new-activities",
          "q": "Why do people like trying new activities?",
          "ref": "Novelty is a kind of fuel. A new activity forces your brain to pay full attention, which is exhausting but deeply refreshing — it breaks the hypnosis of routine and reminds you that you're not entirely finished becoming a person.",
          "keywords": [
            "Novelty",
            "fuel",
            "full attention",
            "hypnosis",
            "becoming"
          ]
        },
        {
          "topic": "p1-new-activities",
          "q": "Are you good at picking up new skills?",
          "ref": "Reasonably. I'm not gifted, but I'm stubborn in a useful way — I show up, copy the basics badly for the first month, and then one day notice I've cleared an invisible plateau.",
          "keywords": [
            "Reasonably",
            "stubborn",
            "show up",
            "copy",
            "plateau"
          ]
        },
        {
          "topic": "p1-new-activities",
          "q": "Do children or adults find new activities easier?",
          "ref": "Children, without doubt. They have no internal critic to negotiate with — they just fall off the bike and get back on. Adults calculate embarrassment first, which is why most adult beginners are really asking for permission to be a beginner.",
          "keywords": [
            "Children",
            "critic",
            "fall off",
            "embarrassment",
            "beginner"
          ]
        },
        {
          "topic": "p1-new-activities",
          "q": "What activity would you like to try next?",
          "ref": "Rock climbing. I've watched friends do it for years and always admired how it makes thinking and moving the same thing. Some friends already promised to take me to an indoor wall after the New Year rush dies down.",
          "keywords": [
            "Rock climbing",
            "thinking",
            "moving",
            "indoor wall",
            "New Year"
          ]
        },
        {
          "topic": "p1-early-bird",
          "q": "Are you an early bird or a night owl?",
          "ref": "Mostly an early bird on weekdays and a night owl who survives weekends. I like being awake before the city properly starts — the streets are emptier, the air is cooler, and my own mind is strangely orderly before eight.",
          "keywords": [
            "early bird",
            "night owl",
            "before eight",
            "emptier",
            "orderly"
          ]
        },
        {
          "topic": "p1-early-bird",
          "q": "What is your morning routine like?",
          "ref": "Alarm at six fifty, one glass of water, ten minutes of stretching, then either a short walk or my English app. Coffee happens at eight-fifteen, after the walk — I learned the hard way that caffeine before movement just makes an anxious, stiff version of me.",
          "keywords": [
            "six fifty",
            "water",
            "stretching",
            "coffee",
            "movement"
          ]
        },
        {
          "topic": "p1-early-bird",
          "q": "Do you get up early on weekends?",
          "ref": "Rarely, and proudly not. Weekends are for sleeping until eight-thirty, slow breakfast, and doing the grocery run before the whole neighbourhood wakes up. My mother calls me a natural sleep-in champion — feast late, repeat.",
          "keywords": [
            "Rarely",
            "eight-thirty",
            "slow breakfast",
            "grocery",
            "feast"
          ]
        },
        {
          "topic": "p1-early-bird",
          "q": "Why do you think some people naturally wake early?",
          "ref": "Some of it is genes and some of it is training — night workers flipped years ago and never flipped back, while young parents never had a choice. Mostly I think early risers simply like owning the quiet first hour before the world starts asking things of them.",
          "keywords": [
            "genes",
            "training",
            "young parents",
            "quiet first hour",
            "asking"
          ]
        },
        {
          "topic": "p1-early-bird",
          "q": "Did you wake up early when you were at school?",
          "ref": "Yes, brutally so — the school gates opened at seven and the morning assembly was at seven thirty, so bedtime was ten sharp. I resented it then, but that schedule quietly trained the early-bird instinct I still have now.",
          "keywords": [
            "brutally",
            "seven thirty",
            "resented",
            "trained",
            "early-bird"
          ]
        },
        {
          "topic": "p1-sport",
          "q": "Do you do any sport regularly?",
          "ref": "Yes — since January I've swum twice a week and played amateur badminton every Saturday morning. My knee can't run anymore, but the pool is forgiving, and badminton keeps my reflexes honest.",
          "keywords": [
            "twice a week",
            "badminton",
            "Saturday",
            "knee",
            "reflexes"
          ]
        },
        {
          "topic": "p1-sport",
          "q": "Which sport do you enjoy watching?",
          "ref": "Basketball, mostly. I watch CBA games with my father on weekends and keep an eye on the NBA finals. There's something about a five-person team surviving one another in real time that a scripted drama cannot copy.",
          "keywords": [
            "Basketball",
            "CBA",
            "NBA finals",
            "five-person",
            "scripted"
          ]
        },
        {
          "topic": "p1-sport",
          "q": "Do you prefer team sports or individual sports?",
          "ref": "Team sports, even though I'm mediocre at them. There's a particular satisfaction in covering a teammate's gap without being asked, and in the shared grumbling after an unfair loss. Individual sports feel like an exam; team sports feel like a dinner table.",
          "keywords": [
            "Team sports",
            "covering",
            "grumbling",
            "exam",
            "dinner table"
          ]
        },
        {
          "topic": "p1-sport",
          "q": "How important is sport for health in your opinion?",
          "ref": "Essential, but not magical. Sport won't cancel a bad diet or no sleep, but it keeps the machines running — joints, heart, mood. I think of it as maintenance, the same way you service a car before it breaks rather than after.",
          "keywords": [
            "Essential",
            "bad diet",
            "joints",
            "mood",
            "maintenance"
          ]
        },
        {
          "topic": "p1-sport",
          "q": "Did you play sport as a child?",
          "ref": "Relentlessly. Football in the schoolyard, table tennis in the hallway, skipping rope until the soles of my shoes wore thin. The court orders were rough and the joy was total — nobody kept score of fun.",
          "keywords": [
            "Relentlessly",
            "Football",
            "table tennis",
            "shoes",
            "joy"
          ]
        },
        {
          "topic": "p1-sleeping",
          "q": "How many hours do you usually sleep?",
          "ref": "Around seven, ideally seven and a half. Below six-thirty I'm a diplomat who smiles and misreads everything; above eight I feel strangely guilty, as if rest itself needed justification.",
          "keywords": [
            "seven",
            "six-thirty",
            "diplomat",
            "guilty",
            "justification"
          ]
        },
        {
          "topic": "p1-sleeping",
          "q": "Do you ever take naps during the day?",
          "ref": "Almost every day at two o'clock — a twenty-minute nap on the office couch or my bed at home. My mother would call it corruption of duty; I call it a factory reset that keeps the afternoon civilised.",
          "keywords": [
            "twenty-minute",
            "office couch",
            "factory reset",
            "afternoon",
            "two o'clock"
          ]
        },
        {
          "topic": "p1-sleeping",
          "q": "What helps you fall asleep quickly?",
          "ref": "Dim light after ten, no screens in the last half hour, and a page of a physical book — nothing thrilling. If I still can't sleep, I make a decaf tea and do a breathing count of four in, six out.",
          "keywords": [
            "Dim light",
            "no screens",
            "physical book",
            "decaf",
            "breathing"
          ]
        },
        {
          "topic": "p1-sleeping",
          "q": "How does sleep affect your mood and work?",
          "ref": "Dramatically. After a short night I am slower, shorter-tempered and worse at small decisions, but oddly productive at three in the morning — my best spreadsheets were born at an hour when sensible people are asleep.",
          "keywords": [
            "Dramatically",
            "slower",
            "shorter-tempered",
            "spreadsheets",
            "three in the morning"
          ]
        },
        {
          "topic": "p1-sleeping",
          "q": "Do you sleep better on weekdays or weekends?",
          "ref": "Weekends, obviously — no commute, no alarm tyranny, and the luxury of falling back asleep after the first wake-up. The trouble is by Monday I've completely wrecked the rhythm my week so carefully built.",
          "keywords": [
            "Weekends",
            "no commute",
            "alarm tyranny",
            "rhythm",
            "Monday"
          ]
        },
        {
          "topic": "p1-money",
          "q": "Do you save money regularly?",
          "ref": "Yes — since January the bank deducts a fixed amount the day my salary lands, before I ever see it. What I never miss, I never feel; what I feel is what I can't spend without noticing the hole.",
          "keywords": [
            "January",
            "salary",
            "fixed amount",
            "never miss",
            "hole"
          ]
        },
        {
          "topic": "p1-money",
          "q": "What are you saving for these days?",
          "ref": "Mostly an apartment deposit and the odd big trip — this year, we're saving for a family trip to Yunnan in the autumn. My wife manages the travel fund; I manage the boring emergency fund.",
          "keywords": [
            "apartment deposit",
            "Yunnan",
            "autumn",
            "travel fund",
            "emergency fund"
          ]
        },
        {
          "topic": "p1-money",
          "q": "Do you use any money management apps?",
          "ref": "Yes, a simple spreadsheet first, then a budgeting app that shouts at me when takeaway spending crosses its weekly line. The shouting works — not because it's wise, but because it's mildly embarrassing.",
          "keywords": [
            "spreadsheet",
            "budgeting app",
            "takeaway",
            "weekly line",
            "embarrassing"
          ]
        },
        {
          "topic": "p1-money",
          "q": "Do you think people spend too much money nowadays?",
          "ref": "I think people spend too easily rather than too much — one-click checkout and endless streaming of 'you deserve this' blur the line between wanting and needing. Saving now requires actual resistance, like not adding to the cart.",
          "keywords": [
            "one-click",
            "streaming",
            "wanting",
            "needing",
            "cart"
          ]
        },
        {
          "topic": "p1-money",
          "q": "Do you often lend money to friends?",
          "ref": "Rarely, and only after I've silently decided it's really a gift if it doesn't come back. Money lent with reassuring smiles often returns late or never — better to be generous clearly than generous anxiously.",
          "keywords": [
            "Rarely",
            "gift",
            "reassuring smiles",
            "generous clearly",
            "anxiously"
          ]
        },
        {
          "topic": "p1-punctuality",
          "q": "Are you usually on time or late?",
          "ref": "Usually early — five to ten minutes. My father treated punctuality as a form of respect, and the habit stuck. I'd rather sip one awkward coffee in the lobby than be the reason a meeting restarts itself.",
          "keywords": [
            "early",
            "five to ten minutes",
            "respect",
            "habit",
            "meeting"
          ]
        },
        {
          "topic": "p1-punctuality",
          "q": "What happens when you are late for something?",
          "ref": "I apologise once, briefly, and immediately produce the useful fact — what I brought, what I know, what I can do now — instead of a theatrical monologue of guilt. Drama doesn't repair lost minutes; action does.",
          "keywords": [
            "apologise once",
            "useful fact",
            "theatrical",
            "guilt",
            "action"
          ]
        },
        {
          "topic": "p1-punctuality",
          "q": "Why do you think punctuality is important?",
          "ref": "Because time is the only currency everyone pays equally. Being late silently says “my time matters more than yours” — and repeated punctuality says the opposite, which is why it buys so much quiet trust in business.",
          "keywords": [
            "currency",
            "late",
            "more than yours",
            "punctuality",
            "trust"
          ]
        },
        {
          "topic": "p1-punctuality",
          "q": "How long will you wait for a friend who is late?",
          "ref": "Fifteen minutes, then I message — another ten, then I start the meal. Life is too short and lunch is too good. If they disappear, they disappear; friendships survive lateness, they don't survive abandonment.",
          "keywords": [
            "Fifteen minutes",
            "message",
            "start the meal",
            "lunch",
            "disappear"
          ]
        },
        {
          "topic": "p1-punctuality",
          "q": "Do you arrive early for important appointments?",
          "ref": "Yes, for anything that matters — job interviews, train departures, hospital visits — I aim to be there twenty minutes early, which converts arriving from a panic into a small, calm ritual with a tea in hand.",
          "keywords": [
            "twenty minutes early",
            "job interviews",
            "train departures",
            "panic",
            "calm"
          ]
        },
        {
          "topic": "p1-patience",
          "q": "Are you a patient person?",
          "ref": "Selectively. I have oceanic patience for teaching my nephew to ride a bike and zero for a website that takes more than three seconds to load. Patience, I suspect, is just caring applied slowly — and I care unevenly.",
          "keywords": [
            "Selectively",
            "oceanic",
            "website",
            "caring",
            "unevenly"
          ]
        },
        {
          "topic": "p1-patience",
          "q": "What kind of situations make you lose your patience?",
          "ref": "Inefficiency dressed as process: forms that duplicate forms, meetings that restate meetings, queues that split into “everyone except this line”. It's not the waiting I hate — it's watching time be wasted on purpose.",
          "keywords": [
            "Inefficiency",
            "forms",
            "meetings",
            "queues",
            "wasted"
          ]
        },
        {
          "topic": "p1-patience",
          "q": "Do you think patience can be learned?",
          "ref": "Yes, as a skill with drills — slow cooking without checking, conversation without interrupting, watching a whole film without a phone. Each rep widens the gap between impulse and action, which is precisely what patience is.",
          "keywords": [
            "skill",
            "slow cooking",
            "interrupting",
            "phone",
            "impulse"
          ]
        },
        {
          "topic": "p1-patience",
          "q": "How do you help children learn patience?",
          "ref": "With cakes and queues. We bake bread at home — waiting three hours for dough teaches waiting better than any lecture — and we make a game of supermarket lines by counting red shelves until it's our turn.",
          "keywords": [
            "cakes",
            "bake bread",
            "queues",
            "lecture",
            "supermarket"
          ]
        },
        {
          "topic": "p1-patience",
          "q": "Is patience important for success?",
          "ref": "Profoundly. Almost everything valuable — language, craft, friendship, investing — compounds quietly. The impatient harvest too early and blame the soil; the patient let one winter pass, and the next spring the garden is simply different.",
          "keywords": [
            "Profoundly",
            "compounds",
            "harvest",
            "winter",
            "spring"
          ]
        }
      ],
      "part2": [
        {
          "topic": "p2-abstract-habit",
          "card": "Describe a habit you would like to develop.",
          "points": [
            "What the habit is",
            "Why you want to develop it",
            "How you plan to develop it",
            "And explain what might make it difficult"
          ],
          "ref": "The habit I would most like to develop is writing one honest page in my journal before going to sleep. My days arrive pre-packaged as meetings and messages, and I lose track of what I actually think inside them. I want the page because it forces me to notice — what went well, what stung, what I'm avoiding. My plan is unfashionably simple: keep the journal on my pillow every morning and write before checking my phone. It will be hard at the start, because I'm ambitious about it, and ambitious people quit the small things when they feel they should be doing the big things instead. I've also told my wife — social pressure, gently applied. If I can string together ninety days, the page will stop being a task and become a home for my own head.",
          "keywords": [
            "journal",
            "before going to sleep",
            "notice",
            "pillow",
            "phone",
            "ninety days"
          ]
        },
        {
          "topic": "p2-abstract-change",
          "card": "Describe a change you would like to make in your life.",
          "points": [
            "What the change is",
            "Why you want to make it",
            "What you would do differently",
            "And explain how it would affect your life"
          ],
          "ref": "The change I want to make is to stop working in the hour after my son goes to bed. Right now that's when the house goes quiet, and suddenly I'm answering emails, fixing slides, or rewriting Monday's pitch — and my wife eats alone and my son wakes up to a father who is already tired at breakfast. What I want instead is a hard rule: laptops shut by eight-thirty, tea at nine, and one hour of reading or chess or talking. The practical steps are boring — a physical docking station in the study, email notifications off after eight, and my wife holding the login. It sounds small, but it would change the emotional temperature of the whole house: more presence, less guilt, better mornings. Change, I've learned, rarely means becoming someone new; usually it means protecting the person you already know you should be.",
          "keywords": [
            "stop working",
            "son",
            "laptops",
            "eight-thirty",
            "emotional temperature",
            "presence"
          ]
        },
        {
          "topic": "p2-abstract-healthy",
          "card": "Describe a way you keep — or would like to keep — healthy.",
          "points": [
            "What the activity or habit is",
            "Why you chose it",
            "How often you do it",
            "And explain what benefits you have experienced or expect"
          ],
          "ref": "The one I'm most proud of is the Sunday long-walk habit. Every Sunday morning, rain or shine, I walk for two hours with a podcast and a thermos of oolong — no phone calls, no work talk. I chose walking because it is free, forgiving on my knees, and gentle on a body that has spent a decade at a desk. Since starting last March, my lower back stopped its low-grade complaining, my sleep deepened, and — surprisingly — my best ideas for the week now arrive around kilometre four, as if the legs think before the head. It is not diet or dosage; it is simply the most reliable medicine I own, and it has a lovely side effect: the city looks different when you're moving through it at three kilometres an hour.",
          "keywords": [
            "Sunday",
            "two hours",
            "free",
            "lower back",
            "sleep deepened",
            "kilometre"
          ]
        },
        {
          "topic": "p2-skill-learn",
          "card": "Describe a skill you would like to learn.",
          "points": [
            "What the skill is",
            "Why you want to learn it",
            "How you would learn it",
            "And explain what resources or people would help you"
          ],
          "ref": "The skill is cooking a proper banquet — the twelve-dish Zhejiang dinner my grandmother used to throw at Spring Festival: braised pork belly, Dongpo fish, beggar's chicken, the whole architecture. I want to learn it because that table was the gravity center of my family, and it disappears with her generation if I don't catch it now. I'd learn it hands-on, not from videos — I'd ask her to dictate while I cook, phone propped on the counter, measuring everything by eye and instinct. My father would document the recipes properly, my aunt would handle the shopping, and my mother would tell me the secret is thirty years of taste in the wrist, which cannot be written down. It is really three skills in one — cooking, listening, and remembering — and every dish I replicate is a small act of preservation.",
          "keywords": [
            "banquet",
            "Spring Festival",
            "grandmother",
            "recipes",
            "hands-on",
            "listening"
          ]
        },
        {
          "topic": "p2-thing-money",
          "card": "Describe something you are saving money for.",
          "points": [
            "What you are saving for",
            "How much it costs",
            "How long you have been saving",
            "And explain why it matters to you"
          ],
          "ref": "I'm saving for a family trip to Yunnan — ten days, four cities, my parents and my son along, roughly thirty thousand yuan in total. I started the fund in January last year with a separate bank account and a standing order of two thousand yuan a month. I have never checked its balance as obsessively as I check it — watching it creep toward the goal feels better than any shopping high I've ever had. It matters because my parents sold vegetables for thirty years so I could study, and my son is now eight and already half-grown; this trip is the first proper family holiday with all of us unconditionally present. It is not really a trip — it is rent paid on memory, collected while everyone is still healthy enough to carry backpacks.",
          "keywords": [
            "Yunnan",
            "thirty thousand",
            "bank account",
            "standing order",
            "vegetables",
            "backpacks"
          ]
        }
      ],
      "part3": [
        {
          "topic": "p3-education",
          "q": "Should schools teach children how to set goals?",
          "ref": "I think they already teach goal-setting badly — as a one-off September assembly with a worksheet. What children actually need is deliberate practice: choosing one boring, measurable goal each term, tracking it, and debriefing both success and failure. That is metacognition, not cheerleading, and it transfers to every subject afterwards.",
          "keywords": [
            "goal-setting",
            "one-off",
            "measurable goal",
            "tracking",
            "metacognition"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Is it better for children to learn habits from parents or from school?",
          "ref": "Parents model, schools reinforce — neither works alone. A child whose home runs on screens at dinner but whose school preaches attention will simply learn that adults disagree about reality. Habits stick when home and school point at the same basic things: sleep, honesty, asking before scrolling.",
          "keywords": [
            "Parents model",
            "neither works alone",
            "disagree about reality",
            "sleep",
            "scrolling"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Do you think exams encourage good study habits?",
          "ref": "Only the shallow kind — cramming, then amnesia. Exams measure performance under pressure, which teaches people to perform under pressure, not to learn. Better systems test spaced recall and long projects, which reward the slow, boring habits that actually survive contact with adult life.",
          "keywords": [
            "cramming",
            "amnesia",
            "performance under pressure",
            "spaced recall",
            "adult life"
          ]
        },
        {
          "topic": "p3-education",
          "q": "Should universities have courses on time management and self-discipline?",
          "ref": "Yes, briefly and honestly — one semester, run by people who actually practise it, not motivational speakers. Students don't need inspiration; they need a lab where they track their own procrastination for eight weeks and design counter-measures that survive February's cold and dark.",
          "keywords": [
            "briefly",
            "motivational speakers",
            "inspiration",
            "procrastination",
            "February"
          ]
        },
        {
          "topic": "p3-education",
          "q": "How can teachers motivate weaker students to make a New Year plan?",
          "ref": "By making the plan tiny and public — one paragraph, read aloud, signed by the class. Weaker students rarely lack desire; they lack a witness and a small enough first step. A public promise plus a weekly check-in beats private ambition every time I've seen it tried.",
          "keywords": [
            "tiny and public",
            "weaker students",
            "witness",
            "public promise",
            "weekly check-in"
          ]
        },
        {
          "topic": "p3-education",
          "q": "What role should reading play in a New Year routine for students?",
          "ref": "Reading is the cheapest mind-gym ever invented, and it compounds quietly. Ten pages a night sounds pathetic until you realise it's eighteen books a year. For students, reading before bed also replaces the one habit — midnight scrolling — that quietly eats both sleep and attention span.",
          "keywords": [
            "mind-gym",
            "compounds",
            "ten pages",
            "midnight scrolling",
            "attention span"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Do habit-tracking apps really help people change behaviour?",
          "ref": "They help about as much as a bathroom scale helps you lose weight — they provide feedback, not discipline. Streaks and badges work for some personalities and breed guilt or quiet abandonment in others. The app is a mirror, not a motor.",
          "keywords": [
            "bathroom scale",
            "feedback",
            "Streaks",
            "mirror",
            "discipline"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Will artificial intelligence make personal coaching available to everyone?",
          "ref": "Partly. AI can deliver the structure of coaching — weekly prompts, pattern spotting, non-judgmental nudges — at near-zero cost, which matters for people who could never afford a human coach. What it cannot replicate is human witness; people stay honest because someone they respect is watching.",
          "keywords": [
            "structure of coaching",
            "pattern spotting",
            "nudges",
            "witness",
            "watching"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Do fitness trackers improve health or just add anxiety?",
          "ref": "Both, depending on temperament. For the motivated, a ten-thousand-step count is a friendly rival; for perfectionists, one missed day becomes a moral collapse and they quietly quit the wristband. Numbers help when they inform choices, and hurt when they replace judgment.",
          "keywords": [
            "ten-thousand-step",
            "perfectionists",
            "moral collapse",
            "inform choices",
            "judgment"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Is social media more helpful or harmful for people trying to improve themselves?",
          "ref": "Mostly harmful dressed as helpful. The “day in my life” genre turns self-improvement into theatre — six a.m. grind reels and perfect Sunday meal-prep — which quietly shames ordinary people into either performing or quitting. Genuine groups exist, but they're quieter and far less addictive.",
          "keywords": [
            "day in my life",
            "theatre",
            "self-improvement",
            "performing",
            "groups"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "How has working from home changed people's daily routines?",
          "ref": "It dissolved the commuter's built-in scaffolding — the walk, the train, the fixed start — and replaced it with an infinite flexible morning in which nothing quite begins. People filled the gap with sleep, delivery food and endless small tasks, and the disciplined ones invented their own commute on purpose.",
          "keywords": [
            "commuter",
            "scaffolding",
            "infinite flexible morning",
            "sleep",
            "invented"
          ]
        },
        {
          "topic": "p3-technology",
          "q": "Should companies use software to monitor employee wellbeing goals?",
          "ref": "Monitoring wellbeing casts the company as caring while actually auditing people — a paradox. If the dashboard exists mainly to reduce sick leave, trust erodes instantly. Used transparently with opt-in consent and no penalties, aggregate data can flag overwork; used secretly, it's surveillance with a yoga logo.",
          "keywords": [
            "wellbeing",
            "paradox",
            "opt-in",
            "aggregate data",
            "surveillance"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Why do so many people make resolutions in January and abandon them by February?",
          "ref": "Because January is a cultural permission slip, not a personal plan. People borrow the energy of the season — the empty gyms, the self-help shelf — without building the private systems that carry them past week three. The calendar changes; the environment doesn't.",
          "keywords": [
            "permission slip",
            "cultural",
            "private systems",
            "week three",
            "environment"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Is self-discipline valued more in modern society than before?",
          "ref": "Rhetorically yes, practically no. Every culture praises discipline, but ours also monetises temptation — infinite snacks, feeds and sales aimed precisely at our weakest moment. Valuing discipline while selling its destruction is the central business model of the attention economy.",
          "keywords": [
            "Rhetorically",
            "temptation",
            "attention economy",
            "praises",
            "weakest moment"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Do you think communities should support each other's resolutions?",
          "ref": "Absolutely — change is far easier witnessed than endured alone. Walking groups, shared gardens, book swaps, running clubs: they all convert a lonely intention into a social identity. When the group expects you on Saturday, you go even when motivation fails, because attendance is now about belonging.",
          "keywords": [
            "witnessed",
            "Walking groups",
            "social identity",
            "Saturday",
            "belonging"
          ]
        },
        {
          "topic": "p3-society",
          "q": "What makes a resolution realistic for an ordinary working person?",
          "ref": "Small, specific and attached to an existing anchor — after breakfast, before the commute, at lunch. Big dramatic transformations fail because ordinary days are ordinary: meetings, traffic, tiredness. The realistic goal survives the worst Tuesday of the year, not just the shiny first Monday of January.",
          "keywords": [
            "Small",
            "existing anchor",
            "worst Tuesday",
            "meetings",
            "tiredness"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Are New Year resolutions a universal human behaviour?",
          "ref": "The label is Western, the impulse is universal — every culture has a season of renewal: Spring Festival, Diwali, Ramadan, Nowruz. What changes is the ritual packaging, not the wish to press restart. Humans are pattern-starved animals; we need ceremonial boundaries to negotiate change.",
          "keywords": [
            "Spring Festival",
            "Ramadan",
            "ritual packaging",
            "restart",
            "ceremonial boundaries"
          ]
        },
        {
          "topic": "p3-society",
          "q": "Should society judge people who never set resolutions?",
          "ref": "No — someone with no resolutions may simply be already satisfied, or between seasons of ambition. The healthier stance is curiosity, not judgment. Resolution culture quietly shames people into chronic “not enough-ness”, and not every honest life requires an annual draft of itself.",
          "keywords": [
            "curiosity",
            "judgment",
            "chronic",
            "not enough-ness",
            "annual draft"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should companies ask employees about their New Year goals?",
          "ref": "Asked with genuine curiosity, yes — a manager who knows you want to run a marathon or go to bed earlier can plan workload accordingly. Asked as a performance trap — “state your ambition so we can weaponise it” — it becomes theatre. The difference is confidentiality and consequence.",
          "keywords": [
            "genuine curiosity",
            "workload",
            "performance trap",
            "theatre",
            "confidentiality"
          ]
        },
        {
          "topic": "p3-work",
          "q": "How does the January office atmosphere differ from other months?",
          "ref": "Noticeably brighter for two weeks — new notebooks, optimistic stand-ups, a faint smell of resolve. By mid-February the entropy returns: inboxes refill, gym bags stay home, and everyone silently agrees not to mention the abandoned meal-prep containers in the fridge.",
          "keywords": [
            "notebooks",
            "stand-ups",
            "entropy",
            "inboxes",
            "meal-prep"
          ]
        },
        {
          "topic": "p3-work",
          "q": "What kind of workplace habits help people sustain change?",
          "ref": "Visible, tiny, shared defaults — walking meetings, a fruit bowl instead of a biscuit tin, a no-message rule after nine. Change survives at work when it is baked into the environment rather than left to personal heroism at 6 p.m. on a rainy Friday.",
          "keywords": [
            "walking meetings",
            "fruit bowl",
            "no-message rule",
            "environment",
            "heroism"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Do you think work pressure makes resolutions harder to keep?",
          "ref": "Enormously — pressure consumes the exact cognitive budget self-control needs. By Sunday night, after a week of decisions made for other people, willpower is overdrawn and the salad loses to the delivery app. Companies that reduce decision fatigue will find their employees' goals quieter but real.",
          "keywords": [
            "cognitive budget",
            "willpower",
            "overdrawn",
            "decision fatigue",
            "goals"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Should interns and young employees set professional resolutions?",
          "ref": "Yes, but process-based, not outcome-based — “ask one question in every meeting”, not “get promoted by June”. Early-career goals fail when they target identity rather than behaviour. Promotion is an outcome you influence; asking, drafting, reviewing — those are actions you control.",
          "keywords": [
            "process-based",
            "outcome-based",
            "identity",
            "asking",
            "control"
          ]
        },
        {
          "topic": "p3-work",
          "q": "Is overtime culture compatible with healthy resolutions?",
          "ref": "Fundamentally not. An organisation that quietly rewards exhaustion will eat every private promise its employees make — sleep, family, exercise, learning. Cultures that cap hours and normalise switching off produce not just happier staff but better retention, which is the only KPI that ultimately matters.",
          "keywords": [
            "Fundamentally not",
            "exhaustion",
            "cap hours",
            "switching off",
            "retention"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "How is making resolutions different in Chinese and Western cultures?",
          "ref": "Western resolutions lean individual — diet, gym, reading. Chinese New Year talk leans collective — health for parents, grades for children, peace for the family. Both are promises, but one is made in front of a mirror and the other in front of a dinner table, and each quietly shames in its own accent.",
          "keywords": [
            "individual",
            "collective",
            "mirror",
            "dinner table",
            "shames"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Why do traditions like Spring Festival include reflection and renewal?",
          "ref": "Because agrarian societies organised life around sowing and harvest, and the calendar still carries their memory. Renewal rituals — cleaning, debts settled, red packets, reunion dinners — are a psychological year-end audit that says: last year happened, and this one is unwritten.",
          "keywords": [
            "agrarian",
            "sowing",
            "red packets",
            "year-end audit",
            "unwritten"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Do you think the meaning of New Year is changing for young people?",
          "ref": "Yes — for many young Chinese, the festival is becoming travel and consumption rather than ancestor ritual or family duty. That's neither good nor bad; traditions migrate into what new generations can actually use — a day off, a reunion flight, a reason to spend time with grandparents one more day a year.",
          "keywords": [
            "travel and consumption",
            "duty",
            "migrate",
            "day off",
            "grandparents"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "How do food traditions relate to New Year in your culture?",
          "ref": "Food is the archive. Dumplings shaped like silver ingots, fish left uncut for abundance, glutinous rice cake for a taller year — the menu is a wish delivered on plates. Breaking from the table to a delivery app is not just convenience; it is quietly skipping the grammar of celebration.",
          "keywords": [
            "Dumplings",
            "fish left uncut",
            "menu is a wish",
            "delivery app",
            "celebration"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Should young people be taught the history behind these traditions?",
          "ref": "Definitely — context converts obligation into choice. A child who knows why the fish stays whole will keep it whole unprompted, and will also feel free to change it knowingly. History doesn't trap us in the past; it hands us the keys to the present.",
          "keywords": [
            "context",
            "obligation",
            "knowingly",
            "History",
            "keys"
          ]
        },
        {
          "topic": "p3-culture",
          "q": "Do imported customs like western New Year parties enrich or erode local culture?",
          "ref": "Both, depending on appetite. A midnight toast enriches a double celebration; abandoning the reunion dinner for a countdown erodes something irreplaceable. Cultures survive by absorbing, not by photocopying — the firework is welcome if the dumpling survives.",
          "keywords": [
            "midnight toast",
            "countdown",
            "absorbing",
            "firework",
            "dumpling"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Do you think people keep environmental New Year pledges?",
          "ref": "Rarely past the second week — “buy less plastic” dies at the supermarket checkout like every other good intention. The pledges that survive are structural: one less car day, a fixed recycling routine, or a default plant-based Monday that the whole household simply adopts.",
          "keywords": [
            "plastic",
            "checkout",
            "car day",
            "recycling routine",
            "household"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Should cities run campaigns around New Year to promote sustainable habits?",
          "ref": "Yes — seasonal timing is psychological leverage. A January campaign rides the wave of self-renewal that individual willpower alone cannot sustain; tying recycling bins, repair markets and energy audits to the season turns private guilt into public choreography, which lasts longer.",
          "keywords": [
            "seasonal timing",
            "leverage",
            "choreography",
            "energy audits",
            "willpower"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Are small individual habits meaningful against climate change?",
          "ref": "Individually small, collectively audible. One person's meat-free Monday won't cool the planet, but habit-changing spreads through households and offices faster than legislation. Individual habits are how large numbers quietly consent to change — and change without consent is fragile.",
          "keywords": [
            "collectively",
            "meat-free Monday",
            "households",
            "consent",
            "fragile"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "Why do festive seasons produce so much waste?",
          "ref": "Because celebration is coded as abundance, and abundance is coded as disposal — extra food cooked “just in case”, gifts wrapped in layers, decorations worn once. The season treats the month after January as if it won't exist, which is exactly why the bill arrives in February.",
          "keywords": [
            "abundance",
            "wrapped in layers",
            "just in case",
            "bill arrives",
            "decorations"
          ]
        },
        {
          "topic": "p3-environment",
          "q": "What environmental resolution would you recommend to a family?",
          "ref": "One switch, not ten: swap the weekly big shop for a planned list, which cuts both food waste and impulse packaging. Families fail resolutions that require daily heroism and succeed at defaults — one fridge audit per week beats noble declarations every single time.",
          "keywords": [
            "weekly big shop",
            "planned list",
            "impulse packaging",
            "heroism",
            "fridge audit"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Why does advertising peak around New Year with 'new you' messages?",
          "ref": "Because January is the one month when consumers' self-image voluntarily leaves the station and goes shopping. Brands sell gym memberships, skincare, notebooks, language courses — all of them proxies for the resolution “become someone new”. It works precisely because the resolution is real; the products are just merchandise for hope.",
          "keywords": [
            "January",
            "self-image",
            "notebooks",
            "become someone new",
            "hope"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Do motivational influencers help or harm resolution-makers?",
          "ref": "Mostly harm, occasionally help. The 5 a.m. cold-shower genre turns self-discipline into theatre and confuses performance with change; the rare good ones show process — the tired Mondays, the missed days — not just the transformation montage.",
          "keywords": [
            "5 a.m.",
            "theatre",
            "performance",
            "process",
            "missed days"
          ]
        },
        {
          "topic": "p3-media",
          "q": "How should news media cover the psychology of resolutions?",
          "ref": "With humility — fewer “10 tricks to transform your life” lists and more reporting on why change is hard: environment design, decision fatigue, the four-day attrition cliff. Journalism that respects difficulty creates durable change; journalism that sells miracles produces the same February crash it diagnoses.",
          "keywords": [
            "humility",
            "environment design",
            "decision fatigue",
            "miracles",
            "February crash"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Is the New Year gala still relevant to Chinese audiences?",
          "ref": "For the older generation deeply — it is the shared hearth of New Year's Eve. For younger viewers it survives as memes and viral clips, enjoyed half-watching while the family eats. It has shifted from must-watch television to cultural background music, and that may be the only way a national broadcast survives fragmentation.",
          "keywords": [
            "shared hearth",
            "memes",
            "cultural background music",
            "fragmentation",
            "must-watch"
          ]
        },
        {
          "topic": "p3-media",
          "q": "Do reality shows about habit change inspire real change?",
          "ref": "Occasionally, briefly. Watching a hundred strangers transform on screen gives viewers a vicarious sense of agency, but the effect fades when the credits roll because viewers never build their own system. The honest lesson would be episode one: small, boring, supported — not dramatic, cinematic, televised.",
          "keywords": [
            "vicarious sense of agency",
            "credits roll",
            "own system",
            "boring",
            "televised"
          ]
        }
      ]
    }
  }
];
