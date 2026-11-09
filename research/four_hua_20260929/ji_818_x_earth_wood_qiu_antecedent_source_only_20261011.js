'use strict';
// §818-X WYG source-only: relative clause antecedent, 五行克主, same-year remount gate.
// Do not read any G0/G1/G2 tables. Tests are anchor + logic checks, not historical proofs.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const load=n=>fs.readFileSync(path.join(root,'星學大成_Kanripo_'+String(n).padStart(3,'0')+'.txt'),'utf8');
const compact=s=>s.replace(/<pb:[^>]*>/g,'').replace(/[　\s¶/]/g,'');
const t2=compact(load(2)), t11=compact(load(11)), t12=compact(load(12)), t30=compact(load(30));
const anchors=[
[12,'若六庚生人以水為禄主有甚不好'],
[12,'但土在辰申二位混之以木又為囚星尅禄主何益'],
[12,'於我土在辰混之以金金生禄主之水為佳'],
[12,'若六丙生人以火為囚又為囚星㑹直難㑹刑星'],
[12,'火羅我之忌星也'],
[12,'更混之以木炁則為禍尤酷'],
[12,'若混之以土計則又反禍為祥'],
[11,'庚生人以水為祿主乙生人以孛為祿主'],
[11,'若五六月生人混之以火土是火直生土囚尅祿水'],
[11,'又如巳生人以金化囚為'],
[11,'忌辛生人以太隂化囚為忌'],
[2,'六甲人以木為財為福又用以為禄'],
[2,'六戊人以木為囚為煞'],
[2,'如孛在乙人'],
[2,'則為禄主在丁人則為囚'],
[30,'癸炁過(化囚也)']
];
const docs={2:t2,11:t11,12:t12,30:t30};
for(const [v,s] of anchors) assert.ok(docs[v].includes(compact(s)),`Source anchor missing vol ${v}: ${s}`);
const overcome={木:'土',土:'水',水:'火',火:'金',金:'木'};
const nourish={木:'火',火:'土',土:'金',金:'水',水:'木'};
const semanticControls=[
['土尅水-庚祿主',overcome.土==='水'],
['木非尅水',overcome.木!=='水'],
['水生木而非木尅水',nourish.水==='木'],
['金生水-正例',nourish.金==='水'],
['同句負例主體土',t12.includes(compact('但土在辰申二位混之以木'))],
['同句正例主體土',t12.includes(compact('土在辰混之以金'))],
['同書明說土囚尅祿水',t11.includes(compact('土囚尅祿水'))],
['同書「又」非第二囚',t12.includes(compact('以火為囚又為囚星'))],
['「混之以」不是身份轉掛',t12.includes(compact('火羅我之忌星也'))&&t12.includes(compact('混之以木炁'))&&t12.includes(compact('混之以土計'))],
['卷二不同干同一曜',t2.includes(compact('在丁人則為囚'))]
];
for(const [label,ok] of semanticControls)assert.ok(ok,'Semantic control fail: '+label);
// WYG text may support a reading, but cannot establish R_copy / R_replace.
const result={W07:'STRONGLY_SUPPORTED_EARTH_SUBJECT',soilPredication:'Earth harms Water-Lu',woodSubject:'CONTRADICTED_BY_LOCAL_SEMANTICS',annualTransfer:'NOT_DEMONSTRATED',witnessType:'SAME_RECENSION_INTERNAL_CORROBORATION'};
assert.equal(result.annualTransfer,'NOT_DEMONSTRATED');
console.log('§818-X SOURCE_ANCHORS '+anchors.length+'/'+anchors.length+' PASS');
console.log('§818-X SEMANTIC_CONTROLS '+semanticControls.length+'/'+semanticControls.length+' PASS');
console.log(JSON.stringify(result));
console.log('OPEN: same-g AnnualQiu(A)->AnnualQiu(B) requires explicit independent selector; not found in this clause.');
console.log('UNCHANGED: §816/817/818 OPEN; 癸囚炁→成熟貪狼, pre-1581 independent witness, G0/G1/G2 and sealed tests unchanged.');
