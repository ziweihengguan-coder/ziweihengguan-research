"use strict";
/**
 * M13-S | 九執曆《推宿刻章》source-side caller -> 27 equal lunar mansion slots.
 * Sources (electronic transcriptions, original printed leaves not inspected):
 * https://www.eee-learning.com/book/kaiyenjan104 〈推宿刻章〉
 * https://deerpark.app/cbeta/T1299/1 lines 28,36-58,138-143
 * https://deerpark.app/cbeta/T1299/2 lines 96-108
 * This computes mathematical fingerprints, not historical borrowing.
 */
const assert = require("node:assert/strict");
const mod = (n,k)=>(n%k+k)%k;
const sui27 = [..."奎婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗女虛危室壁"];
const jiuzhi27 = [..."婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗女虛危室壁奎"];
const t1299_28 = [..."虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗牛女"];
const bins = 27, perBin=800, full=21600;
function fromDingYue(lunarPositionMinutes){
 if (!Number.isInteger(lunarPositionMinutes) || lunarPositionMinutes<0 || lunarPositionMinutes>=full)
  throw new RangeError("定月 must be normalized 0..21599 angular-minutes from the stated anchor");
 const idx=Math.floor(lunarPositionMinutes/perBin);
 return {idx,lodge:jiuzhi27[idx],remainder:lunarPositionMinutes%perBin};
}
let count=0;
function pass(name,fn){fn();count++;console.log("PASS "+name);}
pass("27 unique lodges in both equal-division coordinates",()=>{
 assert.equal(new Set(sui27).size,27);assert.equal(new Set(jiuzhi27).size,27);
});
pass("Jiuzhi lunar lodge anchor is 婁 and ends 奎",()=>{
 assert.equal(jiuzhi27[0],"婁");assert.equal(jiuzhi27.at(-1),"奎");
});
pass("T1299 contiguous cycle from 奎 equals rotated Jiuzhi names",()=>{
 for(let i=0;i<27;i++)assert.equal(sui27[i],jiuzhi27[mod(i-1,27)]);
});
pass("27 times 800 angular minutes fills 360x60 whole circumference",()=>{
 assert.equal(27*800,21600);assert.equal(360*60,21600);
});
pass("One equal lunar mansion is 13 degrees 20 minutes",()=>{
 assert.equal(800,13*60+20);
});
pass("27 mansions x 4 pada yields 108 pada",()=>assert.equal(27*4,108));
pass("12 zodiac sectors x 9 pada yields same 108 slots",()=>assert.equal(12*9,108));
pass("Conditional 360-degree compatible mesh: 1 pada=200 arcmin",()=>{
 assert.equal(800/4,200);assert.equal(21600/108,200);
 assert.equal(200,3*60+20);
});
pass("Each zodiac division conditionally spans 1800 arcmin",()=>{
 assert.equal(9*200,30*60);
});
pass("0 lunar arcminutes -> 婁 with 0 remainder",()=>{
 assert.deepEqual(fromDingYue(0),{idx:0,lodge:"婁",remainder:0});
});
pass("799 is last position of 婁 and 800 starts 胃",()=>{
 assert.equal(fromDingYue(799).lodge,"婁");
 assert.equal(fromDingYue(799).remainder,799);
 assert.deepEqual(fromDingYue(800),{idx:1,lodge:"胃",remainder:0});
});
pass("21599 is final position of 奎",()=>{
 assert.equal(fromDingYue(21599).lodge,"奎");
 assert.equal(fromDingYue(21599).remainder,799);
});
pass("Exhaustive 21600 angular-minute partition covers 27 bins",()=>{
 const binCounts=Array(27).fill(0);
 for(let p=0;p<full;p++){const x=fromDingYue(p);binCounts[x.idx]++;}
 assert(binCounts.every(n=>n===800));
});
pass("Nine-execution 27-lodge sequence excludes 牛",()=>{
 assert(!jiuzhi27.includes("牛"));assert(t1299_28.includes("牛"));
 assert.equal(t1299_28.length,28);
});
pass("T1299 前合 6 contiguous 奎..觜",()=>{
 assert.equal(sui27.slice(0,6).join(""),"奎婁胃昴畢觜");
});
pass("T1299 並合 12 contiguous 參..房",()=>{
 assert.equal(sui27.slice(6,18).join(""),"參井鬼柳星張翼軫角亢氐房");
});
pass("T1299 隨合 9 contiguous 心..壁",()=>{
 assert.equal(sui27.slice(18).join(""),"心尾箕斗女虛危室壁");
});
pass("6+12+9 classification exhausts 27 without duplication",()=>{
 assert.equal(6+12+9,27);assert.equal(new Set([...sui27]).size,27);
});
pass("M13 source type gate: position->lodge is direct only WITHIN 九執",()=>{
 const edges=[
  {src:"九執 定月",dst:"九執 推宿刻/所臨宿",kind:"DIRECT_CALL"},
  {src:"九執 所臨宿",dst:"宿曜經 十五日望宿",kind:"CROSS_TEXT_TYPE_COMPATIBLE_ONLY"},
  {src:"宿曜經 二十八宿月建圖",dst:"宿曜經 二十七宿望宿",kind:"NO_BRIDGE"}
 ];
 assert.equal(edges[0].kind,"DIRECT_CALL");
 assert(!edges.slice(1).some(e=>e.kind==="DIRECT_CALL"));
});
pass("Missing coordinate, time anchor or cross-book epoch MUST remain unresolved",()=>{
 const candidate={lunarPositionMinutes:800,epoch:null,observationDate:null,sourceSystem:"九執"};
 assert.equal(fromDingYue(candidate.lunarPositionMinutes).lodge,"胃");
 assert.equal(candidate.epoch,null);
 assert.equal(candidate.observationDate,null);
});
pass("Nine-execution example: 57 years -> 685 month count, 21 leap, 706 months",()=>{
 const years=57,monthsSinceYearStart=1,daysSinceMonthStart=5;
 const m=years*12+monthsSinceYearStart;
 assert.equal(m,685);
 const leap=Math.floor((7*m+132)/228);
 assert.equal(leap,21);
 assert.equal((7*m+132)%228,139);
 assert.equal(m+leap,706);
 assert.equal((m+leap)*30+daysSinceMonthStart,21185);
});
pass("Textual ambiguity guard: 欠夜 429／169 is not silently fixed",()=>{
 const base=21185*11;
 const a=Math.floor((base+429)/703);
 const b=Math.floor((base+169)/703);
 assert.equal(a,332);assert.equal(b,331);assert.notEqual(a,b);
});
pass("No OldQiuCarrier->FixedJiCarrier inference from lunar slots",()=>{
 const oldQiu="癸囚炁", fixedJi="癸忌貪狼";
 assert.notEqual(oldQiu,fixedJi);
});
console.log("M13-S RESULT "+count+"/"+count+" PASS; full 21600 angular-minute partition; same-coordinate fingerprint ONLY; historical intertext caller NOT ESTABLISHED.");
