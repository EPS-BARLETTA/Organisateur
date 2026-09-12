"use strict";
(async function(){
  try{
    const response=await fetch('/js/app.js',{cache:'no-store'});
    if(!response.ok)throw new Error('Impossible de charger le moteur de l’application.');
    let code=await response.text();
    code=code.replace(
      'function detail(id){let t=state.tasks.find(x=>x.id===id);if(!t)return,c=cat(t.category),p=',
      'function detail(id){let t=state.tasks.find(x=>x.id===id);if(!t)return;let c=cat(t.category),p='
    );
    (0,eval)(code);
  }catch(error){
    console.error(error);
    const root=document.getElementById('toastRoot');
    if(root){
      root.innerHTML='<div class="fatal"><strong>Organisateur a rencontré un problème.</strong><span>'+String(error.message||error)+'</span><button onclick="location.reload()">Recharger</button></div>';
    }
  }
})();
