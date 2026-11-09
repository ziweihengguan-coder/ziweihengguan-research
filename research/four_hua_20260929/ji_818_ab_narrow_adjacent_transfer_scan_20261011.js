// §818-AB rare transitive verbs adjacent to 囚/忌 in primary electronic corpora.
// Search data are candidate windows, not proofs. No G0/G1/G2 use.
const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const chapterDir="M:/webbackup/ziweihengguan/output/shidianguji-sanchen/chapters";
const lexical=/(化囚|囚星|囚曜|天囚|天元忌星|囚忌|刑囚|為囚|作囚)/g;
const verbs=/(?:代勞|代行|代之|以.{1,6}代.{1,6}|替代|另取|改取|改用|轉為|轉作|換為|換作|換掛|以.{1,6}當.{1,4}|借[金木水火土炁羅計孛日月]|假[金木水火土炁羅計孛日月]|借曜|另用|移[金木水火土炁羅計孛日月]|從.{1,6}用|兼為|仍為|亦為|還為|歸[金木水火土炁羅計孛日月])/g;
const rows=[];let totalAnchors=0,docs=0,documentsNonempty=0;
function ingest(name,text,type) {
 docs++;
 if(!text.trim())return;
 documentsNonempty++;
 const clean=type==="wyg"?text.replace(/<pb:[^>]+>/g,"").replace(/[¶\s]/g,""):text.replace(/\s/g,"");
 let matches=[...clean.matchAll(lexical)];totalAnchors+=matches.length;
 for(const m of matches){
    const i=m.index,near=clean.slice(Math.max(0,i-65),Math.min(clean.length,i+65));
    const terms=[...near.matchAll(verbs)];
    if(!terms.length)continue;
    let nearest=Infinity;
    for(const t of terms){let p=Math.max(0,i-65)+t.index;nearest=Math.min(nearest,Math.abs(p-i));}
    if(nearest>60)continue;
    const sentence=clean.slice(Math.max(0,i-115),Math.min(clean.length,i+135));
    rows.push({name,anchor:m[0],nearest,verbs:[...new Set(terms.map(t=>t[0]))].slice(0,8).join("|"),context:sentence});
 }
}
for(let v=1;v<=30;v++){
 const f="星學大成_Kanripo_"+String(v).padStart(3,"0")+".txt";
 ingest("WYG"+v,fs.readFileSync(path.join(root,f),"utf8"),"wyg");
}
if(fs.existsSync(chapterDir)) for(const f of fs.readdirSync(chapterDir).filter(x=>/^\d{3}\.json$/.test(x)).sort()) {
 const d=JSON.parse(fs.readFileSync(path.join(chapterDir,f),"utf8"));
 ingest("三辰"+f.replace(".json",""),typeof d.bodyText==="string"?d.bodyText:"","json");
}
const out=[];const dedup=new Set();
for(const row of rows.sort((a,b)=>a.nearest-b.nearest||a.name.localeCompare(b.name))) {
 const key=row.name+":"+row.context.slice(100,165);
 if(dedup.has(key))continue;
 dedup.add(key);out.push(row);
}
console.log(JSON.stringify({scanned:docs,nonempty:documentsNonempty,anchors:totalAnchors,rawRareWindowHits:rows.length,dedupHits:out.length,closest:out.slice(0,45)},null,2));