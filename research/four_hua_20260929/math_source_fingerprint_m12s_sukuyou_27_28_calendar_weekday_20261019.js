"use strict";
/**
 * M12-S | Sukuyou T1299: 28-day lookup vs 27 full-moon day,
 * 7 weekday joint cycles and 12 season-name anchors.
 * Reads M10's manually transcribed 360-cell fixture (not an OCR/source hash).
 * T1299/1 https://deerpark.app/cbeta/T1299/1 lines 60-143;
 * T1299/2 https://deerpark.app/cbeta/T1299/2 lines 96-108,314-335;
 * JiuZhi https://ctext.org/wiki.pl?chapter=115572&if=gb
 */
const assert=require("node:assert/strict");
const fs=require("node:fs"), path=require("node:path");
const mod=(x,n)=>(x%n+n)%n;
const m10=fs.readFileSync(path.join(__dirname,"math_source_fingerprint_m10_t1299_calendar_adapter_20261019.js"),"utf8");
const block=m10.match(/const rows=\[\s*([\s\S]*?)\n\];/);
assert(block,"Missing M10 fixture; do not reconstruct silently");
const rows=[...block[1].matchAll(/"([\u3400-\u9FFF]{12})"/gu)].map(x=>[...x[1]]);
const lodges28=[..."虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫角亢氐房心尾箕斗牛女"];
const lodges27=lodges28.filter(x=>x!=="牛");
const index=(m,d)=>30*(m-1)+d-1;
const calendar28=(m,d)=>lodges28[mod(index(m,d),28)];
const day27=(w,d)=>lodges27[mod(lodges27.indexOf(w)+d-15,27)];
const natal27=(w,d)=>lodges27[mod(lodges27.indexOf(w)+d+12,27)];
const pairCount=(n,days,phase=0)=>{
 const all=new Set();
 for(let t=0;t<days;t++)all.add(mod(t+phase,n)+"/"+t%7);
 return all.size;
};
let checks=0;
function check(name,fn){fn();checks++;console.log("PASS "+name);}
check("M10 fixture shape and 28/27 inventory",()=>{
 assert.equal(rows.length,30);
 assert(rows.every(row=>row.length===12));
 assert.equal(new Set(lodges28).size,28);
 assert.equal(new Set(lodges27).size,27);
});
let cells=0;
check("Serial day-index formula reproduces all 360 M10 cells",()=>{
 for(let m=1;m<=12;m++)for(let d=1;d<=30;d++){
  assert.equal(calendar28(m,d),rows[d-1][m-1],"m"+m+"d"+d);cells++;
 }
 assert.equal(cells,360);
});
check("30 mod 28 equals 2: formula equivalence across full table",()=>{
 assert.equal(30%28,2);
 for(let m=1;m<=12;m++)for(let d=1;d<=30;d++)
  assert.equal(mod(index(m,d),28),mod(2*(m-1)+d-1,28));
});
check("11 month boundaries advance exactly one 28-cycle lodge",()=>{
 for(let m=1;m<12;m++){
  assert.equal(index(m+1,1),index(m,30)+1);
  const prev=lodges28.indexOf(calendar28(m,30));
  assert.equal(lodges28[mod(prev+1,28)],calendar28(m+1,1));
 }
});
check("Year end resets table rather than continuing same 28-cycle",()=>{
 assert.equal(360%28,24);
 assert.equal(calendar28(1,1),"虛");
 assert.equal(lodges28[360%28],"箕");
 assert.notEqual(lodges28[360%28],calendar28(1,1));
});
check("Season-name 12 anchors: 8x2+4x3=28, 9x2+3x3=27",()=>{
 const names=[..."翼角氐心箕女室婁昴觜鬼星"];
 assert.equal(names.length,12);
 const shifts=(arr)=>names.map((x,i)=>mod(arr.indexOf(names[(i+1)%12])-arr.indexOf(x),arr.length));
 const a=shifts(lodges28),b=shifts(lodges27);
 assert.equal(a.reduce((s,x)=>s+x,0),28);
 assert.equal(b.reduce((s,x)=>s+x,0),27);
 assert.equal(a.filter(x=>x===2).length,8);
 assert.equal(a.filter(x=>x===3).length,4);
 assert.equal(b.filter(x=>x===2).length,9);
 assert.equal(b.filter(x=>x===3).length,3);
 console.log("  seasonal shift arrays: 28="+a.join(",")+"; 27="+b.join(","));
});
check("27 fullmoon forward/back vs +13 natal method: 27x30 identical",()=>{
 let num=0;
 for(const w of lodges27)for(let d=1;d<=30;d++){
  assert.equal(day27(w,d),natal27(w,d));num++;
 }
 assert.equal(num,810);
 assert.equal(day27("角",14),"軫");
 assert.equal(day27("角",15),"角");
 assert.equal(day27("角",16),"亢");
 assert.equal(day27("角",17),"氐");
});
check("Seven weekday x mansion states: 27 gives 189; 28 locks to 28",()=>{
 for(let phase=0;phase<28;phase++){
  assert.equal(pairCount(27,189,phase),189);
  assert.equal(pairCount(28,189,phase),28);
 }
 assert.equal(pairCount(27,188),188);
 assert.equal(pairCount(28,28),28);
});
check("At one given weekday, 28-cycle reaches 4 lodges; 27 reaches all 27",()=>{
 for(let w=0;w<7;w++){
  const a=new Set(),b=new Set();
  for(let t=w;t<189;t+=7){a.add(t%28);b.add(t%27);}
  assert.equal(a.size,4);assert.equal(b.size,27);
 }
});
check("T1299 sun曜+軫 and sun曜+尾 incompatible with one uninterrupted 28+7 phase",()=>{
 const a=lodges28.indexOf("軫"),b=lodges28.indexOf("尾");
 assert.equal(a,17);assert.equal(b,23);
 assert.notEqual(a%7,b%7);
 const reachable=new Set();
 for(let t=0;t<189;t+=7)reachable.add(lodges27[t%27]);
 assert(reachable.has("軫")&&reachable.has("尾"));
});
check("No globally successor-preserving map Z28 to Z27",()=>{
 assert.equal(28%27,1);
 assert.notEqual(28%27,0);
});
check("A hypothetical 30-day 27-cycle month differs from seasonal monthly names",()=>{
 assert.equal(30%27,3);
 const names=[..."翼角氐心箕女室婁昴觜鬼星"];
 const shifts=names.map((x,i)=>mod(lodges27.indexOf(names[(i+1)%12])-lodges27.indexOf(x),27));
 assert(shifts.includes(2)&&shifts.includes(3));
});
check("九執曆 ideal 30d with 欠夜/閏 correction is a distinct output type",()=>{
 const j={ideal:30,smallMonth:"欠夜",intercalation:"閏月",output:"積日",epoch:"明慶二年丁巳歲二月一日"};
 const s={ideal:30,smallMonth:null,intercalation:null,output:"28宿月建表",epoch:"未定"};
 assert.equal(j.ideal,s.ideal);assert.notEqual(j.output,s.output);
 assert.notEqual(j.epoch,s.epoch);
 assert(j.smallMonth&&j.intercalation);
});
console.log("M12-S RESULT "+checks+"/"+checks+" PASS; "+cells+"/"+cells+" existing M10 fixture cells; 810 27-lodge method pairs; 189 vs 28 idealized joint states; historical 28->27 caller NOT ESTABLISHED.");
