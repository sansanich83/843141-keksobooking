'use strict';
(function () {

  var BOTTOM_LIMIT = 625;
  var TOP_LIMIT = 90;
  var address = document.querySelector('#address');
  var onEscPress = function (evt) {
    if (evt.keyCode === 27) {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    }
  };

  var addMapPinListener = function (mapPinsOne, rentObectsOne) {
    mapPinsOne.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      if (!mapCard) {
        window.ads.renderPopup(rentObectsOne);
      } else {
        mapCard.remove();
        window.ads.renderPopup(rentObectsOne);
      }
      var xCoordinate = mapPinsOne.offsetLeft + 31;
      var yCoordinate = mapPinsOne.offsetTop - 101;
      address.value = Math.round(xCoordinate) + ',' + Math.round(yCoordinate);
      var closePopupButton = document.querySelector('.popup__close');
      closePopupButton.addEventListener('click', function () {
        mapCard = document.querySelector('.map__card');
        mapCard.remove();
        document.removeEventListener('keydown', onEscPress);
      });
      document.addEventListener('keydown', onEscPress);
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      mapPinsOne.classList.add('map__pin--active');
    });
  };

  window.common.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var rightLimit = window.common.mapFaded.offsetWidth - 32;
      var leftLimit = -32;

      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPosition = {
        left: window.common.mapPinMain.offsetLeft - shift.x,
        top: window.common.mapPinMain.offsetTop - shift.y
      };

      if ((newPosition.left < rightLimit) && (newPosition.left > leftLimit)) {
        window.common.mapPinMain.style.left = (window.common.mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((newPosition.top < BOTTOM_LIMIT) && (newPosition.top > TOP_LIMIT)) {
        window.common.mapPinMain.style.top = (window.common.mapPinMain.offsetTop - shift.y) + 'px';
      }
      var fillAddress = function () {
        var mapPin = document.querySelector('.map__pin--main');
        var xCoordinate = mapPin.offsetLeft + 31;
        var yCoordinate = mapPin.offsetTop - 91;
        address.value = Math.round(xCoordinate) + ',' + Math.round(yCoordinate);
      };
      fillAddress();
    };

    var onMouseUp = function () {
      window.activation.activateMap();
      window.activation.toggleFieldsDesable(false);
      var mapPins = document.querySelectorAll('.map__pin');
      if (mapPins.length < 2) {
        window.ads.makeNewMapPin(8);
      }
      mapPins = document.querySelectorAll('.map__pin');
      for (var k = 1; k < mapPins.length; k++) {
        addMapPinListener(mapPins[k], window.rentObects[k - 1]);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
