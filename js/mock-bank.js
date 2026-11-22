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
  }
];
