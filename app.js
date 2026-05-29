
/* ── Toast Notifications ── */
var _toastContainer=(function(){var el=document.createElement('div');el.id='toastContainer';document.body.appendChild(el);return el;})();
function showToast(msg,type,duration){
  var icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
  type=type||'info';duration=duration||3200;
  var toast=document.createElement('div');toast.className='toast toast-'+type;
  var icon=document.createElement('span');icon.className='toast-icon';icon.textContent=icons[type]||'ℹ️';
  var msgEl=document.createElement('span');msgEl.className='toast-msg';msgEl.textContent=msg;
  var btn=document.createElement('button');btn.className='toast-close';btn.textContent='✕';btn.setAttribute('aria-label','關閉通知');
  toast.appendChild(icon);toast.appendChild(msgEl);toast.appendChild(btn);
  function remove(){if(toast._gone)return;toast._gone=true;toast.classList.add('removing');setTimeout(function(){if(toast.parentNode)toast.parentNode.removeChild(toast);},260);}
  btn.addEventListener('click',remove);
  _toastContainer.appendChild(toast);
  setTimeout(remove,duration);
}

/* ── Modal Accessibility ── */
var _prevFocus=null;
function _openModalA11y(overlay){
  _prevFocus=document.activeElement;
  var box=overlay.querySelector('.modal-box');
  if(!box)return;
  var focusable=Array.prototype.slice.call(box.querySelectorAll('button,input,select,textarea,[tabindex]:not([tabindex="-1"])'));
  var first=focusable[0],last=focusable[focusable.length-1];
  function trap(e){
    if(e.key!=='Tab'||!focusable.length)return;
    if(e.shiftKey){if(document.activeElement===first){e.preventDefault();if(last)last.focus();}}
    else{if(document.activeElement===last){e.preventDefault();if(first)first.focus();}}
  }
  overlay._trap=trap;
  document.addEventListener('keydown',trap);
  if(first)setTimeout(function(){first.focus();},30);
}
function _closeModalA11y(overlay){
  if(overlay._trap){document.removeEventListener('keydown',overlay._trap);overlay._trap=null;}
  if(_prevFocus&&_prevFocus.focus){try{_prevFocus.focus();}catch(e){}}
  _prevFocus=null;
}
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  var open=document.querySelector('.modal-overlay:not(.hidden)');
  if(!open)return;
  if(open.id==='shareModal')closeShareModal();
  else if(open.id==='childModal')closeModal();
  else if(open.id==='editMeasureModal')closeEditMeasureModal();
  else if(open.id==='editSuppModal')closeEditSuppModal();
});

/* ── WHO Data ── loaded from data/who.js ── */
/* WHO_H_BOY, WHO_W_BOY, WHO_H_GIRL, WHO_W_GIRL defined in data/who.js */

/* ── Supabase + DB ── loaded from db.js ── */


/* ── Photo helpers ── */
function getPhotoPath(urlOrPath){
  if(!urlOrPath)return null;
  var marker='/object/public/child-photos/';
  var idx=urlOrPath.indexOf(marker);
  if(idx!==-1)return urlOrPath.slice(idx+marker.length).split('?')[0];
  return urlOrPath.split('?')[0];
}
async function getSignedPhotoUrl(path){
  if(!path)return null;
  var r=await db.storage.from('child-photos').createSignedUrl(path,3600);
  return(r.error||!r.data)?null:r.data.signedUrl;
}

/* ── State ── */
var currentUser=null;
var children=[],currentChild=null,measurements=[],supplements=[],hChart=null,wChart=null;
var chartRangeMode='AUTO';
var editingChildId=null,selectedEmoji='⭐';
var photoInitialized=false;
var EMOJIS=['⭐','🌟','🍄','🔥','💛','🌈','🐢','🐸','👑','🦋','🌸','🐼'];
var CHILD_BG=[['#E52521','#AA1A18'],['#049CD8','#0270A0'],['#3A9D23','#1E6B10'],['#FBD000','#C89600'],['#FB8C00','#C45000'],['#8E24AA','#5E1A72']];

/* ── i18n ── loaded from i18n.js ── */


/* ── Auth ── */
// If user was previously logged in (session in localStorage), show loading overlay immediately.
// Otherwise show login screen right away — no blank wait.
var _hadPriorSession=false;
try{_hadPriorSession=!!localStorage.getItem('sb-gfvccfpzwhwvuoxffafl-auth-token');}catch(e){}
document.getElementById('homeScreen').style.display='none';
document.getElementById('childScreen').style.display='none';
if(_hadPriorSession){showLoading();document.getElementById('loginScreen').style.display='none';}
else{document.getElementById('loginScreen').style.display='';}

var _authReady=false;
async function _applySession(session){
  try{
    if(session){
      currentUser=session.user;
      document.getElementById('userEmail').textContent=currentUser.email||'';
      if(!photoInitialized){initPhoto();photoInitialized=true;}
      // If user is already viewing a child page, refresh data silently without resetting the view
      if(currentChild){
        try{children=await withTimeout(db_getChildren(),8000);}
        catch(e){console.error('load children:',e);children=[];}
        _cachePhFromChildren();
        return;
      }
      // Show home immediately so loading overlay disappears fast
      document.getElementById('loginScreen').style.display='none';
      document.getElementById('homeScreen').style.display='';
      document.getElementById('childScreen').style.display='none';
      hideLoading();
      // Load children in background after UI is visible
      try{children=await withTimeout(db_getChildren(),8000);}
      catch(e){console.error('load children:',e);children=[];}
      _cachePhFromChildren();
      _migratePhToSupabase();
      renderChildCards();
    } else {
      currentUser=null;
      document.getElementById('loginScreen').style.display='';
      document.getElementById('homeScreen').style.display='none';
      document.getElementById('childScreen').style.display='none';
      hideLoading();
    }
  }catch(e){
    console.error('auth state error:',e);
    document.getElementById('loginScreen').style.display='';
    document.getElementById('homeScreen').style.display='none';
    hideLoading();
  }
}

/* ── Mobile Form UX ── */
function setupMobileFormUX(){
  // Enter → next field for measurement form; last field → submit
  var mFields=['measureDate','measureHeight','measureWeight','measureNote'];
  mFields.forEach(function(id,i){
    var el=document.getElementById(id);
    if(!el)return;
    el.addEventListener('keydown',function(e){
      if(e.key!=='Enter')return;
      e.preventDefault();
      if(i<mFields.length-1){document.getElementById(mFields[i+1]).focus();}
      else{addMeasurement();}
    });
  });
  // Scroll focused input into view on touch devices (prevents keyboard overlap)
  if(!('ontouchstart' in window))return;
  document.addEventListener('focusin',function(e){
    var el=e.target;
    if(el.tagName!=='INPUT'&&el.tagName!=='SELECT'&&el.tagName!=='TEXTAREA')return;
    setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'center'});},300);
  });
}
function setupChildFormKeyNav(){
  var cFields=['childName','childBirthday','childGender','fatherHeight','motherHeight'];
  cFields.forEach(function(id,i){
    var el=document.getElementById(id);
    if(!el||el.dataset.keyinit)return;
    el.dataset.keyinit='1';
    el.addEventListener('keydown',function(e){
      if(e.key!=='Enter')return;
      e.preventDefault();
      if(i<cFields.length-1){var nx=document.getElementById(cFields[i+1]);if(nx)nx.focus();}
      else{saveChild();}
    });
  });
}

// getSession() reliably processes OAuth redirect hash on page load
db.auth.getSession().then(function(r){
  _authReady=true;
  _applySession((r.data&&r.data.session)||null);
  setupMobileFormUX();
});

// Handle future sign-in / sign-out events only
db.auth.onAuthStateChange(async function(event,session){
  // INITIAL_SESSION is handled by getSession() above; TOKEN_REFRESHED is silent
  if(event==='TOKEN_REFRESHED'||event==='INITIAL_SESSION') return;
  if(!_authReady) return; // getSession() hasn't resolved yet — it will handle init
  // Avoid re-loading when user is already browsing (home or child screen)
  if(event==='SIGNED_IN'&&(document.getElementById('homeScreen').style.display!=='none'||document.getElementById('childScreen').style.display!=='none')) return;
  showLoading();
  await _applySession(session);
});

async function signIn(){
  await db.auth.signInWithOAuth({provider:'google',options:{redirectTo:'https://elenahsieh616.github.io/kids-growup-tracker-fireworks/'}});
}
async function signOut(){
  if(!confirm('確定要登出嗎？')) return;
  await db.auth.signOut();
}
async function deleteAccount(){
  if(!confirm(t('deleteAccountWarn'))) return;
  var typed=window.prompt(t('deleteAccountPrompt'),'');
  if(typed!==t('deleteAccountWord')){showToast(t('deleteAccountCancel'),'warning');return;}
  showLoading();
  try{
    var owned=(children||[]).filter(function(c){return c._isOwner;});
    for(var i=0;i<owned.length;i++) await db_deleteChild(owned[i].id);
    if(currentUser&&currentUser.email) await db.from('child_shares').delete().eq('shared_with_email',currentUser.email);
    var toRemove=[];
    for(var k=0;k<localStorage.length;k++){var key=localStorage.key(k);if(key)toRemove.push(key);}
    toRemove.forEach(function(k){try{localStorage.removeItem(k);}catch(e){}});
    hideLoading();
    showToast(t('deleteAccountOk'),'success');
    await db.auth.signOut();
  }catch(e){hideLoading();showToast(t('deleteAccountFail')+(e.message||e),'error');}
}
function exportJSON(){
  if(!currentChild){return;}
  var payload={version:1,app:'kids-growth-tracker',exportedAt:new Date().toISOString(),
    child:{name:currentChild.name,birthday:currentChild.birthday,gender:currentChild.gender,emoji:currentChild.emoji||'',father_height:currentChild.father_height||null,mother_height:currentChild.mother_height||null},
    measurements:measurements.map(function(m){return{date:m.date,height:parseFloat(m.height),weight:parseFloat(m.weight),note:m.note||''};}),
    supplements:supplements.map(function(s){return{date:s.date,type:s.type,name:s.name,note:s.note||''};})
  };
  var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=(currentChild.name||'child')+'_growth_'+new Date().toISOString().slice(0,10)+'.json';
  a.click();URL.revokeObjectURL(a.href);
}
function importJSON(){
  if(!currentChild){return;}
  var inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=async function(e){
    var file=e.target.files[0];if(!file)return;
    try{
      var text=await file.text();
      var data=JSON.parse(text);
      if(!data.version||data.app!=='kids-growth-tracker'){showToast(t('importInvalid'),'error');return;}
      if(data.version>1){if(!confirm(t('importNewVer')))return;}
      var newMs=(data.measurements||[]).filter(function(m){return m.date&&isFinite(parseFloat(m.height))&&isFinite(parseFloat(m.weight));});
      var newSs=(data.supplements||[]).filter(function(s){return s.date&&s.name;});
      var exDates=new Set(measurements.map(function(m){return m.date;}));
      var toMs=newMs.filter(function(m){return!exDates.has(m.date);});
      var exSKey=new Set(supplements.map(function(s){return s.name+'|'+s.date;}));
      var toSs=newSs.filter(function(s){return!exSKey.has(s.name+'|'+s.date);});
      if(!toMs.length&&!toSs.length){showToast(t('importNone'),'warning');return;}
      var _fmt=function(s,o){return s.replace(/\{(\w+)\}/g,function(_,k){return o[k]!==undefined?o[k]:_;});};
      if(!confirm(_fmt(t('importConfirm'),{m:toMs.length,s:toSs.length})))return;
      showLoading();
      var addedMs=0,addedSs=0;
      try{
        if(toMs.length){var ins=await db_insertMBatch(toMs);measurements=measurements.concat(ins).sort(function(a,b){return b.date.localeCompare(a.date);});addedMs=ins.length;}
        for(var i=0;i<toSs.length;i++){
          var s=toSs[i];
          var r=await db.from('supplements').insert({date:s.date,type:s.type||'其他',name:s.name,note:s.note||null,child_id:currentChild.id}).select('id,date,type,name,note').single();
          if(r.data){supplements.push(r.data);addedSs++;}
        }
        supplements.sort(function(a,b){return b.date.localeCompare(a.date);});
        hideLoading();
        showToast(_fmt(t('importOk'),{m:addedMs,s:addedSs}),'success');
        renderRecords();renderGrowthAnalysis();renderCharts();renderSuppCorrelation();updateHeroStats();
      }catch(err){hideLoading();showToast(t('importFail')+(err.message||err),'error');}
    }catch(e){showToast(t('importReadFail')+e.message,'error');}
  };
  inp.click();
}

