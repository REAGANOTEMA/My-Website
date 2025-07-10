document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight active navigation menu item based on current page
  const currentPath = window.location.pathname.split('/').pop(); // e.g. "about.html"
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
      link.classList.add('active-nav');
    }
  });

  // 2. Smooth scroll for internal anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Fade-in animation on page load for main content
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = 0;
    mainContent.style.transition = 'opacity 1s ease-in-out';
    requestAnimationFrame(() => {
      mainContent.style.opacity = 1;
    });
  }

  // 4. Donation button confirmation and redirect
  const donateButtons = document.querySelectorAll('.donate-btn');
  donateButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      const url = new URL(button.href);
      const amount = url.searchParams.get('amount');

      let message = 'Thank you for considering a donation!';
      if (amount) {
        message = `You are about to donate ${amount},000 UGX. Thank you!`;
      }

      if (confirm(message + '\nDo you want to proceed to the payment page?')) {
        window.location.href = button.href;
      }
    });
  });
});
