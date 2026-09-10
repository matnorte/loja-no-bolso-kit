/* Salão Estela — demo offline Loja no Bolso (nicho estética) */
(function () {
  "use strict";

  // Número fictício só para montar o link wa.me na demo
  var WA_E164 = "5511988880000";
  var WA_BASE = "https://wa.me/" + WA_E164;
  var SHOP_NAME = "Salão Estela";

  var PRODUCTS = [
    {
      id: "corte-feminino",
      name: "Corte feminino",
      section: "Cabelo",
      price: 90,
      desc: "Lavagem + corte + finalização. Tempo médio 45–60 min (demo).",
      colors: ["#7a3e6b", "#d4a5c3"]
    },
    {
      id: "escova",
      name: "Escova modeladora",
      section: "Cabelo",
      price: 70,
      desc: "Finalização com escova. Ideal pós-lavagem ou evento.",
      colors: ["#5c3d52", "#e8c9dc"]
    },
    {
      id: "coloracao",
      name: "Coloração (raiz)",
      section: "Cabelo",
      price: 180,
      desc: "Retoque de raiz com produto profissional. Orçamento final na avaliação.",
      colors: ["#4a2c40", "#c97b9a"]
    },
    {
      id: "hidratacao",
      name: "Hidratação profunda",
      section: "Cabelo",
      price: 120,
      desc: "Máscara + massagem no couro. Cabelo opaco ou ressecado.",
      colors: ["#8b5a7a", "#f0d5e4"]
    },
    {
      id: "manicure",
      name: "Manicure completa",
      section: "Unhas",
      price: 45,
      desc: "Cutilagem + esmaltação tradicional.",
      colors: ["#b76e79", "#f6d6dc"]
    },
    {
      id: "pedicure",
      name: "Pedicure completa",
      section: "Unhas",
      price: 55,
      desc: "Cuidados + esmaltação. Combine com manicure.",
      colors: ["#9a5b66", "#efc5cd"]
    },
    {
      id: "gel",
      name: "Alongamento em gel",
      section: "Unhas",
      price: 160,
      desc: "Estrutura em gel + nail art simples (demo).",
      colors: ["#6e3a55", "#e2b7d0"]
    },
    {
      id: "design-sobran",
      name: "Design de sobrancelha",
      section: "Estética",
      price: 40,
      desc: "Limpeza e desenho com pinça/linha conforme preferência.",
      colors: ["#3d2a38", "#cbb4c2"]
    },
    {
      id: "limpeza-pele",
      name: "Limpeza de pele",
      section: "Estética",
      price: 150,
      desc: "Higienização + extração + máscara calmante (sessão demo).",
      colors: ["#5a4a62", "#ddd0e0"]
    },
    {
      id: "barba",
      name: "Barba completa",
      section: "Barbearia",
      price: 50,
      desc: "Toalha quente + acabamento na navalha (versão mista do salão).",
      colors: ["#2a1f2e", "#8a7a86"]
    },
    {
      id: "combo-noiva",
      name: "Combo madrinha / evento",
      section: "Pacotes",
      price: 280,
      desc: "Cabelo + maquiagem leve. Agendar com 48h de antecedência.",
      colors: ["#7a3e6b", "#f5e1c8"]
    },
    {
      id: "vale-100",
      name: "Vale-presente R$ 100",
      section: "Pacotes",
      price: 100,
      desc: "Digital ou cartão. Presente sem erro de horário.",
      colors: ["#5c3d52", "#ffe8f3"]
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
      "Oi, " + SHOP_NAME + "! Vim pelo cardápio *Loja no Bolso* e quero agendar: " +
      p.name +
      " (" +
      brl(p.price) +
      "). Tem horário?"
    );
  }

  function generalMessage() {
    return "Oi, " + SHOP_NAME + "! Vi o cardápio de serviços e quero agendar / saber horários.";
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

    title.textContent = state.section === "Todos" ? "Serviços" : state.section;

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
