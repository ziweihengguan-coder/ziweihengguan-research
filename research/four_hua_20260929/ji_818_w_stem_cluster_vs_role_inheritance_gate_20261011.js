'use strict';
// §818-W — SOURCE-ONLY: compressed stem lists versus true same-year role transfer.
// This is a negative/grammar-control exercise, NOT a mature 化忌 derivation.
// Run: node research/four_hua_20260929/ji_818_w_stem_cluster_vs_role_inheritance_gate_20261011.js
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const corpus = new Map();
for (let v = 1; v <= 30; v++) {
  corpus.set(v, fs.readFileSync(path.join(root, '星學大成_Kanripo_' + String(v).padStart(3, '0') + '.txt'), 'utf8').split(/\r?\n/));
}
const compact = s => s.replace(/<pb:[^>]*>/g, '').replace(/[　\s¶/]/g, '');
let anchors = 0;
function anchor(v, fragments) {
  const text = compact(corpus.get(v).join(''));
  for (const f of fragments) {
    assert.ok(text.includes(compact(f)), 'Missing source WYG v' + v + ': ' + f);
    anchors++;
  }
}
anchor(2, [
  '六甲人以木為財為福又用以為禄',
  '六戊人以木為囚為煞',
  '如孛在乙人',
  '則為禄主在丁人則為囚'
]);
anchor(11, [
  '六戊六丙生人以火羅為刑囚',
  '主犯囚星以午加未主為刑星所犯',
  '若火羅二星又為刑囚直難'
]);
anchor(12, [
  '六丙六丁生人以火孛為囚以土計為煞',
  '六庚生人以水為禄主',
  '但土在辰申二位混之以木又為囚星尅禄主',
  '若六巳生人以金為田財福星生囚囚星尅命主'
]);
anchor(13, [
  '或以身為刑以命為囚',
  '或以命為刑以身為囚母星亦然'
]);
anchor(26, [
  '如禄星變作刑星',
  '官禄主變作刑星'
]);
anchor(28, [
  '凡流年諸星須詳與命限有用無用切勿以化氣為取舍'
]);
anchor(19, ['癸生人以為囚星']);
anchor(30, ['癸炁過(化囚/也)']);
assert.equal(corpus.size, 30);
// §818-V resolved commentary, §818-S mixed-role and §818-U ambiguity are
// independent controls.  No downstream mature chart/table is read here.
const cases = [
  {id:'W-01', v:2, yearKeys:['甲','戊'], carriers:['木','木'], predicates:['財福禄','囚煞'], kind:'DIFFERENT_YEAR_SAME_CARRIER', isTransfer:false},
  {id:'W-02', v:2, yearKeys:['乙','丁'], carriers:['孛','孛'], predicates:['禄','囚'], kind:'DIFFERENT_YEAR_SAME_CARRIER', isTransfer:false},
  {id:'W-03', v:12, yearKeys:['丙','丁'], carriers:['火','孛'], predicates:['囚','囚'], kind:'MULTI_YEAR_PARALLEL_QIU', isTransfer:false},
  {id:'W-04', v:11, yearKeys:['戊','丙'], carriers:['火','羅'], predicates:['刑囚','刑囚'], kind:'MULTI_YEAR_MIXED_ROLE_AMBIGUOUS', isTransfer:false},
  {id:'W-05', v:13, yearKeys:[], carriers:['身主','命主'], predicates:['刑','囚'], kind:'ALTERNATIVE_ROLE_ASSIGNMENT', isTransfer:false},
  {id:'W-06', v:26, yearKeys:[], carriers:['官禄主'], predicates:['禄','刑'], kind:'SAME_CARRIER_ROLE_SHIFT', isTransfer:false},
  {id:'W-07', v:12, yearKeys:['庚'], carriers:['水','土','木'], predicates:['禄','囚?'], kind:'AMBIGUOUS_SUBJECT_NOT_RESOLVED', isTransfer:false}
];
let typeControls = 0;
for (const item of cases) {
  assert.equal(item.isTransfer, false);
  assert.ok(item.kind !== 'CONFIRMED_SAME_YEAR_CROSS_CARRIER_QIU_TRANSFER');
  typeControls++;
}
assert.deepEqual(cases.find(c=>c.id==='W-03').yearKeys, ['丙','丁']);
typeControls++;
assert.equal(cases.find(c=>c.id==='W-07').kind, 'AMBIGUOUS_SUBJECT_NOT_RESOLVED');
typeControls++;
const sourceQiu = {甲:'計',乙:'羅',丙:'火',丁:'孛',戊:'木',己:'金',庚:'土',辛:'月',壬:'水',癸:'炁'};
assert.equal(sourceQiu['丙'], '火');
assert.equal(sourceQiu['丁'], '孛');
assert.equal(sourceQiu['癸'], '炁');
typeControls += 3;
// Only classify this lexical pattern as a review queue.  It can span quoted
// glosses, concatenate different annual inputs, and include 非十變 "囚" labels.
let candidateWindows=0;
const samples=[];
const doubleStem=/六[甲乙丙丁戊己庚辛壬癸].{0,8}六[甲乙丙丁戊己庚辛壬癸].{0,75}囚/g;
for(const [v,lines] of corpus) {
  for(let i=0; i<lines.length; i++) {
    const window=compact(lines.slice(i,i+4).join(''));
    doubleStem.lastIndex=0;
    if(doubleStem.test(window)) {
      candidateWindows++;
      if(samples.length<12) samples.push({v, startLine:i+1, excerpt:window.slice(0,135)});
    }
  }
}
console.log('SOURCE_ANCHORS '+anchors+'/'+anchors+' PASS (literal WYG strings only)');
console.log('MANUAL_TYPE_CONTROLS '+typeControls+'/'+typeControls+' PASS (strict annotation gates; no generation formula)');
console.log('CORPUS '+JSON.stringify({volumes:corpus.size,doubleStemQiuCandidateWindows:candidateWindows,overlapWarning:true}));
console.log('GRAMMAR_CLASSIFICATION');
for(const c of cases) console.log(JSON.stringify(c));
console.log('CANDIDATE_WINDOW_SAMPLES');
for(const sample of samples) console.log(JSON.stringify(sample));
console.log('OPEN: 0 manually demonstrated same-g annualQiu(A,g) to annualQiu(B,g) caller in these source-anchored examples. This does not establish absence elsewhere.');
console.log('UNCHANGED: §816/§817/§818 OPEN; 癸囚炁→成熟貪狼 still unexplained; pre-1581 independent witness, G0/G1/G2, §810-A and §812-A sealed audits intact.');
