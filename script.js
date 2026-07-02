/* =====================================================
   OUR LOVE INSPIRED - JAVASCRIPT PURO
   Interações: preloader, menu mobile, nav ativa, contador,
   galeria/lightbox, validação simples do RSVP e animações.
   ===================================================== */

const preloader = document.querySelector('.preloader');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const weddingSection = document.querySelector('.wedding-day');
const form = document.querySelector('#rsvpForm');
const feedback = document.querySelector('#formFeedback');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const galleryButtons = document.querySelectorAll('.gallery-item');

// Preloader: fecha após o carregamento completo da página
window.addEventListener('load', () => {
  preloader?.classList.add('hidden');
});

// Menu mobile
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha menu mobile ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Contagem regressiva: altere a data no HTML, atributo data-wedding-date da section #dia
function updateCountdown() {
  if (!weddingSection) return;

  const targetDate = new Date(weddingSection.dataset.weddingDate).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  const values = {
    days: document.querySelector('#days'),
    hours: document.querySelector('#hours'),
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds')
  };

  if (difference <= 0) {
    Object.values(values).forEach((element) => {
      if (element) element.textContent = '00';
    });
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  const days = Math.floor(difference / day);
  const hours = Math.floor((difference % day) / hour);
  const minutes = Math.floor((difference % hour) / minute);
  const seconds = Math.floor((difference % minute) / 1000);

  values.days.textContent = String(days).padStart(2, '0');
  values.hours.textContent = String(hours).padStart(2, '0');
  values.minutes.textContent = String(minutes).padStart(2, '0');
  values.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Link ativo conforme seção visível
const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', isCurrent);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => navObserver.observe(section));



// Coraçao pulsante
document.addEventListener("DOMContentLoaded", () => {
    const heart = document.querySelector(".heart-badge");

    if (heart) {
        heart.classList.add("pulse");
    }
});

// Animação suave de entrada das seções
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-observer').forEach((element) => {
  revealObserver.observe(element);
});

// Galeria com lightbox simples
function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Imagem ampliada da galeria';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    openLightbox(image.src, image.alt);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

// Validação simples do formulário RSVP
form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    feedback.textContent = 'Ops! Preencha os campos obrigatórios para confirmar sua presença.';
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const guestName = formData.get('name');

  // Aqui você pode integrar com API, EmailJS, Formspree ou backend próprio.
  feedback.textContent = `Presença confirmada, ${guestName}! Obrigada pelo carinho. 💕`;
  form.reset();
});
