'use strict';

var SIZE_X = 1200;
var SIZE_Y_MIN = 130;
var SIZE_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 10000;
var MAX_GUEST = 5;
var MAX_ROOM = 6;
var MAX_FEATURES = 6;
var X_HALF_OF_PIN = 25;
var Y_OF_PIN = 70;
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var makeShuffleArray = function (array) {
  var shuffleArray = array.sort(function () { return 0.5 - Math.random() });
  return shuffleArray;
};

var shuffletitles = makeShuffleArray(titles);
var types = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_TYPES = types.length - 1;

var typeMapping = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var times = ['12:00', '13:00', '14:00'];
var NUMBER_OF_TIMES = times.length - 1;
var houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var shuffleFeatures = makeShuffleArray(houseFeatures);
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var shuffleAvatarNumbers = makeShuffleArray(avatarNumbers);

var makeAvatarImg = function (number) {
  var avatarImg = 'img/avatars/user' + '0' + number + '.png';
  return avatarImg;
};

var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var makePrice = function () {
  var roundPrice = getRandom(PRICE_MIN, PRICE_MAX);
  roundPrice = roundPrice / 1000;
  roundPrice = Math.round(roundPrice);
  roundPrice = roundPrice * 1000;
  return roundPrice;
};

var makeType = function () {
  var randomType = getRandom(0, NUMBER_OF_TYPES);
  var houseType = types[randomType];
  return houseType;
};

var makeRooms = function () {
  return getRandom(1, MAX_ROOM);
};

var makeGuests = function () {
  return getRandom(1, MAX_GUEST);
};

var makeCheckInOut = function () {
  var randomTimeIndex = getRandom(0, NUMBER_OF_TIMES);
  var randomTimes = times[randomTimeIndex];
  return randomTimes;
};

var makeFeatures = function () {
  var features = [];
  var randomNumberOfFeature = getRandom(1, MAX_FEATURES);
  for (var i = 0; i < randomNumberOfFeature; i++) {
    features[i] = shuffleFeatures[i];
  }
  return features;
};

var makePhotos = function () {
  var shufflePhotos = makeShuffleArray(photos);
  return shufflePhotos;
};

var makeLocationAndAddress = function () {
  var x = getRandom(1, SIZE_X);
  var y = getRandom(SIZE_Y_MIN, SIZE_Y_MAX);
  var location = {
    'x': x,
    'y': y,
    'address': x + ',' + y
  };
  return location;
};

var rentObects = [];
for (var i = 0; i < 8; i++) {
  var rentLocation = makeLocationAndAddress();
  var rentObject = {
    'author': {
      avatar: makeAvatarImg(shuffleAvatarNumbers[i])
    },
    'offer': {
      title: shuffletitles[i],
      address: rentLocation.address,
      price: makePrice(),
      type: makeType(),
      rooms: makeRooms(),
      guests: makeGuests(),
      checkin: makeCheckInOut(),
      checkout: makeCheckInOut(),
      features: makeFeatures(),
      description: 'Великолепная квартира',
      photos: makePhotos()
    },
    'location': {
      x: rentLocation.x,
      y: rentLocation.y
    }
  };
  rentObects[i] = rentObject;
}

var mapFaded = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var activateMap = function () {
  adForm.classList.remove('ad-form--disabled');
  mapFaded.classList.remove('map--faded');
};

var toggleFieldsDesable = function (onOff) {
  var selects = document.querySelectorAll('select');
  var fieldSets = document.querySelectorAll('fieldset');
  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = onOff;
  }
  for (var j = 0; j < fieldSets.length; j++) {
    fieldSets[j].disabled = onOff;
  }
};

toggleFieldsDesable(1);

var pinTemplate = document.querySelector('#pin');
var mapPinsConteiner = document.querySelector('.map__pins');
var pinsFragment = document.createDocumentFragment();

var makeNewMapPin = function (amountPins) {
  for (var i = 0; i < amountPins; i++) {
    var pinElement = pinTemplate.content.cloneNode(true);
    var avatarImgTemplate = pinElement.querySelector('img');
    var pinLocation = pinElement.querySelector('button');

    pinLocation.style.cssText = 'left:' + (rentObects[i].location.x - X_HALF_OF_PIN) + 'px;' + 'top:' + (rentObects[i].location.y - Y_OF_PIN) + 'px;';
    avatarImgTemplate.src = rentObects[i].author.avatar;
    avatarImgTemplate.alt = rentObects[i].offer.title;

    pinsFragment.appendChild(pinElement);
  }
  mapPinsConteiner.appendChild(pinsFragment);
};

var renderPopup = function (object) {
  var cardTemplate = document.querySelector('#card');
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
    for (i = 0; i < featuresList.length; i++) {
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
    for (i = 0; i < photoList.length; i++) {
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
  mapFaded.insertBefore(cardElement, mapFiltersConteiner);
};

var onMapPinClick = function (mapPinsOne, rentObectsOne) {

  mapPinsOne.addEventListener('click', function () {
    var mapCard = document.querySelector('.map__card');
    if (!mapCard) {
      renderPopup(rentObectsOne);
    } else {
      mapCard.remove();
      renderPopup(rentObectsOne);
    }
    var closePopupButton = document.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      mapCard.remove();
    });
  });
};

mapPinMain.addEventListener('mouseup', function () {
  activateMap();
  toggleFieldsDesable();
  var mapPins = document.querySelectorAll('.map__pin');
  if (mapPins.length < 2) {
    makeNewMapPin(8);
  }
  mapPins = document.querySelectorAll('.map__pin');
  for (var k = 1; k <= mapPins.length + 1; k++) {
    onMapPinClick(mapPins[k], rentObects[k - 1]);
  }
});

var fillAddress = function () {
  var mapPin = document.querySelector('.map__pin--main');
  var positionMapPin = mapPin.getBoundingClientRect();
  var address = document.querySelector('#address');
  address.placeholder = positionMapPin.x + ',' + positionMapPin.y;
};

fillAddress();

renderPopup(rentObects[0]);
