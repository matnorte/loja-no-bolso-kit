(function () {
  "use strict";
  var WA = "5521999000000";
  var BASE = "https://wa.me/" + WA + "?text=";

  var PRODUCTS = [
    { id: "vestido-linho", name: "Vestido linho areia", cat: "novidades", price: 289, desc: "Corte reto, alças finas. Leve pro calor da serra e pro ar-condicionado do centro.", img: "img/p1.jpg", tag: "Novo" },
    { id: "camisa-off", name: "Camisa off-white", cat: "pecas", price: 179, desc: "Oversized com botão discreto. Combina com calça wide e jeans.", img: "img/p2.jpg", tag: "Básico" },
    { id: "jaqueta-couro", name: "Jaqueta couro soft", cat: "novidades", price: 459, desc: "Caimento curto, zíper limpo. Peça-coringa de meia-estação.", img: "img/p3.jpg", tag: "Novo" },
    { id: "blazer-oliva", name: "Blazer curto oliva", cat: "pecas", price: 329, desc: "Ombro natural, estrutura leve. Trabalho sem farda.", img: "img/p4.jpg", tag: "Peça" },
    { id: "tricot-creme", name: "Tricot creme fino", cat: "novidades", price: 199, desc: "Fio fino pra sobrepor. Noite fria sem volume.", img: "img/p5.jpg", tag: "Novo" },
    { id: "bolsa-couro", name: "Bolsa couro caramelo", cat: "acessorios", price: 289, desc: "Alça média, compartimento interno. Dia a dia no Centro.", img: "img/p6.jpg", tag: "Acessório" },
    { id: "scarpin", name: "Scarpin nudes", cat: "acessorios", price: 249, desc: "Salto médio, bico fino. Conforto relativo pra cidade.", img: "img/p7.jpg", tag: "Acessório" },
    { id: "calca-wide", name: "Calça wide barro", cat: "pecas", price: 249, desc: "Cintura confortável, perna ampla. Cor mineral.", img: "img/p8.jpg", tag: "Peça" },
    { id: "look-editorial", name: "Look editorial rosa", cat: "novidades", price: 379, desc: "Conjunto leve pra vitrine e evento. Caimento fluido.", img: "img/p9.jpg", tag: "Novo" },
    { id: "casaco-lã", name: "Casaco lã mescla", cat: "pecas", price: 419, desc: "Textura quente, gola limpa. Serra de verdade.", img: "img/p10.jpg", tag: "Peça" },
    { id: "saia-plissada", name: "Saia plissada clara", cat: "pecas", price: 219, desc: "Movimento leve, comprimento midi.", img: "img/p11.jpg", tag: "Peça" },
    { id: "street-denim", name: "Street denim set", cat: "novidades", price: 349, desc: "Camadas jeans + base clara. Visual de rua.", img: "img/p12.jpg", tag: "Novo" }
  ];

  var CATS = ["todas", "novidades", "pecas", "acessorios"];
  var state = { cat: "todas", q: "" };

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

  function money(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function wa(text) {
    return BASE + encodeURIComponent(text);
  }
  function filtered() {
    var q = state.q.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      if (state.cat !== "todas" && p.cat !== state.cat) return false;
      if (!q) return true;
      return (p.name + " " + p.desc + " " + p.tag).toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderChips() {
    var labels = { todas: "Todas", novidades: "Novidades", pecas: "Peças", acessorios: "Acessórios" };
    els.chips.innerHTML = "";
    CATS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (state.cat === c ? " is-on" : "");
      b.textContent = labels[c];
      b.addEventListener("click", function () {
        state.cat = c;
        renderChips();
        renderGrid();
      });
      els.chips.appendChild(b);
    });
  }

  function renderGrid() {
    var list = filtered();
    els.grid.innerHTML = "";
    els.count.textContent = list.length + (list.length === 1 ? " peça" : " peças");
    els.empty.hidden = list.length > 0;
    list.forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.innerHTML =
        '<div class="card-photo"><img src="' + p.img + '" alt="" loading="lazy" width="600" height="800" /></div>' +
        '<p class="card-name">' + p.name + "</p>" +
        '<p class="card-price">' + money(p.price) + "</p>";
      btn.addEventListener("click", function () { openSheet(p); });
      els.grid.appendChild(btn);
    });
  }

  function openSheet(p) {
    els.sheetImg.src = p.img;
    els.sheetImg.alt = p.name;
    els.sheetCat.textContent = p.tag + " · " + p.cat;
    els.sheetTitle.textContent = p.name;
    els.sheetPrice.textContent = money(p.price);
    els.sheetDesc.textContent = p.desc;
    els.sheetWa.href = wa("Oi! Vi o catálogo da NARA e quero saber da peça: " + p.name + " (" + money(p.price) + "). Ainda tem?");
    els.sheet.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeSheet() {
    els.sheet.hidden = true;
    document.body.style.overflow = "";
  }

  els.btnSearch.addEventListener("click", function () {
    var open = els.searchBar.hidden;
    els.searchBar.hidden = !open;
    els.btnSearch.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) els.q.focus();
  });
  els.q.addEventListener("input", function () {
    state.q = els.q.value || "";
    renderGrid();
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeSheet();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSheet();
  });

  var greet = wa("Oi! Vi o catálogo da NARA (Centro · Teresópolis) e queria tirar uma dúvida.");
  els.waDock.href = greet;
  els.waHero.href = greet;

  renderChips();
  renderGrid();
})();
