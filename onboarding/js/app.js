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
  ['lesson','scen','mod','practice','diag','badges','quiz','review','errors'].forEach(k=>{ if(!Array.isArray(s[k])) s[k]=[]; });
  // 游戏化系统预留字段（批次 4 使用）
  if(typeof s.experience!=='number') s.experience=0;
  if(typeof s.streak!=='number') s.streak=0;
  if(typeof s.level!=='number') s.level=1;
  return s;
}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(done)); }catch(e){} }
function mark(type,id){ if(!done[type]){ done[type]=[]; } if(!done[type].includes(id)){ done[type].push(id); save(); toast('✅ 已解锁：'+id); } renderAll(); }

/* ============ 渲染 ============ */
const $=s=>document.querySelector(s);
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }

function renderLessons(){
  $('#pathLessons').innerHTML = LESSONS.map(l=>{
    const d = done.lesson&&done.lesson.includes(l.id);
    return `<div class="node ${d?'done':''}">
      <div class="dot">${d?'✓':l.icon}</div>
      <div class="card" data-lesson="${l.id}">
        <h3>${l.title} <span class="tag">${d?'已完成':'点击查看'}</span></h3>
        <p>${l.summary}</p>
      </div></div>`;
  }).join('');
  $('#pathLessons').querySelectorAll('.card').forEach(el=>{
    el.onclick=()=>{ const l=LESSONS.find(x=>x.id===el.dataset.lesson); mark('lesson',l.id); openLesson(l); };
  });
}
function renderScen(domain){
  $('#scenTabs').innerHTML = SCEN_DOMAINS.map(d=>{
    const n=SCENARIOS.filter(s=>s.d===d).length;
    return `<span class="tab ${d===domain?'active':''}" data-d="${d}">${d}<span class="n">${n}</span></span>`;
  }).join('');
  $('#scenTabs').querySelectorAll('.tab').forEach(t=>t.onclick=()=>renderScen(t.dataset.d));
  const list = SCENARIOS.filter(s=>s.d===domain);
  $('#scenGrid').innerHTML = list.map(s=>{
    const d = (done.scen&&done.scen.includes(s.name)) || (done.practice&&done.practice.includes(s.name));
    return `<div class="card ${d?'done':''}" data-s="${s.name}">
      <h3>${s.name}</h3><p>${s.blurb}</p>
      <div class="mini">${s.expr}</div></div>`;
  }).join('');
  $('#scenGrid').querySelectorAll('.card').forEach(el=>{
    el.onclick=()=>{ const s=SCENARIOS.find(x=>x.name===el.dataset.s); mark('scen',s.name); openScen(s); };
  });
}
function renderMods(){
  $('#modGrid').innerHTML = MODULES.map(m=>{
    const d = done.mod&&done.mod.includes(m.id);
    return `<div class="card ${d?'done':''}" data-m="${m.id}">
      <h3>${m.icon} ${m.title} <span class="tag ${m.p.toLowerCase()}">${m.p}</span></h3>
      <p>${m.blurb}</p></div>`;
  }).join('');
  $('#modGrid').querySelectorAll('.card').forEach(el=>{
    el.onclick=()=>{ const m=MODULES.find(x=>x.id===el.dataset.m); mark('mod',m.id); openMod(m); };
  });
}
function renderBadges(){
  const unlocked = {
    b1: done.diag&&done.diag.length>0,
    b2: (done.lesson||[]).length>=3,
    b3: (done.lesson||[]).length>=11,
    b4: (done.scen||[]).length>=10,
    b5: (done.scen||[]).length>=30,
    b6: (done.scen||[]).filter(n=>{const s=SCENARIOS.find(x=>x.name===n);return s&&s.d==='职场';}).length>=10,
    b7: (done.mod||[]).length>=12,
    b8: (done.mod||[]).filter(id=>{const m=MODULES.find(x=>x.id===id);return m&&m.p==='P0';}).length>=5,
    b9: (done.lesson||[]).length>=11 && (done.scen||[]).length>=30 && (done.mod||[]).length>=12,
    b10: (done.practice||[]).length>=5,
  };
  const count = Object.values(unlocked).filter(Boolean).length;
  $('#badgeCount').textContent = count;
  $('#badgeGrid').innerHTML = BADGES.map(b=>`
    <div class="badge ${unlocked[b.id]?'on':''}">
      <div class="em">${unlocked[b.id]?b.em:'🔒'}</div>
      <h3>${b.name}</h3><p>${b.desc}</p></div>`).join('');
}
function renderProgress(){
  const total = LESSONS.length + SCENARIOS.length + MODULES.length + 1;
  const got = (done.lesson||[]).length + (done.scen||[]).length + (done.mod||[]).length + ((done.diag||[]).length?1:0);
  const pct = Math.round(got/total*100);
  const C = 113;
  $('#ringFg').setAttribute('stroke-dashoffset', C*(1-pct/100));
  $('#ringPct').textContent = pct+'%';
}
function renderAll(){ renderLessons(); renderScen($('#scenTabs').dataset.cur||'职场'); renderMods(); renderBadges(); renderProgress(); renderReview(); }

