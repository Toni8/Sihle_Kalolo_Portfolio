import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Dynamic Year in Footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetNode = document.querySelector(targetId);
      if (targetNode) {
        targetNode.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- 3. Navbar Background blur on Scroll ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg', 'bg-dark-base/95');
      navbar.classList.remove('bg-dark-base/80');
    } else {
      navbar.classList.remove('shadow-lg', 'bg-dark-base/95');
      navbar.classList.add('bg-dark-base/80');
    }
  });

  // --- 4. Intersection Observer for Scroll Animations ---
  // We will observe elements with specific classes and add animation classes when they enter the viewport

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Determine which animation to apply based on data attributes or class names if needed
        // For now, if it has opacity-0, we apply a fade in up animation
        if (entry.target.classList.contains('opacity-0')) {
          entry.target.style.animationPlayState = 'running';
          // Fallback if animation is stripped:
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('animate-[fadeInUp_0.8s_ease-out_forwards]');
        }

        // Unobserve after animating if we only want it to happen once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Get all elements we want to animate on scroll
  // In our HTML, we used inline utility classes like `opacity-0` and `animate-[...]`
  const animatedElements = document.querySelectorAll('.opacity-0');
  animatedElements.forEach(el => {
    // Pause animation initially if handled by CSS, or we just rely on intersection observer to add the class
    el.style.animationPlayState = 'paused';
    scrollObserver.observe(el);
  });

});
