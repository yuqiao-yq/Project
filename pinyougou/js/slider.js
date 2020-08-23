window.addEventListener('load', function () {
    var sliderbar = document.querySelector('.slider-bar');
    var main = document.querySelector('.main');
    var mainTop = main.offsetTop;
    var sliderbarTop = sliderbar.offsetTop - mainTop;
    var guess = document.querySelector('.guess');
    var goBack = document.querySelector('.goBack');
    var guessTop = guess.offsetTop;
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= mainTop) {
            sliderbar.style.position = 'fixed';
            sliderbar.style.top = sliderbarTop + 'px';
        } else {
            sliderbar.style.position = 'absolute';
            sliderbar.style.top = '300px';
        }
        if (window.pageYOffset >= guessTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    });
})