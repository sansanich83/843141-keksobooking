'use strict';
(function () {

  var getData = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  var onError = function (message) {
    console.error(message);
    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);
    window.common.main.appendChild(errorElement);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      var error = document.querySelector('.error');
      error.remove();
    });
  };

  var onLoad = function (data) {
    window.rentObects = data;
    var mapPins = document.querySelectorAll('.map__pin');
    if (mapPins.length < 2) {
      window.ads.makeNewMapPin(window.rentObects.length);
    }
    mapPins = document.querySelectorAll('.map__pin');
    for (var k = 1; k < mapPins.length; k++) {
      window.mapTactics.addMapPinListener(mapPins[k], window.rentObects[k - 1]);
    }
  };

  var sendForm = function (data, onSend) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSend();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.common.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendForm(new FormData(window.common.adForm), onSend);
  });

  var onSend = function () {
    window.reset();
  };

  window.backend = {
    onError: onError,
    onLoad: onLoad,
    getData: getData,
    sendForm: sendForm
  };
})();
