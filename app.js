// select element to be listed or modified
const OBJGEN = {
  addTable: document.querySelector('.container__tablet'),
  addBodyTable: document.querySelector('.container__tablet__body'),
  activeDisplayModal: 'modal-shown',
  activeTable: 'container__tablet-show',
  addError: document.querySelector('.container__title__subtitle'),
  classBodyTable: 'container__tablet__body',
  containerBodyTable: 'container__tablet__body',
  counter: 0,
  containerTitleActive: 'container__title__subtitle-active',
  digitalCounter: 4,
  minValueRandom: 1000,
  maxValueRandom: 9999,
  // get modal winner view
  modal: document.querySelector('#myModal'),
  noActiveDisplayModal: 'modal-hide',
  submitDig: document.querySelector('button'),
  submitWinner: document.querySelector('.modal__button'),
  // create counter numbers
  inputVal: document.querySelector('[id=digitos]')
}

let numberRandom = generateNumberRandomNumber();

// initial
function submitActions(e) {
  e.preventDefault();
  const inputsObject = {
    enter: this,
    value: OBJGEN.inputVal.value,
    valueCount: OBJGEN.inputVal.value.length
  }
  validationInput(inputsObject);
  OBJGEN.inputVal.value = '';
}

/**
 *  @param: {object} inputsObject
 **/
function validationInput(inputsObject) {
  const valueString = inputsObject.value.toString();
  compareValueOfString(valueString) || compareValueInput(inputsObject) ? addUserError() : remuveUserErrror();
  conditionalValidation(valueString, inputsObject);
}

/**
 * compare value of the string given by the user
 *  @param:{Object} inputsObject
 *  @returns: {boolean}
 **/
function compareValueInput(inputsObject) {

  return !inputsObject.value || inputsObject.value.includes(' ') ||
    inputsObject.valueCount < OBJGEN.digitalCounter ||
    inputsObject.valueCount > OBJGEN.digitalCounter;
}

/**
 * add classes to the header text, alerts
 **/
let addUserError = () => { OBJGEN.addError.classList.add(OBJGEN.containerTitleActive) };
let remuveUserErrror = () => { OBJGEN.addError.classList.remove(OBJGEN.containerTitleActive) };

/**
 * compare each value of the string
 *  @param:{string} userNumber or numberRandom
 *  @returns: {boolean}
 **/
function compareValueOfString(str) {

  return str.split('')
    .map(Number).sort()
    .some((val, i, arrayU) => val === arrayU[i + 1]);
}

function conditionalValidation(valueString, inputsObject) {
  !compareValueOfString(valueString) && compareValueCount(inputsObject) ? OBJGEN.counter += 1 : OBJGEN.counter;
  inputsObject.valueCount && OBJGEN.counter !== 0 && compareValueCount(inputsObject) ? compareUserNumber(valueString) : OBJGEN.counter;
}

/**
 * compare value of the string given by the user
 *  @param: {Object} inputsObject
 *  @returns: {boolean}
 **/
function compareValueCount(inputsObject) {

  return inputsObject.enter && inputsObject.valueCount === OBJGEN.digitalCounter;
}


/**
 * @param: {number} userNumber input value and count which is initiated
 **/
function compareUserNumber(userNumber) {
  if(OBJGEN.counter === 1) {
    numberRandom = generateNumberRandomNumber();
  }
  if(userNumber === numberRandom) {
    OBJGEN.counter = 0;
    showwinner();
  } else {
    loserUser(userNumber, numberRandom);
  }
}

/**
 * create RandomNumber
 *  @returns: {number} numberRandom;
 **/
function generateNumberRandomNumber() {
  let numberValue = getRandomInt(OBJGEN.minValueRandom, OBJGEN.maxValueRandom).toString();
  if(compareValueOfString(numberValue)) {
    numberValue = generateNumberRandomNumber();
  }

  return numberValue;
}

/**
 * generated RandomNumber
 *  @param:{number} minimun number and maximun number
 *  @returns: {number} numberRandom;
 */
function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
};
/**
 * display modal
 **/
let showwinner = () => { OBJGEN.modal.classList.add(OBJGEN.activeDisplayModal) }

/**
 * @param: {number} userNumber,numberRandom
 **/
function loserUser(userNumber, numberRandom) {
  displayTableHead();
  const score = {
    userNumber,
    fixed: 0,
    pica: 0
  }
  returnArray(numberRandom).forEach((value, index) => {
    returnArray(userNumber).forEach((val, ind) => {
      if(value === val) {
        index === ind ? score.fixed += 1 : score.pica += 1;
      }
    })
  })
  createTableBody(score);
}

/**
 * display table
 **/
function displayTableHead() {
  OBJGEN.addTable.classList.add(OBJGEN.activeTable);
}
/**
 * convert string into arrays
 **/
let returnArray = (str) => str.split('').map(Number);

/**
 * create bodytable
 * @param:{object} score
 **/

function createTableBody(score) {
  const trTable = document.createElement('tr');
  Object.values(score).forEach(val => {
    let tdTable = document.createElement('td');
    tdTable.setAttribute('class', OBJGEN.containerBodyTable)
    let texNode = document.createTextNode(val);
    tdTable.appendChild(texNode);
    trTable.appendChild(tdTable);
  })
  OBJGEN.addBodyTable.appendChild(trTable);
}


/**
 * close module and call the remove Table class which will remove score table
 **/
function closeModule() {
  OBJGEN.modal.classList.add(OBJGEN.noActiveDisplayModal);
  OBJGEN.modal.classList.remove(OBJGEN.activeDisplayModal);
  removeTable();
}

function removeTable() {
  const bodyToremove = document.getElementsByClassName('container__tablet__body')[0].getElementsByTagName('tr')[0];
  bodyToremove.parentNode.removeChild(bodyToremove);
}



OBJGEN.submitDig.addEventListener('click', submitActions);
OBJGEN.submitWinner.addEventListener('click', closeModule);
