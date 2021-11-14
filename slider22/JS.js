let showPrevBtn = document.getElementById("showPrev");
let showNextBtn = document.getElementById("showNext");
let bandSlide = document.getElementsByClassName("band")[0];
let bandSlideImages = bandSlide.querySelectorAll("img");
let dots = document.getElementsByClassName("dot");
let currentImageIndex = 1;
let countLittleSlide = 20;
let timer;
let isSliderMoving = false;

bandSlide.style.marginLeft = -40 * (countLittleSlide * currentImageIndex) + "px"; // Устанавливаем текущий слайд.
dots[currentImageIndex - 1].classList.add("active"); // Уст. текущий dot

showPrevBtn.addEventListener("click", onShowPrevBtnClick);
showNextBtn.addEventListener("click", onShowNextBtnClick);

Array.from(dots).forEach((el, i) => el.setAttribute("data-key", i + 1)); // Устанавлием аттрибуты (ключи)

dots[0].parentElement.addEventListener("click", (e) => {
    if (!e.target.classList.contains("dot") || e.target.classList.contains("active") || isSliderMoving) return false;

    let image_key = +e.target.dataset[`key`];
    if (image_key > currentImageIndex) {
        sliderMove("right");
    } else {
        sliderMove("left");
    }
    currentImageIndex = image_key;
});

// ---------------  [ FUNCTIONS ] ----------------------------//

function onShowPrevBtnClick() {
    if (isSliderMoving) return false; // Если уже слайдер запущен 
    currentImageIndex--; // меняет индекс - обязательно
    sliderMove("left");
}

function onShowNextBtnClick() {
    if (isSliderMoving) return false; // Если уже слайдер запущен 
    currentImageIndex++;
    sliderMove("right");
}

function sliderMove(pos) {
    isSliderMoving = true; // Слайдер запущен
    pos = pos === "left" ? -1 : 1;
    timer = setInterval(function () {
        countLittleSlide = countLittleSlide + pos;
        bandSlide.style.marginLeft = -40 * countLittleSlide + "px";

        if (countLittleSlide !== (20 * currentImageIndex)) return false;
        clearInterval(timer); // Останавливаем таймер..
        isLastOrFirst(); // Проверяем на последний слайд или первый
        isSliderMoving = false; // Разрешаем клик
        //  --------------[ DOTS ] ------------- //
        Array.from(dots).find(d => d.classList.contains("active")).classList.remove('active'); // Ищем элемент с active
        dots[currentImageIndex - 1].classList.add("active"); // Устанавливаем класс active
    }, 35);
}

function isLastOrFirst() {
    if (currentImageIndex <= 0) { // Если первая картинка и жмем на лево .
        countLittleSlide = 20 * (bandSlideImages.length - 2);
        currentImageIndex = bandSlideImages.length - 2;
        bandSlide.style.marginLeft = -40 * countLittleSlide + "px";
    }
    if (currentImageIndex >= bandSlideImages.length - 1) { // Если последняя картинка и жмем на право .
        // Устанавливаем дефолтные настройки
        countLittleSlide = 20;
        currentImageIndex = 1;
        bandSlide.style.marginLeft = -40 * countLittleSlide + "px";
    }
}