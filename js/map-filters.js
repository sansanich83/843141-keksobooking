'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRoom = document.querySelector('#housing-rooms');
  var filterGuest = document.querySelector('#housing-guests');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  var checkPrice = function (object) {
    if ((filterPrice.value === 'middle') && (object.offer.price > 10000) && (object.offer.price < 50000)) {
      return true;
    } else if ((filterPrice.value === 'low') && (object.offer.price < 10000)) {
      return true;
    } else if ((filterPrice.value === 'high') && (object.offer.price > 50000)) {
      return true;
    } else if (filterPrice.value === 'any') {
      return true;
    }
    return false;
  };

  var checkType = function (object) {
    return ((filterType.value === object.offer.type) || (filterType.value === 'any'));
  };

  var checkRoom = function (object) {
    return ((parseInt(filterRoom.value, 10) === object.offer.rooms) || (filterRoom.value === 'any'));
  };

  var checkGuest = function (object) {
    return ((parseInt(filterGuest.value, 10) === object.offer.guests) || (filterGuest.value === 'any'));
  };

  var findFeature = function (object, feature) {
    for (var i = 0; i < object.offer.features.length; i++) {
      if (object.offer.features[i] === feature) {
        return true;
      }
    }
    return false;
  };

  var checkWifi = function (object) {
    if (filterWifi.checked) {
      return (findFeature(object, 'wifi'));
    } else {
      return true;
    }
  };

  var checkDishwasher = function (object) {
    if (filterDishwasher.checked) {
      return (findFeature(object, 'dishwasher'));
    } else {
      return true;
    }
  };

  var checkParking = function (object) {
    if (filterParking.checked) {
      return (findFeature(object, 'parking'));
    } else {
      return true;
    }
  };

  var checkWasher = function (object) {
    if (filterWasher.checked) {
      return (findFeature(object, 'washer'));
    } else {
      return true;
    }
  };

  var checkElevator = function (object) {
    if (filterElevator.checked) {
      return (findFeature(object, 'elevator'));
    } else {
      return true;
    }
  };

  var checkConditioner = function (object) {
    if (filterConditioner.checked) {
      return (findFeature(object, 'conditioner'));
    } else {
      return true;
    }
  };

  var onFilterChange = function () {
    window.deletePin();
    window.filteredObjects = window.rentObjects.filter(function (object) {
      return checkPrice(object) && checkType(object) && checkRoom(object) &&
        checkGuest(object) && checkWifi(object) && checkDishwasher(object) &&
        checkParking(object) && checkWasher(object) && checkElevator(object) && checkConditioner(object);
    });
    if (window.filteredObjects.length > 5) {
      var sliceAmount = window.filteredObjects.length - 5;
      window.filteredObjects = window.filteredObjects.slice(sliceAmount);
    }
    window.ads.makeNewMapPin(window.filteredObjects.length, window.filteredObjects);
    var mapPins = document.querySelectorAll('.map__pin');
    for (var k = 1; k < mapPins.length; k++) {
      window.mapTactics.addMapPinListener(mapPins[k], window.filteredObjects[k - 1]);
    }
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var lastTimeout;

  mapFilters.addEventListener('change', function () {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(onFilterChange, 500);
  });

})();
