'use strict';
(function () {

  var URL = 'https://js.dump.academy/keksobooking';
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

    window.backend.isLoading = true;
    xhr.open('GET', url);
    xhr.send();
  };

  var onError = function () {
    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);
    var error = errorElement.querySelector('.error');
    var errorButton = errorElement.querySelector('.error__button');
    window.common.main.appendChild(errorElement);
    var onClickCloseError = function () {
      error.remove();
      document.removeEventListener('keydown', onEscCloseError);
    };
    var onEscCloseError = function (evt) {
      if (evt.keyCode === 27) {
        error.remove();
        document.removeEventListener('keydown', onEscCloseError);
      }
    };
    errorButton.addEventListener('click', onClickCloseError);
    document.addEventListener('keydown', onEscCloseError);
    error.addEventListener('click', onClickCloseError);
  };
  window.rentObjects = [];
  var onLoad = function (data) {
    window.rentObjects = data;
    var mapPins = document.querySelectorAll('.map__pin');
    if (mapPins.length < 2) {
      window.ads.makeNewMapPin(5, window.rentObjects);
    }
    mapPins = document.querySelectorAll('.map__pin');
    for (var k = 1; k < mapPins.length; k++) {
      window.mapTactics.addMapPinListener(mapPins[k], window.rentObjects[k - 1]);
    }
    window.activation.activateMapFiltersForm();
  };

  var sendForm = function (data, onSend) {
    var xhr = new XMLHttpRequest();
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
    var successTemplate = document.querySelector('#success');
    var successElement = successTemplate.content.cloneNode(true);
    var success = successElement.querySelector('.success');
    window.common.main.appendChild(successElement);
    var onClickCloseSuccess = function () {
      success.remove();
      document.removeEventListener('keydown', onEscCloseSuccess);
    };
    var onEscCloseSuccess = function (evt) {
      if (evt.keyCode === 27) {
        success.remove();
        document.removeEventListener('keydown', onEscCloseSuccess);
      }
    };

    document.addEventListener('keydown', onEscCloseSuccess);
    success.addEventListener('click', onClickCloseSuccess);
  };

  window.backend = {
    onError: onError,
    onLoad: onLoad,
    getData: getData,
    sendForm: sendForm,
    isLoading: false
  };
})();
