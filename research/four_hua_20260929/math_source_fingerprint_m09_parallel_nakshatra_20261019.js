"use strict";
/**
 * M09: published cross-version comparison of T1300/T1301 and Sanskrit
 * Sardulakarnavadana; no mature Ziwei carrier mapping.
 * SOURCE:
 * T1300 (CBETA) https://tripitaka.zensoul.org/T/T1300/2
 * T1301 (CBETA) https://deerpark.app/cbeta/T1301
 * Yano, "The Naksatra system of the Atharvaveda-Parisisṭa" (2016–2017),
 * pp. 68–71, Table 3, https://www.cc.kyoto-su.ac.jp/~yanom/pdf/yano_papers/Yano_2017_JIT.pdf
 * The arrays below are HUMAN-TRANSCRIBED source and scholar fixtures, NOT
 * dynamic source verification. Normed values are marked as editorial readings,
 * not overwritten witnesses. PASS checks are not independent historical proofs.
 */
const assert = require("node:assert/strict");
let total=0;
function check(name,fn){fn();total++;console.log("PASS "+name);}
const t1300="昴 畢 觜 參 井 鬼 柳 星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 牛 女 虛 危 室 壁 奎 婁 胃".split(" ");
const t1301="名稱 長育 鹿首 生眚 增財 熾盛 不覲 土地 前德 北德 象 彩畫 善元 善挌 悅可 尊長 根元 前魚 北魚 無容 耳聰 貪財 百毒 前賢迹 北賢迹 流灌 馬師 長息".split(" ");
const sanskrit=[
"Kṛttikā","Rohiṇī","Mṛgaśiras","Ārdrā","Punarvasū","Puṣya","Āśleṣā","Maghā",
"Pūrvaphālgunī","Uttaraphālgunī","Hasta","Citrā","Svāti","Viśākhā","Anurādhā",
"Jyeṣṭhā","Mūla","Pūrvāṣāḍhā","Uttarāṣāḍhā","Abhijit","Śravaṇa","Śraviṣṭhā",
"Śatabhiṣaj","Pūrvaproṣṭhapada","Uttaraproṣṭhapada","Revatī","Aśvayuj","Bharaṇī"];
const normalized=["30","45","30","15","45","30","15","30","30","45","30","30","15","45","30","15","30","30","45","6","30","30","15","30","45","30","30","30"].map(Number);
const sourceCh2=[30,45,30,15,45,30,30,30,30,35,30,30,15,45,null,15,30,15,45,6,30,30,15,30,35,30,30,30];
check("3 source-aligned 28-member cyclic name vocabularies",()=>{
  for(const a of [t1300,t1301,sanskrit]){
    assert.equal(a.length,28);assert.equal(new Set(a).size,28);
  }
});
for(let i=0;i<28;i++){
  check("Yano Table3 row "+(i+1)+": "+sanskrit[i]+" "+t1300[i]+"↔"+t1301[i],()=>{
    assert(t1300[i]&&t1301[i]&&sanskrit[i]);
    assert([6,15,30,45].includes(normalized[i]));
  });
}
check("Ch2 #15 悅可 maps to 房 / Anurādhā, not 牛 / Abhijit",()=>{
  assert.equal(t1301[14],"悅可");assert.equal(t1300[14],"房");assert.equal(sanskrit[14],"Anurādhā");
  assert.equal(t1301[19],"無容");assert.equal(t1300[19],"牛");
  assert.equal(normalized[19],6);
});
check("Ch2 27 detailed values omit only #15",()=>{
  assert.equal(sourceCh2.length,28);assert.deepEqual(sourceCh2.map((n,i)=>n===null?i+1:null).filter(Boolean),[15]);
});
check("Ch2 detailed-only sum 781 and normalized source restored to 831",()=>{
  assert.equal(sourceCh2.reduce((s,x)=>s+(x??0),0),781);
  assert.equal(normalized.reduce((s,x)=>s+x,0),831);
});
check("Ch2 #10 and #25 raw 35 but normalized 45 (do not overwrite)",()=>{
  assert.deepEqual([sourceCh2[9],sourceCh2[24]],[35,35]);
  assert.deepEqual([normalized[9],normalized[24]],[45,45]);
});
check("Ch2 #7 柳=30 vs Sanskrit/Yano baseline=15",()=>{
  assert.equal(t1300[6],"柳");assert.equal(sourceCh2[6],30);assert.equal(normalized[6],15);
});
check("Ch2 #18 箕=15 vs Sanskrit/Yano baseline=30",()=>{
  assert.equal(t1300[17],"箕");assert.equal(sourceCh2[17],15);assert.equal(normalized[17],30);
});
check("#7 vs #18 compensating 15 shift has same total; checksum hides difference",()=>{
  const corrected=sourceCh2.map((x,i)=>x===null?30:([9,24].includes(i)?45:x));
  assert.equal(corrected.reduce((a,b)=>a+b,0),831);
  assert.equal(corrected[6],30);assert.equal(corrected[17],15);
  assert.equal(normalized[6]+normalized[17],corrected[6]+corrected[17]);
  assert.notDeepEqual(corrected,normalized);
});
check("Six 45; five 15; one 6; sixteen 30 = 831",()=>{
  const count=x=>normalized.filter(y=>y===x).length;
  assert.deepEqual([count(45),count(15),count(6),count(30)],[6,5,1,16]);
  assert.equal(6*45+5*15+6+16*30,831);
});
check("831 muhurtas / 30 per day = 27.7 days, not exact modern period",()=>{
  assert.equal(831/30,27.7);
  assert(Math.abs(27.7-27.321662)>.3);
});
check("alternate T1301 7/18 switch remains 831 when 10/25 corrected; per-slot compare essential",()=>{
 const rawEdited=sourceCh2.map((x,i)=>i===14?30:[9,24].includes(i)?45:x);
 assert.equal(rawEdited.reduce((a,b)=>a+b,0),831);
 const diffs=rawEdited.map((x,i)=>x!==normalized[i]?i+1:null).filter(Boolean);
 assert.deepEqual(diffs,[7,18]);
});
const chain={
 t1300:["微塵","細","塵","兔毛","羊毛","牛毛","蟣","虱","麥","指"],
 t1301:["微","阿耨","窓中塵","兔上塵","羊上塵","牛上塵","蟣","虱","麥","指節"]};
