'use strict';
// §818-V: distant coreference across main text, parenthetical glosses,
// explicitly backward-pointing commentary, and a documented inter-volume echo.
// SOURCE-ONLY.  Nothing here computes mature Ziwei 化忌 carriers.
// Run: node research/four_hua_20260929/ji_818_v_interchapter_gloss_coreference_20261010.js
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const volumes = new Map();
for (let v = 1; v <= 30; v++) {
  const filename = path.join(root, '星學大成_Kanripo_' + String(v).padStart(3, '0') + '.txt');
  volumes.set(v, fs.readFileSync(filename, 'utf8').split(/\r?\n/));
}
const compact = s => s.replace(/<pb:[^>]*>/g, '').replace(/[　\s¶/]/g, '');
const qiu = /(?:化囚|為囚|囚星|刑囚|囚忌|天囚|囚煞|囚殺)/;
const backref = /(?:此承上文|承上文|上文|前文|前章|上章|如前|見前|詳見|經云|經曰|舊說|舊説)/;
const pointer = /(?:其|此|彼|之|本|上文|前文|上章|前章|同|亦|又|兼|依|從|從前)/;
const assigning = /(?:變作|變為|化為|又為|亦為|同為|各為|改用|改取|另取|以.*?為|承|取|任|主)/;
// A WYG textual line can contain a page boundary.  Commentary commonly
// begins with fullwidth-indent '(' and spans multiple physical lines.
// Group by the *visible* commentary boundary rather than using 24-character windows.
function unitsOf(v, lines) {
  let page = '', inGloss = false, current = null;
  const out = [];
  const flush = () => { if (current) {out.push(current); current = null;} };
  for (let i=0; i<lines.length; i++) {
    const raw = lines[i];
    const pm = raw.match(/<pb:([^>]+)>/);
    if (pm) page = pm[1];
    const clean = compact(raw);
    if (!clean) continue;
    const startsGloss = /^[\s　]*\(/.test(raw);
    const kind = (inGloss || startsGloss) ? 'GLOSS' : 'BASE';
    if (!current || kind !== current.kind) {
      flush();
      current = {vol:v, kind, start:i+1, end:i+1, page, text:''};
    }
    current.text += clean;
    current.end=i+1;
    if (kind==='GLOSS') {
      inGloss=true;
      // Parenthetical gloss closes at end.  The WYG transcription uses
      // slashes inside printed glosses; '/' is not a new textual identity.
      if (/\)[¶\s]*$/.test(raw)) inGloss=false;
    }
  }
  flush();
  return out;
}
const units = [...volumes].flatMap(([v,lines]) => unitsOf(v,lines));
const pairs = [];
for(let i=1;i<units.length;i++) {
  const before=units[i-1], after=units[i];
  if (before.vol!==after.vol || before.kind!=='BASE' || after.kind!=='GLOSS') continue;
  pairs.push({vol:before.vol, base:before, gloss:after});
}
const qiuPairs = pairs.filter(x => qiu.test(x.base.text) || qiu.test(x.gloss.text));
const sameRoleVocabulary = qiuPairs.filter(x => pointer.test(x.gloss.text) && assigning.test(x.gloss.text));
const backrefs = units.filter(x => x.kind==='GLOSS' && backref.test(x.text));
const quotedQiu = backrefs.filter(x=>qiu.test(x.text));
const glossQiu = units.filter(x=>x.kind==='GLOSS' && qiu.test(x.text));
const baseQiu = units.filter(x=>x.kind==='BASE' && qiu.test(x.text));
// Only fixture text from this corpus is source-anchored; role classifications are manual.
let controls=0;
function anchored(v, parts) {
  const whole=compact(volumes.get(v).join(''));
  for (const fragment of parts) {
    assert.ok(whole.includes(compact(fragment)), 'Missing WYG '+v+': '+fragment);
    controls++;
  }
}
anchored(26,[
  '此以十干化曜言也','官忌囚星之反集','如禄星變作刑星',
  '官禄主變作刑星','一星兩用','一星兩用與孤跡角形句',
  '凶為吉用四句即上文','刑囚徒具文耳'
]);
anchored(13,['經云官怕囚星之反集','福嫌忌曜以相','四餘並刑乃三命遇煞也']);
anchored(12,['六庚生人以水為禄主','但土在辰申二位混之以木又為囚星']);
anchored(11,['六戊生人以木為囚又見水星得時而長木','之囚惡']);
anchored(19,['癸生人以為囚星','此星廟在丑']);
anchored(30,['天元忌星惡曜','癸炁過(化囚/也)']);
anchored(1,['天囚星與疾厄同','紫炁木星為囚星']);
assert.equal(volumes.size,30);
const hasPair = (v,base,gloss) => pairs.some(x=>x.vol===v && x.base.text.includes(compact(base)) && x.gloss.text.includes(compact(gloss)));
assert.ok(hasPair(26,'如禄星變作刑星','官禄主變作刑星'));
controls++;
assert.ok(hasPair(26,'一星兩用','一星兩用與孤跡角形句'));
controls++;
assert.ok(hasPair(26,'所喜者官魁福禄所忌者暗耗刑囚','此以十干化曜言也'));
controls++;
assert.ok(hasPair(26,'刑囚内拱初年必定傷身','凶為吉用四句即上文'));
controls++;
console.log('SOURCE_CONTROLS '+controls+'/'+controls+' PASS (literal witnesses and structural pairings only)');
console.log('CORPUS '+JSON.stringify({volumes:volumes.size,units:units.length,mainUnits:units.filter(x=>x.kind==='BASE').length,glossUnits:units.filter(x=>x.kind==='GLOSS').length,pairs:pairs.length,qiuPairs:qiuPairs.length, qiuBaseUnits:baseQiu.length, qiuGlossUnits:glossQiu.length, pairedPronounVerbWindows:sameRoleVocabulary.length, glossBackrefs:backrefs.length, glossBackrefsWithQiu:quotedQiu.length}));
console.log('PAIR_SAMPLES');
for (const r of sameRoleVocabulary.filter(x=>[11,12,13,26].includes(x.vol)).slice(0,14)) {
 console.log(JSON.stringify({vol:r.vol, baseRange:[r.base.start,r.base.end],glossRange:[r.gloss.start,r.gloss.end],base:r.base.text.slice(0,130),gloss:r.gloss.text.slice(0,200)}));
}
console.log('MANUAL_CLASSIFICATION');
for (const example of [
 {id:'V-01',source:'WYG26, 8a commentary',type:'SAME_CARRIER_ROLE_SHIFT',reason:'祿星變作刑星 is resolved by its gloss as 官祿主變作刑星; one physical carrier and a different functional role, not A囚→B囚'},
 {id:'V-02',source:'WYG26, 13b-14a commentary',type:'ONE_STAR_MULTIFUNCTION',reason:'一星兩用 and notes describe conditional good/bad use of one star'},
 {id:'V-03',source:'WYG26, 14b commentary',type:'GLOSS_BACKREFERENCE',reason:'凶為吉用...即上文 refers to previous evaluation clause, not to a second star receiving annualQiu'},
 {id:'V-04',source:'WYG26, 6a commentary',type:'TEN_STEM_SCOPE_ONLY',reason:'此以十干化曜言也 makes role scope explicit without specifying remounted annualQiu(B)'},
 {id:'V-05',source:'WYG13 vs WYG26',type:'INTERCHAPTER_QUOTATION',reason:'官怕囚星之反集 and 官忌囚星之反集 share a maxim; no new star identity rule'},
 {id:'V-06',source:'WYG12, circa line 410',type:'AMBIGUOUS_ANTECEDENT',reason:'土在辰申...以木又為囚星 has unresolved 土/木 grammatical subject; cannot post-fit'},
 {id:'V-07',source:'WYG30, 化囚也 inline gloss',type:'GLOSS_ROLE_EXPLANATION',reason:'癸炁過(化囚也) specifies same source star 炁, not 貪狼'},
 {id:'V-08',source:'WYG19 紫炁論 plus WYG1 天囚星',type:'SAME_SOURCE_CORPUS_CROSSPASSAGE',reason:'癸炁 remains named 化囚 in multiple loci; no new receiver'}
]) console.log(JSON.stringify(example));
console.log('OPEN: zero manually confirmed annualQiu(A,g)→annualQiu(B,g) transfers; no complete generated formula. 1581, Gui 炁→貪狼, G0/G1/G2, §816/817/818 and all sealed audits unchanged.');
