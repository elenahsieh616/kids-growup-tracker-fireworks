
/* ── Toast Notifications ── */
var _toastContainer=(function(){var el=document.createElement('div');el.id='toastContainer';document.body.appendChild(el);return el;})();
function showToast(msg,type,duration){
  var icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
  type=type||'info';duration=duration||3200;
  var toast=document.createElement('div');toast.className='toast toast-'+type;
  var icon=document.createElement('span');icon.className='toast-icon';icon.textContent=icons[type]||'ℹ️';
  var msgEl=document.createElement('span');msgEl.className='toast-msg';msgEl.innerHTML=msg;
  var btn=document.createElement('button');btn.className='toast-close';btn.textContent='✕';
  toast.appendChild(icon);toast.appendChild(msgEl);toast.appendChild(btn);
  function remove(){if(toast._gone)return;toast._gone=true;toast.classList.add('removing');setTimeout(function(){if(toast.parentNode)toast.parentNode.removeChild(toast);},260);}
  btn.addEventListener('click',remove);
  _toastContainer.appendChild(toast);
  setTimeout(remove,duration);
}

/* ── WHO Data (Boys) ── */
var WHO_H_BOY=[
  [0,46.3,48.2,49.9,51.8,53.4],[1,50.8,53.0,54.7,56.5,58.1],[2,54.4,56.5,58.4,60.2,62.0],
  [3,57.3,59.6,61.4,63.2,65.0],[4,59.7,62.1,63.9,65.7,67.6],[5,61.7,64.0,65.9,67.8,69.7],
  [6,63.3,65.7,67.6,69.5,71.6],[7,64.8,67.2,69.2,71.1,73.2],[8,66.2,68.6,70.6,72.6,74.7],
  [9,67.5,69.9,72.0,74.0,76.2],[10,68.7,71.2,73.3,75.4,77.6],[11,69.9,72.4,74.5,76.7,78.9],
  [12,71.0,73.5,75.7,77.9,80.2],[15,74.0,76.6,79.1,81.4,83.9],[18,76.9,79.7,82.3,84.7,87.4],
  [21,79.6,82.6,85.1,87.7,90.5],[24,82.3,85.2,87.8,90.5,93.4],[27,84.9,87.9,90.7,93.5,96.5],
  [30,87.1,90.2,93.0,96.0,99.0],[33,89.2,92.5,95.4,98.6,101.8],[36,91.1,94.6,97.6,100.9,104.3],
  [39,93.1,96.7,99.9,103.4,107.0],[42,95.0,98.8,102.2,105.8,109.6],[45,96.7,100.7,104.3,108.1,112.1],
  [48,98.4,102.7,106.4,110.4,114.6],[51,100.1,104.5,108.4,112.6,116.9],[54,101.7,106.3,110.4,114.7,119.2],
  [57,103.3,108.1,112.3,116.8,121.5],[60,104.9,109.9,114.3,118.9,123.8],
  [66,107.6,112.5,117.3,122.0,126.8],[72,110.2,115.4,120.2,125.2,130.3],
  [78,112.8,118.2,123.0,128.3,133.7],[84,115.3,121.0,125.7,131.3,137.0],
  [90,117.7,123.6,128.4,133.8,139.7],[96,120.1,126.0,131.0,136.3,142.3],
  [102,122.3,128.5,133.6,139.1,145.3],[108,124.5,130.9,136.2,141.9,148.3],
  [114,126.5,133.2,138.7,144.7,151.3],[120,128.5,135.5,141.2,147.4,154.3]
];
var WHO_W_BOY=[
  [0,2.5,2.9,3.3,3.9,4.3],[1,3.4,3.9,4.5,5.1,5.7],[2,4.4,5.0,5.6,6.3,7.0],
  [3,5.1,5.8,6.5,7.3,8.0],[4,5.6,6.4,7.1,8.0,8.7],[5,6.0,6.9,7.6,8.5,9.3],
  [6,6.4,7.3,8.1,9.0,9.9],[7,6.7,7.6,8.5,9.5,10.3],[8,7.0,7.9,8.8,9.8,10.7],
  [9,7.2,8.2,9.2,10.2,11.1],[10,7.5,8.5,9.5,10.5,11.5],[11,7.7,8.7,9.7,10.8,11.8],
  [12,7.8,8.9,9.9,11.0,12.0],[15,8.4,9.5,10.6,11.8,12.9],[18,9.0,10.2,11.3,12.6,13.7],
  [21,9.6,10.8,12.0,13.3,14.5],[24,10.2,11.5,12.7,14.1,15.3],[27,10.7,12.1,13.4,14.9,16.1],
  [30,11.3,12.7,14.1,15.6,17.0],[33,11.8,13.3,14.7,16.4,17.8],[36,12.3,13.8,15.3,17.1,18.5],
  [39,12.7,14.3,15.9,17.7,19.3],[42,13.1,14.8,16.5,18.4,20.1],[45,13.5,15.3,17.1,19.1,20.9],
  [48,13.9,15.8,17.7,19.8,21.7],[51,14.3,16.3,18.3,20.5,22.5],[54,14.7,16.8,18.9,21.2,23.3],
  [57,15.2,17.3,19.5,21.9,24.2],[60,15.6,17.9,20.2,22.7,25.1],
  [66,16.3,18.8,21.3,24.2,27.1],[72,17.0,19.8,22.5,25.8,29.2],
  [78,17.8,20.8,23.9,27.5,31.5],[84,18.7,21.9,25.4,29.5,34.0],
  [90,19.3,22.7,26.5,30.9,36.0],[96,19.9,23.4,27.5,32.3,37.9],
  [102,20.6,24.2,28.6,33.9,40.2],[108,21.2,25.0,29.7,35.5,42.5],
  [114,21.9,26.0,31.0,37.4,45.2],[120,22.6,26.9,32.3,39.3,47.9]
];
var WHO_H_GIRL=[
  [0,44.8,46.2,49.1,51.9,52.9],[1,49.8,51.5,53.7,55.9,57.3],[2,53.0,54.8,57.1,59.4,61.1],
  [3,55.6,57.4,59.8,62.2,64.0],[4,57.8,59.6,62.1,64.5,66.4],[5,59.6,61.5,64.0,66.5,68.5],
  [6,61.2,63.2,65.7,68.2,70.3],[7,62.7,64.8,67.3,69.8,72.0],[8,64.0,66.2,68.7,71.4,73.5],
  [9,65.3,67.5,70.1,72.8,74.9],[10,66.5,68.8,71.5,74.3,76.4],[11,67.7,70.1,72.8,75.7,77.8],
  [12,68.9,71.4,74.0,76.9,79.2],[15,72.0,74.8,77.5,80.4,83.0],[18,75.0,77.9,80.7,83.7,86.5],
  [21,77.5,80.6,83.7,86.7,89.7],[24,80.0,83.2,86.4,89.6,92.9],[27,82.6,85.8,89.1,92.4,96.0],
  [30,85.0,88.3,91.6,95.0,98.7],[33,87.3,90.6,94.1,97.6,101.3],[36,89.4,93.0,96.4,99.9,103.7],
  [39,91.6,95.0,98.7,102.3,106.2],[42,93.6,97.2,100.9,104.5,108.5],[45,95.4,99.2,103.0,106.7,110.8],
  [48,97.2,101.1,105.0,108.8,112.9],[51,99.0,103.0,106.9,110.8,115.0],[54,100.6,104.7,108.8,112.8,117.1],
  [57,102.4,106.5,110.6,114.7,119.2],[60,104.0,108.2,112.4,116.5,121.2],
  [66,106.3,110.6,115.3,119.6,124.5],[72,108.7,113.2,118.2,122.8,127.9],
  [78,111.2,115.8,121.0,126.0,131.3],[84,113.5,118.5,123.8,129.2,134.7],
  [90,115.8,121.0,126.4,132.0,137.6],[96,118.1,123.5,129.0,134.7,140.4],
  [102,120.2,125.9,131.6,137.6,143.5],[108,122.2,128.2,134.2,140.4,146.5],
  [114,124.2,130.5,136.8,143.3,149.5],[120,126.2,132.8,139.3,146.1,152.5]
];
var WHO_W_GIRL=[
  [0,2.4,2.8,3.2,3.7,4.2],[1,3.2,3.6,4.2,4.8,5.5],[2,3.9,4.5,5.1,5.8,6.6],
  [3,4.5,5.2,5.8,6.6,7.5],[4,5.0,5.7,6.4,7.3,8.2],[5,5.4,6.1,6.9,7.8,8.8],
  [6,5.7,6.5,7.3,8.2,9.3],[7,6.0,6.8,7.6,8.6,9.7],[8,6.3,7.0,7.9,9.0,10.2],
  [9,6.5,7.3,8.2,9.3,10.5],[10,6.7,7.5,8.5,9.6,10.9],[11,6.9,7.7,8.7,9.9,11.2],
  [12,7.0,7.9,8.9,10.1,11.5],[15,7.6,8.5,9.6,10.9,12.4],[18,8.1,9.1,10.2,11.6,13.2],
  [21,8.6,9.7,10.9,12.3,14.0],[24,9.0,10.2,11.5,13.0,14.8],[27,9.5,10.7,12.0,13.6,15.5],
  [30,10.0,11.2,12.6,14.3,16.3],[33,10.4,11.7,13.1,14.9,17.0],[36,10.8,12.1,13.6,15.5,17.7],
  [39,11.2,12.6,14.2,16.1,18.5],[42,11.6,13.1,14.7,16.7,19.2],[45,12.0,13.5,15.2,17.3,19.9],
  [48,12.3,14.0,15.7,17.9,20.6],[51,12.7,14.4,16.2,18.5,21.3],[54,13.0,14.8,16.7,19.1,22.0],
  [57,13.4,15.2,17.2,19.7,22.7],[60,13.7,15.6,17.7,20.3,23.4],
  [66,14.3,16.5,18.9,21.9,25.6],[72,15.0,17.4,20.2,23.6,28.0],
  [78,15.8,18.4,21.7,25.6,30.7],[84,16.7,19.5,23.3,27.7,33.7],
  [90,17.2,20.2,24.3,29.1,35.6],[96,17.7,20.9,25.2,30.4,37.5],
  [102,18.3,21.7,26.3,32.1,40.0],[108,18.8,22.4,27.3,33.7,42.5],
  [114,19.5,23.3,28.6,35.7,45.4],[120,20.1,24.2,29.9,37.6,48.3]
];

