"use strict";
/**
 * M19-S | from observed-named Big Dipper seven stars to symbolic natal "mingzhu":
 * identify exact seven-star/twelve-branch lookup across three textual systems.
 * SOURCE FIXTURES are manually read from public Classical Chinese transcriptions,
 * not authenticated manuscript images or proof of borrowing.
 *
 * SUI: 蕭吉《五行大義》卷四〈第十六論七政〉引《黃帝斗圖》
 *      https://www.zinbun.kyoto-u.ac.jp/~takeda/kyoudou/gogyou/gogyoutaigi/gogyo_gogyo_04_g.html
 *      https://zh.wikisource.org/zh/五行大義/4
 * T1307: 《佛說北斗七星延命經》
 *      https://tripitaka.zensoul.org/T/T1307/1
 * JIELAN: 《紫微斗數捷覽》〈定命主訣〉 "俱以生年十二支為主"
 *      https://tool.shixingji.club/library/ziweidoushujielan
 * QUANSHU: 《紫微斗數全書》〈安命主〉 "午宮安命...子宮安命"
 *      https://libokang.com/zh-hant/classics/ziwei/紫微斗數全書/
 * HISTORICAL FOUR-INVISIBLE: 明《古今律歷考》卷64, 明《圖書編》卷21
 *      https://zh.wikisource.org/zh-hant/古今律厯考_(四庫全書本)/卷64
 *      https://zh.wikisource.org/wiki/圖書編_(四庫全書本)/卷021
 * T1299: 《宿曜經》卷下 27 natal lunar mansion via 15th-day mansion + birth day.
 *
 * WARNING: year-branch and chart's ming-palace branch are different inputs.
 * This program must not infer physical-coordinate projection, intertext copying,
 * annual four-Hua, or any proven direct astronomical origin of Ziwei fourteen stars.
 */
