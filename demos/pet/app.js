/* Pet Casa Verde — demo offline Loja no Bolso (nicho pet) */
(function () {
  "use strict";

  // Número fictício só para montar o link wa.me na demo
  var WA_E164 = "5511966660000";
  var WA_BASE = "https://wa.me/" + WA_E164;
  var SHOP_NAME = "Pet Casa Verde";

  var PRODUCTS = [
    {
      id: "racao-cao-15",
      name: "Ração cães adulto 15 kg",
      section: "Ração",
      price: 189,
      desc: "Linha premium demo. Entrega no bairro sob consulta.",
      colors: ["#14532d", "#86efac"]
    },
    {
      id: "racao-gato-10",
      name: "Ração gatos 10 kg",
      section: "Ração",
      price: 159,
      desc: "Fórmula indoor (demo). Troca de marca com orientação no balcão.",
      colors: ["#166534", "#bbf7d0"]
    },
    {
      id: "racao-filhote",
      name: "Ração filhote 3 kg",
      section: "Ração",
      price: 72,
      desc: "Crescimento. Ideal pra quem não quer carregar saco grande.",
      colors: ["#15803d", "#d9f99d"]
    },
    {
      id: "banho-medio",
      name: "Banho cão médio",
      section: "Banho & tosa",
      price: 75,
      desc: "Higienização + secagem. Horário sob reserva no WhatsApp.",
      colors: ["#0f766e", "#99f6e4"]
    },
    {
      id: "tosa-higienica",
      name: "Tosa higiênica",
      section: "Banho & tosa",
      price: 55,
      desc: "Patinhas, barriga e região íntima. Combine com banho.",
      colors: ["#0d9488", "#ccfbf1"]
    },
    {
      id: "banho-gato",
      name: "Banho gato (com manejo)",
      section: "Banho & tosa",
      price: 90,
      desc: "Equipe acostumada com felinos. Avaliar temperamento na loja.",
      colors: ["#115e59", "#5eead4"]
    },
    {
      id: "coleira",
      name: "Coleira ajustável",
      section: "Acessórios",
      price: 39,
      desc: "Nylon reforçado, várias cores (demo).",
      colors: ["#3f6212", "#bef264"]
    },
    {
      id: "guia",
      name: "Guia 1,5 m",
      section: "Acessórios",
      price: 45,
      desc: "Passeio diário. Mosquetão metálico.",
      colors: ["#4d7c0f", "#a3e635"]
    },
    {
      id: "comedouro",
      name: "Comedouro inox duplo",
      section: "Acessórios",
      price: 68,
      desc: "Base antiderrapante. Água + ração.",
      colors: ["#365314", "#d9f99d"]
    },
    {
      id: "brinquedo-bola",
      name: "Bola mordedor",
      section: "Brinquedos",
      price: 29,
      desc: "Borracha macia. Não substitui supervisão.",
      colors: ["#854d0e", "#fde68a"]
    },
    {
      id: "arranhador",
      name: "Arranhador torre P",
      section: "Brinquedos",
      price: 149,
      desc: "Sisal + plataforma. Montagem simples (demo).",
      colors: ["#713f12", "#fcd34d"]
    },
    {
      id: "antipulgas",
      name: "Antipulgas spot-on (un.)",
      section: "Saúde",
      price: 89,
      desc: "Uso conforme peso. Orientações no balcão — demo ilustrativa.",
      colors: ["#9f1239", "#fda4af"]
    },
    {
      id: "vermifugo",
      name: "Vermífugo comprimido",
      section: "Saúde",
      price: 42,
      desc: "Dose por peso. Consulte rotina com o vet de confiança.",
      colors: ["#be123c", "#fecdd3"]
    },
    {
      id: "pacote-mensal",
      name: "Pacote 4 banhos / mês",
      section: "Pacotes",
      price: 260,
      desc: "Cão médio. Economia vs avulso. Agendar pelo WhatsApp.",
      colors: ["#14532d", "#86efac"]
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
    return "Oi, " + SHOP_NAME + "! Vi o catálogo pet e quero fazer um pedido / agendar banho.";
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