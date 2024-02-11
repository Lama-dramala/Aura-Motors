// Скрытие/показ breadcrumbs'ов
let breadcrumbsBlock = document.getElementsByClassName("breadcrumbs-wrap")[0]
let isBeadcrumbsVisible = false
function toggleBreadcrumbs(){
  if(isBeadcrumbsVisible){
    breadcrumbsBlock.classList.remove("active")
  } else{
    breadcrumbsBlock.classList.add("active")
  }
  isBeadcrumbsVisible = !isBeadcrumbsVisible
}



// Изменение закреплённой сверху навигации

// Получаем все ссылки в меню сверху
let carInfoTabs = document.querySelectorAll(".car-info-tabs li a")
// Получаем все секции, на которых ссылки будут активироваться
let tabsSections = [
  document.getElementById("car-info"),
  document.getElementById("main-slider_section"),
  document.getElementById("control-section"),
  document.getElementById("car-selection"),
  document.getElementById("contact-form-section"),
]
// Создаём observer и задаём его параметры
let tabsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Проверка, чтобы табы менялись только когда элемент наполовину виден в экране. 
      // Помогает решать ситуации, где две секции-тригера одновременно видны на экране, но не будет работать если секция будет длинной
      if (entry.intersectionRatio > 0.5){
        carInfoTabs.forEach((link) => link.classList.remove("active"))
        // Переменная, чтобы получатьи нформацию о том, какой таб сейчас должен быть активен
        // Для работы необходимо чтобы у соответствующих секций было значение data-
        activeTabindex = entry.target.dataset.tabIndex
        carInfoTabs[activeTabindex].classList.add("active")
        // Менять свойства псевдоэлементов (а именно им я и сделал прогресбар) невозможно, 
        // поэтому создал меременную внутри всей секции табов, которая отвечает за ширину прогресбара
        document.querySelector(".car-info_top").style.setProperty('--tabs-progressbar-width', `${25*activeTabindex+25}%`); 
      }  
    })    
  }, 
  // Трешхолд отвечает за то, на какой высоте элемента будет срабатывать функция обсёрвера. 
  // 0 - первый пиксель элемента, 1 - последний
  {threshold: [0, 0.5, 1]});

// Вешаем обсёрвер на все нужные элементы. В данном случае на все секции в массиве
tabsSections.forEach((section) => tabsObserver.observe(section));
// Функция, которая сбрасывает активные табы и прогрессбар если кто-то поднялся на верх страницы по ссылке, а не проскролив вверх
window.addEventListener('scroll', function() {
  if (window.scrollY < 100){
    carInfoTabs.forEach((link) => link.classList.remove("active"))
    carInfoTabs[0].classList.add("active")
    document.querySelector(".car-info_top").style.setProperty('--tabs-progressbar-width', `25%`); 
  }
});



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



