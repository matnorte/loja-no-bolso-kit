(function(){
  "use strict";
  var WA = '5511977770000';
  var BASE = "https://wa.me/" + WA + "?text=";
  var SHOP = 'Cantina do Beco';
  var PRODUCTS = [
    { id:'bowl', name:'Bowl da casa', cat:'almoco', price:42, desc:'Base + proteína + greens. Montagem do dia.', img:'img/p1.jpg', tag:'Almoço' },
    { id:'pizza', name:'Pizza forno a lenha', cat:'almoco', price:58, desc:'Massa fina, molho da casa. Fatia ou inteira.', img:'img/p2.jpg', tag:'Almoço' },
    { id:'burger', name:'Burger smash', cat:'lanches', price:36, desc:'Blend 140g, queijo, picles, molho.', img:'img/p3.jpg', tag:'Lanche' },
    { id:'drink', name:'Drink da casa', cat:'bebidas', price:28, desc:'Autor da semana. Pergunte no zap.', img:'img/p4.jpg', tag:'Bebida' },
    { id:'doce', name:'Sobremesa', cat:'doces', price:22, desc:'Doce do dia — pergunta disponibilidade.', img:'img/p5.jpg', tag:'Doce' },
    { id:'prato', name:'Prato executivo', cat:'almoco', price:39, desc:'Proteína + guarnições. Almoço corrido.', img:'img/p6.jpg', tag:'Almoço' },
    { id:'hero', name:'Mesa completa', cat:'almoco', price:120, desc:'Sugestão pra 2 pessoas (demo).', img:'img/hero.jpg', tag:'Combo' }
  ];
  var CATS = ['todas', 'almoco', 'lanches', 'bebidas', 'doces'];
  var LABELS = {'todas': 'Tudo', 'almoco': 'Almoço', 'lanches': 'Lanches', 'bebidas': 'Bebidas', 'doces': 'Doces'};
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