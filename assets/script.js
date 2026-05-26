// assets/script.js - Shared JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Animate progress bars when in viewport
  const progressFills = document.querySelectorAll('.progress-fill');
  
  function animateProgressBars() {
    progressFills.forEach(fill => {
      const widthVal = fill.getAttribute('data-width');
      if (!widthVal) return;
      const rect = fill.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 70 && rect.bottom > 0;
      if (isVisible && fill.style.width !== widthVal + '%') {
        fill.style.width = widthVal + '%';
      }
    });
  }
  
  animateProgressBars();
  window.addEventListener('scroll', animateProgressBars);
  
  // Orb animation enhancement (if exists on homepage)
  const orb = document.querySelector('.glowing-orb');
  if (orb) {
    setInterval(() => {
      orb.style.boxShadow = `0 0 ${Math.floor(Math.random() * 35 + 70)}px rgba(0,224,255,0.7)`;
      setTimeout(() => {
        orb.style.boxShadow = '0 0 80px rgba(0,224,255,0.6), 0 0 130px rgba(0,102,255,0.4)';
      }, 700);
    }, 3800);
  }
  
  // Contact form handling (only if form exists on page)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const feedback = document.getElementById('formFeedback');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      
      if (!name || !email || !message) {
        if (feedback) {
          feedback.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill all required fields.';
          feedback.style.color = "#FFAA66";
          setTimeout(() => { if(feedback) feedback.innerHTML = ''; }, 3000);
        }
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        if (feedback) {
          feedback.innerHTML = '<i class="fas fa-envelope"></i> Valid email required.';
          feedback.style.color = "#FFAA66";
          setTimeout(() => { if(feedback) feedback.innerHTML = ''; }, 3000);
        }
        return;
      }
      
      if (feedback) {
        feedback.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! We\'ll connect within 24h.';
        feedback.style.color = "#00FFCC";
        contactForm.reset();
        setTimeout(() => { if(feedback) feedback.innerHTML = ''; }, 4000);
      }
    });
  }
  
  // Active navigation highlighting based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    }
  });
});