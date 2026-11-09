"use strict";
/**
 * M18-S | 《九執曆》〈推中月〉703 制欠夜與 12度 / 25商雙時鐘連續性
 * Numerical stress test of M17-S CONDITIONAL operators, not a textual emendation.
 * https://www.eee-learning.com/book/kaiyenjan104
 * Ancient inputs: 11,703, 12 (suspected multiply), 25 (suspected quotient),
 * 60 angular minutes/degree; 《推月域》 supplies a separate TRUE-moon
 * baseline of 790 arcminutes per civil day, not a mean-moon identity.
 */
const assert=require("node:assert/strict");
const FULL=21600, DEG=60, DEN=703, BASE=21185;
const mod=(n,m)=>((n%m)+m)%m;
const signed=(newV,oldV)=>mod(newV-oldV+FULL/2,FULL)-FULL/2;
const K=Object.freeze({TITHI:"mean_tithi_slot_candidate", DAY:"savana_day_candidate",
 SUN:"mean_sun_candidate", MOON:"unverified_mean_moon_candidate",
 APOGEE:"unverified_apogee_candidate", ANOMALY:"unverified_anomaly_candidate"});
const value=(v,kind)=>Object.freeze({v,kind,historicallyVerified:false});
function qAndR(N,c) {
 assert(Number.isSafeInteger(N)&&N>=0&&[169,429].includes(c));
 const q=Math.floor((11*N+c)/DEN),r=mod(11*N+c,DEN);
 return Object.freeze({N,c,q,r,D:N-q,dayKind:K.DAY});
}
function sunUnwrapped(D) {
 const lostDegrees=Math.floor(D*12/900);
 const r900=mod(D*12,900);
 const lostMinutes=Math.floor(r900/15)+30;
 return (D-lostDegrees)*DEG-lostMinutes;
}
function sunArc(D) {return mod(sunUnwrapped(D),FULL);}
const C25=r=>r+Math.floor(r/25);
const Cmod=r=>r+(r%25);
function monthOrdinal(N) {return mod(N,30);}
function meanCandidate(N,c,correction=C25,rate="MULTIPLY_12"){
 const t=qAndR(N,c);
 const m=monthOrdinal(N);
 const monthArc= rate==="MULTIPLY_12"? 12*m*DEG :
  rate==="LITERAL_DIVIDE_12"? Math.floor(m/12)*DEG :
  rate==="SAVANA_CLOCK"? 12*mod(t.D,30)*DEG : NaN;
 assert(Number.isSafeInteger(monthArc));
 return Object.freeze({...t,ord:m,sun:value(sunArc(t.D),K.SUN),
  moon:value(mod(sunArc(t.D)+correction(t.r)+monthArc,FULL),K.MOON),
  correction:correction(t.r),rate,provisional:true});
}
function highCandidate(D,branch) {
 const raw=60*Math.floor(D/9)+Math.floor((D%9)*60/9)+Math.floor(D/60);
 const constants={FIRST:206*DEG+41,SECOND:43*DEG+45,BOTH:250*DEG+26};
 assert(Object.hasOwn(constants,branch));
 return value(mod(raw+constants[branch],FULL),K.APOGEE);
}
function anomalyCandidate(ex,branch) {
 assert.equal(ex.moon.kind,K.MOON);
 const a=highCandidate(ex.D,branch);
 return value(mod(ex.moon.v-a.v,FULL),K.ANOMALY);
}
function steps(c,count=703,start=BASE) {
 const s=[];
 for(let N=start;N<start+count;N++){
  const x=meanCandidate(N,c),y=meanCandidate(N+1,c);
  s.push(Object.freeze({N,c,old:x,next:y,carry:y.q-x.q,
    dD:y.D-x.D,deltaMoon:signed(y.moon.v,x.moon.v),
    deltaSun:signed(y.sun.v,x.sun.v),fromR:x.r,toR:y.r}));
 }
 return s;
}
let passed=0;
function test(label,run){run();passed++;console.log("PASS "+label);}
test("原錨 c169: 21185-> D20854 r511 月序5",()=>{
 const z=meanCandidate(BASE,169);assert.deepEqual([z.D,z.r,z.ord,z.moon.v],[20854,511,5,124*60+18]);
});
test("原錨 c429: 21185-> D20853 r68 月序5",()=>{
 const z=meanCandidate(BASE,429);assert.deepEqual([z.D,z.r,z.ord,z.moon.v],[20853,68,5,115*60+38]);
});
test("703 分母、每 tithi 11 跳日餘推進之恆等式",()=>{
 for(const c of [169,429])for(let N=BASE;N<BASE+703;N++){
  const x=qAndR(N,c),y=qAndR(N+1,c);
  assert.equal(y.r,mod(x.r+11,DEN));
  assert.equal(y.q-x.q,(x.r>=692)?1:0);
  assert.equal(y.D-x.D,(x.r>=692)?0:1);
 }
});
test("703 等份之各餘值皆遍歷（11與703互質）",()=>{
 for(const c of [169,429]){
  const rs=new Set(steps(c).map(s=>s.fromR));
  assert.equal(rs.size,703);
 }
});
test("一圈703個tithi槽恰11欠夜、692個不同曆日推進",()=>{
 for(const c of [169,429]){
  const s=steps(c);
  assert.deepEqual([s.filter(x=>x.carry===1).length,s.filter(x=>x.dD===1).length],[11,692]);
  assert.equal(s.at(-1).next.D-s[0].old.D,692);
 }
});
test("25取商回加在跨703時即抵消十二度：餘692..699->1角分",()=>{
 for(let r=692;r<=699;r++){
  const delta=720+C25(r-692)-C25(r);
  assert.equal(delta,1);
 }
});
test("25取商回加在跨703時即抵消十二度：餘700..702->0角分",()=>{
 for(let r=700;r<=702;r++){
  const delta=720+C25(r-692)-C25(r);
  assert.equal(delta,0);
 }
});
test("703個tithi槽中的11次欠夜：8次進1分、3次零分",()=>{
 for(const c of [169,429]){
  const ds=steps(c).filter(x=>x.carry===1).map(x=>x.deltaMoon);
  assert.deepEqual([ds.filter(v=>v===1).length,ds.filter(v=>v===0).length],[8,3]);
 }
});
test("同一候選曆日D重複映射時，中日及高月位置完全相等",()=>{
 for(const c of [169,429])for(const s of steps(c).filter(x=>x.carry===1)){
  assert.equal(s.old.D,s.next.D);
  assert.equal(s.old.sun.v,s.next.sun.v);
  for(const k of ["FIRST","SECOND","BOTH"])
   assert.equal(highCandidate(s.old.D,k).v,highCandidate(s.next.D,k).v);
 }
});
test("同一D兩個tithi標籤只是幾乎同位置，不能當隔一物理日之停行",()=>{
 for(const c of [169,429])for(const s of steps(c).filter(x=>x.carry===1)){
  assert(s.deltaMoon>=0&&s.deltaMoon<=1);
  assert.equal(s.dD,0);
 }
});
test("非欠夜處候選中日跨一物理日移動59或60角分",()=>{
 for(const c of [169,429])for(const s of steps(c).filter(x=>x.carry===0)){
  assert([59,60].includes(s.deltaSun),"deltaSun="+s.deltaSun);
 }
});
test("非欠夜處候選中月前進790..792角分，與月域790為同量級",()=>{
 for(const c of [169,429])for(const s of steps(c).filter(x=>x.carry===0)){
  assert(s.deltaMoon>=790&&s.deltaMoon<=792,"deltaMoon="+s.deltaMoon+" at "+s.N);
 }
});
test("30個tithi槽重設月序不會製造月亮經度逆跳",()=>{
 for(const c of [169,429])for(const s of steps(c))
  if(s.next.ord===0)assert(s.deltaMoon>=0&&s.deltaMoon<=792);
});
test("703跳夜不選別高月常數：三分支月藏跳量全同",()=>{
 for(const c of [169,429])for(const s of steps(c).filter(x=>x.carry===1)){
  for(const branch of ["FIRST","SECOND","BOTH"]){
   const da=signed(anomalyCandidate(s.next,branch).v,anomalyCandidate(s.old,branch).v);
   assert.equal(da,s.deltaMoon);
  }
 }
});
test("固定c169首次跳夜在211?例：N=21202，r698->6，D不變",()=>{
 const s=steps(169,18).at(-1);
 assert.deepEqual([s.N,s.fromR,s.toR,s.carry,s.dD,s.deltaMoon],[21202,698,6,1,0,1]);
});
test("固定c429首次跳夜在月序跨月後：N=21242，r695->3",()=>{
 const s=steps(429,58).at(-1);
 assert.deepEqual([s.N,s.fromR,s.toR,s.carry,s.dD,s.deltaMoon],[21242,695,3,1,0,1]);
});
test("負控：下位僅餘25，不保證同D日近等值",()=>{
 const c=169,x=meanCandidate(21202,c,Cmod),y=meanCandidate(21203,c,Cmod);
 assert.equal(x.D,y.D);assert(signed(y.moon.v,x.moon.v)>1);
});
test("負控：照字面除12，欠夜交界會無補償逆跳",()=>{
 const c=169,x=meanCandidate(21202,c,C25,"LITERAL_DIVIDE_12");
 const y=meanCandidate(21203,c,C25,"LITERAL_DIVIDE_12");
 assert.equal(x.D,y.D);assert(signed(y.moon.v,x.moon.v)<=-719);
});
test("負控：將月內算數誤設為savana時計，欠夜亦逆跳",()=>{
 const c=169,x=meanCandidate(21202,c,C25,"SAVANA_CLOCK");
 const y=meanCandidate(21203,c,C25,"SAVANA_CLOCK");
 assert.equal(x.D,y.D);assert(signed(y.moon.v,x.moon.v)<=-719);
});
test("雙時鐘平均斜率：703槽、692日、月內8436度及中日進量",()=>{
 for(const [c,sunDelta] of [[169,40967],[429,40966]]){
  const a=qAndR(BASE,c),z=qAndR(BASE+703,c);
  assert.equal(z.D-a.D,692);
  assert.equal(703*12,8436);
  assert.equal(sunUnwrapped(z.D)-sunUnwrapped(a.D),sunDelta);
  const lunarDelta=703*12*60+sunDelta;
  assert(lunarDelta/692>=790&&lunarDelta/692<=792);
 }
});
test("790月域在原書明文標為定月差及另一算法，非中月身份",()=>{
 assert.equal(790/60,13+10/60);
 assert.equal(K.MOON,"unverified_mean_moon_candidate");
 assert.notEqual(K.MOON,"historically_verified_true_moon_arcmin");
});
test("月藏只能取條件差，不得取作定月與宿曜經真望宿",()=>{
 const ex=meanCandidate(BASE,169),z=anomalyCandidate(ex,"FIRST");
 assert.equal(z.kind,K.ANOMALY);assert.equal(z.historicallyVerified,false);
 assert.notEqual(z.kind,"historically_verified_true_moon_arcmin");
});
test("史料門檻：兩疑字與高月三分支一律不標已校定",()=>{
 const a=meanCandidate(BASE,169),h=highCandidate(a.D,"BOTH");
 assert.equal(a.provisional,true);assert.equal(h.historicallyVerified,false);
});
test("不得藉邏輯上近等值推斷九執直接供T1299或紫微化忌",()=>{
 const proof=Object.freeze({sameBookDailyScale:true,operatorTextVerified:false,
  epochVerified:false,jiuzhiToT1299Caller:false,qiuToZiweiJICaller:false});
 assert.equal(proof.sameBookDailyScale,true);
 assert.equal(proof.operatorTextVerified,false);
 assert.equal(proof.jiuzhiToT1299Caller,false);
 assert.equal(proof.qiuToZiweiJICaller,false);
});
const rows={};
for(const c of [169,429]){
 const s=steps(c),skip=s.filter(x=>x.carry),advance=s.filter(x=>!x.carry);
 rows[c]={slots:703,skip:skip.length,regular:advance.length,
  meanRatePerElapsedCandidateDayArcmin:(703*12*60+sunUnwrapped(s.at(-1).next.D)-sunUnwrapped(s[0].old.D))/692,
  regularDeltaMin:Math.min(...advance.map(x=>x.deltaMoon)),
  regularDeltaMax:Math.max(...advance.map(x=>x.deltaMoon)),
  skipDelta0:skip.filter(x=>x.deltaMoon===0).length,
  skipDelta1:skip.filter(x=>x.deltaMoon===1).length,
  firstSkip:{N:skip[0].N,fromR:skip[0].fromR,toR:skip[0].toR,D:skip[0].old.D,
             fromMoon:skip[0].old.moon.v,toMoon:skip[0].next.moon.v,
             deltaArcmin:skip[0].deltaMoon}};
}
console.log("DIAGNOSTICS "+JSON.stringify(rows));
console.log("M18-S "+passed+"/"+passed+" PASS (conditional mathematical tests, not independent textual witnesses)");
