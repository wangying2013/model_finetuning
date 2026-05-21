// ===== NAV =====
function showP(id){document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));document.getElementById('pg-'+id).classList.add('on')}
function goList(){showP('list');pgCur=1;renderList()}
function goDetail(t){dTask=t;showP('detail');renderDetail(t)}

// ===== LIST & PAGINATION =====
let pgCur=1, pgSize=10;
function sTag(s){const m={completed:['tg-ok','完成'],running:['tg-wr','运行中'],failed:['tg-er','失败'],terminated:['tg-df','终止中'],pending:['tg-if','排队中']};const[c,t]=m[s]||['tg-df',s];return`<span class="tg ${c}">${t}</span>`}
function stMap(s){const m={completed:['ok','完成'],running:['wr','运行中'],failed:['er','失败'],terminated:['df','终止中'],pending:['if','排队中']};return m[s]||['df',s]}
function pBarCls(s){return s==='completed'?'ok':s==='running'?'wr':s==='failed'?'er':s==='terminated'?'df':s==='pending'?'if':'df'}
function mTag(m){return m}
function getFiltered(){
  const fs=document.getElementById('f-st').value,fm=document.getElementById('f-me').value,fmo=document.getElementById('f-mo').value,fs2=document.getElementById('f-se').value.toLowerCase();
  return T.filter(t=>{if(fs&&t.st!==fs)return false;if(fm&&t.method!==fm)return false;if(fmo&&t.model!==fmo)return false;if(fs2&&!t.nm.toLowerCase().includes(fs2)&&!t.id.includes(fs2))return false;return true});
}
function renderList(){
  const fl=getFiltered();
  const total=fl.length;
  const totalPages=Math.max(1,Math.ceil(total/pgSize));
  if(pgCur>totalPages)pgCur=totalPages;
  const start=(pgCur-1)*pgSize;
  const pageData=fl.slice(start,start+pgSize);
  document.getElementById('tlb').innerHTML=pageData.map(t=>{const[sc,sl]=stMap(t.st);const fmtTm=t.tm&&t.tm.split(':').length===2?t.tm+':00':t.tm;return`<tr onclick="goDetail(T.find(x=>x.id==='${t.id}'))"><td class="td-id" title="${t.id}">${t.id}</td><td class="td-name"><div class="title">${t.nm}</div><div class="desc">${t.desc||''}</div></td><td style="width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.model}</td><td><span class="tg tg-df">${t.method}</span></td><td>${mTag(t.mode)}</td><td><div class="status-cell"><span class="status-dot ${sc}"></span><span class="status-label">${sl}</span></div></td><td><div class="progress-wrap"><div class="progress-bar"><div class="fill ${pBarCls(t.st)}" style="width:${t.progress}%"></div></div><span class="progress-text">${t.progress}%</span></div></td><td style="width:120px">${t.cr}</td><td style="width:190px;white-space:nowrap">${fmtTm}</td><td class="td-actions" onclick="event.stopPropagation()"><button class="action-btn" onclick="goDetail(T.find(x=>x.id==='${t.id}'))">详情</button><button class="action-btn" onclick="copyTask('${t.id}')">复制</button>${t.st==='running'?`<button class="action-btn danger" onclick="stopTask('${t.id}')">停止</button>`:''}${t.st!=='running'?`<button class="action-btn danger" onclick="delTask('${t.id}')">删除</button>`:''}</td></tr>`}).join('');
  renderPgn(total,totalPages);
}
function renderPgn(total,totalPages){
  const el=document.getElementById('pgn');
  if(total===0){el.innerHTML='';return}
  let btns='';
  const range=2;
  const pages=[];
  for(let i=1;i<=totalPages;i++){
    if(i===1||i===totalPages||Math.abs(i-pgCur)<=range){pages.push(i)}
    else if(pages[pages.length-1]!=='...'){pages.push('...')}
  }
  btins=`<div class="pgn-ctrl"><button class="pgn-btn pgn-prev" onclick="goPage(${pgCur-1})" ${pgCur<=1?'disabled':''}><svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></button>`;
  pages.forEach(p=>{
    if(p==='...')btins+=`<span style="padding:0 4px;color:#D9D9D9;font-size:13px">···</span>`;
    else btins+=`<button class="pgn-btn ${p===pgCur?'on':''}" onclick="goPage(${p})">${p}</button>`;
  });
  btins+=`<button class="pgn-btn pgn-next" onclick="goPage(${pgCur+1})" ${pgCur>=totalPages?'disabled':''}><svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></button></div>`;
  btins+=`<select class="pgn-sz" onchange="pgSize=+this.value;pgCur=1;renderList()"><option value="10" ${pgSize===10?'selected':''}>10 条/页</option><option value="20" ${pgSize===20?'selected':''}>20 条/页</option><option value="50" ${pgSize===50?'selected':''}>50 条/页</option></select>`;
  btns=`<span class="pgn-info">共 ${total} 条</span>${btins}`;
  el.innerHTML=btns;
}
function goPage(p){const fl=getFiltered();const tp=Math.max(1,Math.ceil(fl.length/pgSize));if(p<1||p>tp)return;pgCur=p;renderList()}
document.getElementById('f-st').onchange=function(){pgCur=1;renderList()};
document.getElementById('f-me').onchange=function(){pgCur=1;renderList()};
document.getElementById('f-mo').onchange=function(){pgCur=1;renderList()};
document.getElementById('f-se').oninput=function(){pgCur=1;renderList()};

function stopTask(id){const t=T.find(x=>x.id===id);showM('',`确定停止精调任务「<span class="md-del-name">${t.nm}</span>」？停止后已保存的 Checkpoint 仍可使用。`,[{t:'取消',c:'bc',a:'hideM()'},{t:'确认停止',c:'bp',a:`hideM();T.find(x=>x.id==='${id}').st='terminated';goList()`}]);document.getElementById('m-tit').innerHTML=`<span class="md-del-hdr-icon md-del-hdr-info">!</span> 确认停止`;document.getElementById('m-body').className='md-b md-b-del'}
function delTask(id){const t=T.find(x=>x.id===id);showM('',`确定删除精调任务「<span class="md-del-name">${t.nm}</span>」吗？删除后无法恢复，请谨慎操作。`,[{t:'取消',c:'bc',a:'hideM()'},{t:'删除',c:'bd',a:`hideM();const i=T.findIndex(x=>x.id==='${id}');if(i>=0)T.splice(i,1);goList()`}]);document.getElementById('m-tit').innerHTML=`<span class="md-del-hdr-icon">!</span> 确认删除`;document.getElementById('m-body').className='md-b md-b-del'}
function copyTask(id){const t=T.find(x=>x.id===id);if(!t)return;F.name=t.nm+' (副本)';F.desc='复制自：'+t.nm;F.method=t.method;F.model=t.model;F.mode=t.mode;F.ds=t.ds;F.dv=t.dv;F.lr=t.lr;F.ep=t.ep;F.outNm=t.outNm||'';F.saveInt=t.saveInt||200;F.expLim=t.expLim||5;F.resMode=t.resType==='独立资源'?'private':'public';F.resPool=t.resPool||'pool-a';F.gpuModel=t.gpuModel||'A100';F.gpuC=t.gpuC||2;editModule=0;reachedSteps=[0,1,2,3,4,5];showP('create');renderAllCards()}
function stopDetailTask(id){const t=T.find(x=>x.id===id);showM('',`确定停止精调任务「<span class="md-del-name">${t.nm}</span>」？停止后已保存的 Checkpoint 仍可使用。`,[{t:'取消',c:'bc',a:'hideM()'},{t:'确认停止',c:'bp',a:`hideM();T.find(x=>x.id==='${id}').st='terminated';renderDetail(T.find(x=>x.id==='${id}'))`}]);document.getElementById('m-tit').innerHTML=`<span class="md-del-hdr-icon md-del-hdr-info">!</span> 确认停止`;document.getElementById('m-body').className='md-b md-b-del'}
function delDetailTask(id){const t=T.find(x=>x.id===id);showM('',`确定删除精调任务「<span class="md-del-name">${t.nm}</span>」吗？删除后无法恢复，请谨慎操作。`,[{t:'取消',c:'bc',a:'hideM()'},{t:'删除',c:'bd',a:`hideM();const i=T.findIndex(x=>x.id==='${id}');if(i>=0)T.splice(i,1);goList()`}]);document.getElementById('m-tit').innerHTML=`<span class="md-del-hdr-icon">!</span> 确认删除`;document.getElementById('m-body').className='md-b md-b-del'}
function toggleMoreMenu(e){e.stopPropagation();const m=document.getElementById('more-menu');m.classList.toggle('sh');if(m.classList.contains('sh')){setTimeout(()=>document.addEventListener('click',hideMoreMenu,{once:true}),0)}}
function hideMoreMenu(){const m=document.getElementById('more-menu');if(m)m.classList.remove('sh')}

