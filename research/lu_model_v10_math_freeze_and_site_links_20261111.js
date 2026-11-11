"use strict";
/** 成熟化祿數學模型 V1.0：固定公設、十干驗算、十二錨負控與四化頁面連結。 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const stems = "甲乙丙丁戊己庚辛壬癸".split("");
const branches = "子丑寅卯辰巳午未申酉戌亥".split("");
const mod = (x,n) => (x % n + n) % n;
const base = ["天梁","天機","天同","太陰","貪狼","武曲","太陽","巨門","廉貞","破軍"];
const mature = ["廉貞","天機","天同","太陰","貪狼","武曲","太陽","巨門","天梁","破軍"];
const generate = (src) => {const r=[...src];[r[0],r[8]]=[r[8],r[0]];return r;};
const lu=generate(base);
assert.deepEqual(lu,mature);
assert.equal(base.filter((v,i)=>v===mature[i]).length,8);
assert.equal(new Set(lu).size,10);
assert.deepEqual(stems.map((_,i)=>stems[mod(2+2*(i%5),10)]),
["丙","戊","庚","壬","甲","丙","戊","庚","壬","甲"]);
const ctx={console:{log(){}},ziweiUI:{clearPalce(){}}};
ctx.globalThis=ctx;ctx.window=ctx;vm.createContext(ctx);
for(const name of ["assets/lunar.js","assets/ziweistar.js","assets/ziweicore.js"])
 vm.runInContext(fs.readFileSync(name,"utf8"),ctx,{filename:name});
function positions(anchor){
 const out={};
 ctx.Star_A14[anchor].forEach((ids,b)=>ids.forEach(id=>out[ctx.StarM_A14[id]]=b));
 assert.equal(Object.keys(out).length,14);
 return out;
}
const pairs=[[0,5],[1,6],[2,7],[3,8],[4,9]];
const expectC=["申","子","未","巳","寅"];
const expectD=[2,1,2,2,2];
const expectA=["廉貞","天機","天同","太陰","貪狼"];
const expectB=["武曲","太陽","巨門","天梁","破軍"];
let anchorShort=0,parityChecks=0;
for(let a=0;a<12;a++){
 const p=positions(a);
 const shape=[];
 for(let i=0;i<5;i++){
  const [g,h]=pairs[i],u=p[lu[g]],v=p[lu[h]];
  assert.equal(mod(u-v,2),0,stems[g]+stems[h]+" parity at "+branches[a]);
  parityChecks++;
  const possibilities=[];
  for(let c=0;c<12;c++)for(const d of [1,2])
   if((mod(c-d,12)===u&&mod(c+d,12)===v)||(mod(c-d,12)===v&&mod(c+d,12)===u))
    possibilities.push({center:branches[c],d});
  shape.push(possibilities.length===1?possibilities[0].d:null);
  if(a===2||a===8){assert.equal(possibilities.length,1);assert.equal(possibilities[0].d,expectD[i]);
    assert.equal(possibilities[0].center,branches[mod(branches.indexOf(expectC[i])+(a===8?6:0),12)]);}
 }
 if(shape.filter(x=>x===1).length===1&&shape.filter(x=>x===2).length===4)anchorShort++;
}
assert.equal(anchorShort,4);assert.equal(parityChecks,60);
const variant=generate(base.slice()); // 甲壬
assert.deepEqual(variant,lu);
const dingJi=[...base];[dingJi[3],dingJi[5]]=[dingJi[5],dingJi[3]];
assert.notDeepEqual(dingJi,mature);
const starsAtAnchor=positions(2);
for(let i=0;i<5;i++){
 assert.equal(lu[i],expectA[i]);assert.equal(lu[i+5],expectB[i]);
 assert.equal(mod(starsAtAnchor[lu[i]]-starsAtAnchor[lu[i+5]],2),0);
}
const dir="research/anxing-four-hua-v2";
const pages=["index.html","mature-hua-lu.html","quan-five-steps.html","mature-hua-ke.html","mature-hua-ji.html"];
for(const f of pages){
 const source=fs.readFileSync(path.join(dir,f),"utf8");
 for(const dest of pages)assert(source.includes('href="./'+dest+'"'),f+" missing "+dest);
 assert(source.includes("<nav"),f+" navigation missing");
 assert(source.includes("</html>"),f+" html incomplete");
}
console.log("化祿 V1.0：初表 8/10，甲壬互換 10/10，十星互異；五虎配對60/60；五中心寅申兩錨；四化五頁互連 25/25；±1/2形態僅4錨；PASS");
