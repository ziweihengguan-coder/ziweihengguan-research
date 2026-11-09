"use strict";
/**
 * M10 source-side mathematical fingerprint: T1299/1 Yang Jingfeng 大唐月建圖.
 * Witness: https://deerpark.app/cbeta/T1299/1, lines 60-143.
 * Comparison: T1299/2 西國除牛宿; 27-host birthday algorithm.
 * All 360 strings are HUMAN-TRANSCRIBED fixtures, not live authenticated text;
 * PASS is mathematical agreement, not 360 independent historical sources.
 * DO NOT conflate 28-place calendar with 27-place zodiac, actual lunar ephemeris,
 * or year-stem Hua-Qiu to Ziwei carrier mapping.
 */
const assert = require("node:assert/strict");
const lodges28 = [..."虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗牛女"];
const lodges27 = lodges28.filter(x=>x!=="牛");
const rows=[
"虛室奎胃畢參鬼星翼角氐心",
"危壁婁昴觜井柳張軫亢房尾",
"室奎胃畢參鬼星翼角氐心箕",
"壁婁昴觜井柳張軫亢房尾斗",
"奎胃畢參鬼星翼角氐心箕牛",
"婁昴觜井柳張軫亢房尾斗女",
"胃畢參鬼星翼角氐心箕牛虛",
"昴觜井柳張軫亢房尾斗女危",
"畢參鬼星翼角氐心箕牛虛室",
"觜井柳張軫亢房尾斗女危壁",
"參鬼星翼角氐心箕牛虛室奎",
"井柳張軫亢房尾斗女危壁婁",
"鬼星翼角氐心箕牛虛室奎胃",
"柳張軫亢房尾斗女危壁婁昴",
"星翼角氐心箕牛虛室奎胃畢",
"張軫亢房尾斗女危壁婁昴觜",
"翼角氐心箕牛虛室奎胃畢參",
"軫亢房尾斗女危壁婁昴觜井",
"角氐心箕牛虛室奎胃畢參鬼",
"亢房尾斗女危壁婁昴觜井柳",
"氐心箕牛虛室奎胃畢參鬼星",
"房尾斗女危壁婁昴觜井柳張",
"心箕牛虛室奎胃畢參鬼星翼",
"尾斗女危壁婁昴觜井柳張軫",
"箕牛虛室奎胃畢參鬼星翼角",
"斗女危壁婁昴觜井柳張軫亢",
"牛虛室奎胃畢參鬼星翼角氐",
"女危壁婁昴觜井柳張軫亢房",
"虛室奎胃畢參鬼星翼角氐心",
"危壁婁昴觜井柳張軫亢房尾"
];
const mod=(x,n)=>((x%n)+n)%n;
const calendar28=(month,day)=>lodges28[mod(2*(month-1)+(day-1),28)];
let checks=0;
function check(label,fn){fn();checks++;console.log("PASS "+label);}
check("Witness fixture shape 30 days x 12 months",()=>{
  assert.equal(rows.length,30);
  assert(rows.every(row=>[...row].length===12));
  assert.equal(lodges28.length,28);
  assert.equal(new Set(lodges28).size,28);
  assert.equal(lodges27.length,27);
});
let matched=0;
for(let d=1;d<=30;d++) for(let m=1;m<=12;m++){
  const actual=[...rows[d-1]][m-1];
  const derived=calendar28(m,d);
  assert.equal(derived,actual,`month ${m} day ${d}`);
  matched++;
}
check("First-day monthly step +2, 12/12",()=>{
 for(let m=1;m<=12;m++) assert.equal([...rows[0]][m-1],lodges28[mod(2*(m-1),28)]);
});
check("Each row month-to-month +2 within 28-cycle, 30x11",()=>{
 for(let d=0;d<30;d++)for(let m=0;m<11;m++){
  const prev=[...rows[d]][m], next=[...rows[d]][m+1];
  assert.equal(lodges28.indexOf(next), mod(lodges28.indexOf(prev)+2,28));
 }
});
check("Each month one day forward +1, 12x29",()=>{
 for(let m=0;m<12;m++)for(let d=0;d<29;d++){
  const prev=[...rows[d]][m],next=[...rows[d+1]][m];
  assert.equal(lodges28.indexOf(next),mod(lodges28.indexOf(prev)+1,28));
 }
});
check("Calendar return after 28 days: month 1 d1 = d29, d2 = d30",()=>{
 assert.equal(rows[0][0],rows[28][0]);
 assert.equal(rows[1][0],rows[29][0]);
 assert.notEqual(rows[0][0],rows[27][0]);
});
check("The calendar deliberately includes 牛 = Abhijit",()=>{
 assert.equal(calendar28(1,27),"牛");
 assert.equal(calendar28(1,28),"女");
 assert.equal(calendar28(1,29),"虛");
 assert.equal(rows[26][0],"牛");
 assert(!lodges27.includes("牛"));
});
check("27-place naive cyclic successor disagrees at Jan day 27/28/29",()=>{
 const naive27=(day)=>lodges27[mod(day-1,27)];
 assert.equal(naive27(27),"女");assert.equal(naive27(28),"虛");
 assert.notEqual(naive27(27),calendar28(1,27));
 assert.notEqual(naive27(28),calendar28(1,28));
});
check("The text's lunar birthday selector is 27-mod, not the 28-calendar table",()=>{
 // T1299/2: Feb 17 -> angle/角 15th, ordinal (17+13)%27=3 -> 氐.
 const index27=[..."星張翼軫角亢氐房心尾箕斗女虛危室壁奎婁胃昴畢觜參井鬼柳"];
 const ordinal=mod(17+12,27); // 0-based: 2 = third lodge from 角
 assert.equal(index27[mod(index27.indexOf("角")+ordinal,27)],"氐");
 assert.equal(calendar28(2,15),"翼"); // T1299/2 says 二月十五日是角日 in 27-host method.
 assert.equal(calendar28(2,17),"角"); // T1299/2 birth-lodge example computes 氐.
 assert.notEqual(calendar28(2,15),"角");
 assert.notEqual(calendar28(2,17),"氐");
});
check("Calendar expression is month/day keyed; not a physical ephemeris or stem-keyed star",()=>{
 assert.equal(calendar28(1,1),"虛");
 assert.equal(calendar28(12,30),"尾");
 assert.equal(2*(12-1)+(30-1),51);
});
console.log(`M10 RESULT ${matched}/${rows.length*12} source-fixture month/day cells; ${checks}/${checks} structural checks PASS; no year-stem carrier rule.`);
