$(document).ready(function () {

  //header carusel

  $(".slide-1").owlCarousel({
    loop: true, //Зацикливаем слайдер
    nav: false, //Отключил навигацию
    autoplay: false, //Автозапуск слайдера
    items: 1,
    responsive: { //Адаптация в зависимости от разрешения экрана
      320: {
        margin: 10
      },
      764: {
        nav: true, 
        navText: true,
        navigation: true,
        navigationText: ["", ""],
        margin: 300,
        onInitialized: counterOneLength,
        onTranslated: counterOne
      },

      1440: {
        nav: true, 
        navText: true,
        navigation: true,
        navigationText: ["", ""],
        margin: 100,
        onInitialized: counterOneLength,
        onTranslated: counterOne
      }

    }

  });
  function counterOne(e) {
    let item = e.page.index + 1;
    $('.counter').html("0" + item + " &sol; ");
  }
  function counterOneLength(e) {
    $('.counter-sub').html(e.item.count);
  }

//Carousel new

  $(".slide-2").owlCarousel({
    loop: true, 
    nav: true, 
    navText: true,
    navigation: true,
    navigationText: ["", ""],
    autoplay: false,
    center: true,
    responsive: { 

      320: {

        items: 1

      },

      764: {

        items: 3,
        margin: 20,
        center: true

      },
      1440: {

        margin: 35

      }
    }

  });

  // Carousel blog

  $(".slide-3").owlCarousel({
    loop: true, 
    pagination: true,
    autoplay: false,
    navigation: true,
    navigationText: ["", ""],
    onInitialized: counterThreLength,
    onTranslated: counterThree,
    responsive: { 
      320: {
        items: 1
      },
      764: {
        slideBy: 1,
        items: 2,
        margin: 20
      },

      1440: {
        slideBy: 1,
        items: 3.5,
        margin: 36, 
        center: true
      }

    }

  });
  function counterThree(e) {
    let item = e.page.index + 1;
    $('.blog-counter').html("0" + item + " &sol; ");
  }
  function counterThreLength(e) {
    $('.blog-counter-sub').html(e.item.count);
  }

// header poppap

  $('.toogle').click(function () {
    $('.popup-catalog').addClass('modal--show');
    $('.modal-overlay').addClass('modal--show')
  });

  $('.close').click(function () {
    $('.popup-catalog').removeClass('modal--show');
    $('.modal-overlay').removeClass('modal--show')
  });
  $('.modal--list').click(function () {
    $('.popup-catalog').removeClass('modal--show');
    $('.modal-overlay').removeClass('modal--show')
  });
  $(document).keydown(function (evt) {
    if (evt.keyCode === 27) {
      $('.popup-catalog').removeClass('modal--show');
      $('.priv-office').removeClass('modal--show');
      $('.form-input-office').removeClass('modal--show');
      $('.form-registration').removeClass('modal--show');
      $('.modal-overlay').removeClass('modal--show')
    }
  });

  // waypoints

  let navli = $('.nav li a');
  let waypoints = $('.tracked').waypoint(function (dir) {
    let hash = this.element.id;
    if (dir === 'up') {
      let id = parseInt(hash.split('-')[1]);
      if (id > 1) id--;
      hash = [hash.split('-')[0], id].join('-');
    }

    navli.removeClass('show');

    $.each(navli, function () {
      if ($(this).attr('href').slice(1) == hash) {
        $(this).addClass('show')
      }
    });
  });
  waypoints[0].options.offset = -1;

});

// Блок новинок переключатель

let btnItems = document.querySelectorAll('.news__item');
for (let i = 0; i < btnItems.length; i++) {
  let btnItem = btnItems[0];
  btnItem.classList.add('item-acion');
};

let newsCarts = document.querySelectorAll('.news-cart');
for (let i = 0; i < newsCarts.length; i++){
  let cart = newsCarts[0];
  cart.classList.add('cart-active');
};
let catCarts = [];
for (let i = 0; i < newsCarts.length; i++) {
  let newsCart = newsCarts[i];
  catCarts.push(newsCart)
}

let addThumbnailClickBtn = function (itemButton, newsCart) {
  itemButton.addEventListener('click', function (e) {
    let target = e.target;

    for (let i = 0; i < btnItems.length; i++) {
      let item = btnItems[i];
      item.classList.remove('item-acion')
    }
    target.classList.add('item-acion');

    for (let i = 0; i < newsCarts.length; i++) {
      let cart = newsCarts[i];
      cart.classList.remove('cart-active')

    }
    newsCart.classList.add('cart-active')
  });
};

for (let i = 0; i < btnItems.length; i++) {
  addThumbnailClickBtn(btnItems[i], catCarts[i]);
}

// Поле поиска

