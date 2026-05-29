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
    whoSource:'資料來源：衛福部國健署（WHO 生長標準 0–10 歲）',
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
    whoSource:'Source: WHO Child Growth Standards (0–10 years)',
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
  // Refresh custom date select month labels
  if(typeof refreshDateSelLang==='function')refreshDateSelLang();
}

/* ── Loading ── */
function showLoading(){document.getElementById('loadingOverlay').classList.remove('hidden');}
function hideLoading(){document.getElementById('loadingOverlay').classList.add('hidden');}

/* ── Init lang ── */
applyLang();
