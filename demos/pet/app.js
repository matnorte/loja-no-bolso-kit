(function(){
  "use strict";
  var WA = '5511966660000';
  var BASE = "https://wa.me/" + WA + "?text=";
  var SHOP = 'Pet Casa Verde';
  var PRODUCTS = [
    { id:'racao1', name:'Ração premium 15kg', cat:'racao', price:189, desc:'Linha adulta. Consulte sabor/porte.', img:'img/p1.jpg', tag:'Ração' },
    { id:'banho', name:'Banho & tosa completo', cat:'banho', price:95, desc:'Higiene + tosa higiênica. Por porte.', img:'img/p2.jpg', tag:'Serviço' },
    { id:'passeio', name:'Kit passeio', cat:'acessorios', price:79, desc:'Guia + peitoral (demo).', img:'img/p3.jpg', tag:'Acessório' },
    { id:'pet', name:'Cuidados diários', cat:'acessorios', price:49, desc:'Itens de higiene e conforto.', img:'img/p4.jpg', tag:'Acessório' },
    { id:'banho2', name:'Spa pet', cat:'banho', price:130, desc:'Banho + hidratação + perfume pet.', img:'img/p5.jpg', tag:'Serviço' },
    { id:'dog', name:'Cãezinhos felizes', cat:'acessorios', price:39, desc:'Brinquedo resistente (demo).', img:'img/p6.jpg', tag:'Brinquedo' },
    { id:'hero', name:'Combo boas-vindas', cat:'racao', price:159, desc:'Ração + brinde higiene (promo demo).', img:'img/hero.jpg', tag:'Combo' }
  ];
  var CATS = ['todas', 'racao', 'banho', 'acessorios'];
  var LABELS = {'todas': 'Tudo', 'racao': 'Ração', 'banho': 'Banho & tosa', 'acessorios': 'Acessórios'};
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