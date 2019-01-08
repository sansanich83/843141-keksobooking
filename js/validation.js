'use strict';
(function () {
  var typeHouse = document.querySelector('#type');

  typeHouse.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value === 'bungalo') {
      window.common.priceInput.placeholder = '0';
      window.common.priceInput.setAttribute('min', '0');
    } else if (target.value === 'house') {
      window.common.priceInput.placeholder = '5000';
      window.common.priceInput.setAttribute('min', '5000');
    } else if (target.value === 'flat') {
      window.common.priceInput.placeholder = '1000';
      window.common.priceInput.setAttribute('min', '1000');
    } else if (target.value === 'palace') {
      window.common.priceInput.placeholder = '10000';
      window.common.priceInput.setAttribute('min', '10000');
    }
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('input', function (evt) {
    var targetValue = evt.target.value;
    timeOut.value = targetValue;
  });

  timeOut.addEventListener('input', function (evt) {
    var targetValue = evt.target.value;
    timeIn.value = targetValue;
  });

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var startCapacityOptions = capacity.querySelectorAll('option:not([value="1"])');

  var deleteCapacityOption = function (options) {
    options.forEach(function (item) {
      item.remove();
    });
  };
  deleteCapacityOption(startCapacityOptions);

  roomNumber.addEventListener('input', function () {

    if (roomNumber.value === '1') {
      deleteCapacityOption(capacityOptions);
      capacity.appendChild(capacityOptions[2]);
    }
    if (roomNumber.value === '2') {
      deleteCapacityOption(capacityOptions);
      capacity.appendChild(capacityOptions[1]);
      capacity.appendChild(capacityOptions[2]);
    }
    if (roomNumber.value === '3') {
      deleteCapacityOption(capacityOptions);
      capacity.appendChild(capacityOptions[0]);
      capacity.appendChild(capacityOptions[1]);
      capacity.appendChild(capacityOptions[2]);
    }
    if (roomNumber.value === '100') {
      deleteCapacityOption(capacityOptions);
      capacity.appendChild(capacityOptions[3]);
    }
  });

  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('click', function () {
    var markInvalidInput = function (input) {
      if (!input.checkValidity()) {
        input.classList.add('input-invalid');
      }
    };
    markInvalidInput(window.common.priceInput);
    markInvalidInput(window.common.titleInput);
  });

  var markValidInput = function (input) {
    if (input.checkValidity()) {
      input.classList.remove('input-invalid');
    }
  };

  window.common.adForm.addEventListener('input', function () {
    markValidInput(window.common.priceInput);
    markValidInput(window.common.titleInput);
  });

  window.validation = {
    markValidInput: markValidInput
  };

})();
