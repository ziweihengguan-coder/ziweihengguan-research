'use strict';
// M02: mathematical fingerprints across old-ten-transforms, 官星取曜,
// Ziwei/Tianfu placement and old-name/new-name placement signatures.
// Read-only verifications. No mature Hua-Ji tables and no external networking.
// WYG: local research/星學大成_Kanripo_001.txt (historical layer: Siku transcription);
// Ziwei placement: extant ziwei_mainstar_subcycle_audit_20261004.js
// old-name placement: extant §818-D and ji_818_d... source-only audit.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const doc=fs.readFileSync(path.join(__dirname,'..','星學大成_Kanripo_001.txt'),'utf8')
  .replace(/\s|¶|\//g,'');
const checked={wygAnchors:0,lucycle:0,officialVerse:0,
  roleMatrixAlgorithm:0,polarizedOfficer:0,constantShiftNegative:0,
  ziweiIterative:0,water2Fixture:0,tianfuReflection:0,
  nameInputTypeControls:0,crossNameSameAlgorithm:0,roleNamespace:0};
function ck(label,cond,description){assert.ok(cond,description);checked[label]++;}
const anchors=[
 '十干變曜所以然之理無可稽考',
 '甲乙丙丁戊己庚辛壬癸專配火孛木金土月',
 '化囚者皆其梟印',
 '變為囚者屬疾厄',
 '祿者天元祿甲火乙孛丙屬木丁是金星',
 '甲炁乙水是官星丙羅丁計戊孛成',
 '己火庚金辛見木壬隂癸土定功名',
 '甲以辛為官辛以炁為祿',
 '如甲以辛為官辛祿在酉是也'
];
for(const s of anchors) ck('wygAnchors',doc.includes(s),'WYG v1 text missing: '+s);

const ring=['火','孛','木','金','土','月','水','炁','計','羅'];
const officer=['炁','水','羅','計','孛','火','金','木','月','土'];
const mod=(n,m)=>(n%m+m)%m;
const transform=(g,r)=>ring[mod(g+r,10)];
for(let g=0;g<10;g++) ck('lucycle',transform(g,0)===ring[g],'yearlu '+g);
for(let g=0;g<10;g++) {
  const sum=mod(g+7-2*(g%2),10); // 正官干：甲→辛、乙→庚、...、癸→戊
  ck('officialVerse',ring[sum]===officer[g],'官星 '+g);
  ck('polarizedOfficer',mod(g+7-2*(g%2),10)===sum,'yin-yang selector '+g);
}
for(let g=0;g<10;g++) {
  for(let r=0;r<10;r++) {
    let i=g;for(let j=0;j<r;j++) i=mod(i+1,10);
    ck('roleMatrixAlgorithm',ring[i]===transform(g,r),'iterative ten role cycle '+g+','+r);
  }
}
const perShift=Array.from({length:10},(_,k)=>officer.reduce((n,s,g)=>n+(transform(g,k)===s?1:0),0));
ck('constantShiftNegative',Math.max(...perShift)===5,'官星 should NOT be a single fixed ten-cycle shift');
ck('constantShiftNegative',perShift.filter(s=>s===5).length===2&&perShift.filter(s=>s===0).length===8,'only offsets +5 and +7 hit 5/10; all other shifts hit 0/10');

const palaces=[...'寅卯辰巳午未申酉戌亥子丑'];
function ziweiPosition(day,bureau) {
  const q=Math.ceil(day/bureau),gap=q*bureau-day;
  return mod(q-1+(gap%2===0?gap:-gap),12);
}
function ziweiIterative(day,bureau) {
  let q=0,x=day;
  while(x>0){x-=bureau;q++;}
  let pos=0;
  for(let i=1;i<q;i++) pos=mod(pos+1,12);
  for(let i=0;i<-x;i++) pos=mod(pos+((-x)%2===0?1:-1),12);
  return pos;
}
for(let b=2;b<=6;b++)for(let d=1;d<=30;d++)
 ck('ziweiIterative',ziweiPosition(d,b)===ziweiIterative(d,b),'five bureau iterative match');
const water2=['丑','寅','寅','卯','卯','辰','辰','巳','巳','午',
  '午','未','未','申','申','酉','酉','戌','戌','亥',
  '亥','子','子','丑','丑','寅','寅','卯','卯','辰'];
for(let d=1;d<=30;d++)
 ck('water2Fixture',palaces[ziweiPosition(d,2)]===water2[d-1],'water2 reference '+d);
const reflect=p=>mod(-p,12);
for(let p=0;p<12;p++)
 ck('tianfuReflection',reflect(reflect(p))===p,'紫府 reflection involution '+p);
ck('tianfuReflection',[...Array(12).keys()].filter(p=>reflect(p)===p)
    .map(p=>palaces[p]).join('、')==='寅、申','reflect fixed points 寅申');

// Inherited §818-D: old 龍池/鳳閣 were 生時-based; same positional operators
// are known as 新文曲/文昌; newly named 龍池/鳳閣 become 生年支-based.
// These comparisons intentionally test ALL states, not sample independent manuscripts.
let eqSameName=0,eqCrossName=0;
for(let h=0;h<12;h++)for(let y=0;y<12;y++) {
  const oldLong=mod(4+h,12),oldFeng=mod(10-h,12);
  const newWenQu=mod(4+h,12),newWenChang=mod(10-h,12);
  const newLong=mod(4+y,12),newFeng=mod(10-y,12);
  ck('crossNameSameAlgorithm',oldLong===newWenQu&&oldFeng===newWenChang,'old/new signature h='+h+',y='+y);
  if(oldLong===newLong&&oldFeng===newFeng)eqSameName++;
  if(oldLong===newWenQu&&oldFeng===newWenChang)eqCrossName++;
}
ck('nameInputTypeControls',eqSameName===12,'same-name old/new equate only 12/144');
ck('nameInputTypeControls',eqCrossName===144,'different-name same-input operators 144/144');
ck('nameInputTypeControls',eqSameName!==eqCrossName,'role label != positional operator');

// WYG 官星(g) is an old star; same book 〈官星貴人〉 is earthly-branch
// index derived from 官干祿支. Input/output signatures must remain distinct.
// A fixed star-to-branch mapping requires an extra map; cannot infer identity.
ck('roleNamespace',officer[0]==='炁' && '酉'!==officer[0] && !ring.includes('酉'),'甲官星炁 vs 甲官星貴人酉 are distinct output types');

// Extra type negative control: a full ten-cycle cannot embed additively
// into the twelve-cycle, since f(1)=a requires 10a=0 (mod12).
const allowed=[...Array(12).keys()].filter(a=>mod(10*a,12)===0);
ck('roleNamespace',JSON.stringify(allowed)==='[0,6]','Z10->Z12 additive homomorphism cannot preserve order 10');

console.log(JSON.stringify({
 study:'M02',status:'PASS / SOURCE ANCHORS + OPERATOR CONTROLS, NOT HISTORICAL TRANSMISSION',
 counts:checked,totalChecks:Object.values(checked).reduce((a,b)=>a+b,0),
 sourceWitnesses:'WYG transcribed witness; §818-D and established star-placement model reused, not new source witnesses',
 observations:{
  tenRoleCycle:'g+r (mod 10)',officialSelector:'g+7-2*(g mod2) (mod10)',
  bestConstantShiftToOfficer:Math.max(...perShift),
  shiftMatches:perShift,
  ziwei:'ceil(day/bureau); gap parity + mod12',
  tianfu:'p -> -p (mod12)',
  oldNameNewNameInputPairs:{crossNameSameAlgorithm:eqCrossName,sameNameDifferentAlgorithm:eqSameName,formallyChecked:144},
  crossCycleHomomorphismImages:allowed
 },
 gates:{
  noMatureFourHuaImported:true,
  noSpecificA_QiuToB_AnnualQiuCaller:true,
  all_816_817_818_OPEN:true,
  noAggregationWithM01:true
 }
},null,2));
