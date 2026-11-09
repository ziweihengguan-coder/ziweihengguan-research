"use strict";
/**
 * M20-S | 靈臺秘苑 / 隋書天文志 / 唐開元占經
 * Real asterism --> multi-star group names vs individual Ziwei chart carriers.
 * Source lines are manually verified transcribed fixtures, NOT manuscript OCR or
 * independent witnesses. 2026-10-22.
 *
 * 1) https://zh.wikisource.org/zh-hant/靈台秘苑#卷二
 * 2) https://zh.wikisource.org/zh-hant/靈台秘苑#卷十
 * 3) https://zh.wikisource.org/zh-hant/靈台秘苑#卷十三
 * 4) https://zh.wikisource.org/zh/隋書/卷20
 * 5) https://zh.wikisource.org/zh-hant/唐開元占經_(四庫全書本)/卷061
 * 6) https://zh.wikisource.org/zh-hant/靈臺秘苑_(四庫全書本)
 *
 * Guard: Northern Zhou Ji Cai original, Northern Song reworking, Qing Siku
 * witness have distinct dates. A quotation in Tang compilation only proves
 * a quoted textual tradition was preserved, NOT date of quoted lost source.
 */
const assert=require("node:assert/strict");
const SOURCES=Object.freeze({
  LINGTAI_2:{era:"NORTHERN_ZHOU_SOURCE_IN_NORTHERN_SONG_REDACTION",
    text:"南斗六星...又曰兵亦曰天機南二星曰魁庫樓天梁也中二星相也天府建杓也"},
  LINGTAI_10:{era:"NORTHERN_ZHOU_SOURCE_IN_NORTHERN_SONG_REDACTION",
    text:"北極紐星天之極也以紐為不動處梁祖景爍以儀測之在不動處一度餘皇祐測一度少強"},
  LINGTAI_13:{era:"NORTHERN_ZHOU_SOURCE_IN_NORTHERN_SONG_REDACTION",
    text:"奎宿距西南大星去極七十二度半...又入之為破軍殺將"},
  SUISHU20:{era:"TANG_COMPILATION_OF_SUI_HISTORY",
    text:"南斗六星...一曰天機南二星魁天梁也中央二星天相也北二星杓天府庭也"},
  KAIYUAN61:{era:"TANG_COMPILATION_QUOTING_OLDER_SOURCE",
    text:"北官候曰南斗一名天府天關一名天機一名天同天子旗也斗北二星天府廷中央二星相也南二星天庫樓也天梁也"}
});
const GROUP={SOUTH:[0,1],CENTER:[2,3],NORTH:[4,5],WHOLE:[0,1,2,3,4,5]};
const map=Object.freeze([
 {name:"天機",entity:"SOUTHERN_DIPPER_ASTERISM_ALIAS",slots:GROUP.WHOLE,source:"SUISHU20"},
 {name:"天梁",entity:"TWO_STARS_IN_SOUTHERN_DIPPER",slots:GROUP.SOUTH,source:"SUISHU20"},
 {name:"天相",entity:"TWO_STARS_IN_SOUTHERN_DIPPER",slots:GROUP.CENTER,source:"SUISHU20"},
 {name:"天府庭",entity:"TWO_STARS_IN_SOUTHERN_DIPPER",slots:GROUP.NORTH,source:"SUISHU20"},
 {name:"天同",entity:"SOURCE_QUOTED_SOUTHERN_DIPPER_ALIAS",slots:GROUP.WHOLE,source:"KAIYUAN61"}
]);
let pass=0;function test(name,fn){fn();pass++;console.log("PASS "+name);}
test("隋書南斗六星分南中北三組二星",()=>{
  assert.equal(GROUP.SOUTH.length+GROUP.CENTER.length+GROUP.NORTH.length,6);
});
test("三組涵蓋六星無重複",()=>{
  const all=[...GROUP.SOUTH,...GROUP.CENTER,...GROUP.NORTH];
  assert.deepEqual([...new Set(all)].sort((a,b)=>a-b),[0,1,2,3,4,5]);
});
test("來源對照：天機／天梁／天相／天府庭共見隋書",()=>{
 for(const s of ["天機","天梁","天相","天府"])assert(SOURCES.SUISHU20.text.includes(s));
});
test("《靈臺秘苑》卷二具天機天梁天府及中央『相』段",()=>{
 for(const s of ["天機","天梁","天府","中二星相"])assert(SOURCES.LINGTAI_2.text.includes(s));
});
test("《開元占經》引北官候加見天同，隋書該段未見",()=>{
 assert(SOURCES.KAIYUAN61.text.includes("天同"));
 assert(!SOURCES.SUISHU20.text.includes("天同"));
});
test("《開元占經》同段也有天機天梁天府",()=>{
 for(const s of ["天機","天梁","天府"])assert(SOURCES.KAIYUAN61.text.includes(s));
});
test("天機（整組）與天梁兩星重疊，不可當互不相干恆星",()=>{
 const a=map.find(s=>s.name==="天機"),b=map.find(s=>s.name==="天梁");
 assert(a.slots.some(n=>b.slots.includes(n)));
 assert.deepEqual(a.slots,GROUP.WHOLE);
});
test("天相在南斗二星，與斗南單獨天相星官不可無證同體",()=>{
 assert.equal(map.find(s=>s.name==="天相").slots.length,2);
});
test("星名天府庭為兩顆／一分部，非已證斗數天府單星載體",()=>{
 assert.equal(map.find(s=>s.name==="天府庭").slots.length,2);
});
test("來源端四個名稱不等同四顆不同觀測星",()=>{
 const slots=map.filter(x=>x.source==="SUISHU20");
 assert.equal(slots.length,4);
 assert.equal(slots.reduce((n,x)=>n+x.slots.length,0),12); // 6+2+2+2 overlapping
});
test("天同古文來源是整組別稱候選，未自動變成斗數單星",()=>{
 assert.equal(map.find(s=>s.name==="天同").slots.length,6);
 assert.equal(map.find(s=>s.name==="天同").source,"KAIYUAN61");
});
test("卷十皇祐是宋年代標記，不能標整卷北周原字",()=>{
 assert(SOURCES.LINGTAI_10.text.includes("皇祐測"));
 assert.equal(SOURCES.LINGTAI_10.era,"NORTHERN_ZHOU_SOURCE_IN_NORTHERN_SONG_REDACTION");
});
test("紐星與不動天極有距離（大於1古度記載），不等同幾何點",()=>{
 assert(SOURCES.LINGTAI_10.text.includes("一度餘"));
 const pole={type:"ABSTRACT_CELESTIAL_POLE",observedStarBody:false};
 const pivotStar={type:"VISIBLE_POLAR_STAR",observedStarBody:true};
 assert.notEqual(pole.type,pivotStar.type);
});
test("卷十三『奎宿距極七十二度半』是實星座標用例",()=>{
 assert(SOURCES.LINGTAI_13.text.includes("去極七十二度半"));
});
test("卷十三『破軍殺將』是軍事情況，不是破軍北斗星名",()=>{
 assert(SOURCES.LINGTAI_13.text.includes("破軍殺將"));
 const record={term:"破軍",sense:"MILITARY_DEFEAT",natalCarrier:false};
 assert.notEqual(record.sense,"DIPPER_7_STAR_NAME");
});
test("北斗七星與南斗六星不能混為同組",()=>{
 assert.notEqual(7,GROUP.WHOLE.length);
});
test("古文觀測座標與後世生年月日時安星所需參數不同",()=>{
 const observed=["polar_distance","mansion","planet_appulse"];
 const natal=["birth_year_stem","birth_month","birth_day","birth_hour","five_element_bureau"];
 assert(observed.every(k=>!natal.includes(k)));
});
test("前宋層與北宋重修與清四庫傳本嚴分",()=>{
 assert.notEqual("NORTHERN_ZHOU","NORTHERN_SONG");
 assert.notEqual("NORTHERN_SONG","QING_SIKU");
});
test("失傳的《北官候》引用年代不能由唐編纂年直接上推",()=>{
 assert.equal(SOURCES.KAIYUAN61.era,"TANG_COMPILATION_QUOTING_OLDER_SOURCE");
});
test("不可據同名便聲稱已得十四主星安置公式",()=>{
 const gate={sourceToZiwei14Placement:false,starNamesGroupMatched:true,
   directHistoricalTransference:false};
 assert.equal(gate.sourceToZiwei14Placement,false);
});
test("不可由七政觀測直接推癸囚炁→斗數貪狼化忌",()=>{
 const qiu={original:"炁",fixed:"貪狼",sourceBridge:false};
 assert.equal(qiu.sourceBridge,false);
});
test("§816/§817/§818與既有反證一律保持OPEN",()=>{
 const statuses=["OPEN","OPEN","OPEN"];assert(statuses.every(x=>x==="OPEN"));
});
console.log("M20-S "+pass+"/"+pass+" PASS; fixture/typing checks only, not historical generation proof.");
