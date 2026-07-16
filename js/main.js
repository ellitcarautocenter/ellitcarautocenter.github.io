document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      
      // Accessibility
      const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
      mobileMenuBtn.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header Scroll Effect (Sticky glassmorphism styling change)
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    revealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }

  // Lazy Load Google Map (Extremely important for PageSpeed performance)
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    const loadMap = () => {
      // Standard embed map code for Ellitcar auto center Maysa (https://maps.app.goo.gl/Nv9YEmRXK1CVRwea8)
      const freeEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.463236712345!2d-49.3909045!3d-16.6352264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e5fed75b092c3%3A0x9d7b0bed5cfd20c7!2sEllitcar%20auto%20center%20Maysa!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr";

      const iframe = document.createElement('iframe');
      iframe.src = freeEmbedUrl;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "0";
      iframe.allowFullscreen = "";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = "Mapa de Localização EllitCar Auto Center";
      
      // Clear placeholder and append iframe
      mapContainer.innerHTML = '';
      mapContainer.appendChild(iframe);
    };

    // Load map only when map area is close to viewport (IntersectionObserver)
    if ('IntersectionObserver' in window) {
      const mapObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadMap();
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px 0px' });
      mapObserver.observe(mapContainer);
    } else {
      // Fallback
      loadMap();
    }
  }

  // Pre-fill WhatsApp Links with Custom Messages
  const whatsappButtons = document.querySelectorAll('[data-wa-action]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const action = button.getAttribute('data-wa-action');
      const phone = "5562994301129";
      let text = "Olá! Gostaria de fazer um orçamento com a EllitCar Auto Center.";

      if (action === 'servicos') {
        const serviceName = button.getAttribute('data-wa-service') || 'manutenção';
        text = `Olá! Gostaria de solicitar um orçamento para o serviço de *${serviceName}* no meu veículo.`;
      } else if (action === 'pecas') {
        text = "Olá! Gostaria de consultar a disponibilidade de uma peça com a EllitCar Auto Center.";
      } else if (action === 'contato') {
        text = "Olá! Quero agendar uma avaliação com a EllitCar Auto Center.";
      }

      const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  });

  // Modal Interactions (Políticas de Privacidade e Termos de Uso)
  const openPrivacy = document.getElementById('open-privacy');
  const openTerms = document.getElementById('open-terms');
  const modalPrivacy = document.getElementById('modal-privacidade');
  const modalTerms = document.getElementById('modal-termos');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  if (openPrivacy && modalPrivacy) {
    openPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      modalPrivacy.classList.add('active');
      modalPrivacy.setAttribute('aria-hidden', 'false');
    });
  }

  if (openTerms && modalTerms) {
    openTerms.addEventListener('click', (e) => {
      e.preventDefault();
      modalTerms.classList.add('active');
      modalTerms.setAttribute('aria-hidden', 'false');
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Close modal when clicking outside contents
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      e.target.setAttribute('aria-hidden', 'true');
    }
  });
});
