'use strict';
// M04: Does knowing 官星貴人支位 plus Yin/Yang recover the ten stems?
// Source-fingerprint negative control; not an ancient annual Hua-Ji algorithm.
// Uses only WYG/Kanripo source texts and source-verse transcriptions; no G0/G1/G2.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '..');
const normalize = s => s.replace(/\s|¶|\//g, '').replace(/禄/g, '祿');
const v1 = normalize(fs.readFileSync(path.join(base, '星學大成_Kanripo_001.txt'), 'utf8'));
const v2 = normalize(fs.readFileSync(path.join(base, '星學大成_Kanripo_002.txt'), 'utf8'));
const checks = { textAnchors:0, oldStar:0, oldBranch:0, roleGates:0, informationControls:0, collisionWitnesses:0 };
const test = (kind, condition, note) => { assert.ok(condition, note); checks[kind]++; };
for (const [book, phrase] of [
 [v1, '官星者乃十干官星之祿星'],
 [v1, '甲以辛為官辛以炁為祿則甲人用炁為官星'],
 [v1, '論官星貴人歌'],
 [v1, '如甲以辛為官辛祿在酉是也'],
 [v1, '十干變曜所以然之理無可稽考'],
 [v1, '化囚者皆其梟印'],
 [v1, '欲推天嗣者即其變曜中化貴者是也'],
 [v1, '辛癸逢蛇官未休'],
 [v2, '丁祿午'],
 [v2, '己祿午']
]) test('textAnchors', book.includes(phrase), 'WYG source phrase: ' + phrase);
const stems = [...'甲乙丙丁戊己庚辛壬癸'];
const phases = [...'木木火火土土金金水水'];
const ring = [...'火孛木金土月水炁計羅'];
const stemLuBranch = [...'寅卯巳午巳午申酉亥子'];
const verseStar = [...'炁水羅計孛火金木月土'];
const verseBranch = [...'酉申子亥卯寅午巳午巳'];
const mod = (x, n) => (x % n + n) % n;
const rows = stems.map((g, i) => {
 const h = mod(i + 7 - 2 * (i % 2), 10);
 const row = { year:g, yearYinYang:i%2===0?'陽':'陰', yearPhase:phases[i],
  officer:stems[h], officerYinYang:h%2===0?'陽':'陰', officerPhase:phases[h],
  oldStar:ring[h], officialBranch:stemLuBranch[h] };
 test('oldStar', row.oldStar===verseStar[i], g+' 官星歌');
 test('oldBranch', row.officialBranch===verseBranch[i], g+' 官貴歌');
 return row;
});
const distinct = fields => new Set(rows.map(r => fields.map(f => r[f]).join('|'))).size;
const encode = (r, fields) => fields.map(f => r[f]).join('|');
const keys = {
 branchOnly:['officialBranch'],
 branchPlusYearParity:['officialBranch','yearYinYang'],
 branchPlusOfficerParity:['officialBranch','officerYinYang'],
 branchPlusYearFivePhases:['officialBranch','yearPhase'],
 branchPlusOfficerFivePhases:['officialBranch','officerPhase'],
 officerStem:['officer'],
 oldStar:['oldStar']
};
const cardinalities=Object.fromEntries(Object.entries(keys).map(([name,fields])=>[name,distinct(fields)]));
for (const [name, target] of Object.entries({
 branchOnly:8, branchPlusYearParity:8, branchPlusOfficerParity:8,
 branchPlusYearFivePhases:10, branchPlusOfficerFivePhases:10, officerStem:10, oldStar:10
})) test('informationControls',cardinalities[name]===target,'cardinality '+name);
test('informationControls',rows.length===10,'ten stems');
test('informationControls',new Set(rows.map(r=>r.year)).size===10,'unique source years');
// Collision pairs are positive witnesses to an information-loss impossibility claim.
// Same value of every input feature -> any deterministic mapping must have same output.
for (const [a,b,branch,parity] of [[6,8,'午','陽'],[7,9,'巳','陰']]) {
 const x=rows[a],y=rows[b];
 test('collisionWitnesses',x.officialBranch===branch && y.officialBranch===branch,'branch collision');
 test('collisionWitnesses',x.yearYinYang===parity && y.yearYinYang===parity,'year parity also collides');
 test('collisionWitnesses',x.officerYinYang===y.officerYinYang,'officer parity also collides');
 test('collisionWitnesses',x.yearPhase!==y.yearPhase && x.officerPhase!==y.officerPhase,'five phases distinguish');
 test('collisionWitnesses',x.oldStar!==y.oldStar,'the old-star targets differ');
 test('collisionWitnesses',encode(x,keys.branchPlusYearParity)===encode(y,keys.branchPlusYearParity),'branch + year parity cannot distinguish');
}
// Named callers are *typed*, and absence from this small registry is not historical absence.
const callers={
 '官星':r=>r.oldStar,
 '官星貴人':r=>r.officialBranch
};
test('roleGates',callers['官星'](rows[0])==='炁','甲官星 old star');
test('roleGates',callers['官星貴人'](rows[0])==='酉','甲官貴 branch');
test('roleGates',typeof callers['年度化囚轉成熟化忌']==='undefined','no source-supported Ji caller registered');
test('roleGates',rows.every(r=>!stems.includes(r.officialBranch)),'branch namespace is not ten stems');
test('roleGates',rows.every(r=>ring.includes(r.oldStar)&&!ring.includes(r.officialBranch)),'old-star and branch output types differ');
const collisions = [['庚','壬'],['辛','癸']].map(pair=>({
 years:pair,
 entries:pair.map(g=>rows[stems.indexOf(g)])
}));
console.log(JSON.stringify({
 study:'M04',
 result:'PASS: branch + Yin/Yang is still information-losing; annual Hua-Ji transfer remains OPEN',
 checks,total:Object.values(checks).reduce((a,b)=>a+b,0),
 cardinalities,collisionWitnesses:collisions,
 mathematicalConsequence:'Neither branch alone nor branch with the original/officer YinYang flag can yield ten distinct deterministic outputs. Adding five-phase information distinguishes these records but proves no ancient use of this additional input.',
 historyGate:'Known specific callers name 官星, 官星貴人, 天嗣; none supplies a demonstrated annual Hua-Qiu identity-remount instruction.',
 provenance:'Same WYG/Kanripo textual family, not separate pre-1581 witnesses; no mature Ji target data used.',
 unchanged:'§816 §817 §818 OPEN; Gui-year Qi->TanLang counterexample, G0/G1/G2 branches and all sealed data untouched'
},null,2));
