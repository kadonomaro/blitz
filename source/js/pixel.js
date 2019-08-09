document.addEventListener('DOMContentLoaded', function () {
    let pixelToggle = document.querySelector('.pixel__check');
    
    pixelToggle.addEventListener('change', function () {
        document.body.classList.toggle('page--pixel');
    });
});