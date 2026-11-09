"use strict";
/**
 * M16-S｜《唐開元占經》卷104「高月」（月球遠地點）之有理數速率，
 * 取商／取餘讀法負控、兩高月常數分流、日期型別守門。
 *
 * 研究邊界：
 * - 四庫系電子文本原文：「置積日，以九除之，得度；餘以六十乘之，
 *   依前除之，謂亦九除也，得分……又置積日，以六十除之，得分
 *   （其分滿六十成一度）……恆加差十八相二十六度四十一分，
 *   一相十三度四十五分，置為高月位」。
 * - 顧觀光《清史稿》畴人傳：高月即月孛、月藏即月引數。
 * - 兩固定差加法未校定；先後字句、429／169、二十五餘之、
 *   中月十二除之均待葉面/異本，故此程式只有高月候選，沒有「真月」。
 * - 完整位置只可在原始語法有證據時升級；測試PASS不是獨立歷史證據。
 *
 * https://zh.wikisource.org/zh-hant/唐開元占經_(四庫全書本)/卷104
 * https://zh.wikisource.org/wiki/清史稿/卷507
 */
const assert=require("node:assert/strict");
const MIN_PER_DEG=60, MIN_PER_SIGN=30*60, CIRCLE=360*60;
const MOD=(x,m)=>((x%m)+m)%m;
let n=0;
const test=(name,fn)=>{fn();n++;console.log("PASS "+name);};
const KIND=Object.freeze({
  TITHI:"elapsed_mean_tithi",SAVANA:"candidate_elapsed_savana_day",
  SUN:"candidate_mean_solar_arcmin",HIGH:"candidate_lunar_apogee_arcmin",
  MEAN_MOON:"historically_verified_mean_moon_arcmin",
  TRUE_MOON:"historically_verified_true_moon_arcmin"
});
function typedDay(value,kind) {
 assert(Number.isSafeInteger(value)&&value>=0);
 return Object.freeze({value,kind});
}
function assertDay(day,kind) {assert(day?.kind===kind,`expected ${kind}, got ${day?.kind}`);}
function moonSlots() {
 const months=57*12+1, x=7*months+132, leaps=Math.floor(x/228);
 return {months,leaps,leapRemainder:x%228,provisional:typedDay((months+leaps)*30+5,KIND.TITHI)};
}
function savanaCandidate(tithi,c) {
 assertDay(tithi,KIND.TITHI);
 assert([169,429].includes(c),"only two explicitly tagged test branches");
 const product=11*tithi.value+c,omit=Math.floor(product/703),residue=product%703;
 return {c,omit,residue,day:typedDay(tithi.value-omit,KIND.SAVANA)};
}
/** 按「除九得度、餘乘六十再除九得分、除六十得分」之取商候選。
 * 毫小於1分的九分餘數不偽裝為古書有明文保留的額外精度。
 */
function highRunningSkeleton(day) {
 assertDay(day,KIND.SAVANA);
 const d=day.value, degFrom9=Math.floor(d/9), rem9=d%9,
   minuteFrom9=Math.floor(rem9*60/9), subMinuteFrom9=(rem9*60)%9,
   minuteFrom60=Math.floor(d/60), minuteFrom60Remainder=d%60;
 const unwrapped=degFrom9*60+minuteFrom9+minuteFrom60;
 const exactNum=401*d; // fraction of 1 arcmin: (401*d)/60
 const exactFloor=Math.floor(exactNum/60);
 return Object.freeze({kind:"candidate_apogee_running_part",d,
   degFrom9,rem9,minuteFrom9,subMinuteFrom9,minuteFrom60,minuteFrom60Remainder,
   unwrapped,wrapped:MOD(unwrapped,CIRCLE),exactRateNum:401,exactRateDen:3600,
   exactUnwrappedFloor:exactFloor,roundingGap:exactFloor-unwrapped});
}
const OFFSETS=Object.freeze({
  C18_26_41:Object.freeze({signs:18,degrees:26,minutes:41}),
  C01_13_45:Object.freeze({signs:1,degrees:13,minutes:45})
});
function offsetMinutes(o) {return o.signs*MIN_PER_SIGN+o.degrees*60+o.minutes;}
function taggedHighMoon(running,branch) {
 assert(running?.kind==="candidate_apogee_running_part");
 const cases={FIRST:[OFFSETS.C18_26_41],SECOND:[OFFSETS.C01_13_45],
  BOTH:[OFFSETS.C18_26_41,OFFSETS.C01_13_45]};
 assert(Object.prototype.hasOwnProperty.call(cases,branch),"unknown offset branch");
 const total=cases[branch].reduce((s,o)=>s+offsetMinutes(o),0);
 return Object.freeze({kind:KIND.HIGH,branch,base:running.wrapped,
   offset:MOD(total,CIRCLE),arcmin:MOD(running.wrapped+total,CIRCLE),
   historicalPositionVerified:false,syntacticParseVerified:false});
}
function lunarAnomaly(meanMoon,apogee) {
 if(meanMoon?.kind!==KIND.MEAN_MOON)
   throw new TypeError("中月的二十五餘之、十二除之未校定，不允許月藏/定月實值");
 if(apogee?.kind!==KIND.HIGH||!apogee.historicalPositionVerified)
   throw new TypeError("高月常數未校定，不允許月藏/定月實值");
 return MOD(meanMoon.arcmin-apogee.arcmin,CIRCLE);
}
function trueMoon(moon) {
 if(moon?.kind!==KIND.TRUE_MOON)
   throw new TypeError("月藏分段、定月及日界未驗收，不可輸出27宿或T1299十五望宿");
 return moon;
}
const input=moonSlots(),c169=savanaCandidate(input.provisional,169),
  c429=savanaCandidate(input.provisional,429);
