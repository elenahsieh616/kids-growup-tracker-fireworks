/* ── Report CSS helper ── */
function _rptCSS(cbg,dbg){
  return `*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:"Zen Maru Gothic","Noto Sans TC","PingFang TC",sans-serif;background:#f0f2f8;color:#1a2e6b;font-size:14px;}
.rpt{max-width:860px;margin:0 auto;background:white;box-shadow:0 0 40px rgba(0,0,0,0.12);overflow:hidden;}
.rpt-hdr{position:relative;text-align:center;padding:44px 32px 36px;overflow:hidden;background:url("${cbg}") center/cover no-repeat;border-bottom:none;}
.rpt-hdr::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,4,20,0.46) 0%,rgba(10,6,30,0.18) 50%,rgba(6,4,20,0.32) 100%);}
.rpt-hdr::after{content:"";position:absolute;bottom:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent 0%,transparent 10%,rgba(140,85,235,0.08) 18%,rgba(175,110,255,0.38) 28%,rgba(210,155,255,0.62) 37%,rgba(250,210,120,0.75) 44%,rgba(255,243,200,0.88) 50%,rgba(250,210,120,0.75) 56%,rgba(210,155,255,0.62) 63%,rgba(175,110,255,0.38) 72%,rgba(140,85,235,0.08) 82%,transparent 90%,transparent 100%);box-shadow:0 0 4px rgba(185,135,255,0.55),0 0 10px rgba(185,135,255,0.35),0 0 22px rgba(185,135,255,0.20),0 0 45px rgba(175,125,255,0.10),0 0 80px rgba(165,115,255,0.05),0 0 5px rgba(255,210,120,0.40),0 0 14px rgba(255,200,100,0.22),0 0 34px rgba(255,188,90,0.10);pointer-events:none;z-index:1;}
.rpt-title{position:relative;z-index:1;font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:28px;font-weight:700;color:#FFD166;letter-spacing:6px;line-height:1.7;text-shadow:2px 2px 0 rgba(10,5,30,0.9),0 0 28px rgba(255,210,80,0.75);}
.rpt-date{position:relative;z-index:1;font-size:13px;color:rgba(255,220,185,0.88);margin-top:6px;font-weight:500;}
.actions{display:flex;gap:8px;padding:10px 20px;background:#f5f6fa;border-bottom:1px solid rgba(30,50,120,0.12);justify-content:flex-end;}
.btn-print{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#049CD8,#0388C4);color:white;border:none;}
.btn-save{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#3A9D23,#2A7B1A);color:white;border:none;}
.btn-share{padding:8px 18px;border-radius:10px;font-weight:900;cursor:pointer;font-size:13px;background:linear-gradient(160deg,#06C755,#04A348);color:white;border:none;display:flex;align-items:center;gap:6px;}
.rpt-profile{display:flex;align-items:flex-start;gap:16px;padding:22px 24px;background:linear-gradient(180deg,rgba(6,4,18,0.50),rgba(8,5,22,0.40)),url("${cbg}") center bottom/cover;border-bottom:2px solid rgba(255,210,80,0.35);}
.prof-left{display:flex;align-items:flex-start;gap:14px;flex:1;min-width:0;}
.prof-photo{width:96px;height:96px;border-radius:50%;border:3px solid #FFD166;flex-shrink:0;overflow:hidden;background:rgba(150,165,210,0.18);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;box-shadow:0 0 18px rgba(255,209,102,0.65),0 0 6px rgba(255,209,102,0.40),0 4px 18px rgba(0,0,0,0.50);}
.prof-photo img{width:100%;height:100%;object-fit:cover;}
.prof-photo-txt{font-size:10px;color:rgba(180,185,225,0.85);font-weight:700;}
.prof-info{flex:1;min-width:0;}
.prof-name{font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:22px;font-weight:700;color:#FFE878;letter-spacing:5px;line-height:1.35;text-shadow:0 0 14px rgba(255,210,60,0.45);}
.prof-sub{margin-top:4px;font-size:12px;color:rgba(215,205,255,0.85);font-weight:600;}
.stat-boxes{display:flex;gap:7px;margin-top:10px;}
.stat-box{flex:0 0 auto;background:linear-gradient(160deg,#1a2e6b,#2a4a9a);border-radius:12px;padding:8px 14px;text-align:center;border:1.5px solid rgba(100,140,255,0.25);}
.stat-v{font-size:18px;font-weight:700;color:#FFD166;line-height:1.25;}
.stat-l{font-size:10px;color:rgba(200,215,255,0.82);margin-top:3px;font-weight:600;}
.alert-wrap{background:white;border-radius:14px;padding:14px 16px;width:230px;flex-shrink:0;box-shadow:0 4px 24px rgba(0,0,0,0.60),0 0 0 1px rgba(255,255,255,0.15);border:none;}
.alert-ttl{font-size:12px;font-weight:900;margin-bottom:8px;}
.alert-bd{border-radius:8px;padding:9px 11px;font-size:12px;font-weight:700;line-height:1.65;}
.alert-note{margin-top:8px;font-size:12px;font-weight:700;line-height:1.5;color:#3a2060;}
.rpt-body{padding:18px 22px;background:white;}
.two-col{display:grid;grid-template-columns:230px 1fr;gap:14px;margin-bottom:16px;}
.dk-card{background:#ffffe2;border-radius:16px;overflow:hidden;box-shadow:0 4px 22px rgba(20,40,100,0.14);}
.dk-head{padding:9px 15px;font-size:13px;font-weight:900;color:#FFD166;background:linear-gradient(135deg,#0f1e52,#1a2e6b);border-bottom:1px solid rgba(26,46,107,0.18);font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}
.dk-body{padding:10px 13px 13px;}
.sr{display:flex;align-items:baseline;padding:5px 0;border-bottom:1px solid rgba(26,46,107,0.10);gap:4px;}
.sr:last-child{border-bottom:none;}
.si{flex:0 0 16px;font-size:11px;}
.sl{flex:0 0 52px;color:#7a8ab8;font-weight:600;font-size:11px;}
.sv{flex:1;font-weight:700;font-size:12.5px;color:#1a2e6b;}
.sv-sub{display:block;font-size:11px;color:#b07820;font-weight:600;margin-top:1px;}
.stat-note{font-size:10px;color:#8a9ab8;font-weight:600;padding-top:6px;line-height:1.5;}
.chart-col{display:flex;flex-direction:column;gap:10px;}
.chart-card{background:#fff;border:1.5px solid rgba(30,60,150,0.15);border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.07);}
.chart-hdr{padding:9px 15px;font-size:13px;font-weight:900;color:#fff;background:linear-gradient(135deg,#0f1e52,#1a2e6b);border-bottom:1px solid rgba(30,80,180,0.18);font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}
.chart-hdr-w{background:linear-gradient(135deg,#0a4f52,#12787a)!important;border-bottom-color:rgba(20,130,135,0.25)!important;}
.chart-card img{width:100%;display:block;max-height:230px;object-fit:contain;background:#fff;}
.chart-empty{display:flex;align-items:center;justify-content:center;padding:28px;color:#8a9acc;font-size:13px;}
.sec-title{font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;font-size:14px;font-weight:900;color:#1a2e6b;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid rgba(30,60,150,0.18);}
.sc-row{display:flex;align-items:center;gap:8px;padding:9px 14px;background:white;border:1.5px solid rgba(30,60,150,0.12);border-radius:10px;margin-bottom:7px;flex-wrap:wrap;box-shadow:0 2px 8px rgba(0,0,0,0.05);}
.sc-name{font-weight:900;font-size:13px;color:#1a2e6b;flex-shrink:0;font-family:"Zen Maru Gothic",sans-serif;}
.sc-since{font-size:11px;color:#7a8aaa;font-weight:600;flex-shrink:0;}
.sc-arr{color:#b07a00;font-weight:900;font-size:14px;}
.sc-rate{border-radius:6px;padding:4px 9px;font-weight:700;font-size:12px;white-space:nowrap;}
.sc-bef{background:rgba(30,60,150,0.08);color:#1a2e6b;}.sc-aft-ok{background:rgba(30,100,50,0.12);color:#1a6b0a;border:1px solid rgba(58,157,35,0.35);}.sc-aft-obs{background:rgba(30,60,150,0.06);color:#6678aa;}
.sc-diff{font-weight:900;font-size:13px;white-space:nowrap;}.sc-pos{color:#2a8b20;}.sc-neg{color:#c52020;}
.rmsec{background:#ffeff1;border:1.5px solid rgba(200,100,140,0.18);border-radius:16px;overflow:hidden;margin-bottom:14px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
.rmsec-hdr{padding:9px 16px;background:linear-gradient(135deg,#1a2e6b,#2a4a9a);border-bottom:1px solid rgba(30,80,180,0.18);font-size:13px;font-weight:900;color:#fff;font-family:"Zen Maru Gothic","Noto Sans TC",sans-serif;}
.rmsec-body{padding:11px 16px;}.rmsec-body ul{padding-left:18px;font-size:13px;font-weight:600;line-height:2.0;color:#2a3060;}.rmsec-body li{margin-bottom:3px;}
.rpt-src{padding:9px 14px;background:rgba(30,60,150,0.04);border:1px solid rgba(30,60,150,0.10);border-radius:10px;font-size:12px;color:#6678aa;font-weight:600;margin-bottom:14px;line-height:1.8;}
.rpt-footer{background:linear-gradient(180deg,rgba(6,4,18,0.35),rgba(8,5,22,0.50)),url("${dbg}") center top/cover no-repeat;border-top:1px solid rgba(255,210,80,0.28);padding:20px 24px;font-size:12px;color:rgba(210,205,250,0.88);line-height:1.8;}
@media screen and (max-width:600px){.two-col{grid-template-columns:1fr!important;}.rpt-profile{flex-direction:column;}.alert-wrap{width:100%!important;}.stat-boxes{gap:5px;}}
@page{size:A4;margin:10mm;}
@media print{
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
  .actions{display:none!important;}
  html,body{margin:0!important;padding:0!important;background:white!important;}
  .rpt{max-width:100%!important;margin:0!important;box-shadow:none!important;}
  .rpt-hdr{padding:12px 16px 8px!important;}.rpt-hdr::after{display:none!important;}
  .rpt-title{font-size:17px!important;line-height:1.3!important;}
  .rpt-date{margin-top:2px!important;font-size:10px!important;}
  .rpt-profile{padding:8px 14px!important;gap:10px!important;flex-direction:row!important;}
  .prof-photo{width:60px!important;height:60px!important;flex-shrink:0!important;}
  .prof-name{font-size:15px!important;}.prof-sub{font-size:10px!important;margin-top:2px!important;}
  .stat-boxes{margin-top:5px!important;gap:4px!important;}
  .stat-box{padding:5px 10px!important;border-radius:8px!important;}
  .stat-v{font-size:13px!important;}.stat-l{font-size:8.5px!important;}
  .alert-wrap{width:170px!important;padding:7px 10px!important;flex-shrink:0!important;}
  .alert-ttl{margin-bottom:4px!important;font-size:10px!important;}
  .alert-bd{padding:6px 8px!important;font-size:10px!important;line-height:1.45!important;}
  .alert-note{margin-top:4px!important;font-size:10px!important;}
  .rpt-body{padding:8px 16px!important;}
  .two-col{grid-template-columns:175px 1fr!important;gap:10px!important;margin-bottom:10px!important;}
  .dk-head{padding:5px 10px!important;font-size:10.5px!important;}.dk-body{padding:4px 8px 6px!important;}
  .sr{padding:2px 0!important;}.si{font-size:9.5px!important;}.sl{font-size:9.5px!important;}
  .sv{font-size:11px!important;}.sv-sub{font-size:9.5px!important;}
  .stat-note{font-size:9px!important;padding-top:3px!important;}
  .chart-col{gap:8px!important;}.chart-hdr{padding:4px 10px!important;font-size:10.5px!important;}
  .chart-card img{max-height:200px!important;}
  .sec-title{font-size:11px!important;margin-bottom:5px!important;padding-bottom:3px!important;}
  .sc-row{padding:5px 9px!important;margin-bottom:4px!important;font-size:10px!important;}
  .sc-name{font-size:10px!important;}.sc-since{font-size:9px!important;}.sc-rate{font-size:9.5px!important;padding:2px 6px!important;}.sc-diff{font-size:10px!important;}
  .rmsec{margin-bottom:8px!important;}.rmsec-hdr{padding:5px 12px!important;font-size:10.5px!important;}
  .rmsec-body{padding:5px 12px 7px!important;}
  .rmsec-body ul{line-height:1.7!important;font-size:10.5px!important;padding-left:13px!important;}
  .rmsec-body li{margin-bottom:1px!important;}
  .rpt-src{padding:5px 10px!important;margin-bottom:8px!important;font-size:10px!important;line-height:1.5!important;}
  .rpt-footer{padding:10px 16px!important;font-size:10px!important;line-height:1.6!important;}
}`;
}

