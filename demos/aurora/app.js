/* Boutique Aurora — demo offline Loja no Bolso */
(function () {
  "use strict";

  // Número fictício só para montar o link wa.me na demo
  var WA_E164 = "5511999990000";
  var WA_BASE = "https://wa.me/" + WA_E164;

  var PRODUCTS = [
    {
      id: "casaco-linho",
      name: "Casaco linho areia",
      section: "Novidades",
      price: 289,
      desc: "Corte reto, forro leve. Serve no ar-condicionado e no fim de tarde.",
      colors: ["#d8c3a5", "#b08968"]
    },
    {
      id: "vestido-midi",
      name: "Vestido midi floral",
      section: "Novidades",
      price: 219,
      desc: "Tecido fluido, estampa exclusiva da coleção Aurora.",
      colors: ["#c97b84", "#f0d5c9"]
    },
    {
      id: "bolsa-couro",
      name: "Bolsa couro caramelo",
      section: "Acessórios",
      price: 349,
      desc: "Alça ajustável, bolso interno. Feita pra o dia a dia.",
      colors: ["#8B5E3C", "#3f2e24"]
    },
    {
      id: "cinto-fivela",
      name: "Cinto fivela ouro fosco",
      section: "Acessórios",
      price: 89,
      desc: "Acabamento fosco, fivela dourada suave.",
      colors: ["#1a1410", "#c6a75e"]
    },
    {
      id: "calca-wide",
      name: "Calça wide leg preta",
      section: "Essenciais",
      price: 199,
      desc: "Cintura alta, caimento alongado. Combina com tudo.",
      colors: ["#1c1917", "#44403c"]
    },
    {
      id: "camisa-branca",
      name: "Camisa tricolline branca",
      section: "Essenciais",
      price: 159,
      desc: "Clássica, fácil de passar, botões perolados.",
      colors: ["#f8fafc", "#e7e5e4"]
    },
    {
      id: "saia-plissada",
      name: "Saia plissada oliva",
      section: "Promoção",
      price: 129,
      desc: "Elástico confortável. De R$ 179 por tempo limitado (demo).",
      colors: ["#556b2f", "#a3b18a"]
    },
    {
      id: "brinco-argola",
      name: "Argola média banho ouro",
      section: "Promoção",
      price: 69,
      desc: "Leve, hipoalergênica na versão demo.",
      colors: ["#d4a017", "#f5e6b8"]
    },
    {
      id: "scarpin",
      name: "Scarpin salto bloco",
      section: "Calçados",
      price: 259,
      desc: "Salto estável 5 cm. Couro sintético premium (demo).",
      colors: ["#7f1d1d", "#1a1410"]
    },
    {
      id: "tenis-off",
      name: "Tênis off-white",
      section: "Calçados",
      price: 279,
      desc: "Solado borracha, cadarço tonal. Street casual.",
      colors: ["#f5f5f4", "#a8a29e"]
    },
    {
      id: "ajuste-barra",
      name: "Ajuste de barra",
      section: "Serviços",
      price: 35,
      desc: "Serviço na loja · retire em 2–3 dias úteis (exemplo).",
      colors: ["#44403c", "#d6d3d1"]
    },
    {
      id: "vale-presente",
      name: "Vale-presente R$ 150",
      section: "Serviços",
      price: 150,
      desc: "Digital ou cartão físico. Ideal pra presente sem erro de tamanho.",
      colors: ["#9a3412", "#ffedd5"]
    }
  ];

  var SECTIONS = ["Todos"].concat(
    PRODUCTS.map(function (p) { return p.section; }).filter(function (s, i, a) {
      return a.indexOf(s) === i;
    })
  );

  var state = { section: "Todos", q: "" };

  function brl(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function waLink(text) {
    return WA_BASE + "?text=" + encodeURIComponent(text);
  }

  function gradient(colors) {
    var c0 = colors[0] || "#ccc";
    var c1 = colors[1] || c0;
    return "linear-gradient(145deg, " + c0 + " 0%, " + c1 + " 100%)";
  }

  function productMessage(p) {
    return (
      "Oi, Boutique Aurora! Vim pelo catálogo *Loja no Bolso* e quero: " +
      p.name +
      " (" +
      brl(p.price) +
      "). Ainda tem?"
    );
  }

  function generalMessage() {
    return "Oi, Boutique Aurora! Vi o catálogo demo e quero saber mais sobre as peças.";
  }

  function matches(p) {
    if (state.section !== "Todos" && p.section !== state.section) return false;
    if (!state.q) return true;
    var hay = (p.name + " " + p.section + " " + p.desc).toLowerCase();
    return hay.indexOf(state.q) !== -1;
  }

  function renderFilters() {
    var el = document.getElementById("filters");
    el.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = sec;
      b.setAttribute("aria-pressed", sec === state.section ? "true" : "false");
      b.addEventListener("click", function () {
        state.section = sec;
        renderFilters();
        renderGrid();
      });
      el.appendChild(b);
    });
  }

  function renderGrid() {
    var grid = document.getElementById("grid");
    var empty = document.getElementById("empty");
    var title = document.getElementById("section-title");
    var list = PRODUCTS.filter(matches);

    title.textContent =
      state.section === "Todos" ? "Catálogo" : state.section;

    grid.innerHTML = "";
    empty.hidden = list.length > 0;

    list.forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.setAttribute("aria-label", p.name + ", " + brl(p.price));

      var art = document.createElement("div");
      art.className = "card-art";
      art.style.background = gradient(p.colors);
      var badge = document.createElement("span");
      badge.textContent = brl(p.price);
      art.appendChild(badge);

      var body = document.createElement("div");
      body.className = "card-body";
      var sec = document.createElement("p");
      sec.className = "sec";
      sec.textContent = p.section;
      var h = document.createElement("h3");
      h.textContent = p.name;
      var price = document.createElement("p");
      price.className = "price";
      price.textContent = brl(p.price);
      body.appendChild(sec);
      body.appendChild(h);
      body.appendChild(price);

      btn.appendChild(art);
      btn.appendChild(body);
      btn.addEventListener("click", function () {
        openItem(p);
      });
      grid.appendChild(btn);
    });
  }

  function openItem(p) {
    var dlg = document.getElementById("dlg-item");
    document.getElementById("dlg-title").textContent = p.name;
    document.getElementById("dlg-price").textContent = brl(p.price);
    document.getElementById("dlg-desc").textContent = p.desc;
    document.getElementById("dlg-swatch").style.background = gradient(p.colors);
    var a = document.getElementById("dlg-wa");
    a.href = waLink(productMessage(p));
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  function bindWaGeneral() {
    var href = waLink(generalMessage());
    var g = document.getElementById("btn-whatsapp-geral");
    var d = document.getElementById("btn-whatsapp-dock");
    g.href = href;
    d.href = href;
    g.target = "_blank";
    d.target = "_blank";
    g.rel = "noopener";
    d.rel = "noopener";
  }

  function bindInfo() {
    var btn = document.getElementById("btn-info");
    var dlg = document.getElementById("dlg-info");
    btn.addEventListener("click", function () {
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    });
  }

  function bindSearch() {
    var input = document.getElementById("q");
    var t = null;
    input.addEventListener("input", function () {
      var v = input.value.trim().toLowerCase();
      window.clearTimeout(t);
      t = window.setTimeout(function () {
        state.q = v;
        renderGrid();
      }, 120);
    });
  }

  bindWaGeneral();
  bindInfo();
  bindSearch();
  renderFilters();
  renderGrid();
})();