/* ============ 弹窗 ============ */
function openModal(html){ $('#modalBox').innerHTML = html; $('#modal-mask').classList.add('show'); }
function closeModal(){ $('#modal-mask').classList.remove('show'); }
$('#modal-mask').onclick=e=>{ if(e.target===$('#modal-mask')) closeModal(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

function openLesson(l){
  openModal(`<button class="close" onclick="closeModal()">×</button>
    <h2>${l.icon} ${l.title}</h2>
    <p>${l.summary}</p>
    <ul>${l.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    <p style="color:var(--cyan)">📖 完整课程内容（含练习与作业）在：</p>
    <div class="file">ielts-75/${l.path}</div>
    <p style="margin-top:14px">打开该文件即可学习。学完后回到本门户点击卡片，进度会自动点亮。</p>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small" onclick="closeModal();openUnitQuiz('lesson','${l.id}')">✍️ 单元测验</button>
      <button class="btn done small" onclick="closeModal()">知道了，继续闯关</button>
    </div>`);
}
function openScen(s){
  openModal(`<button class="close" onclick="closeModal()">×</button>
    <h2>🏙️ ${s.name} <span class="tag">${s.d}域</span></h2>
    <p>${s.blurb}</p>
    <div class="expr">💬 核心表达：${s.expr}</div>
    <p><b style="color:var(--txt)">练习任务：</b>${s.task}</p>
    <p style="color:var(--cyan)">📂 完整素材（核心表达全量 + 情景对话 + 角色扮演任务）在：</p>
    <div class="file">ielts-75/materials/scenarios/（按域找到「${s.name}」文件夹）</div>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small" onclick="closeModal();openPractice('${s.name}')">🎮 领取任务，去演练</button>
      <button class="btn ghost small" onclick="closeModal()">查看文档路径</button>
    </div>`);
}
function openMod(m){
  openModal(`<button class="close" onclick="closeModal()">×</button>
    <h2>${m.icon} ${m.title} <span class="tag ${m.p.toLowerCase()}">${m.p}</span></h2>
    <p>${m.blurb}</p>
    <p><b style="color:var(--txt)">包含文件：</b></p>
    <ul>${m.files.split(' / ').map(f=>`<li>${f}</li>`).join('')}</ul>
    <div class="file">ielts-75/${m.path}</div>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small" onclick="closeModal();openUnitQuiz('mod','${m.id}')">✍️ 单元测验</button>
      <button class="btn done small" onclick="closeModal()">进入模块</button>
    </div>`);
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
  if(!list) return '<button class="close" onclick="closeModal()">×</button><p>测验数据缺失</p>';
  if(uq.qIdx>=list.length) return uqResultHtml();
  const q=list[uq.qIdx];
  const optsHtml = q.type==='choice'
    ? q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')
    : `<input id="uqFill" class="uq-fill" placeholder="请输入答案后点下一题" autocomplete="off">`;
  return `<button class="close" onclick="closeModal()">×</button>
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
    if(!pass){ addError({type:'quiz', id:key, detail:'单元测验未通过（'+uq.score+'/'+list.length+'）'}); }
    openModal(renderUqHtml()); return;
  }
  uq.picked=false;
  openModal(renderUqHtml()); bindUq();
}
function uqResultHtml(){
  const list=uqData();
  const pct=Math.round(uq.score/list.length*100);
  const pass=uq.score>=Math.ceil(list.length*0.6);
  return `<button class="close" onclick="closeModal()">×</button>
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
  if(!done.mock){ done.mock=true; save(); }
  renderAll();
}
async function mockToggleRec(){
  if(mock.recOn){ mockStopRec(); return; }
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    mockRecStream=new MediaRecorder(stream);
    mockRecChunks=[];
    mockRecStream.ondataavailable=e=>{ if(e.data.size) mockRecChunks.push(e.data); };
    mockRecStream.onstop=()=>{
      const blob=new Blob(mockRecChunks,{type:'audio/webm'});
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

$('#btnGuide').onclick=()=>openModal(`<button class="close" onclick="closeModal()">×</button>
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
let pod = {name:null, step:0, exIdx:0, lineIdx:0, varSel:0, tab:'words', showRef:false, checks:{}, ratings:{word:3,fluency:3,grammar:3,pron:3}, feedback:null, recOn:false, recUrl:null};
let recStream=null, recMedia=null, recChunks=[];

function openPractice(name){
  const p=PRACTICE[name];
  if(!p){ toast('该场景的演练数据缺失'); return; }
  pod={name,step:0,exIdx:0,lineIdx:0,varSel:0,tab:'words',showRef:false,checks:{},ratings:{word:3,fluency:3,grammar:3,pron:3},feedback:null,recOn:false,recUrl:null};
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
  const steps=podSteps().map((s,i)=>`<div class="step ${i<pod.step?'done':i===pod.step?'on':''}"><b>${['①','②','③','④'][i]}</b>${s}</div>`).join('');
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
    body=`<div class="success"><div class="em">🏅</div><h3>场景演练完成！</h3>
      <p><b>${pod.name}</b> 已解锁。<br>完整素材与对话变体已在演练舱内完成，并已生成专属反馈。</p>
      <p style="margin-top:10px;font-size:13px">💡 练习建议：${s.task}</p></div>
      <div class="pod-actions"><button class="btn" onclick="closePod()">返回场景城</button>
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
  renderPod(); renderAll();
  toast('🏅 场景演练完成，已解锁！');
}

/* 录音：优先浏览器录音，环境不支持时提示外部录音 */
async function toggleRec(){
  if(pod.recOn){ stopRec(); return; }
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia) throw new Error('no api');
    recStream=await navigator.mediaDevices.getUserMedia({audio:true});
    recMedia=new MediaRecorder(recStream);
    recChunks=[];
    recMedia.ondataavailable=ev=>{ if(ev.data.size>0) recChunks.push(ev.data); };
    recMedia.onstop=()=>{
      const blob=new Blob(recChunks,{type:'audio/webm'});
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
  $('#reviewTabs').innerHTML=tabs.map(t=>`<span class="tab ${t===reviewTab?'active':''}" data-t="${t}">${labels[t]}${t==='due'&&due.length?`<span class="n">${due.length}</span>`:''}</span>`).join('');
  $('#reviewTabs').querySelectorAll('.tab').forEach(t=>t.onclick=()=>{ reviewTab=t.dataset.t; renderReview(); });
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
  const r=(done.review||[]).find(x=>x.name===name);
  if(r){ r.stage=(r.stage||0)+1; r.practicedAt=Date.now(); save(); }
  else { recordPractice(name); }
  toast('🔁 已复习「'+name+'」，进入下一间隔');
  openPractice(name);
  renderReview();
}

/* ============ 启动 ============ */
renderAll();
