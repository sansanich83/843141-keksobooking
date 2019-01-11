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

  var validationMapping = function () {
    return roomNumber.value === '100' || capacity.value === '0' ?
      roomNumber.value === '100' && capacity.value === '0' :
      parseInt(roomNumber.value, 10) >= parseInt(capacity.value, 10);
  };

  var disableCapacityOption = function (options) {
    options.forEach(function (item) {
      item.disabled = true;
    });
  };

  var enableCapacityOption = function (option) {
    option.disabled = false;
  };

  disableCapacityOption(startCapacityOptions);

  var isNotForGuest = function () {
    if (!validationMapping()) {
      capacity.setCustomValidity('Выберите "не для гостей"');
      roomNumber.setCustomValidity('Такое количество комнат не подходит для гостей');
      markInvalidRooms(roomNumber);
      markInvalidRooms(capacity);
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }

  };
  var isWrongCapacity = function () {
    if (!validationMapping()) {
      capacity.setCustomValidity('Выберите количество гостей 1');
      roomNumber.setCustomValidity('в одну комнату помещается максимум 1 гость');
      markInvalidRooms(roomNumber);
      markInvalidRooms(capacity);
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };

  var isTwoGuest = function () {
    if (!validationMapping()) {
      capacity.setCustomValidity('Выберите количество гостей 2 или 1');
      roomNumber.setCustomValidity('2 комнаты подходят для 2 гостей или меньше');
      markInvalidRooms(roomNumber);
      markInvalidRooms(capacity);
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };

  var isThreeGuest = function () {
    if (!validationMapping()) {
      capacity.setCustomValidity('Выберите количество гостей 3, 2 или 1');
      roomNumber.setCustomValidity('3 комнаты подходят для 3 гостей или меньше');
      markInvalidRooms(roomNumber);
      markInvalidRooms(capacity);
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };
  roomNumber.addEventListener('input', function () {

    if (roomNumber.value === '1') {
      disableCapacityOption(startCapacityOptions);
      enableCapacityOption(capacityOptions[2]);
      isWrongCapacity();
    }
    if (roomNumber.value === '2') {
      disableCapacityOption(capacityOptions);
      enableCapacityOption(capacityOptions[1]);
      enableCapacityOption(capacityOptions[2]);
      isTwoGuest();
    }
    if (roomNumber.value === '3') {
      disableCapacityOption(capacityOptions);
      enableCapacityOption(capacityOptions[0]);
      enableCapacityOption(capacityOptions[1]);
      enableCapacityOption(capacityOptions[2]);
      isThreeGuest();
    }
    if (roomNumber.value === '100') {
      disableCapacityOption(capacityOptions);
      enableCapacityOption(capacityOptions[3]);
      isNotForGuest();
    }
  });

  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('click', function () {
    markInvalidInput(window.common.priceInput);
    markInvalidInput(window.common.titleInput);
    if (roomNumber.value === '100') {
      isNotForGuest();
    } else if (roomNumber.value === '2') {
      isTwoGuest();
    } else if (roomNumber.value === '3') {
      isThreeGuest();
    } else {
      isWrongCapacity();
    }
  });

  var markInvalidRooms = function (input) {
    input.classList.add('input-invalid');
  };

  var markValidRooms = function (input) {
    input.classList.remove('input-invalid');
  };

  var markInvalidInput = function (input) {
    if (!input.checkValidity()) {
      input.classList.add('input-invalid');
    }
  };

  var markValidInput = function (input) {
    if (input.checkValidity()) {
      input.classList.remove('input-invalid');
    }
  };

  window.common.adForm.addEventListener('input', function () {
    markValidInput(window.common.priceInput);
    markValidInput(window.common.titleInput);
    if (validationMapping()) {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
      markValidRooms(roomNumber);
      markValidRooms(capacity);
    }
  });

  window.validation = {
    markValidInput: markValidInput,
    roomNumber: roomNumber,
    capacity: capacity,
    disableCapacityOption: disableCapacityOption,
    startCapacityOptions: startCapacityOptions,
    enableCapacityOption: enableCapacityOption,
    capacityOptions: capacityOptions
  };

})();