// ===== CREATE =====
let editModule = -1;
let stepErrors = [];
let reachedSteps = [];
let reeditFlow = false;

function isStepCompleted(i) {
  switch (i) {
    case 0: return !!(F.name && F.desc);
    case 1: return !!F.model;
    case 2: return !!(F.ds && F.dv);
    case 3: return !!(F.lr && F.ep);
    case 4: return F.autoReg === false || !!F.outNm;
    case 5: return !!F.resMode;
    default: return false;
  }
}

function getStepState(i) {
  if (i === editModule) return 'current';
  if (reachedSteps.includes(i) && isStepCompleted(i)) return 'completed';
  return 'locked';
}

function getFirstUnlockedStep() {
  for (let i = 0; i < 6; i++) {
    if (!isStepCompleted(i) && i !== editModule) return i;
  }
  return 6;
}

function goCreate() {
  editModule = 0;
  reachedSteps = [0];
  reeditFlow = false;
  F.name='';F.desc='';F.model='';F.ds='';F.dv='';F.outNm='';
  F.lr='';F.ep='';F.bs='';F.msl='';F.wr='';F.wd='';F.lrR='';F.lrA='';F.lrD='';F.lrT='';
  F.resMode='';F.resPool='';F.gpuModel='';F.gpuC='';
  showP('create');
  renderAllCards();
  updateFeeDisplay();
}

function getNextUncompletedStep(from) {
  for (let i = from + 1; i < 6; i++) {
    if (!isStepCompleted(i)) return i;
  }
  return 6;
}

function nextStep(i) {
  if (editModule !== i) return;
  if (reeditFlow) {
    if (i + 1 < 6) {
      editModule = i + 1;
      stepErrors = [];
      renderAllCards();
    } else {
      reeditFlow = false;
      editModule = -1;
      stepErrors = [];
      renderAllCards();
    }
    return;
  }
  if (!isStepCompleted(i)) {
    stepErrors = [];
    if (i === 0) {
      if (!F.name) stepErrors.push('name');
      if (!F.desc) stepErrors.push('desc');
    } else if (i === 1) {
      if (!F.model) stepErrors.push('model');
    } else if (i === 2) {
      if (!F.ds) stepErrors.push('ds');
      if (!F.dv) stepErrors.push('dv');
    } else if (i === 4) {
      if (F.autoReg !== false && !F.outNm) stepErrors.push('outNm');
    }
    if (stepErrors.length > 0) { renderAllCards(); return; }
  }
  const next = getNextUncompletedStep(i);
  if (next < 6) {
    if (!reachedSteps.includes(next)) reachedSteps.push(next);
    editModule = next;
    stepErrors = [];
    if (next===3){if(!F.lr)F.lr='1e-4';if(!F.ep)F.ep=3;if(!F.bs)F.bs=4;if(!F.msl)F.msl=2048;if(!F.wr)F.wr=0.03;if(!F.wd)F.wd=0.01;if(!F.lrR)F.lrR=8;if(!F.lrA)F.lrA=16;if(!F.lrD)F.lrD=0.05;if(!F.lrT)F.lrT='q_proj,v_proj'}
    if (next===5){if(!F.resMode)F.resMode='public';if(!F.resPool)F.resPool='pool-a';if(!F.gpuModel)F.gpuModel='A100';if(!F.gpuC)F.gpuC=2}
    renderAllCards();
  } else {
    editModule = -1;
    stepErrors = [];
    renderAllCards();
  }
}

function renderAllCards() {
  const container = document.getElementById('c-body');
  if (!container) return;

  const previewRenders = [previewBasic, previewConfig, previewData, previewParams, previewOutput, previewResource];
  const editRenders = [editBasic, editConfig, editData, editParams, editOutput, editResource];

  container.innerHTML = SN.map((title, i) => {
    const isEditing = editModule === i;
    const state = getStepState(i);
    const isCompleted = state === 'completed' && !isEditing;
    const editHTML = isEditing ? editRenders[i]() : '';
    const previewHTML = isCompleted ? previewRenders[i]() : '';

    const stepContentClass = 'step-content' + (isCompleted ? ' preview-mode' : '');
    const dotClass = isCompleted ? 'completed' : (isEditing ? 'current' : 'locked');
    const dotContent = isCompleted ? '✓' : '';
    const lineActive = isStepCompleted(i);
    const lineEl = i < 5 ? `<div class="step-line ${lineActive ? 'active' : ''}"></div>` : '';
    let titleClass = 'step-title';
    if (state === 'locked' && !isEditing) titleClass += ' locked';
    if (isCompleted) titleClass += ' preview-mode';
    const editBtnHtml = isCompleted ? `<span class="edit-title-btn" onclick="enterEditMode(${i})">重新编辑</span>` : '';
    const spacerEl = i < 5 ? '<div class="step-spacer"></div>' : '';

    let contentArea = '';
    if (isEditing) {
      contentArea = `<div class="config-card"><div class="card-body">${editHTML}</div></div><div class="card-footer"><button class="btn bp bs" onclick="nextStep(${i})">${i === 5 ? '完成' : '下一步'}</button></div>`;
    } else if (isCompleted) {
      contentArea = `<div class="card-body preview-mode" style="padding:20px">${previewHTML}</div>`;
    }

    return `<div class="step-row">
      <div class="step-pipeline">
        <div class="step-dot ${dotClass}">${dotContent}</div>
        ${lineEl}
      </div>
      <div class="${stepContentClass}">
        <div class="${titleClass}">${title}${editBtnHtml}</div>
        ${contentArea}${spacerEl}
      </div>
    </div>`;
  }).join('');

  if (editModule >= 0) initCustomSelects();
}

function enterEditMode(idx) {
  reeditFlow = editModule === -1;
  if (!reachedSteps.includes(idx)) reachedSteps.push(idx);
  editModule = idx;
  stepErrors = [];
  renderAllCards();
}

function hasErr(key) { return stepErrors.includes(key) }
function errTip(key, msg) { return hasErr(key) ? `<div class="fe" style="display:block">${msg}</div>` : '' }
function errCls(key) { return hasErr(key) ? ' err' : '' }

