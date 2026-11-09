'use strict';
// §818-AD posthoc negative control. Kept SEPARATE from source-only rules.
// Do not tune offsets/mappings after seeing any of these mature outputs.
const assert=require('node:assert/strict');
const {STEMS,out}=require('./ji_818_ad_tuoluo_position_source_only_20261012.js');
// Previously sealed G0 maturity targets (NOT inputs to source-only script).
const G0=['太陽','太陰','廉貞','巨門','天機','文曲','天同','文昌','武曲','貪狼'];
const oldQiu=['計','羅','火','孛','木','金','土','月','水','炁']; // §814 old F
let n=0;
const check=(condition,label)=>{assert.ok(condition,label);n++;};
check(STEMS.length===10&&G0.length===10&&oldQiu.length===10,'ten input stems');
const carrierMatches=out.filter((r,i)=>r.tuoMingzhu===G0[i]).map(r=>r.g);
check(JSON.stringify(carrierMatches)===JSON.stringify(['丙']),'hypothetical fixed Mingzhu(Tuo-branch) matches G0 only at 丙');
check(out[2].tuo===out[4].tuo&&G0[2]!==G0[4],'same 陀支 in 丙戊, different fixed 忌曜');
check(out[3].tuo===out[5].tuo&&G0[3]!==G0[5],'same 陀支 in 丁己, different fixed 忌曜');
const parity=i=>i%2===0?'陽':'陰';
check(parity(2)===parity(4)&&parity(3)===parity(5),'yin-yang alone cannot disambiguate these pairs');
check(new Set(out.map(r=>r.tuo)).size===8&&new Set(G0).size===10,'8 branches cannot injectively encode 10 distinct target stars');
check(new Set(out.map(r=>r.tuo+':'+r.tuoPalaceStem)).size===10,'retaining five-tiger palace stem removes those specific raw-position collisions');
check(G0[9]==='貪狼'&&oldQiu[9]==='炁'&&out[9].tuo==='亥','癸 negative gate: 囚炁, 陀亥, 固定貪狼 remain distinct');
check(out[9].tuoMingzhu!==G0[9],'癸 陀亥→命主巨門 is not 貪狼');
check(out[0].tuoMingzhu!==G0[0],'甲 陀丑→命主巨門 is not 太陽');
console.log('POSTHOC '+n+'/'+n+' negative-control assertions PASS');
console.log('G0 matches under the SPECULATIVE operator 命主(陀羅支): '+carrierMatches.length+'/10',carrierMatches);
console.log('A source-level annual-Qiu-to-annual-HuaJi caller is STILL MISSING; the 10 distinct (branch,stem) pairs are not a formula.');
