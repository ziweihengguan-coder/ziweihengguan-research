"use strict";
/**
 * M07 original-text-anchored algorithm fingerprints in Buddhist astral works,
 * T1305-1311, esp. T1307/1308/1311.
 * Sources (manually transcribed, NOT automatically fetched):
 * https://tripitaka.zensoul.org/T/T1307/1
 * https://tripitaka.zensoul.org/T/T1308/1
 * https://tripitaka.zensoul.org/T/T1311/1
 * Assertions = arithmetic / fixture checks, NOT independent historic attestations.
 */
const assert=require("node:assert/strict");
let count=0;
function verify(name,run){run();count++;console.log("PASS "+name);}
const t1308 = [
 {index:1,n:"羅睺",planet:"羅睺",ausp:"凶"},
 {index:2,n:"鷄暖",planet:"土",ausp:"凶"},
 {index:3,n:"㗌",planet:"水",ausp:"吉"},
 {index:4,n:"那頡",planet:"金",ausp:"吉"},
 {index:5,n:"蜜",planet:"日",ausp:"吉"},
 {index:6,n:"雲漢",planet:"火",ausp:"大凶"},
 {index:7,n:"計都",planet:"計",ausp:"凶"},
 {index:8,n:"莫",planet:"月",ausp:"吉"},
 {index:9,n:"溫沒斯",planet:"木",ausp:"吉"},
];
// T1311 names have orthographic variants. Planet and numbered position are positive control.
const t1311=[
 ["羅睺","羅睺"],["鷄緩","土"],["嘀","水"],["那頡","金"],
 ["密","日"],["虛漢","火"],["計都","計"],["暮","月"],["嗢沒斯","木"]
];
verify("T1308 exactly 9 positions",()=>assert.equal(t1308.length,9));
verify("T1311 exactly 9 positions",()=>assert.equal(t1311.length,9));
verify("T1308 same nine planetary types without duplicates",()=>{
 assert.equal(new Set(t1308.map(x=>x.planet)).size,9);
});
for(let i=0;i<9;i++){
 verify("T1308 vs T1311 planetary carrier index "+(i+1),()=>
  assert.equal(t1308[i].planet,t1311[i][1]));
 verify("T1311 ordinal year residue "+(i+1),()=>{
   const age=i+1;
   const residues=[age,age+9,age+18,age+27,age+36,age+45,age+54];
   assert(residues.every(y=>(y-1)%9===i));
 });
}
const normalized=(age)=>((age-1)%9+9)%9;
verify("ages 1/10/19/91 share Rahu",()=>[1,10,19,91].forEach(a=>
 assert.equal(t1308[normalized(a)].planet,"羅睺")));
verify("ages 5/14/23/95 share Sun",()=>[5,14,23,95].forEach(a=>
 assert.equal(t1308[normalized(a)].planet,"日")));
verify("year 6 vs 7 returns 火 vs 計: no automatic identity",()=>{
 assert.equal(t1308[normalized(6)].planet,"火");
 assert.equal(t1308[normalized(7)].planet,"計");
});
verify("t1311 7th list omission of age 70 is textual lacuna candidate, not proof of period gap",()=>{
 const printed=[7,16,25,34,43,52,61,79,88,97];
 assert(printed.every(a=>normalized(a)===6));
 assert(!printed.includes(70));
 assert.equal(normalized(70),6);
});
const northNames=["貪狼","巨門","祿存","文曲","廉貞","武曲","破軍"];
const birthGroups=[
 ["子"],["丑","亥"],["寅","戌"],["卯","酉"],
 ["辰","申"],["巳","未"],["午"]
];
verify("T1307 maps 12 earthly branches to 7 Beidou labels",()=>{
 assert.equal(birthGroups.length,7);
 assert.equal(new Set(birthGroups.flat()).size,12);
 assert.equal(birthGroups.flat().length,12);
 assert.equal(northNames.length,7);
});
for(let i=0;i<7;i++){
 verify("T1307 group "+(i+1)+" branch count "+birthGroups[i].length,()=>
  assert.equal(birthGroups[i].length,(i===0||i===6)?1:2));
}
verify("Beidou grouping aliases lose 5 branch distinctions",()=>{
 assert.equal(12-birthGroups.length,5);
});
verify("T1311 book north names match T1306 seven labels in same order",()=>{
 const t1306=["貪狼","巨門","祿存","文曲","廉貞","武曲","破軍"];
 assert.deepEqual(t1306,northNames);
});
const zodiacA=["命","財","兄弟","田宅","男女","僮僕","妻妾","疾病","遷移","官位","福相","困窮"];
const zodiacB=["命","財","兄弟","田宅","男女","僮僕","夫妻","病厄","遷移","官位","福相","禍害"];
verify("T1308 initial table has 12 labels",()=>assert.equal(zodiacA.length,12));
verify("T1308 subsequent Sun/Moon interpretations have 12 labels",()=>assert.equal(zodiacB.length,12));
verify("T1308 source does not uniquely identify same last palace labels across the adjacent contexts",()=>{
 assert.equal(zodiacA[11],"困窮");
 assert.equal(zodiacB[11],"禍害");
 assert.notEqual(zodiacA[11],zodiacB[11]);
});
verify("T1308 provides nine exact label matches between adjacent contexts",()=>{
 assert.equal(zodiacA.filter((x,i)=>x===zodiacB[i]).length,9);
});
verify("T1308 4 sectors give 366, against 365.25 annual degree convention",()=>{
 const sectors=[75,98,80,113];
 assert.equal(sectors.reduce((s,x)=>s+x,0),366);
 assert.equal(sectors.reduce((s,x)=>s+x,0)-365.25,0.75);
});
verify("T1308 monthly moon degrees 30 * 13.25 = 397.5",()=>{
 assert.equal(30*13.25,397.5);
});
verify("9-year sequence cannot represent 10 distinct outputs without another key",()=>{
 assert.equal(new Set(Array.from({length:10},(_,i)=>normalized(i+1))).size,9);
});
verify("T1308 孤立「囚」 is 休廢囚死宿, not annual 化囚 caller",()=>{
 const c="若月至休、廢、囚、死宿";
 assert(c.includes("囚")&&!c.includes("化囚"));
});
console.log("M07 "+count+"/"+count+" manual-text-fixture and math checks PASS; no historical Hua-Ji remount found.");
