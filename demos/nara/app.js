/* NARA flagship — catalog logic */
(function () {
  "use strict";

  var WA_E164 = "5521999000000";
  var WA_BASE = "https://wa.me/" + WA_E164;

  /** Soft fabric-like swatches (CSS only, no stock photos) */
  var PRODUCTS = [
    {
      id: "vestido-linho-areia",
      name: "Vestido linho areia",
      cat: "novidades",
      price: 289,
      desc: "Corte reto, alças finas, caimento leve. Bom no calor da serra e no ar-condicionado do centro.",
      tags: ["linho", "P–G", "lavagem delicada"],
      swatch: "linear-gradient(155deg, #e8dcc8 0%, #cbb89a 48%, #a89070 100%)",
      tag: "Novo",
      featured: true
    },
    {
      id: "camisa-algodao-off",
      name: "Camisa algodão off-white",
      cat: "pecas",
      price: 179,
      desc: "Oversized com botões em madrepérola. Combina com calça wide e jeans antigo.",
      tags: ["algodão", "oversized"],
      swatch: "linear-gradient(160deg, #f7f3ea 0%, #e6dfd2 55%, #d2c8b6 100%)",
      tag: "Básico"
    },
    {
      id: "calca-wide-barro",
      name: "Calça wide barro",
      cat: "pecas",
      price: 249,
      desc: "Cintura elástica interna, perna ampla. Cor mineral que não grita.",
      tags: ["wide", "elástico"],
      swatch: "linear-gradient(165deg, #b08968 0%, #8c6a4f 50%, #6e5240 100%)",
      tag: "Peça"
    },
    {
      id: "blazer-curto-oliva",
      name: "Blazer curto oliva",
      cat: "novidades",
      price: 329,
      desc: "Estrutura leve, ombro natural. Fecha o look de trabalho sem farda.",
      tags: ["estrutura", "P–GG"],
      swatch: "linear-gradient(150deg, #7a8a6e 0%, #5c6b5a 45%, #3f4a3d 100%)",
      tag: "Novo"
    },
    {
      id: "saia-midi-terracota",
      name: "Saia midi terracota",
      cat: "pecas",
      price: 219,
      desc: "Enviesada, comprimento abaixo do joelho. Move bem na escada da Teresa.",
      tags: ["midi", "enviesada"],
      swatch: "linear-gradient(155deg, #c47a5a 0%, #a65d45 50%, #7d4030 100%)",
      tag: "Peça"
    },
    {
      id: "tricot-fino-carvao",
      name: "Tricot fino carvão",
      cat: "novidades",
      price: 199,
      desc: "Fio fino pra sobrepor. Noite fria de Teresópolis sem volume.",
      tags: ["tricot", "camadas"],
      swatch: "linear-gradient(160deg, #5a5550 0%, #3a3632 50%, #1f1a16 100%)",
      tag: "Novo"
    },
    {
      id: "bolsa-palha-mini",
      name: "Bolsa palha mini",
      cat: "acessorios",
      price: 159,
      desc: "Alça curta, forro de algodão. Cabe cartão, chave e batom.",
      tags: ["palha", "mini"],
      swatch: "linear-gradient(145deg, #e6d7b8 0%, #d2bc91 40%, #b89a6a 100%)",
      tag: "Acessório"
    },
    {
      id: "cinto-couro-mel",
      name: "Cinto couro mel",
      cat: "acessorios",
      price: 98,
      desc: "Fivela discreta, 3cm. Ajeita cintura alta e vestido solto.",
      tags: ["couro", "3 cm"],
      swatch: "linear-gradient(90deg, #c49a6c 0%, #a67c52 50%, #8a623e 100%)",
      tag: "Acessório"
    },
    {
      id: "lenço-seda-folha",
      name: "Lenço seda folha",
      cat: "acessorios",
      price: 89,
      desc: "70×70. No pescoço, na bolsa ou no cabelo — estampa botânica suave.",
      tags: ["seda", "70×70"],
      swatch: "linear-gradient(135deg, #dfe8d4 0%, #a8c49a 35%, #5c6b5a 70%, #3d4a38 100%)",
      tag: "Acessório"
    },
    {
      id: "regata-rib-creme",
      name: "Regata rib creme",
      cat: "pecas",
      price: 79,
      desc: "Canelada justa. Base pra blazer ou sozinha no fim de tarde.",
      tags: ["rib", "PP–G"],
      swatch: "linear-gradient(160deg, #f3eee4 0%, #e5dccb 60%, #d0c3ae 100%)",
      tag: "Básico"
    },
    {
      id: "jaqueta-denim-lavado",
      name: "Jaqueta denim lavado",
      cat: "pecas",
      price: 269,
      desc: "Lavagem clara, sem stretch exagerado. Envelhece bonito.",
      tags: ["denim", "lavado"],
      swatch: "linear-gradient(155deg, #9eb0c2 0%, #7a8fa6 45%, #5a6f86 100%)",
      tag: "Peça"
    },
    {
      id: "brinco-argola-fosca",
      name: "Brinco argola fosca",
      cat: "acessorios",
      price: 64,
      desc: "Banho fosco, 3,5cm. Leve o bastante pra usar o dia inteiro.",
      tags: ["banho", "par"],
      swatch: "radial-gradient(circle at 30% 30%, #f0ebe3 0%, #c5bdb0 40%, #8a8278 100%)",
      tag: "Acessório"
    }
  ];

  var state = { cat: "todas", q: "" };

  var els = {
    grid: document.getElementById("grid"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    q: document.getElementById("q"),
    featured: document.getElementById("destaque"),
    infoBtn: document.getElementById("btn-info"),
    infoPanel: document.getElementById("panel-info"),
    prodPanel: document.getElementById("panel-product"),
    prodBody: document.getElementById("prod-body"),
    waGeral: document.getElementById("wa-geral")
  };

  function money(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function waLink(text) {
    return WA_BASE + "?text=" + encodeURIComponent(text);
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      if (state.cat !== "todas" && p.cat !== state.cat) return false;
      if (!q) return true;
      var hay = (p.name + " " + p.desc + " " + (p.tags || []).join(" ")).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function renderFeatured() {
    var f = PRODUCTS.filter(function (p) {
      return p.featured;
    })[0];
    if (!f || !els.featured) return;
    els.featured.hidden = false;
    els.featured.innerHTML =
      '<button type="button" class="featured-card" data-id="' +
      f.id +
      '">' +
      '<div class="featured-swatch" style="--swatch:' +
      f.swatch +
      '"></div>' +
      '<div class="featured-body">' +
      '<p class="kicker">Destaque da semana</p>' +
      '<p class="featured-title">' +
      f.name +
      "</p>" +
      '<p class="featured-meta">' +
      money(f.price) +
      " · toque para ver</p>" +
      "</div></button>";
  }

  function renderGrid() {
    var list = filtered();
    els.grid.innerHTML = "";
    els.count.textContent = list.length + (list.length === 1 ? " peça" : " peças");
    els.empty.hidden = list.length > 0;
    list.forEach(function (p) {
      var li = document.createElement("li");
      li.innerHTML =
        '<button type="button" class="card" data-id="' +
        p.id +
        '">' +
        '<div class="card-visual" style="--swatch:' +
        p.swatch +
        '" data-tag="' +
        (p.tag || "") +
        '"></div>' +
        '<p class="card-name">' +
        p.name +
        "</p>" +
        '<p class="card-price">' +
        money(p.price) +
        "</p>" +
        "</button>";
      els.grid.appendChild(li);
    });
  }

  function openSheet(el) {
    el.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeSheets() {
    els.infoPanel.hidden = true;
    els.prodPanel.hidden = true;
    document.body.style.overflow = "";
    els.infoBtn.setAttribute("aria-expanded", "false");
  }

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  function openProduct(id) {
    var p = findProduct(id);
    if (!p) return;
    var tags = (p.tags || [])
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");
    var msg =
      "Oi! Vi o catálogo da NARA e quero saber da peça: " + p.name + " (" + money(p.price) + "). Ainda tem?";
    els.prodBody.innerHTML =
      '<div class="prod-hero" style="--swatch:' +
      p.swatch +
      '"></div>' +
      '<p class="prod-cat">' +
      p.cat +
      "</p>" +
      '<h2 class="prod-title" id="prod-title">' +
      p.name +
      "</h2>" +
      '<p class="prod-price">' +
      money(p.price) +
      "</p>" +
      '<p class="prod-desc">' +
      p.desc +
      "</p>" +
      '<ul class="prod-tags">' +
      tags +
      "</ul>" +
      '<a class="btn-wa" target="_blank" rel="noopener" href="' +
      waLink(msg) +
      '">Perguntar no WhatsApp</a>';
    openSheet(els.prodPanel);
  }

  // events
  document.querySelectorAll(".filters .chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filters .chip").forEach(function (b) {
        b.classList.remove("is-on");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-on");
      btn.setAttribute("aria-selected", "true");
      state.cat = btn.getAttribute("data-cat") || "todas";
      renderGrid();
    });
  });

  els.q.addEventListener("input", function () {
    state.q = els.q.value || "";
    renderGrid();
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-id]");
    if (t && t.getAttribute("data-id")) {
      openProduct(t.getAttribute("data-id"));
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeSheets();
    }
  });

  els.infoBtn.addEventListener("click", function () {
    var open = els.infoPanel.hidden;
    if (open) {
      openSheet(els.infoPanel);
      els.infoBtn.setAttribute("aria-expanded", "true");
    } else {
      closeSheets();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSheets();
  });

  els.waGeral.href = waLink(
    "Oi! Vi o catálogo da NARA (Centro · Teresópolis) e queria tirar uma dúvida."
  );

  renderFeatured();
  renderGrid();
})();