function submitTask() {
  stepErrors = [];
  if (!F.name) stepErrors.push('name');
  if (!F.desc) stepErrors.push('desc');
  if (!F.model) stepErrors.push('model');
  if (!F.ds) stepErrors.push('ds');
  if (!F.dv) stepErrors.push('dv');
  if (F.autoReg !== false && !F.outNm) stepErrors.push('outNm');
  if (F.resMode === 'private') {
    if (!F.resPool) stepErrors.push('resPool');
    if (!F.gpuModel) stepErrors.push('gpuModel');
    if (!F.gpuC) stepErrors.push('gpuC');
  }
  if (stepErrors.length > 0) {
    showM('提示', '<p style="color:var(--warn)">请完善必填信息后再提交</p>', [{ t: '知道了', c: 'bp', a: 'hideM()' }]);
    return;
  }
  const nt = { id: 'ft-' + Date.now().toString().slice(-10), nm: F.name, model: F.model, method: F.method, mode: F.mode, st: 'pending', cr: '王颖', tm: new Date().toLocaleString('zh-CN'), dur: '—', loss: null, ep: F.ep, lr: F.lr, ds: F.ds, dv: F.dv, gpu: F.resMode === 'private' ? F.gpuModel + ' × ' + F.gpuC : '公共资源' };
  T.unshift(nt);
  showM('提交成功', `<p>精调任务「${F.name}」已创建成功，任务即将开始训练。</p>`, [{ t: '查看详情', c: 'bc', a: "hideM();goDetail(T[0])" }, { t: '返回列表', c: 'bp', a: "hideM();goList()" }]);
}

// ===== PREVIEW RENDERERS =====
function previewBasic() {
  return `<div class="preview-row"><span class="preview-label">任务名称</span><span class="preview-value${F.name ? '' : ' empty'}">${F.name || '—'}</span></div><div class="preview-row"><span class="preview-label">任务描述</span><span class="preview-value${F.desc ? '' : ' empty'}">${F.desc || '—'}</span></div>`;
}
function previewConfig() {
  return `<div class="preview-row"><span class="preview-label">训练类型</span><span class="preview-value">${F.method ? `<span class="preview-tag primary">${F.method}</span>` : '<span class="empty">—</span>'}</span></div><div class="preview-row"><span class="preview-label">训练方法</span><span class="preview-value${F.mode ? '' : ' empty'}">${F.mode || '—'}</span></div><div class="preview-row"><span class="preview-label">基础模型</span><span class="preview-value${F.model ? '' : ' empty'}">${F.model || '—'}</span></div>`;
}
function previewData() {
  let html = `<div class="preview-row"><span class="preview-label">训练集</span><span class="preview-value${F.ds ? '' : ' empty'}">${F.ds ? F.ds + ' > ' + (F.dv || '') : '—'}</span></div>`;
  let valText = '—';
  if (F.valMode === 'none') valText = '不使用';
  else if (F.valMode === 'split') valText = '分割训练集（' + F.valRatio + '%）';
  else if (F.valMode === 'select') valText = (F.valDs || '') + ' > ' + (F.valDv || '');
  html += `<div class="preview-row"><span class="preview-label">验证集</span><span class="preview-value${valText !== '—' ? '' : ' empty'}">${valText}</span></div>`;
  if (F.valMode === 'split' || F.valMode === 'select') {
    html += `<div class="preview-row"><span class="preview-label">评估次数</span><span class="preview-value">${F.evalCount} 次</span></div>`;
  }
  return html;
}
function previewParams() {
  const isLora = F.mode === 'LoRA';
  const items = [
    {l:'学习率',v:F.lr||'—'},{l:'训练轮数 (Epochs)',v:F.ep||'—'},
    {l:'批次大小 (Batch Size)',v:F.bs||'—'},{l:'最大序列长度',v:F.msl||'—'},
    {l:'Warmup 比例',v:F.wr||'—'},{l:'权重衰减 (Weight Decay)',v:F.wd||'—'}
  ];
  if (isLora) items.push(
    {l:'LoRA Rank (r)',v:F.lrR||'—'},{l:'LoRA Alpha',v:F.lrA||'—'},
    {l:'LoRA Dropout',v:F.lrD||'—'},{l:'目标模块',v:F.lrT||'—'}
  );
  return `<div class="preview-grid">${items.map(it=>`<div class="preview-grid-item"><span class="preview-label">${it.l}</span><span class="preview-value${it.v === '—' ? ' empty' : ''}">${it.v}</span></div>`).join('')}</div>`;
}
function previewOutput() {
  const autoReg = F.autoReg !== false;
  return `<div class="preview-row"><span class="preview-label">自动保存到模型管理</span><span class="preview-value">${autoReg ? '是' : '否'}</span></div>${autoReg ? `<div class="preview-row"><span class="preview-label">模型名称</span><span class="preview-value${F.outNm ? '' : ' empty'}">${F.outNm || '—'}</span></div>` : ''}<div class="preview-row"><span class="preview-label">导出上限</span><span class="preview-value">${F.expLim || '—'}</span></div><div class="preview-row"><span class="preview-label">保存间隔 (Steps)</span><span class="preview-value">${F.saveInt || '—'} 步</span></div>`;
}
function previewResource() {
  const isPrivate = F.resMode === 'private';
  let html = `<div class="preview-row"><span class="preview-label">资源类型</span><span class="preview-value">${isPrivate ? '独立资源' : '公共资源'}</span></div>`;
  if (isPrivate) {
    html += `<div class="preview-row"><span class="preview-label">资源池</span><span class="preview-value${F.resPool ? '' : ' empty'}">${F.resPool}</span></div><div class="preview-row"><span class="preview-label">GPU 型号</span><span class="preview-value${F.gpuModel ? '' : ' empty'}">${F.gpuModel || '—'}</span></div><div class="preview-row"><span class="preview-label">GPU 数量</span><span class="preview-value${F.gpuC ? '' : ' empty'}">${F.gpuC ? F.gpuC + ' 卡' : '—'}</span></div>`;
  } else {
    html += `<div style="background:var(--bg3);border-radius:var(--r2);padding:20px;margin-top:8px;display:flex;align-items:center;gap:10px;font-size:13px;color:var(--t2)"><span style="font-size:18px">🌐</span><span>选择公共资源后，系统将自动分配可用 GPU 资源，无需手动配置</span></div>`;
  }
  return html;
}

