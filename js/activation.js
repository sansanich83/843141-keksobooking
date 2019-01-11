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

  var activateMapFiltersForm = function () {
    window.common.mapFilters.classList.remove('ad-form--disabled');
    var selects = window.common.mapFilters.querySelectorAll('select');
    var fieldSets = window.common.mapFilters.querySelectorAll('fieldset');
    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = false;
    }
    for (j = 0; j < fieldSets.length; j++) {
      fieldSets[j].disabled = false;
    }
  };

  var deactivateMapFiltersForm = function () {
    window.common.mapFilters.classList.add('ad-form--disabled');
    var selects = window.common.mapFilters.querySelectorAll('select');
    var fieldSets = window.common.mapFilters.querySelectorAll('fieldset');
    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = true;
    }
    for (j = 0; j < fieldSets.length; j++) {
      fieldSets[j].disabled = true;
    }
  };

  var toggleFieldsDesable = function (onOff) {
    var selects = window.common.adForm.querySelectorAll('select');
    var fieldSets = window.common.adForm.querySelectorAll('fieldset');
    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = onOff;
    }
    for (j = 0; j < fieldSets.length; j++) {
      fieldSets[j].disabled = onOff;
    }
  };

  toggleFieldsDesable(true);
  deactivateMapFiltersForm();

  window.activation = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    toggleFieldsDesable: toggleFieldsDesable,
    deactivateMapFiltersForm: deactivateMapFiltersForm,
    activateMapFiltersForm: activateMapFiltersForm
  };
})();
