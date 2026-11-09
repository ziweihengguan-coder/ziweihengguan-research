"use strict";
/**
 * M14-S | 九執曆校小月/欠夜常數的條件式敏感度負控。
 * NOTE: 429 vs 169 vs 160 are investigative READINGS, NOT a confirmed
 * reconstruction of the ambiguous electronic text's syntax.
 * Source witness: https://www.eee-learning.com/book/kaiyenjan104
 * 2026 critical study: https://zgks.cbpt.cnki.net/portal/journal/portal/client/paper/f37028440ae01a5375a8b2c50a5ad64a
 * Manuscript leaves/full journal PDF NOT inspected. Tests are math, not history.
 */
const assert=require("node:assert/strict");
const gcd=(a,b)=>b===0?a:gcd(b,a%b);
function omission(n,c){
  assert(Number.isInteger(n)&&n>=0);
  assert(Number.isInteger(c)&&c>=0&&c<703);
  return {count:Math.floor((11*n+c)/703),remainder:(11*n+c)%703};
}
const corrected=(n,c)=>n-omission(n,c).count;
let passed=0;
function test(name,fn){fn();passed++;console.log("PASS "+name);}
test("M13-S previous example: 57 elapsed years",()=>assert.equal(714-657,57));
test("57*12+one elapsed month =685",()=>assert.equal(57*12+1,685));
test("leap month 21, remainder 139",()=>{
 const num=7*685+132;
 assert.equal(Math.floor(num/228),21);
 assert.equal(num%228,139);
});
test("months with intercalations =706",()=>assert.equal(685+21,706));
test("uncorrected thirty-day slots =21185",()=>assert.equal(706*30+5,21185));
test("169 conditional option -> 331 omissions, remainder 511",()=>assert.deepEqual(omission(21185,169),{count:331,remainder:511}));
test("429 conditional option -> 332 omissions, remainder 68",()=>assert.deepEqual(omission(21185,429),{count:332,remainder:68}));
test("169 conditional corrected n=20854",()=>assert.equal(corrected(21185,169),20854));
test("429 conditional corrected n=20853",()=>assert.equal(corrected(21185,429),20853));
test("example 169 and 429 differ exactly one day",()=>assert.equal(corrected(21185,169)-corrected(21185,429),1));
test("example modulo-7 changes by one",()=>assert.deepEqual([corrected(21185,169)%7,corrected(21185,429)%7],[1,0]));
test("example modulo-60 changes by one",()=>assert.deepEqual([corrected(21185,169)%60,corrected(21185,429)%60],[34,33]));
test("11 and 703 coprime",()=>assert.equal(gcd(11,703),1));
test("703 tithi slots produce exactly 11 omissions in recurrence",()=>{
 for(const c of [160,169,429])for(const n of [0,1,21185,50000]){
  assert.equal(omission(n+703,c).count-omission(n,c).count,11);
  assert.equal(corrected(n+703,c)-corrected(n,c),692);
 }
});
test("429 versus 169 sensitivity is always 0 or 1 omission",()=>{
 for(let n=0;n<703;n++){
   const delta=omission(n,429).count-omission(n,169).count;
   assert(delta===0||delta===1);
 }
});
test("exact 703-input period has 260 differing slots for 429 vs 169",()=>{
 let diffs=0;
 for(let n=0;n<703;n++)diffs+=omission(n,429).count-omission(n,169).count;
 assert.equal(diffs,260);
});
test("exact 703-input period has 443 matching slots for 429 vs169",()=>{
 let same=0;
 for(let n=0;n<703;n++)same+=Number(omission(n,429).count===omission(n,169).count);
 assert.equal(same,443);
});
test("arithmetic-only 160 versus 169 yields 9 differing inputs per 703",()=>{
 let diffs=0;
 for(let n=0;n<703;n++) diffs+=omission(n,169).count-omission(n,160).count;
 assert.equal(diffs,9);
});
test("last eight example inputs preserve 0<=remainder<703",()=>{
 for(let n=21180;n<21188;n++)for(const c of [160,169,429]){
  const {remainder}=omission(n,c);
  assert(remainder>=0&&remainder<703);
 }
});
test("literal text 429 / 169 has not been syntactically resolved",()=>{
 const provenance={candidateConstants:[429,169],reconstructedSyntax:null,originalScanChecked:false};
 assert.equal(provenance.reconstructedSyntax,null);
 assert.equal(provenance.originalScanChecked,false);
});
test("scholarly 160加 vs169 variant not assumed same token slot without page",()=>{
 const editionVariant={readingA:"一百六十加",readingB:"一百六十九",sameSpecificLocusVerified:false};
 assert.equal(editionVariant.sameSpecificLocusVerified,false);
});
test("source and clock epoch cannot be inferred from day integer",()=>{
 const context={offsetDay:20854,epochLongitude:null,observationTime:null,dateAnchor:null};
 assert.equal(context.epochLongitude,null);
 assert.equal(context.observationTime,null);
 assert.equal(context.dateAnchor,null);
});
test("the numerical variant cannot establish a cross-text caller",()=>{
 const edges=[
  {source:"九執曆 積日",dest:"九執曆 中月",type:"PENDING_NUMERIC_CHAIN"},
  {source:"九執曆 宿位",dest:"T1299十五日望宿",type:"CROSS_TEXT_TYPE_COMPATIBLE_ONLY"},
  {source:"T1299 月建二十八宿",dest:"T1299 月望二十七宿",type:"NO_BRIDGE"},
  {source:"年干化囚炁",dest:"成熟貪狼化忌",type:"NO_BRIDGE"}
 ];
 assert.equal(edges.filter(e=>e.type==="DIRECT_CALL").length,0);
});
console.log("M14-S RESULT "+passed+"/"+passed+" PASS; 703-residue sensitivity only; manuscript syntax, full date chain and cross-book borrowing remain OPEN.");
