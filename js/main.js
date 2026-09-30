// ================================================================
//  MAIN.JS — Comportamentos da Landing Page da Oficina
//  Depende de: config.js (carregado antes deste arquivo)
//
//  Os scripts estão no final do <body>, então o DOM já está
//  completamente parseado quando este arquivo executa.
//  Não é necessário usar DOMContentLoaded — chamamos tudo direto.
// ================================================================

// ── 1. PREENCHER DADOS DO CONFIG.JS ────────────────────────────
preencherDados();

// ── 2. CARROSSEL DE SERVIÇOS ────────────────────────────────────
construirCarrossel();

// ── 3. SEÇÃO CONTATO ────────────────────────────────────────────
construirContato();

// ── 4. SEÇÃO ONDE ESTAMOS ───────────────────────────────────────
construirOndeEstamos();

// ── 5. INTERSECTION OBSERVER — ocultar info-bar ─────────────────
iniciarInfoBarObserver();

// ── 6. SCROLL SPY — link ativo no menu ──────────────────────────
iniciarScrollSpy();

// ── 7. HEADER — sombra ao rolar ─────────────────────────────────
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── 8. MENU MOBILE ───────────────────────────────────────────────
iniciarMenuMobile();


// ================================================================
//  PREENCHIMENTO DE DADOS
// ================================================================

function preencherDados() {
  const o = OFICINA;

  // Título da aba do navegador
  document.title = o.nome;

  // Info Bar
  setText('ib-endereco', `${o.endereco.rua}, ${o.endereco.cidade}`);
  setText('ib-telefone', o.contato.telefone1);
  setText('ib-horario',  o.horario.semana);

  // Logo / Nome no header
  const logoImg  = document.getElementById('logo-img');
  const logoNome = document.getElementById('logo-nome');
  if (logoImg)  logoImg.alt      = o.nome;
  if (logoNome) logoNome.textContent = o.nome;

  // Hero
  setText('hero-nome',   o.nome);
  setText('hero-slogan', o.slogan);

  // Footer
  setText('footer-nome',   o.nome);
  setText('footer-slogan', o.slogan);
  setText('footer-copy',
    `© ${new Date().getFullYear()} ${o.nome}. Todos os direitos reservados.`
  );
}

// ================================================================
//  CARROSSEL DE SERVIÇOS
// ================================================================

function construirCarrossel() {
  const track = document.getElementById('carousel-track');
  if (!track || !OFICINA.servicos?.length) return;

  // Cria os cards e os duplica para o loop infinito
  const servicos = OFICINA.servicos;
  const fragment = document.createDocumentFragment();

  // Conjunto original + duplicado = translateX(-50%) fecha o loop
  [...servicos, ...servicos].forEach(servico => {
    fragment.appendChild(criarCardServico(servico));
  });

  track.appendChild(fragment);
}

function criarCardServico(servico) {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.setAttribute('aria-label', servico.nome);

  // Wrapper da imagem
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'service-card__img';

  // Ícone fallback (Font Awesome)
  const fallback = document.createElement('span');
  fallback.className = 'img-fallback';
  fallback.setAttribute('aria-hidden', 'true');
  fallback.innerHTML = `<i class="${servico.icone}"></i>`;

  // Imagem real
  const img = document.createElement('img');
  img.src   = servico.imagem;
  img.alt   = servico.nome;
  img.loading = 'lazy';
  img.addEventListener('load', () => img.classList.add('img-loaded'));
  img.addEventListener('error', () => { /* mantém fallback visível */ });

  imgWrapper.appendChild(fallback);
  imgWrapper.appendChild(img);

  // Nome do serviço
  const nome = document.createElement('div');
  nome.className   = 'service-card__name';
  nome.textContent = servico.nome;

  card.appendChild(imgWrapper);
  card.appendChild(nome);
  return card;
}

// ================================================================
//  SEÇÃO CONTATO
// ================================================================

function construirContato() {
  const container = document.getElementById('contato-cards');
  if (!container) return;

  const c = OFICINA.contato;
  const h = OFICINA.horario;

  // ── Card WhatsApp ──
  const cardWA = document.createElement('div');
  cardWA.className = 'contato-card';

  let linksWA = '';
  if (c.telefone1 && c.whatsapp1) {
    linksWA += `<a href="https://wa.me/${c.whatsapp1}" target="_blank" rel="noopener" class="wa-link">${c.telefone1}</a>`;
  }
  if (c.telefone2 && c.whatsapp2) {
    linksWA += `<a href="https://wa.me/${c.whatsapp2}" target="_blank" rel="noopener" class="wa-link">${c.telefone2}</a>`;
  }

  cardWA.innerHTML = `
    <i class="fab fa-whatsapp contato-card__icon wa-color"></i>
    <h3>WhatsApp</h3>
    ${linksWA || '<p>Não configurado</p>'}
  `;

  // ── Card E-mail ──
  const cardEmail = document.createElement('div');
  cardEmail.className = 'contato-card';
  cardEmail.innerHTML = `
    <i class="fas fa-envelope contato-card__icon"></i>
    <h3>E-mail</h3>
    <a href="mailto:${c.email}">${c.email}</a>
  `;

  // ── Card Horário ──
  const cardHor = document.createElement('div');
  cardHor.className = 'contato-card';
  cardHor.innerHTML = `
    <i class="fas fa-clock contato-card__icon"></i>
    <h3>Horário</h3>
    <p>${h.semana}</p>
    <p>${h.sabado}</p>
    <p>${h.domingo}</p>
  `;

  container.append(cardWA, cardEmail, cardHor);
}

