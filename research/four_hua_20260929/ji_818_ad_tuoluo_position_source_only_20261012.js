'use strict';
// §818-AD, SOURCE-ONLY. This program MUST NOT load G0/G1/G2.
// Input tables are fixed transcriptions from the readable editions; assertions
// test the written algorithm, not a re-OCR or independent 1581 leaf verification.
const assert=require('node:assert/strict');
const STEMS=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
// 《全書》安祿存訣; 《捷覽》安祿存羊陀星訣, same rule.
const LU=['寅','卯','巳','午','巳','午','申','酉','亥','子'];
// 《全書》〈安命主〉 positional table; reading the 命主 of 陀宮 is
// a MODERN TEST HYPOTHESIS, not a textual caller for 化忌.
const MING_ZHU={
  '子':'貪狼','丑':'巨門','寅':'祿存','卯':'文曲','辰':'廉貞','巳':'武曲',
  '午':'破軍','未':'武曲','申':'廉貞','酉':'文曲','戌':'祿存','亥':'巨門'
};
// 星命系宮主（《通元賦》等傳錄）; distinct namespace from 斗數命主.
const GONG_ZHU={
  '子':'土','丑':'土','寅':'木','卯':'火','辰':'金','巳':'水',
  '午':'日','未':'月','申':'水','酉':'金','戌':'火','亥':'木'
};
// 五虎遁寅宮首干，保留年干才使後續區分丙戊／丁己成為可能。
// No ancient 化忌 caller for this additional calculation has been found.
const STEM_CYCLE=STEMS;
const TIGER_START=['丙','戊','庚','壬','甲','丙','戊','庚','壬','甲'];
const move=(b,d)=>BRANCHES[(BRANCHES.indexOf(b)+d+12)%12];
const palaceStem=(yearIndex,branch)=>{
  const steps=(BRANCHES.indexOf(branch)-BRANCHES.indexOf('寅')+12)%12;
  return STEM_CYCLE[(STEM_CYCLE.indexOf(TIGER_START[yearIndex])+steps)%10];
};
const out=STEMS.map((g,i)=>{
 const lu=LU[i],yang=move(lu,1),tuo=move(lu,-1);
 return {g,lu,yang,tuo,tuoMingzhu:MING_ZHU[tuo],tuoGongzhu:GONG_ZHU[tuo],
         tuoPalaceStem:palaceStem(i,tuo)};
});
let n=0;
const check=(condition,label)=>{assert.ok(condition,label);n++;};
check(out.length===10,'ten stems are present');
const expectYang=['卯','辰','午','未','午','未','酉','戌','子','丑'];
const expectTuo=['丑','寅','辰','巳','辰','巳','未','申','戌','亥'];
out.forEach((r,i)=>{
 check(r.yang===expectYang[i]&&r.tuo===expectTuo[i],r.g+' textual Lu+/-one position');
 check(move(r.tuo,1)===r.lu&&move(r.lu,1)===r.yang,r.g+' invariant adjacency');
});
check(out.find(x=>x.g==='癸').lu==='子'&&out.find(x=>x.g==='癸').yang==='丑'&&out.find(x=>x.g==='癸').tuo==='亥','《全書》 explicitly gives 癸 example');
check(new Set(out.map(r=>r.tuo)).size===8,'the ten stem inputs yield only eight distinct Tuo branches');
check(out[2].tuo===out[4].tuo&&out[2].tuo==='辰','丙/戊 collision at 辰');
check(out[3].tuo===out[5].tuo&&out[3].tuo==='巳','丁/己 collision at 巳');
check(out[2].tuoPalaceStem!==out[4].tuoPalaceStem,'丙戊 would require retaining additional year-stem input');
check(out[3].tuoPalaceStem!==out[5].tuoPalaceStem,'丁己 would require retaining additional year-stem input');
check(out[9].tuoMingzhu==='巨門','癸陀亥 as hypothetical 斗數命主 gives 巨門');
check(out[9].tuoGongzhu==='木','癸陀亥 as 星命宮主 gives 木, not a fixed star');
check(Object.keys(MING_ZHU).length===12&&Object.keys(GONG_ZHU).length===12,'both positional dictionaries cover twelve branches');
module.exports={STEMS,out,assertions:n};
if(require.main===module){
 console.log('SOURCE-ONLY '+n+'/'+n+' assertions PASS');
 console.table(out);
 console.log('Note: 命主(陀宮), 宮主(陀宮), and 宮干(陀宮) are hypothetical combinations; none is documented as a 化忌-carrier selector.');
}
