'use strict';
(function () {
  var X_HALF_OF_PIN = 25;
  var Y_OF_PIN = 70;

  var typeMapping = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var pinTemplate = document.querySelector('#pin');
  var mapPinsConteiner = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  var makeNewMapPin = function (amountPins) {
    for (var i = 0; i < amountPins; i++) {
      var pinElement = pinTemplate.content.cloneNode(true);
      var avatarImgTemplate = pinElement.querySelector('img');
      var pinLocation = pinElement.querySelector('button');

      pinLocation.style.cssText = 'left:' + (window.rentObects[i].location.x - X_HALF_OF_PIN) + 'px;' + 'top:' + (window.rentObects[i].location.y - Y_OF_PIN) + 'px;';
      avatarImgTemplate.src = window.rentObects[i].author.avatar;
      avatarImgTemplate.alt = window.rentObects[i].offer.title;

      pinsFragment.appendChild(pinElement);
    }
    mapPinsConteiner.appendChild(pinsFragment);
  };

  var cardTemplate = document.querySelector('#card');

  var renderPopup = function (object) {
    var mapFiltersConteiner = document.querySelector('.map__filters-container');
    var cardElement = cardTemplate.content.cloneNode(true);
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupAddress = cardElement.querySelector('.popup__text--address');
    var popupPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupTitle.textContent = object.offer.title;
    popupAddress.textContent = object.offer.address;
    popupPrice.textContent = object.offer.price + ' ₽/ночь';
    popupType.textContent = typeMapping[object.offer.type];
    popupCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + object.offer.checkin + ' , выезд до ' + object.offer.checkout;

    var makeFeatureLi = function () {
      var featuresList = object.offer.features;
      for (var i = 0; i < featuresList.length; i++) {
        var featureLi = document.createElement('li');
        var featureClass = 'popup__feature--' + object.offer.features[i];
        featureLi.classList.add(featureClass, 'popup__feature');
        popupFeatures.appendChild(featureLi);
      }
    };
    makeFeatureLi();

    popupDescription.textContent = object.offer.description;

    var makePhotoImg = function () {
      var photoList = object.offer.photos;
      for (var i = 0; i < photoList.length; i++) {
        var photoImg = document.createElement('img');
        photoImg.classList.add('popup__photo');
        photoImg.src = object.offer.photos[i];
        photoImg.width = 45;
        photoImg.height = 40;
        photoImg.alt = 'Фотография жилья';
        popupPhotos.appendChild(photoImg);
      }
    };
    makePhotoImg();

    popupAvatar.src = object.author.avatar;
    window.common.mapFaded.insertBefore(cardElement, mapFiltersConteiner);
  };


  window.ads = {
    makeNewMapPin: makeNewMapPin,
    renderPopup: renderPopup
  };
})();