// ===== EDIT RENDERERS =====
function editBasic() {
  return `<div class="fg"><label class="fl">任务名称<span class="rq">*</span></label><input class="fi${errCls('name')}" placeholder="请输入精调任务名称，支持英文、数字、中划线" maxlength="50" value="${F.name}" oninput="F.name=this.value;stepErrors=stepErrors.filter(e=>e!=='name')"/>${errTip('name','请输入任务名称')}</div><div class="fg"><label class="fl">任务描述<span class="rq">*</span></label><textarea class="fta${errCls('desc')}" placeholder="请输入任务描述，最多200字" maxlength="200" oninput="F.desc=this.value;stepErrors=stepErrors.filter(e=>e!=='desc')">${F.desc}</textarea>${errTip('desc','请输入任务描述')}</div>`;
}
function editConfig() {
  const modelErr = hasErr('model');
  const availModes = [...new Set(MD.filter(m => m.methods.includes(F.method)).flatMap(m => m.modes))];
  if (F.model && availModes.length > 0 && !availModes.includes(F.mode)) { F.mode = availModes[0] }
  let modeHtml = '';
  if (availModes.length > 0) {
    modeHtml = `<div class="fg"><label class="fl">训练方法<span class="rq">*</span></label><div class="rg">${availModes.map(m => `<label class="ri"><input type="radio" name="mode" value="${m}" ${F.mode === m ? 'checked' : ''} onchange="F.mode=this.value;renderAllCards()"/> ${m}</label>`).join('')}</div><div class="fh">LoRA 仅训练低秩适配层，速度快、资源消耗低；全量参数微调整体效果更优但资源消耗大</div></div>`;
  }
  return `<div class="fg"><label class="fl">训练类型<span class="rq">*</span></label><div class="rg"><label class="ri"><input type="radio" name="method" value="SFT" ${F.method === 'SFT' ? 'checked' : ''} onchange="F.method=this.value;F.model='';renderAllCards()"/> SFT（有监督微调）</label><label class="ri"><input type="radio" name="method" value="DPO" ${F.method === 'DPO' ? 'checked' : ''} onchange="F.method=this.value;F.model='';renderAllCards()"/> DPO（直接偏好优化）</label></div><div class="fh">SFT 适用于指令跟随、风格迁移等场景；DPO 适用于偏好对齐、安全对齐等场景</div></div>${modeHtml}<div class="fg"><label class="fl">基础模型<span class="rq">*</span></label>${modelErr ? '<div class="fe" style="display:block;margin-bottom:8px">请选择基础模型</div>' : ''}<div class="scs">${MD.filter(m => m.methods.includes(F.method) && (!F.mode || m.modes.includes(F.mode))).map(m => `<div class="sc ${F.model === m.nm ? 'on' : ''} ${modelErr ? 'err' : ''}" style="${modelErr && !F.model ? 'border-color:var(--err)' : ''}" onclick="F.model='${m.nm}';if(!MD.find(x=>x.nm==='${m.nm}').modes.includes(F.mode)){F.mode=MD.find(x=>x.nm==='${m.nm}').modes[0]}stepErrors=stepErrors.filter(e=>e!=='model');renderAllCards()"><div class="ct">${m.nm}</div><div class="cd2">${m.desc}</div></div>`).join('')}</div></div>`;
}
function editData() {
  const fl = DS.filter(d => d.type === F.method);
  const selDs = F.ds ? DS.find(d => d.nm === F.ds) : null;
  const versions = selDs ? selDs.vs : [];
  const valFl = DS.filter(d => d.type === F.method);
  const selValDs = F.valDs ? DS.find(d => d.nm === F.valDs) : null;
  const valVersions = selValDs ? selValDs.vs : [];
  let previewHtml = '';
  if (F.ds && F.dv) {
    const pData = F.method === 'SFT' ? [
      { prompt: '请总结以下文章', user: '随着AI技术的快速发展，大语言模型在各行各业的应用越来越广泛...', assistant: '本文主要讨论了大语言模型在行业中的应用现状及发展趋势' },
      { prompt: '翻译为英文', user: '今天天气很好，适合出去散步', assistant: 'The weather is nice today, suitable for a walk' },
      { prompt: '分类以下文本', user: '这款手机的电池续航能力非常出色', assistant: '科技/产品评测' },
      { prompt: '生成标题', user: '本文介绍了如何使用Python进行数据分析，包括pandas和numpy的使用技巧', assistant: 'Python数据分析入门指南' },
      { prompt: '改写句子', user: '这个方案不太好，需要改进', assistant: '该方案仍有优化空间，建议进一步完善' },
      { prompt: '提取关键词', user: '深度学习是机器学习的一个分支，基于人工神经网络进行特征学习', assistant: '深度学习, 机器学习, 神经网络, 特征学习' },
      { prompt: '问答', user: '什么是LoRA微调？', assistant: 'LoRA（Low-Rank Adaptation）是一种参数高效微调方法，通过在预训练模型的权重矩阵上添加低秩分解矩阵来减少训练参数量' },
      { prompt: '情感分析', user: '服务态度太差了，再也不来了', assistant: '负面' },
      { prompt: '续写', user: '在人工智能领域，Transformer架构的出现', assistant: '在人工智能领域，Transformer架构的出现彻底改变了自然语言处理的格局，使得大规模预训练模型成为可能' },
      { prompt: '摘要生成', user: '近日，某科技公司发布了一款新型AI芯片，据称其推理速度比上一代提升了3倍，功耗降低了40%。该芯片采用了最新的3nm工艺制程，集成了超过500亿个晶体管，支持主流的深度学习框架。', assistant: '某科技公司发布新款AI芯片，推理速度提升3倍、功耗降低40%，采用3nm工艺、超500亿晶体管' }
    ] : [
      { prompt: '哪个回答更好？', user: '解释量子计算', chosen: '量子计算利用量子叠加和纠缠等特性进行信息处理...', rejected: '量子计算就是很快的电脑' },
      { prompt: '哪个回答更好？', user: '如何学习编程', chosen: '建议从Python入门，配合项目实践逐步提升...', rejected: '编程很简单，随便学学就会' },
      { prompt: '哪个回答更好？', user: '什么是区块链', chosen: '区块链是一种去中心化的分布式账本技术...', rejected: '区块链就是比特币' },
      { prompt: '哪个回答更好？', user: '推荐一本好书', chosen: '推荐《人类简史》，从宏观视角梳理人类文明发展...', rejected: '随便一本都行' },
      { prompt: '哪个回答更好？', user: '如何提高英语口语', chosen: '多进行沉浸式练习，比如跟读、shadowing、与母语者交流...', rejected: '多背单词就行了' },
      { prompt: '哪个回答更好？', user: '解释机器学习', chosen: '机器学习是AI的子领域，通过数据驱动让系统自动改进性能...', rejected: '机器学习就是让电脑自己学' },
      { prompt: '哪个回答更好？', user: '如何保持健康', chosen: '均衡饮食、规律运动、充足睡眠是三大基石...', rejected: '少吃多运动' },
      { prompt: '哪个回答更好？', user: '什么是云原生', chosen: '云原生是一套构建和运行应用的方法论，包含容器、微服务、DevOps等...', rejected: '云原生就是上云' },
      { prompt: '哪个回答更好？', user: '怎样写好代码', chosen: '注重可读性、遵循设计模式、写好测试、持续重构...', rejected: '能跑就行' },
      { prompt: '哪个回答更好？', user: '什么是API', chosen: 'API是应用程序编程接口，定义了软件组件间交互的协议和工具...', rejected: 'API就是个网址' }
    ];
    previewHtml = `<div class="fg"><label class="fl">数据预览（前 10 条）</label><div style="border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden"><table style="font-size:12px"><thead><tr>${F.method === 'SFT' ? '<th style="padding:8px 12px;width:200px">Prompt</th><th style="padding:8px 12px;width:200px">User</th><th style="padding:8px 12px">Assistant</th>' : '<th style="padding:8px 12px;width:160px">Prompt</th><th style="padding:8px 12px;width:160px">User</th><th style="padding:8px 12px;width:200px">Chosen</th><th style="padding:8px 12px">Rejected</th>'}</tr></thead><tbody>${pData.map(r => `<tr>${F.method === 'SFT' ? `<td style="padding:6px 12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.prompt}</td><td style="padding:6px 12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.user}</td><td style="padding:6px 12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.assistant}</td>` : `<td style="padding:6px 12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.prompt}</td><td style="padding:6px 12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.user}</td><td style="padding:6px 12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.chosen}</td><td style="padding:6px 12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.rejected}</td>`}</tr>`).join('')}</tbody></table></div><div class="fh">仅展示前 10 条数据，完整数据请在数据集管理中查看</div></div>`;
  }
  let valHtml = '';
  if (F.ds && F.dv) {
    valHtml = `<div class="fg"><label class="fl">验证集<span class="rq">*</span></label><div class="rg"><label class="ri"><input type="radio" name="valMode" value="none" ${F.valMode === 'none' ? 'checked' : ''} onchange="F.valMode='none';F.valDs='';F.valDv='';renderAllCards()"/> 不使用</label><label class="ri"><input type="radio" name="valMode" value="split" ${F.valMode === 'split' ? 'checked' : ''} onchange="F.valMode='split';F.valDs='';F.valDv='';renderAllCards()"/> 分割训练集</label><label class="ri"><input type="radio" name="valMode" value="select" ${F.valMode === 'select' ? 'checked' : ''} onchange="F.valMode='select';F.valDs='';F.valDv='';renderAllCards()"/> 选择数据集</label></div></div>`;
    if (F.valMode === 'split') {
      valHtml += `<div class="fg"><label class="fl">分割比例</label><div style="display:flex;align-items:center;gap:8px"><input class="fi" type="number" min="5" max="50" step="5" value="${F.valRatio}" style="width:100px" onchange="F.valRatio=+this.value"/><span style="font-size:13px;color:var(--t2)">%（从训练集中分割该比例的数据作为验证集）</span></div><div class="fh">推荐 10%~20%，比例过大会导致训练数据不足</div></div>`;
    }
    if (F.valMode === 'select') {
      valHtml += `<div class="fg" style="margin-bottom:16px"><div style="display:grid;grid-template-columns:1fr auto;gap:0 24px;align-items:start"><div><label class="fl" style="margin-bottom:6px">验证集<span class="rq">*</span></label><select class="fs" data-cs-width="100%" onchange="F.valDs=this.value;F.valDv='';renderAllCards()"><option value="">请选择数据集</option>${valFl.map(d => `<option value="${d.nm}" ${F.valDs === d.nm ? 'selected' : ''} data-sub="${d.type} · ${d.n.toLocaleString()}条 · ${d.ow}">${d.nm}</option>`).join('')}</select></div><div>${F.valDs ? `<label class="fl" style="margin-bottom:6px">版本<span class="rq">*</span></label><select class="fs" data-cs-width="200px" onchange="F.valDv=this.value;renderAllCards()"><option value="">请选择</option>${valVersions.map(v => `<option value="${v}" ${F.valDv === v ? 'selected' : ''}>${v}</option>`).join('')}</select>` : ''}</div></div><div class="fh">选择与训练集同类型的数据集作为验证集</div></div>`;
    }
    if (F.valMode === 'split' || F.valMode === 'select') {
      valHtml += `<div class="fg"><label class="fl">评估次数</label><input class="fi" type="number" min="5" max="20" step="1" value="${F.evalCount}" style="width:100px" onchange="F.evalCount=+this.value"/><div class="fh">仅在验证集上评估的次数，取值范围 5-20</div></div>`;
    }
  }
  return `<div class="fg" style="margin-bottom:16px"><div style="display:grid;grid-template-columns:1fr auto;gap:0 24px;align-items:start"><div><label class="fl" style="margin-bottom:6px">训练集<span class="rq">*</span></label><select class="fs${errCls('ds')}" id="ds-sel" data-cs-width="100%" onchange="F.ds=this.value;F.dv='';stepErrors=stepErrors.filter(e=>e!=='ds');renderAllCards()"><option value="">请选择数据集</option>${fl.map(d => `<option value="${d.nm}" ${F.ds === d.nm ? 'selected' : ''} data-sub="${d.type} · ${d.n.toLocaleString()}条 · ${d.ow}">${d.nm}</option>`).join('')}</select>${errTip('ds','请选择训练集')}${fl.length === 0 ? '<div class="fh" style="color:var(--warn)">当前训练方式暂无可用数据集</div>' : ''}</div><div>${F.ds ? `<label class="fl" style="margin-bottom:6px">版本<span class="rq">*</span></label><select class="fs${errCls('dv')}" data-cs-width="200px" onchange="F.dv=this.value;stepErrors=stepErrors.filter(e=>e!=='dv');renderAllCards()"><option value="">请选择版本</option>${versions.map(v => `<option value="${v}" ${F.dv === v ? 'selected' : ''}>${v}</option>`).join('')}</select>${errTip('dv','请选择版本')}` : ''}</div></div><div class="fh">仅可使用已发布的数据集版本进行训练</div></div>${valHtml}${F.ds && F.dv ? previewHtml : ''}`;
}
function editParams() {
  const isLora = F.mode === 'LoRA';
  const advShown = F.advShown || false;
  return `<div class="pg2"><div class="fg"><label class="fl">学习率 (Learning Rate)<span class="rq">*</span></label><select class="fs" data-cs-radius="8px" data-cs-width="100%" onchange="F.lr=this.value">${['1e-5','5e-5','1e-4','2e-4','5e-4'].map(v => `<option value="${v}" ${F.lr === v ? 'selected' : ''}>${v}</option>`).join('')}</select><div class="fh">推荐值：LoRA 1e-4~2e-4，全量参数 5e-5~1e-4</div></div><div class="fg"><label class="fl">训练轮数 (Epochs)<span class="rq">*</span></label><input class="fi" type="number" min="1" max="50" value="${F.ep}" onchange="F.ep=+this.value"/><div class="fh">通常 3~5 轮即可收敛，过多可能过拟合</div></div><div class="fg"><label class="fl">批次大小 (Batch Size)</label><input class="fi" type="number" min="1" max="128" value="${F.bs}" onchange="F.bs=+this.value"/><div class="fh">受 GPU 显存限制，值越大显存占用越高</div></div><div class="fg"><label class="fl">最大序列长度</label><select class="fs" data-cs-radius="8px" data-cs-width="100%" onchange="F.msl=+this.value">${[512,1024,2048,4096,8192].map(v => `<option value="${v}" ${F.msl === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div><div class="fg"><label class="fl">Warmup 比例</label><input class="fi" type="number" min="0" max="0.5" step="0.01" value="${F.wr}" onchange="F.wr=+this.value"/></div><div class="fg"><label class="fl">权重衰减 (Weight Decay)</label><input class="fi" type="number" min="0" max="0.1" step="0.01" value="${F.wd}" onchange="F.wd=+this.value"/></div></div>${isLora ? `<div class="pg2" style="margin-top:16px"><div class="fg"><label class="fl">LoRA Rank (r)</label><select class="fs" data-cs-radius="8px" data-cs-width="100%" onchange="F.lrR=+this.value">${[4,8,16,32,64].map(v => `<option value="${v}" ${F.lrR === v ? 'selected' : ''}>${v}</option>`).join('')}</select><div class="fh">秩越高可学习参数越多，但显存占用也越高</div></div><div class="fg"><label class="fl">LoRA Alpha</label><input class="fi" type="number" min="1" max="128" value="${F.lrA}" onchange="F.lrA=+this.value"/><div class="fh">通常设置为 Rank 的 2 倍</div></div><div class="fg"><label class="fl">LoRA Dropout</label><input class="fi" type="number" min="0" max="0.5" step="0.01" value="${F.lrD}" onchange="F.lrD=+this.value"/></div><div class="fg"><label class="fl">目标模块</label><input class="fi" value="${F.lrT}" maxlength="100" oninput="F.lrT=this.value"/><div class="fh">逗号分隔，常见：q_proj,v_proj,k_proj,o_proj</div></div></div>` : ''}<div class="step-title-sm" onclick="F.advShown=!F.advShown;renderAllCards()"><span>高级配置</span><span class="toggle-arrow">${advShown ? '▲' : '▼'}</span></div><div class="adv-config" style="display:${advShown ? 'block' : 'none'}"><div class="fg"><label class="fl">自定义配置</label><textarea class="fta" style="height:80px;resize:vertical" placeholder="请根据需要自定义配置内容" oninput="F.advCfg=this.value">${F.advCfg || ''}</textarea><div class="fh">请根据需要自定义配置内容，可配置内容请参考<a href="javascript:void(0)" style="color:var(--primary);text-decoration:underline">配置说明</a></div></div></div>`;
}
function editOutput() {
  const autoReg = F.autoReg !== false;
  return `<div class="fg"><label class="fl">自动保存到模型管理</label><div style="display:flex;align-items:center;gap:8px"><label class="tgl"><input type="checkbox" ${autoReg ? 'checked' : ''} onchange="F.autoReg=this.checked;renderAllCards()"/><span class="tgl-s"></span></label><div class="fh" style="margin:0">精调完成后，模型将自动保存到模型管理</div></div></div>${autoReg ? `<div class="fg"><label class="fl">模型名称<span class="rq">*</span></label><input class="fi${errCls('outNm')}" placeholder="请输入产出模型名称，支持英文、数字、中划线" maxlength="50" value="${F.outNm}" oninput="F.outNm=this.value;stepErrors=stepErrors.filter(e=>e!=='outNm')"/><div class="fh">精调产出的模型在模型管理中显示的名称</div>${errTip('outNm','请输入产出模型名称')}</div>` : ''}<div class="pg2"><div class="fg"><label class="fl">导出上限</label><input class="fi" type="number" min="1" max="20" value="${F.expLim}" onchange="F.expLim=+this.value"/><div class="fh">最多保存的 Checkpoint 数量，超过时自动删除最旧的</div></div><div class="fg"><label class="fl">保存间隔 (Steps)</label><input class="fi" type="number" min="50" max="5000" step="50" value="${F.saveInt}" onchange="F.saveInt=+this.value"/><div class="fh">每隔多少步保存一次 Checkpoint</div></div></div>`;
}
function editResource() {
  const resMode = F.resMode || 'public';
  const isPrivate = resMode === 'private';
  const gpuModels = F.gpuModel || 'A100';
  const gpuPrices = { A100: 12.8, A800: 11.5, H100: 18.6 };
  const price = gpuPrices[gpuModels] || 12.8;
  const est = isPrivate ? price * F.gpuC * F.ep * 0.5 : 0;
  let resHtml = '';
  if (isPrivate) {
    resHtml = `<div class="pg2" style="margin-top:16px"><div class="fg"><label class="fl">资源池<span class="rq">*</span></label><select class="fs${errCls('resPool')}" data-cs-radius="8px" data-cs-width="100%" onchange="F.resPool=this.value;stepErrors=stepErrors.filter(e=>e!=='resPool');renderAllCards()"><option value="pool-a" ${F.resPool === 'pool-a' || !F.resPool ? 'selected' : ''}>资源池 A（A100 为主）</option><option value="pool-b" ${F.resPool === 'pool-b' ? 'selected' : ''}>资源池 B（A800 为主）</option><option value="pool-c" ${F.resPool === 'pool-c' ? 'selected' : ''}>资源池 C（H100 为主）</option></select>${errTip('resPool','请选择资源池')}</div><div class="fg"><label class="fl">GPU 型号<span class="rq">*</span></label><select class="fs${errCls('gpuModel')}" data-cs-radius="8px" data-cs-width="100%" onchange="F.gpuModel=this.value;F.gpuT=this.value;stepErrors=stepErrors.filter(e=>e!=='gpuModel');renderAllCards()">${Object.entries(gpuPrices).map(([k, v]) => `<option value="${k}" ${gpuModels === k ? 'selected' : ''}>${k} (¥${v}/卡/小时)</option>`).join('')}</select>${errTip('gpuModel','请选择 GPU 型号')}</div><div class="fg"><label class="fl">GPU 数量<span class="rq">*</span></label><select class="fs${errCls('gpuC')}" data-cs-radius="8px" data-cs-width="100%" onchange="F.gpuC=+this.value;stepErrors=stepErrors.filter(e=>e!=='gpuC');renderAllCards()">${[1, 2, 4, 8].map(v => `<option value="${v}" ${F.gpuC === v ? 'selected' : ''}>${v} 卡</option>`).join('')}</select>${errTip('gpuC','请选择 GPU 数量')}</div><div class="fg"></div></div>`;
  } else {
    resHtml = '';
  }
  return `<div class="fg"><label class="fl">资源类型<span class="rq">*</span></label><div class="rg"><label class="ri"><input type="radio" name="resMode" value="public" ${resMode === 'public' ? 'checked' : ''} onchange="F.resMode='public';renderAllCards()"/> 公共资源</label><label class="ri"><input type="radio" name="resMode" value="private" ${resMode === 'private' ? 'checked' : ''} onchange="F.resMode='private';renderAllCards()"/> 独立资源</label></div><div class="fh">公共资源由平台统一调度，按需分配；独立资源需指定资源池和 GPU 规格，适合对资源有明确要求的场景</div></div>${resHtml}`;
}

// Fee display
function updateFeeDisplay() {
  const feeEl = document.getElementById('fee-token');
  if (!feeEl) return;
  if (!(F.ds && F.dv && F.lr && F.ep)) { feeEl.textContent = '-'; return }
  const selDs = DS.find(d => d.nm === F.ds);
  const baseTokens = selDs ? selDs.n : 5000;
  const est = Math.round(baseTokens * F.ep * 256 * 1.5);
  feeEl.textContent = est.toLocaleString();
}

// ===== DETAIL =====
function renderDetail(t){
  const canStop=t.st==='pending'||t.st==='running';
  document.getElementById('d-bar-btns').innerHTML=`
    <button class="dt-btn primary" onclick="stopDetailTask('${t.id}')" ${canStop?'':'disabled'}>停止训练</button>
    <div class="more-wrap">
      <button class="dt-btn secondary" onclick="toggleMoreMenu(event)">更多</button>
      <div class="more-menu" id="more-menu">
        <div class="more-item" onclick="copyTask('${t.id}');hideMoreMenu()">复制</div>
        <div class="more-item danger" onclick="delDetailTask('${t.id}')">删除</div>
      </div>
    </div>`;
  const icoColors=['#0057FF','#9246E0','#35A04F','#FF9500','#FF3B30','#00B8D4'];
  const icoColor=icoColors[t.id.charCodeAt(t.id.length-1)%icoColors.length];
  const icoChar=t.nm.charAt(0);
  document.getElementById('d-header').innerHTML=`
    <div class="dh-wrap">
      <div class="dh-ico2" style="background:${icoColor}">${icoChar}</div>
      <div class="dh-body">
        <div class="dh-title-row">
          <span class="dh-name">${t.nm}</span>
          ${sTag(t.st)}
        </div>
        <div class="dh-meta2">
          <span>任务ID: ${t.id}</span>
          <span class="dh-div"></span>
          <span>创建人：${t.cr}</span>
          <span class="dh-div"></span>
          <span>创建时间：${t.tm}</span>
          <span class="dh-div"></span>
          <span>描述：${t.nm} - ${t.method} ${t.mode} 精调任务</span>
        </div>
      </div>
    </div>`;
  swTab('overview');
}
function ovItem(label,val){return`<div class="dsc-item"><span class="dsc-label">${label}</span><span class="dsc-val">${val||'—'}</span></div>`}
function swTab(tab){
  document.querySelectorAll('#d-tabs .dtab').forEach(e=>e.classList.toggle('on',e.textContent==={overview:'任务概览',monitor:'训练监控',logs:'训练日志',output:'模型产出'}[tab]));
  const t=dTask;
  const panels={
    overview:`
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">📋</span>任务情况</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('运行时长',t.dur||'—')}
        ${ovItem('开始时间',t.stTm||'—')}
        ${ovItem('结束时间',t.edTm||'—')}
      </div></div></div>
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">🔧</span>训练配置</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('基础模型',t.model)}
        ${ovItem('训练方式',t.method)}
        ${ovItem('训练方法',t.mode)}
      </div></div></div>
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">📊</span>数据配置</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('训练数据集',t.ds)}
        ${ovItem('数据集版本',t.dv)}
      </div></div></div>
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">⚙️</span>参数配置</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('学习率',t.lr)}
        ${ovItem('训练轮数 (Epochs)',t.ep)}
        ${ovItem('批次大小 (Batch Size)','—')}
        ${ovItem('最大序列长度','—')}
        ${ovItem('Warmup 比例','—')}
        ${ovItem('权重衰减','—')}
      </div></div></div>
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">📦</span>产出配置</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('产出模型名称',t.outNm||'—')}
        ${ovItem('保存间隔 (Steps)',t.saveInt||'—')}
        ${ovItem('导出上限',t.expLim||'—')}
      </div></div></div>
      <div class="dsc"><div class="dsc-h"><span class="dsc-ico">🖥️</span>资源配置</div><div class="dsc-b"><div class="dsc-grid">
        ${ovItem('资源类型',t.resType||'公共资源')}
        ${t.resType==='独立资源'?ovItem('资源池',t.resPool||'—'):''}
        ${t.resType==='独立资源'?ovItem('GPU 类型',t.gpuModel||'—'):''}
        ${t.resType==='独立资源'?ovItem('GPU 数量',t.gpuC?t.gpuC+' 卡':'—'):''}
      </div></div></div>`,
    monitor:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="dsc"><div class="dsc-h"><span>训练 Loss 曲线</span></div><div class="dsc-b"><div class="cht"><canvas id="lossChart"></canvas></div></div></div>
      <div class="dsc"><div class="dsc-h"><span>学习率曲线</span></div><div class="dsc-b"><div class="cht"><canvas id="lrChart"></canvas></div></div></div>
      <div class="dsc"><div class="dsc-h"><span>梯度范数</span></div><div class="dsc-b"><div class="cht"><canvas id="gradChart"></canvas></div></div></div>
      <div class="dsc"><div class="dsc-h"><span>训练准确率</span></div><div class="dsc-b"><div class="cht"><canvas id="accChart"></canvas></div></div></div>
    </div>`,
    logs:`<div class="dsc"><div class="dsc-h" style="gap:12px;flex-wrap:wrap"><input class="fi" id="log-search" placeholder="搜索关键词" oninput="filterLogs()" style="width:200px;height:28px;font-size:12px;padding:0 10px;flex:none"><select class="fs fs-auto" id="log-count" onchange="filterLogs()" style="height:28px;font-size:12px;padding:0 24px 0 8px;background-position:right 4px center;width:auto;min-width:90px"><option value="500">最近 500 条</option><option value="1000" selected>最近 1000 条</option><option value="2000">最近 2000 条</option></select><div style="display:flex;align-items:center;gap:6px;margin-left:auto"><span style="font-size:12px;color:#878F9B">自动更新</span><label class="tgl"><input type="checkbox" checked id="log-auto" onchange="toggleAutoRefresh()"><span class="tgl-s"></span></label></div></div><div class="dsc-b"><div class="log" id="logBox"></div></div></div>`,
    output:`<div class="dsc"><div class="dsc-h"><span>模型产出</span></div><div class="dsc-b"><div class="tw"><table><thead><tr><th>版本名称</th><th>Step</th><th>Loss</th><th>保存时间</th><th>模型大小</th><th>操作</th></tr></thead><tbody>${CK.map(c=>`<tr><td style="font-family:monospace;font-size:12px">${c.ver}</td><td>${c.step}</td><td>${c.loss}</td><td>${t.tm.split(' ')[0]} ${c.tm}</td><td>${c.sz}</td><td><button class="dt-btn text" style="color:var(--primary);font-size:12px" onclick="showM('提示','评测功能开发中',[{t:'知道了',c:'bp',a:'hideM()'}])">评测</button><button class="dt-btn text" style="color:var(--primary);font-size:12px;margin-left:12px" onclick="showM('提示','部署功能开发中',[{t:'知道了',c:'bp',a:'hideM()'}])">部署</button></td></tr>`).join('')}</tbody></table></div></div></div>`
  };
  document.getElementById('d-panels').innerHTML=panels[tab];
  if(tab==='monitor')setTimeout(drawCharts,50);
  if(tab==='logs')setTimeout(toggleAutoRefresh,50);
}

