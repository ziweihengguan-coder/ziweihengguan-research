'use strict';
// M03: output-table dispatch under the same intermediate 正官干.
// SOURCE ONLY + typed derived controls. Not the AnnualQiu->fixed Hua-Ji algorithm.
// All text witnesses below are the SAME WYG/Kanripo textual lineage.
// No mature Hua-Ji targets, no historical-equivalence claims.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const normalize=s=>s.replace(/\s|¶|\//g,'').replace(/禄/g,'祿');
const v1=normalize(fs.readFileSync(path.join(root,'星學大成_Kanripo_001.txt'),'utf8'));
const v2=normalize(fs.readFileSync(path.join(root,'星學大成_Kanripo_002.txt'),'utf8'));
const counts={sourceAnchors:0,officialStem:0,officialStar:0,officialBranch:0,typedGates:0,collisionControls:0,otherCallerAnchors:0};
const ck=(type,value,msg)=>{assert.ok(value,msg);counts[type]++;};
for(const [doc,s] of [
 [v1,'官星者乃十干官星之祿星'],
 [v1,'甲炁乙水是官星丙羅丁計戊孛成'],
 [v1,'己火庚金辛見木壬隂癸土定功名'],
 [v1,'甲以辛為官辛以炁為祿則甲人用炁為官星'],
 [v1,'論官星貴人歌'],
 [v1,'甲愛金鷄乙愛猴丁猪丙䑕巳寅頭戊尋玉兎庚壬馬'],
 [v1,'辛癸逢蛇官未休'],
 [v1,'如甲以辛為官辛祿在酉是也'],
 [v1,'勲者甲在寅乙在卯丙戊在巳丁巳在午庚在申辛在酉壬在亥癸在子'],
 [v2,'定祿元宫度'],
 [v2,'丁祿午'],
 [v2,'己祿午']
])ck('sourceAnchors',doc.includes(s),'missing source anchor: '+s);
// Ten-year expected outputs below are transcriptions of TWO separate verses,
// not a modern Ji-target table. 官星貴人 contains OCR 巳寅頭 at 己; kept verbatim above.
const stems=[...'甲乙丙丁戊己庚辛壬癸'];
const ring=[...'火孛木金土月水炁計羅'];
const luBranch=[...'寅卯巳午巳午申酉亥子'];
const starVerse=[...'炁水羅計孛火金木月土'];
const branchVerse=[...'酉申子亥卯寅午巳午巳'];
const expectedOfficerStem=[...'辛庚癸壬乙甲丁丙己戊'];
const mod=(a,n)=>((a%n)+n)%n;
const rows=[];
for(let g=0;g<10;g++){
 const h=mod(g+7-2*(g%2),10);
 const star=ring[h],branch=luBranch[h];
 ck('officialStem',stems[h]===expectedOfficerStem[g],'官干 '+stems[g]);
 ck('officialStar',star===starVerse[g],'論官星 '+stems[g]);
 ck('officialBranch',branch===branchVerse[g],'官星貴人 '+stems[g]);
 rows.push({year:stems[g],officialStem:stems[h],oldStar:star,branch});
}
const countBy=(k)=>rows.reduce((a,r)=>(a[r[k]]=(a[r[k]]||0)+1,a),{});
const starCounts=countBy('oldStar'),branchCounts=countBy('branch');
ck('typedGates',Object.keys(starCounts).length===10,'ten unique old-star outputs');
ck('typedGates',Object.keys(branchCounts).length===8,'eight unique branch outputs');
ck('typedGates',rows.every(r=>ring.includes(r.oldStar)&&!ring.includes(r.branch)),'outputs inhabit different namespaces');
ck('typedGates',rows.every(r=>!stems.includes(r.branch)),'no branch treated as officer stem');
ck('collisionControls',rows[6].branch===rows[8].branch&&rows[6].branch==='午','庚壬 both at 午');
ck('collisionControls',rows[7].branch===rows[9].branch&&rows[7].branch==='巳','辛癸 both at 巳');
ck('collisionControls',rows[6].oldStar!==rows[8].oldStar,'庚壬 star output remains distinct');
ck('collisionControls',rows[7].oldStar!==rows[9].oldStar,'辛癸 star output remains distinct');
ck('collisionControls',new Set(rows.map(r=>r.officialStem)).size===10,'the intermediate remains invertible');
// Other clearly specified function callers: record grammar, do not transplant.
// 天嗣: 年干 -> 變曜之化貴; 天廚: example-only 食神干 -> 干祿支.
// Because the latter shows only two examples, NEVER assert a general ten-stem 天廚 formula.
for(const s of [
 '欲推天嗣者即其變曜中化貴者是也',
 '甲食丙丙祿在巳',
 '乙生人逢午乙食丁丁祿居午',
 '十干變曜所以然之理無可稽考'
])ck('otherCallerAnchors',v1.includes(s),'missing specific caller text '+s);
const result={
 study:'M03',status:'PASS: typed official-star/official-branch source audit; Hua-Ji origin OPEN',
 counts,totalChecks:Object.values(counts).reduce((a,b)=>a+b,0),rows,
 method:'Same h(g), alternative lookups depending on explicit named target; two observed outputs only, not a universal dispatch operator',
 negativeControls:{uniqueOldStarOutputs:10,uniqueBranchOutputs:8,branchCollisions:['庚／壬→午','辛／癸→巳'],branchOnlyCannotDecodeAllTenYears:true},
 provenance:'WYG/Kanripo volumes 1 and 2 of the SAME textual lineage. No separately dated pre-1581 source.',
 textualIssues:['卷一祿勳作「丁巳在午」；卷二獨列「丁祿午」「己祿午」；不覆寫原字','卷一官星貴人歌作「巳寅頭」；由十干序與卷二甲祿寅推為己，原字保留'],
 gates:{all_816_817_818_OPEN:true,noSpecificAnnualQiuToNewZiweiCarrier:true,noMatureHuaJiTablesUsed:true}
};
console.log(JSON.stringify(result,null,2));
