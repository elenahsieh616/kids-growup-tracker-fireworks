/* ── Growth & Height Prediction ──
   純計算邏輯：百分位、趨勢預測、台灣遺傳身高公式。
   *FromValues 為純函式（只吃參數，可被 tests.html 直接測試）；
   不帶後綴的 predictAdultHeight / calcMidParentalHeight 是讀全域狀態的薄包裝。
   依賴全域：currentChild, measurements, WHO_H_BOY/GIRL (who.js),
   getAgeMonths / getParentHeights (app.js)。皆於互動時呼叫，載入順序無虞。 */

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
// 純函式：依性別/月齡/身高，用百分位趨勢推估成人身高
function predictAdultHeightFromValues(gender,ageMonths,heightCm){
  var whoH=gender==='女'?WHO_H_GIRL:WHO_H_BOY;
  var rawPct=getPctScore(ageMonths,heightCm,whoH);
  var isExtreme=rawPct<=3||rawPct>=97;
  var pct=Math.max(3,Math.min(97,rawPct));
  var ref=gender==='女'?ADULT_H_REF.girl:ADULT_H_REF.boy;
  var pcts=[3,15,50,85,97],vals=[ref.p3,ref.p15,ref.p50,ref.p85,ref.p97];
  var adultH=ref.p50;
  if(pct<=3)adultH=ref.p3;
  else if(pct>=97)adultH=ref.p97;
  else for(var i=0;i<4;i++){if(pct>=pcts[i]&&pct<=pcts[i+1]){var t2=(pct-pcts[i])/(pcts[i+1]-pcts[i]);adultH=vals[i]+t2*(vals[i+1]-vals[i]);break;}}
  return{cm:Math.round(adultH*10)/10,pct:Math.round(rawPct),isExtreme:isExtreme};
}
function predictAdultHeight(){
  if(!currentChild||measurements.length<2)return null;
  var latest=measurements[0],am=getAgeMonths(latest.date);
  if(am<6)return null;
  return predictAdultHeightFromValues(currentChild.gender,am,latest.height);
}
// 純函式：台灣兒童遺傳身高公式 — 男 79.3+0.56×父母平均；女 35.2+0.76×父母平均；參考區間 ±8.5cm
function calcMidParentalHeightFromValues(gender,fatherH,motherH){
  if(!fatherH||!motherH)return null;
  var avg=(fatherH+motherH)/2;
  var target=gender==='女'?35.2+0.76*avg:79.3+0.56*avg;
  return{target:Math.round(target*10)/10,low:Math.round((target-8.5)*10)/10,high:Math.round((target+8.5)*10)/10};
}
function calcMidParentalHeight(){
  if(!currentChild)return null;
  var ph=getParentHeights(currentChild.id);
  return calcMidParentalHeightFromValues(currentChild.gender,ph.father,ph.mother);
}
