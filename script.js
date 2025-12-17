// Animation sections
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => sectionObserver.observe(section));

// Animation barres de langages
const bars = document.querySelectorAll('.progress-bar');

const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.progress + '%';
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.8 }
);

bars.forEach(bar => barObserver.observe(bar));

// Menu actif selon section visible
const menuLinks = document.querySelectorAll('.sidebar a');

const linkObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menuLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(section => linkObserver.observe(section));

// Formulaire avec message de confirmation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) alert('Message envoyé avec succès !');
    else alert('Erreur lors de l\'envoi.');
    form.reset();
  });
});

