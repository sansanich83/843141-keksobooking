'use strict';
(function () {
  var deletePin = function () {
    var oldMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldMapPins.length; i++) {
      oldMapPins[i].remove();
    }
  };
  var reset = function () {
    window.activation.toggleFieldsDesable(true);
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    window.activation.deactivateMap();
    deletePin();
    window.common.adForm.reset();
    window.common.mapFilters.reset();
    window.common.priceInput.placeholder = '0';
    window.common.priceInput.setAttribute('min', '0');
    window.common.mapPinMain.style.left = 570 + 'px';
    window.common.mapPinMain.style.top = 375 + 'px';
    window.mapTactics.fillAddress();
    window.backend.isLoading = false;
    window.validation.markValidInput(window.common.priceInput);
    window.validation.markValidInput(window.common.titleInput);
    window.validation.markValidInput(window.validation.roomNumber);
    window.validation.markValidInput(window.validation.capacity);
    window.validation.disableCapacityOption(window.validation.startCapacityOptions);
    window.validation.enableCapacityOption(window.validation.capacityOptions[2]);
    window.activation.deactivateMapFiltersForm();
  };

  var adFormReset = document.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', reset);
  window.reset = reset;
  window.deletePin = deletePin;
})();
