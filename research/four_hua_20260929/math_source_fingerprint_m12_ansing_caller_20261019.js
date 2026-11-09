"use strict";
/**
 * M12 source-side caller audit. Read-only checks against manually fixed snippets
 * and local transcription. PASS means schema/logic/typed-negative-gates passed,
 * never "independent historical witness" or recovered annual Qiu→Ji formula.
 * Do not silently mend the suspected missing 申 in XuanSou's forward count.
 */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const dir = __dirname;
const root = path.resolve(dir, "../..");
const reg = JSON.parse(fs.readFileSync(path.join(dir, "math_source_caller_registry_m12_20261019.json"), "utf8"));
const m11 = JSON.parse(fs.readFileSync(path.join(dir, "math_source_caller_registry_m11_20261019.json"), "utf8"));
const xuansou = fs.readFileSync(path.join(root, "玄藪_中天太極紫微數秘訣_網路轉錄校勘版.txt"), "utf8");
const zws = fs.readFileSync(path.join(dir, "transcriptions", "乙亥字紫微數_關鍵表與星義_人工校讀.txt"), "utf8");
const palaces = [..."子丑寅卯辰巳午未申酉戌亥"];
const stems = [..."甲乙丙丁戊己庚辛壬癸"];
const locLu = [..."寅卯巳午巳午申酉亥子"]; // JieLan direct table; XuanSou quotes 甲、乙 only
const index = (s) => {const i=palaces.indexOf(s); assert(i>=0, "unknown palace: "+s); return i;};
const move=(p,steps)=>palaces[((index(p)+steps)%12+12)%12];
const lu=(g)=>locLu[stems.indexOf(g)];
const yang=(p)=>move(p,1), tuo=(p)=>move(p,-1);
const xuLeft=(m)=>move("辰",m-1), xuRight=(m)=>move("戌",-(m-1));
const xuSantai=(m,d)=>move("辰",(m-1)+(d-1));
const xuBazuo=(m,d)=>move("戌",-(m-1)-(d-1));
const jlSantai=(m,d)=>move(xuLeft(m),d-1);
const jlBazuo=(m,d)=>move(xuRight(m),-(d-1));
const byId = new Map(reg.records.map(x=>[x.id,x]));
const edge=(a,b)=>reg.bridges.find(e=>e.from===a && e.to===b);
const insist=(a,b,status)=>assert.equal(edge(a,b)?.status,status,"typed edge "+a+" -> "+b);
let checks=0;
function check(name,fn) { fn(); checks++; console.log("PASS",String(checks).padStart(2,"0"),name); }

