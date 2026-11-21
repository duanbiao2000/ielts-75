/* ============ 状态管理 ============ */
const STORE_KEY='ielts75_onboard';
let done = loadState();
function loadState(){
  try{
    const raw = JSON.parse(localStorage.getItem(STORE_KEY)||'{}') || {};
    return migrateState(raw);
  }catch(e){ return {}; }
}
function migrateState(s){
  s = s || {};
  // 数组字段补齐
  ['lesson','scen','mod','practice','diag','badges','quiz','review','errors','lessonView','lessonEx','quizPass','modTasks','modCheckins'].forEach(k=>{ if(!Array.isArray(s[k])) s[k]=[]; });
  // 游戏化系统预留字段（批次 4 使用）
  if(typeof s.experience!=='number') s.experience=0;
  if(typeof s.streak!=='number') s.streak=0;
  if(typeof s.level!=='number') s.level=1;
  if(typeof s.mockBest!=='number') s.mockBest=0;
  if(!Array.isArray(s.badges)) s.badges=[];
  if(typeof s.bestStreak!=='number') s.bestStreak=0;
  if(typeof s.streakFreeze!=='number') s.streakFreeze=1; // 新人赠送 1 张断签补偿券
  if(typeof s.lastStreakDate!=='string') s.lastStreakDate='';
  if(!Array.isArray(s.journey)) s.journey=[];
  return s;
}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(done)); }catch(e){} }
/* 学习记录写入 learning-records（localStorage 独立键，按时间倒序追加，上限 500） */
const LR_KEY='learning-records';
function lrPush(action,id,detail){
  try{
    const arr=JSON.parse(localStorage.getItem(LR_KEY)||'[]');
    arr.push({ts:Date.now(),action:action,id:id,detail:detail||''});
    if(arr.length>500) arr.splice(0,arr.length-500);
    localStorage.setItem(LR_KEY, JSON.stringify(arr));
  }catch(e){}
}
function logLearning(action,id,detail){
  lrPush(action,id,detail);
  updateStreak();
}
/* ============ 等级与经验（T-4.2） ============ */
const LEVEL_TITLES=['备考新兵','勤奋学徒','进阶学者','语感猎手','表达工匠','考场强者','七分猎人','全能型选手','准七半','七分半大师'];
// 每级所需累计 XP（对应 Lv2..Lv10）
const LEVEL_XP=[100,250,450,700,1000,1400,1900,2500,3200];
function levelInfo(xp){
  let lv=1;
  for(let i=0;i<LEVEL_XP.length;i++){ if(xp>=LEVEL_XP[i]) lv=i+2; }
  const cur=lv<=1?0:LEVEL_XP[lv-2];
  const next=lv>=10?LEVEL_XP[LEVEL_XP.length-1]:LEVEL_XP[lv-1];
  return {lv, cur, next, pct: lv>=10 ? 100 : Math.round((xp-cur)/(next-cur)*100)};
}
function awardXP(n, reason){
  if(!n||n<=0) return;
  const before=levelInfo(done.experience||0).lv;
  done.experience=(done.experience||0)+n;
  const info=levelInfo(done.experience);
  if(info.lv>before){
    done.level=info.lv;
    logLearning('level-up','lv'+info.lv,'Lv.'+info.lv+' · '+LEVEL_TITLES[info.lv-1]);
    toast('🎉 升级！Lv.'+info.lv+' · '+LEVEL_TITLES[info.lv-1]);
  } else if(reason){
    toast('＋'+n+' XP（'+reason+'）');
  }
  save();
  renderHeader();
}
/* ============ 学习记录导出（T-5.1） ============ */
function exportBundle(){
  let arr=[]; try{ arr=JSON.parse(localStorage.getItem(LR_KEY)||'[]'); }catch(e){}
  const actionCounts={}; arr.forEach(r=>{ actionCounts[r.action]=(actionCounts[r.action]||0)+1; });
  return {
    app:'ielts-75', schema:1, exportedAt:new Date().toISOString(),
    summary:{
      lessonsDone:(done.lesson||[]).length, lessonsTotal:LESSONS.length,
      scenariosPracticed:(done.practice||[]).length, scenariosTotal:SCENARIOS.length,
      modulesDone:(done.mod||[]).length, modulesTotal:MODULES.length,
      quizPassed:(done.quizPass||[]).length, quizTotal:(typeof QUIZ_LESSONS!=='undefined'?Object.keys(QUIZ_LESSONS).length+Object.keys(QUIZ_MODS).length:0),
      badges:(done.badges||[]).length, badgesTotal:BADGES.length,
      experience:done.experience||0, level:done.level||1,
      streak:done.streak||0, bestStreak:done.bestStreak||0, streakFreeze:done.streakFreeze||0,
      mockBest:done.mockBest||0, journey:(done.journey||[]).length, journeyTotal:JOURNEY.length,
      errors:(done.errors||[]).length, reviewDue:getDueReviews().length,
    },
    state:done,
    learningRecords:arr,
    actionCounts,
  };
}
function downloadFile(name, content, mime){
  const blob=new Blob([content],{type:mime||'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=name; a.style.display='none';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ try{URL.revokeObjectURL(url);}catch(e){} a.remove(); }, 0);
}
function exportJSON(){
  const b=exportBundle();
  downloadFile('ielts75-learning-records-'+localDate().replace(/-/g,'')+'.json', JSON.stringify(b,null,2), 'application/json');
  lrPush('export','json');
  toast('📦 学习记录已导出（JSON）');
}
function csvEscape(v){ v=String(v==null?'':v); return /[",\r\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }
function exportCSV(){
  const b=exportBundle();
  const rows=[['时间(ISO)','动作','对象','详情']];
  b.learningRecords.forEach(r=>rows.push([new Date(r.ts).toISOString(), r.action, r.id, r.detail||'']));
  const csv='\ufeff'+rows.map(r=>r.map(csvEscape).join(',')).join('\r\n');
  downloadFile('ielts75-learning-records-'+localDate().replace(/-/g,'')+'.csv', csv, 'text/csv;charset=utf-8');
  lrPush('export','csv');
  toast('📄 学习记录已导出（CSV）');
}
function openExport(){
  let n=0; try{ n=JSON.parse(localStorage.getItem(LR_KEY)||'[]').length; }catch(e){}
  openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>📤 导出学习记录</h2>
    <p>导出内容包含：训练进度汇总（课程 / 场景演练 / 模块 / 徽章 / 等级 / 连续天数 / 模考最佳 / 旅程）、完整状态快照，以及 <b>${n}</b> 条学习流水记录。</p>
    <div class="export-opts">
      <button class="btn" onclick="exportJSON()">📦 导出 JSON（完整备份）</button>
      <button class="btn ghost" onclick="exportCSV()">📄 导出 CSV（流水 · Excel 可读）</button>
    </div>
    <p class="export-note">JSON 含全部状态，可用于迁移设备或对接推广材料；CSV 仅含流水，便于用表格复盘训练频率与薄弱环节。</p>`);
}

/* ============ 成就与剧情：从 6.0 到 7.5 的旅程（T-4.4） ============ */
const JOURNEY = [
  {id:'ch1', stage:'序章', score:'6.0 → 6.5', title:'看清起点',
   story:'你带着“大概 6 分吧”走进训练基地。四科诊断帮你照见真实水平——不靠感觉，靠数据。第一步不是练更多，而是看清自己在哪。',
   goal:'完成四科诊断', check:()=> (done.diag||[]).length>=1, reward:60},
  {id:'ch2', stage:'第一章', score:'6.5 → 6.8', title:'学会怎么练',
   story:'方法不对，努力白费。这一章用方法论武装你：A-R-E 短答、Part 2 提纲法、Part 3 论证框架——先学会怎么练，再开始练。',
   goal:'完成第 1 课 且 完成 1 次场景演练', check:()=> (done.lesson||[]).includes('l1') && (done.practice||[]).length>=1, reward:80},
  {id:'ch3', stage:'第二章', score:'6.8 → 7.0', title:'听懂，说出',
   story:'雅思的墙通常立在“听不懂、说不出”上。这一章你把听力输入补齐、把口语输出炼熟：同义替换、Part 3 论证、语流跟读——量的积累到质的飞跃。',
   goal:'累计完成 15 次场景演练', check:()=> (done.practice||[]).length>=15, reward:150},
  {id:'ch4', stage:'第三章', score:'7.0 → 7.2', title:'方法论闭环',
   story:'零散的技巧汇成体系。11 课全部走完，你拥有完整的方法库和 30 个场景的底气——现在，轮到组合拳了。',
   goal:'完成全部 11 个课程关卡', check:()=> (done.lesson||[]).length>=11, reward:150},
  {id:'ch5', stage:'第四章', score:'7.2 → 7.4', title:'在压力下定型',
   story:'平时练得好，考场上崩了——这是很多人的故事。模考是唯一的解药：全真流程、关键词评分、错题归因，把不确定变成确定。',
   goal:'完成一次模考', check:()=> !!done.mock, reward:180},
  {id:'ch6', stage:'终章', score:'7.4 → 7.5', title:'七分半',
   story:'P0/P1 模块全部攻克，模考稳定在 16/20 以上——这不是运气，是复利。当你能把每一分失误讲清楚，7.5 就不再是目标，而是水到渠成。',
   goal:'完成全部 P0/P1 模块 且 模考最佳 ≥ 16/20', reward:300,
   check:()=>{ const p0p1=MODULES.filter(m=>m.p!=='P2').map(m=>m.id); return p0p1.every(id=>(done.mod||[]).includes(id)) && (done.mockBest||0)>=16; }},
];
function openJourney(){
  if(!done.journey) done.journey=[];
  const items=JOURNEY.map((ch,i)=>{
    const got=done.journey.includes(ch.id);
    const unlocked=i===0 || done.journey.includes(JOURNEY[i-1].id);
    const state=got?'done':(unlocked?'current':'locked');
    return `<div class="jch ${state}">
      <div class="jch-dot">${got?'✓':(i+1)}</div>
      <div class="jch-body">
        <div class="jch-stage">${ch.stage} · <b>${ch.score}</b>${got?' · ✅ 已达成':(unlocked?' · 进行中':'')}</div>
        <h3>${ch.title}</h3>
        <p class="jch-story">${state==='locked'?'……（继续前行以解锁这一章）':ch.story}</p>
        <div class="jch-goal">🎯 通关条件：${ch.goal}</div>
        <div class="jch-reward">🏅 奖励：${ch.reward} XP</div>
      </div></div>`;
  }).join('');
  openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>🏯 从 6.0 到 7.5 的旅程</h2>
    <p class="jch-progress">已达成 <b>${done.journey.length}</b> / ${JOURNEY.length} 章 · 终点：雅思 7.5</p>
    <div class="jch-list">${items}</div>`);
}
function showJourneyStory(ch){
  openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <div class="journey-story">
      <div class="js-stage">${ch.stage} · ${ch.score}</div>
      <h2 style="margin:8px 0 12px">🏯 ${ch.title}</h2>
      <p style="line-height:1.8">${ch.story}</p>
      <div class="js-reward">🎉 章节达成！+${ch.reward} XP</div>
      <button class="btn" onclick="closeModal()" style="margin-top:14px">继续前行 →</button>
    </div>`);
}
function checkJourney(){
  if(!done.journey) done.journey=[];
  for(let i=0;i<JOURNEY.length;i++){
    const ch=JOURNEY[i];
    if(done.journey.includes(ch.id)) continue;
    const prevOk = i===0 || done.journey.includes(JOURNEY[i-1].id);
    if(prevOk && ch.check()){
      done.journey.push(ch.id); save();
      lrPush('journey', ch.id, ch.title);
      awardXP(ch.reward, '剧情章节 · '+ch.title);
      showJourneyStory(ch);
      return; // 每次渲染只弹一章，不打断训练
    }
  }
}

/* ============ 连续打卡与习惯（T-4.3） ============
   规则：当天有任一学习行为即打卡；昨日也有则连续+1；
   断签恰好 1 天且有补偿券 → 消耗 1 张补偿券，连续保留；
   否则断签，连续重置为 1。每满 7 天连续奖励 1 张补偿券。 */
function localDate(d){ const x=d||new Date(); return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); }
function dayDiff(a,b){ return Math.round((new Date(a)-new Date(b))/86400000); }
function updateStreak(){
  const today=localDate();
  if(done.lastStreakDate===today) return;
  const y=new Date(); y.setDate(y.getDate()-1);
  const yest=localDate(y);
  let usedFreeze=false;
  if(done.lastStreakDate===yest){
    done.streak=(done.streak||0)+1;
  } else if(done.lastStreakDate && dayDiff(today,done.lastStreakDate)===2 && (done.streakFreeze||0)>0){
    done.streakFreeze--; done.streak=(done.streak||0)+1; usedFreeze=true;
  } else {
    done.streak=1;
  }
  done.lastStreakDate=today;
  done.bestStreak=Math.max(done.bestStreak||0, done.streak);
  if(done.streak%7===0){ done.streakFreeze=(done.streakFreeze||0)+1; lrPush('streak-reward','streak','连续'+done.streak+'天，+1 断签补偿券'); toast('🎫 连续 '+done.streak+' 天！奖励 1 张断签补偿券'); }
  if(usedFreeze){ lrPush('streak-freeze','streak','断签补偿券消耗，连续保留至 '+done.streak+' 天'); toast('🎫 断签补偿券已消耗，连续 '+done.streak+' 天保留！'); }
  save();
}
/* 今日任务：基于学习状态推荐的每日训练（T-4.3） */
function recommendDaily(){
  for(let i=0;i<LESSONS.length;i++){ if(lessonUnlocked(i) && !(done.lesson||[]).includes(LESSONS[i].id)) return '学习课程关卡：'+LESSONS[i].title; }
  if((done.quizPass||[]).length<23){
    const nextLesson=lessonIdsWithQuizPending();
    if(nextLesson) return '通过单元测验：'+nextLesson;
  }
  const due=getDueReviews(); if(due.length) return '完成 '+due.length+' 项间隔复习（见下方复习中心）';
  const undone=SCENARIOS.find(s=>!(done.practice||[]).includes(s.name));
  if(undone) return '完成场景演练：'+undone.name;
  if(!done.mock) return '完成一次模考冲刺';
  return '自由训练：任选场景演练或模考，保持手感';
}
function lessonIdsWithQuizPending(){
  const p=(done.quizPass||[]);
  for(const l of LESSONS){ if(!p.includes('lesson:'+l.id)) return l.title; }
  for(const m of MODULES){ if(!p.includes('mod:'+m.id)) return m.title; }
  return null;
}
function renderDaily(){
  const el=$('#dailyTask'); if(!el) return;
  const today=localDate();
  const checkedIn=done.lastStreakDate===today;
  el.innerHTML=`<div class="dt-head">🗓️ 今日任务 ${checkedIn?'<span class="dt-ok">✅ 今日已打卡</span>':'<span class="dt-pending">未开始</span>'}</div>
    <div class="dt-body">${recommendDaily()}</div>
    <div class="dt-foot">连续训练 <b>${done.streak||0}</b> 天 · 最佳 ${done.bestStreak||0} 天 · 补偿券 <b>${done.streakFreeze||0}</b> 张</div>`;
}
function renderHeader(){
  const info=levelInfo(done.experience||0);
  if((done.level||1)!==info.lv){ done.level=info.lv; }
  const t=$('#lvChip'); if(t) t.textContent='Lv.'+info.lv+' '+LEVEL_TITLES[info.lv-1];
  const f=$('#xpFill'); if(f) f.style.width=info.pct+'%';
  const x=$('#xpText'); if(x) x.textContent=(done.experience||0)+' / '+info.next+' XP';
  const s=$('#streakChip'); if(s) s.textContent='🔥 '+(done.streak||0)+' 天连续';
  document.body.dataset.level=info.lv;
}
function mark(type,id){ if(!done[type]){ done[type]=[]; } if(!done[type].includes(id)){ done[type].push(id); save(); toast('✅ 已解锁：'+id); } renderAll(); }

/* ============ 渲染 ============ */
const $=s=>document.querySelector(s);
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }

/* 课程章节解锁：第 1 课可常开，其余需前一课全部完成（知识点+课内练习+小测） */
function lessonIndex(id){ return LESSONS.findIndex(x=>x.id===id); }
function lessonStepsDone(id){
  return {
    view: (done.lessonView||[]).includes(id),
    ex: (done.lessonEx||[]).includes(id),
    quiz: (done.quizPass||[]).includes('lesson:'+id),
  };
}
function isLessonComplete(id){ const s=lessonStepsDone(id); return s.view && s.ex && s.quiz; }
function lessonUnlocked(idx){ return idx===0 || (done.lesson||[]).includes(LESSONS[idx-1].id); }
function checkLessonDone(id){
  if(!id) return;
  if(isLessonComplete(id) && !(done.lesson||[]).includes(id)){
    if(!done.lesson) done.lesson=[];
    done.lesson.push(id); save();
    logLearning('lesson-complete', id);
    awardXP(50,'课程完成');
    toast('🎉 第 '+(lessonIndex(id)+1)+' 课完成，下一课已解锁！');
  }
  renderAll();
}
function renderLessons(){
  $('#pathLessons').innerHTML = LESSONS.map((l,i)=>{
    const d = done.lesson&&done.lesson.includes(l.id);
    const unl = lessonUnlocked(i);
    const s = lessonStepsDone(l.id);
    const steps = `<div class="ls-steps">${s.view?'<span class="ls on">知识点</span>':'<span class="ls">知识点</span>'}${s.ex?'<span class="ls on">练习</span>':'<span class="ls">练习</span>'}${s.quiz?'<span class="ls on">小测</span>':'<span class="ls">小测</span>'}</div>`;
    return `<div class="node ${d?'done':''} ${unl?'':'locked'}">
      <div class="dot">${d?'✓':(unl?l.icon:'🔒')}</div>
      <div class="card" data-lesson="${l.id}" tabindex="0" role="button">
        <h3>${l.title} <span class="tag">${d?'已完成':(unl?'点击查看':'先完成上一课')}</span></h3>
        <p>${l.summary}</p>${unl?steps:''}
      </div></div>`;
  }).join('');
  $('#pathLessons').querySelectorAll('.card').forEach(el=>{
    const fn=()=>{ const i=lessonIndex(el.dataset.lesson); if(!lessonUnlocked(i)){ toast('🔒 先完成上一课才能解锁'); return; } openLesson(LESSONS[i]); };
    el.onclick=fn; keyActivate(el, fn);
  });
}
function renderScen(domain){
  $('#scenTabs').innerHTML = SCEN_DOMAINS.map(d=>{
    const n=SCENARIOS.filter(s=>s.d===d).length;
    return `<span class="tab ${d===domain?'active':''}" data-d="${d}" tabindex="0" role="button">${d}<span class="n">${n}</span></span>`;
  }).join('');
  $('#scenTabs').querySelectorAll('.tab').forEach(t=>{ const fn=()=>renderScen(t.dataset.d); t.onclick=fn; keyActivate(t, fn); });
  const list = SCENARIOS.filter(s=>s.d===domain);
  $('#scenGrid').innerHTML = list.map(s=>{
    const d = (done.scen&&done.scen.includes(s.name)) || (done.practice&&done.practice.includes(s.name));
    return `<div class="card ${d?'done':''}" data-s="${s.name}" tabindex="0" role="button">
      <h3>${s.name}</h3><p>${s.blurb}</p>
      <div class="mini">${s.expr}</div></div>`;
  }).join('');
  $('#scenGrid').querySelectorAll('.card').forEach(el=>{
    const fn=()=>{ const s=SCENARIOS.find(x=>x.name===el.dataset.s); mark('scen',s.name); openScen(s); };
    el.onclick=fn; keyActivate(el, fn);
  });
}
function renderMods(){
  $('#modGrid').innerHTML = MODULES.map(m=>{
    const d = done.mod&&done.mod.includes(m.id);
    const p = MODULE_PACKS[m.id]||{tasks:[]};
    const total=p.tasks.length, checked=p.tasks.filter(t=>(done.modTasks||[]).includes(t.id)).length;
    const pct=total?Math.round(checked/total*100):0;
    return `<div class="card ${d?'done':''}" data-m="${m.id}" tabindex="0" role="button">
      <h3>${m.icon} ${m.title} <span class="tag ${m.p.toLowerCase()}">${m.p}</span></h3>
      <p>${m.blurb}</p>
      <div class="card-bar"><div class="card-bar-fill" style="width:${pct}%"></div></div>
      <div class="card-meta">${checked}/${total} 项任务${d?' · ✅ 已完成':''}</div></div>`;
  }).join('');
  $('#modGrid').querySelectorAll('.card').forEach(el=>{
    const fn=()=>{ const m=MODULES.find(x=>x.id===el.dataset.m); openMod(m); };
    el.onclick=fn; keyActivate(el, fn);
  });
}
/* ============ 徽章条件解释器（T-4.1） ============ */
function badgeCond(c){
  try{
    switch(c.t){
      case 'arr': return (done[c.f]||[]).length>=c.min;
      case 'scenDomain': return (done.scen||[]).filter(n=>{const s=SCENARIOS.find(x=>x.name===n);return s&&s.d===c.d;}).length>=c.min;
      case 'modP': return (done.mod||[]).filter(id=>{const m=MODULES.find(x=>x.id===id);return m&&m.p===c.p;}).length>=c.min;
      case 'checkinDays': return new Set((done.modCheckins||[]).map(x=>String(x).split(':')[1])).size>=c.min;
      case 'refresh': return (done.review||[]).filter(r=>(r.stage||0)>=1).length>=c.min;
      case 'mock': return !!done.mock;
      case 'mockBest': return (done.mockBest||0)>=c.min;
      case 'streak': return (done.streak||0)>=c.min;
      case 'level': return (done.level||1)>=c.min;
      case 'all': return (c.of||[]).every(([f,min])=>((done[f]||[]).length)>=min);
    }
  }catch(e){}
  return false;
}
function checkBadges(){
  if(!done.badges) done.badges=[];
  BADGES.forEach(b=>{
    if(done.badges.includes(b.id)) return;
    if(badgeCond(b.cond)){
      done.badges.push(b.id); save();
      logLearning('badge-unlock', b.id, b.name);
      toast('🏆 解锁徽章：'+b.name);
    }
  });
}
function renderBadges(){
  checkBadges();
  $('#badgeCount').textContent = done.badges.length;
  $('#badgeGrid').innerHTML = BADGES.map(b=>{
    const on = done.badges.includes(b.id);
    return `<div class="badge ${on?'on':''}">
      <div class="em">${on?b.em:'🔒'}</div>
      <h3>${b.name}</h3><p>${b.desc}</p><div class="bcat">${b.cat}</div></div>`;
  }).join('');
}
function renderProgress(){
  const total = LESSONS.length + SCENARIOS.length + MODULES.length + 1;
  const got = (done.lesson||[]).length + (done.scen||[]).length + (done.mod||[]).length + ((done.diag||[]).length?1:0);
  const pct = Math.round(got/total*100);
  const C = 113;
  $('#ringFg').setAttribute('stroke-dashoffset', C*(1-pct/100));
  $('#ringPct').textContent = pct+'%';
}
function renderAll(){ renderLessons(); renderScen($('#scenTabs').dataset.cur||'职场'); renderMods(); renderBadges(); renderProgress(); renderReview(); renderHeader(); renderDaily(); checkJourney(); }

/* ============ 弹窗 ============ */
let lastFocus=null;
function openModal(html){
  lastFocus=(typeof document!=='undefined')?document.activeElement:null;
  $('#modalBox').innerHTML = html; $('#modal-mask').classList.add('show');
  const c=$('#modalBox').querySelector ? $('#modalBox').querySelector('.close') : null;
  if(c && c.focus) c.focus();
}
function closeModal(){
  $('#modal-mask').classList.remove('show'); currentModId=null;
  if(lastFocus && lastFocus.focus){ try{ lastFocus.focus(); }catch(e){} lastFocus=null; }
}
/* 键盘激活：为 div/span 卡片提供 Enter/Space 操作（键盘可达） */
function keyActivate(el, fn){
  if(!el) return;
  el.setAttribute('tabindex','0');
  el.setAttribute('role','button');
  el.onkeydown=e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); fn(); } };
}
$('#modal-mask').onclick=e=>{ if(e.target===$('#modal-mask')) closeModal(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ const mock=$('#mock-mask'); if(mock&&mock.classList.contains('show')){ closeMock(); return; } const pod=$('#pod-mask'); if(pod&&pod.classList.contains('show')){ closePod(); return; } closeModal(); } });

function openLesson(l){
  // 知识点：打开即视为已查看（完成条件之一）
  if(!done.lessonView.includes(l.id)){ done.lessonView.push(l.id); save(); }
  logLearning('lesson-open', l.id);
  const pack=(typeof LESSON_PACKS!=='undefined'&&LESSON_PACKS[l.id])||null;
  const s=lessonStepsDone(l.id);
  const sceneName=pack&&pack.scenes&&pack.scenes[0];
  openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>${l.icon} ${l.title}</h2>
    <p>${l.summary}</p>
    <ul>${l.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    ${pack?`<p><b style="color:var(--txt)">💡 本课要点：</b></p>
    <ul>${pack.takeaways.map(p=>`<li>${p}</li>`).join('')}</ul>
    <p class="lp-est">⏱️ 建议用时 ${pack.est} 分钟</p>`:''}
    <div class="ls-row">
      <span class="ls big ${s.view?'on':''}">${s.view?'✓':'○'} 知识点</span>
      <span class="ls big ${s.ex?'on':''}">${s.ex?'✓':'○'} 课内练习</span>
      <span class="ls big ${s.quiz?'on':''}">${s.quiz?'✓':'○'} 单元测验</span>
    </div>
    <p style="color:var(--cyan)">📖 完整课程内容（含练习与作业）在：</p>
    <div class="file">ielts-75/${l.path}</div>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      ${pack?`<button class="btn small" onclick="openLessonPractice('${l.id}')">✍️ 课内练习</button>`:''}
      <button class="btn small" onclick="closeModal();openUnitQuiz('lesson','${l.id}')">📝 单元测验</button>
      ${sceneName?`<button class="btn small" onclick="closeModal();goPodFromLesson('${l.id}','${sceneName}')">🎮 去演练：${sceneName}</button>`:''}
      <button class="btn ghost small" onclick="closeModal()">知道了，继续闯关</button>
    </div>`);
  checkLessonDone(l.id);
}
/* 课程内跳转演练舱：记录来源课，演练完成后返回课程并更新进度 */
function goPodFromLesson(lid, sceneName){
  logLearning('lesson-to-pod', lid, sceneName);
  openPractice(sceneName, {fromLesson:lid});
}
function backToLessonFromPod(){ const lid=pod.fromLesson; closePod(); const l=LESSONS.find(x=>x.id===lid); if(l) openLesson(l); }
/* 模块任务 → 模块归属 */
function taskModuleOf(taskId){
  const m=MODULES.find(m=>(MODULE_PACKS[m.id]||{tasks:[]}).tasks.some(t=>t.id===taskId));
  return m ? m.id : null;
}
function backToModuleFromPod(){ const mid=taskModuleOf(pod.fromModuleTask); closePod(); const m=MODULES.find(x=>x.id===mid); if(m) openMod(m); }
function openScen(s){
  const related=MODULES.filter(m=>((MODULE_PACKS[m.id]||{linkScenes:[]}).linkScenes||[]).includes(s.name));
  const relHtml = related.length
    ? `<div class="scene-mods"><b style="color:var(--txt)">🛠️ 关联模块：</b>${related.map(m=>`<button class="chip-btn" onclick="closeModal();openMod(MODULES.find(x=>x.id==='${m.id}'))">${m.icon} ${m.title}${(done.mod||[]).includes(m.id)?' ✅':''}</button>`).join('')}</div>`
    : '';
  openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>🏙️ ${s.name} <span class="tag">${s.d}域</span></h2>
    <p>${s.blurb}</p>
    <div class="expr">💬 核心表达：${s.expr}</div>
    <p><b style="color:var(--txt)">练习任务：</b>${s.task}</p>
    <p style="color:var(--cyan)">📂 完整素材（核心表达全量 + 情景对话 + 角色扮演任务）在：</p>
    <div class="file">ielts-75/materials/scenarios/（按域找到「${s.name}」文件夹）</div>
    ${relHtml}
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small" onclick="closeModal();openPractice('${s.name}')">🎮 领取任务，去演练</button>
      <button class="btn ghost small" onclick="closeModal()">查看文档路径</button>
    </div>`);
}
/* ============ 模块任务卡与打卡（批次2 T-2.4 / T-2.5） ============ */
let currentModId=null;
function today(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function modCheckedInToday(m){ return (done.modCheckins||[]).includes(m.id+':'+today()); }
function modCheckinCount(m){ return new Set((done.modCheckins||[]).filter(x=>x.startsWith(m.id+':')).map(x=>x.split(':')[1])).size; }
function syncModuleDone(modId){
  const p=MODULE_PACKS[modId]; if(!p) return;
  if(!done.mod) done.mod=[];
  const all = p.tasks.every(t=>(done.modTasks||[]).includes(t.id));
  if(all && !done.mod.includes(modId)){
    done.mod.push(modId); save();
    logLearning('module-complete', modId);
    awardXP(40,'模块完成');
    toast('🎉 模块完成：'+MODULES.find(x=>x.id===modId).title);
  } else if(!all && done.mod.includes(modId)){
    done.mod=done.mod.filter(x=>x!==modId); save();
  }
}
function toggleModTask(modId, taskId, forceOn){
  if(!done.modTasks) done.modTasks=[];
  const i=done.modTasks.indexOf(taskId);
  if(forceOn===true){ if(i===-1){ done.modTasks.push(taskId); save(); logLearning('module-task', taskId, '场景演练完成'); } }
  else if(i>-1){ done.modTasks.splice(i,1); save(); }
  else { done.modTasks.push(taskId); save(); logLearning('module-task', taskId); awardXP(5,'模块任务'); }
  syncModuleDone(modId);
  openModRefresh();
  renderAll();
}
function openModRefresh(){ if(currentModId){ const m=MODULES.find(x=>x.id===currentModId); if(m) openModal(renderModHtml(m)); } }
function checkinMod(modId){
  const key=modId+':'+today();
  if((done.modCheckins||[]).includes(key)){ toast('今天已经打过卡了'); return; }
  if(!done.modCheckins) done.modCheckins=[];
  done.modCheckins.push(key); save();
  logLearning('module-checkin', modId);
  awardXP(10,'每日打卡');
  toast('✅ 打卡成功！继续保持。');
  openModRefresh();
}
function goPodFromModule(modId, taskId, sceneName){
  currentModId=null;
  closeModal();
  logLearning('module-to-pod', modId, sceneName);
  openPractice(sceneName, {fromModuleTask:taskId});
}
function renderModHtml(m){
  const p=MODULE_PACKS[m.id]||{target:m.blurb,linkScenes:[],tasks:[]};
  const total=p.tasks.length, checked=p.tasks.filter(t=>(done.modTasks||[]).includes(t.id)).length;
  const pct=total?Math.round(checked/total*100):0;
  const inToday=modCheckedInToday(m), days=modCheckinCount(m);
  return `<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>${m.icon} ${m.title} <span class="tag ${m.p.toLowerCase()}">${m.p}</span></h2>
    <p><b style="color:var(--txt)">🎯 模块目标：</b>${p.target}</p>
    <p><b style="color:var(--txt)">包含文件：</b></p>
    <ul>${m.files.split(' / ').map(f=>`<li>${f}</li>`).join('')}</ul>
    <div class="file">ielts-75/${m.path}</div>
    <div class="mod-progress"><div class="card-bar"><div class="card-bar-fill" style="width:${pct}%"></div></div><span>${checked}/${total} 项完成</span></div>
    <div class="task-list">
      ${p.tasks.map(t=>{
        const on=(done.modTasks||[]).includes(t.id);
        const sceneBtn=t.scene?`<button class="task-go" onclick="goPodFromModule('${m.id}','${t.id}','${t.scene}')">去演练 ▸</button>`:'';
        return `<div class="task-item ${on?'on':''}">
          <label class="task-check"><input type="checkbox" ${on?'checked':''} onchange="toggleModTask('${m.id}','${t.id}')"><span>${t.text}</span></label>
          <span class="task-meta">~${t.est} 分钟 ${sceneBtn}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="checkin-row">
      <button class="btn small ${inToday?'done':''}" ${inToday?'disabled':''} onclick="checkinMod('${m.id}')">${inToday?'✅ 今日已打卡':'📅 今日打卡'}</button>
      <span class="checkin-count">已累计打卡 ${days} 天</span>
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small" onclick="closeModal();openUnitQuiz('mod','${m.id}')">✍️ 单元测验</button>
      <button class="btn done small" onclick="closeModal()">进入模块</button>
    </div>`;
}
function openMod(m){
  currentModId=m.id;
  logLearning('module-open', m.id);
  openModal(renderModHtml(m));
}

/* ============ 单元测验（批次3 T-3.2） ============ */
let uq={kind:'lesson', id:null, qIdx:0, score:0, picked:false};
function uqData(){ return uq.kind==='lesson'?QUIZ_LESSONS[uq.id]:QUIZ_MODS[uq.id]; }
function uqTitle(){
  if(uq.kind==='lesson'){ const l=LESSONS.find(x=>x.id===uq.id); return l?l.title:uq.id; }
  const m=MODULES.find(x=>x.id===uq.id); return m?m.title:uq.id;
}
function openUnitQuiz(kind,id){ uq={kind,id,qIdx:0,score:0,picked:false}; openModal(renderUqHtml()); bindUq(); }
function renderUqHtml(){
  const list=uqData();
  if(!list) return '<button class="close" aria-label="关闭" onclick="closeModal()">×</button><p>测验数据缺失</p>';
  if(uq.qIdx>=list.length) return uqResultHtml();
  const q=list[uq.qIdx];
  const optsHtml = q.type==='choice'
    ? q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')
    : `<input id="uqFill" class="uq-fill" placeholder="请输入答案后点下一题" autocomplete="off">`;
  return `<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>✍️ 单元测验 · ${uqTitle()}</h2>
    <div class="quiz-q">
      <div class="stem">第 ${uq.qIdx+1} 题 / 共 ${list.length} 题<br><br>${q.stem}</div>
      ${optsHtml}
      <div class="feedback" id="fb"></div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px">
      <button class="btn ghost small" id="uqNext" ${q.type==='choice'?'disabled':''}>${uq.qIdx<list.length-1?'下一题 →':'查看成绩'}</button>
      <button class="btn ghost small" onclick="closeModal()">关闭</button>
    </div>`;
}
function bindUq(){
  const list=uqData(); if(!list||uq.qIdx>=list.length) return;
  const q=list[uq.qIdx];
  if(q.type==='choice'){
    $('#modalBox').querySelectorAll('.opt').forEach(b=>b.onclick=()=>uqPick(b.dataset.i,q));
  }
  const nb=$('#uqNext'); if(nb) nb.onclick=uqNext;
}
function uqPick(i,q){
  if(uq.picked) return; uq.picked=true;
  let correct=false;
  if(q.type==='choice'){
    if(i===q.right){ correct=true; uq.score++; }
    $('#modalBox').querySelectorAll('.opt').forEach((o,k)=>o.classList.toggle('right',k===q.right));
    if(i!==q.right){ const all=$('#modalBox').querySelectorAll('.opt'); if(all[i]) all[i].classList.add('wrong'); }
  } else {
    const val=($('#uqFill').value||'').trim();
    if(val && val.includes(q.answer)){ correct=true; uq.score++; }
  }
  const fb=$('#fb');
  fb.textContent=(correct?'✅ 回答正确。':(q.type==='choice'?'❌ 正确答案：'+q.opts[q.right]:'❌ 参考答案：'+q.answer))+' 💡 '+q.explain;
  fb.classList.add('show');
  const nb=$('#uqNext'); if(nb) nb.disabled=false;
}
function uqNext(){
  const list=uqData();
  if(!list) return;
  const q=list[uq.qIdx];
  if(q.type==='fill' && !uq.picked){ uqPick(null,q); }
  uq.qIdx++;
  if(uq.qIdx>=list.length){
    if(!done.quiz) done.quiz=[];
    const key=uq.kind+':'+uq.id;
    if(!done.quiz.includes(key)){ done.quiz.push(key); save(); }
    const pass=uq.score>=Math.ceil(list.length*0.6);
    if(pass){ if(!done.quizPass) done.quizPass=[]; const fresh=!done.quizPass.includes(key); if(fresh){ done.quizPass.push(key); save(); } logLearning('quiz-pass',key); if(fresh) awardXP(20,'单元测验通过'); }
    else { addError({type:'quiz', id:key, detail:'单元测验未通过（'+uq.score+'/'+list.length+'）'}); }
    if(uq.kind==='lesson') checkLessonDone(uq.id);
    openModal(renderUqHtml()); return;
  }
  uq.picked=false;
  openModal(renderUqHtml()); bindUq();
}
function uqResultHtml(){
  const list=uqData();
  const pct=Math.round(uq.score/list.length*100);
  const pass=uq.score>=Math.ceil(list.length*0.6);
  return `<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <div class="profile-card">
      <h3>📊 单元测验成绩</h3>
      <div class="result-line">答对 ${uq.score} / ${list.length} 题（${pct}%）</div>
      <div class="result-line" style="color:${pass?'var(--green)':'var(--amber)'}">${pass?'✅ 通过，掌握良好':'🔧 建议回看对应课程/模块后重测'}</div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px">
      <button class="btn" onclick="closeModal()">完成</button>
      <button class="btn ghost" onclick="uqRetry()">再测一次 🔁</button>
    </div>`;
}
function uqRetry(){ uq.qIdx=0; uq.score=0; uq.picked=false; openModal(renderUqHtml()); bindUq(); }

/* ============ 课内练习（批次2 T-2.2） ============ */
let lpx={id:null, idx:0, score:0, picked:false};
function lpxData(){ return (typeof LESSON_PACKS!=='undefined' && (LESSON_PACKS[lpx.id]||{}).practice) || []; }
function openLessonPractice(id){ lpx={id, idx:0, score:0, picked:false}; openModal(renderLpxHtml()); bindLpx(); }
function renderLpxHtml(){
  const list=lpxData();
  if(!list.length) return '<button class="close" aria-label="关闭" onclick="closeModal()">×</button><p>本课暂无课内练习</p>';
  if(lpx.idx>=list.length) return renderLpxResult(list);
  const q=list[lpx.idx];
  const optsHtml = q.type==='choice'
    ? q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')
    : `<input id="lpxFill" class="uq-fill" placeholder="请输入答案后点下一题" autocomplete="off">`;
  return `<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <h2>✍️ 课内练习 · 第 ${lessonIndex(lpx.id)+1} 课</h2>
    <div class="quiz-q">
      <div class="stem">第 ${lpx.idx+1} 题 / 共 ${list.length} 题<br><br>${q.stem}</div>
      ${optsHtml}
      <div class="feedback" id="lpxFb"></div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px">
      <button class="btn ghost small" id="lpxNext" ${q.type==='choice'?'disabled':''}>${lpx.idx<list.length-1?'下一题 →':'查看结果'}</button>
      <button class="btn ghost small" onclick="closeModal()">关闭</button>
    </div>`;
}
function bindLpx(){
  const list=lpxData(); if(!list.length||lpx.idx>=list.length) return;
  const q=list[lpx.idx];
  if(q.type==='choice'){
    $('#modalBox').querySelectorAll('.opt').forEach(b=>b.onclick=()=>lpxPick(+b.dataset.i,q));
  }
  const nb=$('#lpxNext'); if(nb) nb.onclick=lpxNext;
}
function lpxPick(i,q){
  if(lpx.picked) return; lpx.picked=true;
  let correct=false;
  if(q.type==='choice'){
    if(i===q.right){ correct=true; lpx.score++; }
    $('#modalBox').querySelectorAll('.opt').forEach((o,k)=>o.classList.toggle('right',k===q.right));
    if(i!==q.right){ const all=$('#modalBox').querySelectorAll('.opt'); if(all[i]) all[i].classList.add('wrong'); }
  } else {
    const val=($('#lpxFill').value||'').trim();
    if(val && val.includes(q.answer)){ correct=true; lpx.score++; }
  }
  const fb=$('#lpxFb');
  fb.textContent=(correct?'✅ 回答正确。':(q.type==='choice'?'❌ 正确答案：'+q.opts[q.right]:'❌ 参考答案：'+q.answer))+' 💡 '+q.explain;
  fb.classList.add('show');
  const nb=$('#lpxNext'); if(nb) nb.disabled=false;
}
function lpxNext(){
  const list=lpxData(); if(!list.length) return;
  const q=list[list.length?Math.min(lpx.idx,list.length-1):0];
  if(q.type==='fill' && !lpx.picked){ lpxPick(null,q); }
  lpx.idx++;
  if(lpx.idx>=list.length){
    if(!done.lessonEx.includes(lpx.id)){ done.lessonEx.push(lpx.id); save(); }
    logLearning('lesson-practice', lpx.id, lpx.score+'/'+list.length);
    awardXP(15,'课内练习');
    checkLessonDone(lpx.id);
    openModal(renderLpxHtml()); return;
  }
  lpx.picked=false;
  openModal(renderLpxHtml()); bindLpx();
}
function renderLpxResult(list){
  const pack=LESSON_PACKS[lpx.id];
  const scene=pack&&pack.scenes&&pack.scenes[0];
  const pct=Math.round(lpx.score/list.length*100);
  return `<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
    <div class="profile-card">
      <h3>✍️ 课内练习完成</h3>
      <div class="result-line">答对 ${lpx.score} / ${list.length} 题（${pct}%）</div>
      <div class="result-line" style="color:var(--green)">✅ 已记入本课进度</div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn" onclick="closeModal();openLesson(LESSONS[${lessonIndex(lpx.id)}])">返回本课</button>
      <button class="btn ghost" onclick="closeModal();openUnitQuiz('lesson','${lpx.id}')">📝 去单元测验</button>
      ${scene?`<button class="btn ghost" onclick="closeModal();goPodFromLesson('${lpx.id}','${scene}')">🎮 去演练：${scene}</button>`:''}
    </div>`;
}

/* ============ 模考冲刺（批次3 T-3.3） ============ */
let mock={part:'intro', mode:'speak', speakIdx:0, listenIdx:0, speakScore:0, listenScore:0, speakResults:{}, listenResults:{}, recOn:false, recUrl:null};
let mockRecStream=null, mockRecChunks=[], mockRecSrc=null;
function mockSpeakQ(){ return MOCK_EXAM.speaking[mock.speakIdx]; }
function mockListenQ(){ return MOCK_EXAM.listening[mock.listenIdx]; }
function mockMax(){ return MOCK_EXAM.speaking.length+MOCK_EXAM.listening.length; }
function openMock(){
  mock={part:'intro',mode:'speak',speakIdx:0,listenIdx:0,speakScore:0,listenScore:0,speakResults:{},listenResults:{},recOn:false,recUrl:null};
  $('#mock-mask').classList.add('show'); $('#mock').scrollTop=0; renderMock();
}
function closeMock(){ if(mock.recOn) mockStopRec(); $('#mock-mask').classList.remove('show'); }
function mockGo(mode){
  mock.mode=mode;
  if(mode==='speak'){ mock.part='speak'; mock.speakIdx=0; }
  else if(mode==='listen'){ mock.part='listen'; mock.listenIdx=0; }
  else { mock.part='speak'; mock.speakIdx=0; mock.listenIdx=0; }
  renderMock();
}
function renderMock(){
  const el=$('#mock');
  if(mock.part==='intro'){
    el.innerHTML=`<div class="pod-head"><h2>⏱️ 模考冲刺</h2><button class="btn ghost small" onclick="closeMock()">退出</button></div>
      <div class="scene-brief"><b>模考说明：</b>完整模拟雅思口语（Part1–3）与听力（Section 1–4）。口语先录音（可回放），再输入你的回答，系统按<b>关键词/语料匹配</b>自动评分；听力选择答案即时判分。</div>
      <div class="mock-parts">
        <button class="mock-part" onclick="mockGo('speak')">🗣️ 口语模考（${MOCK_EXAM.speaking.length} 题）</button>
        <button class="mock-part" onclick="mockGo('listen')">🎧 听力模考（${MOCK_EXAM.listening.length} 题）</button>
        <button class="mock-part ghost" onclick="mockGo('full')">🧪 完整模考（口语 + 听力）</button>
      </div>
      <div class="mock-progress">口语 ${mock.speakScore}/${MOCK_EXAM.speaking.length} · 听力 ${mock.listenScore}/${MOCK_EXAM.listening.length}</div>`;
    return;
  }
  if(mock.part==='speak'){ renderMockSpeak(el); return; }
  if(mock.part==='listen'){ renderMockListen(el); return; }
  renderMockDone(el);
}
function renderMockSpeak(el){
  const q=mockSpeakQ();
  el.innerHTML=`<div class="pod-head"><h2>🗣️ 口语模考 · ${q.part}</h2><button class="btn ghost small" onclick="closeMock()">退出</button></div>
    <div class="mock-progress">口语 ${mock.speakIdx+1} / ${MOCK_EXAM.speaking.length} · 已得分 ${mock.speakScore}</div>
    <div class="mock-q">
      <div class="stem">${q.q}</div>
      <div class="mock-ref"><b>参考回答：</b>${q.ref}<br><b>关键词（评分依据）：</b>${q.keywords.join('、')}</div>
      <textarea id="mockAns" class="uq-fill" rows="3" placeholder="输入你的回答，系统将按关键词匹配评分"></textarea>
      <div class="turn-bar"><button class="rec-btn" id="recBtn"><span class="dot"></span><span id="recTxt">录音</span></button>${mock.recUrl?'<audio controls style="height:32px"></audio>':''}</div>
      <div class="feedback" id="fb"></div>
    </div>
    <div class="pod-actions"><button class="btn" id="btnScore" disabled>评分</button>
      <button class="btn ghost small" onclick="closeMock()">退出</button></div>`;
  $('#recBtn').onclick=mockToggleRec;
  $('#btnScore').onclick=mockScoreSpeak;
}
function renderMockListen(el){
  const q=mockListenQ();
  el.innerHTML=`<div class="pod-head"><h2>🎧 听力模考 · ${q.section}</h2><button class="btn ghost small" onclick="closeMock()">退出</button></div>
    <div class="mock-progress">听力 ${mock.listenIdx+1} / ${MOCK_EXAM.listening.length} · 已得分 ${mock.listenScore}</div>
    <div class="mock-q">
      <div class="stem">${q.q}</div>
      ${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')}
      <div class="feedback" id="fb"></div>
    </div>
    <div class="pod-actions"><button class="btn ghost small" id="btnLNext" disabled>${mock.listenIdx<MOCK_EXAM.listening.length-1?'下一题 →':'查看成绩'}</button>
      <button class="btn ghost small" onclick="closeMock()">退出</button></div>`;
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>mockListenPick(b.dataset.i,q));
  $('#btnLNext').onclick=mockListenNext;
}
function mockScoreSpeak(){
  const q=mockSpeakQ();
  const val=($('#mockAns').value||'').trim();
  if(!val){ toast('请先输入你的回答再评分'); return; }
  const matched=q.keywords.filter(k=>val.toLowerCase().includes(k.toLowerCase()));
  const ratio=matched.length/q.keywords.length;
  const pts=ratio>=0.8?2:ratio>=0.5?1:0;
  mock.speakScore+=pts;
  mock.speakResults[mock.speakIdx]={matched,ratio,pts};
  if(ratio<0.5){ addError({type:'mock', id:'speak:'+q.part, detail:q.q}); }
  $('#fb').innerHTML=`🎯 关键词命中 ${matched.length}/${q.keywords.length}（${Math.round(ratio*100)}%）· 得分 ${pts}/2<br><span style="color:var(--dim)">命中：${matched.join('、')||'无'}</span>`;
  $('#fb').classList.add('show');
  const btn=$('#btnScore'); btn.disabled=false; btn.textContent='下一题 →'; btn.onclick=mockSpeakNext;
}
function mockSpeakNext(){
  mock.speakIdx++;
  if(mock.speakIdx>=MOCK_EXAM.speaking.length){
    mock.part = mock.mode==='full' ? 'listen' : 'done';
  }
  renderMock();
}
function mockListenPick(i,q){
  if(mock.listenResults[mock.listenIdx]!==undefined) return;
  mock.listenResults[mock.listenIdx]={pick:i,correct:i===q.right};
  if(i===q.right) mock.listenScore++;
  else addError({type:'mock', id:'listen:'+q.section, detail:q.q});
  const all=$('#mock').querySelectorAll('.opt');
  all.forEach((o,k)=>o.classList.toggle('right',k===q.right));
  if(i!==q.right && all[i]) all[i].classList.add('wrong');
  $('#fb').textContent=(i===q.right?'✅ 正确。':'❌ 正确答案：'+q.opts[q.right])+' 💡 '+q.explain;
  $('#fb').classList.add('show');
  $('#btnLNext').disabled=false;
}
function mockListenNext(){ mock.listenIdx++; if(mock.listenIdx>=MOCK_EXAM.listening.length) mock.part='done'; renderMock(); }
function renderMockDone(el){
  const total=mock.speakScore+mock.listenScore;
  const max=mockMax();
  const pct=Math.round(total/max*100);
  el.innerHTML=`<div class="pod-head"><h2>🏁 模考成绩</h2><button class="btn ghost small" onclick="closeMock()">退出</button></div>
    <div class="profile-card"><h3>📊 模考完成 — 总分 ${total} / ${max}（${pct}%）</h3>
      <div class="diag-rows">
        <div class="diag-row"><span class="dr-ic">🗣️ 口语</span><div class="dr-bar"><i style="width:${Math.round(mock.speakScore/MOCK_EXAM.speaking.length*100)}%"></i></div><span class="dr-sc">${mock.speakScore}/${MOCK_EXAM.speaking.length}</span></div>
        <div class="diag-row"><span class="dr-ic">🎧 听力</span><div class="dr-bar"><i style="width:${Math.round(mock.listenScore/MOCK_EXAM.listening.length*100)}%"></i></div><span class="dr-sc">${mock.listenScore}/${MOCK_EXAM.listening.length}</span></div>
      </div>
      <div class="result-line">口语按关键词匹配评分，听力按选项判分。薄弱项可在诊断路线中针对性回练。</div>
    </div>
    <div class="pod-actions"><button class="btn" onclick="closeMock()">返回</button>
      <button class="btn ghost" onclick="openMock()">再考一次 🔁</button></div>`;
  if(!done.mock){ done.mock=true; }
  if((done.mockBest||0) < total) done.mockBest = total;
  save();
  awardXP(80,'模考完成');
  renderAll();
}
/* 录音：兼容 iOS/Android——探测可用 mimeType（iOS Safari 偏好 audio/mp4） */
function pickAudioMime(){
  if(typeof MediaRecorder==='undefined' || !MediaRecorder.isTypeSupported) return '';
  const types=['audio/webm','audio/mp4','audio/aac','audio/ogg'];
  for(const t of types){ try{ if(MediaRecorder.isTypeSupported(t)) return t; }catch(e){} }
  return '';
}
async function mockToggleRec(){
  if(mock.recOn){ mockStopRec(); return; }
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const mime=pickAudioMime();
    mockRecStream=mime ? new MediaRecorder(stream,{mimeType:mime}) : new MediaRecorder(stream);
    mockRecChunks=[];
    mockRecStream.ondataavailable=e=>{ if(e.data.size) mockRecChunks.push(e.data); };
    mockRecStream.onstop=()=>{
      const blob=new Blob(mockRecChunks,{type:mockRecStream.mimeType||mime||'audio/mp4'});
      mock.recUrl=URL.createObjectURL(blob);
      mock.recOn=false; renderMock();
    };
    mockRecStream.start(); mock.recOn=true; mockRecSrc=stream;
    $('#recTxt').textContent='停止录音';
  }catch(e){ toast('当前环境不支持录音，可仅用文字输入评分'); }
}
function mockStopRec(){
  if(mockRecStream && mockRecStream.state!=='inactive'){ mockRecStream.stop(); }
  if(mockRecSrc){ mockRecSrc.getTracks().forEach(t=>t.stop()); mockRecSrc=null; }
  mock.recOn=false;
}
$('#btnMock').onclick=openMock;
$('#btnJourney').onclick=openJourney;
$('#btnExport').onclick=openExport;

$('#btnGuide').onclick=()=>openModal(`<button class="close" aria-label="关闭" onclick="closeModal()">×</button>
  <h2>📘 项目全景与使用顺序</h2>
  <p>整个项目是一条闭环，入口与顺序如下：</p>
  <ul>
    <li><b>方法论（11 课）</b>：先学"怎么练"，从诊断课入门；</li>
    <li><b>素材库（16 话题 + 30 场景）</b>：解决"练什么、说什么"；</li>
    <li><b>专项模块（12 个）</b>：按短板选模块补强，P0 优先；</li>
    <li><b>参考卡（52 张）</b>：学有余力的可选深读，不替代主线；</li>
    <li><b>验证（模考 + 退出标准）</b>：用分数验证，达标即晋级。</li>
  </ul>
  <p><b style="color:var(--txt)">推荐起步路径：</b></p>
  <ul>
    <li>备考学习者：诊断 → 第 2、3、4、5、9 课 → 场景库 → 模块 01/02 → 模考；</li>
    <li>企业推广：推广方案 → 每日任务卡 → 场景角色卡 → 模考执行单 → 主管反馈模板；</li>
    <li>学有余力：参考卡三层资源（必看 → 推荐 → 挑战）。</li>
  </ul>
  <p style="color:var(--dim);font-size:13px">关键文档位置：plan.md（8 周规划与退出标准）、employee-rollout-plan.md（推广方案）、rollout-materials/（配套练习材料）。</p>
  <div style="margin-top:16px"><button class="btn done small" onclick="closeModal()">路径已清楚</button></div>`);

/* ============ 诊断小游戏（四科诊断，批次3 T-3.1） ============ */
const DIAG_PLAN = {
  speaking:{label:'口语', lesson:'l3', weak:['m02','m01']},
  listening:{label:'听力', lesson:'l6', weak:['m06','m12']},
  reading:{label:'阅读', lesson:'l7', weak:['m03']},
  writing:{label:'写作', lesson:'l1', weak:['m05','m04']},
};
let diag={subjectIdx:0, qIdx:0, scores:{}, picked:{}, finished:false};
function diagSubject(){ return DIAG_SUBJECTS[diag.subjectIdx]; }
function diagNextLabel(){
  const sub=diagSubject();
  if(diag.qIdx<sub.questions.length-1) return '下一题 →';
  if(diag.subjectIdx<DIAG_SUBJECTS.length-1) return '下一科 →';
  return '查看诊断结果 →';
}
function renderDiag(){
  const area=$('#quizArea');
  area.classList.remove('hidden');
  if(diag.finished){ renderDiagResult(area); return; }
  const sub=diagSubject();
  const q=sub.questions[diag.qIdx];
  area.innerHTML=`
    <div class="diag-sub-tabs">${DIAG_SUBJECTS.map((s,i)=>{
      const sc=diag.scores[s.id]||0;
      const doneFlag = (diag.scores[s.id]!==undefined) && i<diag.subjectIdx;
      return `<span class="ds-tab ${i===diag.subjectIdx?'on':''} ${doneFlag?'done':''}">${s.icon} ${s.name}<b>${sc}/3</b></span>`;
    }).join('')}</div>
    <div class="quiz-q">
      <div class="stem">${sub.icon} ${sub.name} · 第 ${diag.qIdx+1} 题 / 共 ${sub.questions.length} 题<br><br>${q.stem}</div>
      ${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')}
      <div class="feedback" id="fb"></div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px">
      <button class="btn ghost small" id="btnNext" disabled>${diagNextLabel()}</button>
      <button class="btn ghost small" id="btnRestart">重新开始</button>
    </div>`;
  area.querySelectorAll('.opt').forEach(b=>b.onclick=()=>diagPick(b.dataset.i,q));
  $('#btnNext').onclick=diagNext;
  $('#btnRestart').onclick=diagRestart;
}
function diagPick(i,q){
  const key=diag.subjectIdx+'-'+diag.qIdx;
  if(diag.picked[key]) return;
  diag.picked[key]=true;
  const sid=diagSubject().id;
  if(i===q.right) diag.scores[sid]=(diag.scores[sid]||0)+1;
  const opts=document.querySelectorAll('.opt');
  opts.forEach((o,k)=>o.classList.toggle('right',k===q.right));
  if(i!==q.right) opts[i].classList.add('wrong');
  $('#btnNext').disabled=false;
  $('#fb').textContent='💡 '+q.explain;
  $('#fb').classList.add('show');
}
function diagNext(){
  diag.qIdx++;
  if(diag.qIdx>=diagSubject().questions.length){ diag.subjectIdx++; diag.qIdx=0; }
  if(diag.subjectIdx>=DIAG_SUBJECTS.length){
    diag.finished=true;
    if(!done.diag){ done.diag=['diag4']; save(); }
    renderDiag(); renderAll();
    return;
  }
  diag.picked={};
  renderDiag();
}
function diagRestart(){ diag={subjectIdx:0,qIdx:0,scores:{},picked:{},finished:false}; renderDiag(); }
function renderDiagResult(area){
  const rows=DIAG_SUBJECTS.map(s=>{
    const sc=diag.scores[s.id]||0;
    const pct=Math.round(sc/3*100);
    return `<div class="diag-row"><span class="dr-ic">${s.icon} ${s.name}</span>
      <div class="dr-bar"><i style="width:${pct}%"></i></div><span class="dr-sc">${sc}/3</span></div>`;
  }).join('');
  const ranked=DIAG_SUBJECTS.map(s=>({s,sc:diag.scores[s.id]||0})).sort((a,b)=>a.sc-b.sc);
  const route=ranked.map(({s,sc})=>{
    const plan=DIAG_PLAN[s.id];
    const items=[];
    if(sc<=1){ plan.weak.forEach(id=>{ const m=MODULES.find(x=>x.id===id); if(m) items.push('模块 '+m.title); }); }
    const lg=LESSONS.find(x=>x.id===plan.lesson);
    if(lg) items.push('课程 '+lg.title);
    return `<li><b>${s.icon} ${s.name}</b>（${sc}/3）：${items.join(' → ')}</li>`;
  }).join('');
  area.innerHTML=`<div class="profile-card">
    <h3>🎯 四科诊断完成 — 你的个性化路线（弱项优先）</h3>
    <div class="diag-rows">${rows}</div>
    <div class="result-line">已按掌握度从弱到强排序，建议按顺序推进</div>
    <ul style="color:var(--txt);margin-top:10px">${route}</ul>
  </div>
  <div style="margin-top:14px;display:flex;gap:12px">
    <button class="btn" id="btnGoPath">沿着推荐路径出发 🚀</button>
    <button class="btn ghost small" id="btnReDiag">重新诊断</button>
  </div>`;
  $('#btnGoPath').onclick=()=>{
    document.querySelector('#secLessons').scrollIntoView({behavior:'smooth'});
    toast('课程路径已展开，从推荐起点开始');
  };
  $('#btnReDiag').onclick=diagRestart;
}
$('#btnStart').onclick=()=>{
  document.querySelector('#secDiag').scrollIntoView({behavior:'smooth'});
  diag={subjectIdx:0,qIdx:0,scores:{},picked:{},finished:false};
  renderDiag();
  toast('四科诊断开始！口语/听力/阅读/写作，定位你的起步路线');
};

/* ============ 场景演练舱 ============ */
let pod = {name:null, step:0, exIdx:0, lineIdx:0, varSel:0, tab:'words', showRef:false, checks:{}, ratings:{word:3,fluency:3,grammar:3,pron:3}, feedback:null, recOn:false, recUrl:null, fromLesson:null, fromModuleTask:null};
let recStream=null, recMedia=null, recChunks=[];

function openPractice(name, opts){
  const p=PRACTICE[name];
  if(!p){ toast('该场景的演练数据缺失'); return; }
  opts=opts||{};
  pod={name,step:0,exIdx:0,lineIdx:0,varSel:0,tab:'words',showRef:false,checks:{},ratings:{word:3,fluency:3,grammar:3,pron:3},feedback:null,recOn:false,recUrl:null,fromLesson:opts.fromLesson||null,fromModuleTask:opts.fromModuleTask||null};
  $('#pod-mask').classList.add('show');
  renderPod();
  $('#pod-mask').scrollTop=0;
}
function closePod(){
  if(pod.recOn) stopRec();
  $('#pod-mask').classList.remove('show');
}
function podSteps(){ return ['任务简报','素材与对话','自检打勾','练习反馈','完成解锁']; }
function podTurns(){
  const turns=[];
  (PRACTICE[pod.name].dialogs||[]).forEach(dl=>{
    dl.lines.forEach(l=>{ turns.push({who:l.who,q:l.q,zh:l.zh,vars:l.vars||[],title:dl.title}); });
  });
  return turns;
}
function renderPod(){
  const p=PRACTICE[pod.name];
  const steps=podSteps().map((s,i)=>`<div class="step ${i<pod.step?'done':i===pod.step?'on':''}"><b>${['①','②','③','④','⑤'][i]}</b>${s}</div>`).join('');
  let body='';
  if(pod.step===0){
    body=`<div class="scene-brief">
      <b>场景任务：</b>${SCENARIOS.find(s=>s.name===pod.name).blurb}<br>
      <b>演练方式：</b>回合制对话演练。搭档先开口，你先自己尝试回应，再点开参考回答对照，可点击“其他说法”切换表达，最后朗读/录音。
    </div>
    <div class="roles">
      <div class="role"><h4>🎤 你的角色</h4><p>${p.roleA}</p></div>
      <div class="role"><h4>🤝 搭档角色</h4><p>${p.roleB}（可让朋友配音，或自问自答）</p></div>
    </div>
    <div class="pod-tabs">
      <button class="pod-tab ${pod.tab==='words'?'on':''}" onclick="podTab('words')">📘 高频词</button>
      <button class="pod-tab ${pod.tab==='phrases'?'on':''}" onclick="podTab('phrases')">💬 基础句型</button>
      <button class="pod-tab ${pod.tab==='adv'?'on':''}" onclick="podTab('adv')">🌟 进阶表达</button>
      <button class="pod-tab ${pod.tab==='tips'?'on':''}" onclick="podTab('tips')">⚠️ 易错提醒</button>
    </div>
    <div class="pod-material">
      ${pod.tab==='words' ? `<div class="word-grid">${p.words.map(w=>`<div class="word-card"><b>${w}</b><span>点击跟读</span></div>`).join('')}</div>` : ''}
      ${pod.tab==='phrases' ? `<div class="phrase-list">${p.phrases.map(ph=>`<div class="phrase-card"><b>${ph[0]}</b><span>${ph[1]}</span></div>`).join('')}</div>` : ''}
      ${pod.tab==='adv' ? `<div class="phrase-list">${p.adv.map(ph=>`<div class="phrase-card adv"><b>${ph[0]}</b><span>${ph[1]}</span></div>`).join('')}</div>` : ''}
      ${pod.tab==='tips' ? `<div class="tip-list">${p.tips.map(t=>`<div class="tip-card">⚠️ ${t}</div>`).join('')}</div>` : ''}
    </div>
    <div class="pod-actions"><button class="btn" id="btnStartEx">开始演练 🎮</button>
    <button class="btn ghost small" onclick="closePod()">返回场景城</button></div>`;
  } else if(pod.step===1){
    const turns=podTurns();
    if(pod.lineIdx>=turns.length){
      body=`<div class="success"><div class="em">🎬</div><h3>对话演练完成！</h3>
        <p>两段对话已过完。核对一下你的自检清单，然后解锁这个场景。</p></div>
      <div class="pod-actions"><button class="btn" onclick="goCheck()">进入自检 ③</button></div>`;
    } else {
      const cur=turns[pod.lineIdx];
      const text=pod.varSel===0?cur.q:(cur.vars[pod.varSel-1]||cur.q);
      const isB=cur.who==='B';
      const chips=`<div class="var-row">
        <button class="var-chip ${pod.varSel===0?'on':''}" onclick="pickVar(0)">${cur.q}</button>
        ${cur.vars.map((v,i)=>`<button class="var-chip ${pod.varSel===i+1?'on':''}" onclick="pickVar(${i+1})">${v}</button>`).join('')}
      </div>`;
      body=`<div class="dlg-title">${cur.title}</div>
      <div class="turn-box">
        ${isB
          ? `<div class="bubble partner">🤝 搭档：${text}<span class="zh">${cur.zh}</span>${chips}</div>`
          : `<div class="bubble me ${pod.showRef?'':'hidden'}">🎤 你的参考回答：${text}<span class="zh">${cur.zh}</span>${pod.showRef?chips:''}</div>`}
      </div>
      <div class="turn-bar">
        <span class="turn-count">第 ${pod.lineIdx+1} / ${turns.length} 句</span>
        <div style="display:flex;gap:10px">
          <button class="rec-btn" id="recBtn"><span class="dot"></span><span id="recTxt">录音跟读</span></button>
          ${pod.audioEl?'<audio controls style="height:32px"></audio>':''}
        </div>
      </div>
      <div class="pod-actions">
        ${isB
          ? `<button class="btn ghost" onclick="advance()">我练完了，看参考回答</button>`
          : (pod.showRef
            ? `<button class="btn" onclick="advance()">下一回合 →</button>`
            : `<button class="btn ghost" onclick="showRef()">我练完了，看参考回答</button>`)}
        <button class="btn ghost small" onclick="closePod()">退出演练</button>
      </div>`;
    }
  } else if(pod.step===2){
    body=`<div class="turn-box" style="min-height:80px">
      ${p.checks.map((c,i)=>`<label class="check ${pod.checks[i]?'on':''}"><input type="checkbox" data-i="${i}" ${pod.checks[i]?'checked':''} onchange="toggleCheck(${i})"> ${c}</label>`).join('')}
    </div>
    <div class="pod-actions"><button class="btn" id="btnFinishCheck">完成自检，解锁场景 🏆</button>
    <button class="btn ghost small" onclick="backDialog()">回到对话演练</button></div>`;
  } else if(pod.step===3){
    body=renderPodFeedback();
  } else {
    const s=SCENARIOS.find(x=>x.name===pod.name);
    const fromL=pod.fromLesson, fromM=pod.fromModuleTask;
    const backBtn = fromL
      ? `<button class="btn" onclick="backToLessonFromPod()">📚 返回第 ${lessonIndex(fromL)+1} 课</button>`
      : fromM
        ? `<button class="btn" onclick="backToModuleFromPod()">🛠️ 返回对应模块</button>`
        : `<button class="btn" onclick="closePod()">返回场景城</button>`;
    body=`<div class="success"><div class="em">🏅</div><h3>场景演练完成！</h3>
      <p><b>${pod.name}</b> 已解锁。<br>完整素材与对话变体已在演练舱内完成，并已生成专属反馈。</p>
      <p style="margin-top:10px;font-size:13px">💡 练习建议：${s.task}</p></div>
      <div class="pod-actions">${backBtn}
      <button class="btn ghost" onclick="retry()">再练一次 🔁</button></div>`;
  }
  $('#pod').innerHTML=`<div class="pod-head"><h2>🎮 演练舱 · ${pod.name}</h2>
    <button class="btn ghost small" onclick="closePod()">退出</button></div>
    <div class="steps">${steps}</div>${body}`;
  if(pod.step===1&&pod.lineIdx<podTurns().length){
    $('#recBtn').onclick=toggleRec;
  }
  if(pod.step===2){
    $('#btnFinishCheck').onclick=finishCheck;
  }
  if(pod.step===3){
    bindPodFeedback();
  }
  if(pod.step===0){
    $('#btnStartEx').onclick=()=>{ pod.step=1; renderPod(); };
  }
}
function podTab(t){ pod.tab=t; renderPod(); }
function pickVar(i){ pod.varSel=i; renderPod(); }
function showRef(){ pod.showRef=true; renderPod(); }
function advance(){ pod.lineIdx++; pod.showRef=false; pod.varSel=0; renderPod(); }
function nextTurn(){ advance(); }
function goCheck(){ pod.step=2; renderPod(); }
function backDialog(){ pod.step=1; renderPod(); }
function toggleCheck(i){ pod.checks[i]=!pod.checks[i]; renderPod(); }
function finishCheck(){
  const p=PRACTICE[pod.name];
  const missing=p.checks.filter((c,i)=>!pod.checks[i]);
  if(missing.length>0){ toast(`还有 ${missing.length} 项自检未勾选，再核对一下`); return; }
  pod.step=3; pod.feedback=null;
  renderPod();
  toast('📝 自检完成，来生成你的专属练习反馈');
}
function retry(){ pod.step=0; pod.exIdx=0; pod.lineIdx=0; pod.varSel=0; pod.tab='words'; pod.showRef=false; pod.checks={}; pod.ratings={word:3,fluency:3,grammar:3,pron:3}; pod.feedback=null; renderPod(); }

/* ============ 练习反馈（批次3 T-3.4） ============ */
const FB_DIMS=[['word','用词','🔤'],['fluency','流畅度','⚡'],['grammar','语法','🧱'],['pron','发音','🗣️']];
function renderPodFeedback(){
  if(!pod.feedback){
    return `<div class="fb-title">📝 练习反馈</div>
      <p style="color:var(--dim);font-size:13px">先为刚才的演练自评打分（1–5 分），系统将结合本场景的词句素材与自检结果，生成具体、可操作的反馈。</p>
      <div class="fb-rate">
        ${FB_DIMS.map(d=>`<div class="fb-dim"><span>${d[2]} ${d[1]}</span>
          ${[1,2,3,4,5].map(n=>`<button class="rate-dot ${pod.ratings[d[0]]===n?'on':''}" data-dim="${d[0]}" data-n="${n}">${n}</button>`).join('')}
        </div>`).join('')}
      </div>
      <div class="pod-actions"><button class="btn" id="btnGenFb">生成我的专属反馈 🎯</button>
      <button class="btn ghost small" onclick="backCheck()">回到自检</button></div>`;
  }
  return `<div class="fb-title">📝 练习反馈</div>
    <div class="fb-report">${pod.feedback}</div>
    <div class="pod-actions"><button class="btn" id="btnFbDone">完成，解锁场景 🏆</button>
    <button class="btn ghost small" onclick="reRate()">重新自评</button></div>`;
}
function bindPodFeedback(){
  if(!pod.feedback){
    document.querySelectorAll('#pod .rate-dot').forEach(b=>b.onclick=()=>setRating(b.dataset.dim,+b.dataset.n));
    const g=$('#btnGenFb'); if(g) g.onclick=genFeedbackFb;
  } else {
    const d=$('#btnFbDone'); if(d) d.onclick=fbDone;
  }
}
function setRating(dim,n){ pod.ratings[dim]=n; renderPod(); }
function reRate(){ pod.feedback=null; renderPod(); }
function backCheck(){ pod.step=2; renderPod(); }
function genFeedbackFb(){
  pod.feedback=genFeedback(pod.name, pod.ratings||{word:3,fluency:3,grammar:3,pron:3}, pod.checks);
  renderPod();
}
function genFeedback(name, ratings, checks){
  const p=PRACTICE[name];
  const L=[];
  const useWords=p.words.slice(0,3).join('、');
  const adv=p.adv[0];
  L.push(`<b>🔤 用词（${ratings.word} 分）：</b>本场景建议主动使用高频词 <b>${useWords}</b>。想升级表达，可把基础句型换成进阶说法，如「${adv[0]}」（${adv[1]}）。`);
  const t0=p.tips[0];
  L.push(`<b>⚡ 流畅度（${ratings.fluency} 分）：</b>记住本场景要点「${t0}」。${ratings.fluency<=2?'当前需重点减少卡顿与填充词，宁可完整说对一个简单句，也不中途打断重来。':'已较流畅，可用限时反应训练巩固，减少无意识的自我纠正。'}`);
  const ph=p.phrases[0];
  L.push(`<b>🧱 语法（${ratings.grammar} 分）：</b>参考句型「${ph[0]}」（${ph[1]}），注意结构完整。${ratings.grammar<=2?'建议先保证高频结构准确，再追求复杂与多样性，避免为复杂而出错。':'结构较稳，可适当增加从句与连接词，提升语法多样性。'}`);
  const ph2=p.phrases[1]||p.phrases[0];
  L.push(`<b>🗣️ 发音（${ratings.pron} 分）：</b>建议重点朗读「${ph2[0]}」，注意重音与语调。${ratings.pron<=2?'用录音回放逐句对照，重点纠正重音与可懂度。':'可懂度较好，继续用影子跟读巩固韵律与自然度。'}`);
  const cnt=(checks||[]).filter(Boolean).length;
  L.push(`<b>✅ 自检小结：</b>你已勾选 ${cnt}/${p.checks.length} 项自检，未勾选项即下次重点改进方向。`);
  return `<div class="fb-block">${L.join('<br><br>')}</div>`;
}
function fbDone(){
  pod.step=4;
  if(!done.practice) done.practice=[];
  if(!done.practice.includes(pod.name)){ done.practice.push(pod.name); save(); }
  recordPractice(pod.name, pod.ratings);
  awardXP(30,'场景演练');
  logLearning('scenario-practice', pod.name, pod.fromLesson?('lesson:'+pod.fromLesson):(pod.fromModuleTask?('moduleTask:'+pod.fromModuleTask):'free'));
  // 模块任务双向同步：演练完成自动勾选对应模块任务
  if(pod.fromModuleTask) toggleModTask(taskModuleOf(pod.fromModuleTask), pod.fromModuleTask, true);
  renderPod(); renderAll();
  toast('🏅 场景演练完成，已解锁！');
}

/* 录音：优先浏览器录音，环境不支持时提示外部录音 */
async function toggleRec(){
  if(pod.recOn){ stopRec(); return; }
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia) throw new Error('no api');
    recStream=await navigator.mediaDevices.getUserMedia({audio:true});
    const mime=pickAudioMime();
    recMedia=mime ? new MediaRecorder(recStream,{mimeType:mime}) : new MediaRecorder(recStream);
    recChunks=[];
    recMedia.ondataavailable=ev=>{ if(ev.data.size>0) recChunks.push(ev.data); };
    recMedia.onstop=()=>{
      const blob=new Blob(recChunks,{type:recMedia.mimeType||mime||'audio/mp4'});
      pod.recUrl=URL.createObjectURL(blob);
      pod.recOn=false;
      renderPod();
      toast('🎙️ 录音完成，点击播放条回听');
      if(recStream){ recStream.getTracks().forEach(t=>t.stop()); recStream=null; }
    };
    recMedia.start();
    pod.recOn=true;
    $('#recTxt').textContent='停止录音';
    $('#recBtn').classList.add('on');
    toast('🎙️ 录音中——大声朗读你的回答');
  }catch(e){
    pod.recOn=false;
    toast('当前环境无法录音，请用其他设备录音，或继续文字演练');
  }
}
function stopRec(){ if(recMedia&&recMedia.state!=='inactive'){ recMedia.stop(); } }

/* ============ 复习系统（批次3 T-3.5） ============ */
const REVIEW_INTERVALS=[1,3,7]; // 间隔复习天数
const DAY=24*3600*1000;
function addError(entry){
  if(!done.errors) done.errors=[];
  if(!done.errors.find(e=>e.type===entry.type&&e.id===entry.id)){
    done.errors.push(Object.assign({},entry,{ts:Date.now()}));
    save();
  }
}
function recordPractice(name, ratings){
  if(!done.review) done.review=[];
  let r=done.review.find(x=>x.name===name);
  const weak = ratings && (ratings.fluency<=2||ratings.word<=2||ratings.grammar<=2||ratings.pron<=2);
  if(r){ r.weak=weak||r.weak; r.practicedAt=Date.now(); if(!r.stage) r.stage=0; }
  else { done.review.push({name, weak, practicedAt:Date.now(), stage:0}); }
  save();
}
function reviewNext(entry){
  const idx=Math.min(entry.stage||0, REVIEW_INTERVALS.length-1);
  return new Date(entry.practicedAt + REVIEW_INTERVALS[idx]*DAY);
}
function isDue(entry){ return Date.now() >= reviewNext(entry).getTime(); }
function getDueReviews(){ return (done.review||[]).filter(isDue); }
let reviewTab='errors';
function renderReview(){
  const tabs=['errors','weak','due'];
  const labels={errors:'📕 错题本',weak:'🎯 薄弱场景',due:'⏰ 待复习'};
  const due=getDueReviews();
  $('#reviewTabs').innerHTML=tabs.map(t=>`<span class="tab ${t===reviewTab?'active':''}" data-t="${t}" tabindex="0" role="button">${labels[t]}${t==='due'&&due.length?`<span class="n">${due.length}</span>`:''}</span>`).join('');
  $('#reviewTabs').querySelectorAll('.tab').forEach(t=>{ const fn=()=>{ reviewTab=t.dataset.t; renderReview(); }; t.onclick=fn; keyActivate(t, fn); });
  const body=$('#reviewBody');
  if(reviewTab==='errors'){
    const errs=done.errors||[];
    if(!errs.length){ body.innerHTML=`<div class="card"><p style="color:var(--dim)">暂无错题。单元测验未通过、模考答错/低分的项会自动记录到这里。</p></div>`; }
    else { body.innerHTML=`<div class="grid">${errs.map(e=>`<div class="card"><h3>${e.type==='quiz'?'✍️ 单元测验':e.type==='mock'?'⏱️ 模考':'📌'}</h3><p><b>${e.id}</b></p><p style="color:var(--dim);font-size:13px">${e.detail||''}</p></div>`).join('')}</div>`; }
    return;
  }
  if(reviewTab==='weak'){
    const weak=(done.review||[]).filter(r=>r.weak);
    if(!weak.length){ body.innerHTML=`<div class="card"><p style="color:var(--dim)">暂无薄弱场景。演练反馈中任一维度自评 ≤2 分，该场景会进入薄弱清单，可一键重练。</p></div>`; }
    else { body.innerHTML=`<div class="grid">${weak.map(r=>`<div class="card"><h3>${r.name}</h3><p style="color:var(--dim);font-size:13px">建议重练巩固</p><button class="btn small" onclick="openPractice('${r.name}')">🎮 立即重练</button></div>`).join('')}</div>`; }
    return;
  }
  if(!due.length){
    body.innerHTML=`<div class="card"><p style="color:var(--dim)">当前没有到点的复习。按间隔（1 / 3 / 7 天）巩固，到点后会在这里提醒你。</p>
      <div style="margin-top:10px;color:var(--dim);font-size:13px">已练习 ${(done.review||[]).length} 个场景，继续积累复习队列。</div></div>`;
  } else {
    body.innerHTML=`<div class="grid">${due.map(r=>`<div class="card"><h3>⏰ ${r.name}</h3><p style="color:var(--dim);font-size:13px">到复习点了，重练巩固记忆</p><button class="btn small" onclick="doReview('${r.name}')">🔁 复习</button></div>`).join('')}</div>`;
  }
}
function doReview(name){
  awardXP(10,'间隔复习');
  const r=(done.review||[]).find(x=>x.name===name);
  if(r){ r.stage=(r.stage||0)+1; r.practicedAt=Date.now(); save(); }
  else { recordPractice(name); }
  toast('🔁 已复习「'+name+'」，进入下一间隔');
  openPractice(name);
  renderReview();
}

/* ============ 启动 ============ */
renderAll();

/* PWA：注册 Service Worker（离线可用；不支持的环境静默跳过） */
try{
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('sw.js').catch(function(){ /* 非 http(s) 环境忽略 */ });
    });
  }
}catch(e){}
