'use strict';
// M01: ancient astronomical / astrological mathematical operator audit (2026-10-18).
// Pure source-text anchors (local Ming-through-Qing witness) + transparent arithmetic.
// No mature Hua-Ji target table is opened. No historical lineage is assumed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const text = fs.readFileSync(path.resolve(__dirname, '..', '星學大成_Kanripo_007.txt'), 'utf8').replace(/\s|¶/g, '');
const anchors = [
  '起竹羅三限',
  '三限用七政行年例',
  '水星限二十四年',
  '木星限三十年',
  '土星限二十六年',
  '火星限二十八年',
  '金土二限各二十六年',
  '三十及三十一三',
  '十二停住三十三交木限',
  '六十三六十',
  '四停住六十五交土限',
  '六年通前是三限一周',
  '太陽火星限二起逆數亦二各二十八年',
];
let checks=0;
function ok(condition, msg){assert.ok(condition,msg);checks++;}
for(const a of anchors) ok(text.includes(a), 'WYG v7 source anchor: '+a);

// 《唐開元占經》v104 / 《天竺九執曆經》:
// 「又置積日，以六十除，棄之餘」「又置積日，以七除，棄之餘」
// Internet witnesses checked separately; the following checks are MATHEMATICAL
// CONSEQUENCES of those instructions, not ancient-source citation verifications.
const mod=(n,m)=>((n % m)+m)%m;
const signature=n=>mod(n,60)+':'+mod(n,7);
const signatures=new Set(Array.from({length:420},(_,n)=>signature(n)));
ok(signatures.size===420,'all 420 pairs (mod60,mod7) distinct');
for (let n=0;n<420;n++) ok(signature(n)===signature(n+420),'full pair repeats with 420 days at '+n);
for (let delta=1;delta<420;delta++) {
  if (signature(0)===signature(delta)) throw new Error('earlier full-pair repeat '+delta);
}
ok(true,'no smaller positive offset repeats complete pair');
ok(420 % 60===0 && 420%7===0,'420 common period');
ok(60*7===420,'60 and 7 are coprime; joint period is 420');

// Source v104 also states「六十分一度、三十度一相、十二相」
// Interpret a small unit as 1/60 degree, not as absolute tropical year units.
function encodeSmallUnit(n) {
  const k=mod(n,21600);
  return {sign:Math.floor(k/1800), degree:Math.floor(k/60)%30, minute:k%60};
}
function decodeSmallUnit(p){return p.sign*1800+p.degree*60+p.minute;}
const range=new Set();
for(let n=0;n<21600;n++){
  const p=encodeSmallUnit(n);
  if(decodeSmallUnit(p)!==n) throw new Error('mixed radix reversibility at '+n);
  range.add(p.sign+':'+p.degree+':'+p.minute);
}
ok(range.size===21600,'12*30*60 positional scale exhausts 21600 units');
ok(decodeSmallUnit(encodeSmallUnit(21600))===0,'circle wraps at 21600 units');
ok(encodeSmallUnit(1800).sign===1,'1800 minute-units per sign');
ok(encodeSmallUnit(60).degree===1,'60 minute-units per degree');

// WYG 7 example: 2–29 solar(28), pause30–32, 33–62 wood(30),
// pause63–64, 65–90 Saturn/earth(26). One *example*; not all charts.
const sample=[];
for(let age=2;age<=90;age++){
  let phase=age<=29?'sun':age<=32?'pause':age<=62?'wood':age<=64?'pause':'earth';
  sample.push({age,phase});
}
const counts=sample.reduce((a,x)=>(a[x.phase]=(a[x.phase]||0)+1,a),{});
ok(counts.sun===28 && counts.wood===30 && counts.earth===26,'28/30/26 active years');
ok(counts.pause===5,'five stopped ages explicitly in the example');
ok(sample.length===89 && 28+30+26+5===89,'2–90 inclusive covers 89 ages, not 84');
ok(28+30+26===84,'84 is active-year subtotal only');
ok(84%7===0 && 84%12===0,'84 coincides with lcm(7,12): hypothesis only, not dated source link');

// 《九執曆》卷104〈推月間量命〉: 24 segments of 3°45′ (= 90°).
// These are *critical differences reconstructed by cross-checking accumulated
// values and scholarly transcriptions*, NOT a diplomatic transcription of the
// WYG chapter; printed witnesses disagree or contain digit errors in some cells.
// Primary: https://zh.wikisource.org/zh-hant/唐開元占經_(四庫全書本)/卷104
// Study: https://case.ntu.edu.tw/highscope/三角函數值表/index.html
const sineStepDiffs=[225,224,222,219,215,210,205,199,191,183,174,164,154,143,131,119,106,93,79,65,51,37,22,7];
ok(sineStepDiffs.length===24,'24 sine difference entries');
const sineCumulative=[]; let acc=0;
for (const increment of sineStepDiffs){acc+=increment;sineCumulative.push(acc);}
ok(sineCumulative[23]===3438,'24th cumulative ordinate 3438');
ok(sineCumulative[7]===1719 && 1719/3438===0.5,'30 degrees has half-radius sine ordinate');
ok(sineCumulative[11]===2431,'45 degrees sine tabular ordinate');
ok(24*(3+45/60)===90,'24 * 3°45′ equals right angle');
const sineAbsDeviations=sineCumulative.map((y,i)=>Math.abs(y-3438*Math.sin((i+1)*Math.PI/48)));
const maxSineAbsError=Math.max(...sineAbsDeviations);
ok(maxSineAbsError<1,'reconstructed table differs from 3438*sin(theta) by <1 tabular unit');
ok(sineCumulative.every((v,i)=>i===0 || v>sineCumulative[i-1]),'reconstructed sin table monotonically increases');
ok(sineCumulative[3]-sineCumulative[2]===219,'4th segment candidate 219 from 890 - 671; printed 119 in some witnesses');
ok(sineCumulative[5]-sineCumulative[4]===210,'6th segment candidate 210 from 1315 - 1105; printed 310 in some witnesses');
ok(sineCumulative[20]===3372,'21st cumulative candidate 3372, printed 3572 in some witnesses');
ok(sineCumulative[22]===3431,'23rd cumulative candidate 3431, printed 3421 in some witnesses');

console.log(JSON.stringify({study:'M01',sourceLocal:'星學大成_Kanripo_007.txt',checks,sourceAnchors:anchors.length,
  moduloPair:{periodDays:420,distinctPairs:signatures.size},
  angleUnits:{signs:12,degreesPerSign:30,minutesPerDegree:60,unitsPerCircle:range.size},
  sanxianSample:{ages:'2-90 inclusive',...counts,activeSubtotal:84,totalWithPauses:89},
  reconstructedSineDifferenceTable:{segments:24,segmentDegrees:3.75,radiusScale:3438,lastValue:acc,at30Degrees:sineCumulative[7],at45Degrees:sineCumulative[11],maxAbsoluteTableUnitError:maxSineAbsError,textualNumericVariants:'NOT AUTOMATICALLY CORRECTED IN SOURCE'},
  status:'MATH VERIFIED / LOCAL SOURCE ANCHORS VERIFIED / NO FOUR-HUA TRANSFER FORMULA'},null,2));
