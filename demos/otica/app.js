/* Ótica Lume — demo offline Loja no Bolso (nicho ótica) */
(function () {
  "use strict";

  // Número fictício só para montar o link wa.me na demo
  var WA_E164 = "5511955550000";
  var WA_BASE = "https://wa.me/" + WA_E164;
  var SHOP_NAME = "Ótica Lume";

  var PRODUCTS = [
    {
      id: "arma-acetato-preto",
      name: "Armação acetato preto",
      section: "Armações",
      price: 289,
      desc: "Modelo unissex demo. Prova na loja · lentes sob orçamento.",
      colors: ["#0f172a", "#64748b"]
    },
    {
      id: "arma-metal-dourado",
      name: "Armação metal dourado",
      section: "Armações",
      price: 349,
      desc: "Aro fino. Ideal rosto oval (demo ilustrativa).",
      colors: ["#a16207", "#fde68a"]
    },
    {
      id: "arma-redondo-tartaruga",
      name: "Redondo tartaruga",
      section: "Armações",
      price: 319,
      desc: "Acetato com padrão classic. Clip solar opcional.",
      colors: ["#7c2d12", "#fdba74"]
    },
    {
      id: "arma-infantil",
      name: "Armação infantil flex",
      section: "Armações",
      price: 199,
      desc: "Hastes flexíveis. Cores sortidas no balcão.",
      colors: ["#1d4ed8", "#93c5fd"]
    },
    {
      id: "lente-antireflexo",
      name: "Lentes com antirreflexo",
      section: "Lentes",
      price: 420,
      desc: "Par completo (grau sob receita). Prazo demo 5–7 dias.",
      colors: ["#0e7490", "#a5f3fc"]
    },
    {
      id: "lente-blue",
      name: "Lentes filtro luz azul",
      section: "Lentes",
      price: 480,
      desc: "Uso tela / escritório. Combine com armação da loja.",
      colors: ["#1e3a8a", "#bfdbfe"]
    },
    {
      id: "lente-transitions",
      name: "Lentes fotossensíveis",
      section: "Lentes",
      price: 690,
      desc: "Escurece no sol. Orçamento final na receita.",
      colors: ["#312e81", "#c7d2fe"]
    },
    {
      id: "solar-aviador",
      name: "Solar aviador UV400",
      section: "Solar",
      price: 259,
      desc: "Proteção UV demo. Estojo incluso na loja física.",
      colors: ["#422006", "#fbbf24"]
    },
    {
      id: "solar-way",
      name: "Solar espelhado way",
      section: "Solar",
      price: 279,
      desc: "Espelho azul. Unissex (catálogo demo).",
      colors: ["#0c4a6e", "#38bdf8"]
    },
    {
      id: "clip-on",
      name: "Clip-on magnético",
      section: "Solar",
      price: 149,
      desc: "Encaixa em armações compatíveis. Testar na loja.",
      colors: ["#334155", "#94a3b8"]
    },
    {
      id: "limpa-lentes",
      name: "Kit limpa-lentes",
      section: "Acessórios",
      price: 39,
      desc: "Spray + flanela. Manutenção diária.",
      colors: ["#0f766e", "#99f6e4"]
    },
    {
      id: "cordao",
      name: "Cordão / retainer",
      section: "Acessórios",
      price: 29,
      desc: "Segurança no esporte e no dia a dia.",
      colors: ["#4c1d95", "#c4b5fd"]
    },
    {
      id: "estojo-rigido",
      name: "Estojo rígido",
      section: "Acessórios",
      price: 45,
      desc: "Protege armação na bolsa. Cores demo.",
      colors: ["#1e293b", "#cbd5e1"]
    },
    {
      id: "pacote-exame",
      name: "Pacote exame + armação base",
      section: "Pacotes",
      price: 597,
      desc: "Exame (parceiro) + armação entrada + lentes simples — oferta demo loja.",
      colors: ["#1e3a8a", "#93c5fd"]
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
      "Oi, " + SHOP_NAME + "! Vim pelo catálogo *Loja no Bolso* e quero: " +
      p.name +
      " (" +
      brl(p.price) +
      "). Pode me atender?"
    );
  }

  function generalMessage() {
    return "Oi, " + SHOP_NAME + "! Vi o catálogo da ótica e quero prova de armação / orçamento de lentes.";
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

    title.textContent = state.section === "Todos" ? "Catálogo" : state.section;

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