let search = document.querySelector('.search');
let searchInp = search.children[0];
let searchLbl = search.children[1];
let searchBtn = search.children[2];
let searchBrd = search.children[3];
let searchCls = search.children[4];
let searchTxt, clonedTxt, clonedLbl, clonedLblWrap, animating = false, busy = true;
let TLTxt = new TimelineLite();
let TLSrch = new TimelineLite({
  onReverseComplete: () => {
    TLTxt.clear();
    animating = false;
  }
});

createTxt('Введите текст', searchLbl, 'search-text');
searchTxt = document.querySelectorAll('.search-text');

searchBtn.addEventListener('click', () => {
  if (!animating) animSearch();
});

searchBrd.addEventListener('click', () => {
  if (!animating) animSearch();
});

searchInp.addEventListener('focus', () => {
  if (busy || searchInp.value.trim().length) return;
  TLTxt.isActive() ? TLTxt.play() : TLTxt.restart().timeScale(1).staggerTo(searchTxt, .07, { opacity: 0 }, .035);
});

searchInp.addEventListener('blur', () => {
  if (busy || searchInp.value.trim().length) return;
  TLTxt.reverse().timeScale(1.3);
});

search.addEventListener('submit', e => {
  e.preventDefault();
  busy = true;
  TLTxt.paused() ? TLTxt.clear() : TLTxt.play();
  let val = searchInp.value.trim();
  searchInp.disabled = true;
  if (val.length) {
    cloneLbl();
    createLblTxt(val);
  }
  else TLSrch.reverse();
  searchInp.value = '';
  searchInp.blur();
});

searchCls.addEventListener('mousedown', e => {
  e.preventDefault();
});

searchCls.addEventListener('click', () => {
  if (busy) return;
  busy = true;
  let val = searchInp.value.trim();
  searchInp.disabled = true;
  if (val.length) {
    cloneLbl();
    createLblTxt(val);
  }
  else {
    TLTxt.isActive() ? TLTxt.play() : TLTxt.progress() == 1 ? TLTxt.clear() :
      TLTxt.restart().timeScale(1).staggerTo(searchTxt, .07, { opacity: 0 }, .035);
    TLSrch.reverse();
  }
  searchInp.value = '';
  searchInp.blur();
});

function createTxt(text, elLbl, textClass) {
  let splitText = [];
  for (let i = text.length; i--;) {
    splitText.unshift(`<span class='${textClass}'>${text[i]}</span>`);
  }
  elLbl.innerHTML = splitText.join('');
};

function createLblTxt(val) {
  createTxt(val, clonedLbl, 'cloned-text');
  clonedTxt = document.querySelectorAll('.cloned-text');
  animClonedTxt(Array.from(clonedTxt).reverse());
}

function animSearch() {
  animating = true;
  TLSrch.restart()
    .to(searchBrd, .4, { scaleX: 2, x: -25, y: 0, ease: Sine.easeIn })
    .to(searchBtn, .4, { rotationX: 90, ease: Sine.easeIn }, '-=.4')
    .to(searchBrd, .4, { rotation: 180, x: '-=6', y: '+=10', ease: Power2.easeInOut })
    .set(searchBrd, { transformOrigin: '0', marginRight: '-58px' })
    .to(searchBrd, .6, { scaleX: 63, ease: Power1.easeOut })
    .set(search, { className: '+=edge', onComplete: showTxt })
    .to(searchInp, .6, { scaleX: 1, ease: Sine.easeInOut }, '-=.3')
    .set(searchCls, { className: '+=visible' })
    .addPause();
}

function showTxt() {
  let tl = new TimelineLite({ onStart: () => { searchInp.disabled = true } });
  tl.staggerTo(searchTxt, .07, { opacity: 1 }, .035);
  setTimeout(() => {
    searchInp.disabled = false;
    busy = false;
  }, 300)
}

function animClonedTxt(el) {
  let scrollW = clonedLbl.scrollWidth;
  let offsetW = scrollW - clonedLbl.offsetWidth;
  let tl = new TimelineLite({ onComplete: () => { clonedLblWrap.remove() } });
  tl.staggerTo(el, .08, { opacity: 0 }, .04);
  let tlDur = tl.totalDuration();
  let offsetTime = (offsetW * tlDur) / scrollW;
  if (offsetW > 0) {
    TweenLite.fromTo(clonedLbl, offsetTime, { x: -offsetW }, { x: 0, delay: .2, ease: SlowMo.ease.config(0.1, 0.1, false) });
  };
  setTimeout(() => {
    TLSrch.reverse();
  }, Math.max((tlDur - .35) * 1000, 0));
}

function cloneLbl() {
  clonedLblWrap = document.createElement('div');
  clonedLblWrap.className = 'search-label';
  search.appendChild(clonedLblWrap);
  clonedLbl = document.createElement('div');
  clonedLblWrap.appendChild(clonedLbl);
};