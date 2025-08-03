    const navNumbers = document.querySelectorAll('.nav-number');
        const heroSwiper = new Swiper('.hero-swiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
                loop: true,
                speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        
      
        on: {
            slideChange: function() {
                updateCustomNavigation(this.realIndex);
            },
            init: function() {
                updateCustomNavigation(0);
            }
        }
    });

    navNumbers.forEach((navNumber, index) => {
        navNumber.addEventListener('click', function() {
            heroSwiper.autoplay.stop();
            
            heroSwiper.slideToLoop(index);
            
            updateCustomNavigation(index);
            
            setTimeout(() => {
                heroSwiper.autoplay.start();
            }, 3000);
        });
    });

    function updateCustomNavigation(activeIndex) {
        navNumbers.forEach((navNumber, index) => {
            if (index === activeIndex) {
                navNumber.classList.add('active');
            } else {
                navNumber.classList.remove('active');
            }
        });
    }

    

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-custom');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(59, 130, 246, 0.95) 50%, rgba(96, 165, 250, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'var(--primary-gradient)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    const heroSection = document.querySelector('.hero-section');
    
    heroSection.addEventListener('mouseenter', function() {
        heroSwiper.autoplay.stop();
    });
    
    heroSection.addEventListener('mouseleave', function() {
        heroSwiper.autoplay.start();
    });

    window.addEventListener('resize', function() {
        heroSwiper.update();
    });

    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSection.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSection.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                heroSwiper.slideNext();
            } else {
                heroSwiper.slidePrev();
            }
        }
    }

    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                heroSwiper.slidePrev();
                break;
            case 'ArrowRight':
                heroSwiper.slideNext();
                break;
            case '1':
                heroSwiper.slideToLoop(0);
                break;
            case '2':
                heroSwiper.slideToLoop(1);
                break;
            case '3':
                heroSwiper.slideToLoop(2);
                break;
        }
    });

    const slides = document.querySelectorAll('.swiper-slide');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideBackground = entry.target.querySelector('.slide-bg');
                if (slideBackground) {
                    const backgroundImage = slideBackground.style.backgroundImage;
                    if (backgroundImage) {
                        slideBackground.style.opacity = '1';
                    }
                }
                imageObserver.unobserve(entry.target);
            }
        });
    });

    slides.forEach(slide => {
        imageObserver.observe(slide);
    });


 AOS.init({
    duration: 1000,   
    once: false,     
  });