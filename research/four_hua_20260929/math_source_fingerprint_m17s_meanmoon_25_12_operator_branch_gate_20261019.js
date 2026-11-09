"use strict";
/**
 * M17-S | <推中月> two pending operators:
 *    小餘 -> duplicate -> 下位二十五餘之 -> 加上位 -> 除六十
 *    自入月已來所經日 -> 以十二除之 -> 以三十除之
 * Mathematical reconstruction candidates, NOT textual emendations or
 * verified dates. Do not pass into true Moon / T1299 mansion.
 *
 * Source: 唐開元占經 卷104 (Siku family electronic reproductions)
 * https://www.eee-learning.com/book/kaiyenjan104
 * https://ctext.org/wiki.pl?chapter=115572&if=gb
 * https://zh.wikisource.org/zh-hans/唐開元占經_(四庫全書本)/全覽4
 */
const assert = require("node:assert/strict");
const CIRCLE=21600, DEG=60, SIGN=1800;
const mod=(x,m)=>((x%m)+m)%m;
let passed=0;
function test(label,fn){fn();passed++;console.log("PASS "+label);}
const KIND=Object.freeze({
 TITHI:"elapsed_mean_tithi",
 DAY:"candidate_elapsed_savana_day",
 SUN:"candidate_mean_solar_arcmin",
 MEAN:"conditional_mean_moon_arcmin",
 APOGEE:"conditional_lunar_apogee_arcmin",
 ANOMALY:"conditional_lunar_anomaly_arcmin",
 TRUE:"historically_verified_true_moon_arcmin"
});
function typed(value,kind){assert(Number.isSafeInteger(value));return Object.freeze({value,kind});}
function requireKind(x,k){assert(x&&x.kind===k,"expected "+k+" got "+x?.kind);}
function epochExample(c){
 assert([169,429].includes(c));
 const months=57*12+1,leaps=Math.floor((months*7+132)/228);
 const tithi=typed((months+leaps)*30+5,KIND.TITHI);
 const omit=Math.floor((11*tithi.value+c)/703),r=(11*tithi.value+c)%703;
 const day=typed(tithi.value-omit,KIND.DAY);
 const lostDegree=Math.floor(day.value*12/900);
 const r900=day.value*12%900;
 const lostMinute=Math.floor(r900/15)+30;
 const sun=typed(mod((day.value-lostDegree)*DEG-lostMinute,CIRCLE),KIND.SUN);
 return Object.freeze({c,months,leaps,tithi,day,omit,r,sun,elapsedMonthOrdinal:5,
   dayTypeCalibrated:false,source25Verified:false,source12Verified:false});
}
function candidateRemainder(x,branch){
 assert(Number.isSafeInteger(x)&&x>=0&&x<703);
 if(branch==="COPY_QUOTIENT_25")return Object.freeze({
  branch,quotient:Math.floor(x/25),retained:x,
  arcmin:x+Math.floor(x/25),operatorVerified:false});
 if(branch==="COPY_MOD_25")return Object.freeze({
  branch,remainder:x%25,retained:x,
  arcmin:x+(x%25),operatorVerified:false});
 if(branch==="COPY_MULTIPLY_25")return Object.freeze({
  branch,multiplied:x*25,retained:x,
  arcmin:x+x*25,operatorVerified:false});
 if(branch==="QUOTIENT_ONLY")return Object.freeze({
  branch,quotient:Math.floor(x/25),retained:null,
  arcmin:Math.floor(x/25),operatorVerified:false});
 throw new Error("unknown 25 operator branch");
}
function candidateTithiRate(elapsed,branch){
 assert(Number.isSafeInteger(elapsed)&&elapsed>=0&&elapsed<=30);
 if(branch==="MULTIPLY_12")return Object.freeze({
  arcmin:elapsed*12*DEG,branch,operatorVerified:false});
 if(branch==="LITERAL_DIVIDE_12")return Object.freeze({
  arcmin:Math.floor(elapsed/12)*DEG,branch,operatorVerified:false});
 throw new Error("unknown 12 operator branch");
}
function candidateMeanMoon(ex,o25="COPY_QUOTIENT_25",o12="MULTIPLY_12"){
 requireKind(ex.sun,KIND.SUN);
 const correction=candidateRemainder(ex.r,o25);
 const daily=candidateTithiRate(ex.elapsedMonthOrdinal,o12);
 const arcmin=mod(ex.sun.value+correction.arcmin+daily.arcmin,CIRCLE);
 return Object.freeze({kind:KIND.MEAN,arcmin,arcminComponents:Object.freeze({
  sun:ex.sun.value,remainder:correction.arcmin,monthElapsed:daily.arcmin}),
  operators:Object.freeze({o25,o12}),historicallyVerified:false,
  supportedByConditionalDimensionalConsistency:true});
}
function apogeeCandidate(ex,offset){
 requireKind(ex.day,KIND.DAY);
 const d=ex.day.value;
 const running=(Math.floor(d/9)*60+Math.floor((d%9)*60/9)+Math.floor(d/60))%CIRCLE;
 const offsets=Object.freeze({FIRST:206*DEG+41,SECOND:43*DEG+45,BOTH:250*DEG+26});
 assert(Object.prototype.hasOwnProperty.call(offsets,offset));
 return Object.freeze({kind:KIND.APOGEE,arcmin:mod(running+offsets[offset],CIRCLE),
  offset,historicallyVerified:false});
}
function provisionalAnomaly(mean,high){
 requireKind(mean,KIND.MEAN);
 requireKind(high,KIND.APOGEE);
 return Object.freeze({kind:KIND.ANOMALY,arcmin:mod(mean.arcmin-high.arcmin,CIRCLE),
  notVerified:true,noTrueMoonOutput:true});
}
function toVerifiedTrueMoon(x) {
 if(!x||x.kind!==KIND.TRUE||x.historicallyVerified!==true)
  throw new TypeError("來源算子與曆元尚未校勘，不可輸出已核定月或27宿/T1299望宿");
 return x;
}
const a=epochExample(169),b=epochExample(429);
const qa=candidateMeanMoon(a),qb=candidateMeanMoon(b);
test("原曆例685月與21閏之原前段不變",()=>assert.deepEqual([a.months,a.leaps],[685,21]));
test("積日來源仍為21,185的30日候選槽",()=>assert.equal(a.tithi.value,21185));
test("169與429兩分支的savana候選日不同",()=>assert.deepEqual([a.day.value,b.day.value],[20854,20853]));
test("兩分支703制小餘511與68",()=>assert.deepEqual([a.r,b.r],[511,68]));
test("前案中日55度27分與54度28分",()=>assert.deepEqual([a.sun.value,b.sun.value],[55*60+27,54*60+28]));
test("25商後加原小餘之拷貝操作在511得到20",()=>assert.equal(candidateRemainder(511,"COPY_QUOTIENT_25").quotient,20));
test("25商後加原小餘511 +20 =531角分",()=>assert.equal(candidateRemainder(511,"COPY_QUOTIENT_25").arcmin,531));
test("68 + floor(68/25)=70角分",()=>assert.equal(candidateRemainder(68,"COPY_QUOTIENT_25").arcmin,70));
test("531角分等於8度51分",()=>assert.deepEqual([Math.floor(531/60),531%60],[8,51]));
test("70角分等於1度10分",()=>assert.deepEqual([Math.floor(70/60),70%60],[1,10]));
test("25商加原值之候選在餘0至702不超過730角分",()=>{
 for(let r=0;r<703;r++){
  const p=candidateRemainder(r,"COPY_QUOTIENT_25");
  assert(p.arcmin>=0&&p.arcmin<=730);
 }
});
test("25商加原值之候選對每一個小餘單調",()=>{
 for(let r=0;r<702;r++)
  assert(candidateRemainder(r+1,"COPY_QUOTIENT_25").arcmin>
    candidateRemainder(r,"COPY_QUOTIENT_25").arcmin);
});
test("25餘數加原值之候選在24->25出現倒跳負控",()=>{
 const f=r=>candidateRemainder(r,"COPY_MOD_25").arcmin;
 assert(f(25)<f(24));
});
test("25乘加原值之候選頂端逾周天半圈，非小餘微調",()=>{
 assert(candidateRemainder(702,"COPY_MULTIPLY_25").arcmin>180*60);
});
test("僅取25商而丟掉原餘違反得者加上位的候選句法",()=>{
 assert.equal(candidateRemainder(511,"QUOTIENT_ONLY").arcmin,20);
 assert.notEqual(candidateRemainder(511,"QUOTIENT_ONLY").arcmin,
   candidateRemainder(511,"COPY_QUOTIENT_25").arcmin);
});
test("月內五算乘十二得到60度即兩相",()=>{
 const t=candidateTithiRate(5,"MULTIPLY_12");
 assert.deepEqual([t.arcmin/60,t.arcmin/SIGN],[60,2]);
});
test("月內30算乘12度一周360度",()=>{
 assert.equal(candidateTithiRate(30,"MULTIPLY_12").arcmin,CIRCLE);
});
test("30日取十二度步伐與每相30度完全整除",()=>{
 for(let d=0;d<=30;d++){
  const x=candidateTithiRate(d,"MULTIPLY_12").arcmin;
  assert.equal(mod(x,SIGN)%DEG,0);
 }
});
test("五算照原字面12除，整度進量變0，與五算示例不匹配",()=>{
 assert.equal(candidateTithiRate(5,"LITERAL_DIVIDE_12").arcmin,0);
});
test("字面12除在30算只得2度，無30日一周性",()=>{
 assert.notEqual(candidateTithiRate(30,"LITERAL_DIVIDE_12").arcmin,CIRCLE);
});
test("中月候選169為124度18分",()=>{
 assert.equal(qa.arcmin,124*60+18);
});
test("中月候選429為115度38分",()=>{
 assert.equal(qb.arcmin,115*60+38);
});
test("169與429不能相互混同：條件中月差8度40分",()=>{
 assert.equal(qa.arcmin-qb.arcmin,8*60+40);
});
test("中月169分解為中日＋60度＋531分",()=>{
 assert.deepEqual(qa.arcminComponents,{sun:55*60+27,remainder:531,monthElapsed:3600});
});
test("中月429分解為中日＋60度＋70分",()=>{
 assert.deepEqual(qb.arcminComponents,{sun:54*60+28,remainder:70,monthElapsed:3600});
});
test("候選中月不得冒充經校定中月或真月",()=>{
 assert.equal(qa.historicallyVerified,false);
 assert.throws(()=>toVerifiedTrueMoon(qa),/不可輸出/);
});
test("錯支25餘取模與正支不同但均只標候選",()=>{
 const wrong=candidateMeanMoon(a,"COPY_MOD_25");
 assert.notEqual(wrong.arcmin,qa.arcmin);
 assert.equal(wrong.historicallyVerified,false);
});
test("錯支12照字面除與乘十二候選不等",()=>{
 const wrong=candidateMeanMoon(a,"COPY_QUOTIENT_25","LITERAL_DIVIDE_12");
 assert.equal(qa.arcmin-wrong.arcmin,3600);
});
test("169與429的高月各三個常數分支依然未校",()=>{
 for(const ex of [a,b])for(const branch of ["FIRST","SECOND","BOTH"]){
  const h=apogeeCandidate(ex,branch);
  assert.equal(h.historicallyVerified,false);
 }
});
test("169與429候選月藏可以列九執算術比較，但非真月",()=>{
 for(const [ex,moon] of [[a,qa],[b,qb]])for(const b of ["FIRST","SECOND","BOTH"]){
  const z=provisionalAnomaly(moon,apogeeCandidate(ex,b));
  assert(z.arcmin>=0&&z.arcmin<CIRCLE);
  assert.equal(z.notVerified,true);
  assert.throws(()=>toVerifiedTrueMoon(z),/不可輸出/);
 }
});
test("169高月FIRST候選月藏114度44分",()=>{
 assert.equal(provisionalAnomaly(qa,apogeeCandidate(a,"FIRST")).arcmin,114*60+44);
});
test("169高月SECOND候選月藏277度40分",()=>{
 assert.equal(provisionalAnomaly(qa,apogeeCandidate(a,"SECOND")).arcmin,277*60+40);
});
test("169高月BOTH候選月藏70度59分",()=>{
 assert.equal(provisionalAnomaly(qa,apogeeCandidate(a,"BOTH")).arcmin,70*60+59);
});
test("429高月FIRST候選月藏106度10分",()=>{
 assert.equal(provisionalAnomaly(qb,apogeeCandidate(b,"FIRST")).arcmin,106*60+10);
});
test("429高月SECOND候選月藏269度06分",()=>{
 assert.equal(provisionalAnomaly(qb,apogeeCandidate(b,"SECOND")).arcmin,269*60+6);
});
test("429高月BOTH候選月藏62度25分",()=>{
 assert.equal(provisionalAnomaly(qb,apogeeCandidate(b,"BOTH")).arcmin,62*60+25);
});
test("中月、月藏兩階即使算得數，也不能直接以800除作已核27宿",()=>{
 const z=provisionalAnomaly(qa,apogeeCandidate(a,"BOTH"));
 assert.throws(()=>toVerifiedTrueMoon(z),/27宿/);
});
test("月內算和積日不同型別不能混用",()=>{
 assert.notEqual(a.elapsedMonthOrdinal,a.day.value);
 assert.equal(a.day.kind,KIND.DAY);
});
test("沒有已核定曆元和兩疑文不能寫歷史月宿輸出",()=>{
 assert([a,b].every(x=>!x.dayTypeCalibrated&&!x.source25Verified&&!x.source12Verified));
});
test("§816／§817／§818及成熟化忌跨星承接維持開放",()=>{
 const state={s816:"OPEN",s817:"OPEN",s818:"OPEN",matureJiBridge:null};
 assert.deepEqual([state.s816,state.s817,state.s818],["OPEN","OPEN","OPEN"]);
 assert.equal(state.matureJiBridge,null);
});
console.log("M17-S RESULT "+passed+"/"+passed+" PASS; conditional middle-Moon candidate only; no verified true Moon / T1299 moon lodge.");
console.log("CONDITIONAL_EXAMPLE "+JSON.stringify({
 c169:{D:a.day.value,r:a.r,correction:531,meanMoonDegMin:[124,18],
  highBranches:["FIRST","SECOND","BOTH"].map(k=>({branch:k,
   highArcmin:apogeeCandidate(a,k).arcmin,
   anomalyArcmin:provisionalAnomaly(qa,apogeeCandidate(a,k)).arcmin}))},
 c429:{D:b.day.value,r:b.r,correction:70,meanMoonDegMin:[115,38],
  highBranches:["FIRST","SECOND","BOTH"].map(k=>({branch:k,
   highArcmin:apogeeCandidate(b,k).arcmin,
   anomalyArcmin:provisionalAnomaly(qb,apogeeCandidate(b,k)).arcmin}))}
}));