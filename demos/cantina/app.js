/* Cantina do Beco — demo offline Loja no Bolso (nicho food / cardápio QR) */
(function () {
  "use strict";

  // Número fictício só para montar o link wa.me na demo
  var WA_E164 = "5511977770000";
  var WA_BASE = "https://wa.me/" + WA_E164;
  var SHOP_NAME = "Cantina do Beco";

  var PRODUCTS = [
    {
      id: "pf-bife",
      name: "PF bife acebolado",
      section: "Almoço",
      price: 28,
      desc: "Arroz, feijão, bife, ovo e salada. Porção generosa (demo).",
      colors: ["#9a3412", "#fbbf24"]
    },
    {
      id: "pf-frango",
      name: "PF frango grelhado",
      section: "Almoço",
      price: 26,
      desc: "Frango, legumes e arroz. Opção mais leve do dia.",
      colors: ["#b45309", "#fde68a"]
    },
    {
      id: "executivo",
      name: "Executivo do dia",
      section: "Almoço",
      price: 32,
      desc: "Prato rotativo + sobremesa pequena. Pergunte no balcão o do dia.",
      colors: ["#7c2d12", "#fdba74"]
    },
    {
      id: "feijoada",
      name: "Feijoada (sáb)",
      section: "Almoço",
      price: 42,
      desc: "Completa com acompanhamentos. Só aos sábados (demo).",
      colors: ["#44403c", "#a8a29e"]
    },
    {
      id: "x-tudo",
      name: "X-Tudo da casa",
      section: "Lanches",
      price: 24,
      desc: "Burger artesanal, queijo, bacon, salada e molho da casa.",
      colors: ["#c2410c", "#fcd34d"]
    },
    {
      id: "misto",
      name: "Misto quente",
      section: "Lanches",
      price: 14,
      desc: "Pão na chapa, queijo e presunto. Rápido pro café da tarde.",
      colors: ["#a16207", "#fef3c7"]
    },
    {
      id: "batata",
      name: "Porção batata frita",
      section: "Lanches",
      price: 18,
      desc: "Serve 2. Adicional cheddar/bacon sob consulta.",
      colors: ["#ca8a04", "#fde047"]
    },
    {
      id: "espresso",
      name: "Espresso",
      section: "Bebidas",
      price: 6,
      desc: "Curto e forte. Duplo +R$3 (demo).",
      colors: ["#292524", "#a8a29e"]
    },
    {
      id: "suco",
      name: "Suco natural 400ml",
      section: "Bebidas",
      price: 12,
      desc: "Laranja, limão ou maracujá conforme o dia.",
      colors: ["#ea580c", "#fdba74"]
    },
    {
      id: "refri",
      name: "Refrigerante lata",
      section: "Bebidas",
      price: 7,
      desc: "Opções geladas no balcão.",
      colors: ["#0e7490", "#67e8f9"]
    },
    {
      id: "pudim",
      name: "Pudim caseiro",
      section: "Doces",
      price: 12,
      desc: "Fatia generosa com calda de caramelo.",
      colors: ["#92400e", "#fcd34d"]
    },
    {
      id: "brownie",
      name: "Brownie c/ sorvete",
      section: "Doces",
      price: 18,
      desc: "Quente + bola de creme. Ideal pra dividir.",
      colors: ["#44403c", "#d6d3d1"]
    },
    {
      id: "combo-almoco",
      name: "Combo almoço + suco",
      section: "Combos",
      price: 36,
      desc: "PF à escolha + suco 400ml. Mensagem já montada no WA.",
      colors: ["#c2410c", "#fbbf24"]
    },
    {
      id: "combo-lanche",
      name: "Combo lanche + refri",
      section: "Combos",
      price: 29,
      desc: "X-Tudo + lata. Retirada ou mesa.",
      colors: ["#9a3412", "#fde68a"]
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
      "Oi, " + SHOP_NAME + "! Vim pelo cardápio *Loja no Bolso* e quero: " +
      p.name +
      " (" +
      brl(p.price) +
      "). Pode confirmar?"
    );
  }

  function generalMessage() {
    return "Oi, " + SHOP_NAME + "! Vi o cardápio digital e quero fazer um pedido / saber o de hoje.";
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

    title.textContent = state.section === "Todos" ? "Cardápio" : state.section;

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
