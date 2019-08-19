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
    const modalCloseButton = modal.querySelector('.modal__close');
    const modalInput = modal.querySelectorAll('.modal__input');
    const modalSendButton = modal.querySelector('.modal__button');
    const modalInfo = modal.querySelector('.modal__info');


    callModalButton.forEach(button => {
        button.addEventListener('click', function () {
            openModal();
        });
    });

    modalOverlay.addEventListener('click', function (evt) {
        if (evt.target === this || evt.target === modalCloseButton) {
            closeModal();
        }        
    });

    modalSendButton.addEventListener('click', function (evt) {
        modalInput.forEach(input => {
            if (!input.value.length) {
                evt.preventDefault();
                modalInfo.style.display = 'block';
                modalInfo.textContent = 'Заполните оба поля';
                setTimeout(() => {
                    modalInfo.style.display = 'none';
                }, 3000);
            }
        });
    });

    function openModal() {
        modalOverlay.style.display = 'block';
        setTimeout(() => {
            modalOverlay.classList.add('modal-overlay--active');
        }, 10);
        document.body.classList.add('page--modal-is-open');
    }

    function closeModal() {
        modalOverlay.classList.remove('modal-overlay--active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300);
        document.body.classList.remove('page--modal-is-open');
    }
    

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


    //apartments filter
    const filterButtons = document.querySelectorAll('.js-filter-button');
    const filterApartments = document.querySelectorAll('.apartments__item');

    


});
