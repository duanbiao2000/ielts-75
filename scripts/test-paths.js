// T-6.2 功能路径测试：按真实学习路径顺序覆盖主流程
// 诊断 → 旅程 → 课程（课内练习→单元测验）→ 演练舱（对话→反馈→解锁）↔ 模块任务联动
// → 测验及格/不及格 → 模考 → 复习系统 → 徽章 → 导航渲染
const fs = require('fs');
const path = require('path');
const dir = '/home/user/ielts-75/onboarding/js';
function makeEl(){
  const el = {
    _html:'', _text:'', style:{}, children:[], value:'', dataset:{},
    set innerHTML(v){ this._html=v; }, get innerHTML(){ return this._html; },
    set textContent(v){ this._text=v; }, get textContent(){ return this._text; },
    appendChild(c){ this.children.push(c); return c; },
    addEventListener(){}, removeEventListener(){}, setAttribute(){}, classList:{add(){},remove(){},toggle(){}},
    onclick:null, disabled:false,
    querySelector(sel){ return sel && sel.startsWith('#') ? byId(sel.slice(1)) : makeEl(); },
    querySelectorAll(){ return [] },
    scrollIntoView(){},
    remove(){}, click(){ if(this.onclick) this.onclick(); },
  };
  return el;
}
const els = {};
const byId = (id) => (els[id] || (els[id]=makeEl()));
const doc = {
  getElementById: byId, createElement: makeEl,
  querySelector(sel){ return sel && sel.startsWith('#') ? byId(sel.slice(1)) : makeEl(); },
  querySelectorAll(){ return [] },
  addEventListener(){}, body: makeEl(),
};
const win = {
  document: doc, addEventListener(){},
  speechSynthesis:{ speak(){} },
  navigator:{ mediaDevices:{ getUserMedia:()=>Promise.reject(new Error('no mic')) } },
  AudioContext: function(){ return { createMediaStreamDestination:()=>({stream:{}}), createMediaStreamSource:()=>({connect(){}}), destination:{}, close(){} }; },
  location:{ href:'http://localhost/' },
};
const store = {};
const localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
};
win.window = win; win.self = win; win.globalThis = win; win.localStorage = localStorage;
const code = ['practice-full.js','data.js','training.js','course.js','app.js']
  .map(f => fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
const fn = new Function('window','self','globalThis','document','localStorage', code +
  '\n;return { LESSONS,SCENARIOS,MODULES,BADGES,PRACTICE,DIAG_SUBJECTS,QUIZ_LESSONS,QUIZ_MODS,MOCK_EXAM,LESSON_PACKS,MODULE_PACKS, done, renderAll,\n' +
  '  openLesson, openLessonPractice, lpx, lpxPick, lpxNext,\n' +
  '  openUnitQuiz, uq, uqPick, uqNext,\n' +
  '  openPractice, getPod:()=>pod, setPod:(p)=>{pod=p}, advance, goCheck, finishCheck, genFeedbackFb, fbDone, closePod,\n' +
  '  toggleModTask, checkinMod, openScen, mark, openMock, mockGo, mockScoreSpeak, mockSpeakNext, mockListenPick, mockListenNext, getMock:()=>mock, closeMock, mockMax,\n' +
  '  renderReview, setReviewTab:(t)=>{reviewTab=t}, getDueReviews, doReview,\n' +
  '  diagPick, diagNext, getDiag:()=>diag, renderDiag };');
const G = fn(win, win, win, doc, localStorage);

let pass=0, fail=0;
function check(name, cond){ if(cond){pass++; console.log('  ✅', name);} else {fail++; console.log('  ❌', name);} }

console.log('【1】诊断主路径（全对 → 完成四科诊断）');
check('初始未进入诊断结果', !G.done.diag || G.done.diag.length===0);
for(const sub of G.DIAG_SUBJECTS){
  for(let i=0;i<sub.questions.length;i++){
    const q = sub.questions[G.getDiag().qIdx];
    G.diagPick(q.right, q);
    G.diagNext();
  }
}
check('诊断 12 题全部答对', G.getDiag().finished===true);
check('诊断完成已记录（diag4）', (G.done.diag||[]).includes('diag4'));
check('旅程 ch1（看清起点）已达成', (G.done.journey||[]).includes('ch1'));

console.log('【2】课程主路径（查看 → 课内练习 → 单元测验 → 完成解锁）');
G.openLesson(G.LESSONS[0]);
check('lessonView 记录 l1', (G.done.lessonView||[]).includes('l1'));
G.openLessonPractice('l1');
const lpxList = G.LESSON_PACKS['l1'].practice;
for(let i=0;i<lpxList.length;i++){
  const q = lpxList[G.lpx.idx];
  if(q.type==='choice'){ G.lpxPick(q.right, q); } else { byId('lpxFill').value = q.answer; G.lpxPick(null, q); }
  G.lpxNext();
}
check('课内练习完成并记录', (G.done.lessonEx||[]).includes('l1'));
G.openUnitQuiz('lesson','l1');
for(const q of G.QUIZ_LESSONS['l1']){
  if(q.type==='choice'){ G.uqPick(q.right, q); } else { byId('uqFill').value = q.answer; G.uqPick(null, q); }
  G.uqNext();
}
check('单元测验通过', (G.done.quizPass||[]).includes('lesson:l1'));
check('第 1 课完成', (G.done.lesson||[]).includes('l1'));
check('课程徽章 b01（课程启程）已解锁', (G.done.badges||[]).includes('b01'));

console.log('【3】场景主路径（标记浏览 + 打开场景卡）');
const scenName = '考场应答与考官互动';
G.mark('scen', scenName);
check('场景已记录浏览', (G.done.scen||[]).includes(scenName));
G.openScen(G.SCENARIOS.find(s=>s.name===scenName));
check('场景卡渲染含名称与任务', byId('modalBox').innerHTML.includes(scenName) && byId('modalBox').innerHTML.includes('练习任务'));

console.log('【4】演练舱主路径（含 fromModuleTask 双向联动 + 低流畅度 → 薄弱）');
G.openPractice(scenName, {fromModuleTask:'m01t4'});
byId('btnStartEx').onclick(); // 任务简报 → 对话
const p = G.PRACTICE[scenName];
const turns = p.dialogs.reduce((a,d)=>a+d.lines.length,0);
let guard=0;
while(G.getPod().step===1 && G.getPod().lineIdx<turns && guard<50){ G.setPod({...G.getPod(), showRef:true}); G.advance(); guard++; }
G.goCheck(); // 对话完成 → 自检
check('对话对话流完成进入自检', G.getPod().step===2);
G.setPod({name:scenName,step:2,exIdx:0,lineIdx:turns,varSel:0,tab:'words',showRef:false,
  checks:p.checks.map(()=>true),
  ratings:{word:3, fluency:2, grammar:3, pron:3},  // 流畅度 ≤2 → 应记入薄弱场景
  feedback:null, recOn:false, recUrl:null, fromModuleTask:'m01t4', fromLesson:null});
G.finishCheck();
G.genFeedbackFb();
check('反馈包含具体话术（维度+进阶说法）', !!G.getPod().feedback && G.getPod().feedback.includes('流畅度') && /进阶/.test(G.getPod().feedback));
check('低流畅度反馈含具体改进建议', G.getPod().feedback.includes('卡顿'));
G.fbDone();
check('演练完成已记录', (G.done.practice||[]).includes(scenName));
check('模块任务 m01t4 被自动勾选（联动）', (G.done.modTasks||[]).includes('m01t4'));
check('薄弱场景已进入复习清单', (G.done.review||[]).some(r=>r.name===scenName && r.weak===true));

console.log('【5】模块主路径（任务打卡 → 模块完成；重复打卡防重）');
G.toggleModTask('m01','m01t1'); G.toggleModTask('m01','m01t2'); G.toggleModTask('m01','m01t3');
check('模块尚未完成（差 t4，已自动勾选）', (G.done.mod||[]).includes('m01')); // t4 已由演练舱勾选 → 应恰好完成
G.checkinMod('m01');
const ck1 = (G.done.modCheckins||[]).filter(k=>k.startsWith('m01:')).length;
G.checkinMod('m01'); // 同日重复打卡
const ck2 = (G.done.modCheckins||[]).filter(k=>k.startsWith('m01:')).length;
check('当日打卡记录且同日防重', ck1===1 && ck2===1);

console.log('【6】测验不及格路径（错题入错题本，不计通过）');
G.openUnitQuiz('lesson','l2');
for(const q of G.QUIZ_LESSONS['l2']){
  if(q.type==='choice'){ G.uqPick((q.right+1)%q.opts.length, q); } else { byId('uqFill').value = '#绝对错误#'; G.uqPick(null, q); }
  G.uqNext();
}
check('l2 测验未通过', !(G.done.quizPass||[]).includes('lesson:l2'));
check('错题已记入错题本', (G.done.errors||[]).some(e=>e.id==='lesson:l2'));

console.log('【7】模考主路径（全真流程，满分评分一致）');
G.openMock(); G.mockGo('full');
let g2=0;
while(G.getMock().part==='speak' && g2<20){
  const q=G.MOCK_EXAM.speaking[G.getMock().speakIdx];
  byId('mockAns').value=q.ref;
  G.mockScoreSpeak(); G.mockSpeakNext(); g2++;
}
let g3=0;
while(G.getMock().part==='listen' && g3<20){
  const q=G.MOCK_EXAM.listening[G.getMock().listenIdx];
  G.mockListenPick(q.right,q); G.mockListenNext(); g3++;
}
check('模考进入成绩页', G.getMock().part==='done');
check('模考完成已记录', G.done.mock===true);
check('满分 20 已同步到 mockBest', G.done.mockBest===G.mockMax());
G.closeMock();

console.log('【8】复习系统主路径（薄弱 Tab 渲染 / 到期提醒 / 推进间隔）');
G.setReviewTab('weak'); G.renderReview();
check('薄弱 Tab 展示演练场景', byId('reviewBody').innerHTML.includes(scenName));
G.setReviewTab('due'); G.renderReview();
check('未到期时复习队列为空提示', byId('reviewBody').innerHTML.includes('没有到点的复习'));
// 手动把演练记录推到到期：practicedAt 回退 2 天（间隔 1 天已到点）
const rec = G.done.review.find(r=>r.name===scenName);
rec.practicedAt = Date.now() - 2*24*3600*1000;
G.setReviewTab('due'); G.renderReview();
check('到期后复习提醒出现', byId('reviewBody').innerHTML.includes(scenName));
G.doReview(scenName);
check('复习后 stage 推进到 1', G.done.review.find(r=>r.name===scenName).stage===1);
G.setReviewTab('errors'); G.renderReview();
check('错题 Tab 展示 l2 不及格记录', byId('reviewBody').innerHTML.includes('lesson:l2'));

console.log('【9】旅程主路径（ch2：学会怎么练）');
G.renderAll();
check('旅程 ch2 已达成（l1 完成 + ≥1 次演练）', (G.done.journey||[]).includes('ch2'));
check('成就解锁 b14（迈出第一步·诊断）', (G.done.badges||[]).includes('b14'));

console.log('【10】全页渲染无异常');
try { G.renderAll(); check('renderAll 正常执行', true); } catch(e){ console.log('  ❌ renderAll 抛错:', e.message); fail++; }

console.log(`\n结果：${pass} 通过，${fail} 失败`);
process.exit(fail?1:0);
