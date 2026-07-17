import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Dynamic Year in Footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 1.5. Preloader Exit ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('exit');
      const logo = preloader.querySelector('.preloader-logo');
      const status = preloader.querySelector('.animate-pulse');
      if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(1.2)';
      }
      if (status) status.style.opacity = '0';
      
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
    }, 100);
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

  // --- 3. Navbar Background blur & Scroll Indicator Hide on Scroll ---
  const navbar = document.getElementById('navbar');
  const scrollIndicator = document.getElementById('scroll-indicator');

  window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg', 'bg-dark-base/95');
      navbar.classList.remove('bg-dark-base/80');
    } else {
      navbar.classList.remove('shadow-lg', 'bg-dark-base/95');
      navbar.classList.add('bg-dark-base/80');
    }

    // Scroll Indicator
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.classList.add('opacity-0', 'pointer-events-none');
      } else {
        scrollIndicator.classList.remove('opacity-0', 'pointer-events-none');
      }
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
          // Check if we want a specific animation like blur-in
          if (entry.target.classList.contains('reveal-blur')) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-blur-in');
          } else {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-[fadeInUp_0.8s_ease-out_forwards]');
          }
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

  // --- 5. Image Gallery Logic ---
  const galleries = document.querySelectorAll('.image-gallery');
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-image');
    const dots = gallery.querySelectorAll('.gallery-dot');
    let currentIndex = 0;

    const showImage = (index) => {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('bg-neon-teal', 'scale-125'));
      dots.forEach(dot => dot.classList.add('bg-white/20'));

      images[index].classList.add('active');
      dots[index].classList.remove('bg-white/20');
      dots[index].classList.add('bg-neon-teal', 'scale-125');
    };

    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentIndex = index;
          showImage(currentIndex);
        });
      });

      // Auto-switch every 5 seconds
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 5000);
    }
  });

  // --- 6. 3D Tilt Effect for Elite Cards ---
  const tiltCards = document.querySelectorAll('.elite-card-glow');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 30; // Subtle rotation
      const rotateY = (centerX - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      card.style.transition = 'none'; // Instant response on move
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      card.style.transition = 'transform 0.5s ease'; // Smooth return
    });
  });

  // --- 7. Mouse Parallax for Background Orbs ---
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    
    document.querySelectorAll('.floating-orb').forEach((orb, index) => {
      const speed = (index + 1) * 30;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // --- 8. 3D Tilt for Hero Image ---
  const heroImage = document.querySelector('#hero-visual');
  if (heroImage) {
    heroImage.addEventListener('mousemove', (e) => {
      const rect = heroImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateX = (y - rect.height / 2) / 10;
      const rotateY = (rect.width / 2 - x) / 10;
      
      heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    heroImage.addEventListener('mouseleave', () => {
      heroImage.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
  }

});