/* ── Supabase ── */
var S_URL='https://gfvccfpzwhwvuoxffafl.supabase.co';
var S_KEY='sb_publishable_7k8OUBz4clQhV57mSjkNlA_3xb_vTaA';
var db=supabase.createClient(S_URL,S_KEY);

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

/* ── i18n ── */
var currentLang=localStorage.getItem('growLang')||'zh';
var LANG={
  zh:{
    loading:'⭐ 成長魔法啟動中',
    appTitle:'⭐ 寶貝成長紀錄 ⭐',appSubtitle:'寶貝的成長冒險日記',
    loginTitle:'登入你的帳號',loginDesc:'資料儲存在雲端<br>換裝置也不怕資料不見！',
    googleBtn:'使用 Google 帳號登入',
    homeSubtitle:'選擇寶貝查看成長資料',logoutBtn:'登出',
    addChild:'新增寶貝',shareBtn:'👥 共享',sharedBadge:'👥 共享',
    backBtn:'← 返回',heightCm:'身高 cm',weightKg:'體重 kg',ageLabel:'年齡',
    uploadHint:'點我<br>上傳照片',
    maleBadge:'♂︎ 男生',femaleBadge:'♀︎ 女生',male:'男生',female:'女生',
    tabRecords:'成長紀錄',tabChart:'生長曲線',tabSupp:'保健紀錄',
    t1Title:'⭐ 新增量測',t1Date:'量測日期',t1Height:'身高 (cm)',t1Weight:'體重 (kg)',
    t1Note:'備註（選填）',t1NotePlaceholder:'例：診所量測、在家量測',t1Save:'⭐ 儲存量測',
    batchTitle:'⭐ 多筆匯入',
    batchDesc:'逐筆填入量測紀錄，資料來源欄位可選填（如：愛託付、診所、在家量）。',
    batchAddRow:'＋ 新增一行',batchImportBtn:'匯入所有資料',batchSrcPlaceholder:'資料來源（選填）',
    historyTitle:'⭐ 歷史量測紀錄',
    t2GrowthTitle:'⭐ 生長速度分析',t2HeightChart:'⭐ 身高生長曲線',
    t2WeightChart:'⭐ 體重生長曲線',t2CorrTitle:'⭐ 保健品 × 生長速度對比',
    whoSource:'資料來源：衛福部國健署（WHO 生長標準 0–7 歲）',
    t3AddTitle:'⭐ 新增保健品 / 配方奶',t3Date:'開始日期',t3Type:'類型',
    t3Name:'品名',t3NamePlaceholder:'例：Appeton 成長奶粉、兒童維生素D3',
    t3Note:'備註（選填）',t3NotePlaceholder:'例：每天睡前一匙',
    t3Save:'⭐ 儲存記錄',t3ListTitle:'⭐ 保健品紀錄',
    suppTypes:['保健品','營養品','成長飲品','配方奶','其他'],
    shareModalTitleBase:'👥 共享設定',shareEmailPlaceholder:'家人的 Gmail',
    shareInvite:'邀請',shareNote:'對方用自己的 Google 帳號登入後，即可查看並新增此寶貝的成長紀錄。',
    shareClose:'關閉',shareLoading:'載入中…',shareEmpty:'尚未共享給任何家人',
    shareRemove:'移除',shareRemoveConfirm:'確定移除共享？',shareRemoveFail:'移除失敗：',
    shareAddFail:'新增失敗：',shareEmailInvalid:'請輸入正確的 Email',
    shareSelf:'無法共享給自己',shareDuplicate:'已共享給此帳號',
    addChildTitle:'⭐ 新增寶貝',editChildTitle:'⭐ 編輯寶貝',
    childNameLabel:'寶貝名字',childNamePlaceholder:'例：Boss Baby',
    childBirthdayLabel:'生日',childGenderLabel:'性別',
    parentHeightHint:'👨‍👩‍👧 輸入父母身高以計算遺傳預測身高（選填）',
    fatherHeightLabel:'爸爸身高 cm',motherHeightLabel:'媽媽身高 cm',
    childCancel:'取消',childSave:'⭐ 儲存',childDelete:'刪除此寶貝的所有資料',
    childSaveRequire:'請填入名字和生日',childSaveFail:'儲存失敗：',
    childDeleteFail:'刪除失敗：',
    mRequire:'請填入日期、身高、體重',mHeightRange:'身高請輸入合理數值（40–200 cm）',
    mWeightRange:'體重請輸入合理數值（2–100 kg）',mSaveFail:'儲存失敗：',
    mFutureDate:'量測日期不能是未來日期。',mBeforeBirthday:'量測日期不能早於出生日期。',
    mDupDate:'此日期已有紀錄，確定要新增？',
    mDeleteConfirm:'確定要刪除這筆紀錄嗎？',mDeleteFail:'刪除失敗：',
    gaPrediction:'預測成人身高',gaPredictionNote:'（以目前身高百分位推估，僅供參考）',
    printBtn:'📄 報告',printReportTitle:'寶貝成長報告',reportBtnText:'生成成長報告',
    batchKeepOne:'至少保留一行',batchRequire:'請至少填入一筆完整資料',
    batchImportFail:'匯入失敗：',batchSource:'批次匯入',
    sRequire:'請填入日期和品名',sSaveFail:'儲存失敗：',
    sDeleteConfirm:'確定要刪除嗎？',sDeleteFail:'刪除失敗：',
    noChildTitle:'尚未建立寶貝資料 🌱',noChildSub:'新增寶貝資料後，就可以開始記錄成長囉。',
    recordsEmpty:'還沒有成長紀錄 🌱',recordsEmptySub:'新增第一筆身高體重後，就可以看到成長曲線。',
    tDate:'日期',tMonthAge:'月齡',tHeight:'身高',tWeight:'體重',tNote:'備註',tDelete:'刪除',
    suppEmpty:'還沒有保健品紀錄 🌱',suppEmptySub:'新增保健品或配方奶後，就可以開始追蹤營養補充紀錄。',
    gaMin2:'需要至少 2 筆量測紀錄才能計算年增長速度。',
    gaNotEnough:'量測時間跨度不足，請增加更多歷史紀錄。',
    gaStatDate:'最新量測日期',gaStatAge:'目前年齡',gaAnnual:'年化身高增長',gaAnnualW:'年化體重增長',
    gaMin:'此年齡最低標準',gaGap:'距達標還差',
    corrEmpty:'還沒有營養紀錄 🌱',corrEmptySub:'新增保健品或配方奶紀錄後，就可以比較生長變化。',
    corrNeedMore:'需要至少 2 筆量測紀錄才能對比效果。',
    corrDesc:'比較開始服用保健品前後的年化身高增長速度。曲線圖上的綠色虛線為各保健品開始日期。',
    corrBefore:'服用前增長速度',corrAfter:'服用後增長速度',
    corrInsufficient:'資料不足',corrObserving:'尚在觀察中',corrOtherFactors:'（可能受其他因素影響）',
    birthday:'出生',
    warn1:'低於0–1歲兒童的預期範圍，建議進一步就醫評估。',warn2:'低於1–2歲兒童的預期範圍，建議進一步就醫評估。',
    warn3:'低於2–3歲兒童的預期範圍，建議進一步就醫評估。',warn4:'低於3歲以上兒童的預期範圍，建議至兒童內分泌科評估。',
    warnHigh1:'高於0–1歲兒童的預期範圍，建議進一步就醫評估。',warnHigh2:'高於1–2歲兒童的預期範圍，建議進一步就醫評估。',
    warnHigh3:'高於2–3歲兒童的預期範圍，建議進一步就醫評估。',warnHigh4:'高於3歲以上兒童的預期範圍，建議至兒童內分泌科評估。',
    pLow:'低於P3（偏低）',p3to15:'P3–P15',p15to50:'P15–P50',
    p50to85:'P50–P85',p85to97:'P85–P97',pHigh:'高於P97（偏高）',
    chartMonthAge:'月齡（個月）',chartHeight:'身高（cm）',chartWeight:'體重（kg）',
    deleteAccountBtn:'⚠ 刪除帳號 & 所有資料',
    deleteAccountWarn:'⚠️ 警告：這會永久刪除此帳號底下的所有寶貝、量測紀錄及保健紀錄，無法復原！\n\n確定要繼續嗎？',
    deleteAccountWord:'確認刪除',
    deleteAccountPrompt:'請輸入「確認刪除」來確認永久刪除：',
    deleteAccountCancel:'已取消。',
    deleteAccountOk:'✅ 所有資料已刪除，您已登出。\n\n提示：如需完全取消 Google 授權，請至 myaccount.google.com → 安全性 → 第三方應用程式存取。',
    deleteAccountFail:'刪除失敗：',
    mSoftWarnDecrease:'⚠ 身高比上次紀錄低了 {d} cm\n上次：{h} cm（{date}）\n身高通常不會減少，請確認是否輸入正確。\n\n確定要繼續儲存嗎？',
    mSoftWarnJump:'⚠ 身高在 {days} 天內增長了 {d} cm，幅度異常偏大。\n請確認是否輸入正確。\n\n確定要繼續儲存嗎？',
    mSoftWarnWeight:'⚠ 體重在 {days} 天內變動了 {d} kg，幅度偏大。\n請確認是否輸入正確。\n\n確定要繼續儲存嗎？',
    backupTitle:'🗂️ 資料備份 / 還原',
    backupDesc:'將目前寶貝的量測及保健品資料匯出為 JSON 備份檔，或從備份檔案還原資料。',
    exportBtn:'📤 備份 JSON',importBtn:'📥 還原 JSON',
    importConfirm:'準備匯入：{m} 筆量測紀錄，{s} 筆保健品記錄。\n（重複日期自動略過）\n\n確定要繼續嗎？',
    importOk:'✅ 匯入成功！已新增：{m} 筆量測，{s} 筆保健品。',
    importNone:'沒有新紀錄可匯入（所有日期已存在）。',
    importInvalid:'無效的備份檔案。',importNewVer:'此備份由較新版本建立，可能有相容性問題，確定要匯入嗎？',
    importFail:'匯入失敗：',importReadFail:'讀取檔案失敗：',
    editMeasureTitle:'✏️ 編輯量測紀錄',editSuppTitle:'✏️ 編輯保健品紀錄',editSave:'⭐ 儲存修改',
    mEditFail:'編輯失敗：',sEditFail:'編輯失敗：'
  },
  en:{
    loading:'⭐ Loading Growth Magic…',
    appTitle:'⭐ Baby Growth Tracker ⭐',appSubtitle:"Your Baby's Growth Adventure",
    loginTitle:'Sign in to your account',loginDesc:'Data stored in the cloud<br>Access from any device!',
    googleBtn:'Sign in with Google',
    homeSubtitle:'Select a child to view growth data',logoutBtn:'Log Out',
    addChild:'Add Child',shareBtn:'👥 Share',sharedBadge:'👥 Shared',
    backBtn:'← Back',heightCm:'Height cm',weightKg:'Weight kg',ageLabel:'Age',
    uploadHint:'Tap to<br>Upload Photo',
    maleBadge:'♂︎ Boy',femaleBadge:'♀︎ Girl',male:'Boy',female:'Girl',
    tabRecords:'Records',tabChart:'Charts',tabSupp:'Supplements',
    t1Title:'⭐ Add Measurement',t1Date:'Date',t1Height:'Height (cm)',t1Weight:'Weight (kg)',
    t1Note:'Note (optional)',t1NotePlaceholder:'e.g. Clinic, Home',t1Save:'⭐ Save',
    batchTitle:'⭐ Batch Import',
    batchDesc:'Enter multiple records. Source field is optional (e.g. Clinic, Home).',
    batchAddRow:'＋ Add Row',batchImportBtn:'Import All',batchSrcPlaceholder:'Source (optional)',
    historyTitle:'⭐ Measurement History',
    t2GrowthTitle:'⭐ Growth Rate',t2HeightChart:'⭐ Height Growth Chart',
    t2WeightChart:'⭐ Weight Growth Chart',t2CorrTitle:'⭐ Growth Impact',
    whoSource:'Source: WHO Child Growth Standards (0–7 years)',
    t3AddTitle:'⭐ Add Supplement / Formula',t3Date:'Start Date',t3Type:'Type',
    t3Name:'Product Name',t3NamePlaceholder:'e.g. Vitamin D3, Growth Formula',
    t3Note:'Note (optional)',t3NotePlaceholder:'e.g. One scoop before bed',
    t3Save:'⭐ Save Record',t3ListTitle:'⭐ Supplement Records',
    suppTypes:['Supplement','Nutrition','Growth Drink','Formula','Other'],
    shareModalTitleBase:'👥 Sharing Settings',shareEmailPlaceholder:"Family member's Gmail",
    shareInvite:'Invite',shareNote:'Once invited, they can sign in with their own Google account to view and add records.',
    shareClose:'Close',shareLoading:'Loading…',shareEmpty:'Not shared with anyone yet',
    shareRemove:'Remove',shareRemoveConfirm:'Remove this share?',shareRemoveFail:'Remove failed: ',
    shareAddFail:'Failed to add: ',shareEmailInvalid:'Please enter a valid email',
    shareSelf:'Cannot share with yourself',shareDuplicate:'Already shared with this account',
    addChildTitle:'⭐ Add Child',editChildTitle:'⭐ Edit Child',
    childNameLabel:"Child's Name",childNamePlaceholder:'e.g. Boss Baby',
    childBirthdayLabel:'Birthday',childGenderLabel:'Gender',
    parentHeightHint:'👨‍👩‍👧 Enter parent heights for genetic height prediction (optional)',
    fatherHeightLabel:"Father's Height cm",motherHeightLabel:"Mother's Height cm",
    childCancel:'Cancel',childSave:'⭐ Save',childDelete:'Delete all data for this child',
    childSaveRequire:'Please enter name and birthday',childSaveFail:'Save failed: ',
    childDeleteFail:'Delete failed: ',
    mRequire:'Please enter date, height and weight',mHeightRange:'Height must be 40–200 cm',
    mWeightRange:'Weight must be 2–100 kg',mSaveFail:'Save failed: ',
    mFutureDate:'Measurement date cannot be in the future.',mBeforeBirthday:'Measurement date cannot be before the birthday.',
    mDupDate:'A record already exists for this date. Add anyway?',
    mDeleteConfirm:'Delete this record?',mDeleteFail:'Delete failed: ',
    gaPrediction:'Predicted Adult Height',gaPredictionNote:'(estimated from current height percentile, for reference only)',
    printBtn:'📄 Report',printReportTitle:'Baby Growth Report',reportBtnText:'Generate Report',
    batchKeepOne:'Keep at least one row',batchRequire:'Please fill in at least one complete record',
    batchImportFail:'Import failed: ',batchSource:'Batch',
    sRequire:'Please enter date and product name',sSaveFail:'Save failed: ',
    sDeleteConfirm:'Delete this record?',sDeleteFail:'Delete failed: ',
    noChildTitle:'No baby profile yet 🌱',noChildSub:"Add your little one's profile to start tracking growth.",
    recordsEmpty:'No growth records yet 🌱',recordsEmptySub:'Add the first height and weight record to see the growth chart.',
    tDate:'Date',tMonthAge:'Age',tHeight:'Height',tWeight:'Weight',tNote:'Note',tDelete:'Del',
    suppEmpty:'No supplement records yet 🌱',suppEmptySub:'Add supplements or formula records to start tracking nutrition history.',
    gaMin2:'At least 2 measurements are needed to calculate annual growth rate.',
    gaNotEnough:'Not enough history. Please add more records.',
    gaStatDate:'Latest measurement',gaStatAge:'Current age',gaAnnual:'Annual height growth',gaAnnualW:'Annual weight growth',
    gaMin:'Min. standard for this age',gaGap:'Short of target',
    corrEmpty:'No supplement records yet 🌱',corrEmptySub:'Add supplements or formula records to compare growth changes.',
    corrNeedMore:'At least 2 measurements are needed to compare effects.',
    corrDesc:'Comparing annualized height growth before and after starting each supplement. Green dashed lines on the chart show start dates.',
    corrBefore:'Growth before',corrAfter:'Growth after',
    corrInsufficient:'Insufficient data',corrObserving:'Still observing',corrOtherFactors:'(may be influenced by other factors)',
    birthday:'born',
    warn1:'Below the expected range for children aged 0–1 years. Consider medical evaluation.',
    warn2:'Below the expected range for children aged 1–2 years. Consider medical evaluation.',
    warn3:'Below the expected range for children aged 2–3 years. Consider medical evaluation.',
    warn4:'Below the expected range for children over 3 years old. Consider pediatric endocrinology evaluation.',
    warnHigh1:'Above the expected range for children aged 0–1 years. Consider medical evaluation.',
    warnHigh2:'Above the expected range for children aged 1–2 years. Consider medical evaluation.',
    warnHigh3:'Above the expected range for children aged 2–3 years. Consider medical evaluation.',
    warnHigh4:'Above the expected range for children over 3 years old. Consider pediatric endocrinology evaluation.',
    pLow:'Below P3 (Low)',p3to15:'P3–P15',p15to50:'P15–P50',
    p50to85:'P50–P85',p85to97:'P85–P97',pHigh:'Above P97 (High)',
    chartMonthAge:'Age (months)',chartHeight:'Height (cm)',chartWeight:'Weight (kg)',
    deleteAccountBtn:'⚠ Delete Account & All Data',
    deleteAccountWarn:'⚠️ WARNING: This will PERMANENTLY delete all children, measurements, and supplement records. This cannot be undone!\n\nAre you sure?',
    deleteAccountWord:'DELETE',
    deleteAccountPrompt:'Type "DELETE" to confirm permanent deletion:',
    deleteAccountCancel:'Cancelled.',
    deleteAccountOk:'✅ All data deleted. You have been signed out.\n\nNote: To fully revoke Google login access, visit myaccount.google.com → Security → Third-party apps.',
    deleteAccountFail:'Delete failed: ',
    mSoftWarnDecrease:'⚠ Height is {d} cm LOWER than the last record\nLast: {h} cm ({date})\nHeight rarely decreases — please check your entry.\n\nSave anyway?',
    mSoftWarnJump:'⚠ Height increased by {d} cm in only {days} days.\nThis seems unusually large — please confirm.\n\nSave anyway?',
    mSoftWarnWeight:'⚠ Weight changed by {d} kg in {days} days.\nThis seems large — please confirm.\n\nSave anyway?',
    backupTitle:'🗂️ Backup / Restore',
    backupDesc:'Export current child\'s records as a JSON backup, or restore from a backup file.',
    exportBtn:'📤 Export JSON',importBtn:'📥 Import JSON',
    importConfirm:'Ready to import: {m} measurements, {s} supplements.\n(Duplicates are skipped)\n\nProceed?',
    importOk:'✅ Import successful! Added: {m} measurements, {s} supplements.',
    importNone:'No new records to import (all dates already exist).',
    importInvalid:'Invalid backup file.',importNewVer:'This backup was created by a newer version. Import anyway?',
    importFail:'Import failed: ',importReadFail:'Failed to read file: ',
    editMeasureTitle:'✏️ Edit Measurement',editSuppTitle:'✏️ Edit Supplement',editSave:'⭐ Save Changes',
    mEditFail:'Edit failed: ',sEditFail:'Edit failed: '
  }
};
function t(k){return (LANG[currentLang]&&LANG[currentLang][k]!==undefined)?LANG[currentLang][k]:(LANG.zh[k]||k);}
function setLang(lang){
  currentLang=lang;localStorage.setItem('growLang',lang);
  applyLang();
  renderChildCards();
  if(currentChild){
    updateHeroFromChild();renderRecords();renderGrowthAnalysis();
    renderSupplements();renderSuppCorrelation();
    if(hChart||wChart)renderCharts();
  }
}
function applyLang(){
  // Update data-i18n elements (textContent)
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');var v=t(k);if(v!==undefined)el.textContent=v;
  });
  // Update data-i18n-html elements (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){
    var k=el.getAttribute('data-i18n-html');var v=t(k);if(v!==undefined)el.innerHTML=v;
  });
  // Update data-i18n-placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
    var k=el.getAttribute('data-i18n-placeholder');var v=t(k);if(v!==undefined)el.placeholder=v;
  });
  // Update supplement type options
  var suppTypes=t('suppTypes');
  document.querySelectorAll('[data-i18n-opt]').forEach(function(el){
    var i=parseInt(el.getAttribute('data-i18n-opt'));
    if(suppTypes[i]!==undefined)el.textContent=suppTypes[i];
  });
  // Update gender options in child modal
  document.querySelectorAll('[data-i18n-gopt]').forEach(function(el){
    var k=el.getAttribute('data-i18n-gopt');el.textContent=t(k);
  });
  // Update active lang buttons
  ['loginLangZh','homeLangZh'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.classList.toggle('active',currentLang==='zh');
  });
  ['loginLangEn','homeLangEn'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.classList.toggle('active',currentLang==='en');
  });
  // Update html lang attribute
  document.documentElement.lang=currentLang==='en'?'en':'zh-TW';
}

