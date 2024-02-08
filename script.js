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