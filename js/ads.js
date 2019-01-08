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

  var makeNewMapPin = function (amountPins, rentObjects) {
    for (var i = 0; i < amountPins; i++) {
      var pinElement = pinTemplate.content.cloneNode(true);
      var avatarImgTemplate = pinElement.querySelector('img');
      var pinLocation = pinElement.querySelector('button');

      pinLocation.style.cssText = 'left:' + (rentObjects[i].location.x - X_HALF_OF_PIN) + 'px;' + 'top:' + (rentObjects[i].location.y - Y_OF_PIN) + 'px;';
      avatarImgTemplate.src = rentObjects[i].author.avatar;
      avatarImgTemplate.alt = rentObjects[i].offer.title;

      pinsFragment.appendChild(pinElement);
    }
    mapPinsConteiner.appendChild(pinsFragment);
  };

  var cardTemplate = document.querySelector('#card');

  var renderPopup = function (rentOffer) {
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
    var rentOfferFeatures = rentOffer.offer.features;
    var rentOfferPhotos = rentOffer.offer.photos;
    popupTitle.textContent = rentOffer.offer.title;
    popupAddress.textContent = rentOffer.offer.address;
    popupPrice.textContent = rentOffer.offer.price + ' ₽/ночь';
    popupType.textContent = typeMapping[rentOffer.offer.type];
    popupCapacity.textContent = rentOffer.offer.rooms + ' комнаты для ' + rentOffer.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + rentOffer.offer.checkin + ' , выезд до ' + rentOffer.offer.checkout;

    var makeFeatureLi = function () {
      for (var i = 0; i < rentOfferFeatures.length; i++) {
        var featureLi = document.createElement('li');
        var featureClass = 'popup__feature--' + rentOffer.offer.features[i];
        featureLi.classList.add(featureClass, 'popup__feature');
        popupFeatures.appendChild(featureLi);
      }
    };
    if (rentOffer.offer) {
      makeFeatureLi();
    }

    if (rentOfferFeatures.length < 1) {
      popupFeatures.classList.add('visually-hidden');
    }
    if (rentOfferPhotos.length < 1) {
      popupPhotos.classList.add('visually-hidden');
    }


    popupDescription.textContent = rentOffer.offer.description;

    var makePhotoImg = function () {
      var photoList = rentOffer.offer.photos;
      for (var i = 0; i < photoList.length; i++) {
        var photoImg = document.createElement('img');
        photoImg.classList.add('popup__photo');
        photoImg.src = rentOffer.offer.photos[i];
        photoImg.width = 45;
        photoImg.height = 40;
        photoImg.alt = 'Фотография жилья';
        popupPhotos.appendChild(photoImg);
      }
    };
    makePhotoImg();

    popupAvatar.src = rentOffer.author.avatar;
    window.common.mapFaded.insertBefore(cardElement, mapFiltersConteiner);
  };


  window.ads = {
    makeNewMapPin: makeNewMapPin,
    renderPopup: renderPopup
  };
})();
