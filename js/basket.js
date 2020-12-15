$(document).ready(function () { 

  $('.btn-office').click(function () {
    $('.priv-office').addClass('modal--show');
    $('.modal-overlay').addClass('modal--show')
  });

  $('.modal-priv').click(function (event) {
    event.preventDefault();
    $('.priv-office').addClass('modal--show');
    $('.modal-overlay').addClass('modal--show');
    $('.popup-catalog').removeClass('modal--show');
  });

  $('.private-office--close').click(function () {
    $('.priv-office').removeClass('modal--show');
    $('.modal-overlay').removeClass('modal--show');
  });


  $('.private-office--input').click(function () {
    $('.form-input-office').addClass('modal--show');
    $('.priv-office').removeClass('modal--show');
  });

  $('.cancel').click(function () {
    $('.form-input-office').removeClass('modal--show');
    $('.modal-overlay').removeClass('modal--show')
  });

  $('.private-office--registration').click(function () {
    $('.form-registration').addClass('modal--show');
    $('.priv-office').removeClass('modal--show');
  });

  $('.cancelbtn').click(function () {
    $('.form-registration').removeClass('modal--show');
    $('.modal-overlay').removeClass('modal--show')
  });
  
  let clicks = parseInt($('.basket-counter').text());
  $('.basket__delete .button').on('click', function (evt) {
    evt.preventDefault();
    clicks -= 1;
    document.getElementById("clicks").innerHTML = clicks;
    $('.basket__form').addClass('visuallyHidden')
  });
});