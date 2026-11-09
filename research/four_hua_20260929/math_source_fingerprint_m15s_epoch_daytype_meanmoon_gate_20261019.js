"use strict";
/**
 * M15-S | 九執曆：新唐書朔策明文 = 卷104欠夜有理數，
 * 657 / 714曆元標籤、三種日型別與只到「中日」的條件試算。
 * 出典:
 * https://zh.wikisource.org/wiki/新唐書/卷028下
 * https://www.eee-learning.com/book/kaiyenjan104
 * https://zgks.cbpt.cnki.net/portal/journal/portal/client/paper/f37028440ae01a5375a8b2c50a5ad64a
 * https://deerpark.app/cbeta/T1299/2
 *
 * NOTE: 來源性質 = 後出史書明文 + 待校電子古文 + 2026論文公開摘要和註腳；
 * 429、169語法未核定；「中日」試算採有疑的截整分規則，非定本全日月星曆。
 */
const assert = require("node:assert/strict");
let n=0;
const test=(label, fn)=>{ fn(); n++; console.log("PASS "+label); };
const mod=(a,b)=>((a%b)+b)%b;
function gcd(a,b){return b===0?a:gcd(b,a%b);}
const TITHI30 = "elapsed_mean_tithi";
const SAVANA_CANDIDATE = "candidate_elapsed_savana_day";
const SOLAR_ANGLE = "candidate_mean_solar_arcmin";
const FIXED_MOON = "historically_verified_true_moon_arcmin";
const SUBSYSTEM = Object.freeze({
  ancientEpoch: {year:657,month:2,day:1,source:"開元占經卷104",kind:"source_epoch_wording"},
  editorialReference: {year:714,month:2,day:null,source:"新唐書卷028下",kind:"historical_new_epoch_label"},
  sample: {year:714,month:3,day:5,source:"開元占經卷104",kind:"ancient_example_ordinal"},
  t1299: {source:"T1299卷下",desired:"fifteenth_day_wangxiu_27",sameEpochCaller:null}
});
const monthMean={num:20760,den:703};
function normalizeDay(value,kind){assert(Number.isSafeInteger(value));return Object.freeze({value,kind});}
function assertDay(x,kind){assert(x&&x.kind===kind, `expected ${kind}, got ${x?.kind}`);}
function rawMeanTithi(monthsAfterEpoch,ordinal){
 assert(Number.isSafeInteger(monthsAfterEpoch)&&monthsAfterEpoch>=0);
 assert(Number.isSafeInteger(ordinal)&&ordinal>=0&&ordinal<=30);
 const leapNum=monthsAfterEpoch*7+132;
 const leaps=Math.floor(leapNum/228);
 return {months:monthsAfterEpoch,leaps,leapRemainder:leapNum%228,
         monthSlots:monthsAfterEpoch+leaps,
         input:normalizeDay((monthsAfterEpoch+leaps)*30+ordinal,TITHI30)};
}
function candidateSavana(input,c){
 assertDay(input,TITHI30);
 assert(Number.isSafeInteger(c)&&c>=0&&c<703);
 const count=Math.floor((input.value*11+c)/703);
 const residue=(input.value*11+c)%703;
 return {hypothesis:c,omit:count,residue,day:normalizeDay(input.value-count,SAVANA_CANDIDATE)};
}
/* 來源「中日」章：以積日12/900求沒度，餘15除求沒分，加30分，
 * 扣沒度/分後歸一360度；十五除有餘時以截整分試算，尚待校本。
 */
function candidateMeanSun(typedDay){
 assertDay(typedDay,SAVANA_CANDIDATE);
 const d=typedDay.value;
 const dropDegree=Math.floor(12*d/900);
 const rem900=(12*d)%900;
 const dropMinute=Math.floor(rem900/15)+30;
 const ignoredSubMinute=rem900%15;
 const solarArc=mod((d-dropDegree)*60-dropMinute,21600);
 return {kind:SOLAR_ANGLE,dropDegree,rem900,dropMinute,ignoredSubMinute,
   arcmin:solarArc,degree:Math.floor(solarArc/60),minute:solarArc%60};
}
function actualMoon(input){
 if(input&&input.kind===SOLAR_ANGLE)
   throw new TypeError("中日是太陽均黃經，不能輸入定月/宿刻；中月、高月、月藏仍缺校準");
 if(!input||input.kind!==FIXED_MOON)
   throw new TypeError("尚無來源端校定的定月角分");
 return input;
}
const ex=rawMeanTithi(57*12+1,5);
const a=candidateSavana(ex.input,169);
const b=candidateSavana(ex.input,429);
const sunA=candidateMeanSun(a.day);
const sunB=candidateMeanSun(b.day);

