function unfold(text){return text.replace(/\r?\n[ \t]/g,"")}
function unesc(s=""){return s.replace(/\\n/gi,"\n").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}
function parseDate(v){
  v=(v||"").trim();
  if(/^\d{8}$/.test(v))return{date:`${v.slice(0,4)}-${v.slice(4,6)}-${v.slice(6,8)}`,time:""};
  const m=v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?Z?$/);
  if(m)return{date:`${m[1]}-${m[2]}-${m[3]}`,time:`${m[4]}:${m[5]}`};
  return null;
}
function parseICS(text){
  const out=[];
  for(const raw of unfold(text).split("BEGIN:VEVENT").slice(1)){
    const lines=(raw.split("END:VEVENT")[0]||"").split(/\r?\n/);let title="Événement",location="",start=null,end=null;
    for(const line of lines){const i=line.indexOf(":");if(i<0)continue;const k=line.slice(0,i).toUpperCase(),v=line.slice(i+1);if(k.startsWith("SUMMARY"))title=unesc(v)||"Événement";else if(k.startsWith("LOCATION"))location=unesc(v);else if(k.startsWith("DTSTART"))start=parseDate(v);else if(k.startsWith("DTEND"))end=parseDate(v)}
    if(start)out.push({date:start.date,start:start.time,end:end?.time||"",title,location});
  }
  return out;
}
export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"POST only"});
  const {url}=req.body||{};if(!url||!/^https:\/\//i.test(url))return res.status(400).json({error:"URL HTTPS requise"});
  try{const r=await fetch(url,{headers:{"User-Agent":"CoordoV2","Accept":"text/calendar,text/plain,*/*"}});if(!r.ok)return res.status(r.status).json({error:"Calendrier inaccessible"});return res.status(200).json({events:parseICS(await r.text())})}
  catch(e){return res.status(500).json({error:"Synchronisation impossible"})}
}
