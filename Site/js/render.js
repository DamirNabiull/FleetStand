const helpers = [
    document.getElementById("helper_1"),
    document.getElementById("helper_2"),
    document.getElementById("helper_3"),
    document.getElementById("helper_4"),
    document.getElementById("helper_5"),
    document.getElementById("helper_6")
];

const cards = [
    document.getElementById("c1"),
    document.getElementById("c2"),
    document.getElementById("c3"),
    document.getElementById("c4"),
    document.getElementById("c5"),
    document.getElementById("c6")
];

const sliders = [
    document.getElementById("slide1"),
    document.getElementById("slide2"),
    document.getElementById("slide3"),
    document.getElementById("slide4"),
    document.getElementById("slide5"),
    document.getElementById("slide6")
]

const buttons = [
    document.getElementById("but1"),
    document.getElementById("but2"),
    document.getElementById("but3"),
    document.getElementById("but4"),
    document.getElementById("but5"),
    document.getElementById("but6")
]

const contents = [
    document.getElementById("con1"),
    document.getElementById("con2"),
    document.getElementById("con3"),
    document.getElementById("con4"),
    document.getElementById("con5"),
    document.getElementById("con6")
]

const titles = [
    document.getElementById("title1"),
    document.getElementById("title2"),
    document.getElementById("title3"),
    document.getElementById("title4"),
    document.getElementById("title5"),
    document.getElementById("title6")
]

const descriptions = [
    document.getElementById("desc1"),
    document.getElementById("desc2"),
    document.getElementById("desc3"),
    document.getElementById("desc4"),
    document.getElementById("desc5"),
    document.getElementById("desc6")
]

const bigImages = [
    document.getElementById("bi1"),
    document.getElementById("bi2"),
    document.getElementById("bi3"),
    document.getElementById("bi4"),
    document.getElementById("bi5"),
    document.getElementById("bi6")
]

// const element = document.getElementById("con");

var currentCard = null;
var currentContent = null;
var currentSlider = null;
var currentButton = null;
var currentHelper = null;
var currentTitle = null;
var currentDescription = null;
var currentState = null;
var currentBigImage = null;
var currIndex = -1;

var prevCard = null;
var prevContent = null;
var prevSlider = null;
var prevButton = null;
var prevHelper = null;
var prevTitle = null;
var prevDescription = null;
var prevState = null;
var prevBigImage = null;
var prevBlocked = false;
var prevIndex = -1;

var contPosition = 0;
var range = 0;
var openTimer = null;
var slideIndex = 1;

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        if (!blocked) {
            openContentCompletly();
        }
    }
}

var allImages = document.getElementsByClassName("mySlides")
for (var i = 0; i < allImages.length; i++) {
    allImages[i].onclick = function () {
        currentHelper.getElementsByClassName("Cancel")[0].style.display = "block";
        setBigImage();
        currentBigImage.style.display = "block";
    }
}

var allBigImages = document.getElementsByClassName("BigImage")
for (var i = 0; i < allBigImages.length; i++) {
    allBigImages[i].onclick = function () {
        currentBigImage.style.display = "none";
        currentHelper.getElementsByClassName("Cancel")[0].style.display = "none";
    }
}

var allCancel = document.getElementsByClassName("Cancel")
for (var i = 0; i < allCancel.length; i++) {
    allCancel[i].onclick = function () {
        currentBigImage.style.display = "none";
        currentHelper.getElementsByClassName("Cancel")[0].style.display = "none";
    }
}

// currentCard = cards[0];
// currentContent = contents[0];
// currentSlider = sliders[0];
// currentButton = buttons[0];
// currentHelper = helpers[0];
// currentTitle = titles[0];
// currentDescription = descriptions[0];
// currentState = 0;

var currentFirstImage = null;
var prevFirstImage = null;

const content_small_height = 1148.93;
const content_full_height = 1952.71;

const content_photo_height = 960.17;

const card_initial_margin = 241.15;
const card_end_margin = 388.61;

// const maxPosition = 8544.38;
const maxPosition = 8784.38;

const openAnimOpacity = "0.2s linear 0.4s";
const closeAnimOpacity = "0.2s linear";

var position = 0;
var blocked = false;

const ipc = require("electron").ipcRenderer;

ipc.on("position-changed", function (evt, message) {
    // position = message.pos * maxPosition;
    // window.scrollTo(position, 0);
    // console.log(window.scrollX);
});

// SCROLL

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function setBigImage() {
    var slides = currentSlider.getElementsByClassName("mySlides");
    currentBigImage.src = slides[slideIndex - 1].getElementsByClassName("sliderImage")[0].src;
}

