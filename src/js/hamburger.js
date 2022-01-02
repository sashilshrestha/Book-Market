const navSlide = () => {
    const burger = document.querySelector('.ham-burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const bgBlur = document.querySelector('.blur-bg');
    const bgBlurTouch = document.querySelector('.blur-bg');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade .5s ease forwards ${
                    index / 7 + 0.2
                }s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');

        // Blur Background
        bgBlur.classList.toggle('open');
    });

    bgBlurTouch.addEventListener('click', () => {
        nav.classList.remove('nav-active');

        // Burger Animation
        burger.classList.remove('toggle');

        // Blur Background
        bgBlur.classList.remove('open');
    });
};

navSlide();