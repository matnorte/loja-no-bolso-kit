(function () {
  "use strict";

  // Demo store WA (fictício da loja-modelo). Troque pelo da cliente depois.
  var WA = "5521999000000";
  var waURL = function (msg) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
  };

  var PRODUCTS = [
    { id: "1", name: "Vestido linho areia", cat: "vestidos", price: 289, tag: "Novo", desc: "Corte reto, alças finas. Leve e com caimento limpo.", img: "img/p1.jpg", imgW: "img/p1.webp" },
    { id: "2", name: "Camisa off-white", cat: "basics", price: 179, tag: "Básico", desc: "Oversized com botão discreto. Dia a dia no Centro.", img: "img/p2.jpg", imgW: "img/p2.webp" },
    { id: "3", name: "Jaqueta couro soft", cat: "casacos", price: 459, tag: "Destaque", desc: "Caimento curto, zíper limpo. Meia-estação.", img: "img/p3.jpg", imgW: "img/p3.webp" },
    { id: "4", name: "Blazer oliva", cat: "casacos", price: 329, tag: "Peça", desc: "Ombro natural, estrutura leve. Trabalho sem farda.", img: "img/p4.jpg", imgW: "img/p4.webp" },
    { id: "5", name: "Tricot creme", cat: "basics", price: 199, tag: "Novo", desc: "Fio fino para sobrepor. Noite fria sem volume.", img: "img/p5.jpg", imgW: "img/p5.webp" },
    { id: "6", name: "Bolsa caramelo", cat: "acessorios", price: 289, tag: "Acessório", desc: "Alça média, uso diário. Couro na cor mel.", img: "img/p6.jpg", imgW: "img/p6.webp" },
    { id: "7", name: "Scarpin nude", cat: "acessorios", price: 249, tag: "Acessório", desc: "Salto médio, bico fino. Coringa de look.", img: "img/p7.jpg", imgW: "img/p7.webp" },
    { id: "8", name: "Calça wide barro", cat: "basics", price: 249, tag: "Peça", desc: "Perna ampla, cintura confortável. Cor mineral.", img: "img/p8.jpg", imgW: "img/p8.webp" }
  ];

  var CATS = [
    { id: "todas", label: "Tudo" },
    { id: "vestidos", label: "Vestidos" },
    { id: "casacos", label: "Casacos" },
    { id: "basics", label: "Basics" },
    { id: "acessorios", label: "Acessórios" }
  ];

  var state = { cat: "todas" };

  var el = {
    filters: document.getElementById("filters"),
    grid: document.getElementById("grid"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    sheet: document.getElementById("sheet"),
    sImg: document.getElementById("sImg"),
    sTag: document.getElementById("sTag"),
    sTitle: document.getElementById("sTitle"),
    sPrice: document.getElementById("sPrice"),
    sDesc: document.getElementById("sDesc"),
    sWa: document.getElementById("sWa"),
    waTop: document.getElementById("waTop"),
    waHero: document.getElementById("waHero"),
    waContact: document.getElementById("waContact")
  };

  function money(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function list() {
    return PRODUCTS.filter(function (p) {
      return state.cat === "todas" || p.cat === state.cat;
    });
  }

  function renderFilters() {
    el.filters.innerHTML = "";
    CATS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (state.cat === c.id ? " on" : "");
      b.textContent = c.label;
      b.addEventListener("click", function () {
        state.cat = c.id;
        renderFilters();
        renderGrid();
      });
      el.filters.appendChild(b);
    });
  }

  function renderGrid() {
    var items = list();
    el.grid.innerHTML = "";
    el.count.textContent = items.length + (items.length === 1 ? " peça" : " peças");
    el.empty.hidden = items.length > 0;
    items.forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.innerHTML =
        '<div class="card-media">' +
        '<picture>' +
        (p.imgW ? '<source srcset="' + p.imgW + '" type="image/webp" />' : "") +
        '<img src="' + p.img + '" alt="" width="600" height="800" loading="lazy" />' +
        "</picture></div>" +
        '<p class="card-name">' + p.name + "</p>" +
        '<p class="card-price">' + money(p.price) + "</p>";
      btn.addEventListener("click", function () { openSheet(p); });
      el.grid.appendChild(btn);
    });
  }

  function openSheet(p) {
    el.sImg.src = p.img;
    el.sImg.alt = p.name;
    el.sTag.textContent = p.tag;
    el.sTitle.textContent = p.name;
    el.sPrice.textContent = money(p.price);
    el.sDesc.textContent = p.desc;
    el.sWa.href = waURL("Oi! Vi o catálogo da NARA e quero a peça: " + p.name + " (" + money(p.price) + "). Ainda tem?");
    el.sheet.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    el.sheet.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeSheet();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSheet();
  });

  var hello = waURL("Oi! Vi o catálogo da NARA (Teresópolis) e queria tirar uma dúvida.");
  el.waTop.href = hello;
  el.waHero.href = hello;
  el.waContact.href = hello;

  renderFilters();
  renderGrid();
})();
