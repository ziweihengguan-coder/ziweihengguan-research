// §818-AA source-only candidate scan, 2026-10-11. No mature G0/G1/G2 tables.
const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..");
const sanchenDir = "M:/webbackup/ziweihengguan/output/shidianguji-sanchen/chapters";
const stem = /(?:六[甲乙丙丁戊己巳庚辛壬癸]|[甲乙丙丁戊己庚辛壬癸](?:生人|年|人|干)|十干|當年|本年|流年)/g;
const carriers = /(?:太陽|太隂|太陰|紫炁|月孛|羅睺|羅喉|計都|[日月金木水火土孛羅計炁氣])/g;
const sourceQiu = /(?:化囚|為囚|作囚|囚星|天囚|天元忌星|刑囚|囚忌|囚曜)/g;
const verbs = /(?:改[取用為作]|另[取用]|[取假借代承移轉換替傳授讓捨舍歸]|以.{0,4}當|其星|此星|原星|舊星|本星|還|仍|亦|兼|並|并|復|更)/g;
const high = /(?:另取|改取|改用|改為|以.{0,4}代|代之|承之|承其|移之|轉之|換之|取其|以.{0,5}為囚|囚.{0,5}以.{0,6}為)/g;
const tokenize = (str, re) => [...str.matchAll(re)].map(m => m[0]);
const parseWyg = () => {
  const docs = [];
  for(let v=1;v<=30;v++){
    const vol=String(v).padStart(3,"0");
    const filename="星學大成_Kanripo_"+vol+".txt";
    const lines=fs.readFileSync(path.join(base,filename),"utf8").split(/\r?\n/);
    let page="";
    const chunks=[];
    for (let i=0;i<lines.length;i++){
      const tags=lines[i].match(/<pb:[^>]+>/g);
      if(tags)page=tags.at(-1).replace(/<pb:|>/g,"");
      const value=lines[i].replace(/<pb:[^>]+>/g,"").replace(/[¶\s]/g,"");
      if(value)chunks.push({s:value,line:i+1,page});
    }
    // concatenated per source keeping line offset and page attribution
    docs.push({name:filename, chunks});
  }
  return docs;
};
const parseSanchen = () => {
 const docs=[];
 if(!fs.existsSync(sanchenDir))return docs;
 for (const filename of fs.readdirSync(sanchenDir).filter(f=>/^\d{3}\.json$/.test(f)).sort()){
   const json=JSON.parse(fs.readFileSync(path.join(sanchenDir,filename),"utf8"));
   const v=typeof json.bodyText==="string"?json.bodyText:"";
   if(!v.trim())continue;
   const chunks=v.split(/(?<=[。！？；\n])/g).map((s,i)=>({s:s.replace(/\s/g,""),line:i+1,page:"AI-text"})).filter(c=>c.s);
   docs.push({name:"三辰識典/"+filename, chunks});
 }
 return docs;
};
const scan = (docs, label) => {
  const matches=[];
  let qiuAnchors=0, rawCandidates=0;
  for(const d of docs){
    const all=d.chunks.map(x=>x.s).join("");
    const pos=[];
    let cumulative=0;
    d.chunks.forEach(c=>{pos.push(cumulative);cumulative+=c.s.length;});
    const anchorMatches=[...all.matchAll(sourceQiu)];
    qiuAnchors+=anchorMatches.length;
    for(const a of anchorMatches) {
      const center=a.index, start=Math.max(0,center-95), end=Math.min(all.length,center+155);
      const snippet=all.slice(start,end);
      const before=all.slice(Math.max(0,center-130),center);
      const after=all.slice(center+ a[0].length,Math.min(all.length,center+180));
      const v=tokenize(snippet,verbs), h=tokenize(snippet,high), ss=tokenize(snippet,stem), cc=[...new Set(tokenize(snippet,carriers))];
      if (!v.length) continue;
      rawCandidates++;
      const score = Math.min(v.length,7) + 3*Math.min(h.length,3) + 3*!!ss.length +
       2*(cc.length>=2) + 2*!!/化囚|為囚|作囚|天元忌/.test(a[0]) + 
       (/(囚|天元忌).{0,35}(改|代|承|借|換|轉|另取|以.*為)/.test(after)?3:0);
      let lo=0,hi=pos.length;
      while(lo<hi){const mid=(lo+hi)>>1;if(pos[mid]<=center)lo=mid+1;else hi=mid;}
      const c=d.chunks[Math.max(0,lo-1)];
      matches.push({name:d.name,line:c.line,page:c.page,anchor:a[0],score,
        verbs:v.slice(0,12).join(" "),high:h.join(" "),stems:ss.join(" "),carriers:cc.join(""),
        snippet:snippet.replace(/\r?\n/g,"")});
    }
  }
  matches.sort((a,b)=> b.score-a.score || a.name.localeCompare(b.name));
  const seen=new Set(), selected=[];
  for(const c of matches){
    const k=c.name + ":" + Math.floor(c.line/7);
    if(seen.has(k))continue;seen.add(k);
    selected.push(c);if(selected.length>=28)break;
  }
  console.log(JSON.stringify({source:label,docs:docs.length,qiuAnchors,rawCandidates,topDistinctContexts:selected},null,2));
};
scan(parseWyg(),"WYG-30");
scan(parseSanchen(),"Sanchen-201");
