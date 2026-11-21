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
  ['lesson','scen','mod','practice','diag','badges'].forEach(k=>{ if(!Array.isArray(s[k])) s[k]=[]; });
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
function renderAll(){ renderLessons(); renderScen($('#scenTabs').dataset.cur||'职场'); renderMods(); renderBadges(); renderProgress(); }

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
    <div style="margin-top:16px"><button class="btn done small" onclick="closeModal()">知道了，继续闯关</button></div>`);
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
    <div style="margin-top:16px"><button class="btn done small" onclick="closeModal()">进入模块</button></div>`);
}
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

/* ============ 诊断小游戏 ============ */
const QUIZ = [
  {stem:'听一段回答："Um, I, um, think, um, this is, um, a good idea." 这段话里大约出现了几次填充词（um）？',
   opts:['1 次','3 次','5 次以上'], right:1,
   explain:'答案：3 次。填充词是流利度的"头号信号"——考官对填充词频率的感知是秒级的。你的判断准不准，直接对应模块 02 的训练目标：把填充词控制到每分钟 3 次以内。'},
  {stem:'一个 Part 3 回答是："我认为远程办公很好。因为它更灵活。" 论证还缺哪一步？',
   opts:['举例说明（如什么情况下更灵活）','再重复一遍观点','直接结束回答'], right:0,
   explain:'答案：举例。完整的论证是"观点 → 解释 → 举例 → 让步"，目前只有观点和解释，举例让论证落地、让步让思考完整。这正是模块 08 的训练框架。'},
  {stem:'考官问："Do you like your job?"（你喜欢你的工作吗？）哪种回答风格最合适？',
   opts:['长篇论证式，像 Part 3 那样展开','2–4 句的聊天式短答，带个人细节','只回答一个单词',' Both A and B 都可以'], right:1,
   explain:'答案：2–4 句聊天式短答。Part 1 是聊天体，Part 3 是讨论体，语域混用是常见扣分点。语域切换能力见模块 03 的语域转换训练。'},
];
let qStep=0, qScore=0, qPicked=false;
function renderQuiz(){
  const area=$('#quizArea');
  area.classList.remove('hidden');
  if(qStep>=QUIZ.length){ finishQuiz(); return; }
  const q=QUIZ[qStep];
  area.innerHTML=`
    <div class="quiz-q">
      <div class="stem">第 ${qStep+1} 题 / 共 ${QUIZ.length} 题<br><br>${q.stem}</div>
      ${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')}
      <div class="feedback" id="fb"></div>
    </div>
    <div style="margin-top:14px;display:flex;gap:12px">
      <button class="btn ghost small" id="btnNext" disabled>下一题 →</button>
      <button class="btn ghost small" id="btnRestart">重新开始</button>
    </div>`;
  area.querySelectorAll('.opt').forEach(b=>b.onclick=()=>pick(b.dataset.i,q));
  $('#btnNext').onclick=()=>{ qStep++; qPicked=false; renderQuiz(); };
  $('#btnRestart').onclick=()=>{ qStep=0; qScore=0; renderQuiz(); };
}
function pick(i,q){
  if(qPicked) return; qPicked=true;
  const opts=document.querySelectorAll('.opt');
  opts.forEach((o,k)=>o.classList.toggle('right',k===q.right));
  if(i===q.right){ qScore++; }
  else{ opts[q.right].classList.add('right'); opts[i].classList.add('wrong'); }
  $('#btnNext').disabled=false;
  $('#fb').textContent='💡 '+q.explain;
  $('#fb').classList.add('show');
}
function finishQuiz(){
  $('#quizArea').innerHTML=`<div class="profile-card">
    <h3>🎯 诊断完成 — 你的起步建议</h3>
    <div class="result-line">答对 ${qScore} / ${QUIZ.length} 题</div>
    ${profilePlan(qScore)}
  </div>
  <div style="margin-top:14px"><button class="btn" id="btnGoPath">沿着推荐路径出发 🚀</button></div>`;
  $('#btnGoPath').onclick=()=>{
    document.querySelector('#secLessons').scrollIntoView({behavior:'smooth'});
    toast('课程路径已展开，从第 1 关开始');
  };
  if(!done.diag){ done.diag=['quiz']; save(); }
  renderAll();
}
function profilePlan(score){
  const tips=[];
  if(score>=3) tips.push('<li>✅ 基础概念扎实：直接从 <b>课程路径第 1 关</b>开始，按顺序推进，重点放在"输出与模考"。</li>');
  if(score<=1) tips.push('<li>🔧 建议先补 <b>模块 01（发音）+ 模块 02（流利度）</b>这两个 P0 基础，再进入课程路径，事半功倍。</li>');
  if(score===2) tips.push('<li>🎯 基础不错：按课程路径推进，同时用 <b>模块 08</b> 补论证、<b>模块 03</b> 补语域意识。</li>');
  tips.push('<li>📊 无论起点如何，每学完一节都用 <b>模块 04 自评表</b>打分，用 <b>模块 11 校准库</b>核对，避免高估。</li>');
  tips.push('<li>🏙️ 练表达优先去 <b>场景城</b>，挑与自己岗位相关的场景开练。</li>');
  return `<ul style="color:var(--txt)">${tips.join('')}</ul>`;
}
$('#btnStart').onclick=()=>{
  document.querySelector('#secDiag').scrollIntoView({behavior:'smooth'});
  qStep=0; qScore=0; qPicked=false;
  renderQuiz();
  toast('新手任务开始！三道题，边玩边定位起点');
};