/* ── Loading ── */
function showLoading(){document.getElementById('loadingOverlay').classList.remove('hidden');}
function hideLoading(){document.getElementById('loadingOverlay').classList.add('hidden');}

/* ── Init lang ── */
applyLang();

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

/* ── DB Helpers ── */
async function db_getChildren(){
  var r1=await db.from('children').select('*').eq('user_id',currentUser.id).order('created_at');
  var own=(r1.data||[]).map(function(c){return Object.assign({},c,{_isOwner:true});});
  var r2=await db.from('child_shares').select('id,child_id').eq('shared_with_email',currentUser.email);
  var shares=r2.data||[];
  var sharedChildren=[];
  if(shares.length){
    var ids=shares.map(function(s){return s.child_id;});
    var shareMap={};
    shares.forEach(function(s){shareMap[s.child_id]=s.id;});
    var r3=await db.from('children').select('*').in('id',ids);
    sharedChildren=(r3.data||[]).map(function(c){
      return Object.assign({},c,{_isOwner:false,_shareId:shareMap[c.id]});
    });
  }
  return own.concat(sharedChildren);
}
async function db_getShares(childId){
  var r=await db.from('child_shares').select('*').eq('child_id',childId).eq('owner_id',currentUser.id);
  return r.data||[];
}
async function db_addShare(childId,email){
  var r=await db.from('child_shares').insert({child_id:childId,owner_id:currentUser.id,shared_with_email:email}).select().single();
  if(r.error)throw r.error;
  return r.data;
}
async function db_removeShare(shareId){
  var r=await db.from('child_shares').delete().eq('id',shareId).eq('owner_id',currentUser.id);
  if(r.error)throw r.error;
}
async function db_insertChild(obj){
  var r=await db.from('children').insert(Object.assign({},obj,{user_id:currentUser.id})).select().single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_updateChild(id,obj){
  var r=await db.from('children').update(obj).eq('id',id);
  if(r.error) throw r.error;
}
async function db_deleteChild(childId){
  await db.from('supplements').delete().eq('child_id',childId);
  await db.from('measurements').delete().eq('child_id',childId);
  await db.storage.from('child-photos').remove([currentUser.id+'/'+childId+'.jpg']);
  var r=await db.from('children').delete().eq('id',childId);
  if(r.error) throw r.error;
}
async function db_getM(childId){
  var r=await db.from('measurements').select('id,date,height,weight,note').eq('child_id',childId).order('date',{ascending:false});
  return r.data||[];
}
async function db_insertM(obj){
  var r=await db.from('measurements').insert({date:obj.date,height:obj.height,weight:obj.weight,note:obj.note||null,child_id:currentChild.id,user_id:currentUser.id}).select('id,date,height,weight,note').single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_insertMBatch(arr){
  var rows=arr.map(function(r){return{date:r.date,height:r.height,weight:r.weight,note:r.note||null,child_id:currentChild.id,user_id:currentUser.id};});
  var r=await db.from('measurements').insert(rows).select('id,date,height,weight,note');
  if(r.error) throw r.error;
  return r.data||[];
}
async function db_deleteM(id){
  var r=await db.from('measurements').delete().eq('id',id);
  if(r.error) throw r.error;
}
async function db_getS(childId){
  var r=await db.from('supplements').select('id,date,type,name,note').eq('child_id',childId).order('date',{ascending:false});
  return r.data||[];
}
async function db_insertS(obj){
  var r=await db.from('supplements').insert({date:obj.date,type:obj.type,name:obj.name,note:obj.note||null,child_id:currentChild.id}).select('id,date,type,name,note').single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_deleteS(id){
  var r=await db.from('supplements').delete().eq('id',id);
  if(r.error) throw r.error;
}
async function db_updateM(id,obj){
  var r=await db.from('measurements').update(obj).eq('id',id);
  if(r.error) throw r.error;
}
async function db_updateS(id,obj){
  var r=await db.from('supplements').update(obj).eq('id',id);
  if(r.error) throw r.error;
}

/* ── Edit Measurement ── */
function editMeasurement(id){
  var m=measurements.find(function(m){return m.id===id;});
  if(!m)return;
  document.getElementById('editMeasureId').value=id;
  document.getElementById('editMeasureDate').value=m.date;
  document.getElementById('editMeasureHeight').value=m.height;
  document.getElementById('editMeasureWeight').value=m.weight;
  document.getElementById('editMeasureNote').value=m.note||'';
  document.getElementById('editMeasureModal').classList.remove('hidden');
}
function closeEditMeasureModal(){document.getElementById('editMeasureModal').classList.add('hidden');}
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
  document.getElementById('editSuppModal').classList.remove('hidden');
}
function closeEditSuppModal(){document.getElementById('editSuppModal').classList.add('hidden');}
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
  document.getElementById('photoRing').addEventListener('click',function(){
    if(currentChild&&!currentChild._isOwner)return;
    document.getElementById('photoFileInput').click();
  });
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
  document.getElementById('childModal').classList.remove('hidden');
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
  document.getElementById('childModal').classList.remove('hidden');
  setupChildFormKeyNav();
}
function renderEmojiGrid(){
  document.getElementById('emojiGrid').innerHTML=EMOJIS.map(function(e){
    return '<div class="emoji-opt'+(e===selectedEmoji?' selected':'')+'" onclick="selectEmoji(\''+e+'\')">'+e+'</div>';
  }).join('');
}
function selectEmoji(e){selectedEmoji=e;renderEmojiGrid();}
function closeModal(){document.getElementById('childModal').classList.add('hidden');}

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
      return '<tr><td>'+fmtDate(m.date)+'</td><td>'+fmtAgeFull(currentChild.birthday,m.date)+'</td><td><strong>'+m.height+'</strong> cm</td><td><strong>'+m.weight+'</strong> kg</td><td>'+bmi+'</td><td style="color:#AAA;font-size:0.8em;">'+(m.note||'—')+'</td><td style="white-space:nowrap;"><button class="btn btn-secondary" style="font-size:0.65em;padding:5px 9px;margin-right:4px;min-height:36px;" onclick="editMeasurement(\''+m.id+'\')">✏️</button><button class="btn btn-danger" onclick="deleteMeasurement(\''+m.id+'\')">'+t('tDelete')+'</button></td></tr>';
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
function _getZodiac(bday){
  var d=new Date(bday),m=d.getMonth()+1,day=d.getDate();
  if((m==12&&day>=22)||(m==1&&day<=19))return'摩羯座';
  if((m==1&&day>=20)||(m==2&&day<=18))return'水瓶座';
  if((m==2&&day>=19)||(m==3&&day<=20))return'雙魚座';
  if((m==3&&day>=21)||(m==4&&day<=19))return'牡羊座';
  if((m==4&&day>=20)||(m==5&&day<=20))return'金牛座';
  if((m==5&&day>=21)||(m==6&&day<=20))return'雙子座';
  if((m==6&&day>=21)||(m==7&&day<=22))return'巨蟹座';
  if((m==7&&day>=23)||(m==8&&day<=22))return'獅子座';
  if((m==8&&day>=23)||(m==9&&day<=22))return'處女座';
  if((m==9&&day>=23)||(m==10&&day<=22))return'天秤座';
  if((m==10&&day>=23)||(m==11&&day<=21))return'天蠍座';
  return'射手座';
}
function _getChineseZodiac(bday){
  var z=['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];
  return z[(new Date(bday).getFullYear()-1900)%12];
}
function buildReportHTML(hImg,wImg){
  var isEn=currentLang==='en';
  var dateStr=new Date().toLocaleDateString(isEn?'en-US':'zh-TW',{year:'numeric',month:'long',day:'numeric'});
  var dateShort=new Date().toISOString().slice(0,10).replace(/-/g,'.');
  var name=currentChild.name;
  var gender=currentChild.gender;
  var bday=currentChild.birthday;
  var bdayFmt=bday.replace(/-/g,'.');
  var zodiac=_getZodiac(bday);
  var chineseZodiac=_getChineseZodiac(bday);
  var sorted=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);});
  var latest=sorted[sorted.length-1];
  var latestAge=getAgeMonths(latest.date);
  var latestDate=new Date(latest.date);
  var ageStr=fmtAgeFull(bday,latest.date);
  var whoH=gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var whoW=gender==='女'?WHO_W_GIRL:WHO_W_BOY;
  var hPct=getPctLabel(latestAge,latest.height,whoH);
  var wPct=getPctLabel(latestAge,latest.weight,whoW);
  var hRank=getPctRank(latestAge,latest.height,whoH);
  var wRank=getPctRank(latestAge,latest.weight,whoW);
  var pred=predictAdultHeight();
  // Growth rate — same logic as renderGrowthAnalysis (FIXED: midpoint age for threshold)
  var annualH=null,thresh=null,annualLow=false,ref=null,months=null,hDiff=null,refDays=null;
  if(measurements.length>=2){
    var bestDiff=Infinity;
    sorted.slice(0,-1).forEach(function(m){var d=(latestDate-new Date(m.date))/86400000;if(d>=60&&Math.abs(d-365)<bestDiff){bestDiff=Math.abs(d-365);ref=m;}});
    if(ref){
      refDays=(latestDate-new Date(ref.date))/86400000;
      months=(refDays/30).toFixed(1);
      hDiff=(latest.height-ref.height).toFixed(1);
      annualH=(parseFloat(hDiff)/refDays*365).toFixed(1);
      thresh=getMinGrowth(latestAge-parseFloat(months)/2);
      annualLow=parseFloat(annualH)<thresh.min;
    }
  }
  // Avatar
  var avatarHTML=currentChild._reportPhotoUrl
    ?'<img src="'+currentChild._reportPhotoUrl+'" style="width:80px;height:80px;border-radius:50%;border:4px solid rgba(255,255,255,0.7);object-fit:cover;box-shadow:3px 3px 0 rgba(0,0,0,0.3);flex-shrink:0;" crossorigin="anonymous">'
    :'<div style="width:80px;height:80px;flex-shrink:0;border-radius:50%;border:4px solid rgba(255,255,255,0.5);background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:2.4em;box-shadow:3px 3px 0 rgba(0,0,0,0.3);">'+(gender==='女'?'👧':'👦')+'</div>';
  // Alert card (right side of hero)
  var acColor,acBg,acBorder,acTitle,acBody,acNote;
  if(annualH!==null){
    if(annualLow){
      acColor='#AA1A18';acBg='#FFD6D5';acBorder='#E52521';
      acTitle='<span style="color:#E52521;">⚠ '+(isEn?'GROWTH ALERT':'生長警示')+'</span>';
      acBody=(isEn?'Height growth: <strong>'+annualH+' cm/yr</strong><br>Below min. <strong>'+thresh.min+' cm/yr</strong>':'身高年化增長：<strong>'+annualH+' cm/年</strong><br>低於標準 <strong>'+thresh.min+' cm/年</strong>');
      acNote='<span style="color:#6B4C2A;">💡 '+(isEn?'Consult a pediatrician':'建議諮詢兒科醫師')+'</span>';
    }else{
      acColor='#1A6B0A';acBg='#BFEFB2';acBorder='#3A9D23';
      acTitle='<span style="color:#3A9D23;">✓ '+(isEn?'ON TRACK':'成長達標')+'</span>';
      acBody=(isEn?'Height growth: <strong>'+annualH+' cm/yr</strong><br>Above min. <strong>'+thresh.min+' cm/yr</strong> ✓':'身高年化增長：<strong>'+annualH+' cm/年</strong><br>達標基準 <strong>'+thresh.min+' cm/年</strong> ✓');
      acNote='<span style="color:#1A6B0A;">⭐ '+(isEn?'Keep it up!':'繼續保持！')+'</span>';
    }
  }else{
    acColor='#0270A0';acBg='#C4ECFF';acBorder='#049CD8';
    acTitle='<span style="color:#049CD8;">📈 '+(isEn?'TRACKING':'成長追蹤')+'</span>';
    acBody=(isEn?'Add 2+ measurements<br>to see growth rate':'新增至少 2 筆量測<br>查看生長速度分析');
    acNote='';
  }
  var rptMph=calcMidParentalHeight();
  // Reminder bullets
  var rmBullets=[];
  if(annualH!==null&&annualLow)rmBullets.push(isEn?'<li>⚠️ Height growth (<strong>'+annualH+' cm/yr</strong>) is below the minimum standard of <strong>'+thresh.min+' cm/yr</strong>. Please consult a pediatrician for professional assessment.</li>':'<li>⚠️ 身高年化增長速度（<strong>'+annualH+' cm/年</strong>）低於最低標準（<strong>'+thresh.min+' cm/年</strong>），建議盡快諮詢兒科醫師進行評估。</li>');
  if(hRank==='low')rmBullets.push(isEn?'<li>📏 Height is below P3. Maintain balanced diet, adequate sleep, and regular physical activity.</li>':'<li>📏 身高位於 P3 以下，建議保持均衡飲食、充足睡眠及規律運動，持續追蹤。</li>');
  if(wRank==='low')rmBullets.push(isEn?'<li>⚖️ Weight is below P3. Ensure sufficient caloric intake and nutritional balance.</li>':'<li>⚖️ 體重位於 P3 以下，建議確保足夠熱量攝取與營養均衡。</li>');
  if(hRank==='high')rmBullets.push(isEn?'<li>📏 Height is above P97. Regular monitoring with a healthcare provider is recommended.</li>':'<li>📏 身高位於 P97 以上，建議定期與醫師追蹤評估。</li>');
  if(wRank==='high')rmBullets.push(isEn?'<li>⚖️ Weight is above P97. Maintain healthy eating habits and regular exercise.</li>':'<li>⚖️ 體重位於 P97 以上，建議維持健康飲食習慣及規律運動。</li>');
  rmBullets.push(isEn?'<li>📅 Growth assessment is recommended every 3–6 months to track long-term trends.</li>':'<li>📅 建議每 3–6 個月定期量測，追蹤長期生長趨勢。</li>');
  if(pred&&pred.isExtreme)rmBullets.push(isEn?'<li>⚠️ Height is at an extreme percentile (below P3 or above P97). Genetic prediction may be more reliable — please consult a pediatrician for accurate assessment.</li>':'<li>⚠️ 身高處於極端百分位（P3以下或P97以上），遺傳預測可能更具參考價值，建議諮詢小兒科醫師進行評估。</li>');
  if(rptMph)rmBullets.push(isEn?'<li>🧬 Genetic predicted height (Mid-Parental Height): <strong>'+rptMph.target+' cm</strong> (range '+rptMph.low+'–'+rptMph.high+' cm).</li>':'<li>🧬 遺傳預測身高（父母中間值法）：<strong>'+rptMph.target+' cm</strong>（範圍 '+rptMph.low+'–'+rptMph.high+' cm）。</li>');
  /* Avatar HTML */
  var photoHTML=currentChild._reportPhotoUrl
    ?'<img src="'+currentChild._reportPhotoUrl+'" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;">'
    :'<span style="font-size:1.9em;opacity:0.70;">📷</span><span class="prof-photo-txt">'+(isEn?'Photo':'寶貝照片')+'</span>';
  /* Age formatted for display */
  var ageDisplay=(function(){
    var b=new Date(bday),d=new Date(latest.date);
    var y=d.getFullYear()-b.getFullYear(),mo=d.getMonth()-b.getMonth(),da=d.getDate()-b.getDate();
    if(da<0){mo--;da+=new Date(d.getFullYear(),d.getMonth(),0).getDate();}
    if(mo<0){y--;mo+=12;}
    if(isEn)return(y?y+'Y ':'')+(mo?mo+'M':'');
    return(y?'<span style="font-size:1.1em;font-weight:900;color:#FFD166;">'+y+'</span> 歲 ':'')+(mo?'<span style="font-size:1.1em;font-weight:900;color:#FFD166;">'+mo+'</span> 個月':'');
  })();
  /* Stat row helper */
  var sRow=function(icon,lbl,val,sub,vStyle){
    return '<div class="sr"><span class="si">'+icon+'</span><span class="sl">'+lbl+'</span><span class="sv"'+(vStyle?' style="'+vStyle+'"':'')+'>'+val+(sub?'<span class="sv-sub">'+sub+'</span>':'')+'</span></div>';
  };
  var wDiffVal=ref?(parseFloat(latest.weight)-parseFloat(ref.weight)).toFixed(1):null;
  var statsHTML=
    sRow('🗓',isEn?'Date':'量測日期',fmtDate(latest.date))+
    sRow('⏱',isEn?'Age':'年齡',ageStr)+
    sRow('📏',isEn?'Height':'身高',latest.height+' cm',hRank==='low'?(isEn?'(Below P3 · Low)':'(低於P3 · 偏低)'):hRank==='high'?(isEn?'(Above P97 · High)':'(高於P97 · 偏高)'):null)+
    sRow('⚖️',isEn?'Weight':'體重',latest.weight+' kg',wRank==='low'?(isEn?'(Below P3 · Low)':'(低於P3 · 偏低)'):wRank==='high'?(isEn?'(Above P97)':'(高於P97)'):null)+
    (ref?sRow('➕',isEn?'Growth Δ':'增長差',(parseFloat(hDiff)>=0?'+':'')+hDiff+' cm / '+(parseFloat(wDiffVal)>=0?'+':'')+wDiffVal+' kg','('+fmtDate(ref.date)+')',parseFloat(hDiff)>=0?'color:#4CAF50;':'color:#EF5350;'):'')+
    (annualH!==null?sRow('🔴',isEn?'Annual Height':'年化身高增長',annualH+(isEn?' cm/yr':' cm/年'),null,annualLow?'color:#E52521;font-weight:900;':'color:#4CAF50;font-weight:900;'):'')+
    (ref&&refDays?sRow('📈',isEn?'Annual Weight':'年化體重增長',(parseFloat(wDiffVal)/refDays*365).toFixed(1)+(isEn?' kg/yr':' kg/年')):'')+
    (thresh?sRow('⬇️',isEn?'Min. Std':'最低標準',thresh.min+(isEn?' cm/yr':' cm/年')):'')+
    (annualH!==null&&annualLow?sRow('📊',isEn?'Gap':'距標準差',(thresh.min-parseFloat(annualH)).toFixed(1)+(isEn?' cm/yr':' cm/年'),null,'color:#E52521;font-weight:900;'):'')+
    (rptMph?sRow('🧬',isEn?'Genetic':'遺傳預測',rptMph.target+' cm','('+rptMph.low+'–'+rptMph.high+')','color:#FB8C00;'):'');
  var safeName=esc(name);
  var dlName=JSON.stringify(name+'_report_'+new Date().toISOString().slice(0,10)+'.png');
  var isMobileDev=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  var saveBtnLabel=JSON.stringify('📱 '+(isMobileDev?(isEn?'Save / Share':'儲存／分享'):(isEn?'Save as Image':'儲存圖片')));
  var shareBtnLabel=JSON.stringify(isEn?'Share to LINE':'分享到 LINE');
  var loadingLabel=JSON.stringify('⏳ '+(isEn?'Loading...':'載入中...'));
  var baseHref=window.location.href.replace(/[^/]*$/,'');
  var bgUrl=baseHref+'images/header-bg.jpg';
  var contentBgUrl=baseHref+'images/content-bg.jpg';
  var desktopBgUrl=baseHref+'images/desktop-bg.png';
  /* Supplement comparison rows */
  var scRowsHTML='';
  if(supplements.length&&sorted.length>=2){
    var cmYr2=isEn?' cm/yr':' cm/年';
    supplements.slice().sort(function(a,b){return a.date.localeCompare(b.date);}).forEach(function(s){
      var bef2=sorted.filter(function(m){return m.date<s.date;});
      var aft2=sorted.filter(function(m){return m.date>s.date;});
      var bR=null,aR=null;
      if(bef2.length>=2){var bd2=(new Date(bef2[bef2.length-1].date)-new Date(bef2[0].date))/86400000;if(bd2>=14)bR=((bef2[bef2.length-1].height-bef2[0].height)/bd2*365).toFixed(1);}
      if(aft2.length>=2){var ad2=(new Date(aft2[aft2.length-1].date)-new Date(aft2[0].date))/86400000;if(ad2>=14)aR=((aft2[aft2.length-1].height-aft2[0].height)/ad2*365).toFixed(1);}
      var df2=bR!==null&&aR!==null?(parseFloat(aR)-parseFloat(bR)).toFixed(1):null;
      var pos3=df2!==null&&parseFloat(df2)>0;
      scRowsHTML+='<div class="sc-row">'+
        '<span class="sc-name">⭐ '+esc(s.name)+'</span>'+
        '<span class="sc-since">'+(isEn?'since ':'自 ')+fmtDate(s.date)+'</span>'+
        '<span style="flex:1"></span>'+
        '<span class="sc-rate sc-bef">'+(isEn?'Before: ':'前：')+(bR!==null?bR+cmYr2.trim():(isEn?'—':'資料不足'))+'</span>'+
        '<span class="sc-arr">→</span>'+
        '<span class="sc-rate '+(aR!==null?'sc-aft-ok':'sc-aft-obs')+'">'+(isEn?'After: ':'後：')+(aR!==null?aR+cmYr2.trim():(isEn?'Observing…':'觀察中'))+'</span>'+
        (df2!==null?'<span class="sc-diff '+(pos3?'sc-pos':'sc-neg')+'">'+(pos3?'▲ +':'▼ ')+df2+cmYr2.trim()+'</span>':'')+
      '</div>';
    });
  }
  return '<!DOCTYPE html><html lang="'+(isEn?'en':'zh-TW')+'"><head>'+
  '<meta charset="UTF-8"><meta name="viewport" content="width=860">'+
  '<base href="'+baseHref+'">'+
  '<title>'+(isEn?safeName+"'s Growth Report":safeName+' 成長報告')+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Zen+Maru+Gothic:wght@700&display=swap" rel="stylesheet">'+
  '<style>'+
  '*{box-sizing:border-box;margin:0;padding:0;}'+
  'body{font-family:"Zen Maru Gothic","Noto Sans TC","PingFang TC",sans-serif;background:#f0f2f8;color:#1a2e6b;font-size:14px;}'+
  '.rpt{max-width:860px;margin:0 auto;background:white;box-shadow:0 0 40px rgba(0,0,0,0.12);overflow:hidden;}'+
  '.rpt-hdr{position:relative;text-align:center;padding:44px 32px 36px;overflow:hidden;background:url("'+contentBgUrl+'") center/cover no-repeat;border-bottom:none;}'+
  '.rpt-hdr::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,4,20,0.46) 0%,rgba(10,6,30,0.18) 50%,rgba(6,4,20,0.32) 100%);}'+
  '.rpt-hdr::after{content:"";position:absolute;bottom:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent 0%,transparent 10%,rgba(140,85,235,0.08) 18%,rgba(175,110,255,0.38) 28%,rgba(210,155,255,0.62) 37%,rgba(250,210,120,0.75) 44%,rgba(255,243,200,0.88) 50%,rgba(250,210,120,0.75) 56%,rgba(210,155,255,0.62) 63%,rgba(175,110,255,0.38) 72%,rgba(140,85,235,0.08) 82%,transparent 90%,transparent 100%);box-shadow:0 0 4px rgba(185,135,255,0.55),0 0 10px rgba(185,135,255,0.35),0 0 22px rgba(185,135,255,0.20),0 0 45px rgba(175,125,255,0.10),0 0 80px rgba(165,115,255,0.05),0 0 5px rgba(255,210,120,0.40),0 0 14px rgba(255,200,100,0.22),0 0 34px rgba(255,188,90,0.10);pointer-events:none;z-index:1;}'+
  '.rpt-title{position:relative;z-index:1;font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:28px;font-weight:700;color:#FFD166;letter-spacing:6px;line-height:1.7;text-shadow:2px 2px 0 rgba(10,5,30,0.9),0 0 28px rgba(255,210,80,0.75);}'+
  '.rpt-date{position:relative;z-index:1;font-size:13px;color:rgba(255,220,185,0.88);margin-top:6px;font-weight:500;}'+
  '.actions{display:flex;gap:8px;padding:10px 20px;background:#f5f6fa;border-bottom:1px solid rgba(30,50,120,0.12);justify-content:flex-end;}'+
  '.btn-print{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#049CD8,#0388C4);color:white;border:none;}'+
  '.btn-save{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#3A9D23,#2A7B1A);color:white;border:none;}'+
  '.btn-share{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#06C755,#04A348);color:white;border:none;display:flex;align-items:center;gap:6px;}'+
  '.rpt-profile{display:flex;align-items:flex-start;gap:16px;padding:22px 24px;background:linear-gradient(180deg,rgba(6,4,18,0.50),rgba(8,5,22,0.40)),url("'+contentBgUrl+'") center bottom/cover;border-bottom:2px solid rgba(255,210,80,0.35);}'+
  '.prof-left{display:flex;align-items:flex-start;gap:14px;flex:1;min-width:0;}'+
  '.prof-photo{width:96px;height:96px;border-radius:50%;border:3px solid #FFD166;flex-shrink:0;overflow:hidden;background:rgba(150,165,210,0.18);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;box-shadow:0 0 18px rgba(255,209,102,0.65),0 0 6px rgba(255,209,102,0.40),0 4px 18px rgba(0,0,0,0.50);}'+
  '.prof-photo img{width:100%;height:100%;object-fit:cover;}'+
  '.prof-photo-txt{font-size:10px;color:rgba(180,185,225,0.85);font-weight:700;}'+
  '.prof-info{flex:1;min-width:0;}'+
  '.prof-name{font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:22px;font-weight:700;color:#FFE878;letter-spacing:5px;line-height:1.35;text-shadow:0 0 14px rgba(255,210,60,0.45);}'+
  '.prof-sub{margin-top:4px;font-size:12px;color:rgba(215,205,255,0.85);font-weight:600;}'+
  '.stat-boxes{display:flex;gap:7px;margin-top:10px;}'+
  '.stat-box{flex:0 0 auto;background:linear-gradient(160deg,#1a2e6b,#2a4a9a);border-radius:12px;padding:8px 14px;text-align:center;border:1.5px solid rgba(100,140,255,0.25);}'+
  '.stat-v{font-size:18px;font-weight:700;color:#FFD166;line-height:1.25;}'+
  '.stat-l{font-size:10px;color:rgba(200,215,255,0.82);margin-top:3px;font-weight:600;}'+
  '.alert-wrap{background:white;border-radius:14px;padding:14px 16px;width:230px;flex-shrink:0;box-shadow:0 4px 24px rgba(0,0,0,0.60),0 0 0 1px rgba(255,255,255,0.15);border:none;}'+
  '.alert-ttl{font-size:12px;font-weight:900;margin-bottom:8px;}'+
  '.alert-bd{border-radius:8px;padding:9px 11px;font-size:12px;font-weight:700;line-height:1.65;}'+
  '.alert-note{margin-top:8px;font-size:12px;font-weight:700;line-height:1.5;color:#3a2060;}'+
  '.rpt-body{padding:18px 22px;background:white;}'+
  '.two-col{display:grid;grid-template-columns:230px 1fr;gap:14px;margin-bottom:16px;}'+
  '.dk-card{background:#ffffe2;border-radius:16px;overflow:hidden;box-shadow:0 4px 22px rgba(20,40,100,0.14);}'+
  '.dk-head{padding:9px 15px;font-size:13px;font-weight:900;color:#FFD166;background:linear-gradient(135deg,#0f1e52,#1a2e6b);border-bottom:1px solid rgba(26,46,107,0.18);font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}'+
  '.dk-body{padding:10px 13px 13px;}'+
  '.sr{display:flex;align-items:baseline;padding:5px 0;border-bottom:1px solid rgba(26,46,107,0.10);gap:4px;}'+
  '.sr:last-child{border-bottom:none;}'+
  '.si{flex:0 0 16px;font-size:11px;}'+
  '.sl{flex:0 0 52px;color:#7a8ab8;font-weight:600;font-size:11px;}'+
  '.sv{flex:1;font-weight:700;font-size:12.5px;color:#1a2e6b;}'+
  '.sv-sub{display:block;font-size:11px;color:#b07820;font-weight:600;margin-top:1px;}'+
  '.stat-note{font-size:10px;color:#8a9ab8;font-weight:600;padding-top:6px;line-height:1.5;}'+
  '.chart-col{display:flex;flex-direction:column;gap:10px;}'+
  '.chart-card{background:#fff;border:1.5px solid rgba(30,60,150,0.15);border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.07);}'+
  '.chart-hdr{padding:9px 15px;font-size:13px;font-weight:900;color:#fff;background:linear-gradient(135deg,#0f1e52,#1a2e6b);border-bottom:1px solid rgba(30,80,180,0.18);font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}'+
  '.chart-hdr-w{background:linear-gradient(135deg,#0a4f52,#12787a)!important;border-bottom-color:rgba(20,130,135,0.25)!important;}'+
  '.chart-card img{width:100%;display:block;max-height:230px;object-fit:contain;background:#fff;}'+
  '.chart-empty{display:flex;align-items:center;justify-content:center;padding:28px;color:#8a9acc;font-size:13px;}'+
  '.sec-title{font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:14px;font-weight:900;color:#1a2e6b;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid rgba(30,60,150,0.18);}'+
  '.sc-row{display:flex;align-items:center;gap:8px;padding:9px 14px;background:white;border:1.5px solid rgba(30,60,150,0.12);border-radius:10px;margin-bottom:7px;flex-wrap:wrap;box-shadow:0 2px 8px rgba(0,0,0,0.05);}'+
  '.sc-name{font-weight:900;font-size:13px;color:#1a2e6b;flex-shrink:0;font-family:"Zen Maru Gothic",sans-serif;}'+
  '.sc-since{font-size:11px;color:#7a8aaa;font-weight:600;flex-shrink:0;}'+
  '.sc-arr{color:#b07a00;font-weight:900;font-size:14px;}'+
  '.sc-rate{border-radius:6px;padding:4px 9px;font-weight:700;font-size:12px;white-space:nowrap;}'+
  '.sc-bef{background:rgba(30,60,150,0.08);color:#1a2e6b;}.sc-aft-ok{background:rgba(30,100,50,0.12);color:#1a6b0a;border:1px solid rgba(58,157,35,0.35);}.sc-aft-obs{background:rgba(30,60,150,0.06);color:#6678aa;}'+
  '.sc-diff{font-weight:900;font-size:13px;white-space:nowrap;}.sc-pos{color:#2a8b20;}.sc-neg{color:#c52020;}'+
  '.rmsec{background:#ffeff1;border:1.5px solid rgba(200,100,140,0.18);border-radius:16px;overflow:hidden;margin-bottom:14px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}'+
  '.rmsec-hdr{padding:9px 16px;background:linear-gradient(135deg,#1a2e6b,#2a4a9a);border-bottom:1px solid rgba(30,80,180,0.18);font-size:13px;font-weight:900;color:#fff;font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}'+
  '.rmsec-body{padding:11px 16px;}.rmsec-body ul{padding-left:18px;font-size:13px;font-weight:600;line-height:2.0;color:#2a3060;}.rmsec-body li{margin-bottom:3px;}'+
  '.rpt-src{padding:9px 14px;background:rgba(30,60,150,0.04);border:1px solid rgba(30,60,150,0.10);border-radius:10px;font-size:12px;color:#6678aa;font-weight:600;margin-bottom:14px;line-height:1.8;}'+
  '.rpt-footer{background:linear-gradient(180deg,rgba(6,4,18,0.35),rgba(8,5,22,0.50)),url("'+desktopBgUrl+'") center top/cover no-repeat;border-top:1px solid rgba(255,210,80,0.28);padding:20px 24px;font-size:12px;color:rgba(210,205,250,0.88);line-height:1.8;}'+
  '@media screen and (max-width:600px){.two-col{grid-template-columns:1fr!important;}.rpt-profile{flex-direction:column;}.alert-wrap{width:100%!important;}.stat-boxes{gap:5px;}}'+
  '@page{size:A4;margin:10mm;}'+
  '@media print{'+
    '*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}'+
    '.actions{display:none!important;}'+
    'html,body{margin:0!important;padding:0!important;background:white!important;}'+
    '.rpt{max-width:100%!important;margin:0!important;box-shadow:none!important;}'+
    '.rpt-hdr{padding:12px 16px 8px!important;}'+
    '.rpt-hdr::after{display:none!important;}'+
    '.rpt-title{font-size:17px!important;line-height:1.3!important;}'+
    '.rpt-date{margin-top:2px!important;font-size:10px!important;}'+
    '.rpt-profile{padding:8px 14px!important;gap:10px!important;flex-direction:row!important;}'+
    '.prof-photo{width:60px!important;height:60px!important;flex-shrink:0!important;}'+
    '.prof-name{font-size:15px!important;}'+
    '.prof-sub{font-size:10px!important;margin-top:2px!important;}'+
    '.stat-boxes{margin-top:5px!important;gap:4px!important;}'+
    '.stat-box{padding:5px 10px!important;border-radius:8px!important;}'+
    '.stat-v{font-size:13px!important;}'+
    '.stat-l{font-size:8.5px!important;}'+
    '.alert-wrap{width:170px!important;padding:7px 10px!important;flex-shrink:0!important;}'+
    '.alert-ttl{margin-bottom:4px!important;font-size:10px!important;}'+
    '.alert-bd{padding:6px 8px!important;font-size:10px!important;line-height:1.45!important;}'+
    '.alert-note{margin-top:4px!important;font-size:10px!important;}'+
    '.rpt-body{padding:8px 16px!important;}'+
    '.two-col{grid-template-columns:175px 1fr!important;gap:10px!important;margin-bottom:10px!important;}'+
    '.dk-head{padding:5px 10px!important;font-size:10.5px!important;}'+
    '.dk-body{padding:4px 8px 6px!important;}'+
    '.sr{padding:2px 0!important;}'+
    '.si{font-size:9.5px!important;}'+
    '.sl{font-size:9.5px!important;}'+
    '.sv{font-size:11px!important;}'+
    '.sv-sub{font-size:9.5px!important;}'+
    '.stat-note{font-size:9px!important;padding-top:3px!important;}'+
    '.chart-col{gap:8px!important;}'+
    '.chart-hdr{padding:4px 10px!important;font-size:10.5px!important;}'+
    '.chart-card img{max-height:200px!important;}'+
    '.sec-title{font-size:11px!important;margin-bottom:5px!important;padding-bottom:3px!important;}'+
    '.sc-row{padding:5px 9px!important;margin-bottom:4px!important;font-size:10px!important;}'+
    '.sc-name{font-size:10px!important;}.sc-since{font-size:9px!important;}.sc-rate{font-size:9.5px!important;padding:2px 6px!important;}.sc-diff{font-size:10px!important;}'+
    '.rmsec{margin-bottom:8px!important;}'+
    '.rmsec-hdr{padding:5px 12px!important;font-size:10.5px!important;}'+
    '.rmsec-body{padding:5px 12px 7px!important;}'+
    '.rmsec-body ul{line-height:1.7!important;font-size:10.5px!important;padding-left:13px!important;}'+
    '.rmsec-body li{margin-bottom:1px!important;}'+
    '.rpt-src{padding:5px 10px!important;margin-bottom:8px!important;font-size:10px!important;line-height:1.5!important;}'+
    '.rpt-footer{padding:10px 16px!important;font-size:10px!important;line-height:1.6!important;}'+
  '}'+
  '</style></head><body>'+
  '<div class="rpt">'+
    '<div class="rpt-hdr">'+
      '<div class="rpt-title">⭐ '+(isEn?safeName+"'s Growth Report":'寶貝成長紀錄')+' ⭐</div>'+
      '<div class="rpt-date">📅 '+dateStr+'</div>'+
    '</div>'+
    '<div class="actions">'+
      '<button class="btn-print" onclick="window.print()">🖨️ '+(isEn?'Print':'列印')+'</button>'+
      '<button class="btn-save" id="saveBtn" onclick="saveAsImg()">📱 '+(isMobileDev?(isEn?'Save / Share':'儲存／分享'):(isEn?'Save as Image':'儲存圖片'))+'</button>'+
      (!isMobileDev?'<button class="btn-share" id="shareBtn" onclick="shareReport()">'+(isEn?'Share to LINE':'分享到 LINE')+'</button>':'')+
    '</div>'+
    '<div class="rpt-profile">'+
      '<div class="prof-left">'+
        '<div class="prof-photo">'+photoHTML+'</div>'+
        '<div class="prof-info">'+
          '<div class="prof-name">'+safeName+'</div>'+
          '<div class="prof-sub">'+(isEn?(gender==='女'?'♀ Girl':'♂ Boy'):(gender==='女'?'♀ 女生':'♂ 男生'))+' · '+(isEn?'Born '+fmtDate(bday):'生日 '+bdayFmt)+'</div>'+
          '<div class="stat-boxes">'+
            '<div class="stat-box"><div class="stat-v">'+latest.height+'</div><div class="stat-l">'+(isEn?'Height cm':'身高 cm')+'</div></div>'+
            '<div class="stat-box"><div class="stat-v">'+latest.weight+'</div><div class="stat-l">'+(isEn?'Weight kg':'體重 kg')+'</div></div>'+
            '<div class="stat-box"><div class="stat-v" style="font-size:14px;line-height:1.35;">'+ageDisplay+'</div><div class="stat-l">'+(isEn?'Age':'年齡')+'</div></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="alert-wrap">'+
        '<div class="alert-ttl">'+acTitle+'</div>'+
        '<div class="alert-bd" style="background:'+acBg+';border:2px solid '+acBorder+';color:'+acColor+';">'+acBody+'</div>'+
        (acNote?'<div class="alert-note">'+acNote+'</div>':'')+
      '</div>'+
    '</div>'+
    '<div class="rpt-body">'+
      '<div class="two-col">'+
        '<div class="dk-card">'+
          '<div class="dk-head">⭐ '+(isEn?'Growth Stats':'成長數據')+'</div>'+
          '<div class="dk-body">'+statsHTML+(pred?'<div class="stat-note">'+t('gaPredictionNote')+'</div>':'')+
          '</div>'+
        '</div>'+
        '<div class="chart-col">'+
          (hImg?'<div class="chart-card"><div class="chart-hdr">⭐ '+(isEn?'Height Curve':'身高曲線')+'</div><img src="'+hImg+'" alt="height chart"></div>':'<div class="chart-card chart-empty">'+(isEn?'No chart data':'尚無圖表')+'</div>')+
          (wImg?'<div class="chart-card"><div class="chart-hdr chart-hdr-w">💗 '+(isEn?'Weight Curve':'體重曲線')+'</div><img src="'+wImg+'" alt="weight chart"></div>':'')+
        '</div>'+
      '</div>'+
      (scRowsHTML?'<div style="margin-bottom:16px;"><div class="sec-title">⭐ '+(isEn?'Supplement × Growth':'保健品 × 生長對比')+'</div>'+scRowsHTML+'</div>':'')+
      '<div class="rmsec">'+
        '<div class="rmsec-hdr">📋 '+(isEn?'Report Reminders':'報告提醒')+'</div>'+
        '<div class="rmsec-body"><ul>'+rmBullets.join('')+'</ul></div>'+
      '</div>'+
      '<div class="rpt-src">'+
        '📅 '+(isEn?'Report Date: ':'報告日期：')+dateStr+'<br>'+
        (isEn?'Growth standard: WHO Child Growth Standards (0–7 years) · Taiwan Ministry of Health and Welfare':'生長標準資料來源：衛福部國健署（WHO 生長標準 0–7 歲）')+
      '</div>'+
    '</div>'+
    '<div class="rpt-footer">'+
      '⚠️ '+(isEn?'This report is for reference only and does not constitute medical advice. If you have any growth concerns, please consult a pediatrician for professional assessment.':'本報告僅供參考，不作為醫療診斷依據。如有任何成長疑慮，請諮詢兒科醫師進行專業評估。')+'<br>'+
      '<span style="color:rgba(160,155,215,0.55);font-size:0.88em;">⭐ Baby Growth Tracker · '+dateShort+'</span>'+
    '</div>'+
  '</div>'+
  '<scr'+'ipt>'+
  'function saveAsImg(){'+
    'var btn=document.getElementById("saveBtn");'+
    'btn.disabled=true;btn.textContent='+loadingLabel+';'+
    'function doSave(){'+
      'var acts=document.querySelector(".actions");acts.style.display="none";'+
      'var rptEl=document.querySelector(".rpt");'+
      'html2canvas(rptEl,{scale:2,useCORS:true,allowTaint:true,backgroundColor:"#ffffff",windowWidth:860,windowHeight:rptEl.scrollHeight,logging:false}).then(function(canvas){'+
        'acts.style.display="";'+
        'canvas.toBlob(function(blob){'+
          'var fname='+dlName+';'+
          'var isMobile=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);'+
          'if(isMobile&&navigator.canShare&&navigator.canShare({files:[new File([blob],fname,{type:"image/png"})]})){'+
            'navigator.share({files:[new File([blob],fname,{type:"image/png"})],title:"寶貝成長報告"}).catch(function(){});'+
          '}else{'+
            'var url=URL.createObjectURL(blob);'+
            'var a=document.createElement("a");a.href=url;a.download=fname;a.click();'+
            'URL.revokeObjectURL(url);'+
          '}'+
          'btn.textContent='+saveBtnLabel+';btn.disabled=false;'+
        '},"image/png");'+
      '}).catch(function(){acts.style.display="";btn.textContent='+saveBtnLabel+';btn.disabled=false;});'+
    '}'+
    'if(typeof html2canvas!=="undefined"){doSave();}else{'+
      'var s=document.createElement("script");'+
      's.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";'+
      's.onload=doSave;'+
      's.onerror=function(){btn.textContent='+saveBtnLabel+';btn.disabled=false;};'+
      'document.head.appendChild(s);'+
    '}'+
  '}'+
  'function shareReport(){'+
    'var btn=document.getElementById("shareBtn");'+
    'btn.disabled=true;btn.textContent='+loadingLabel+';'+
    'function doShare(){'+
      'var acts=document.querySelector(".actions");acts.style.display="none";'+
      'var rptEl=document.querySelector(".rpt");'+
      'html2canvas(rptEl,{scale:2,useCORS:true,allowTaint:true,backgroundColor:"#ffffff",windowWidth:860,windowHeight:rptEl.scrollHeight,logging:false}).then(function(canvas){'+
        'acts.style.display="";'+
        'canvas.toBlob(function(blob){'+
          'var fname='+dlName+';'+
          'var file=new File([blob],fname,{type:"image/png"});'+
          'if(navigator.canShare&&navigator.canShare({files:[file]})){'+
            'navigator.share({title:"寶貝成長報告",files:[file]}).catch(function(){});'+
            'btn.textContent='+shareBtnLabel+';btn.disabled=false;'+
          '}else{'+
            'var url=URL.createObjectURL(blob);'+
            'var a=document.createElement("a");a.href=url;a.download=fname;a.click();'+
            'URL.revokeObjectURL(url);'+
            'setTimeout(function(){window.open("https://line.me/R/share?text="+encodeURIComponent("寶貝成長報告已儲存，請開啟圖片分享 📊"),"_blank");},600);'+
            'btn.textContent='+shareBtnLabel+';btn.disabled=false;'+
          '}'+
        '},"image/png");'+
      '}).catch(function(){acts.style.display="";btn.textContent='+shareBtnLabel+';btn.disabled=false;});'+
    '}'+
    'if(typeof html2canvas!=="undefined"){doShare();}else{'+
      'var s=document.createElement("script");'+
      's.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";'+
      's.onload=doShare;'+
      's.onerror=function(){btn.textContent='+shareBtnLabel+';btn.disabled=false;};'+
      'document.head.appendChild(s);'+
    '}'+
  '}'+
  '<'+'/scr'+'ipt>'+
  '</body></html>';
}
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
function fmtAge(m){var y=Math.floor(m/12),mo=m%12;if(!y)return mo+'個月';if(!mo)return y+'歲';return y+'歲'+mo+'個月';}
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

/* ── Share Modal ── */
var sharingChildId=null;
async function openShareModal(childId){
  sharingChildId=childId;
  var child=children.find(function(c){return c.id===childId;});
  document.getElementById('shareModalTitle').textContent=t('shareModalTitleBase')+' — '+(child?esc(child.name):'');
  document.getElementById('shareEmailInput').value='';
  document.getElementById('shareModal').classList.remove('hidden');
  await refreshShareList();
}
function closeShareModal(){
  document.getElementById('shareModal').classList.add('hidden');
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
</script>
</body>
</html>