// Charts
function drawCharts(){
  if(typeof Chart==='undefined')return;
  const steps=CK.map(c=>c.step),losses=CK.map(c=>c.loss);
  const lrs=steps.map((_,i)=>{const v=parseFloat(F.lr);return i<2?v*(i+1)/2:i>steps.length-2?v*0.1:v});
  const grads=steps.map((_,i)=>{const base=1.2-i*1.1/(steps.length-1);return Math.max(0.05,base+(Math.random()-0.5)*0.2)});
  const accs=steps.map((_,i)=>{return 0.65+i*0.3/(steps.length-1)+(Math.random()-0.5)*0.04});
  function mkChart(id,label,data,color,ylabel,extra){
    const el=document.getElementById(id);
    if(!el)return;
    const yAxis={title:{display:true,text:ylabel}};
    if(extra)Object.assign(yAxis,extra);
    new Chart(el,{type:'line',data:{labels:steps,datasets:[{label,data,borderColor:color,backgroundColor:color+'1a',fill:true,tension:0.3,pointRadius:4,pointBackgroundColor:color}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{title:{display:true,text:'Step'}},y:yAxis}}});
  }
  mkChart('lossChart','Loss',losses,'#0057FF','Loss');
  mkChart('lrChart','Learning Rate',lrs,'#478BFF','LR');
  mkChart('gradChart','Gradient Norm',grads,'#9246E0','Norm');
  mkChart('accChart','Accuracy',accs,'#35A04F','Acc',{min:0,max:1});
}

