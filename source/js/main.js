document.addEventListener('DOMContentLoaded', function () {

    //navigation menu open/hide
    const navToggle = document.querySelector('.js-nav-toggle');
    const nav = document.querySelector('.js-nav');
    const navLinks = nav.querySelectorAll('.js-nav-link');

    navToggle.addEventListener('click', function (evt) {
        evt.preventDefault();
        this.classList.toggle('main-nav__toggle--active');
        nav.classList.toggle('main-nav__wrapper--active');
        if (!this.classList.contains('main-nav__toggle--active')) {
            navLinks.forEach(link => {
                link.classList.remove('main-nav__link--active');
            });
        }
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
    const viewModalButton = document.querySelectorAll('.js-view-request-button');

    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = modalOverlay.querySelector('.modal');
    const modalTitle = modal.querySelector('.modal__title');
    const modalSubtitle = modal.querySelector('.modal__subtitle');
    const modalCloseButton = modal.querySelector('.modal__close');
    const modalInput = modal.querySelectorAll('.modal__input');
    const modalSendButton = modal.querySelector('.modal__button');
    const modalInfo = modal.querySelector('.modal__info');

    callModalButton.forEach(button => {
        button.addEventListener('click', function () {
            openModal(
                'Перезвоним Вам за 5 минут',
                'Оставьте заявку и мы перезвоним за 5 минут, чтобы ответить на ваши вопросы',
                'Жду звонка'
            );
        });
    });

    viewModalButton.forEach(button => {
        button.addEventListener('click', function () {
            const apartTitle = this.parentNode.querySelector('.apartments-item__title').textContent;
            openModal(
                `${apartTitle}\nзапишитесь на просмотр недвижимости уже сегодня`,
                'Оставьте ваши данные и наш менеджер свяжется с Вами в ближайшее время',
                'Записаться'
            );
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

    function openModal(title, subtitle, submitText) {
        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle;
        modalSendButton.textContent = submitText;
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
    const aboutImagesContainer = document.querySelector('.about__images');
    const aboutImages = document.querySelectorAll('.about__image');
    const aboutTrack = document.querySelector('.about__images-track');
    const aboutThumbs = document.querySelectorAll('.about__thumb');

    aboutTrack.style.width = aboutImagesContainer.clientWidth * aboutImages.length + 'px';
    imageResize(aboutImages, aboutTrack, aboutImagesContainer);
    
    window.addEventListener('resize', function () {
        imageResize(aboutImages, aboutTrack, aboutImagesContainer);
    });

    function imageResize(images, track, sizeSource) {
        track.style.width = sizeSource.clientWidth * images.length + 'px';
        images.forEach(image => {
            image.style.maxWidth = sizeSource.clientWidth + 'px';
        });
    }

    aboutThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function () {
            aboutThumbs.forEach(thumb => {
                thumb.classList.remove('about__thumb--active');
            });
            this.classList.add('about__thumb--active');
            aboutTrack.style.transform = `translateX(-${aboutImagesContainer.clientWidth * index}px)`;
        });
    });


    //Apartments fade-in scroll animation
    const apartmentsItem = document.querySelectorAll('.apartments__item');
    fadeInAnimation(apartmentsItem, 'apartments__item--visible');

    function fadeInAnimation(elements, className) {
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        function callback(items) {
            items.forEach(item => {
                if (item.intersectionRatio > 0) {
                    item.target.classList.add(className);
                }
            });
        }

        let observer = new IntersectionObserver(callback, options);

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    //apartments filter
    const filterButtons = document.querySelectorAll('[data-filter]');
    const filterApartments = document.querySelectorAll('.apartments__item');

    filterItems();

    function filterItems() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(button => {
                    button.classList.remove('apartments-filter__button--active');
                });
                this.classList.add('apartments-filter__button--active');

                const [min, max] = this.dataset.filter.split('-');
                filterApartments.forEach(apart => {
                    const apartPrice = apart.querySelector('.apartments-item__price').textContent.replace(/\s/g, '');

                    if (+apartPrice >= min && +apartPrice <= max) {
                        apart.style.display = 'block';
                    } else {
                        apart.style.display = 'none';
                    }
                });
                
            });
        });
    }



    
});
