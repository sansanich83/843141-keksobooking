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

  var checkPrice = function (rentOffer) {
    if ((filterPrice.value === 'middle') && (rentOffer.offer.price >= 10000) && (rentOffer.offer.price <= 50000)) {
      return true;
    } else if ((filterPrice.value === 'low') && (rentOffer.offer.price < 10000)) {
      return true;
    } else if ((filterPrice.value === 'high') && (rentOffer.offer.price > 50000)) {
      return true;
    } else if (filterPrice.value === 'any') {
      return true;
    }
    return false;
  };

  var checkType = function (rentOffer) {
    return ((filterType.value === rentOffer.offer.type) || (filterType.value === 'any'));
  };

  var checkRoom = function (rentOffer) {
    return ((parseInt(filterRoom.value, 10) === rentOffer.offer.rooms) || (filterRoom.value === 'any'));
  };

  var checkGuest = function (rentOffer) {
    return ((parseInt(filterGuest.value, 10) === rentOffer.offer.guests) || (filterGuest.value === 'any'));
  };

  var findFeature = function (rentOffer, feature) {
    for (var i = 0; i < rentOffer.offer.features.length; i++) {
      if (rentOffer.offer.features[i] === feature) {
        return true;
      }
    }
    return false;
  };

  var checkWifi = function (rentOffer) {
    if (filterWifi.checked) {
      return (findFeature(rentOffer, 'wifi'));
    } else {
      return true;
    }
  };

  var checkDishwasher = function (rentOffer) {
    if (filterDishwasher.checked) {
      return (findFeature(rentOffer, 'dishwasher'));
    } else {
      return true;
    }
  };

  var checkParking = function (rentOffer) {
    if (filterParking.checked) {
      return (findFeature(rentOffer, 'parking'));
    } else {
      return true;
    }
  };

  var checkWasher = function (rentOffer) {
    if (filterWasher.checked) {
      return (findFeature(rentOffer, 'washer'));
    } else {
      return true;
    }
  };

  var checkElevator = function (rentOffer) {
    if (filterElevator.checked) {
      return (findFeature(rentOffer, 'elevator'));
    } else {
      return true;
    }
  };

  var checkConditioner = function (rentOffer) {
    if (filterConditioner.checked) {
      return (findFeature(rentOffer, 'conditioner'));
    } else {
      return true;
    }
  };

  var onFilterChange = function () {
    window.deletePin();
    window.filteredObjects = window.rentObjects.filter(function (rentOffer) {
      return checkPrice(rentOffer) && checkType(rentOffer) && checkRoom(rentOffer) &&
        checkGuest(rentOffer) && checkWifi(rentOffer) && checkDishwasher(rentOffer) &&
        checkParking(rentOffer) && checkWasher(rentOffer) && checkElevator(rentOffer) && checkConditioner(rentOffer);
    });
    if (window.filteredObjects.length > 5) {
      window.filteredObjects = window.filteredObjects.slice(0, 5);
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
