document.addEventListener('DOMContentLoaded', function () {

    const navToggle = document.querySelector('.js-nav-toggle');
    const nav = document.querySelector('.js-nav');
    const navLinks = nav.querySelectorAll('.js-nav-link');


    //nav open/hide
    navToggle.addEventListener('click', function (evt) {
        evt.preventDefault();
        this.classList.toggle('main-nav__toggle--active');
        nav.classList.toggle('main-nav__wrapper--active');
    });


    //nav links active style and smooth scroll into sections
    navLinks.forEach(link => {
        link.addEventListener('click', function (evt) {
            evt.preventDefault();
            navLinks.forEach(link => {
                link.classList.remove('main-nav__link--active');
            });
            this.classList.add('main-nav__link--active');
            document.querySelector(`${this.hash}`).scrollIntoView({
                behavior: "smooth"
            });
        });
    });


    //modal window
    const callModalButton = document.querySelectorAll('.js-call-request-button');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = modalOverlay.querySelector('.modal');
    const modalClose = modal.querySelector('.modal__close');

    callModalButton.forEach(button => {
        button.addEventListener('click', function () {
            modalOverlay.style.display = 'block';
            setTimeout(() => {
                modalOverlay.classList.add('modal-overlay--active');
            }, 10);
            
            document.body.classList.add('page--modal-is-open');
        });
    });

    modalClose.addEventListener('click', function () {
        modalOverlay.classList.remove('modal-overlay--active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300);
        document.body.classList.remove('page--modal-is-open');
    });


    //about custom slider
    const aboutImages = document.querySelectorAll('.about__image');
    const aboutTrack = document.querySelector('.about__images-track');
    const aboutThumbs = document.querySelectorAll('.about__thumb');
    const trackWidth = aboutTrack.clientWidth;

    aboutTrack.style.width = aboutTrack.clientWidth * aboutImages.length + 'px';


    aboutThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function () {
            aboutThumbs.forEach(thumb => {
                thumb.classList.remove('about__thumb--active');
            });
            this.classList.add('about__thumb--active');
            aboutTrack.style.transform = `translateX(-${trackWidth * index}px)`;
        });
    });
    

});