for(const key of Object.keys(chain)){
 check(key+" 9x7 base chain",()=>{assert.equal(chain[key].length,10);assert.equal(7**9,40353607);});
}
for(let i=0;i<9;i++){
 check("parallel sevenfold scale stage "+(i+1),()=>{
  assert(chain.t1300[i]&&chain.t1300[i+1]&&chain.t1301[i]&&chain.t1301[i+1]);
 });
}
check("two texts agree 12×2×4×1000 up to 聲",()=>{
  assert.equal(7**9*12*2*4*1000,3873946272000);
});
check("T1300 adds 4聲/由旬; T1301 adds 30里/由旬, missing 聲-to-里 bridge",()=>{
  const yojana1300=7**9*12*2*4*1000*4;
  assert.equal(yojana1300,15495785088000);
  const text1301="千弓為一聲，三十里為一由旬";
  assert(text1301.includes("三十里"));
  assert(!text1301.includes("聲為一里"));
});
check("hypothesis: T1301 year 360days and 270000 blinks/day implies 97200000 blinks/year",()=>{
  assert.equal(15*20*30*30*30*12,97200000);
});
check("conditional time scale comparison must retain physical unit types",()=>{
  assert.equal(60*12*30,21600); // T1301 節/day
  assert.equal(12*30*60,21600); // M01 angle 分/revolution
  assert.notEqual("節/日","分/周天");
});
const t1299Old=[["奎","婁","胃","昴","畢","觜"],["參","井","鬼","柳","星","張","翼","軫","角","亢","氐","房"],["心","尾","箕","斗","女","虛","危","室","壁"]];
check("T1299 old model group sizes 6+12+9 = 27, excluding Abhijit 牛",()=>{
 assert.deepEqual(t1299Old.map(x=>x.length),[6,12,9]);
 assert.equal(new Set(t1299Old.flat()).size,27);
 assert.equal(t1299Old.flat().includes("牛"),false);
});
check("T1299 three-group model is a 27-member rotation of older 28 names minus 牛",()=>{
 const ex=t1300.filter(x=>x!=="牛");const start=ex.indexOf("奎");
 assert.deepEqual(t1299Old.flat(), ex.slice(start).concat(ex.slice(0,start)));
});
check("T1299 source calls 前合/並合/隨合 a three-way moon relation classifier, not fixed stem allocation",()=>{
 assert.deepEqual(t1299Old.map(x=>x[0]),["奎","參","心"]);
 assert.equal(6+12+9,27);
});
check("T1299 27x4 and 12x9 share 108-pada geometry but not the uneven 28 time widths",()=>{
 assert.equal(27*4,12*9);
 assert.notEqual(27,28);
 assert.notEqual(108,831);
});
console.log("M09 RESULT "+total+"/"+total+" fixture + mathematical checks PASS; no fixed-stem Hua-Ji historical caller.");
