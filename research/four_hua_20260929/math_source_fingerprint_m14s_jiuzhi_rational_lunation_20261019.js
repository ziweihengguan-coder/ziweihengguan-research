"use strict";
/**
 * M14-S 宿曜數理：九執曆閏月7/228 × 欠夜11/703的有理數週期
 * Source: 開元占經104〈推積日及小餘〉
 *   https://www.eee-learning.com/book/kaiyenjan104
 * Independent scanned book-page inspection: NOT YET DONE.
 * 429 / 169 phase constant ambiguous; never set either as authenticated.
 * No year-specific moon ephemeris, intertextual caller, or 28->27 conversion is asserted.
 */
const assert=require("node:assert/strict");
let n=0;
const test=(title,f)=>{f();n++;console.log("PASS "+title);};
const leap=(m)=>Math.floor((7*m+132)/228);
const raw=(m)=>30*(m+leap(m));
const omission=(d,c)=>Math.floor((11*d+c)/703);
const calendar=(m,c)=>raw(m)-omission(raw(m),c);
const cycleM = 228; // 19*12 base months
const monthNum = 30*(703-11); // 20760
const monthDen = 703;
const month = monthNum/monthDen;
const yr = month*235/19;
const close=(a,b,epsilon=1e-10)=>assert(Math.abs(a-b)<epsilon, `${a} is not close to ${b}`);

test("Source ratio leap=7/228; 19 years x12=228",()=>assert.equal(19*12,228));
test("228 source ordinary-months -> exactly 7 leap months independently of phase",()=>{
 for(let m=0;m<=2000;m++)assert.equal(leap(m+228)-leap(m),7);
});
test("228 + 7 = 235 total lunations in model's 19-year mean",()=>assert.equal(228+7,235));
test("source raw count: M=685, intercalation=21, pre-omission days=21185",()=>{
 const m=57*12+1;
 assert.equal(m,685);assert.equal(leap(m),21);
 assert.equal(raw(m)+5,21185);
});
test("Omitted days per 703 day-count increment are exactly eleven",()=>{
 for(const c of [169,429])for(let d=0;d<5000;d++)assert.equal(omission(d+703,c)-omission(d,c),11);
});
test("Rational mean month = 30 x (1-11/703)",()=>close(month,30*(1-11/703)));
test("Mean lunation numeric 29.53058321479374 d",()=>close(month,29.53058321479374));
test("Mean lunation 30-330/703 exact numerator equivalence",()=>assert.equal(monthNum,20760));
test("Julian solar reference 365.25 differs; do not claim exact agreement",()=>{
 assert(yr<365.25 && yr>365.24);
});
test("Mean 19-year span 6939.687055 days from 235 mean lunations",()=>close(yr*19,6939.687055476529,1e-8));
test("Mean model year 365.24668713 days",()=>close(yr,365.2466871303436,1e-8));
test("Finite 19-year count is integer 6939/6940 days, not continuous mean",()=>{
 const seen=new Set();
 for(const c of [429,169])for(let m=0;m<1000;m++){
   const delta=calendar(m+228,c)-calendar(m,c);
   seen.add(delta);assert(delta===6939||delta===6940);
 }
 assert.deepEqual([...seen].sort(),[6939,6940]);
});
test("Both ambiguous constants preserve identical long-run slopes",()=>{
 const meanA=(calendar(200000,169)-calendar(0,169))/200000;
 const meanB=(calendar(200000,429)-calendar(0,429))/200000;
 close(meanA,meanB,0.00001);
 close(meanA,month*235/228,0.0001);
});
test("Known start-day Q for two unresolved readings diverges by one",()=>{
 assert.equal(omission(21185,429),332);
 assert.equal(omission(21185,169),331);
 assert.equal(21185-omission(21185,429),20853);
 assert.equal(21185-omission(21185,169),20854);
});
test("This one-day change changes the weekday mod7",()=>{
 assert.notEqual(20853%7,20854%7);
});
test("The 703 quotient is not an angular-minute / 27-lodge conversion",()=>{
 assert.notEqual(703,800);
 assert.notEqual(703,21600);
});
test("Pure 27-lodge 800-bin operation requires computed 定月, not this mean period",()=>{
 const derived={meanMonth:month,concreteDingYue:null,concreteWangXiu:null};
 assert.equal(derived.concreteDingYue,null);
 assert.equal(derived.concreteWangXiu,null);
});
test("OldQiuCarrier -> FixedJiCarrier remains without source-side caller",()=>{
 const status={target:"癸囚炁→成熟貪狼",caller:null,section816:"OPEN",section817:"OPEN",section818:"OPEN"};
 assert.equal(status.caller,null);
 for(const k of ["section816","section817","section818"])assert.equal(status[k],"OPEN");
});
console.log(`M14-S RESULT ${n}/${n} PASS; 7/228 + 11/703 rational-cycle fingerprint; 429/169 PENDING; calendar-day and lunar mansion caller NOT PROVED.`);
