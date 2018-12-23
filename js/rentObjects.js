'use strict';
(function () {
  var SIZE_X = 1200;
  var SIZE_Y_MIN = 130;
  var SIZE_Y_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 10000;
  var MAX_GUEST = 5;
  var MAX_ROOM = 6;
  var MAX_FEATURES = 6;
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var makeShuffleArray = function (array) {
    var shuffleArray = array.sort(function () {
      return 0.5 - Math.random();
    });
    return shuffleArray;
  };

  var shuffletitles = makeShuffleArray(titles);
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var NUMBER_OF_TYPES = types.length - 1;
  var times = ['12:00', '13:00', '14:00'];
  var NUMBER_OF_TIMES = times.length - 1;
  var houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
    var shuffleFeatures = makeShuffleArray(houseFeatures);
    var randomNumberOfFeature = getRandom(1, MAX_FEATURES);
    for (var i = 0; i < randomNumberOfFeature; i++) {
      features[i] = shuffleFeatures[i];
    }
    return features;
  };

  var makePhotos = function () {
    var photos = [];
    var shufflePhotos = makeShuffleArray(housePhotos);
    for (var i = 0; i < shufflePhotos.length; i++) {
      photos[i] = shufflePhotos[i];
    }
    return photos;
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
  // window.rentObects = rentObects;
})();