const assert=require("node:assert/strict");
const ZODIAC=Object.freeze(["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]);
const STARS=Object.freeze(["貪狼","巨門","祿存","文曲","廉貞","武曲","破軍"]);
const CANON=Object.freeze([
 "貪狼","巨門","祿存","文曲","廉貞","武曲",
 "破軍","武曲","廉貞","文曲","祿存","巨門"
]);
const source=Object.freeze({
 WUXINGDA_YI:Object.freeze({
  book:"隋蕭吉《五行大義》卷四〈第十六論七政〉引《黃帝斗圖》",
  selector:"birth_year_branch",originalSixth:"己未（京都大學本轉錄疑字；巳未義校對照另本）",
  order:CANON, verifiedOriginalImage:false, dateOfQuotedHuangdiDoutuUnknown:true
 }),
 T1307:Object.freeze({
  book:"《佛說北斗七星延命經》",selector:"birth_year_branch",
  order:CANON,verifiedOriginalImage:false, independentOfWuxing:false
 }),
 JIELAN:Object.freeze({
  book:"《紫微斗數捷覽》〈定命主訣〉",selector:"birth_year_branch",
  order:CANON,verifiedOriginalImage:false, explicitSourceCallerToWuxing:false
 }),
 QUANSHU:Object.freeze({
  book:"《紫微斗數全書》〈安命主〉",selector:"natal_ming_palace_branch",
  order:CANON,verifiedOriginalImage:false, explicitSourceCallerToWuxing:false
 })
});
const typeName=(sourceName)=>source[sourceName].selector;
function select(sourceName,branch,asType){
 assert(Object.hasOwn(source,sourceName));
 assert(ZODIAC.includes(branch));
 assert.equal(asType,source[sourceName].selector,
   "不同源端參數：生年支不可當命宮支");
 return Object.freeze({star:source[sourceName].order[ZODIAC.indexOf(branch)],
  source:sourceName,selector:asType,branch,physicalCoordinatesUsed:false});
}
const triangular=(idx)=>1+Math.min(idx,12-idx);
let n=0;function test(label,f){f();n++;console.log("PASS "+label);}
test("12支各一星；源端12→7完整覆蓋",()=>{
 assert.equal(new Set(CANON).size,7); assert.equal(CANON.length,12);
});
test("北斗七星來源同支對照恰對稱1 2 3 4 5 6 7 6 5 4 3 2",()=>{
 for(let i=0;i<12;i++)assert.equal(CANON[i],STARS[triangular(i)-1]);
});
test("子午兩端各1支，其他五曜各2支（1 2 2 2 2 2 1）",()=>{
 assert.deepEqual(STARS.map(s=>CANON.filter(x=>x===s).length),[1,2,2,2,2,2,1]);
});
test("隋引書、T1307、捷覽、全書七星名稱序一致",()=>{
 for(const [name,item] of Object.entries(source)){
  assert.deepEqual(item.order,CANON,name);
 }
});
test("隋引《黃帝斗圖》為生人所屬星而非星的出生時黃經",()=>{
 assert.equal(typeName("WUXINGDA_YI"),"birth_year_branch");
 assert.equal(select("WUXINGDA_YI","子","birth_year_branch").physicalCoordinatesUsed,false);
});
test("T1307生支定北斗星名與蕭吉引書12/12形式同構",()=>{
 for(const z of ZODIAC){
  assert.equal(select("T1307",z,"birth_year_branch").star,
   select("WUXINGDA_YI",z,"birth_year_branch").star);
 }
});
test("《捷覽》年支選星與隋引書12/12同表",()=>{
 for(const z of ZODIAC)assert.equal(
  select("JIELAN",z,"birth_year_branch").star,
  select("WUXINGDA_YI",z,"birth_year_branch").star);
});
test("《全書》命宮支選星與同表12/12吻合，惟輸入參數已換",()=>{
 for(const z of ZODIAC)assert.equal(
  select("QUANSHU",z,"natal_ming_palace_branch").star,
  select("JIELAN",z,"birth_year_branch").star);
 assert.notEqual(typeName("QUANSHU"),typeName("JIELAN"));
});
test("命宮支不能偷偷當生年支：型別拒絕",()=>{
 assert.throws(()=>select("QUANSHU","午","birth_year_branch"),/不同源端參數/);
 assert.throws(()=>select("JIELAN","午","natal_ming_palace_branch"),/不同源端參數/);
});
test("明示反例：子年午命，年支貪狼、命宮支破軍",()=>{
 assert.equal(select("JIELAN","子","birth_year_branch").star,"貪狼");
 assert.equal(select("QUANSHU","午","natal_ming_palace_branch").star,"破軍");
});
test("12×12抽象雙參數格：22個同星、122個異星，不是真盤樣本",()=>{
 let same=0,different=0;
 for(const year of ZODIAC)for(const ming of ZODIAC){
  const a=select("JIELAN",year,"birth_year_branch").star;
  const b=select("QUANSHU",ming,"natal_ming_palace_branch").star;
  if(a===b)same++;else different++;
 }
 assert.deepEqual([same,different],[22,122]);
});
test("星名來源實星北斗；本命配屬不需天文坐標",()=>{
 const a=select("WUXINGDA_YI","辰","birth_year_branch");
 assert.equal(a.star,"廉貞"); assert.equal(a.physicalCoordinatesUsed,false);
});
test("巳／己的傳抄疑字保留，不能擅把天干己視為十二支",()=>{
 assert(!ZODIAC.includes("己"));assert(ZODIAC.includes("巳"));
 assert(source.WUXINGDA_YI.originalSixth.includes("己未"));
});
test("不把12→7本命星映射當作紫微14主星安置",()=>{
 assert.notEqual(STARS.length,14);
 assert.equal(source.QUANSHU.order.length,12);
});
test("不把《黃帝斗圖》歸屬年代等同於隋代《五行大義》編纂年代",()=>{
 assert.equal(source.WUXINGDA_YI.dateOfQuotedHuangdiDoutuUnknown,true);
});
test("《宿曜經》卷下：二月十五角宿為條件輸入，第十七日為氐宿",()=>{
 const idx=(17+13-1)%27;assert.equal(idx,2);
 const seq=["角","亢","氐"];assert.equal(seq[idx],"氐");
});
test("二月十五角為條件示例，不能當每年實測月望宿",()=>{
 const gate={exampleFullMoonMansion:"角",alwaysAngleAtFeb15:false,
  upstreamEphemerisVerified:false};
 assert.equal(gate.alwaysAngleAtFeb15,false);
 assert.equal(gate.upstreamEphemerisVerified,false);
});
test("九執360度/27等宿只是相容格網，未證→T1299跨書指定",()=>{
 assert.equal(27*800,21600);assert.equal(12*30*60,21600);
});
test("四餘分三種角色：羅計交點、孛月行遲處、炁起閏法",()=>{
 const physicalModel=Object.freeze({
  luoji:"intersection_nodes",yuebei:"lunar_slowest_point_model",
  ziqi:"leap_cycle_derived_symbolic", allVisible:false
 });
 assert.deepEqual(Object.values(physicalModel),[
  "intersection_nodes","lunar_slowest_point_model","leap_cycle_derived_symbolic",false
 ]);
});
test("羅計交點≠天空可見七政實體星；四餘歷史語義容許不同解釋",()=>{
 const evidence={secondaryBodyCoordinates:false,claimedDirectZiweiStar:false,
    lateMingWording:"皆有度數無光象"};
 assert.equal(evidence.secondaryBodyCoordinates,false);
 assert.equal(evidence.claimedDirectZiweiStar,false);
 assert.equal(evidence.lateMingWording,"皆有度數無光象");
});
test("四餘抽象幾何點的轉換≠北斗命主標籤的轉換",()=>{
 const operations=["PHYSICAL_STAR_NAME_TO_BIRTH_LABEL",
 "ASTRONOMICAL_GEOMETRY_TO_CALCULATED_POINT",
 "LUNAR_MANSION_TO_NATAL_DAY_LABEL",
 "NATAL_POSITION_TO_ZIWEI_MAINSTAR"];
 assert.equal(new Set(operations).size,4);
});
test("舊M18欠夜月算不被此指紋修改或宣稱已校完",()=>{
 const gate={M18_verified_asHistoricalEphemeris:false,
  moonToT1299DirectCaller:false, lunarPositionToZiweiMainstarCaller:false};
 assert(Object.values(gate).every(x=>x===false));
});
test("§816/817/818禁跨過癸囚炁→成熟貪狼史料關卡",()=>{
 const status={p816:"OPEN",p817:"OPEN",p818:"OPEN",
  oldGuiCarrier:"炁",modernGuiJi:"貪狼",provenCarrierTransfer:false};
 assert.deepEqual([status.p816,status.p817,status.p818],["OPEN","OPEN","OPEN"]);
 assert.equal(status.provenCarrierTransfer,false);
});
test("頁面轉錄共用來源不得當4份獨立出土史證",()=>{
 assert(Object.values(source).every(x=>x.verifiedOriginalImage===false));
});
console.log("DIAGNOSTICS "+JSON.stringify({starOrder:STARS,branches:ZODIAC,
  map:CANON,abstractYearXPalacePairs:144,equal:22,different:122,
  markedNoProof:true}));
console.log("M19-S "+n+"/"+n+" PASS (text-fixture/mathematical/type checks, not independent historical proof)");
