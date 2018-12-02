'use strict';

var SIZE_X = 1200;
var SIZE_Y_MIN = 130;
var SIZE_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 10000;
var titleArray = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var shuffleTitleArray = titleArray.sort(function () { return 0.5 - Math.random() });
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var typeMapping = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var timesArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var shuffleAvatarNumbers = avatarNumbers.sort(function () { return 0.5 - Math.random() });

var makeAvatarImg = function (number) {
  var avatarImg = 'img/avatars/user' + '0' + number + '.png'
  return avatarImg;
};

var makeTitle = function (array) {
  var titleDescription = array;
  return titleDescription;
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
  var k = getRandom(0, 3)
  var houseType = typeArray[k]
  return houseType;
};

var makeRooms = function () {
  return getRandom(1, 6);
};

var makeGuests = function () {
  return getRandom(1, 4);
};

var makeCheckInOut = function () {
  var k = getRandom(0, 2)
  var times = timesArray[k]
  return times;
};

var makeFeatures = function () {
  var shuffleFeatures = featuresArray.sort(function () {
    return 0.5 - Math.random()
  });
  var k = getRandom(1, 6);
  var features = [];
  for (var i = 0; i < k; i++) {
    features[i] = shuffleFeatures[i];
  };
  return features;
};

var makePhotos = function () {
  photosArray = photosArray.sort(function () { return 0.5 - Math.random() });
  return photosArray;
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
      title: makeTitle(shuffleTitleArray[i]),
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
};

var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');
var pinsFragment = document.createDocumentFragment();

var makeNewMapPin = function (amountPins) {
  for (var i = 0; i < amountPins; i++) {
    var pinElement = pinTemplate.content.cloneNode(true);
    var avatarImgTemplate = pinElement.querySelector('img');
    var pinLocation = pinElement.querySelector('button');

    pinLocation.style.cssText = 'left:' + rentObects[i].location.x + 'px;' + 'top:' + rentObects[i].location.y + 'px;';
    avatarImgTemplate.src = rentObects[i].author.avatar;
    avatarImgTemplate.alt = rentObects[i].offer.title;

    pinsFragment.appendChild(pinElement);
  }
  mapPins.appendChild(pinsFragment);
};

makeNewMapPin(8);

var cardTemplate = document.querySelector('#card');
var mapFilters = document.querySelector('.map__filters-container');

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

popupTitle.textContent = rentObects[0].offer.title;
popupAddress.textContent = rentObects[0].offer.address;
popupPrice.textContent = rentObects[0].offer.price + ' ₽/ночь';
popupType.textContent = typeMapping[rentObects[0].offer.type];
popupCapacity.textContent = rentObects[0].offer.rooms + ' комнаты для ' + rentObects[0].offer.guests + ' гостей';
popupTime.textContent = 'Заезд после ' + rentObects[0].offer.checkin + ' , выезд до ' + rentObects[0].offer.checkout;

var makeFeatureLi = function () {
  var featuresList = rentObects[0].offer.features;
  for (i = 0; i < featuresList.length; i++) {
    var featureLi = document.createElement('li');
    var featureClass = 'popup__feature--' + rentObects[0].offer.features[i];
    featureLi.classList.add(featureClass, 'popup__feature');
    popupFeatures.appendChild(featureLi);
  };
};
makeFeatureLi();

popupDescription.textContent = rentObects[0].offer.description;

var makePhotoImg = function () {
  var photoList = rentObects[0].offer.photos;
  for (i = 0; i < photoList.length; i++) {
    var photoImg = document.createElement('img');
    photoImg.classList.add('popup__photo');
    photoImg.src = rentObects[0].offer.photos[i];
    photoImg.width = 45;
    photoImg.height = 40;
    photoImg.alt = 'Фотография жилья';
    popupPhotos.appendChild(photoImg);
  };
};
makePhotoImg();

popupAvatar.src = rentObects[0].author.avatar;

mapFaded.insertBefore(cardElement, mapFilters);
