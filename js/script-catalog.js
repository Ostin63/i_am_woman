$(document).ready(function () {
  
  // Добавление товара в корзину
  
  let clicks = parseInt($('.basket-counter').text());
  $('.key-buy').on('click', function () {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    $('.product__get').addClass('animation-my');
    setTimeout(function () {
      $('.product__get').removeClass('animation-my');
    }, 3000);
  });
});



// Каталог переключатель категорий

let catalogButtons = document.querySelectorAll('.button-cat');
for (let i = 0; i < catalogButtons.length; i++) {
  let catButton = catalogButtons[0];
  catButton.classList.add('action');
}

let catalogLists = document.querySelectorAll('.main-catalog__section');
for (let i = 0; i < catalogLists.length; i++) {
  let list = catalogLists[0];
  list.classList.add('select');
}
let catLists = [];
for (let i = 0; i < catalogLists.length; i++) {
  let catalogList = catalogLists[i];
  catLists.push(catalogList)
}

let addThumbnailClickButton = function (catalogButton, catList) {
  catalogButton.addEventListener('click', function (e) {
    let target = e.target;

    for (let i = 0; i < catalogButtons.length; i++) {
      let catButton = catalogButtons[i];
      catButton.classList.remove('action')
    }
    target.classList.add('action');

    for (let i = 0; i < catalogLists.length; i++) {
      let catalogList = catalogLists[i];
      catalogList.classList.remove('select')

    }

    catList.classList.add('select');
  });
};

for (let i = 0; i < catalogButtons.length; i++) {
  addThumbnailClickButton(catalogButtons[i], catLists[i]);
};
