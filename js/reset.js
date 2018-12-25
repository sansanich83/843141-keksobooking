'use strict';
(function () {
  var reset = function () {
    window.activation.toggleFieldsDesable(true);
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    window.activation.deactivateMap();
    var oldMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldMapPins.length; i++) {
      oldMapPins[i].remove();
    }
    window.common.adForm.reset();
    window.common.priceInput.placeholder = '0';
    window.common.priceInput.setAttribute('min', '0');
    window.common.mapPinMain.style.left = 570 + 'px';
    window.common.mapPinMain.style.top = 375 + 'px';
  };

  var adFormReset = document.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', reset);
  window.reset = reset;
})();
