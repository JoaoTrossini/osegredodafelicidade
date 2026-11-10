
/* ==========================================
   O SEGREDO DA FELICIDADE — SCRIPT PRINCIPAL
   HTML + CSS + JAVASCRIPT PURO
========================================== */

const CONFIG = {
  name: "O Segredo da Felicidade",

  whatsapp: "5511933386107",
  phoneLabel: "(11) 93338-6107",

  instagram: "https://www.instagram.com/osegredodafelicidade/",

  address: "Rua Santa Rosa, 340 - Santa Paula, São Caetano do Sul - SP, 09521-360",

  hours: "Terça a sexta: 9h às 19h | Sábado: 9h às 17h | Domingo: 9h às 13h | Segunda: fechado",

  aboutTitle: "Um lugar para desacelerar e aproveitar cada detalhe.",

  aboutText: "O Segredo da Felicidade reúne cafés especiais, pães de fermentação natural e bolos artesanais em um ambiente acolhedor. Um lugar pensado para transformar uma pausa simples em um momento especial, com sabores preparados com carinho e ingredientes selecionados.",

  items: [
    {
      img: "latte-topo",
      title: "Cafés especiais",
      desc: "Cafés selecionados e diferentes métodos de preparo para apreciar cada xícara."
    },
    {
      img: "torrada",
      title: "Queijo quente com cebola caramelizada",
      desc: "Uma versão especial do clássico, preparada com pão de fermentação natural."
    },
    {
      img: "bomba",
      title: "Sanduíche de copa lombo",
      desc: "Copa lombo maturada, muçarela artesanal, rúcula, tomates confitados e pesto."
    },
    {
      img: "bolo",
      title: "Banana bread com gelato",
      desc: "Banana bread aquecido, acompanhado de gelato de doce de leite e amêndoas."
    },
    {
      img: "cookie",
      title: "Brownie de chocolate",
      desc: "Uma opção doce para acompanhar seu café."
    }
  ],

  feats: [
    {
      icon: "☕",
      t: "Cafés especiais",
      d: "Grãos selecionados e diferentes formas de preparo para explorar aromas e sabores."
    },
    {
      icon: "🥖",
      t: "Pães de fermentação natural",
      d: "Pães preparados com fermentação natural, feitos com cuidado e dedicação."
    },
    {
      icon: "🐾",
      t: "Pet friendly",
      d: "Seu melhor amigo também é bem-vindo para acompanhar esse momento."
    }
  ]
};

/* ==========================================
   FUNÇÕES AUXILIARES
========================================== */

const $ = (selector, context = document) =>
  context.querySelector(selector);

const $$ = (selector, context = document) =>
  [...context.querySelectorAll(selector)];

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const whatsappUrl = (message) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;


/* ==========================================
   INFORMAÇÕES GERAIS
========================================== */

document.title = `${CONFIG.name} | Cafés especiais e sabores artesanais`;

$$("[data-cfg]").forEach((element) => {
  const key = element.dataset.cfg;
  const value = CONFIG[key];

  if (value) {
    element.textContent = value;
  }
});


/* ==========================================
   BOTÕES DO WHATSAPP
========================================== */

$$("[data-wa]").forEach((element) => {
  element.href = whatsappUrl(
    element.dataset.wa || "Olá! Vim pelo site."
  );

  element.target = "_blank";
  element.rel = "noopener noreferrer";
});


/* ==========================================
   INSTAGRAM
========================================== */

const instagramLink = $("#igLink");

if (instagramLink) {
  instagramLink.href = CONFIG.instagram;
  instagramLink.textContent = "@osegredodafelicidade";
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
}


/* ==========================================
   GOOGLE MAPS
========================================== */

const mapQuery = encodeURIComponent(CONFIG.address);

const map = $("#map");
const mapButton = $("#mapBtn");

if (map) {
  map.innerHTML = `
    <iframe
      title="Localização de O Segredo da Felicidade"
      src="https://www.google.com/maps?q=${mapQuery}&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen>
    </iframe>
  `;
}

if (mapButton) {
  mapButton.href =
    `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  mapButton.target = "_blank";
  mapButton.rel = "noopener noreferrer";
}


/* ==========================================
   CARDÁPIO
   FOTOS NA MESMA PASTA DO INDEX.HTML
========================================== */

const cardsContainer = $("#cards");

if (cardsContainer) {
  cardsContainer.innerHTML = CONFIG.items.map((item) => `
    <article class="card">

      <div class="z">
        <img
          src="${item.img}.jpg"
          alt="${item.title}"
          loading="lazy"
          onerror="this.closest('.z').classList.add('image-error')"
        >
      </div>

      <div class="card-copy">
        <h3>${item.title}</h3>

        <p>${item.desc}</p>

        <a
          href="${whatsappUrl(`Olá! Gostaria de saber se vocês têm ${item.title} disponível.`)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar disponibilidade ↗
        </a>
      </div>

    </article>
  `).join("");
}


/* ==========================================
   DIFERENCIAIS
========================================== */

const featuresContainer = $("#feats");

if (featuresContainer) {
  featuresContainer.innerHTML = CONFIG.feats.map((feature) => `
    <article class="feat reveal">

      <span class="feat-icon" aria-hidden="true">
        ${feature.icon}
      </span>

      <h3>${feature.t}</h3>

      <p>${feature.d}</p>

    </article>
  `).join("");
}


/* ==========================================
   MENU MOBILE
========================================== */

const menu = $("#menu");
const burger = $("#burger");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen =
      burger.getAttribute("aria-expanded") !== "true";

    burger.setAttribute("aria-expanded", String(isOpen));

    menu.classList.toggle("open", isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}


/* ==========================================
   INTRODUÇÃO ANIMADA
========================================== */

const intro = $("#intro");

if (intro) {
  window.setTimeout(() => {
    intro.classList.add("done");
  }, reduceMotion ? 0 : 1300);
}


/* ==========================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================== */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  $$(".reveal, .card").forEach((element, index) => {
    if (element.classList.contains("card")) {
      element.style.transitionDelay =
        `${(index % 4) * 0.09}s`;
    }

    revealObserver.observe(element);
  });
} else {
  $$(".reveal, .card").forEach((element) => {
    element.classList.add("in");
  });
}


/* ==========================================
   BARRA DE PROGRESSO E EFEITOS
========================================== */

const progressBar = $("#progress");

const nav = $("#nav");

const parallaxElements = $$("[data-parallax]");

const depthElements = $$("[data-depth]");

function handleScroll() {

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (progressBar) {
    const progress =
      scrollableHeight > 0
        ? window.scrollY / scrollableHeight
        : 0;

    progressBar.style.transform =
      `scaleX(${progress})`;
  }

  if (nav) {
    nav.classList.toggle("solid", window.scrollY > 60);
  }

  if (reduceMotion) return;

  parallaxElements.forEach((element) => {

    const section =
      element.parentElement.getBoundingClientRect();

    if (
      section.bottom > 0 &&
      section.top < window.innerHeight
    ) {
      const speed =
        Number(element.dataset.parallax || 0);

      element.style.transform =
        `translateY(${-section.top * speed}px)`;
    }

  });

  depthElements.forEach((element) => {

    const speed =
      Number(element.dataset.depth || 0);

    element.style.transform =
      `translateY(${window.scrollY * speed}px)`;

  });

}

window.addEventListener(
  "scroll",
  () => {
    window.requestAnimationFrame(handleScroll);
  },
  { passive: true }
);

handleScroll();


/* ==========================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================== */

const year = $("#yr");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ==========================================
   FIM DO SCRIPT
========================================== */