/* ── DB helpers ── loaded from db.js ── */

/* ── Edit Measurement ── */
function editMeasurement(id){
  var m=measurements.find(function(m){return m.id===id;});
  if(!m)return;
  document.getElementById('editMeasureId').value=id;
  document.getElementById('editMeasureDate').value=m.date;
  document.getElementById('editMeasureHeight').value=m.height;
  document.getElementById('editMeasureWeight').value=m.weight;
  document.getElementById('editMeasureNote').value=m.note||'';
  var ov=document.getElementById('editMeasureModal');
  ov.classList.remove('hidden');
  _openModalA11y(ov);
}
function closeEditMeasureModal(){var ov=document.getElementById('editMeasureModal');ov.classList.add('hidden');_closeModalA11y(ov);}
async function saveMeasurementEdit(){
  var id=document.getElementById('editMeasureId').value;
  var date=document.getElementById('editMeasureDate').value;
  var height=parseFloat(document.getElementById('editMeasureHeight').value);
  var weight=parseFloat(document.getElementById('editMeasureWeight').value);
  var note=document.getElementById('editMeasureNote').value.trim();
  if(!date||isNaN(height)||isNaN(weight)){showToast(t('mRequire'),'error');return;}
  if(height<40||height>200){showToast(t('mHeightRange'),'error');return;}
  if(weight<2||weight>100){showToast(t('mWeightRange'),'error');return;}
  showLoading();
  try{
    await db_updateM(id,{date:date,height:height,weight:weight,note:note||null});
    var idx=measurements.findIndex(function(m){return m.id===id;});
    if(idx>=0)Object.assign(measurements[idx],{date:date,height:height,weight:weight,note:note});
    measurements.sort(function(a,b){return b.date.localeCompare(a.date);});
  }catch(e){showToast(t('mEditFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  closeEditMeasureModal();
  renderRecords();renderGrowthAnalysis();renderCharts();updateHeroStats();
}

/* ── Edit Supplement ── */
function editSupplement(id){
  var s=supplements.find(function(s){return s.id===id;});
  if(!s)return;
  document.getElementById('editSuppId').value=id;
  document.getElementById('editSuppDate').value=s.date;
  document.getElementById('editSuppType').value=s.type;
  document.getElementById('editSuppName').value=s.name;
  document.getElementById('editSuppNote').value=s.note||'';
  var ov=document.getElementById('editSuppModal');
  ov.classList.remove('hidden');
  _openModalA11y(ov);
}
function closeEditSuppModal(){var ov=document.getElementById('editSuppModal');ov.classList.add('hidden');_closeModalA11y(ov);}
async function saveSupplementEdit(){
  var id=document.getElementById('editSuppId').value;
  var date=document.getElementById('editSuppDate').value;
  var type=document.getElementById('editSuppType').value;
  var name=document.getElementById('editSuppName').value.trim();
  var note=document.getElementById('editSuppNote').value.trim();
  if(!date||!name){showToast(t('sRequire'),'error');return;}
  showLoading();
  try{
    await db_updateS(id,{date:date,type:type,name:name,note:note||null});
    var idx=supplements.findIndex(function(s){return s.id===id;});
    if(idx>=0)Object.assign(supplements[idx],{date:date,type:type,name:name,note:note});
    supplements.sort(function(a,b){return b.date.localeCompare(a.date);});
  }catch(e){showToast(t('sEditFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  closeEditSuppModal();
  renderSupplements();renderSuppCorrelation();renderCharts();
}

/* ── Photo ── */
function initPhoto(){
  function triggerPhoto(){if(currentChild&&!currentChild._isOwner)return;document.getElementById('photoFileInput').click();}
  var ring=document.getElementById('photoRing');
  ring.addEventListener('click',triggerPhoto);
  ring.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();triggerPhoto();}});
  document.getElementById('photoFileInput').addEventListener('change',async function(){
    var file=this.files[0];if(!file)return;
    showLoading();
    try{await uploadPhoto(file);}
    catch(e){showToast('照片上傳失敗，請重試','error');}
    finally{hideLoading();this.value='';}
  });
}
async function uploadPhoto(file){
  if(!currentChild||!currentUser)return;
  var path=currentUser.id+'/'+currentChild.id+'.jpg';
  var blob=await compressToBlob(file);
  var up=await db.storage.from('child-photos').upload(path,blob,{upsert:true,contentType:'image/jpeg'});
  if(up.error){throw up.error;}
  await db.from('children').update({photo_url:path}).eq('id',currentChild.id);
  currentChild.photo_url=path;
  var signedUrl=await getSignedPhotoUrl(path);
  if(signedUrl)showPhoto(signedUrl);
}
function compressToBlob(file){
  return new Promise(function(resolve){
    var reader=new FileReader();
    reader.onload=function(e){
      var img=new Image();
      img.onload=function(){
        var canvas=document.createElement('canvas');
        var max=400,w=img.width,h=img.height;
        if(w>h){if(w>max){h=Math.round(h*max/w);w=max;}}
        else{if(h>max){w=Math.round(w*max/h);h=max;}}
        canvas.width=w;canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        canvas.toBlob(function(blob){resolve(blob);},'image/jpeg',0.75);
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
function showPhoto(src){var img=document.getElementById('heroPhoto');img.src=src;img.style.display='block';document.getElementById('photoPlaceholder').style.display='none';}
function clearPhoto(){document.getElementById('heroPhoto').style.display='none';document.getElementById('heroPhoto').src='';document.getElementById('photoPlaceholder').style.display='';}

/* ── Home ── */
function withTimeout(promise,ms){
  return Promise.race([promise,new Promise(function(_,rej){setTimeout(function(){rej(new Error('timeout'));},ms);})]);
}
async function showHome(){
  currentChild=null;measurements=[];supplements=[];chartRangeMode='AUTO';
  if(hChart){hChart.destroy();hChart=null;}
  if(wChart){wChart.destroy();wChart=null;}
  document.getElementById('childScreen').style.display='none';
  document.getElementById('homeScreen').style.display='';
  showLoading();
  try{children=await withTimeout(db_getChildren(),8000);}
  catch(e){console.error('showHome err:',e);children=[];}
  finally{hideLoading();}
  renderChildCards();
}

function renderChildCards(){
  var grid=document.getElementById('childGrid');
  var html=children.length===0?'<div class="empty" style="grid-column:1/-1;padding-bottom:12px;">'+t('noChildTitle')+'<span class="empty-sub">'+t('noChildSub')+'</span></div>':'';
  html+=children.map(function(child,idx){
    var bg=CHILD_BG[idx%CHILD_BG.length];
    var topBtns=child._isOwner
      ?'<button class="child-edit-btn" onclick="event.stopPropagation();openEditModal(\''+child.id+'\')">✏️</button>'+
        '<button class="share-btn" onclick="event.stopPropagation();openShareModal(\''+child.id+'\')">'+t('shareBtn')+'</button>'
      :'<span class="shared-badge">'+t('sharedBadge')+'</span>';
    return '<div class="child-card" onclick="enterChild(\''+child.id+'\')">' +
      topBtns+
      '<div class="child-avatar" id="avatar-'+child.id+'" style="background:linear-gradient(135deg,'+bg[0]+' 0%,'+bg[1]+' 100%);">'+child.emoji+'</div>'+
      '<div class="child-name">'+esc(child.name)+'</div>'+
      '<div class="child-age">'+fmtAgeFull(child.birthday)+'</div>'+
      '<div class="child-gender-badge" style="background:'+(child.gender==='男'?'#C4ECFF':'#FFD6D5')+';color:var(--ink);">'+(child.gender==='男'?t('maleBadge'):t('femaleBadge'))+'</div>'+
      '</div>';
  }).join('');
  html+='<div class="add-card" onclick="openAddModal()"><div class="add-card-icon">⭐</div><div class="add-card-text">'+t('addChild')+'</div></div>';
  grid.innerHTML=html;
  loadChildPhotos();
}
function loadChildPhotos(){
  children.forEach(function(child){
    if(!child.photo_url)return;
    getSignedPhotoUrl(getPhotoPath(child.photo_url)).then(function(url){
      if(!url)return;
      var el=document.getElementById('avatar-'+child.id);
      if(el)el.innerHTML='<img src="'+url+'" style="width:100%;height:100%;object-fit:cover;" alt="">';
    });
  });
}

/* ── Child Entry ── */
async function enterChild(childId){
  currentChild=children.find(function(c){return c.id===childId;});
  if(!currentChild)return;
  chartRangeMode='AUTO';
  document.querySelectorAll('.crb').forEach(function(b){b.classList.remove('active');});
  document.getElementById('homeScreen').style.display='none';
  document.getElementById('childScreen').style.display='block';
  window.scrollTo(0,0);
  document.querySelectorAll('.tab-content').forEach(function(el){el.classList.remove('active');});
  document.getElementById('tab-records').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.nav-btn')[0].classList.add('active');
  updateHeroFromChild();
  var today=new Date().toISOString().split('T')[0];
  document.getElementById('measureDate').value=today;
  document.getElementById('suppDate').value=today;
  showLoading();
  try{
    measurements=await db_getM(childId);
    supplements=await db_getS(childId);
  }finally{hideLoading();}
  renderRecords();renderGrowthAnalysis();updateHeroStats();
  renderSupplements();renderSuppCorrelation();
  if(currentChild.photo_url){
    getSignedPhotoUrl(getPhotoPath(currentChild.photo_url)).then(function(url){if(url)showPhoto(url);});
  }else{clearPhoto();}
}

function updateHeroFromChild(){
  if(!currentChild)return;
  document.getElementById('heroEmoji').textContent=currentChild.emoji;
  document.getElementById('heroName').textContent=currentChild.name;
  document.getElementById('heroAge').textContent=
    currentChild.birthday.replace(/-/g,'/')+'  '+t('birthday')+'・'+fmtAgeFull(currentChild.birthday)+'・'+(currentChild.gender==='男'?t('male'):t('female'));
  document.getElementById('statAge').textContent=fmtAgeYear(currentChild.birthday);
  document.getElementById('statHeight').textContent='—';
  document.getElementById('statWeight').textContent='—';
  var hint=document.querySelector('.ph-hint');
  var editLayer=document.querySelector('.photo-ring .edit-layer');
  if(currentChild._isOwner){
    if(hint)hint.style.display='';
    if(editLayer)editLayer.style.display='';
  } else {
    if(hint)hint.style.display='none';
    if(editLayer)editLayer.style.display='none';
  }
}
function updateHeroStats(){
  if(!measurements.length)return;
  var l=measurements[0];
  var hEl=document.getElementById('statHeight');
  var wEl=document.getElementById('statWeight');
  if(hEl.textContent!==String(l.height)){bounceEl(hEl);}
  if(wEl.textContent!==String(l.weight)){bounceEl(wEl);}
  hEl.textContent=l.height;
  wEl.textContent=l.weight;
}

function bounceEl(el){
  if(!el)return;
  el.classList.remove('num-bounce');
  void el.offsetWidth;
  el.classList.add('num-bounce');
  setTimeout(function(){el.classList.remove('num-bounce');},500);
}

/* ── Child Modal ── */
function getParentHeights(childId){try{var v=localStorage.getItem('ph_'+childId);return v?JSON.parse(v):{father:null,mother:null};}catch(e){return{father:null,mother:null};}}
function setParentHeights(childId,f,m){try{localStorage.setItem('ph_'+childId,JSON.stringify({father:parseFloat(f)||null,mother:parseFloat(m)||null}));}catch(e){console.warn('localStorage write fail:',e);}}
function _cachePhFromChildren(){
  children.forEach(function(c){
    if(c.father_height!=null||c.mother_height!=null){
      localStorage.setItem('ph_'+c.id,JSON.stringify({father:c.father_height||null,mother:c.mother_height||null}));
    }
  });
}
async function _migratePhToSupabase(){
  var tasks=[];
  children.forEach(function(c){
    if(c.father_height!=null||c.mother_height!=null) return; // already in Supabase
    var ph=getParentHeights(c.id);
    if(ph.father==null&&ph.mother==null) return; // nothing in localStorage either
    tasks.push(db_updateChild(c.id,{father_height:ph.father,mother_height:ph.mother}).then(function(){
      c.father_height=ph.father; c.mother_height=ph.mother;
    }).catch(function(e){console.warn('ph migrate fail',c.id,e);}));
  });
  if(tasks.length) await Promise.all(tasks);
}
function openAddModal(){
  editingChildId=null;selectedEmoji=EMOJIS[0];
  document.getElementById('modalTitle').textContent=t('addChildTitle');
  document.getElementById('childName').value='';
  document.getElementById('childBirthday').value='';
  document.getElementById('childGender').value='男';
  document.getElementById('fatherHeight').value='';
  document.getElementById('motherHeight').value='';
  document.getElementById('deleteChildBtn').style.display='none';
  renderEmojiGrid();
  var _cmOv=document.getElementById('childModal');
  _cmOv.classList.remove('hidden');
  _openModalA11y(_cmOv);
  setupChildFormKeyNav();
}
function openEditModal(childId){
  var child=children.find(function(c){return c.id===childId;});if(!child)return;
  editingChildId=childId;selectedEmoji=child.emoji||EMOJIS[0];
  document.getElementById('modalTitle').textContent=t('editChildTitle');
  document.getElementById('childName').value=child.name;
  document.getElementById('childBirthday').value=child.birthday;
  document.getElementById('childGender').value=child.gender;
  document.getElementById('fatherHeight').value=child.father_height||getParentHeights(childId).father||'';
  document.getElementById('motherHeight').value=child.mother_height||getParentHeights(childId).mother||'';
  document.getElementById('deleteChildBtn').style.display='';
  renderEmojiGrid();
  var _emOv=document.getElementById('childModal');
  _emOv.classList.remove('hidden');
  _openModalA11y(_emOv);
  setupChildFormKeyNav();
}
function renderEmojiGrid(){
  document.getElementById('emojiGrid').innerHTML=EMOJIS.map(function(e){
    return '<div class="emoji-opt'+(e===selectedEmoji?' selected':'')+'" onclick="selectEmoji(\''+e+'\')">'+e+'</div>';
  }).join('');
}
function selectEmoji(e){selectedEmoji=e;renderEmojiGrid();}
function closeModal(){var ov=document.getElementById('childModal');ov.classList.add('hidden');_closeModalA11y(ov);}

async function saveChild(){
  var name=document.getElementById('childName').value.trim();
  var birthday=document.getElementById('childBirthday').value;
  var gender=document.getElementById('childGender').value;
  var fH=document.getElementById('fatherHeight').value;
  var mH=document.getElementById('motherHeight').value;
  if(!name||!birthday){showToast(t('childSaveRequire'),'error');return;}
  showLoading();
  try{
    var fVal=parseFloat(fH)||null,mVal=parseFloat(mH)||null;
    if(editingChildId){
      await db_updateChild(editingChildId,{name:name,birthday:birthday,gender:gender,emoji:selectedEmoji,father_height:fVal,mother_height:mVal});
      setParentHeights(editingChildId,fH,mH);
      var idx=children.findIndex(function(c){return c.id===editingChildId;});
      if(idx>=0) Object.assign(children[idx],{name:name,birthday:birthday,gender:gender,emoji:selectedEmoji,father_height:fVal,mother_height:mVal});
      if(currentChild&&currentChild.id===editingChildId) Object.assign(currentChild,{name:name,birthday:birthday,gender:gender,emoji:selectedEmoji,father_height:fVal,mother_height:mVal});
    } else {
      var newChild=await db_insertChild({name:name,birthday:birthday,gender:gender,emoji:selectedEmoji,father_height:fVal,mother_height:mVal});
      setParentHeights(newChild.id,fH,mH);
      children.push(newChild);
    }
  } catch(e){showToast(t('childSaveFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  closeModal();showHome();
}

async function deleteChildConfirm(){
  if(!editingChildId)return;
  var child=children.find(function(c){return c.id===editingChildId;});
  var childName=child?child.name:(currentLang==='en'?'this child':'此寶貝');
  var msg=currentLang==='en'?'Delete all data for "'+childName+'"?\nThis cannot be undone!'
    :'確定要刪除「'+childName+'」的所有資料嗎？\n此操作無法還原！';
  if(!confirm(msg))return;
  showLoading();
  try{
    await db_deleteChild(editingChildId);
    children=children.filter(function(c){return c.id!==editingChildId;});
  } catch(e){showToast(t('childDeleteFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();closeModal();showHome();
}

/* ── Measurements ── */
async function addMeasurement(){
  if(!currentChild)return;
  var date=document.getElementById('measureDate').value;
  var height=parseFloat(document.getElementById('measureHeight').value);
  var weight=parseFloat(document.getElementById('measureWeight').value);
  var note=document.getElementById('measureNote').value.trim();
  if(!date||isNaN(height)||isNaN(weight)){showToast(t('mRequire'),'error');return;}
  if(height<40||height>200){showToast(t('mHeightRange'),'error');return;}
  if(weight<2||weight>100){showToast(t('mWeightRange'),'error');return;}
  var today=new Date();today.setHours(23,59,59,999);
  if(new Date(date)>today){showToast(t('mFutureDate'),'error');return;}
  if(currentChild.birthday&&new Date(date)<new Date(currentChild.birthday)){showToast(t('mBeforeBirthday'),'error');return;}
  if(measurements.some(function(m){return m.date===date;})){if(!confirm(t('mDupDate')))return;}
  // Soft warning: anomaly detection
  var _prevMs=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);}).filter(function(m){return m.date<date;});
  if(_prevMs.length>0){
    var _prev=_prevMs[_prevMs.length-1];
    var _hd=height-parseFloat(_prev.height);
    var _days=(new Date(date)-new Date(_prev.date))/86400000;
    var _wd=Math.abs(weight-parseFloat(_prev.weight));
    var _fmt=function(s,o){return s.replace(/\{(\w+)\}/g,function(_,k){return o[k]!==undefined?o[k]:_;});};
    if(_hd<-0.5){if(!confirm(_fmt(t('mSoftWarnDecrease'),{d:Math.abs(_hd).toFixed(1),h:_prev.height,date:fmtDate(_prev.date)})))return;}
    else if(_hd>8&&_days<60){if(!confirm(_fmt(t('mSoftWarnJump'),{d:_hd.toFixed(1),days:Math.round(_days)})))return;}
    if(_wd>3&&_days<60){if(!confirm(_fmt(t('mSoftWarnWeight'),{d:_wd.toFixed(1),days:Math.round(_days)})))return;}
  }
  showLoading();
  try{
    var newM=await db_insertM({date:date,height:height,weight:weight,note:note});
    measurements.push(newM);
    measurements.sort(function(a,b){return b.date.localeCompare(a.date);});
  } catch(e){showToast(t('mSaveFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  document.getElementById('measureHeight').value='';
  document.getElementById('measureWeight').value='';
  document.getElementById('measureNote').value='';
  renderRecords();renderGrowthAnalysis();renderCharts();updateHeroStats();
}
async function deleteMeasurement(id){
  if(!confirm(t('mDeleteConfirm')))return;
  showLoading();
  try{
    await db_deleteM(id);
    measurements=measurements.filter(function(m){return m.id!==id;});
  } catch(e){showToast(t('mDeleteFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  renderRecords();renderGrowthAnalysis();renderCharts();updateHeroStats();
}
function addBatchRow(){
  var d=document.createElement('div');d.className='batch-row';
  d.innerHTML='<input type="date" class="b-date"><input type="number" placeholder="'+t('heightCm')+'" step="0.1" class="b-height" inputmode="decimal"><input type="number" placeholder="'+t('weightKg')+'" step="0.1" class="b-weight" inputmode="decimal"><input type="text" placeholder="'+t('batchSrcPlaceholder')+'" class="b-note" autocomplete="off"><button class="btn btn-danger" onclick="removeBatchRow(this)">✕</button>';
  document.getElementById('batchRows').appendChild(d);
}
function removeBatchRow(btn){
  if(document.querySelectorAll('.batch-row').length<=1){showToast(t('batchKeepOne'),'warning');return;}
  btn.closest('.batch-row').remove();
}
async function importBatch(){
  if(!currentChild)return;
  var records=[];
  document.querySelectorAll('.batch-row').forEach(function(row){
    var d=row.querySelector('.b-date').value,h=parseFloat(row.querySelector('.b-height').value),w=parseFloat(row.querySelector('.b-weight').value),n=row.querySelector('.b-note').value.trim();
    if(d&&!isNaN(h)&&!isNaN(w))records.push({date:d,height:h,weight:w,note:n||t('batchSource')});
  });
  if(!records.length){showToast(t('batchRequire'),'warning');return;}
  if(!confirm(currentLang==='en'?'Import '+records.length+' record(s)?':'確定要匯入 '+records.length+' 筆資料嗎？'))return;
  showLoading();
  try{
    var newMs=await db_insertMBatch(records);
    measurements=measurements.concat(newMs).sort(function(a,b){return b.date.localeCompare(a.date);});
  } catch(e){showToast(t('batchImportFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  document.getElementById('batchRows').innerHTML='<div class="batch-row"><input type="date" class="b-date"><input type="number" placeholder="'+t('heightCm')+'" step="0.1" class="b-height" inputmode="decimal"><input type="number" placeholder="'+t('weightKg')+'" step="0.1" class="b-weight" inputmode="decimal"><input type="text" placeholder="'+t('batchSrcPlaceholder')+'" class="b-note" autocomplete="off"><button class="btn btn-danger" onclick="removeBatchRow(this)">✕</button></div>';
  renderRecords();renderGrowthAnalysis();renderCharts();updateHeroStats();
  showToast(currentLang==='en'?'✅ Successfully imported '+records.length+' record(s)!':'✅ 成功匯入 '+records.length+' 筆！','success');
}

/* ── Supplements ── */
async function addSupplement(){
  if(!currentChild)return;
  var date=document.getElementById('suppDate').value;
  var type=document.getElementById('suppType').value;
  var name=document.getElementById('suppName').value.trim();
  var note=document.getElementById('suppNote').value.trim();
  if(!date||!name){showToast(t('sRequire'),'error');return;}
  showLoading();
  try{
    var newS=await db_insertS({date:date,type:type,name:name,note:note});
    supplements.push(newS);
    supplements.sort(function(a,b){return b.date.localeCompare(a.date);});
  } catch(e){showToast(t('sSaveFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  document.getElementById('suppName').value='';document.getElementById('suppNote').value='';
  renderSupplements();renderSuppCorrelation();
}
async function deleteSupplement(id){
  if(!confirm(t('sDeleteConfirm')))return;
  showLoading();
  try{
    await db_deleteS(id);
    supplements=supplements.filter(function(s){return s.id!==id;});
  } catch(e){showToast(t('sDeleteFail')+(e.message||e),'error');hideLoading();return;}
  hideLoading();
  renderSupplements();renderSuppCorrelation();
}

/* ── Render ── */
function renderRecords(){
  var el=document.getElementById('recordsList');
  if(!measurements.length){el.innerHTML='<div class="empty">'+t('recordsEmpty')+'<span class="empty-sub">'+t('recordsEmptySub')+'</span></div>';return;}
  el.innerHTML='<div class="table-wrap"><table><thead><tr><th>'+t('tDate')+'</th><th>'+t('tMonthAge')+'</th><th>'+t('tHeight')+'</th><th>'+t('tWeight')+'</th><th>BMI</th><th>'+t('tNote')+'</th><th></th></tr></thead><tbody>'+
    measurements.map(function(m){
      var bmi=(m.weight/Math.pow(m.height/100,2)).toFixed(1);
      return '<tr><td>'+fmtDate(m.date)+'</td><td>'+fmtAgeFull(currentChild.birthday,m.date)+'</td><td><strong>'+m.height+'</strong> cm</td><td><strong>'+m.weight+'</strong> kg</td><td>'+bmi+'</td><td style="color:#AAA;font-size:0.8em;">'+esc(m.note||'—')+'</td><td style="white-space:nowrap;"><button class="btn btn-secondary" style="font-size:0.65em;padding:5px 9px;margin-right:4px;min-height:36px;" onclick="editMeasurement(\''+m.id+'\')">✏️</button><button class="btn btn-danger" onclick="deleteMeasurement(\''+m.id+'\')">'+t('tDelete')+'</button></td></tr>';
    }).join('')+'</tbody></table></div>';
}
function renderSupplements(){
  var el=document.getElementById('supplementsList');
  if(!supplements.length){el.innerHTML='<div class="empty">'+t('suppEmpty')+'<span class="empty-sub">'+t('suppEmptySub')+'</span></div>';return;}
  var ts={'保健品':'background:#BFEFB2;color:#1A6B0A','營養品':'background:#C4ECFF;color:#0270A0','成長飲品':'background:#FFE0B2;color:#C45000','配方奶':'background:#FFD6D5;color:#B01010','其他':'background:#F0EACF;color:#6B4C2A'};
  var typeLabels={};['保健品','營養品','成長飲品','配方奶','其他'].forEach(function(k,i){typeLabels[k]=t('suppTypes')[i]||k;});
  el.innerHTML=supplements.map(function(s){
    return '<div class="supp-item"><div class="supp-row1"><div><span class="supp-tag" style="'+(ts[s.type]||ts['其他'])+'">'+(typeLabels[s.type]||s.type)+'</span><span class="supp-name">'+esc(s.name)+'</span></div><div style="display:flex;gap:6px;flex-shrink:0;"><button class="btn btn-secondary" style="font-size:0.65em;padding:5px 9px;min-height:36px;" onclick="editSupplement(\''+s.id+'\')">✏️</button><button class="btn btn-danger" onclick="deleteSupplement(\''+s.id+'\')">'+t('tDelete')+'</button></div></div><div class="supp-date">⭐ '+fmtDate(s.date)+'</div>'+(s.note?'<div class="supp-note">'+esc(s.note)+'</div>':'')+'</div>';
  }).join('');
}
function renderGrowthAnalysis(){
  var aEl=document.getElementById('growthAlerts'),sEl=document.getElementById('growthStats');
  if(measurements.length<2){aEl.innerHTML='<div class="alert alert-info">'+t('gaMin2')+'</div>';sEl.innerHTML='';return;}
  var sorted=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);});
  var latest=sorted[sorted.length-1],latestAge=getAgeMonths(latest.date),latestDate=new Date(latest.date);
  var ref=null,bestDiff=Infinity;
  sorted.slice(0,-1).forEach(function(m){var days=(latestDate-new Date(m.date))/86400000;if(days>=60&&Math.abs(days-365)<bestDiff){bestDiff=Math.abs(days-365);ref=m;}});
  if(!ref){aEl.innerHTML='<div class="alert alert-info">'+t('gaNotEnough')+'</div>';sEl.innerHTML='';return;}
  var days=(latestDate-new Date(ref.date))/86400000,months=(days/30).toFixed(1);
  var hDiff=(latest.height-ref.height).toFixed(1),wDiff=(latest.weight-ref.weight).toFixed(1);
  var annualH=(parseFloat(hDiff)/days*365).toFixed(1),thresh=getMinGrowth(latestAge-parseFloat(months)/2);
  var annualW=(parseFloat(wDiff)/days*365).toFixed(1);
  var ok=parseFloat(annualH)>=thresh.min,gap=(thresh.min-parseFloat(annualH)).toFixed(1);
  var whoH=currentChild&&currentChild.gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var whoW=currentChild&&currentChild.gender==='女'?WHO_W_GIRL:WHO_W_BOY;
  var hRank=getPctRank(latestAge,latest.height,whoH);
  var tooFast=parseFloat(annualH)>thresh.max;
  var excess=(parseFloat(annualH)-thresh.max).toFixed(1);
  var alertCls=(!ok||hRank==='low'||hRank==='high')?'alert-danger':'alert-success';
  var cmYr=currentLang==='en'?' cm/yr':' cm/年';
  var kgYr=currentLang==='en'?' kg/yr':' kg/年';
  var annualColor=(!ok||tooFast)?'var(--red)':'var(--green)';
  var alertText;
  if(hRank==='high'){
    alertText=currentLang==='en'
      ?'🍄 <strong>Height Above P97</strong><br>Over the past ~'+months+' months, annualized growth was <strong>'+annualH+' cm/yr</strong>'+(tooFast?', exceeding the expected rate of <strong>'+thresh.max+' cm/yr</strong> by <strong>'+excess+' cm/yr</strong>.':' (growth rate within normal range, max '+thresh.max+' cm/yr).')+'<br>'+thresh.warnHigh
      :'🍄 <strong>身高生長高於 P97</strong><br>過去約'+months+'個月，年化生長速度為 <strong>'+annualH+' cm/年</strong>'+(tooFast?'，超過該年齡標準 <strong>'+thresh.max+' cm/年</strong>，多出 <strong>'+excess+' cm/年</strong>。':'，目前增長速度正常（最高標準 '+thresh.max+' cm/年）。')+'<br>'+thresh.warnHigh;
  }else if(!ok){
    alertText=currentLang==='en'
      ?'🍄 <strong>Growth Below Target</strong><br>Over the past ~'+months+' months, annualized growth was <strong>'+annualH+' cm/yr</strong>, below the expected minimum of <strong>'+thresh.min+' cm/yr</strong> by <strong>'+gap+' cm/yr</strong>.<br>'+thresh.warn
      :'🍄 <strong>身高生長低於標準</strong><br>過去約'+months+'個月，年化生長速度為 <strong>'+annualH+' cm/年</strong>，低於最低標準 <strong>'+thresh.min+' cm/年</strong>，差距 <strong>'+gap+' cm/年</strong>。<br>'+thresh.warn;
  }else if(hRank==='low'){
    alertText=currentLang==='en'
      ?'⚠️ <strong>Height Below P3</strong><br>Annual growth of <strong>'+annualH+' cm/yr</strong> meets the minimum ('+thresh.min+' cm/yr), but current height is below P3. Please continue monitoring.'
      :'⚠️ <strong>身高低於 P3</strong><br>年化增長 <strong>'+annualH+' cm/年</strong> 已達標準（'+thresh.min+' cm/年），但目前身高偏低（低於P3），請持續追蹤。';
  }else{
    alertText=currentLang==='en'
      ?'⭐ <strong>Growth on Track</strong><br>Over the past ~'+months+' months, annualized growth was <strong>'+annualH+' cm/yr</strong>, within the expected range for this age. Keep it up!'
      :'⭐ <strong>身高生長達標</strong><br>過去約'+months+'個月，年化生長速度為 <strong>'+annualH+' cm/年</strong>，位於該年齡的正常範圍內。繼續加油！';
  }
  aEl.innerHTML='<div class="alert '+alertCls+'">'+alertText+'</div>';
  var hPct=getPctLabel(latestAge,latest.height,whoH),wPct=getPctLabel(latestAge,latest.weight,whoW);
  var name=currentChild?currentChild.name:(currentLang==='en'?'Child':'寶貝');
  sEl.innerHTML=[
    [t('gaStatDate'),fmtDate(latest.date)],
    [t('gaStatAge'),fmtAgeFull(currentChild.birthday,latest.date)],
    [name+(currentLang==='en'?' Height':' 身高'),latest.height+' cm <span style="color:var(--blue);font-size:0.82em;">（'+hPct+'）</span>'],
    [name+(currentLang==='en'?' Weight':' 體重'),latest.weight+' kg <span style="color:var(--blue);font-size:0.82em;">（'+wPct+'）</span>'],
    [(currentLang==='en'?'Compared to '+fmtDate(ref.date):'與 '+fmtDate(ref.date)+' 相比'),'+'+hDiff+' cm ／ +'+wDiff+' kg'],
    [t('gaAnnual'),'<span style="color:'+annualColor+';font-weight:900">'+annualH+cmYr+'</span>'],
    [t('gaAnnualW'),'<span style="color:var(--blue);font-weight:900">'+annualW+kgYr+'</span>'],
    [t('gaMin'),thresh.min+cmYr],
    !ok?[t('gaGap'),'<span style="color:var(--red);font-weight:900">'+gap+cmYr+'</span>']:null
  ].filter(Boolean).map(function(r){return '<div class="stat-row"><span class="stat-label">'+r[0]+'</span><span class="stat-value">'+r[1]+'</span></div>';}).join('');
  var mph=calcMidParentalHeight();
  if(mph){
    sEl.innerHTML+='<div style="border-top:3px dashed #E8D8A0;margin-top:6px;">'+
      '<div class="stat-row"><span class="stat-label" style="color:var(--orange);">'+(currentLang==='en'?'Genetic Pred.':'遺傳預測')+'</span>'+
      '<span class="stat-value" style="color:var(--orange);">'+mph.target+' cm <span style="font-size:0.78em;font-weight:700;vertical-align:middle;">('+mph.low+'–'+mph.high+')</span></span></div>'+
      '<p style="font-size:0.72em;color:#BBA870;margin-top:8px;line-height:1.5;font-weight:600;">'+t('gaPredictionNote')+'</p></div>';
  }
}
function renderCharts(){
  if(typeof Chart==='undefined'){setTimeout(renderCharts,60);return;}
  if(!Chart.registry.plugins.get('darkBg')){
    Chart.register({id:'darkBg',beforeDraw:function(chart){
      var c=chart.canvas.getContext('2d');
      c.save();
      c.fillStyle=chart.config.options._reportBg||'rgb(12,7,40)';
      c.fillRect(0,0,chart.canvas.width,chart.canvas.height);
      c.restore();
    }});
  }
  renderHeightChart();renderWeightChart();
}
// WHO 2007 reference: adult height percentiles at 18 years (boys) / 18 years (girls)
var ADULT_H_REF={
  boy: {p3:161.5,p15:167.0,p50:176.5,p85:183.5,p97:188.0},
  girl:{p3:150.0,p15:155.5,p50:163.5,p85:170.0,p97:174.5}
};
function getPctScore(am,val,data){
  var lo=data[0],hi=data[data.length-1];
  for(var i=0;i<data.length-1;i++){if(data[i][0]<=am&&data[i+1][0]>=am){lo=data[i];hi=data[i+1];break;}}
  var fr=lo[0]===hi[0]?0:(am-lo[0])/(hi[0]-lo[0]);
  var p=function(k){return lo[k]+fr*(hi[k]-lo[k]);};
  var refs=[{pct:3,v:p(1)},{pct:15,v:p(2)},{pct:50,v:p(3)},{pct:85,v:p(4)},{pct:97,v:p(5)}];
  if(val<=refs[0].v)return 3;if(val>=refs[4].v)return 97;
  for(var j=0;j<4;j++){if(val>=refs[j].v&&val<=refs[j+1].v){var t=(val-refs[j].v)/(refs[j+1].v-refs[j].v);return refs[j].pct+t*(refs[j+1].pct-refs[j].pct);}}
  return 50;
}
function predictAdultHeight(){
  if(!currentChild||measurements.length<2)return null;
  var latest=measurements[0],am=getAgeMonths(latest.date);
  if(am<6)return null;
  var whoH=currentChild.gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var rawPct=getPctScore(am,latest.height,whoH);
  var isExtreme=rawPct<=3||rawPct>=97;
  var pct=Math.max(3,Math.min(97,rawPct));
  var ref=currentChild.gender==='女'?ADULT_H_REF.girl:ADULT_H_REF.boy;
  var pcts=[3,15,50,85,97],vals=[ref.p3,ref.p15,ref.p50,ref.p85,ref.p97];
  var adultH=ref.p50;
  if(pct<=3)adultH=ref.p3;
  else if(pct>=97)adultH=ref.p97;
  else for(var i=0;i<4;i++){if(pct>=pcts[i]&&pct<=pcts[i+1]){var t2=(pct-pcts[i])/(pcts[i+1]-pcts[i]);adultH=vals[i]+t2*(vals[i+1]-vals[i]);break;}}
  return{cm:Math.round(adultH*10)/10,pct:Math.round(rawPct),isExtreme:isExtreme};
}
function calcMidParentalHeight(){
  if(!currentChild)return null;
  var ph=getParentHeights(currentChild.id);
  if(!ph.father||!ph.mother)return null;
  var target=currentChild.gender==='女'?(ph.father+ph.mother-13)/2:(ph.father+ph.mother+13)/2;
  return{target:Math.round(target*10)/10,low:Math.round((target-8.5)*10)/10,high:Math.round((target+8.5)*10)/10};
}
async function generateReport(){
  if(!currentChild||measurements.length===0){
    showToast(currentLang==='en'?'Please add measurement records first.':'請先新增量測紀錄。','warning');
    return;
  }
  var isEn=currentLang==='en';
  var win=window.open('','_blank');
  if(!win){showToast(isEn?'Please allow pop-ups for this site.':'請允許彈出視窗以產生報告。','warning');return;}
  win.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+(isEn?'Loading…':'報告生成中…')+'</title><style>body{margin:0;background:#060418;display:flex;align-items:center;justify-content:center;height:100vh;font-family:"Noto Sans TC",sans-serif;color:rgba(255,220,180,0.85);font-size:18px;letter-spacing:2px;}</style></head><body>'+(isEn?'Generating report…':'報告生成中，請稍候…')+'</body></html>');
  currentChild._reportPhotoUrl=currentChild.photo_url
    ?await getSignedPhotoUrl(getPhotoPath(currentChild.photo_url))
    :null;
  // Temporarily expand collapsed chart cards so charts render at full size
  var hCard=document.getElementById('heightChartCard');
  var wCard=document.getElementById('weightChartCard');
  var hWas=hCard.classList.contains('collapsed');
  var wWas=wCard.classList.contains('collapsed');
  if(hWas)hCard.classList.remove('collapsed');
  if(wWas)wCard.classList.remove('collapsed');
  showLoading();
  // Wait for CSS layout to update (especially on mobile) before rendering charts
  setTimeout(function(){
    var prevAnim=Chart.defaults.animation;
    Chart.defaults.animation=false;
    renderCharts();
    Chart.defaults.animation=prevAnim;
    setTimeout(function(){
      function captureForReport(ch){
        if(!ch)return'';
        var lightTick='#5a4080',lightGrid='rgba(100,80,180,0.14)',lightTitle='#6b4ea0',lightLegend='#3a2a6a';
        var dk='rgba(210,195,255,0.82)',dkG='rgba(180,150,255,0.1)',dkT='rgba(255,240,180,0.92)';
        // Save and apply light colors directly on scale instances (ch.draw() uses these, not config.options)
        var scaleKeys=Object.keys(ch.scales);
        var saved={};
        scaleKeys.forEach(function(k){
          var s=ch.scales[k];
          saved[k]={tc:s.options.ticks&&s.options.ticks.color,gc:s.options.grid&&s.options.grid.color,tic:s.options.title&&s.options.title.color};
          if(s.options.ticks)s.options.ticks.color=lightTick;
          if(s.options.grid)s.options.grid.color=lightGrid;
          if(s.options.title)s.options.title.color=lightTitle;
        });
        var savedLeg=ch.config.options.plugins.legend.labels.color;
        ch.config.options.plugins.legend.labels.color=lightLegend;
        // Set white bg and draw synchronously (ch.draw() bypasses rAF Animator)
        ch.config.options._reportBg='#ffffff';
        ch.draw();
        var img=ch.toBase64Image('image/png',1);
        // Restore dark theme synchronously
        delete ch.config.options._reportBg;
        ch.config.options.plugins.legend.labels.color=savedLeg;
        scaleKeys.forEach(function(k){
          var s=ch.scales[k];var sv=saved[k];
          if(s.options.ticks)s.options.ticks.color=sv.tc;
          if(s.options.grid)s.options.grid.color=sv.gc;
          if(s.options.title)s.options.title.color=sv.tic;
        });
        ch.draw();
        return img;
      }
      var hImg=captureForReport(hChart);
      var wImg=captureForReport(wChart);
      if(hWas)hCard.classList.add('collapsed');
      if(wWas)wCard.classList.add('collapsed');
      var html=buildReportHTML(hImg,wImg);
      hideLoading();
      win.document.open();
      win.document.write(html);
      win.document.close();
    },150);
  },50);
}
/* ── Report helpers + buildReportHTML ── loaded from report.js ── */

function _hexAlpha(hex,a){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return'rgba('+r+','+g+','+b+','+a+')';}
function mkWho(who,colors,isMobile){
  var op=isMobile?0.65:0.90;
  return [{l:'P97',i:5,w:isMobile?1.2:1.5},{l:'P85',i:4,w:isMobile?1.0:1.2},{l:'P50',i:3,w:isMobile?2.0:2.5},{l:'P15',i:2,w:isMobile?1.0:1.2},{l:'P3',i:1,w:isMobile?1.2:1.5}].map(function(p,pi){
    var bc=_hexAlpha(colors[pi],op);
    return{label:p.l,data:who.map(function(d){return{x:d[0],y:d[p.i]};}),borderColor:bc,borderWidth:p.w,borderDash:p.l==='P50'?[]:[6,4],pointRadius:0,fill:false,tension:0.4};
  });
}
function mkChild(field){
  var isMobile=window.innerWidth<=768;
  var name=currentChild?currentChild.name:'寶貝';
  var data=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);})
    .map(function(m){return{x:getAgeMonths(m.date),y:parseFloat(m[field])};})
    .filter(function(pt){return isFinite(pt.x)&&isFinite(pt.y)&&pt.y>0;});
  return{label:name,data:data,borderColor:'#E52521',backgroundColor:'#E52521',borderWidth:isMobile?2:2.5,pointRadius:isMobile?1.5:2,pointHoverRadius:isMobile?4:5,fill:false};
}
function mkAnnotations(){
  if(!supplements.length)return{};
  var ann={};
  supplements.forEach(function(s,i){
    var mo=getAgeMonths(s.date);
    ann['s'+i]={type:'line',xMin:mo,xMax:mo,borderColor:'rgba(0,133,43,0.55)',borderWidth:1.5,borderDash:[5,4],
      label:{display:true,content:s.name.length>6?s.name.substring(0,6)+'…':s.name,position:'start',
        font:{size:9,weight:'bold'},color:'#00852B',backgroundColor:'rgba(191,239,178,0.9)',padding:{x:3,y:2}}};
  });
  return ann;
}
function getChartXMax(){
  if(!measurements.length)return 120;
  var mo=getAgeMonths(measurements[0].date);
  return Math.max(120,Math.ceil((mo+6)/6)*6);
}
function getChartXRange(){
  var isMobile=window.innerWidth<=768;
  var xMaxFull=getChartXMax();
  var cur=measurements.length?getAgeMonths(measurements[0].date):24;
  var xMaxCur=Math.ceil((cur+3)/6)*6;
  if(chartRangeMode==='1Y')return{xMin:Math.max(0,xMaxCur-12),xMax:Math.max(xMaxCur,12)};
  if(chartRangeMode==='2Y')return{xMin:Math.max(0,xMaxCur-24),xMax:Math.max(xMaxCur,24)};
  if(chartRangeMode==='ALL'||!isMobile)return{xMin:0,xMax:xMaxFull};
  // AUTO + mobile: 0-24m shows 0-36m; older uses 48m window with data at ~75% position
  if(cur<=24)return{xMin:0,xMax:36};
  var xMax=Math.ceil((cur+12)/6)*6; // 12m of right padding so data isn't at edge
  return{xMin:Math.max(0,xMax-48),xMax:xMax};
}
function setChartRange(mode){
  chartRangeMode=mode;
  document.querySelectorAll('.crb').forEach(function(b){b.classList.toggle('active',b.dataset.range===mode);});
  renderCharts();
}
function mkOpts(yLabel,yMin,yMax){
  var name=currentChild?currentChild.name:'寶貝';
  var isMobile=window.innerWidth<=768;
  var range=getChartXRange();
  var rangeSize=range.xMax-range.xMin;
  var stepSize=isMobile?6:(rangeSize>48?12:6);
  var gridColor='rgba(180,150,255,0.1)';
  var tickColor='rgba(210,195,255,0.82)';
  var titleColor='rgba(255,240,180,0.92)';
  return{responsive:true,maintainAspectRatio:false,
    plugins:{
      legend:{position:'top',labels:{
        color:tickColor,
        font:{size:isMobile?9:11,weight:'bold'},
        boxWidth:isMobile?12:18,
        padding:isMobile?5:10,
        filter:isMobile?function(item){return item.text==='P97'||item.text==='P50'||item.text==='P3'||item.text===name;}:undefined
      }},
      tooltip:{callbacks:{label:function(ctx){if(ctx.dataset.label===name)return name+': '+ctx.raw.y+(yLabel.includes('Height')||yLabel.includes('身高')?' cm':' kg')+' ('+fmtAge(ctx.raw.x)+')';return ctx.dataset.label+': '+ctx.parsed.y;}}},
      annotation:{annotations:mkAnnotations()}
    },
    scales:{
      x:{type:'linear',min:range.xMin,max:range.xMax,
        ticks:{stepSize:stepSize,color:tickColor,font:{size:isMobile?10:11}},
        grid:{color:gridColor},
        title:{display:true,text:t('chartMonthAge'),color:titleColor,font:{weight:'bold',size:isMobile?10:12}}
      },
      y:{min:yMin,max:yMax,
        ticks:{color:tickColor,font:{size:isMobile?10:11}},
        grid:{color:gridColor},
        title:{display:true,text:yLabel,color:titleColor,font:{weight:'bold',size:isMobile?10:12}}
      }
    }};
}
function renderHeightChart(){
  var ctx=document.getElementById('heightChart').getContext('2d');
  if(hChart)hChart.destroy();
  var who=currentChild&&currentChild.gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var mob=window.innerWidth<=768;
  hChart=new Chart(ctx,{type:'line',data:{datasets:mkWho(who,['#FFCF60','#FE8A18','#049CD8','#FE8A18','#FFCF60'],mob).concat([mkChild('height')])},options:mkOpts(t('chartHeight'),40,165)});
}
function renderWeightChart(){
  var ctx=document.getElementById('weightChart').getContext('2d');
  if(wChart)wChart.destroy();
  var who=currentChild&&currentChild.gender==='女'?WHO_W_GIRL:WHO_W_BOY;
  var mob=window.innerWidth<=768;
  wChart=new Chart(ctx,{type:'line',data:{datasets:mkWho(who,['#BFEFB2','#3A9D23','#049CD8','#3A9D23','#BFEFB2'],mob).concat([mkChild('weight')])},options:mkOpts(t('chartWeight'),0,55)});
}
function renderSuppCorrelation(){
  var el=document.getElementById('suppCorrelation');
  if(!supplements.length){el.innerHTML='<div class="empty">'+t('corrEmpty')+'<span class="empty-sub">'+t('corrEmptySub')+'</span></div>';return;}
  if(measurements.length<2){el.innerHTML='<div class="alert alert-info">'+t('corrNeedMore')+'</div>';return;}
  var sorted=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);});
  var html='<p style="font-size:0.78em;color:var(--muted);font-weight:700;margin-bottom:14px;line-height:1.6;">'+t('corrDesc')+'</p>';
  supplements.slice().sort(function(a,b){return a.date.localeCompare(b.date);}).forEach(function(s){
    var before=sorted.filter(function(m){return m.date<s.date;});
    var after=sorted.filter(function(m){return m.date>s.date;});
    var bRate=null,aRate=null;
    if(before.length>=2){var days=(new Date(before[before.length-1].date)-new Date(before[0].date))/86400000;if(days>=14)bRate=((before[before.length-1].height-before[0].height)/days*365).toFixed(1);}
    if(after.length>=2){var days2=(new Date(after[after.length-1].date)-new Date(after[0].date))/86400000;if(days2>=14)aRate=((after[after.length-1].height-after[0].height)/days2*365).toFixed(1);}
    html+='<div class="supp-item"><div class="supp-row1"><div><span class="supp-name">⭐ '+esc(s.name)+'</span><span style="font-size:0.78em;color:var(--muted);font-weight:700;margin-left:8px;">'+fmtDate(s.date)+(currentLang==='en'?' (since '+fmtAgeFull(currentChild.birthday,s.date)+')':'（'+fmtAgeFull(currentChild.birthday,s.date)+'起）')+'</span></div></div>';
    html+='<div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
    var cmYr2=currentLang==='en'?' cm/yr':' cm/年';
    html+='<div style="background:rgba(255,248,240,0.88);border-radius:8px;padding:10px;text-align:center;border:1.5px solid rgba(180,120,160,0.35);"><div style="font-size:0.7em;color:#805c7d;font-weight:900;margin-bottom:5px;">'+t('corrBefore')+'</div>';
    if(bRate!==null){html+='<div style="font-size:1.15em;font-weight:900;color:#E05878;text-shadow:0 0 6px rgba(224,88,120,0.3);">'+bRate+'</div><div style="font-size:0.68em;color:#805c7d;font-weight:700;">'+cmYr2.trim()+'</div>';}
    else{html+='<div style="font-size:0.82em;color:#a08098;font-weight:700;padding:6px 0;">'+t('corrInsufficient')+'</div>';}
    html+='</div>';
    var hasA=aRate!==null;
    html+='<div style="background:'+(hasA?'rgba(230,250,235,0.88)':'rgba(255,248,240,0.88)')+';border-radius:8px;padding:10px;text-align:center;border:1.5px solid '+(hasA?'rgba(60,180,80,0.45)':'rgba(180,120,160,0.35)')+';"><div style="font-size:0.7em;color:'+(hasA?'#2a7a3a':'#805c7d')+';font-weight:900;margin-bottom:5px;">'+t('corrAfter')+'</div>';
    if(hasA){html+='<div style="font-size:1.15em;font-weight:900;color:#E05878;text-shadow:0 0 6px rgba(224,88,120,0.3);">'+aRate+'</div><div style="font-size:0.68em;color:#805c7d;font-weight:700;">'+cmYr2.trim()+'</div>';}
    else{html+='<div style="font-size:0.82em;color:#a08098;font-weight:700;padding:6px 0;">'+t('corrObserving')+'</div>';}
    html+='</div></div>';
    if(bRate!==null&&aRate!==null){
      var diff=(parseFloat(aRate)-parseFloat(bRate)).toFixed(1);var pos=parseFloat(diff)>0;
      html+='<div style="margin-top:8px;padding:8px 12px;border-radius:4px;background:'+(pos?'var(--green-pale)':'var(--red-pale)')+';border:3px solid '+(pos?'var(--green)':'var(--red)')+';">';
      html+='<span style="font-size:0.85em;font-weight:900;color:'+(pos?'var(--green)':'var(--red)')+';">'+(pos?('▲ '+(currentLang==='en'?'Growth increased +'+diff+' cm/yr':'服用後增長加快 +'+diff+' cm/年')):('▼ '+(currentLang==='en'?'Growth slowed '+diff+' cm/yr':'服用後增長減緩 '+diff+' cm/年')))+'</span>';
      if(!pos)html+='<span style="font-size:0.75em;color:var(--muted);margin-left:6px;">'+t('corrOtherFactors')+'</span>';
      html+='</div>';
    }
    html+='</div>';
  });
  el.innerHTML=html;
}

/* ── Utils ── */
function getMinGrowth(m){
  if(m<12)return{min:20,max:40,warn:t('warn1'),warnHigh:t('warnHigh1')};
  if(m<24)return{min:9, max:15,warn:t('warn2'),warnHigh:t('warnHigh2')};
  if(m<36)return{min:7, max:11,warn:t('warn3'),warnHigh:t('warnHigh3')};
  return        {min:5, max:8, warn:t('warn4'),warnHigh:t('warnHigh4')};
}
function getAgeMonths(dateStr){
  if(!currentChild)return 0;
  var b=new Date(currentChild.birthday),d=new Date(dateStr);
  var m=(d.getFullYear()-b.getFullYear())*12+(d.getMonth()-b.getMonth());
  if(d.getDate()<b.getDate())m--;
  return Math.max(0,m);
}
function fmtAge(m){
  var y=Math.floor(m/12),mo=m%12;
  if(currentLang==='en'){if(!y)return mo+'mo';if(!mo)return y+'yr';return y+'yr '+mo+'mo';}
  if(!y)return mo+'個月';if(!mo)return y+'歲';return y+'歲'+mo+'個月';
}
function fmtAgeYear(birthdayStr){var b=new Date(birthdayStr),d=new Date();var y=d.getFullYear()-b.getFullYear(),mo=d.getMonth()-b.getMonth(),da=d.getDate()-b.getDate();if(da<0)mo--;if(mo<0)y--;return y+'Y';}
function fmtAgeFull(birthdayStr,toDateStr){
  var b=new Date(birthdayStr),d=toDateStr?new Date(toDateStr):new Date();
  var y=d.getFullYear()-b.getFullYear(),mo=d.getMonth()-b.getMonth(),da=d.getDate()-b.getDate();
  if(da<0){mo--;da+=new Date(d.getFullYear(),d.getMonth(),0).getDate();}
  if(mo<0){y--;mo+=12;}
  return(y?y+'Y':'')+(mo||y?mo+'M':'')+(da+'D');
}
function fmtDate(s){var p=s.split('-');return p[0]+'/'+p[1]+'/'+p[2];}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function getPctLabel(am,val,data){
  var lo=data[0],hi=data[data.length-1];
  for(var i=0;i<data.length-1;i++){if(data[i][0]<=am&&data[i+1][0]>=am){lo=data[i];hi=data[i+1];break;}}
  var frac=lo[0]===hi[0]?0:(am-lo[0])/(hi[0]-lo[0]);
  var p=function(idx){return lo[idx]+frac*(hi[idx]-lo[idx]);};
  if(val<p(1))return t('pLow');if(val<p(2))return t('p3to15');
  if(val<p(3))return t('p15to50');if(val<p(4))return t('p50to85');
  if(val<p(5))return t('p85to97');return t('pHigh');
}
function getPctRank(am,val,data){
  var lo=data[0],hi=data[data.length-1];
  for(var i=0;i<data.length-1;i++){if(data[i][0]<=am&&data[i+1][0]>=am){lo=data[i];hi=data[i+1];break;}}
  var frac=lo[0]===hi[0]?0:(am-lo[0])/(hi[0]-lo[0]);
  var p=function(idx){return lo[idx]+frac*(hi[idx]-lo[idx]);};
  if(val<p(1))return'low';if(val>=p(5))return'high';return'normal';
}
function switchTab(name,btn){
  document.querySelectorAll('.tab-content').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.nav-btn').forEach(function(el){el.classList.remove('active');});
  document.getElementById('tab-'+name).classList.add('active');btn.classList.add('active');
  window.scrollTo(0,0);
  if(name==='chart'){setTimeout(renderCharts,80);renderSuppCorrelation();}
}
function toggleCollapse(id){
  var el=document.getElementById(id);
  el.classList.toggle('collapsed');
  var opened=!el.classList.contains('collapsed');
  if(opened){
    if(id==='heightChartCard'||id==='weightChartCard') setTimeout(renderCharts,60);
    if(id==='corrCard') renderSuppCorrelation();
  }
}
document.addEventListener('keydown',function(e){
  if(e.key!=='Enter'&&e.key!==' ')return;
  var t=document.activeElement;
  if(!t||!t.classList.contains('collapse-header'))return;
  e.preventDefault();
  t.click();
});

/* ── Share Modal ── */
var sharingChildId=null;
async function openShareModal(childId){
  sharingChildId=childId;
  var child=children.find(function(c){return c.id===childId;});
  document.getElementById('shareModalTitle').textContent=t('shareModalTitleBase')+' — '+(child?esc(child.name):'');
  document.getElementById('shareEmailInput').value='';
  var _smOv=document.getElementById('shareModal');
  _smOv.classList.remove('hidden');
  _openModalA11y(_smOv);
  await refreshShareList();
}
function closeShareModal(){
  var ov=document.getElementById('shareModal');
  ov.classList.add('hidden');
  _closeModalA11y(ov);
  sharingChildId=null;
}
async function refreshShareList(){
  var list=document.getElementById('shareList');
  list.innerHTML='<div style="text-align:center;font-size:0.8em;color:var(--muted);padding:8px;">'+t('shareLoading')+'</div>';
  var shares=await db_getShares(sharingChildId);
  if(!shares.length){
    list.innerHTML='<div style="text-align:center;font-size:0.78em;color:var(--muted);padding:10px 0;">'+t('shareEmpty')+'</div>';
    return;
  }
  list.innerHTML=shares.map(function(s){
    return '<div class="share-item">'+
      '<span class="share-email">'+esc(s.shared_with_email)+'</span>'+
      '<button class="btn btn-danger" style="font-size:0.7em;padding:4px 10px;white-space:nowrap;" onclick="removeShare(\''+s.id+'\')">'+t('shareRemove')+'</button>'+
      '</div>';
  }).join('');
}
async function addShare(){
  var email=document.getElementById('shareEmailInput').value.trim().toLowerCase();
  if(!email||!email.includes('@')){showToast(t('shareEmailInvalid'),'error');return;}
  if(email===currentUser.email){showToast(t('shareSelf'),'error');return;}
  try{
    await db_addShare(sharingChildId,email);
    document.getElementById('shareEmailInput').value='';
    await refreshShareList();
  }catch(e){
    if(e.code==='23505'||String(e.message).includes('duplicate'))showToast(t('shareDuplicate'),'warning');
    else showToast(t('shareAddFail')+(e.message||e),'error');
  }
}
async function removeShare(shareId){
  if(!confirm(t('shareRemoveConfirm')))return;
  try{
    await db_removeShare(shareId);
    await refreshShareList();
  }catch(e){showToast(t('shareRemoveFail')+(e.message||e),'error');}
}

/* ══ Sky Ambient ══ */
(function initSky(){
  var bg=document.getElementById('skyBg');
  var fg=document.getElementById('skyFg');
  if(!bg)return;

  function buildStars(){
    var old=bg.querySelectorAll('.sk-star');
    for(var x=0;x<old.length;x++)old[x].remove();
    var isMobile=window.innerWidth<768;
    var density=isMobile?1200:1100; /* lower density = fewer DOM nodes = better perf */
    var count=Math.floor((window.innerWidth*window.innerHeight)/density);
    for(var i=0;i<count;i++){
      var r=i/count;
      var sz,opHi,glowMul,isStatic=false;
      if(isMobile){
        if(r<0.03){sz=2.8+Math.random()*1.4;opHi=0.78+Math.random()*0.18;glowMul=11;}
        else if(r<0.12){sz=1.6+Math.random()*1.2;opHi=0.55+Math.random()*0.28;glowMul=8;}
        else if(r<0.35){sz=0.8+Math.random()*0.9;opHi=0.36+Math.random()*0.26;glowMul=5;}
        else{sz=0.3+Math.random()*0.6;opHi=0.14+Math.random()*0.20;glowMul=3;isStatic=true;}
      }else{
        if(r<0.03){sz=4.2+Math.random()*2.0;opHi=0.88+Math.random()*0.12;glowMul=12;}
        else if(r<0.12){sz=2.4+Math.random()*1.8;opHi=0.65+Math.random()*0.25;glowMul=9;}
        else if(r<0.35){sz=1.1+Math.random()*1.4;opHi=0.44+Math.random()*0.26;glowMul=6;}
        else{sz=0.4+Math.random()*0.8;opHi=0.18+Math.random()*0.26;glowMul=4;isStatic=true;}
      }
      opHi=+opHi.toFixed(2);
      var s=document.createElement('div');
      if(isStatic){
        s.className='sk-star-s';
        s.style.cssText='width:'+sz.toFixed(2)+'px;height:'+sz.toFixed(2)+'px;left:'+Math.random()*100+'%;top:'+Math.random()*92+'%;opacity:'+opHi+';box-shadow:0 0 '+(sz*glowMul).toFixed(1)+'px '+sz.toFixed(1)+'px rgba(255,255,245,'+opHi+');';
      }else{
        var opLo=+(opHi*0.35).toFixed(2);
        s.className='sk-star';
        s.style.cssText='width:'+sz.toFixed(2)+'px;height:'+sz.toFixed(2)+'px;left:'+Math.random()*100+'%;top:'+Math.random()*92+'%;animation-duration:'+(0.8+Math.random()*3.8)+'s;animation-delay:'+(-Math.random()*9)+'s;box-shadow:0 0 '+(sz*glowMul).toFixed(1)+'px '+sz.toFixed(1)+'px rgba(255,255,245,'+opHi+');';
        s.style.setProperty('--s-hi',opHi);
        s.style.setProperty('--s-lo',opLo);
      }
      bg.appendChild(s);
    }
    /* Zodiac constellations — desktop only */
    if(!isMobile){
      [[[22,8],[24,12],[25,17],[23,22],[21,16],[20,11],[19,7],[26,9]],
       [[68,14],[70,10],[72,15],[74,11],[71,17],[69,19],[73,8]],
       [[82,55],[83,60],[82,65],[84,70],[83,76],[81,81],[84,86],[87,88],[90,86],[92,83]],
       [[44,28],[46,32],[48,36],[49,41],[47,46],[45,51],[50,38],[52,34],[54,30]]
      ].forEach(function(pts){
        pts.forEach(function(pt){
          var cs=document.createElement('div');cs.className='sk-star';
          var csz=2.5+Math.random()*1.5;
          cs.style.cssText='width:'+csz+'px;height:'+csz+'px;left:'+pt[0]+'%;top:'+pt[1]+'%;animation-duration:'+(1.5+Math.random()*2)+'s;animation-delay:'+(-Math.random()*4)+'s;box-shadow:0 0 '+(csz*9)+'px '+(csz*2)+'px rgba(220,200,255,0.92);';
          cs.style.setProperty('--s-hi','0.92');cs.style.setProperty('--s-lo','0.40');
          bg.appendChild(cs);
        });
      });
    }
  }

  function buildMist(){
    if(!fg)return;
    var old=fg.querySelectorAll('.sk-mist');
    for(var x=0;x<old.length;x++)old[x].remove();
    var vw=window.innerWidth,vh=window.innerHeight;
    var mobile=vw<640;
    var cols=['255,205,215','255,225,200','215,200,255','200,220,255','255,235,195','210,230,255'];
    var configs=mobile?[
      [680,480,0,0.040,65,-vw*0.30,-vh*0.22,0.00],
      [640,460,2,0.035,72, vw*0.65,-vh*0.20,0.28],
      [600,440,1,0.038,68,-vw*0.28, vh*0.62,0.50],
      [640,460,3,0.032,78, vw*0.62, vh*0.60,0.72]
    ]:[
      [1500,1000,0,0.058,65,-vw*0.40,-vh*0.32,0.00],
      [1400, 950,2,0.050,72, vw*0.68,-vh*0.30,0.12],
      [1300, 900,1,0.055,68,-vw*0.35, vh*0.62,0.25],
      [1500,1000,3,0.048,78, vw*0.62, vh*0.58,0.38],
      [1800, 750,4,0.038,80, vw*0.08,-vh*0.42,0.50],
      [ 900,1400,5,0.045,62,-vw*0.48, vh*0.18,0.62],
      [ 950,1350,0,0.040,74, vw*0.72, vh*0.22,0.75],
      [1600, 750,2,0.042,58, vw*0.12, vh*0.76,0.88]
    ];
    configs.forEach(function(c){
      var el=document.createElement('div');el.className='sk-mist';
      var dur=c[4],delay=-(dur*c[7]);
      el.style.cssText='width:'+c[0]+'px;height:'+c[1]+'px;left:'+Math.round(c[5])+'px;top:'+Math.round(c[6])+'px;background:rgba('+cols[c[2]]+','+c[3]+');animation-duration:'+dur+'s;animation-delay:'+delay.toFixed(1)+'s;';
      fg.appendChild(el);
    });
    /* Atmosphere glow particles — desktop: 28, mobile: 10 */
    var atmCount=mobile?10:28;
    var atmCols=['255,220,180','200,180,255','180,220,255','255,200,220','220,240,255'];
    for(var a=0;a<atmCount;a++){
      var ap=document.createElement('div');ap.className='sk-atm';
      var asz=mobile?(0.9+Math.random()*1.6):(1.2+Math.random()*2.8);
      var aCol=atmCols[Math.floor(Math.random()*atmCols.length)];
      var aop=+(mobile?(0.32+Math.random()*0.22):(0.44+Math.random()*0.30)).toFixed(2);
      var adx=(Math.random()*50-25).toFixed(0);
      ap.style.cssText='width:'+asz.toFixed(1)+'px;height:'+asz.toFixed(1)+'px;left:'+Math.random()*100+'%;bottom:'+(Math.random()*65)+'%;background:rgba('+aCol+','+aop+');box-shadow:0 0 '+(asz*4)+'px rgba('+aCol+',0.5);animation-duration:'+(16+Math.random()*22)+'s;animation-delay:'+(-Math.random()*30)+'s;';
      ap.style.setProperty('--aop',aop);
      ap.style.setProperty('--adx',adx+'px');
      fg.appendChild(ap);
    }
  }

  buildStars();
  buildMist();

  /* Clouds — one-time horizontal drift */
  [[280,95,'255,200,230',0.30,56],[190,68,'210,190,255',0.26,44],[320,105,'255,190,220',0.22,72],[220,78,'195,200,255',0.28,51],[250,88,'255,215,235',0.18,63]].forEach(function(c,idx){
    var cl=document.createElement('div');cl.className='sk-cloud';
    cl.style.cssText='width:'+c[0]+'px;height:'+c[1]+'px;top:'+(2+idx*4.5)+'%;background:rgba('+c[2]+','+c[3]+');box-shadow:0 0 55px 18px rgba('+c[2]+',0.22);animation-duration:'+c[4]+'s;animation-delay:'+(-c[4]*(idx*0.22))+'s;';
    bg.appendChild(cl);
  });

  /* Fireflies — mobile: 50-94%, desktop: bottom 25% only to avoid card overlap */
  var isMobileF=window.innerWidth<768;
  var flyCount=isMobileF?14:8;
  for(var f=0;f<flyCount;f++){
    var fly=document.createElement('div');fly.className='sk-fly';
    var flyTop=isMobileF?(50+Math.random()*44):(72+Math.random()*26);
    fly.style.cssText='left:'+(3+Math.random()*94)+'%;top:'+flyTop.toFixed(1)+'%;animation-duration:'+(5+Math.random()*8)+'s,'+(1.2+Math.random()*2.8)+'s;animation-delay:'+(-Math.random()*9)+'s,'+(-Math.random()*3)+'s;';
    bg.appendChild(fly);
  }

  /* Resize — debounced 300ms, rebuild stars + mist only */
  var _rt;
  window.addEventListener('resize',function(){
    clearTimeout(_rt);
    _rt=setTimeout(function(){buildStars();buildMist();},300);
  });
})();

/* ══ Ehon Save Animation (Japanese picture-book style) ══ */
function burstFireworks(srcEl){
  var r=srcEl?srcEl.getBoundingClientRect():{left:window.innerWidth/2,top:window.innerHeight/2,width:0,height:0};
  var cx=r.left+r.width/2, cy=r.top+r.height/2;
  /* Floating star emoji drifting upward */
  var starGlyphs=['⭐','✨','🌟','💫','⭐','✨','🌟'];
  for(var i=0;i<14;i++){
    var el=document.createElement('div');
    var fsz=(0.9+Math.random()*0.9).toFixed(2);
    el.style.cssText='position:fixed;pointer-events:none;z-index:3500;font-size:'+fsz+'em;line-height:1;left:'+cx+'px;top:'+cy+'px;transform:translate(-50%,-50%) scale(0.4);opacity:0;';
    document.body.appendChild(el);
    el.textContent=starGlyphs[i%starGlyphs.length];
    var dx=(Math.random()-0.5)*90;
    var dy=-(55+Math.random()*90);
    var rot=(Math.random()*50-25).toFixed(0);
    var anim=el.animate([
      {transform:'translate(-50%,-50%) scale(0.3) rotate(0deg)',opacity:0},
      {transform:'translate(calc(-50% + '+dx*0.35+'px),calc(-50% + '+dy*0.4+'px)) scale(1.2) rotate('+(rot/2)+'deg)',opacity:1,offset:0.22},
      {transform:'translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px)) scale(0.6) rotate('+rot+'deg)',opacity:0}
    ],{duration:1100+Math.random()*500,easing:'ease-out',fill:'forwards',delay:i*35});
    anim.onfinish=function(){if(this.effect&&this.effect.target)this.effect.target.remove();};
  }
  /* Soft bubble rings expanding gently */
  var ringCols=['rgba(255,210,80,0.72)','rgba(255,160,200,0.60)','rgba(160,200,255,0.55)'];
  for(var ri=0;ri<3;ri++){
    var ring=document.createElement('div');
    var rsz=28+ri*18;
    ring.style.cssText='position:fixed;left:'+cx+'px;top:'+cy+'px;width:'+rsz+'px;height:'+rsz+'px;border-radius:50%;border:2px solid '+ringCols[ri]+';pointer-events:none;z-index:3498;transform:translate(-50%,-50%) scale(0.2);opacity:0;background:rgba(255,240,190,'+(0.10-ri*0.03)+');';
    document.body.appendChild(ring);
    var ra=ring.animate([
      {transform:'translate(-50%,-50%) scale(0.2)',opacity:0.85},
      {transform:'translate(-50%,-50%) scale(2.8)',opacity:0}
    ],{duration:700+ri*180,easing:'cubic-bezier(0.2,0.8,0.4,1)',fill:'forwards',delay:ri*80});
    ra.onfinish=function(){if(this.effect&&this.effect.target)this.effect.target.remove();};
  }
  /* Pastel glowing dots floating upward */
  var dotCols=['#FFD166','#FF9FD2','#ADE8FF','#C3FFC7','#FFB3C6','#FFFAAA'];
  for(var di=0;di<18;di++){
    var dot=document.createElement('div');
    var dsz=3.5+Math.random()*5;
    var dc=dotCols[di%dotCols.length];
    var ddx=(Math.random()-0.5)*70;
    var ddy=-(30+Math.random()*75);
    dot.style.cssText='position:fixed;pointer-events:none;z-index:3499;border-radius:50%;width:'+dsz+'px;height:'+dsz+'px;background:'+dc+';box-shadow:0 0 '+(dsz*2.2)+'px '+dc+',0 0 '+(dsz*4)+'px rgba(255,240,200,0.3);left:'+cx+'px;top:'+cy+'px;transform:translate(-50%,-50%);opacity:0;';
    document.body.appendChild(dot);
    var da=dot.animate([
      {transform:'translate(calc(-50%),calc(-50%)) scale(0.2)',opacity:0},
      {transform:'translate(calc(-50% + '+ddx*0.3+'px),calc(-50% + '+ddy*0.4+'px)) scale(1.1)',opacity:0.92,offset:0.28},
      {transform:'translate(calc(-50% + '+ddx+'px),calc(-50% + '+ddy+'px)) scale(0.3)',opacity:0}
    ],{duration:900+Math.random()*400,easing:'ease-out',fill:'forwards',delay:di*18});
    da.onfinish=function(){if(this.effect&&this.effect.target)this.effect.target.remove();};
  }
}