// Logs
let logAutoRefreshTimer=null;
const logLines=[
  {t:'09:30:01',l:'li',m:'[INFO] 任务初始化完成，任务ID: ft-20260507-001'},
  {t:'09:30:02',l:'li',m:'[INFO] 基础模型加载: Qwen3-8B'},
  {t:'09:30:05',l:'li',m:'[INFO] 训练数据集加载: 客服对话训练集 > Version3 (12480 条)'},
  {t:'09:30:08',l:'li',m:'[INFO] LoRA 适配器初始化: rank=8, alpha=16, targets=q_proj,v_proj'},
  {t:'09:30:10',l:'li',m:'[INFO] GPU 分配: A100 × 2, 显存 80GB × 2'},
  {t:'09:30:12',l:'lw',m:'[WARN] 数据集存在 23 条格式异常数据，已自动跳过'},
  {t:'09:30:15',l:'li',m:'[INFO] 开始训练: epochs=3, lr=1e-4, batch_size=4'},
  {t:'09:31:20',l:'li',m:'[INFO] Epoch 1/3 - Step 100/1560 - Loss: 0.412 - Speed: 3.2 samples/s'},
  {t:'09:45:30',l:'li',m:'[INFO] Epoch 1/3 - Step 200/1560 - Loss: 0.152 - Speed: 3.4 samples/s'},
  {t:'09:45:31',l:'li',m:'[INFO] ✓ Checkpoint 已保存: step=200, loss=0.152'},
  {t:'10:15:00',l:'li',m:'[INFO] Epoch 1/3 - Step 400/1560 - Loss: 0.089'},
  {t:'10:15:01',l:'li',m:'[INFO] ✓ Checkpoint 已保存: step=400, loss=0.089'},
  {t:'10:55:00',l:'li',m:'[INFO] Epoch 1/3 - Step 600/1560 - Loss: 0.054 ★ 最优'},
  {t:'10:55:01',l:'li',m:'[INFO] ✓ Checkpoint 已保存: step=600, loss=0.054 (best)'},
  {t:'11:38:00',l:'li',m:'[INFO] Epoch 2/3 - Step 800/1560 - Loss: 0.038'},
  {t:'11:38:01',l:'li',m:'[INFO] ✓ Checkpoint 已保存: step=800, loss=0.038'},
  {t:'12:20:00',l:'li',m:'[INFO] Epoch 2/3 - Step 1000/1560 - Loss: 0.032'},
  {t:'12:20:01',l:'li',m:'[INFO] ✓ Checkpoint 已保存: step=1000, loss=0.032'},
  {t:'13:02:00',l:'li',m:'[INFO] Epoch 3/3 - Step 1560/1560 - Loss: 0.028'},
  {t:'13:02:01',l:'li',m:'[INFO] ========== 训练完成 =========='},
  {t:'13:02:02',l:'li',m:'[INFO] 最终 Loss: 0.028 | 最优 Checkpoint: step=1000, loss=0.032'},
  {t:'13:02:03',l:'li',m:'[INFO] 模型已自动注册到模型管理: 客服对话微调-V3'},
  {t:'13:02:05',l:'li',m:'[INFO] 任务状态变更为: 已完成'},
];
function fillLogs(keyword,maxLines){
  const box=document.getElementById('logBox');
  if(!box)return;
  let filtered=logLines;
  if(keyword){
    const kw=keyword.toLowerCase();
    filtered=filtered.filter(l=>l.m.toLowerCase().includes(kw));
  }
  if(maxLines&&maxLines<filtered.length)filtered=filtered.slice(-maxLines);
  box.innerHTML=filtered.map(l=>`<span class="lt">${l.t}</span> <span class="${l.l}">${l.m}</span>`).join('\n');
  box.scrollTop=box.scrollHeight;
}
function filterLogs(){
  const kw=document.getElementById('log-search').value;
  const max=parseInt(document.getElementById('log-count').value)||0;
  fillLogs(kw,max);
}
function toggleAutoRefresh(){
  const on=document.getElementById('log-auto').checked;
  if(on){
    filterLogs();
    logAutoRefreshTimer=setInterval(filterLogs,5000);
  }else{
    clearInterval(logAutoRefreshTimer);
    logAutoRefreshTimer=null;
  }
}

