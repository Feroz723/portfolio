document.addEventListener('componentsLoaded', () => {
  initNav();
});

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isActive = nav.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  highlightActiveLink();
}

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  const links = document.querySelectorAll('nav a, footer a');
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    const linkPage = linkPath?.split('/').pop();
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPath.includes('projects/') && linkPage === 'projects.html')) {
      link.classList.add('active');
    }
  });
}