/* ── Report inline script helper ── */
function _rptScript(dlName,saveBtnLabel,shareBtnLabel,loadingLabel,isMobileDev){
  return `function saveAsImg(){
var btn=document.getElementById("saveBtn");
btn.disabled=true;btn.textContent=${loadingLabel};
function doSave(){
var acts=document.querySelector(".actions");acts.style.display="none";
var rptEl=document.querySelector(".rpt");
html2canvas(rptEl,{scale:2,useCORS:true,allowTaint:true,backgroundColor:"#ffffff",windowWidth:860,windowHeight:rptEl.scrollHeight,logging:false}).then(function(canvas){
acts.style.display="";
canvas.toBlob(function(blob){
var fname=${dlName};
var isMobile=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if(isMobile&&navigator.canShare&&navigator.canShare({files:[new File([blob],fname,{type:"image/png"})]})){
navigator.share({files:[new File([blob],fname,{type:"image/png"})],title:"寶貝成長報告"}).catch(function(){});
}else{
var url=URL.createObjectURL(blob);
var a=document.createElement("a");a.href=url;a.download=fname;a.click();
URL.revokeObjectURL(url);
}
btn.textContent=${saveBtnLabel};btn.disabled=false;
},"image/png");
}).catch(function(){acts.style.display="";btn.textContent=${saveBtnLabel};btn.disabled=false;});
}
if(typeof html2canvas!=="undefined"){doSave();}else{
var s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
s.onload=doSave;
s.onerror=function(){btn.textContent=${saveBtnLabel};btn.disabled=false;};
document.head.appendChild(s);
}
}
function shareReport(){
var btn=document.getElementById("shareBtn");
btn.disabled=true;btn.textContent=${loadingLabel};
function doShare(){
var acts=document.querySelector(".actions");acts.style.display="none";
var rptEl=document.querySelector(".rpt");
html2canvas(rptEl,{scale:2,useCORS:true,allowTaint:true,backgroundColor:"#ffffff",windowWidth:860,windowHeight:rptEl.scrollHeight,logging:false}).then(function(canvas){
acts.style.display="";
canvas.toBlob(function(blob){
var fname=${dlName};
var file=new File([blob],fname,{type:"image/png"});
if(navigator.canShare&&navigator.canShare({files:[file]})){
navigator.share({title:"寶貝成長報告",files:[file]}).catch(function(){});
btn.textContent=${shareBtnLabel};btn.disabled=false;
}else{
var url=URL.createObjectURL(blob);
var a=document.createElement("a");a.href=url;a.download=fname;a.click();
URL.revokeObjectURL(url);
setTimeout(function(){window.open("https://line.me/R/share?text="+encodeURIComponent("寶貝成長報告已儲存，請開啟圖片分享 📊"),"_blank");},600);
btn.textContent=${shareBtnLabel};btn.disabled=false;
}
},"image/png");
}).catch(function(){acts.style.display="";btn.textContent=${shareBtnLabel};btn.disabled=false;});
}
if(typeof html2canvas!=="undefined"){doShare();}else{
var s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
s.onload=doShare;
s.onerror=function(){btn.textContent=${shareBtnLabel};btn.disabled=false;};
document.head.appendChild(s);
}
}`;
}