// ===== MODAL =====
function showM(title,body,btns){
  document.getElementById('m-tit').textContent=title;
  document.getElementById('m-body').innerHTML=body;
  document.getElementById('m-ft').innerHTML=btns.map(b=>`<button class="btn ${b.c}" onclick="${b.a}">${b.t}</button>`).join('');
  document.getElementById('mo').classList.add('sh');
}
function hideM(){document.getElementById('mo').classList.remove('sh')}

// Workspace dropdown
const wsData=[
  {id:'default',nm:'默认空间',av:'默'},
  {id:'nlp',nm:'NLP 研发空间',av:'N'},
  {id:'cv',nm:'视觉算法空间',av:'视'},
  {id:'rec',nm:'推荐系统空间',av:'推'},
  {id:'mm',nm:'多模态算法空间',av:'多'},
];
let wsCur='default';
function renderWsList(filter){
  const list=document.getElementById('ws-list');
  if(!list)return;
  const items=filter?wsData.filter(w=>w.nm.includes(filter)):wsData;
  list.innerHTML=items.map(w=>`<div class="ws-item ${w.id===wsCur?'on':''}" onclick="selectWs('${w.id}')"><span class="ws-item-av">${w.av}</span><span class="ws-item-nm">${w.nm}</span></div>`).join('');
}
function toggleWsDropdown(){
  const dd=document.getElementById('ws-dropdown');
  const sh=dd.classList.contains('sh');
  if(!sh){
    const btn=document.querySelector('.ws-btn');
    const r=btn.getBoundingClientRect();
    dd.style.top=r.top+'px';
    dd.style.left=(r.right+8)+'px';
    renderWsList();
    document.getElementById('ws-search-input').value='';
  }
  dd.classList.toggle('sh');
}
function filterWsList(val){renderWsList(val)}
function selectWs(id){
  const w=wsData.find(x=>x.id===id);if(!w)return;
  wsCur=id;
  document.getElementById('ws-name').textContent=w.nm;
  document.querySelector('.ws-av').textContent=w.av;
  document.getElementById('ws-dropdown').classList.remove('sh');
}
function createWs(){showM('创建空间','<p>请输入新空间名称：</p><input class="fi" id="new-ws-name" placeholder="空间名称" style="margin-top:8px"/>',[{t:'取消',c:'bc',a:'hideM()'},{t:'创建',c:'bp',a:"const v=document.getElementById('new-ws-name').value;if(v){wsData.push({id:'ws-'+Date.now(),nm:v,av:v.charAt(0)});selectWs(wsData[wsData.length-1].id);hideM()}"}])}
document.addEventListener('click',function(e){const dd=document.getElementById('ws-dropdown');if(dd&&dd.classList.contains('sh')&&!e.target.closest('.sb-ws')&&!e.target.closest('#ws-dropdown'))dd.classList.remove('sh')});