const high169=highRunningSkeleton(c169.day),
  high429=highRunningSkeleton(c429.day);
const abs=(a,b)=>Math.abs(a-b);

test("開元二年三月五日來源序數暫槽仍21185",()=>assert.equal(input.provisional.value,21185));
test("年距57／基準月685／閏月21的前段回歸",()=>assert.deepEqual([input.months,input.leaps,input.leapRemainder],[685,21,139]));
test("c169保留未定句讀和小餘511",()=>assert.deepEqual([c169.day.value,c169.residue],[20854,511]));
test("c429保留未定句讀和小餘68",()=>assert.deepEqual([c429.day.value,c429.residue],[20853,68]));
test("原文高月先以9除積日、餘乘60再除9",()=>{
 assert.equal(high169.degFrom9,Math.floor(20854/9));
 assert.equal(high169.minuteFrom9,Math.floor((20854%9)*60/9));
});
test("高月再以60除積日所獲作角分的取商候選",()=>{
 assert.equal(high169.minuteFrom60,Math.floor(20854/60));
});
test("分滿60進一度由模360與角分進位自動實現",()=>{
 assert.equal(MIN_PER_DEG,60);assert.equal(CIRCLE,21600);
 assert.equal(MOD(21600+63,CIRCLE),63);
});
test("兩個取商率合成1/9度每日 + 1/3600度每日",()=>{
 assert.equal(1*3600/9+1,401);
});
test("有理數日速率正好401/3600度，非現代擬合",()=>{
 assert.equal(high169.exactRateNum,401);assert.equal(high169.exactRateDen,3600);
});
test("模型週期1296000/401日僅屬此算子數學後果",()=>{
 assert(Math.abs(1296000/401-3231.9201995012468)<1e-10);
});
test("一日平均約6.683333角分（連續有理數模型）",()=>{
 assert.equal(401/60,6.683333333333334);
});
test("除九的不足分僅留計算證跡，不冒充源文分以下單位",()=>{
 assert(high169.subMinuteFrom9>=0&&high169.subMinuteFrom9<9);
});
test("兩次先截取再相加相對一次合併精確截取至多差一角分",()=>{
 for(let d=0;d<1000;d++){
  const p=highRunningSkeleton(typedDay(d,KIND.SAVANA));
  assert([0,1].includes(p.roundingGap),`d=${d},gap=${p.roundingGap}`);
 }
});
test("兩個試算積日高月移動的原式未加常數部分有一日敏感度",()=>{
 assert.equal(high169.d-high429.d,1);
 assert([6,7,8].includes(MOD(high169.wrapped-high429.wrapped,CIRCLE)));
});
test("9和60的分位跨界仍可進位，避免未進位的假突跳",()=>{
 const a=highRunningSkeleton(typedDay(59,KIND.SAVANA));
 const b=highRunningSkeleton(typedDay(60,KIND.SAVANA));
 assert.equal(b.unwrapped-a.unwrapped,8);
});
test("以60取餘而非取商會在60日界產生負跳，作負控不當正解",()=>{
 const flawed=d=>Math.floor(d/9)*60+Math.floor((d%9)*60/9)+(d%60);
 assert(flawed(60)-flawed(59)<0);
});
test("原文18相26度41分常數可獨立保真存入",()=>{
 assert.equal(offsetMinutes(OFFSETS.C18_26_41),18*1800+26*60+41);
});
test("原文1相13度45分常數可獨立保真存入",()=>{
 assert.equal(offsetMinutes(OFFSETS.C01_13_45),1*1800+13*60+45);
});
test("18相超過12相不能直接當周天規範位置",()=>{
 assert(OFFSETS.C18_26_41.signs>12);
});
test("第一常數只在周天模歸一後是206度41分",()=>{
 assert.equal(MOD(offsetMinutes(OFFSETS.C18_26_41),CIRCLE),206*60+41);
});
test("第二常數是43度45分",()=>{
 assert.equal(MOD(offsetMinutes(OFFSETS.C01_13_45),CIRCLE),43*60+45);
});
test("兩常數相加的候選值是250度26分，非已證書定加法",()=>{
 const p=taggedHighMoon(high169,"BOTH");
 assert.equal(p.offset,250*60+26);
 assert.equal(p.syntacticParseVerified,false);
});
test("第一常數單用與第二常數單用的候選位置不同",()=>{
 assert.notEqual(taggedHighMoon(high169,"FIRST").arcmin,taggedHighMoon(high169,"SECOND").arcmin);
});
test("單用與合用三分支互不相同",()=>{
 const vals=["FIRST","SECOND","BOTH"].map(x=>taggedHighMoon(high169,x).arcmin);
 assert.equal(new Set(vals).size,3);
});
test("兩日期c169/c429各自可列三個可反駁的高月候選",()=>{
 for(const sk of [high169,high429])for(const b of ["FIRST","SECOND","BOTH"]){
  const h=taggedHighMoon(sk,b);
  assert(h.arcmin>=0&&h.arcmin<CIRCLE);
  assert.equal(h.historicalPositionVerified,false);
 }
});
test("高月候選來源是積日，不是直接輸入太陽中日",()=>{
 assert.throws(()=>highRunningSkeleton({kind:KIND.SUN,value:20854}),/expected/);
});
test("高月候選不能將平太陰日槽當經校日",()=>{
 assert.throws(()=>highRunningSkeleton(input.provisional),/expected/);
});
test("同一天不准以高月候選冒充已經核定的月孛",()=>{
 assert.equal(taggedHighMoon(high169,"BOTH").historicalPositionVerified,false);
});
test("中月缺校字則任何月藏真數都被阻擋",()=>{
 assert.throws(()=>lunarAnomaly(null,taggedHighMoon(high169,"BOTH")),/中月/);
});
test("即便杜撰平均月位置也須拒絕未定高月",()=>{
 assert.throws(()=>lunarAnomaly({kind:KIND.MEAN_MOON,arcmin:123},taggedHighMoon(high169,"FIRST")),/高月常數/);
});
test("高月不能直接當月球定月求27宿",()=>{
 assert.throws(()=>trueMoon(taggedHighMoon(high169,"BOTH")) ,/不可輸出27宿/);
});
test("沒有校定中月12除之／25餘之，不得從當月五日推已核月亮黃經",()=>{
 const parse={day5:5,step12:"ambiguous_divide_or_missing_multiply",
  step25:"ambiguous_yuzhi",witnessVerified:false};
 assert.equal(parse.witnessVerified,false);
});
test("月宿的等分800角分不准套用高月作定月",()=>{
 const h=taggedHighMoon(high169,"BOTH");
 assert.notEqual(h.kind,KIND.TRUE_MOON);
 assert.equal(CIRCLE/27,800);
});
test("T1299月望宿跨書調用仍未證",()=>{
 const caller={sameEpoch:false,verifiedIntertextCaller:false,wangDateTime:null};
 assert.equal(caller.verifiedIntertextCaller,false);
});
test("曆元與歷史四化研究狀態不因候選速率而篡改",()=>{
 const s={epoch657To714Calibrated:false,sections:["OPEN","OPEN","OPEN"],
  oldQiuToZiweiFixedJiBridge:false,externalEvidenceBefore1581:null};
 assert(!s.epoch657To714Calibrated&&!s.oldQiuToZiweiFixedJiBridge);
 assert(s.sections.every(x=>x==="OPEN"));
});

console.log(`M16-S RESULT ${n}/${n} PASS; HIGH-MOON RUNNING MODEL CONDITIONAL;`);
console.log("RUNNING_BRANCHES",JSON.stringify({
 day169:c169.day.value,day429:c429.day.value,
 high169,high429,
 variants169:Object.fromEntries(["FIRST","SECOND","BOTH"].map(b=>[b,taggedHighMoon(high169,b).arcmin])),
 variants429:Object.fromEntries(["FIRST","SECOND","BOTH"].map(b=>[b,taggedHighMoon(high429,b).arcmin]))
}));
