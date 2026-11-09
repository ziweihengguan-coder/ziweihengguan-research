"use strict";
/** M08: T1301 source-fixture tests with CBETA-based transcription.
 * Text source: CBETA 2026.R2 https://deerpark.app/cbeta/T1301
 * User's official entry: https://cbetaonline.dila.edu.tw/zh-tw/T1301
 * Fixtures manually transcribed; NOT automatically scraped CBETA or verified manuscripts.
 * Fail/contradiction flags are explicit, never auto-correct archetypes.
 */
const assert = require("node:assert/strict");
let n=0;function test(name,body){body();n++;console.log("PASS",name);}
const original28="名稱 長育 鹿首 生眚 增財 熾盛 不覲 土地 前德 北德 象 彩畫 善元 善挌 悅可 尊長 根元 前魚 北魚 無容 耳聰 貪財 百毒 前賢迹 北賢迹 流灌 馬師 長息".split(" ");
const details = [
 ["名稱",6,30],["長育",5,45],["鹿首",3,30],["生眚",1,15],
 ["增財",3,45],["熾盛",3,30],["不覲",5,30],
 ["土地",5,30],["前德",3,30],["北德",2,35],["象",5,30],
 ["彩畫",1,30],["善元",1,15],["善挌",2,45],
 // 悅可 listed among original 28; absent from 27 individually itemized subparagraphs.
 ["尊長",3,15],["根元",3,30],["前魚",4,15],
 ["北魚",4,45],["無容",3,6],["耳聰",3,30],
 ["貪財",4,30],["百毒",1,15],["前賢迹",2,30],
 ["北賢迹",2,35],["流灌",1,30],["馬師",3,30],["長息",5,30],
];
test("28 enumeration unique",()=>{assert.equal(original28.length,28);assert.equal(new Set(original28).size,28);});
test("individual listings contain only 27",()=>{assert.equal(details.length,27); assert.equal(new Set(details.map(x=>x[0])).size,27);});
test("exact missing record is 悅可",()=>assert.deepEqual(original28.filter(x=>!details.some(d=>d[0]===x)),["悅可"]));
test("no extraneous individual names after conservative variant unification",()=>assert.deepEqual(details.filter(d=>!original28.includes(d[0])),[]));
const quad=[details.slice(0,7),details.slice(7,14),details.slice(14,20),details.slice(20,27)];
test("declared four quarters are 7 + 7 + 7 + 7 but detailed blocks have 7/7/6/7",()=>{
 assert.deepEqual(quad.map(q=>q.length),[7,7,6,7]);
});
test("27 detailed lodges contain legal positive main star count",()=>assert(details.every(d=>Number.isInteger(d[1])&&d[1]>0)));
test("detailed travel-time frequencies",()=>{
 const actual={};for(const [name,star,duration] of details){actual[duration]=(actual[duration]||0)+1;}
 assert.deepEqual(actual,{6:1,15:5,30:15,35:2,45:4});
});
const summaryFortyFive="長育 增財 北德 善挌 北魚 北賢迹".split(" ");
const fifteen="生眚 前魚 善元 尊長 百毒".split(" ");
test("six-entry 45-su-yu summary contains six different names",()=>assert.equal(new Set(summaryFortyFive).size,6));
test("summary 45-su-yu vs details two explicit 35 exceptions",()=>{
 const mismatch=summaryFortyFive.filter(name=>details.find(d=>d[0]===name)?.[2]!==45);
 assert.deepEqual(mismatch,["北德","北賢迹"]);
});
test("five-entry 15-su-yu summary matches five detailed entries",()=>{
 assert.deepEqual([...fifteen].sort(),details.filter(x=>x[2]===15).map(x=>x[0]).sort());
});
test("single six-su-yu lodge 無容",()=>{
 assert.deepEqual(details.filter(x=>x[2]===6).map(x=>x[0]),["無容"]);
});
test("original summary 28 names maps to 6x45 +5x15 +1x6 +16x30",()=>{
 assert.equal(summaryFortyFive.length+fifteen.length+1+(28-6-5-1),28);
 assert.equal(6*45+5*15+1*6+16*30,831);
});
test("27 detailed values sum to 781 with missing 悅可, vs summary 831",()=>{
 assert.equal(details.reduce((s,x)=>s+x[2],0),781);
 assert.equal(831-781,50); // 30 expected absent entry and 20 two 35-vs-45 differences
});
test("if one supplied hypothetical 30 for missing 悅可, still 20-unit mismatch",()=>{
 const proposed=details.reduce((s,x)=>s+x[2],0)+30;
 assert.equal(831-proposed,20);
});
test("six 45 names only four actually 45, two 35",()=>{
 assert.equal(summaryFortyFive.filter(name=>details.find(d=>d[0]===name)[2]===45).length,4);
 assert.equal(summaryFortyFive.filter(name=>details.find(d=>d[0]===name)[2]===35).length,2);
});
const geo7 = ["微","阿耨","窓中塵","兔上塵","羊上塵","牛上塵","蟣","虱","麥","指節"];
test("9 consecutive factors 7 from 微 to 指節",()=>{
 assert.equal(geo7.length-1,9);
 assert.equal(7**9,40353607);
});
test("12指節=尺, 2尺=肘, 4肘=長弓",()=>{
 assert.equal(7**9 * 12 * 2 * 4,3873946272);
});
test("1000 bows equal one 聲, but text offers no explicit 聲→里 conversion",()=>{
 assert.equal(7**9*12*2*4*1000,3873946272000);
 const documented="千弓為一聲，三十里為一由旬";
 assert(!documented.includes("聲為一里")); // boundary: not infer 微/由旬
});
test("60節*12限*30須臾 = 21600節/day",()=>assert.equal(60*12*30,21600));
test("15眴*20卒*30時*30須臾 = 270000眴/day",()=>assert.equal(15*20*30*30,270000));
test("two different time microscales give rational ratio 12.5眴/節 (derived only)",()=>{
 assert.equal((15*20*30*30)/(60*12*30),12.5);
});
test("M01 12相*30度*60分 = 21600分/周天; number same, physical dimensions differ",()=>{
 assert.equal(12*30*60,21600);
});
test("T1301 no evident 10-stem or hua-qiu table in these tested text segments",()=>{
 const anchors=["六宿行四十五須臾","十五眴名曰為卒","七微為阿耨"];
 assert(!anchors.some(t=>/化囚|天元忌|生年化忌/.test(t)));
});
console.log("RESULT M08 "+n+"/"+n+" manually transcribed fixture and math assertions PASS; source anomalies flagged, not silently corrected.");
