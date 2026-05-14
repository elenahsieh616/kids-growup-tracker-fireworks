/* ══════════════════════════════════════════
   寶貝成長紀錄 - Google Apps Script Backend
   v2.0  多孩子版本 | 自動遷移舊資料 (珊迪)
   ══════════════════════════════════════════
   ★ 使用方式：
     1. 保持 SPREADSHEET_ID 不變（已設定好）
     2. 全選此檔案內容貼入 Apps Script 的 Code.gs
     3. 同樣把 index.html 貼入 Apps Script 的 index.html
     4. 儲存後重新部署 → Manage deployments → New version
   ══════════════════════════════════════════ */

// =====================================================
// ⚠️ 把下面引號裡的文字換成你的試算表 ID
// 試算表網址：https://docs.google.com/spreadsheets/d/【這裡】/edit
// =====================================================
var SPREADSHEET_ID = '貼上你的試算表ID';

function getSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('寶貝成長紀錄')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
}

// ── ID 生成 ────────────────────────────────────────
function _uuid() {
  try { return Utilities.getUuid(); }
  catch(e) { return new Date().getTime().toString(36) + Math.random().toString(36).slice(2); }
}

// ── 初始化 / 資料遷移（安全，不刪除現有資料）──────
function setupSheets() {
  var ss = getSheet();

  // 1. 孩子資料表
  var cSh = ss.getSheetByName('孩子');
  if (!cSh) {
    cSh = ss.insertSheet('孩子');
    cSh.appendRow(['id','name','birthday','gender','emoji','createdAt']);
    cSh.setFrozenRows(1);
  }

  // 2. 量測紀錄 — 確保有 childId 欄（不影響現有資料）
  var mSh = ss.getSheetByName('量測紀錄');
  if (!mSh) {
    mSh = ss.insertSheet('量測紀錄');
    mSh.appendRow(['id','childId','date','height','weight','note','createdAt']);
    mSh.setFrozenRows(1);
  } else {
    var mH = mSh.getRange(1,1,1,mSh.getLastColumn()).getValues()[0].map(String);
    if (mH.indexOf('childId') === -1) {
      // 在 id 後插入 childId 欄，現有資料自動右移
      mSh.insertColumnBefore(2);
      mSh.getRange(1,2).setValue('childId');
    }
  }

  // 3. 保健紀錄 — 確保有 childId 欄
  var sSh = ss.getSheetByName('保健紀錄');
  if (!sSh) {
    sSh = ss.insertSheet('保健紀錄');
    sSh.appendRow(['id','childId','date','type','name','note','createdAt']);
    sSh.setFrozenRows(1);
  } else {
    var sH = sSh.getRange(1,1,1,sSh.getLastColumn()).getValues()[0].map(String);
    if (sH.indexOf('childId') === -1) {
      sSh.insertColumnBefore(2);
      sSh.getRange(1,2).setValue('childId');
    }
  }

  // 4. 若「孩子」表為空 → 建立預設孩子「珊迪」並遷移現有資料
  if (cSh.getLastRow() <= 1) {
    var defId = _uuid();
    cSh.appendRow([defId, '珊迪', '2023-10-25', '男', '⭐', new Date().toISOString()]);
    // 把現有量測/保健資料全部歸給珊迪（填入 childId 欄）
    _fillChildId(ss.getSheetByName('量測紀錄'), defId);
    _fillChildId(ss.getSheetByName('保健紀錄'), defId);
  }

  return 'OK';
}

// 把空白的 childId 欄填入預設 childId
function _fillChildId(sh, childId) {
  if (!sh || sh.getLastRow() <= 1) return;
  var h = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  var col = h.indexOf('childId') + 1;
  if (!col) return;
  for (var i = 2; i <= sh.getLastRow(); i++) {
    var cell = sh.getRange(i, col);
    if (!cell.getValue()) cell.setValue(childId);
  }
}

// ── 孩子 CRUD ──────────────────────────────────────

function getChildren() {
  var sh = getSheet().getSheetByName('孩子');
  if (!sh || sh.getLastRow() <= 1) return [];
  return sh.getRange(2,1,sh.getLastRow()-1,6).getValues()
    .filter(function(r){ return r[0]; })
    .map(function(r){
      return {
        id: String(r[0]),
        name: String(r[1]),
        birthday: r[2] instanceof Date
          ? Utilities.formatDate(r[2],'Asia/Taipei','yyyy-MM-dd')
          : String(r[2]),
        gender: String(r[3]),
        emoji: String(r[4]||'⭐')
      };
    });
}

function addChild(child) {
  var sh = getSheet().getSheetByName('孩子');
  var id = _uuid();
  sh.appendRow([id, child.name, child.birthday, child.gender, child.emoji||'⭐', new Date().toISOString()]);
  return id;
}