/* ============ 场景演练舱 ============ */
let pod = {name:null, step:0, exIdx:0, showRef:false, checks:{}, recOn:false, recUrl:null};
let recStream=null, recMedia=null, recChunks=[];

function openPractice(name){
  const p=PRACTICE[name];
  if(!p){ toast('该场景的演练数据缺失'); return; }
  pod={name,step:0,exIdx:0,showRef:false,checks:{},recOn:false,recUrl:null};
  $('#pod-mask').classList.add('show');
  renderPod();
  $('#pod-mask').scrollTop=0;
}
function closePod(){
  if(pod.recOn) stopRec();
  $('#pod-mask').classList.remove('show');
}
function podSteps(){ return ['任务简报','对话演练','自检打勾','完成解锁']; }

function renderPod(){
  const p=PRACTICE[pod.name];
  const steps=podSteps().map((s,i)=>`<div class="step ${i<pod.step?'done':i===pod.step?'on':''}"><b>${['①','②','③','④'][i]}</b>${s}</div>`).join('');
  let body='';
  if(pod.step===0){
    body=`<div class="scene-brief">
      <b>场景任务：</b>${SCENARIOS.find(s=>s.name===pod.name).blurb}<br>
      <b>演练方式：</b>回合制对话演练。搭档先开口，你先自己尝试回应，再点开参考回答对照，最后朗读/录音。
    </div>
    <div class="roles">
      <div class="role"><h4>🎤 你的角色</h4><p>${p.roleA}</p></div>
      <div class="role"><h4>🤝 搭档角色</h4><p>${p.roleB}（可让朋友配音，或自问自答）</p></div>
    </div>
    <div class="pod-actions"><button class="btn" id="btnStartEx">开始演练 🎮</button>
    <button class="btn ghost small" onclick="closePod()">返回场景城</button></div>`;
  } else if(pod.step===1){
    const ex=p.ex;
    if(pod.exIdx>=ex.length){
      body=`<div class="success"><div class="em">🎬</div><h3>对话演练完成！</h3>
        <p>所有回合已过完。核对一下你的自检清单，然后解锁这个场景。</p></div>
      <div class="pod-actions"><button class="btn" onclick="goCheck()">进入自检 ③</button></div>`;
    } else {
      const e=ex[pod.exIdx];
      body=`<div class="turn-box">
        <div class="bubble partner">🤝 搭档：${e.b.q}<span class="zh">${e.b.zh}</span></div>
        <div class="bubble me ${pod.showRef?'':'hidden'}">🎤 你的参考回答：${e.a.q}<span class="zh">${e.a.zh}</span></div>
      </div>
      <div class="turn-bar">
        <span class="turn-count">第 ${pod.exIdx+1} / ${ex.length} 回合</span>
        <div style="display:flex;gap:10px">
          <button class="rec-btn" id="recBtn"><span class="dot"></span><span id="recTxt">录音跟读</span></button>
          ${pod.audioEl?'<audio controls style="height:32px"></audio>':''}
        </div>
      </div>
      <div class="pod-actions">
        ${pod.showRef
          ? `<button class="btn" onclick="nextTurn()">下一回合 →</button>`
          : `<button class="btn ghost" onclick="showRef()">我练完了，看参考回答</button>`}
        <button class="btn ghost small" onclick="closePod()">退出演练</button>
      </div>`;
    }
  } else if(pod.step===2){
    body=`<div class="turn-box" style="min-height:80px">
      ${p.checks.map((c,i)=>`<label class="check ${pod.checks[i]?'on':''}"><input type="checkbox" data-i="${i}" ${pod.checks[i]?'checked':''} onchange="toggleCheck(${i})"> ${c}</label>`).join('')}
    </div>
    <div class="pod-actions"><button class="btn" id="btnFinishCheck">完成自检，解锁场景 🏆</button>
    <button class="btn ghost small" onclick="backDialog()">回到对话演练</button></div>`;
  } else {
    const s=SCENARIOS.find(x=>x.name===pod.name);
    body=`<div class="success"><div class="em">🏅</div><h3>场景演练完成！</h3>
      <p><b>${pod.name}</b> 已解锁。<br>完整素材（更多表达与对话变体）在场景库中，可继续深挖。</p>
      <p style="margin-top:10px;font-size:13px">💡 练习建议：${s.task}</p></div>
      <div class="pod-actions"><button class="btn" onclick="closePod()">返回场景城</button>
      <button class="btn ghost" onclick="retry()">再练一次 🔁</button></div>`;
  }
  $('#pod').innerHTML=`<div class="pod-head"><h2>🎮 演练舱 · ${pod.name}</h2>
    <button class="btn ghost small" onclick="closePod()">退出</button></div>
    <div class="steps">${steps}</div>${body}`;
  if(pod.step===1&&pod.exIdx<p.ex.length){
    $('#recBtn').onclick=toggleRec;
  }
  if(pod.step===2){
    $('#btnFinishCheck').onclick=finishCheck;
  }
  if(pod.step===0){
    $('#btnStartEx').onclick=()=>{ pod.step=1; renderPod(); };
  }
}
function showRef(){ pod.showRef=true; renderPod(); }
function nextTurn(){ pod.exIdx++; pod.showRef=false; renderPod(); }
function goCheck(){ pod.step=2; renderPod(); }
function backDialog(){ pod.step=1; renderPod(); }
function toggleCheck(i){ pod.checks[i]=!pod.checks[i]; renderPod(); }
function finishCheck(){
  const p=PRACTICE[pod.name];
  const missing=p.checks.filter((c,i)=>!pod.checks[i]);
  if(missing.length>0){ toast(`还有 ${missing.length} 项自检未勾选，再核对一下`); return; }
  pod.step=3;
  if(!done.practice){ done.practice=[]; }
  if(!done.practice.includes(pod.name)){ done.practice.push(pod.name); save(); }
  renderPod(); renderAll();
  toast('🏅 场景演练完成，已解锁！');
}
function retry(){ pod.step=0; pod.exIdx=0; pod.showRef=false; pod.checks={}; renderPod(); }

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

/* ============ 启动 ============ */
renderAll();
