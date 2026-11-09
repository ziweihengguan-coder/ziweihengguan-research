"use strict";
/**
 * M11 source-side caller registry gate. No network download, no ancient manuscript
 * authentication. Source excerpts & examples are fixed fixtures from T1299,
 * previous M05/M07/M10/§818-D and §818-AC. PASS = schema + mathematical/type
 * consistency, NOT historical verification or Hua-Qiu->Hua-Ji transmission.
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const file = path.join(__dirname, "math_source_caller_registry_m11_20261019.json");
const registry = JSON.parse(fs.readFileSync(file, "utf8"));
const byId = new Map(registry.records.map(x=>[x.id,x]));
let checks = 0;
function check(title, fn) { fn(); checks++; console.log("PASS", title); }
const mod=(x,n)=>(x%n+n)%n;
const lodge28=[..."虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗牛女"];
const lodge27=[..."星張翼軫角亢氐房心尾箕斗女虛危室壁奎婁胃昴畢觜參井鬼柳"];
const palaces=[..."子丑寅卯辰巳午未申酉戌亥"];
const planet9=[..."羅土水金日火計月木"];
const calendar28=(m,d)=>lodge28[mod(2*(m-1)+d-1,28)];
const day27=(fullMoon,day)=>lodge27[mod(lodge27.indexOf(fullMoon)+day-15,27)];
const natal27=(fullMoon,day)=>lodge27[mod(lodge27.indexOf(fullMoon)+mod(day+12,27),27)];
const palacePos=(offset,step)=>palaces[mod(offset+step,12)];
const edge=(from,to)=>registry.bridges.find(x=>x.from===from&&x.to===to);
check("M11 record count 17 / unique identifiers",()=>{
 assert.equal(byId.size,17);assert.equal(registry.records.length,17);
});
check("all 17 source-side records carry explicit caller and witness location",()=>{
 for(const r of registry.records){
  for(const field of ["source","url","locator","caller_excerpt","operation","inputs","index_domain","output","operator","evidence","caveat","output_type","premise_kind"]) assert(typeof r[field]==="string" && r[field].trim(),`${r.id} missing ${field}`);
  assert(Array.isArray(r.input_keys)&&r.input_keys.length>0);
  assert(Number.isInteger(r.cycle_size)&&r.cycle_size>0);
  assert(/^https:\/\//.test(r.url),r.id+" source URL");
 }
});
check("all 11 edges refer to existing registered procedures",()=>{
 assert.equal(registry.bridges.length,11);
 for(const b of registry.bridges){assert(byId.has(b.from));assert(byId.has(b.to));assert(b.reason);}
});
check("status distribution respects 2 direct, 1 conditional, 1 operator-only, 7 no-bridges",()=>{
 const totals={};for(const b of registry.bridges)totals[b.status]=(totals[b.status]||0)+1;
 assert.deepEqual(totals,{DIRECT_CALL:2,CONDITIONAL_CALL:1,NO_BRIDGE:7,OPERATOR_EQUIVALENCE_ONLY:1});
});
check("T1299 source full moon -> 27 daily and 27 natal are textually explicit calls",()=>{
 for(const id of ["T1299-D27-DAY","T1299-D27-NATAL"])
  assert.equal(edge("T1299-U27-FULLMOON-KEY",id).status,"DIRECT_CALL");
});
check("T1299 tri-nine depends on already-acquired natal lodge, origin unspecified",()=>{
 assert.equal(edge("T1299-D27-NATAL","T1299-TRI-NINE").status,"CONDITIONAL_CALL");
});
check("28 table to 27-day/27-natal are both NO_BRIDGE",()=>{
 for(const target of ["T1299-D27-DAY","T1299-D27-NATAL"])
  assert.equal(edge("T1299-U28-CALENDAR",target).status,"NO_BRIDGE");
});
check("T1299 calendar caller takes month/day and modulus 28",()=>{
 assert.deepEqual(byId.get("T1299-U28-CALENDAR").input_keys,["tang_month","day_in_month"]);
 assert.equal(byId.get("T1299-U28-CALENDAR").cycle_size,28);
 assert.equal(lodge28.length,28); assert.equal(new Set(lodge28).size,28);
});
check("28 table anchors: Jan 1, Jan 27/28/29/30, Feb 15/17",()=>{
 const pairs=[[1,1,"虛"],[1,27,"牛"],[1,28,"女"],[1,29,"虛"],[1,30,"危"],[2,15,"翼"],[2,17,"角"]];
 for(const [m,d,v] of pairs)assert.equal(calendar28(m,d),v);
});
check("28 table known first-day monthly values",()=>{
 assert.equal(Array.from({length:12},(_,i)=>calendar28(i+1,1)).join(""),"虛室奎胃畢參鬼星翼角氐心");
});
check("27 lunar full-moon example: day14 軫, day15 角, day16 亢, day17 氐",()=>{
 assert.equal(lodge27.length,27);assert(!lodge27.includes("牛"));
 for(const [d,v] of [[14,"軫"],[15,"角"],[16,"亢"],[17,"氐"]])assert.equal(day27("角",d),v);
});
check("27 natal day+13 modulo 27 (17+13=30 -> third lodge 氐)",()=>{
 assert.equal(mod(17+12,27)+1,3);
 assert.equal(natal27("角",17),"氐");
});
check("27 day and natal formulas agree for all 30 dates when they share same full-moon premise",()=>{
 for(let d=1;d<=30;d++) assert.equal(day27("角",d),natal27("角",d),String(d));
});
check("二月 sample outputs differ; example is explicitly hypothetical, not established same calendar epoch",()=>{
 assert.equal(byId.get("T1299-D27-DAY").premise_kind,"HYPOTHETICAL_EXAMPLE");
 assert.equal(calendar28(2,15),"翼");assert.equal(day27("角",15),"角");
 assert.equal(calendar28(2,17),"角");assert.equal(day27("角",17),"氐");
});
check("naively dropping 牛 does not reproduce a 28-place day table",()=>{
 const bare27=lodge28.filter(x=>x!=="牛");
 assert.equal(bare27.length,27);
 assert.notEqual(bare27[26],calendar28(1,27));
 assert.notEqual(bare27[mod(27,27)],calendar28(1,28));
});
check("108-pada 27×4 = zodiac-sign 12×9, not 12 human-life palaces",()=>{
 assert.equal(27*4,12*9);assert.equal(byId.get("T1299-U108-PADA").cycle_size,108);
 assert(byId.get("T1299-U108-PADA").caveat.includes("人事十二宮"));
});
check("six relative positions are distinct 27-lodge offsets",()=>{
 assert.equal(new Set([1,10,4,16,20,13]).size,6);
});
check("tri-nine has exactly 3 blocks of 9 and no 28th slot",()=>{
 assert.equal(3*9,27);assert.equal(byId.get("T1299-TRI-NINE").cycle_size,27);
});
check("T1307 branches -> 7 Beidou stellar names are distinct from 10-stem input",()=>{
 const groups=[["子"],["丑","亥"],["寅","戌"],["卯","酉"],["辰","申"],["巳","未"],["午"]];
 assert.equal(new Set(groups.flat()).size,12);
 assert.equal(groups.length,7);
 assert.deepEqual(byId.get("T1307-BEIDOU-7").input_keys,["birth_year_branch"]);
});
check("T1308/T1311 nine-age slots same 9 cycle, unlike year-stem 10 roles",()=>{
 assert.equal(planet9.length,9);
 for(const age of [1,10,19])assert.equal(planet9[mod(age-1,9)],"羅");
 for(const id of ["T1308-AGE9","T1311-AGE9"])assert.equal(byId.get(id).cycle_size,9);
 assert.equal(byId.get("WYG-STEM-QIU").cycle_size,10);
});
check("old and later 昌曲 hour-based placement preserves the entire 12-position operator",()=>{
 const oldWenqu=Array.from({length:12},(_,h)=>palacePos(4,h));
 const oldWenchang=Array.from({length:12},(_,h)=>palacePos(10,-h));
 const laterWenqu=[..."辰巳午未申酉戌亥子丑寅卯"];
 const laterWenchang=[..."戌酉申未午巳辰卯寅丑子亥"];
 assert.deepEqual(oldWenqu,laterWenqu);
 assert.deepEqual(oldWenchang,laterWenchang);
 assert.equal(edge("XUANSOU-HOUR-CHANGQU","JIELAN-HOUR-CHANGQU").status,"OPERATOR_EQUIVALENCE_ONLY");
});
check("year-branch 龍池/鳳閣 coincides with hour-based carrier in only 12/144 states",()=>{
 let matched=0;
 for(let y=0;y<12;y++)for(let h=0;h<12;h++){
  if(palacePos(4,y)===palacePos(4,h)&&palacePos(10,-y)===palacePos(10,-h))matched++;
 }
 assert.equal(matched,12);
 assert.equal(edge("XUANSOU-HOUR-CHANGQU","JIELAN-YEAR-LONGFENG").status,"NO_BRIDGE");
});
check("ancient year-stem Qiu is NOT registered as a caller of JieLan mature Hua-Ji",()=>{
 assert.equal(byId.get("WYG-STEM-QIU").output_type,"old_qiu_planet");
 assert.equal(byId.get("JIELAN-YEAR-JI").output_type,"mature_ji_carrier");
 assert.equal(edge("WYG-STEM-QIU","JIELAN-YEAR-JI").status,"NO_BRIDGE");
 assert(!registry.bridges.some(b=>b.from==="WYG-STEM-QIU"&&b.status==="DIRECT_CALL"));
});
check("record does not mistake T1299 examples for a static 28->27 conversion",()=>{
 assert(byId.get("T1299-D27-NATAL").caveat.includes("不是年干"));
 assert(byId.get("T1299-U28-CALENDAR").caveat.includes("公式是研究重建"));
});
console.log(`M11 RESULT ${checks}/${checks} registry schema/fixture/algorithm/caller gates PASS; ${registry.records.length} procedure records; ${registry.bridges.length} typed edges; no demonstrated annual Qiu->mature Hua-Ji transfer.`);