// ================================================================
//  SEÇÃO ONDE ESTAMOS
// ================================================================

function construirOndeEstamos() {
  const e = OFICINA.endereco;
  const c = OFICINA.contato;
  const h = OFICINA.horario;

  // Endereço
  setText('onde-rua',          e.rua);
  setText('onde-bairro-cidade', `${e.bairro} — ${e.cidade}`);
  setText('onde-cep',          `CEP: ${e.cep}`);

  const linkMaps = document.getElementById('onde-maps-link');
  if (linkMaps) linkMaps.href = e.maps_link;

  // Telefones WhatsApp
  const telDiv = document.getElementById('onde-telefones');
  if (telDiv) {
    if (c.telefone1 && c.whatsapp1) {
      telDiv.insertAdjacentHTML('beforeend', `
        <a href="https://wa.me/${c.whatsapp1}" class="wa-number" target="_blank" rel="noopener">
          <i class="fab fa-whatsapp"></i>
          <span>${c.telefone1}</span>
        </a>
      `);
    }
    if (c.telefone2 && c.whatsapp2) {
      telDiv.insertAdjacentHTML('beforeend', `
        <a href="https://wa.me/${c.whatsapp2}" class="wa-number" target="_blank" rel="noopener">
          <i class="fab fa-whatsapp"></i>
          <span>${c.telefone2}</span>
        </a>
      `);
    }
    // Oculta bloco se nenhum número configurado
    if (!c.telefone1 && !c.telefone2) {
      const block = document.getElementById('onde-telefones-block');
      if (block) block.style.display = 'none';
    }
  }

  // Horários
  setText('onde-semana',  h.semana);
  setText('onde-sabado',  h.sabado);
  setText('onde-domingo', h.domingo);

  // Mapa: cria o conteúdo dentro do container #onde-mapa
  // (nunca deixa um <iframe> no HTML para evitar ERR_FILE_NOT_FOUND)
  const mapaContainer = document.getElementById('onde-mapa');
  if (mapaContainer) {
    if (e.maps_embed && e.maps_embed.trim() !== '') {
      // URL configurada → insere o iframe
      const iframe = document.createElement('iframe');
      iframe.src         = e.maps_embed;
      iframe.title       = 'Localização da oficina no mapa';
      iframe.allowFullscreen = true;
      iframe.loading     = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      mapaContainer.innerHTML = '';
      mapaContainer.appendChild(iframe);
    } else {
      // Sem URL → exibe placeholder com link direto
      mapaContainer.innerHTML = `
        <div class="mapa-placeholder">
          <i class="fas fa-map-marked-alt"></i>
          <span>Configure <strong>maps_embed</strong> em <strong>config.js</strong><br>para exibir o mapa aqui.</span>
          <a href="${e.maps_link}" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i> Abrir no Google Maps
          </a>
        </div>
      `;
    }
  }
}

// ================================================================
//  INFO BAR OBSERVER
//  Oculta a barra de info quando #contato ou #onde-estamos
//  entram na viewport.
// ================================================================

function iniciarInfoBarObserver() {
  const infoBar = document.getElementById('info-bar');
  if (!infoBar) return;

  const sectionsParaOcultar = [
    document.getElementById('contato'),
    document.getElementById('onde-estamos')
  ].filter(Boolean);

  if (!sectionsParaOcultar.length) return;

  // Mapa de visibilidade individual de cada seção
  const visiveis = new Map(sectionsParaOcultar.map(s => [s, false]));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => visiveis.set(entry.target, entry.isIntersecting));
    const algumaVisivel = [...visiveis.values()].some(Boolean);
    infoBar.classList.toggle('hidden', algumaVisivel);
  }, { threshold: 0.08 });

  sectionsParaOcultar.forEach(s => observer.observe(s));
}

// ================================================================
//  SCROLL SPY
//  Destaca o link ativo no menu conforme seção visível.
// ================================================================

function iniciarScrollSpy() {
  const navLinks = document.querySelectorAll('.nav__link');
  const sectionIds = ['servicos', 'contato', 'onde-estamos'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-10% 0px -10% 0px'
  });

  sections.forEach(s => observer.observe(s));
}

// ================================================================
//  MENU MOBILE
// ================================================================

function iniciarMenuMobile() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('main-nav');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const estaAberto = hamburger.classList.toggle('open');
    nav.classList.toggle('open', estaAberto);
    hamburger.setAttribute('aria-expanded', String(estaAberto));
    document.body.style.overflow = estaAberto ? 'hidden' : '';
  });

  // Fechar ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-top') && nav.classList.contains('open')) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ================================================================
//  UTILITÁRIOS
// ================================================================

function setText(id, texto) {
  const el = document.getElementById(id);
  if (el) el.textContent = texto;
}

