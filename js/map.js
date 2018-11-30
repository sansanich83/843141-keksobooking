'use strict';

var SIZE_X = 1200;
var SIZE_Y_MIN = 130;
var SIZE_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var titleArray = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var shuffleTitleArray = titleArray.sort(function () { return 0.5 - Math.random() });
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
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
  return getRandom(PRICE_MIN, PRICE_MAX);
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
  var k = getRandom(0, 6);
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

var makeLocationAndAddress = function() {
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
      description: '',
      photos: makePhotos()
    },
    'location': {
      x: rentLocation.x,
      y: rentLocation.y
    }
  };
  rentObects[i] = rentObject;
};

var pinTemplate = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');
// var pinElement = pinTemplate.content.cloneNode(true);

// var avatarImgTemplate = pinElement.querySelector('img');
// var pinLocation = pinElement.querySelector('button');

// pinLocation.style.cssText = 'left:' + rentObects[0].location.x + 'px;' + 'top:' + rentObects[0].location.y + 'px;';
// avatarImgTemplate.src = rentObects[0].author.avatar;
// avatarImgTemplate.alt = rentObects[0].offer.title;

// mapPins.appendChild(pinElement);

var makeNewMapPin = function(amountPins) {
  var pinElement = pinTemplate.content.cloneNode(true);

  var avatarImgTemplate = pinElement.querySelector('img');
  var pinLocation = pinElement.querySelector('button');

  pinLocation.style.cssText = 'left:' + rentObects[0].location.x + 'px;' + 'top:' + rentObects[0].location.y + 'px;';
  avatarImgTemplate.src = rentObects[0].author.avatar;
  avatarImgTemplate.alt = rentObects[0].offer.title;

  mapPins.appendChild(pinElement);
};

  makeNewMapPin();