// Объявление и функционал main-slider'а
const mainSlider = new Swiper('#main-slider', {
  loop: true,
  speed: 500,
  // fade-эффект работает, но т.к. картинка по сути одна и та же для демонстрации работоспособности слайдера пока отключил
  effect: 'fade',
  crossFade: false,
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
let pauseicon = document.getElementsByClassName("main-slider_pause-icon")[0]
let playicon = document.getElementsByClassName("main-slider_play-icon")[0]
function toggelSliderPause(){
  if(isSliderPaused){
    mainSlider.autoplay.start()
    pauseicon.classList.add("active")
    playicon.classList.remove("active")
  } else{
    mainSlider.autoplay.stop()
    pauseicon.classList.remove("active")
    playicon.classList.add("active")
  }
  isSliderPaused = !isSliderPaused
}



// Переключение цветов в colors-showcase
let colorsSection = document.getElementsByClassName("colors-showcase")[0].style
colors = [
  "linear-gradient(90deg, #BABABA 0%, #F3F3F3 100%)", 
  "linear-gradient(90deg, #0e100f 0%, #2e302f 100%)", 
  "linear-gradient(90deg, #1a2a29 0%, #294745 100%)", 
  "rgb(115, 212, 212)", 
  "silver", 
  "linear-gradient(90deg, rgb(122, 71, 11) 0%, rgb(133, 90, 41) 100%)", 
  "rgb(133, 90, 41)"
]
let buttons = document.querySelectorAll(".colors_list button")

function changeCarColor(index){  
  colorsSection.background = colors[index]
  if (index == 0 || index == 3 || index == 4){
    colorsSection.color = "#18181B"
  } else{
    colorsSection.color = "white"
  }
  buttons.forEach((btn) => btn.classList.remove("active"))
  buttons[index].classList.add("active")
}



// Объявление и функционал слайдеров в functions-section
const functionsSwiper1 = new Swiper('#functions_swiper-1', {
  direction: 'vertical',
  loop: true,

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



// Настройка панорамы
// Скрипт панорамы взят с https://atuin.ru/blog/3d-panorama-na-js/
// Почему-то не работает скролл вниз и вверх, возможно позже решу эту проблему, но пока что и так нормально

// Основные настройки:
// Из очевидного - id контейнера, который будет содержать панораму, тут он так и называется panorama
// Изображение делаится на какое-то количество частей. Это количество задаётся в const n. В примере это было 16, поэтому так и оставил
// Значение width - это ширина картинки делёная на const n. Тут это 6000/16 = 375 
// Значение height - это полная высота картинки
// В transformOrigin нужно поменять последнее значение, тут это -935%. К сожалению его нужно просто угадывать. Или я не знаю по какой формуле оно считается
// Путь к изображению пишем в свойстве backgroundImage
// В backgroundPosition идёт выражение i*-375+'px 0px' Тут нужно поменять всего-лишь число (в примере это 375) на то, которое стоит в width

gsap.set('#panorama', {perspective:1000}); //lower number exagerates the 'spheriness'
let zoom = 1,
stageH = gsap.getProperty('#panorama', 'height'),
mouse = {x:0.5, y:0.5}, // not pixels! these track position as a percentage of stage width/height
pov = { x:0.5, y:0.5, speed:0.03 },
auto = true;
const n = 16, //number of divs
c = document.getElementById('panorama');
for (let i=0; i<n; i++){  
	let b = document.createElement('div');  
	b.classList.add('box');
	c.appendChild(b);
	gsap.set(b, {
		left:'50%',
		top:'50%',
		xPercent:-50,
		yPercent:-70,
		color:'#fff',
		z:1300,
		width:375,
		height:2700,
		scaleX:-1, //flip horizontally
		rotationY:-89+i/n*-360+90,
		transformOrigin:String("50% 50% -935%"), //adjust 3rd percentage to remove space between divs
		backgroundImage:'url(img/car-view-bg-2.jpg)',
		backgroundPosition:i*-375+'px 0px' //offset should match width
	});  
}
window.onresize = (e)=>{ 
	stageH = gsap.getProperty('#panorama', 'height');
	gsap.to('.box', {y:0});
}
c.onmousemove = (e)=>{
	auto = false;
	gsap.killTweensOf(mouse);
	mouse.x = e.clientX/window.innerWidth;
	mouse.y = e.clientY/window.innerHeight;
}
c.onmouseleave = ()=>{ auto=true; }
c.onclick = (e)=>{
	gsap.to('.box', {duration:0.4, z:[1300,1500,1700][zoom]});
	zoom++;
	if (zoom==3) zoom=0;
}
setAutoX();
function setAutoX(){
	if (auto) gsap.to(mouse, {duration:5, x:gsap.utils.random(0.45,0.55), ease:'sine.in'});
	gsap.delayedCall(gsap.utils.random(3,5), setAutoX);
}
setAutoY();
function setAutoY(){
	if (auto) gsap.to(mouse, {duration:6, y:gsap.utils.random(0,1), ease:'sine.in'});
	gsap.delayedCall(gsap.utils.random(4,6), setAutoY);
}
gsap.ticker.add(()=> {  
	pov.x += (mouse.x - pov.x) * pov.speed;
	pov.y += (mouse.y - pov.y) * pov.speed;
	gsap.set('.box', {rotationY:(i)=>-89+i/n*-360+180*pov.x, y:(Math.abs(1000-stageH)/2)-(Math.abs(1000-stageH))*pov.y });
});



// Объявление и функционал слайдеров в control-section
const controlSwiper1 = new Swiper('#control_swiper-1', {
  direction: 'vertical',
  loop: true,

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



// Смена иконки закладки
function addBookmark(btn){
  btn.classList.toggle("active")
  console.log(btn.classList);
  console.log(btn.querySelectorAll("img")[0]);
}


