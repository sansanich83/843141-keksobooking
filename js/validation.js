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

  var validationMapping = function () {
    if (roomNumber.value === '1' && capacity.value === '1') {
      return true;
    } else if (roomNumber.value === '1' && capacity.value === '2') {
      return false;
    } else if (roomNumber.value === '1' && capacity.value === '3') {
      return false;
    } else if (roomNumber.value === '1' && capacity.value === '0') {
      return false;
    } else if (roomNumber.value === '2' && capacity.value === '1') {
      return true;
    } else if (roomNumber.value === '2' && capacity.value === '2') {
      return true;
    } else if (roomNumber.value === '2' && capacity.value === '3') {
      return false;
    } else if (roomNumber.value === '2' && capacity.value === '0') {
      return false;
    } else if (roomNumber.value === '3' && capacity.value === '1') {
      return true;
    } else if (roomNumber.value === '3' && capacity.value === '2') {
      return true;
    } else if (roomNumber.value === '3' && capacity.value === '3') {
      return true;
    } else if (roomNumber.value === '3' && capacity.value === '0') {
      return false;
    } else if (roomNumber.value === '100' && capacity.value === '1') {
      return false;
    } else if (roomNumber.value === '100' && capacity.value === '2') {
      return false;
    } else if (roomNumber.value === '100' && capacity.value === '3') {
      return false;
    } else {
      return true;
    }
  };

  roomNumber.addEventListener('input', function (evt) {
    var target = evt.target;
    if (!validationMapping()) {
      target.setCustomValidity('в одну комнату помещается максимум 1 гость');
      capacity.setCustomValidity('в одну комнату помещается максимум 1 гость');
    } else {
      target.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  });

  capacity.addEventListener('input', function (evt) {
    var target = evt.target;
    if (!validationMapping()) {
      target.setCustomValidity('в одну комнату помещается максимум 1 гость');
      roomNumber.setCustomValidity('в одну комнату помещается максимум 1 гость');
    } else {
      target.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  });
})();
