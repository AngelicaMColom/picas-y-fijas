const conditionalModules = (function(globalVariable) {

  return {
    addUserError: function() {
      return addError.classList.add(claseNoActive)
    },
    remuveUserErrror: function() {
      return addError.classList.remove(claseActive)
    },


    compareValueInput: function(inputsObject) {

      return !inputsObject.value || inputsObject.value.includes(' ') ||
        inputsObject.valueCount < OBJGEN.digitalCounter ||
        inputsObject.valueCount > OBJGEN.digitalCounter;
    },

    compareValueCount: function(inputsObject) {

      return inputsObject.enter && inputsObject.valueCount === OBJGEN.digitalCounter;
    }
  }
})(globalVariable);

module.exports = conditionalModules;
