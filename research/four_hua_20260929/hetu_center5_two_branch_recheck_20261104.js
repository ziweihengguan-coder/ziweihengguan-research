"use strict";
// 2026-11-04 — Independent recheck of the specific 中五/生剋 hypothesis.
// Diagnostic only; this is retrospective, not a blind historical discovery.
// No project DB or production files are read or modified.
const assert = require("node:assert/strict");
const stems = [..."甲乙丙丁戊己庚辛壬癸"];
const hua = ["祿","權","科","忌"];
const stemElements = ["木","木","火","火","土","土","金","金","水","水"];
const huaNumbers = {忌:1,權:2,科:3,祿:4};
const huaElements = {忌:"水",權:"火",科:"木",祿:"金"};
const elements = {武曲:"金",紫微:"土",文昌:"金",天機:"木",右弼:"水",天梁:"土",天府:"土",文曲:"水",左輔:"土",太陰:"水",天同:"水",廉貞:"火",太陽:"火",巨門:"水",貪狼:"木",破軍:"水",天相:"水"};
const canonical = [
 ["廉貞","破軍","武曲","太陽"],
 ["天機","天梁","紫微","太陰"],
 ["天同","天機","文昌","廉貞"],
 ["太陰","天同","天機","巨門"],
 ["貪狼","太陰","右弼","天機"],
 ["武曲","貪狼","天梁","文曲"],
 ["太陽","武曲","太陰","天同"],
 ["巨門","太陽","文曲","文昌"],
 ["天梁","紫微","左輔","武曲"],
 ["破軍","巨門","太陰","貪狼"]
];
const variants = {
 "G0R0 庚太陰科 壬左輔科": canonical,
 "G1R1 庚天同科 壬天府科": canonical.map((r,i)=>i===6?r.map((v,j)=>j===2?"天同":v):i===8?r.map((v,j)=>j===2?"天府":v):r)
};
assert.equal(huaNumbers.科 + huaNumbers.權,5);
assert.equal(huaNumbers.祿 + huaNumbers.忌,5);
const sheng = {木:"火",火:"土",土:"金",金:"水",水:"木"};
const ke = {木:"土",土:"水",水:"火",火:"金",金:"木"};
assert.equal(sheng[huaElements.權],"土"); // 火生土
assert.equal(ke[huaElements.科],"土");    // 木克土
assert.equal(sheng["土"],huaElements.祿);
assert.equal(ke["土"],huaElements.忌);
const starBuckets = Object.fromEntries(["水","火","木","金","土"].map(e=>[e,Object.keys(elements).filter(s=>elements[s]===e)]));
function evaluate(rows) {
 let fixedRoleMatches=0, uniqueWithCorrectElement=0;
 const byHua=Object.fromEntries(hua.map(h=>[h,0]));
 const stemPairs=[];
 for(let i=0;i<10;i+=2){
   const differentPerHua=hua.map((h,j)=>rows[i][j]!==rows[i+1][j]);
   // A mapping f(天干五行, 四化) gives the same output for the two stems,
   // so each unequal pair can have at most one correct star in that slot.
   const upperBound=hua.reduce((n,h,j)=>n+(differentPerHua[j]?1:2),0);
   stemPairs.push({stems:stems[i]+stems[i+1],stemElement:stemElements[i],differentPerHua,elementOnlyMaxExactStar:upperBound});
 }
 const details=[];
 for(let i=0;i<10;i++){
   const matches=[];
   for(let j=0;j<4;j++){
     const star=rows[i][j], h=hua[j], element=elements[star];
     assert.ok(element,"missing element: "+star);
     const match=element===huaElements[h];
     matches.push(match);
     if(match){ fixedRoleMatches++; byHua[h]++; }
     if(starBuckets[element].length===1) uniqueWithCorrectElement++;
   }
   details.push({stem:stems[i],stemElement:stemElements[i],fixedRoleMatches:matches.filter(Boolean).length,matches});
 }
 return {fixedRoleStarElementMatches:fixedRoleMatches,total:40,byHua,allFourMatchStems:details.filter(d=>d.fixedRoleMatches===4).map(d=>d.stem),stemElementsOnlyMaxExactNamedStars:stemPairs.reduce((n,p)=>n+p.elementOnlyMaxExactStar,0),stemPairs,uniqueStarSlotsEvenIfCorrectTargetElementIsGiven:uniqueWithCorrectElement,details};
}
const tests=Object.fromEntries(Object.entries(variants).map(([name,rows])=>[name,evaluate(rows)]));
assert.equal(tests["G0R0 庚太陰科 壬左輔科"].fixedRoleStarElementMatches,7);
assert.equal(tests["G1R1 庚天同科 壬天府科"].fixedRoleStarElementMatches,7);
for(const t of Object.values(tests)){
 assert.equal(t.stemElementsOnlyMaxExactNamedStars,20);
 assert.equal(t.uniqueStarSlotsEvenIfCorrectTargetElementIsGiven,0);
 assert.equal(t.allFourMatchStems.length,0);
}
console.log(JSON.stringify({
 experiment:"20261104_center5_two_branch_recheck_v1",
 source:"local existing 10-stem table; retroactive evaluation; same declared 17-star element inventory as October blind-carrier audit",
 fixedRules:{
  codes:huaNumbers,
  center5Inputs:"科3(木) 克入土; 權2(火) 生入土",
  center5Outputs:"土生祿4(金); 土克忌1(水)",
  ambiguity:"The two output branches require a predetermined selector; sum=5 does not choose one.",
  effectOnTenStems:"All ten stems have the same four Hua roles, so code-level 40/40 is a tautology, not prediction of named stars."
 },
 tests,
 conclusions:[
  "Central-five generates the four label/element roles, not the named carrier stars.",
  "If only stem 五行 and Hua role are used, same-element stem pairs are indistinguishable: the maximal possible exact named-star hits are 20/40, even with an oracle-chosen per-pair output.",
  "Adding stem parity differentiates the two stems but still cannot disambiguate same-element stars without an independent star-specific selector.",
  "These results constrain this feature family only, and do not refute all historical or combinatorial routes."
 ]},null,2));
