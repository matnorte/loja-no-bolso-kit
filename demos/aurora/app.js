(function(){
  "use strict";
  var WA = '5511944440000';
  var BASE = "https://wa.me/" + WA + "?text=";
  var SHOP = 'Boutique Aurora';
  var PRODUCTS = [
    { id:'a1', name:'Vestido fluido', cat:'novidades', price:279, desc:'Caimento leve, alça fina.', img:'img/p1.jpg', tag:'Novo' },
    { id:'a2', name:'Camisa off', cat:'pecas', price:169, desc:'Oversized, dia a dia.', img:'img/p2.jpg', tag:'Peça' },
    { id:'a3', name:'Jaqueta', cat:'novidades', price:399, desc:'Meia-estação.', img:'img/p3.jpg', tag:'Novo' },
    { id:'a4', name:'Blazer', cat:'pecas', price:319, desc:'Corte curto.', img:'img/p4.jpg', tag:'Peça' },
    { id:'a5', name:'Tricot', cat:'pecas', price:189, desc:'Camadas leves.', img:'img/p5.jpg', tag:'Peça' },
    { id:'a6', name:'Bolsa', cat:'acessorios', price:259, desc:'Couro caramelo.', img:'img/p6.jpg', tag:'Acessório' },
    { id:'ah', name:'Look vitrine', cat:'novidades', price:349, desc:'Destaque da semana.', img:'img/hero.jpg', tag:'Vitrine' }
  ];
  var CATS = ['todas', 'novidades', 'pecas', 'acessorios'];
  var LABELS = {'todas': 'Todas', 'novidades': 'Novidades', 'pecas': 'Peças', 'acessorios': 'Acessórios'};
  var state = { cat: CATS[0], q: "" };
  var els = {
    chips: document.getElementById("chips"),
    grid: document.getElementById("grid"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    q: document.getElementById("q"),
    searchBar: document.getElementById("searchBar"),
    btnSearch: document.getElementById("btnSearch"),
    sheet: document.getElementById("sheet"),
    sheetImg: document.getElementById("sheetImg"),
    sheetCat: document.getElementById("sheetCat"),
    sheetTitle: document.getElementById("sheetTitle"),
    sheetPrice: document.getElementById("sheetPrice"),
    sheetDesc: document.getElementById("sheetDesc"),
    sheetWa: document.getElementById("sheetWa"),
    waDock: document.getElementById("waDock"),
    waHero: document.getElementById("waHero")
  };
  function money(n){ return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }
  function wa(t){ return BASE + encodeURIComponent(t); }
  function filtered(){
    var q = state.q.trim().toLowerCase();
    return PRODUCTS.filter(function(p){
      if(state.cat !== CATS[0] && p.cat !== state.cat) return false;
      if(!q) return true;
      return (p.name+" "+p.desc+" "+p.tag).toLowerCase().indexOf(q)!==-1;
    });
  }
  function renderChips(){
    els.chips.innerHTML="";
    CATS.forEach(function(c){
      var b=document.createElement("button"); b.type="button";
      b.className="chip"+(state.cat===c?" is-on":"");
      b.textContent=LABELS[c]||c;
      b.onclick=function(){ state.cat=c; renderChips(); renderGrid(); };
      els.chips.appendChild(b);
    });
  }
  function renderGrid(){
    var list=filtered(); els.grid.innerHTML="";
    els.count.textContent=list.length+(list.length===1?" item":" itens");
    els.empty.hidden=list.length>0;
    list.forEach(function(p){
      var btn=document.createElement("button"); btn.type="button"; btn.className="card";
      btn.innerHTML='<div class="card-photo"><img src="'+p.img+'" alt="" loading="lazy" width="600" height="800"/></div><p class="card-name">'+p.name+'</p><p class="card-price">'+money(p.price)+'</p>';
      btn.onclick=function(){ openSheet(p); };
      els.grid.appendChild(btn);
    });
  }
  function openSheet(p){
    els.sheetImg.src=p.img; els.sheetImg.alt=p.name;
    els.sheetCat.textContent=p.tag+" · "+(LABELS[p.cat]||p.cat);
    els.sheetTitle.textContent=p.name; els.sheetPrice.textContent=money(p.price);
    els.sheetDesc.textContent=p.desc;
    els.sheetWa.href=wa("Oi! Vi o catálogo da "+SHOP+" e quero: "+p.name+" ("+money(p.price)+"). Ainda tem?");
    els.sheet.hidden=false; document.body.style.overflow="hidden";
  }
  function closeSheet(){ els.sheet.hidden=true; document.body.style.overflow=""; }
  els.btnSearch.onclick=function(){
    var open=els.searchBar.hidden; els.searchBar.hidden=!open;
    els.btnSearch.setAttribute("aria-expanded", open?"true":"false");
    if(open) els.q.focus();
  };
  els.q.oninput=function(){ state.q=els.q.value||""; renderGrid(); };
  document.onclick=function(e){ if(e.target.closest("[data-close]")) closeSheet(); };
  document.onkeydown=function(e){ if(e.key==="Escape") closeSheet(); };
  var greet=wa("Oi! Vi o catálogo da "+SHOP+" e queria tirar uma dúvida.");
  els.waDock.href=greet; els.waHero.href=greet;
  renderChips(); renderGrid();
})();