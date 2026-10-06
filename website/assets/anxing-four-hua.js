const branches=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const mod=(n,m)=>((n%m)+m)%m;
const groups={zi:['紫微','武曲','廉貞'],sha:['貪狼','七殺','破軍']};

function drawChart(){
  const anchor=document.getElementById('anchor');
  const highlight=document.getElementById('highlight');
  if(!anchor||!highlight)return;
  const z=+anchor.value;
  const f=mod(4-z,12);
  const hl=highlight.value;
  const rows=[
    ...['紫微','天機','太陽','武曲','天同','廉貞'].map((s,i)=>[s,mod(z-[0,1,3,4,5,8][i],12),'zi']),
    ...['天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'].map((s,i)=>[s,mod(f+[0,1,2,3,4,5,6,10][i],12),'fu'])
  ];
  document.querySelectorAll('.palace').forEach(cell=>{
    const n=branches.indexOf(cell.dataset.branch);
    const target=cell.querySelector('.stars');
    target.innerHTML=rows.filter(r=>r[1]===n).map(([s,p,g])=>{
      const extra=hl==='all'?'':(groups[hl].includes(s)?' highlight':' dim');
      return '<span class="star '+g+extra+'">'+s+'</span>';
    }).join('')||'<span class="empty-star">—</span>';
  });
  const state=document.getElementById('chart-state');
  if(state)state.textContent='紫微'+branches[z]+'・天府'+branches[f];
}

const stems=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const jielan=[
['廉貞','破軍','武曲','太陽'],
['天機','天梁','紫微','太陰'],
['天同','天機','文昌','廉貞'],
['太陰','天同','天機','巨門'],
['貪狼','太陰','右弼','天機'],
['武曲','貪狼','天梁','文曲'],
['太陽','武曲','太陰','天同'],
['巨門','太陽','文曲','文昌'],
['天梁','紫微','左輔','武曲'],
['破軍','巨門','太陰','貪狼']
];

function drawVariant(){
  const v=document.getElementById('variant');
  const body=document.querySelector('#variant-table tbody');
  if(!v||!body)return;
  const q=v.value==='quanshu';
  const t=jielan.map(r=>[...r]);
  if(q){t[6][2]='天同';t[6][3]='天相';t[8][2]='天府';}
  body.innerHTML=t.map((r,i)=>'<tr><th>'+stems[i]+'</th>'+r.map((s,j)=>{
    const changed=(i===6&&(j===2||j===3))||(i===8&&j===2);
    return '<td'+(changed?' class="changed"':'')+'>'+s+'</td>';
  }).join('')+'</tr>').join('');
  const state=document.getElementById('variant-state');
  if(state)state.textContent=q?'《全書》：庚科天同・庚忌天相・壬科天府。':'《捷覽》：庚科太陰・庚忌天同・壬科左輔。';
}

document.addEventListener('DOMContentLoaded',()=>{
  const a=document.getElementById('anchor'),h=document.getElementById('highlight'),v=document.getElementById('variant'),p=document.getElementById('print');
  if(a)a.addEventListener('change',drawChart);
  if(h)h.addEventListener('change',drawChart);
  if(v)v.addEventListener('change',drawVariant);
  if(p)p.addEventListener('click',()=>window.print());
  drawChart();drawVariant();
});