'use strict';
(function () {
  var activateMap = function () {
    window.common.adForm.classList.remove('ad-form--disabled');
    window.common.mapFaded.classList.remove('map--faded');
  };
  var deactivateMap = function () {
    window.common.adForm.classList.add('ad-form--disabled');
    window.common.mapFaded.classList.add('map--faded');
  };

  var toggleFieldsDesable = function (onOff) {
    var selects = document.querySelectorAll('select');
    var fieldSets = document.querySelectorAll('fieldset');
    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = onOff;
    }
    for (j = 0; j < fieldSets.length; j++) {
      fieldSets[j].disabled = onOff;
    }
  };

  toggleFieldsDesable(true);
  window.activation = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    toggleFieldsDesable: toggleFieldsDesable
  };
})();
