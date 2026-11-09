"use strict";
/**
 * M06 摩登伽經 T1300 and parallel T1301 numerical-source fixtures.
 *
 * Manually transcribed fixture from public CBETA-edition text:
 * https://tripitaka.zensoul.org/T/T1300/1
 * https://tripitaka.zensoul.org/T/T1300/2
 * https://tripitaka.zensoul.org/T/T1301/1
 *
 * This test does not fetch internet sources and cannot verify the date,
 * authorship, original Indic meaning or Ziwei derivation.
 */
const assert = require("node:assert/strict");
let n = 0;
function check(label, fn) { fn(); ++n; console.log("PASS", label); }
const months = [
  {month:6, day:17, night:13, shadow:5, moon:"女", sun:"七星"},
  {month:7, day:16, night:14, shadow:8, moon:"室", sun:"翼"},
  {month:8, day:15, night:15, shadow:13, moon:"婁", sun:"亢"},
  {month:9, day:14, night:16, shadow:15, moon:"昴", sun:"房"},
  {month:10, day:13, night:17, shadow:18, moon:"觜", sun:"箕"},
  {month:11, day:12, night:18, shadow:21, moon:"鬼", sun:"女"},
  {month:12, day:13, night:17, shadow:18, moon:"星", sun:"危"},
  {month:1, day:14, night:16, shadow:15, moon:"翼", sun:"奎"},
  {month:2, day:15, night:15, shadow:13, moon:"角", sun:"胃"},
  {month:3, day:16, night:14, shadow:10, moon:"氐", sun:"畢"},
  {month:4, day:17, night:13, shadow:7, moon:"心", sun:"參"},
  {month:5, day:18, night:12, shadow:4, moon:"箕", sun:"鬼"},
];
const lunar28 = "昴 畢 觜 參 井 鬼 柳 星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 牛 女 虛 危 室 壁 奎 婁 胃".split(" ");
const lunar27 = "星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 女 虛 危 室 壁 奎 婁 胃 昴 畢 觜 參 井 鬼 柳".split(" ");
check("T1300 28-lodge list unique",()=>{
  assert.equal(lunar28.length,28);assert.equal(new Set(lunar28).size,28);});
check("T1299 27-lodge list unique, excludes 牛",()=>{
  assert.equal(lunar27.length,27);assert.equal(new Set(lunar27).size,27);assert(!lunar27.includes("牛"));});