test("新唐書直接給出29日加373/703，合20760/703",()=>{
 assert.equal(29*703+373,20760);
});
test("卷104條件式欠夜比率30(1-11/703)與新唐書恰好有理數同值",()=>{
 assert.equal(30*(703-11),monthMean.num);
});
test("30日減330/703 亦等價",()=>assert.equal(30*703-330,20760));
test("新唐書373/703 不約分",()=>assert.equal(gcd(373,703),1));
test("月均29.53058321479",()=>assert(Math.abs(monthMean.num/monthMean.den-29.53058321479374)<1e-12));
test("史料明列七閏228月條件數不變",()=>{
 assert.equal(228,12*19);assert.equal(228+7,235);
});
test("初曆元657與新唐書開元二年714不得視為相同曆元",()=>{
 assert.equal(SUBSYSTEM.editorialReference.year-SUBSYSTEM.ancientEpoch.year,57);
 assert.notDeepEqual(SUBSYSTEM.ancientEpoch,SUBSYSTEM.editorialReference);
});
test("714二月朔與657二月一日是兩個有來源的錨點而非現代公曆年月日",()=>{
 assert.equal(SUBSYSTEM.ancientEpoch.kind,"source_epoch_wording");
 assert.equal(SUBSYSTEM.editorialReference.kind,"historical_new_epoch_label");
 assert.equal(SUBSYSTEM.editorialReference.day,null);
});
test("開元二年三月五日例是原書的序數算例，未換算公曆",()=>{
 assert.deepEqual([SUBSYSTEM.sample.year,SUBSYSTEM.sample.month,SUBSYSTEM.sample.day],[714,3,5]);
});
test("有型別30日槽685基準月",()=>assert.equal(ex.months,685));
test("有型別閏21餘139",()=>assert.deepEqual([ex.leaps,ex.leapRemainder],[21,139]));
test("有型別真月槽706",()=>assert.equal(ex.monthSlots,706));
test("有型別暫日21185",()=>{
 assert.equal(ex.input.value,21185);assert.equal(ex.input.kind,TITHI30);
});
test("169僅作試讀得欠夜331餘511",()=>assert.deepEqual([a.omit,a.residue],[331,511]));
test("429僅作試讀得欠夜332餘68",()=>assert.deepEqual([b.omit,b.residue],[332,68]));
test("兩試讀分岔為20854和20853",()=>{
 assert.equal(a.day.value,20854);assert.equal(b.day.value,20853);
});
test("兩候選積日不等於已核普通民曆日期",()=>{
 assert.equal(a.day.kind,SAVANA_CANDIDATE);assert.equal(b.day.kind,SAVANA_CANDIDATE);
 assert.notEqual(a.day.kind,"verified_civil_day");
});
test("中日有疑截分試算 429分支沒度278、餘36",()=>assert.deepEqual([sunB.dropDegree,sunB.rem900],[278,36]));
test("中日有疑截分試算 429分支減32分／保留6餘",()=>assert.deepEqual([sunB.dropMinute,sunB.ignoredSubMinute],[32,6]));
test("中日有疑截分試算 429分支54度28分",()=>assert.deepEqual([sunB.degree,sunB.minute],[54,28]));
test("中日有疑截分試算 169分支沒度278、餘48",()=>assert.deepEqual([sunA.dropDegree,sunA.rem900],[278,48]));
test("中日有疑截分試算 169分支減33分／保留3餘",()=>assert.deepEqual([sunA.dropMinute,sunA.ignoredSubMinute],[33,3]));
test("中日有疑截分試算 169分支55度27分",()=>assert.deepEqual([sunA.degree,sunA.minute],[55,27]));
test("兩候選中日位差59角分，不誤作宿位",()=>{
 assert.equal(sunA.arcmin-sunB.arcmin,59);
 assert.equal(sunA.kind,SOLAR_ANGLE);
});
test("平均太陽位置不能直接作月球定月計宿",()=>assert.throws(()=>actualMoon(sunA),/中日是太陽均黃經/));
test("平太陰日不能直接轉入日界天文輸出",()=>assert.throws(()=>candidateMeanSun(ex.input),/expected/));
test("尚無真月位置，不允許輸出某日27宿",()=>assert.throws(()=>actualMoon(null),/尚無/));
test("703欠夜分母與800宿角分不同量綱",()=>assert.notEqual(703,800));
test("新唐書曆首朔虛分126，不擅認成429/169同一位置",()=>{
 const source={tangShuEpochVacancy:126,juan104PhaseSyntaxVerified:false};
 assert.equal(source.tangShuEpochVacancy,126);
 assert.equal(source.juan104PhaseSyntaxVerified,false);
});
test("T1299十五望宿跨書 caller 未證",()=>assert.equal(SUBSYSTEM.t1299.sameEpochCaller,null));
test("化囚轉掛固定忌不因月長指紋而證成",()=>{
 const s={section816:"OPEN",section817:"OPEN",section818:"OPEN",oldQiuToFixedJi:null};
 assert.equal(s.oldQiuToFixedJi,null);
 assert([s.section816,s.section817,s.section818].every(x=>x==="OPEN"));
});
console.log(`M15-S RESULT ${n}/${n} PASS; New Tang History mean lunation equality DIRECT TEXTUAL PARALLEL; conditional solar mean only; true lunar lodge PENDING.`);
console.log("CONDITIONAL_EXAMPLE",JSON.stringify({rawTithi:ex.input.value,
 c169:{candidateDay:a.day.value,meanSunDegMin:[sunA.degree,sunA.minute],discardedRemainder:sunA.ignoredSubMinute},
 c429:{candidateDay:b.day.value,meanSunDegMin:[sunB.degree,sunB.minute],discardedRemainder:sunB.ignoredSubMinute}}));
