/* =====================================================
   NEW ENHANCED ANIMATIONS
===================================================== */

// Magnetic effect on cards
document.querySelectorAll('.card, .stat-box, .skill-tag').forEach(el => {
  el.classList.add('magnetic');
});

// Ripple effect on buttons
document.querySelectorAll('.cta-primary, .form-submit, .nav-cta').forEach(btn => {
  btn.classList.add('ripple');
  
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Enhanced particle system
function createEnhancedParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'enhanced-particle';
    
    const size = Math.random() * 4 + 2;
    const colors = ['#c9a84c', '#00ffe0', '#4080ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
      animation-duration: ${Math.random() * 5 + 4}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    
    hero.appendChild(particle);
  }
}

createEnhancedParticles();

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// Observe stat boxes for counter animation
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(num => {
        const target = parseInt(num.textContent);
        if (target) {
          animateCounter(num, target);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-me-stats').forEach(stats => {
  statObserver.observe(stats);
});

// Smooth parallax for hero image
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image-container');
  if (heroImage) {
    const scrolled = window.scrollY;
    heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// Card sequential reveal animation
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

// Neon border on section hover
document.querySelectorAll('section').forEach(section => {
  section.classList.add('neon-border');
});