// Custom dropdown selects
function initCustomSelects(){
  document.querySelectorAll('select.fs').forEach(function(sel){
    if(sel.dataset.csDone)return;
    var wrap=document.createElement('div');wrap.className='cs-wrap';
    if(sel.dataset.csWidth)wrap.style.width=sel.dataset.csWidth;
    var trig=document.createElement('div');trig.className='cs-trigger';trig.setAttribute('tabindex','0');
    if(sel.dataset.csRadius)trig.style.borderRadius=sel.dataset.csRadius;
    var valEl=document.createElement('span');valEl.className='cs-value';valEl.textContent=sel.options[sel.selectedIndex].text;
    var arr=document.createElement('span');arr.className='cs-arrow';
    arr.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="%23878F9B"/></svg>';
    trig.appendChild(valEl);trig.appendChild(arr);
    var drop=document.createElement('div');drop.className='cs-dropdown';
    Array.from(sel.options).forEach(function(opt){
      var opEl=document.createElement('div');opEl.className='cs-option';
      if(opt.selected)opEl.classList.add('selected');
      opEl.dataset.value=opt.value;
      if(opt.dataset.sub){
        opEl.innerHTML='<div style="font-weight:600;color:#1A1E26;font-size:14px;line-height:1.4">'+opt.text+'</div><div class="cs-sub" style="font-size:12px;color:#878F9B;margin-top:2px;line-height:1.4">'+opt.dataset.sub+'</div>';
      }else{
        opEl.textContent=opt.text;
      }
      opEl.addEventListener('click',function(){
        sel.value=this.dataset.value;
        sel.dispatchEvent(new Event('change'));
        document.querySelectorAll('.cs-dropdown.open').forEach(function(d){d.classList.remove('open')});
      });
      drop.appendChild(opEl);
    });
    trig.addEventListener('click',function(e){
      e.stopPropagation();
      document.querySelectorAll('.cs-dropdown.open').forEach(function(d){if(d!==drop)d.classList.remove('open')});
      drop.classList.toggle('open');
    });
    wrap.appendChild(trig);wrap.appendChild(drop);
    sel.parentNode.insertBefore(wrap,sel.nextSibling);
    sel.style.display='none';
    sel.dataset.csDone='1';
    sel.addEventListener('change',function(){
      var w=this.parentNode.querySelector('.cs-wrap');
      if(!w)return;
      w.querySelector('.cs-value').textContent=this.options[this.selectedIndex].text;
      w.querySelectorAll('.cs-option').forEach(function(o){o.classList.toggle('selected',o.dataset.value===this.value)},this);
    });
  });
  document.addEventListener('click',function(){document.querySelectorAll('.cs-dropdown.open').forEach(function(d){d.classList.remove('open')})});
}
initCustomSelects();

// Init
renderList();