function _rptGrowthRate(sorted,latest,latestDate,latestAge){
  var annualH=null,thresh=null,annualLow=false,ref=null,months=null,hDiff=null,refDays=null;
  if(sorted.length>=2){
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
  return {annualH:annualH,thresh:thresh,annualLow:annualLow,ref:ref,months:months,hDiff:hDiff,refDays:refDays};
}
function _rptAlertCard(annualH,annualLow,thresh,isEn){
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
  return {acColor:acColor,acBg:acBg,acBorder:acBorder,acTitle:acTitle,acBody:acBody,acNote:acNote};
}
function _rptReminders(annualH,annualLow,thresh,hRank,wRank,pred,rptMph,isEn){
  var rm=[];
  if(annualH!==null&&annualLow)rm.push(isEn?'<li>⚠️ Height growth (<strong>'+annualH+' cm/yr</strong>) is below the minimum standard of <strong>'+thresh.min+' cm/yr</strong>. Please consult a pediatrician for professional assessment.</li>':'<li>⚠️ 身高年化增長速度（<strong>'+annualH+' cm/年</strong>）低於最低標準（<strong>'+thresh.min+' cm/年</strong>），建議盡快諮詢兒科醫師進行評估。</li>');
  if(hRank==='low')rm.push(isEn?'<li>📏 Height is below P3. Maintain balanced diet, adequate sleep, and regular physical activity.</li>':'<li>📏 身高位於 P3 以下，建議保持均衡飲食、充足睡眠及規律運動，持續追蹤。</li>');
  if(wRank==='low')rm.push(isEn?'<li>⚖️ Weight is below P3. Ensure sufficient caloric intake and nutritional balance.</li>':'<li>⚖️ 體重位於 P3 以下，建議確保足夠熱量攝取與營養均衡。</li>');
  if(hRank==='high')rm.push(isEn?'<li>📏 Height is above P97. Regular monitoring with a healthcare provider is recommended.</li>':'<li>📏 身高位於 P97 以上，建議定期與醫師追蹤評估。</li>');
  if(wRank==='high')rm.push(isEn?'<li>⚖️ Weight is above P97. Maintain healthy eating habits and regular exercise.</li>':'<li>⚖️ 體重位於 P97 以上，建議維持健康飲食習慣及規律運動。</li>');
  rm.push(isEn?'<li>📅 Growth assessment is recommended every 3–6 months to track long-term trends.</li>':'<li>📅 建議每 3–6 個月定期量測，追蹤長期生長趨勢。</li>');
  if(pred&&pred.isExtreme)rm.push(isEn?'<li>⚠️ Height is at an extreme percentile (below P3 or above P97). Genetic prediction may be more reliable — please consult a pediatrician for accurate assessment.</li>':'<li>⚠️ 身高處於極端百分位（P3以下或P97以上），遺傳預測可能更具參考價值，建議諮詢小兒科醫師進行評估。</li>');
  if(rptMph)rm.push(isEn?'<li>🧬 Genetic predicted height (Mid-Parental Height): <strong>'+rptMph.target+' cm</strong> (range '+rptMph.low+'–'+rptMph.high+' cm).</li>':'<li>🧬 遺傳預測身高（父母中間值法）：<strong>'+rptMph.target+' cm</strong>（範圍 '+rptMph.low+'–'+rptMph.high+' cm）。</li>');
  return rm;
}
function _rptScRows(supplements,sorted,isEn){
  if(!supplements.length||sorted.length<2)return '';
  var html='',cmYr2=isEn?' cm/yr':' cm/年';
  supplements.slice().sort(function(a,b){return a.date.localeCompare(b.date);}).forEach(function(s){
    var bef2=sorted.filter(function(m){return m.date<s.date;});
    var aft2=sorted.filter(function(m){return m.date>s.date;});
    var bR=null,aR=null;
    if(bef2.length>=2){var bd2=(new Date(bef2[bef2.length-1].date)-new Date(bef2[0].date))/86400000;if(bd2>=14)bR=((bef2[bef2.length-1].height-bef2[0].height)/bd2*365).toFixed(1);}
    if(aft2.length>=2){var ad2=(new Date(aft2[aft2.length-1].date)-new Date(aft2[0].date))/86400000;if(ad2>=14)aR=((aft2[aft2.length-1].height-aft2[0].height)/ad2*365).toFixed(1);}
    var df2=bR!==null&&aR!==null?(parseFloat(aR)-parseFloat(bR)).toFixed(1):null;
    var pos3=df2!==null&&parseFloat(df2)>0;
    html+='<div class="sc-row">'+
      '<span class="sc-name">⭐ '+esc(s.name)+'</span>'+
      '<span class="sc-since">'+(isEn?'since ':'自 ')+fmtDate(s.date)+'</span>'+
      '<span style="flex:1"></span>'+
      '<span class="sc-rate sc-bef">'+(isEn?'Before: ':'前：')+(bR!==null?bR+cmYr2.trim():(isEn?'—':'資料不足'))+'</span>'+
      '<span class="sc-arr">→</span>'+
      '<span class="sc-rate '+(aR!==null?'sc-aft-ok':'sc-aft-obs')+'">'+(isEn?'After: ':'後：')+(aR!==null?aR+cmYr2.trim():(isEn?'Observing…':'觀察中'))+'</span>'+
      (df2!==null?'<span class="sc-diff '+(pos3?'sc-pos':'sc-neg')+'">'+(pos3?'▲ +':'▼ ')+df2+cmYr2.trim()+'</span>':'')+
    '</div>';
  });
  return html;
}
function buildReportHTML(hImg,wImg){
  var isEn=currentLang==='en';
  var dateStr=new Date().toLocaleDateString(isEn?'en-US':'zh-TW',{year:'numeric',month:'long',day:'numeric'});
  var dateShort=new Date().toISOString().slice(0,10).replace(/-/g,'.');
  var name=currentChild.name;
  var gender=currentChild.gender;
  var bday=currentChild.birthday;
  var bdayFmt=bday.replace(/-/g,'.');
  var sorted=measurements.slice().sort(function(a,b){return a.date.localeCompare(b.date);});
  var latest=sorted[sorted.length-1];
  var latestAge=getAgeMonths(latest.date);
  var latestDate=new Date(latest.date);
  var ageStr=fmtAgeFull(bday,latest.date);
  var whoH=gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var whoW=gender==='女'?WHO_W_GIRL:WHO_W_BOY;
  var hRank=getPctRank(latestAge,latest.height,whoH);
  var wRank=getPctRank(latestAge,latest.weight,whoW);
  var pred=predictAdultHeight();
  var gr=_rptGrowthRate(sorted,latest,latestDate,latestAge);
  var annualH=gr.annualH,thresh=gr.thresh,annualLow=gr.annualLow,ref=gr.ref,hDiff=gr.hDiff,refDays=gr.refDays;
  var ac=_rptAlertCard(annualH,annualLow,thresh,isEn);
  var acColor=ac.acColor,acBg=ac.acBg,acBorder=ac.acBorder,acTitle=ac.acTitle,acBody=ac.acBody,acNote=ac.acNote;
  var rptMph=calcMidParentalHeight();
  var rmBullets=_rptReminders(annualH,annualLow,thresh,hRank,wRank,pred,rptMph,isEn);
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
  var contentBgUrl=baseHref+'images/content-bg.jpg';
  var desktopBgUrl=baseHref+'images/desktop-bg.webp';
  var scRowsHTML=_rptScRows(supplements,sorted,isEn);
  /* ── assemble report HTML from sections ── */
  var headHTML=
    '<!DOCTYPE html><html lang="'+(isEn?'en':'zh-TW')+'"><head>'+
    '<meta charset="UTF-8"><meta name="viewport" content="width=860">'+
    '<base href="'+baseHref+'">'+
    '<title>'+(isEn?safeName+"'s Growth Report":safeName+' 成長報告')+'</title>'+
    '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Zen+Maru+Gothic:wght@700&display=swap" rel="stylesheet">'+
    '<style>'+_rptCSS(contentBgUrl,desktopBgUrl)+'</style></head><body>';

  var heroHTML=
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
      '</div>';

  var bodyHTML=
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
      '</div>';

  var footerHTML=
      '<div class="rpt-footer">'+
        '⚠️ '+(isEn?'This report is for reference only and does not constitute medical advice. If you have any growth concerns, please consult a pediatrician for professional assessment.':'本報告僅供參考，不作為醫療診斷依據。如有任何成長疑慮，請諮詢兒科醫師進行專業評估。')+'<br>'+
        '<span style="color:rgba(160,155,215,0.55);font-size:0.88em;">⭐ Baby Growth Tracker · '+dateShort+'</span>'+
      '</div>'+
    '</div>';

  var scriptHTML='<scr'+'ipt>'+_rptScript(dlName,saveBtnLabel,shareBtnLabel,loadingLabel,isMobileDev)+'<'+'/scr'+'ipt></body></html>';

  return headHTML+heroHTML+bodyHTML+footerHTML+scriptHTML;
}
