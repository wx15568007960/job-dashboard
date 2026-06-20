// Usage: node build.js <path-to-.dash_data.js>   (merges today's JOBS into ./data.json)
const fs=require('fs'),path=require('path');
const dataFile=process.argv[2];
const raw=fs.readFileSync(dataFile,'utf8');
const META=eval('('+raw.match(/META\s*=\s*(\{[\s\S]*?\})\s*;/)[1]+')');
const JOBS=eval('('+raw.match(/JOBS\s*=\s*(\[[\s\S]*\])\s*;?/)[1]+')');
const today=(META&&META.generated)||new Date().toISOString().slice(0,10);
const p=path.join(__dirname,'data.json');
let store={jobs:[]};
if(fs.existsSync(p)){try{store=JSON.parse(fs.readFileSync(p,'utf8'))||{jobs:[]}}catch(e){store={jobs:[]}}}
if(!Array.isArray(store.jobs))store.jobs=[];
const FIELDS=['score','grade','title','company','category','location','kanto','employ','salary','visa','visaNote','innov','source','url','bd','note','deadline'];
const idx={}; store.jobs.forEach(j=>idx[(j.company||'')+'||'+(j.title||'')]=j);
let added=0,updated=0;
JOBS.forEach(j=>{const k=(j.company||'')+'||'+(j.title||'');
 if(idx[k]){const e=idx[k]; if(e.lastSeen!==today)e.seenCount=(e.seenCount||1)+1; e.lastSeen=today;delete e.expired;
   FIELDS.forEach(f=>{if(j[f]!==undefined)e[f]=j[f]}); updated++;}
 else{const e=Object.assign({},j,{firstSeen:today,lastSeen:today,seenCount:1}); store.jobs.push(e); idx[k]=e; added++;}});
store.generated=today; store.updatedAt=new Date().toISOString(); store.total=store.jobs.length;
store.jobs.sort((a,b)=>(b.firstSeen||'').localeCompare(a.firstSeen||'')||(b.score||0)-(a.score||0));
fs.writeFileSync(p,JSON.stringify(store));
console.log('merge: +'+added+' new, '+updated+' updated, total '+store.jobs.length+' (generated '+today+')');