check("module, date, M11 read-only extension",()=>{
 assert.equal(reg.module,"M12_ZIWEI_ANSING_SOURCE_CALLER_AUDIT");
 assert.equal(reg.date,"2026-10-19");
 assert(reg.extends.includes("m11"));
});
check("17 distinct procedure cards",()=>{assert.equal(reg.records.length,17);assert.equal(byId.size,17);});
check("17 typed relationships, no duplicate ordered pairs",()=>{
 assert.equal(reg.bridges.length,17);
 assert.equal(new Set(reg.bridges.map(x=>x.from+"|"+x.to)).size,17);
 for(const e of reg.bridges) { assert(byId.has(e.from));assert(byId.has(e.to));assert(e.reason.length>10); }
});
check("procedure cards give identifiable source, witness, literal excerpt and input/output types",()=>{
 for(const r of reg.records) {
  for(const field of ["source","url","local_path","locator","quote","output_type","operation","witness","caveat"]) assert(typeof r[field]==="string" && r[field].length>4,r.id+" "+field);
  assert(r.url.startsWith("https://"));
  assert(Array.isArray(r.inputs)&&r.inputs.length>0);
 }
});
check("typed edge distribution stable",()=>{
 const t={};for(const e of reg.bridges)t[e.status]=(t[e.status]||0)+1;
 assert.deepEqual(t,{DIRECT_CALL:7,CONDITIONAL_CALL:1,ALTERNATIVE_ROUTE:1,POSTPLACEMENT_TAG_ATTACH:1,OPERATOR_EQUIVALENCE_ONLY:1,NO_BRIDGE:6});
});
check("XuanSou preserved name map and actual time-dependent text",()=>{
 for(const s of ["龍池：文曲","鳳閣：文昌","掃火：擎羊","烈神：陀羅","乙亥時生人","本生時納音"])assert(xuansou.includes(s),s);
});
check("XuanSou sample uses hourly 乙亥 NaYin fire at birthday 20",()=>{
 assert(xuansou.includes("乙亥納音屬火"));
 assert(xuansou.includes("二十日是得辰上六"));
 assert.deepEqual(byId.get("X-TIME-NAYIN-DAY").inputs,["birth_hour_ganzhi","birth_day"]);
});
check("XuanSou forward string has five written branches against sixth-place verbal claim",()=>{
 const raw="辰巳午未酉";
 assert(xuansou.includes("從辰上順數"+raw));
 assert.equal([...raw].length,5);
 assert(xuansou.includes("第六位安太極"));
 assert(!raw.includes("申")); // suspected omission; NO emendation of the source
});
check("the reconstructed sixth palace from 辰 forward is 酉, NOT a verified missing glyph",()=>{
 assert.equal(move("辰",5),"酉");
 assert.equal([...Array(6)].map((_,i)=>move("辰",i)).join(""),"辰巳午未申酉");
});
check("the sixth palace from 辰 backward is 亥",()=>{
 assert.equal([...Array(6)].map((_,i)=>move("辰",-i)).join(""),"辰卯寅丑子亥");
});
check("XuanSou Taiji/house-derived stars are direct positional calls",()=>{
 insist("X-TIME-NAYIN-DAY","X-TAIJI-TIANKU","DIRECT_CALL");
 insist("X-TAIJI-TIANKU","X-POLAR-CHILDREN","DIRECT_CALL");
 assert(xuansou.includes("太極天驛星逆行"));assert(xuansou.includes("天庫天宜順"));
});
check("XuanSou lu reference and 甲 example are local textual anchors",()=>{
 for(const s of ["甲祿寅","乙祿卯","正祿在寅","掃火在卯","烈神在丑"]) assert(xuansou.includes(s),s);
 insist("X-ZHENGLU","X-SAO-LIE","DIRECT_CALL");
});
check("the same 12-palace positive/negative-offset operator works for all ten JieLan Lu stems",()=>{
 assert.equal(stems.length,10);assert.equal(locLu.length,10);
 for(const g of stems) {
  assert.equal(move(yang(lu(g)),-1),lu(g));
  assert.equal(move(tuo(lu(g)),1),lu(g));
 }
});
check("explicit old and later 甲羊陀 positions",()=>{
 assert.equal(lu("甲"),"寅");assert.equal(yang(lu("甲")),"卯");assert.equal(tuo(lu("甲")),"丑");
 assert.equal(lu("乙"),"卯");assert.equal(yang(lu("乙")),"辰");assert.equal(tuo(lu("乙")),"寅");
});
check("XuanSou forward/outward 12 names present",()=>{
 const names="文貴 八却 文昌 夭傷 印綬 權柄 天孤 五福 天空 夭壽 天暗 天刑".split(" ");
 assert(xuansou.includes(names.join("、")));
 assert.equal(names.length,12);assert.equal(new Set(names).size,12);
});
check("XuanSou alternate '從祿上' is a separately selected alternative, not a chained computation",()=>{
 assert(xuansou.includes("一法從祿上"));
 insist("X-ZHENGLU","X-OUTER12-LU-ALT","CONDITIONAL_CALL");
 insist("X-OUTER12-MAIN","X-OUTER12-LU-ALT","ALTERNATIVE_ROUTE");
});
check("outer 12 main path positions differ by directional rule: 12th TianXing 丑 or 卯",()=>{
 assert.equal(move("寅",11),"丑");
 assert.equal(move("寅",-11),"卯");
 assert.equal(move(lu("甲"),0),"寅");
 assert.equal(lu("癸"),"子");
 assert.notEqual(lu("癸"),"寅"); // for alternate route, do NOT infer all slots/direction
});
check("JieLan explicit stem→Lu→Yang/Tuo chain registered",()=>{
 insist("J-LUCUN","J-YANGTUO","DIRECT_CALL");
 assert.deepEqual(byId.get("J-YANGTUO").inputs,["lucun_palace"]);
});
check("XuanSou Sao/Lie and JieLan Yang/Tuo are operator-only comparison",()=>{
 insist("X-SAO-LIE","J-YANGTUO","OPERATOR_EQUIVALENCE_ONLY");
});
check("JieLan five-ju→ZiFu→primary stars direct outputs as next inputs",()=>{
 insist("J-FIVE-JU","J-ZIFU","DIRECT_CALL");
 insist("J-ZIFU","J-MAIN-STARS","DIRECT_CALL");
 assert.deepEqual(byId.get("J-ZIFU").inputs,["five_element_ju","birth_day"]);
});
check("JieLan annual four-function tags attach to already-placed named primary stars",()=>{
 insist("J-MAIN-STARS","J-FOUR-TAGS","POSTPLACEMENT_TAG_ATTACH");
 assert.deepEqual(byId.get("J-FOUR-TAGS").inputs,["birth_year_stem","fixed_primary_star_positions"]);
});
check("JieLan left-auxiliary position→three-platform position direct call",()=>{
 insist("J-LEFT-RIGHT","J-SANTAI-BAZUO","DIRECT_CALL");
 assert.deepEqual(byId.get("J-SANTAI-BAZUO").inputs,["assistant_star_positions","birth_day"]);
});
check("12 months × 30 day forms, XuanSou direct vs JieLan staged Santai all 360 positions match",()=>{
 let n=0;for(let m=1;m<=12;m++)for(let d=1;d<=30;d++){assert.equal(xuSantai(m,d),jlSantai(m,d));n++;}
 assert.equal(n,360);
});
check("12 months × 30 day forms, XuanSou direct vs JieLan staged Bazuo all 360 positions match",()=>{
 let n=0;for(let m=1;m<=12;m++)for(let d=1;d<=30;d++){assert.equal(xuBazuo(m,d),jlBazuo(m,d));n++;}
 assert.equal(n,360);
});
check("independently check month/day split points",()=>{
 assert.equal(xuLeft(1),"辰");assert.equal(xuLeft(2),"巳");
 assert.equal(xuRight(1),"戌");assert.equal(xuRight(2),"酉");
 assert.equal(jlSantai(1,1),"辰");assert.equal(jlSantai(2,1),"巳");
 assert.equal(jlBazuo(1,1),"戌");assert.equal(jlBazuo(2,1),"酉");
});
check("XuanSou Taiji/time-NaYin and JieLan ZiFu/year-stem are not same algorithm",()=>{
 insist("X-TAIJI-TIANKU","J-ZIFU","NO_BRIDGE");
 assert(!byId.get("J-ZIFU").inputs.includes("birth_hour_ganzhi"));
});
check("ZiWeiShu has separate seven-column and old ten-role headings, no literal Qiu→Huo caller in extracted excerpt",()=>{
 assert(zws.includes("科、魁、祿、馬、權、福、禍"));
 assert(zws.includes("祿、暗、福、耗、蔭、貴、刑、印、囚、權"));
 insist("Z-TEN-ROLES","Z-SEVEN-COLUMNS","NO_BRIDGE");
});
check("ZiWeiShu 癸福 and 癸禍 are both 貪狼, do not reinterpret old 囚",()=>{
 assert(zws.includes("癸　陰　同　破　廉　同　貪　貪"));
 assert(byId.get("Z-SEVEN-COLUMNS").quote.includes("癸之福、禍"));
});
check("M11 still identifies 癸 annual old-Qiu 炁 as a different output type",()=>{
 assert.equal(m11.records.find(x=>x.id==="WYG-STEM-QIU").output_type,"old_qiu_planet");
 assert(m11.records.find(x=>x.id==="WYG-STEM-QIU").caller_excerpt.includes("炁"));
 assert.equal(byId.get("Z-TEN-ROLES").output_type,"old_stellar_role_carrier");
});
check("no classical Qiu/early seven-column carrier promoted to mature annual Ji by any registered caller",()=>{
 for(const from of ["Z-TEN-ROLES","Z-SEVEN-COLUMNS","J-LUCUN","X-SAO-LIE"])
  insist(from,"J-FOUR-TAGS","NO_BRIDGE");
 assert(!reg.bridges.some(e=>e.to==="J-FOUR-TAGS" && e.status==="DIRECT_CALL" && e.from!=="J-MAIN-STARS"));
});
check("M12 annual Ji directly selects fixed names and does not accept an old-qiu input",()=>{
 const ji=byId.get("J-FOUR-TAGS");
 assert(ji.quote.includes("太陽下安忌"));
 assert(ji.caveat.includes("癸")===false || ji.caveat.includes("囚"));
 assert(!ji.inputs.includes("old_qiu_planet"));
});
check("all three OPEN and 1581/G0/G1/G2 guards are retained",()=>{
 assert(reg.gate.includes("OPEN"));assert(reg.gate.includes("1581"));assert(reg.gate.includes("G0/G1/G2"));
 assert(reg.gate.includes("§810-A/§812-A"));assert(reg.gate.includes("炁"));assert(reg.gate.includes("貪狼"));
});
console.log("M12 RESULT "+checks+"/"+checks+" PASS (schema, quotations as stored, 720 Santai/Bazuo formal states, 17 typed edges).");
console.log("STATUS: annual old-Qiu A→mature Hua-Ji B source caller NOT demonstrated; §816/§817/§818 OPEN.");