check("T1300 28-cycle minus 牛 is a rotation of T1299 27-cycle",()=>{
  const arr = lunar28.filter(x=>x!=="牛");
  const start = arr.indexOf("星");
  assert.deepEqual(arr.slice(start).concat(arr.slice(0,start)), lunar27);
});
check("T1300 T1299 do not share the same modulus despite same lodge order",()=>{
  assert.equal(lunar28.length-lunar27.length,1);
});
check("T1300 12 month fixtures are complete",()=>{
  assert.equal(months.length,12);
  assert.equal(new Set(months.map(x=>x.month)).size,12);
  assert(months.every(x=>x.month>=1&&x.month<=12));
});
for(const m of months) {
  check("month "+m.month+" day+night=30",()=>assert.equal(m.day+m.night,30));
  check("month "+m.month+" shadow positive on 12-cun gnomon",()=>assert(m.shadow>0));
  check("month "+m.month+" moon/sun lodges occur in T1300 list",()=>{
    assert(lunar28.includes(m.moon==="七星"?"星":m.moon));
    assert(lunar28.includes(m.sun==="七星"?"星":m.sun));
  });
}
check("May maximum daylight 18 and November minimum daylight 12",()=>{
  assert.equal(months.find(x=>x.month===5).day,18);
  assert.equal(months.find(x=>x.month===11).day,12);
});
check("February and August are equal day/night",()=>{
  for(const m of [2,8]){
    const row=months.find(x=>x.month===m);assert.equal(row.day,15);assert.equal(row.night,15);}
});
check("May and November are complementary 18:12 and 12:18",()=>{
  assert.equal(months.find(x=>x.month===5).day,months.find(x=>x.month===11).night);
  assert.equal(months.find(x=>x.month===11).day,months.find(x=>x.month===5).night);
});
check("Nov has maximum shadow 21 and May minimum 4",()=>{
  assert.equal(Math.max(...months.map(x=>x.shadow)),21);
  assert.equal(Math.min(...months.map(x=>x.shadow)),4);
  assert.equal(months.find(x=>x.month===11).shadow,21);
  assert.equal(months.find(x=>x.month===5).shadow,4);
});
check("T1300 first time scale: 60 ksana * 30 lava * 30 slices = 54000 ksana/day",()=>{
  assert.equal(60*30*30,54000);
});
check("T1300 second waterclock scale: 4 lava * 40 kacata *30 kala *2 ticks=9600 lava/slice",()=>{
  assert.equal(4*40*30*2,9600);
});
check("T1300 two lava/slice definitions differ by factor 320 (type mismatch)",()=>{
  assert.equal((4*40*30*2)/30,320);
});
check("T1300 19-year 7 intercalary months implies 235 lunar months",()=>{
  assert.equal(19*12+7,235);
});
check("30-day schematic month cannot equal 365-day year over 19 years",()=>{
  assert.equal(235*30,7050);
  assert.equal(19*365,6935);
  assert.equal(235*30-19*365,115);
});
check("Jupiter ~12 and Saturn ~28 are separate coarse sidereal-period fixtures",()=>{
  const sourcePeriods = {"歲星":12,"鎮星":28};
  assert.equal(sourcePeriods["歲星"],12);
  assert.equal(sourcePeriods["鎮星"],28);
  assert.equal(84 % sourcePeriods["歲星"],0);
  assert.equal(84 % sourcePeriods["鎮星"],0);
});
const weekdays = "日 月 火 水 木 金 土".split(" ");
const sevenInT1300First = "日 月 火 木 土 金 水".split(" ");
check("two seven-luminary sets equal",()=>{
  assert.deepEqual([...weekdays].sort(), [...sevenInT1300First].sort());
});
check("the first and second seven-luminary enumerations differ in ordering",()=>{
  assert.notDeepEqual(weekdays,sevenInT1300First);
});
const t1300Additional=["羅睺","彗星"];
const tenChangeOther=["氣","孛","羅","計"];
check("T1300 adds Rahu and comet, not the later 4 nonplanetary symbols by lexical identity",()=>{
  assert.equal(new Set(weekdays.concat(t1300Additional)).size,9);
  assert.equal(t1300Additional.includes("彗星"),true);
  assert.equal(tenChangeOther.includes("彗星"),false);
});
check("T1300 shadow chart and T1301 do not share exact month solstice markers as copied text",()=>{
  const t1300Winter=11,t1300Summer=5;
  const t1301Winter=12,t1301SpringLongDay=4;
  assert.notEqual(t1300Winter,t1301Winter);
  assert.notEqual(t1300Summer,t1301SpringLongDay);
});
check("T1301 time scalar 15 blinks *20卒 *30時 *30須臾 per day",()=>{
  assert.equal(15*20*30*30,270000);
});
check("repeated 觜, 柳 in separate T1300 categories is not a unique overwrite",()=>{
  const malignant=["參","柳","胃"], stable=["觜","角","星","柳","牛"];
  assert(malignant.includes("柳")&&stable.includes("柳"));
});
check("T1300 囚執 occurs as imprisonment rather than explicitly yearly 化囚",()=>{
  const situationalTerm="被囚執者解脫遲速";
  assert(situationalTerm.includes("囚")&&!situationalTerm.includes("化囚"));
});
console.log("RESULT: "+n+"/"+n+" manually transcribed fixture / arithmetic assertions PASS; NO 10-stem fixed Hua-Ji source caller.");
