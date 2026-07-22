# 💍 Sonia & Rondineli — Site do Casamento

> Site do casamento de Sonia e Rondineli, celebrado em **07 de Agosto de 2026**.

---

## ✨ Sobre o Projeto

Site desenvolvido em **HTML, CSS e JavaScript puro** — sem frameworks, sem dependências externas.
Reúne a história do casal, contagem regressiva, informações da cerimônia e recepção, e uma galeria de fotos.

---

## 🔧 Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- **HTML5 Semântico** — estrutura em seções (`header`, `main`, `footer`)
- **CSS3 com variáveis** — cores, fontes e espaçamentos centralizados em `:root`
- **JavaScript Vanilla** — sem bibliotecas, todas as interações em `script.js`
- **Google Fonts** — `Great Vibes` (títulos) + `Inter` (textos)
- **Responsivo** — layout adaptado para desktop, tablet e mobile

---

## 📦 Estrutura de Arquivos

```
casamento_sonia_rondineli/
├── index.html          # Estrutura e conteúdo do site
├── style.css            # Estilos por seção + variáveis de cor/fonte
├── script.js            # Preloader, menu, contador, timeline, galeria/lightbox
└── assets/
    ├── sonia01.jpg       # Foto de fundo do topo (hero)
    ├── sonia02.png       # Foto de perfil da Sonia
    ├── nelio01.png        # Foto de perfil do Rondineli
    ├── sonia04.jpg, sonia05.jpeg, sonia06.jpg   # Fotos da linha do tempo
    ├── salao.webp         # Foto do local da cerimônia
    ├── local-casamento.webp  # Foto do local da recepção
    ├── imagem.jpg           # Fundo do rodapé (adicionar este arquivo)
    └── gallery/
        └── casal01.jpg … casal06.jpg   # Fotos da galeria
```

---

## 🎯 Seções e Funcionalidades

- **Cabeçalho fixo** com menu de navegação e hambúrguer animado no mobile
- **Hero** com foto de fundo, apresentação de Sonia e Rondineli e links de Instagram de cada um
- **Contador regressivo** em tempo real até o casamento (controlado pelo atributo `data-wedding-date`)
- **Nossa história** em linha do tempo com 3 marcos (primeiro contato, primeiro encontro e pedido)
- **Eventos**, com dois cards separados:
  - **Cerimônia** — Salão do Reino, R. João Melanski Filho, 505, Quissisana, São José dos Pinhais - PR
  - **Recepção** — R. João Palma Moreira, 255, Costeira, São José dos Pinhais - PR
  - Cada card tem botão "Ver no mapa" com link direto do Google Maps
- **Galeria de fotos** com lightbox (amplia ao clicar, fecha com `Esc` ou clique fora)
- **Coração pulsante** animado entre os cards do casal
- **Animação de entrada** das seções ao rolar a página (scroll reveal)
- **Rodapé** com crédito da desenvolvedora e contato direto pelo WhatsApp

---

## 🎨 Configurações e Personalização

### Cores e fontes
Definidas em variáveis CSS no topo do `style.css`:

```css
:root {
  --color-primary: #8B1E2D;       /* vinho — cor principal */
  --color-primary-dark: #66131F;
  --color-secondary: #D9B8BD;
  --color-bg: #F8F5F2;
  --color-text: #2d2528;

  --font-title: 'Great Vibes', cursive;   /* títulos */
  --font-body: 'Inter', system-ui, sans-serif;  /* textos */
}
```

### Data do casamento
O contador regressivo usa o atributo `data-wedding-date` na section `#dia`:

```html
<section class="wedding-day" id="dia" data-wedding-date="2026-08-07T19:00:00">
```

### Endereços e links do mapa
Editados diretamente nos `event-card` da seção `#eventos`, no `href` do botão "Ver no mapa".

### Fotos
Substituindo os arquivos na pasta `assets/`, mantendo os mesmos nomes usados no `index.html`.

---

## 📞 Contato

**(21) 99293-5618** — via WhatsApp (link no rodapé do site)

---

## 🚀 Como Rodar

1. Baixe os arquivos do projeto
2. Abra o `index.html` diretamente no navegador

> Não precisa de servidor nem instalação. **Abre e já funciona.**

---

## 👩‍💻 Desenvolvido por

**Luciene Freitas**
📱 [(21) 99293-5618](https://wa.me/5521992935618)
