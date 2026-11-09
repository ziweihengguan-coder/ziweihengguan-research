// §818-AC. Read-only source lexical audit: 忌 but not requiring 囚 in nearby clauses.
// Counts are candidate windows, NOT ancient rules; no mature four-Hua tables loaded.
const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const chapterDir="M:/webbackup/ziweihengguan/output/shidianguji-sanchen/chapters";
const anchor=/(?:天元忌星|化忌|忌星|忌曜|作忌|為忌|为忌)/g;
const transfer=/(?:承|傳|传|代|替|轉|转|換|换|改|另|借|假|歸|归|讓|让|移|分主|另取|改取|轉取|從.{1,4}取)/g;
const star=/[日月火水木金土孛羅罗計计炁紫微機机梁貞贞廉曲昌巨門门武破貪贪天府同陰阴相殺杀輔辅弼]/g;
let scanned=0, nonempty=0,anchors=0;const hits=[];
function ingest(source,raw){
 scanned++;if(!raw||!raw.trim())return;nonempty++;
 const t=raw.replace(/<pb:[^>]*>/g,"").replace(/[\r\n\t\s¶]/g,"");
 for(const m of t.matchAll(anchor)){
  anchors++;let a=m.index, w=t.slice(Math.max(0,a-85),Math.min(t.length,a+85));
  let op=[...w.matchAll(transfer)].map(x=>({term:x[0],dist:Math.abs(x.index-Math.min(85,a))}));
  if(!op.length)continue;
  let nearest=Math.min(...op.map(x=>x.dist));
  let stars=[...new Set((w.match(star)||[]))];
  let exact=/(?:化忌|忌星|天元忌星)/.test(m[0]);
  let score=(nearest<=18?8:nearest<=40?4:0)+(stars.length>=3?3:0)+(exact?2:0);
  hits.push({source,anchor:m[0],nearest,score,operators:[...new Set(op.filter(x=>x.dist<=55).map(x=>x.term))].slice(0,8),context:t.slice(Math.max(0,a-130),Math.min(t.length,a+165))});
 }
}
for(let v=1;v<=30;v++)ingest("WYG-"+String(v).padStart(2,"0"),fs.readFileSync(path.join(root,"星學大成_Kanripo_"+String(v).padStart(3,"0")+".txt"),"utf8"));
if(fs.existsSync(chapterDir))for(const f of fs.readdirSync(chapterDir).filter(x=>/^\d{3}\.json$/.test(x)).sort()){let d=JSON.parse(fs.readFileSync(path.join(chapterDir,f),"utf8"));ingest("三辰-"+f.slice(0,3),d.bodyText||"");}
const uniq=[], seen=new Set();
for(const h of hits.sort((a,b)=>b.score-a.score||a.nearest-b.nearest||a.source.localeCompare(b.source))){
 const key=h.context.replace(/[，。；、\s]/g,"").slice(0,130);if(seen.has(key))continue;seen.add(key);uniq.push(h);
}
console.log(JSON.stringify({scanned,nonempty,anchors,rawHits:hits.length,uniqueWindows:uniq.length,top:uniq.filter(x=>x.nearest<=45).slice(0,60)},null,2));