function showSlides(n) {
    var i;
    var slides = currentSlider.getElementsByClassName("mySlides");
    var dots = currentSlider.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



function openAllScrollerImages() {
    currentFirstImage = currentSlider.getElementsByClassName("sliderImage");
    for (i = 0; i < currentFirstImage.length; i++) {
        currentFirstImage[i].style.height = `${content_photo_height}px`;
    }
}

function closeAllScrollerImages() {
    for (i = 0; i < prevFirstImage.length; i++) {
        prevFirstImage[i].style.height = `${0}px`;
    }
}

// ANIMATIONS

function openCard() {
    if (currentState < 1) {
        currentState = 1;
        currentCard.style.marginTop = `${card_end_margin}px`;
        currentHelper.style.zIndex = "100";
    }
}

function closeCard() {
    prevCard.style.marginTop = `${card_initial_margin}px`;
    prevBlocked = false;
    prevHelper.style.zIndex = "-100";
}

function openContentImageOnly() {
    if (currentState < 2) {
        currentState = 2;
        currentContent.style.height = `${content_small_height}px`;
        currentSlider.style.opacity = "100";
        openAllScrollerImages();
        currentButton.style.transition = openAnimOpacity;
        currentButton.style.visibility = "visible";
        currentButton.style.opacity = "100";
    }
}

function closeContentImageOnly() {
    prevHelper.style.zIndex = "-100";
    prevContent.style.height = `${0}px`;
    prevSlider.style.opacity = "0";
    closeAllScrollerImages();
    prevButton.style.transition = closeAnimOpacity;
    prevButton.style.visibility = "hidden";
    prevButton.style.opacity = `0`;
}

function openContentCompletly() {
    if (currentState < 3) {
        currentState = 3;
        currentButton.style.transition = closeAnimOpacity;
        currentButton.style.visibility = "hidden";
        currentButton.style.opacity = `0`;

        currentContent.style.height = `${content_full_height}px`;

        currentTitle.style.opacity = "100";

        currentDescription.style.transition = openAnimOpacity;
        currentDescription.style.opacity = "100";
    }
}

function closeContentCompletly() {
    prevHelper.style.zIndex = "-100";
    prevContent.style.height = `${content_small_height}px`;
    prevTitle.style.opacity = "0";
    prevDescription.style.transition = closeAnimOpacity;
    prevDescription.style.opacity = "0";
}

function openAnim() {
    if (currentState < 1) {
        openCard()
        openTimer = setTimeout(function () {
            openContentImageOnly();
        }, 3000);
    }
}

function closeAnim() {
    prevBlocked = true;
    console.log("closeAnim");
    console.log(prevState);
    prevBigImage.style.display = "none";
    prevHelper.getElementsByClassName("Cancel")[0].style.display = "none";
    if (prevState > 2) {
        closeContentCompletly();
        setTimeout(function () {
            closeContentImageOnly();
        }, 500)
        setTimeout(function () {
            closeCard();
        }, 1000)
    }
    else if (prevState > 1) {
        closeContentImageOnly();
        setTimeout(function () {
            closeCard();
        }, 500)
    }
    else {
        closeCard();
    }
}

function replaceCurrentPrev() {
    if (currentState > 0 && !prevBlocked) {
        console.log("replaceCurrentPrev");
        clearTimeout(openTimer);

        prevCard = currentCard;
        prevContent = currentContent;
        prevSlider = currentSlider;
        prevButton = currentButton;
        prevHelper = currentHelper;
        prevTitle = currentTitle;
        prevDescription = currentDescription;
        prevState = currentState;
        prevFirstImage = currentFirstImage;
        prevBigImage = currentBigImage;
        prevIndex = currIndex;

        currentState = 0;

        closeAnim();
    }
}

function setCurrent() {
    if (currentState < 1) {
        currentCard = cards[currIndex];
        currentContent = contents[currIndex];
        currentSlider = sliders[currIndex];
        currentButton = buttons[currIndex];
        currentHelper = helpers[currIndex];
        currentTitle = titles[currIndex];
        currentDescription = descriptions[currIndex];
        currentBigImage = bigImages[currIndex];
        slideIndex = 1;
        showSlides(1);
        openAnim();
    }
}

setInterval(() => {
    position = window.scrollX;
    contPosition = position - 1442.3;
    if (contPosition >= 0) {
        range = contPosition % 497.66;
        if (range < 356.59 && range > 56.59) {
            currIndex = Math.floor(contPosition / 497.66);
            if (currIndex < 12 || (currIndex == prevIndex && !prevBlocked)) {
                setCurrent();
            }
        }
        else {
            replaceCurrentPrev();
            currIndex = -1;
        }
    }
    else if (currentHelper != null && currIndex != prevIndex) {
        replaceCurrentPrev();
        currIndex = -1;
    }
}, 1);
