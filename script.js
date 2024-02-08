// Объявление и функционал main-slider'а
const mainSlider = new Swiper('#main-slider', {
  loop: true,
  speed: 1000,
  // fade-эффект работает, но т.к. картинка по сути одна и та же для демонстрации работоспособности слайдера пока отключил
  // effect: 'fade',
  // crossFade: false,
  autoplay: {
    disableOnInteraction: false,
  },

  // Navigation arrows
  navigation: {
    nextEl: '#main-slider_next',
    prevEl: '#main-slider_prev',
  },
  pagination: {
    el: "#main-slider_pagination",
    type: "progressbar",
  },
});

// Старт/пауза автовоспроизведения слайдера
isSliderPaused = false
function toggelSliderPause(){
  if(isSliderPaused){
    mainSlider.autoplay.start()
  } else{
    mainSlider.autoplay.stop()
  }
  isSliderPaused = !isSliderPaused
}



// Объявление и функционал слайдеров в functions-section
const functionsSwiper1 = new Swiper('#functions_swiper-1', {
  direction: 'horizontal',
  loop: true,
  breakpoints:{
    1400: {
      direction:'vertical',
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '#functions_swiper_next',
    prevEl: '#functions_swiper_prev',
  },
});

const functionsSwiper2 = new Swiper('#functions_swiper-2', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: "#functions_swiper_pagination",
    type: "progressbar",
  },
});
functionsSwiper1.controller.control = functionsSwiper2;
functionsSwiper2.controller.control = functionsSwiper1;



// Объявление и функционал слайдеров в control-section
const controlSwiper1 = new Swiper('#control_swiper-1', {
  direction: 'horizontal',
  loop: true,
  breakpoints:{
    1400: {
      direction:'vertical',
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '#control_swiper_next',
    prevEl: '#control_swiper_prev',
  },
});

const controlSwiper2 = new Swiper('#control_swiper-2', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: "#control_swiper_pagination",
    type: "progressbar",
  },
});
controlSwiper1.controller.control = controlSwiper2;
controlSwiper2.controller.control = controlSwiper1;



// Показ car-info_bottom при скроле вверх
let ScrollPosition = 0
const bottomBlock = document.getElementsByClassName("car-info_bottom")[0]
window.addEventListener('scroll', function() {
  let current = window.scrollY
  if (ScrollPosition > current){
    bottomBlock.classList.add("active")
  } else{
    bottomBlock.classList.remove("active")
  }
  ScrollPosition = current
});



// Переключение цветов в colors-showcase
let colorsSection = document.getElementsByClassName("colors-showcase")[0].style
colors = ["linear-gradient(90deg, #BABABA 0%, #F3F3F3 100%)", "black", "green", "aqua", "silver", "brown"]
let buttons = document.querySelectorAll(".colors_list button")

function changeCarColor(index){  
  if (index == 0){
    colorsSection.background = colors[index]
    colorsSection.color = "#18181B"
  } else{
    colorsSection.background = colors[index]
    colorsSection.color = "white"
  }
  buttons.forEach((btn) => btn.classList.remove("active"))
  buttons[index].classList.add("active")
}