function updateChild(child) {
  var sh = getSheet().getSheetByName('孩子');
  for (var i = 2; i <= sh.getLastRow(); i++) {
    if (String(sh.getRange(i,1).getValue()) === child.id) {
      sh.getRange(i,2,1,4).setValues([[child.name, child.birthday, child.gender, child.emoji||'⭐']]);
      return true;
    }
  }
  return false;
}

function deleteChild(childId) {
  var ss = getSheet();
  var cSh = ss.getSheetByName('孩子');
  for (var i = cSh.getLastRow(); i >= 2; i--) {
    if (String(cSh.getRange(i,1).getValue()) === childId) { cSh.deleteRow(i); break; }
  }
  _deleteRowsByChildId(ss.getSheetByName('量測紀錄'), childId);
  _deleteRowsByChildId(ss.getSheetByName('保健紀錄'), childId);
  return true;
}

function _deleteRowsByChildId(sh, childId) {
  if (!sh || sh.getLastRow() <= 1) return;
  var h = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  var col = h.indexOf('childId') + 1;
  if (!col) return;
  for (var i = sh.getLastRow(); i >= 2; i--) {
    if (String(sh.getRange(i,col).getValue()) === childId) sh.deleteRow(i);
  }
}

// ── 量測紀錄 ────────────────────────────────────────

function getMeasurements(childId) {
  var sh = getSheet().getSheetByName('量測紀錄');
  if (!sh || sh.getLastRow() <= 1) return [];
  var nc = sh.getLastColumn();
  var h = sh.getRange(1,1,1,nc).getValues()[0].map(String);
  var rows = sh.getRange(2,1,sh.getLastRow()-1,nc).getValues();
  var iId=h.indexOf('id'), iCid=h.indexOf('childId'), iDt=h.indexOf('date'),
      iHt=h.indexOf('height'), iWt=h.indexOf('weight'), iNt=h.indexOf('note');
  return rows
    .filter(function(r){ return r[iId] && String(r[iCid])===childId; })
    .map(function(r){
      return {
        id: String(r[iId]),
        date: r[iDt] instanceof Date
          ? Utilities.formatDate(r[iDt],'Asia/Taipei','yyyy-MM-dd')
          : String(r[iDt]),
        height: parseFloat(r[iHt]),
        weight: parseFloat(r[iWt]),
        note: String(r[iNt]||'')
      };
    });
}

function addMeasurement(childId, data) {
  var sh = getSheet().getSheetByName('量測紀錄');
  var id = _uuid();
  sh.appendRow([id, childId, data.date, data.height, data.weight, data.note||'', new Date().toISOString()]);
  return id;
}

function addMeasurementsBatch(childId, records) {
  var sh = getSheet().getSheetByName('量測紀錄');
  var ids = [];
  for (var i = 0; i < records.length; i++) {
    var id = _uuid();
    sh.appendRow([id, childId, records[i].date, records[i].height, records[i].weight, records[i].note||'批次匯入', new Date().toISOString()]);
    ids.push(id);
  }
  return ids;
}

function deleteMeasurement(id) {
  var sh = getSheet().getSheetByName('量測紀錄');
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0].toString() === id.toString()) { sh.deleteRow(i+1); return true; }
  }
  return false;
}

// ── 保健紀錄 ────────────────────────────────────────

function getSupplements(childId) {
  var sh = getSheet().getSheetByName('保健紀錄');
  if (!sh || sh.getLastRow() <= 1) return [];
  var nc = sh.getLastColumn();
  var h = sh.getRange(1,1,1,nc).getValues()[0].map(String);
  var rows = sh.getRange(2,1,sh.getLastRow()-1,nc).getValues();
  var iId=h.indexOf('id'), iCid=h.indexOf('childId'), iDt=h.indexOf('date'),
      iTy=h.indexOf('type'), iNm=h.indexOf('name'), iNt=h.indexOf('note');
  return rows
    .filter(function(r){ return r[iId] && String(r[iCid])===childId; })
    .map(function(r){
      return {
        id: String(r[iId]),
        date: r[iDt] instanceof Date
          ? Utilities.formatDate(r[iDt],'Asia/Taipei','yyyy-MM-dd')
          : String(r[iDt]),
        type: String(r[iTy]||'保健品'),
        name: String(r[iNm]),
        note: String(r[iNt]||'')
      };
    });
}

function addSupplement(childId, data) {
  var sh = getSheet().getSheetByName('保健紀錄');
  var id = _uuid();
  sh.appendRow([id, childId, data.date, data.type, data.name, data.note||'', new Date().toISOString()]);
  return id;
}

function deleteSupplement(id) {
  var sh = getSheet().getSheetByName('保健紀錄');
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0].toString() === id.toString()) { sh.deleteRow(i+1); return true; }
  }
  return false;
}
