// ================================================================
//  CONFIGURAÇÕES DA OFICINA
//  Edite este arquivo para personalizar todos os dados do site.
//  Não é necessário tocar em nenhum outro arquivo para atualizar
//  endereço, telefone, horário ou nome da oficina.
// ================================================================

const OFICINA = {

  /* ─── IDENTIDADE ──────────────────────────────────────────── */
  nome:   "Oficina do Júnior",
  slogan: "Qualidade e Confiança em Cada Serviço",

  /* ─── ENDEREÇO ────────────────────────────────────────────── */
  endereco: {
    rua:        "Rua Macambau, 248",
    bairro:     "Jardim Presidente Dutra",
    cidade:     "Guarulhos - SP",
    cep:        "07170-080",
    // Cole aqui o src= do <iframe> do Google Maps Embed
    // (Google Maps → Compartilhar → Incorporar um mapa → copiar src="...")
    maps_embed: src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d228.79909939381034!2d-46.4353024!3d-23.4321112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce89f9f03bd495%3A0xc4091fd1bb5705d0!2sR.%20Macambau%2C%20248%20-%20Jardim%20Pres.%20Dutra%2C%20Guarulhos%20-%20SP%2C%2007170-080!5e0!3m2!1spt-BR!2sbr!4v1790728967217!5m2!1spt-BR!2sbr",
    // Link direto para abrir no Google Maps
    maps_link:  "https://maps.app.goo.gl/kFT1eAszKx5vSL469"
  },
  /* ─── CONTATO ─────────────────────────────────────────────── */
  contato: {
    telefone1: "(11) 94598-3111",  // Número exibido no site
    whatsapp1: "55119465983111",    // Apenas números com DDI (ex: 5511999999999)
    telefone2: "",                 // Deixe "" para não exibir o 2º número
    whatsapp2: "5511945983111",
    email:     "contato@oficina.com.br"
  },

  /* ─── HORÁRIO DE FUNCIONAMENTO ────────────────────────────── */
  horario: {
    semana:  "Seg–Sex: 08h às 18h",
    sabado:  "Sáb: 08h às 13h",
    domingo: "Dom: Fechado"
  },

  /* ─── SERVIÇOS (ordem no carrossel) ──────────────────────── */
  // imagem: caminho relativo ao index.html
  // icone:  classe Font Awesome (exibida como fallback sem imagem)
  servicos: [
    { nome: "Alinhamento",        imagem: "images/services/alinhamento.jpg",        icone: "fas fa-car" },
    { nome: "Balanceamento",      imagem: "images/services/balanceamento.jpg",      icone: "fas fa-circle-notch" },
    { nome: "Troca de Pneu",      imagem: "images/services/troca-pneu.jpg",         icone: "fas fa-dot-circle" },
    { nome: "Troca de Óleo",      imagem: "images/services/troca-oleo.jpg",         icone: "fas fa-oil-can" },
    { nome: "Suspensão",          imagem: "images/services/suspensao.jpg",          icone: "fas fa-car-crash" },
    { nome: "Motor",              imagem: "images/services/motor.jpg",              icone: "fas fa-cogs" },
    { nome: "Ar-Condicionado",    imagem: "images/services/ar-condicionado.jpg",    icone: "fas fa-snowflake" },
    { nome: "Injeção Eletrônica", imagem: "images/services/injecao-eletronica.jpg", icone: "fas fa-microchip" }
  ]

};

