const navSlide = () => {
    const burger = document.querySelector('.all-lines');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const bgBlur = document.querySelector('.blur-bg');
    const bgBlurTouch = document.querySelector('.blur-bg');
    const cartIcon = document.querySelector('.cart-icon');
    const cardContainer = document.querySelector('.cart-container');
    const cardBlur = document.querySelector('.cart-blur-bg');
    const cartSmallIcon = document.querySelector('.ham-burger .cart-icon');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        // navLinks.forEach((link, index) => {
        //     if (link.style.animation) {
        //         link.style.animation = '';
        //     } else {
        //         link.style.animation = `navLinkFade .5s ease forwards ${
        //             index / 7 + 0.2
        //         }s`;
        //     }
        // });

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

    cartIcon.addEventListener('click', () => {
        cardContainer.classList.toggle('cart-open');
        cardBlur.classList.add('open');
    });

    cartSmallIcon.addEventListener('click', () => {
        cardContainer.classList.toggle('cart-open');
        cardBlur.classList.add('open');
    });

    cardBlur.addEventListener('click', () => {
        cardContainer.classList.remove('cart-open');
        cardBlur.classList.remove('open');
    });
};

navSlide();

//use window.scrollY
let scrollpos = window.scrollY;
let header = document.getElementById('navigation');

function add_class_on_scroll() {
    header.classList.add('header-sticky');
}

function remove_class_on_scroll() {
    header.classList.remove('header-sticky');
}

window.addEventListener('scroll', function () {
    //Here you forgot to update the value
    scrollpos = window.scrollY;

    if (scrollpos > 10) {
        add_class_on_scroll();
    } else {
        remove_class_on_scroll();
    }
    console.log(scrollpos);
});
