// select element to be listen
const OBJGEN = {
  digitalCounter: 4,
  counter: 0,
  containerTitleActive: 'container__title__subtitle-active',
  addTable: document.querySelector('.container__tablet'),
  addBodyTable: document.querySelector('.container__tablet__body'),
  baseHige: 600,
  minValueRandom: 1000,
  maxValueRandom: 9999,
  activeDisplayModal: 'modal__content-display',
  noActiveDisplayModal: 'modal__content-displaynone',
  activeTable: 'container__tablet-show',
  containerBodyTable: 'container__tablet__body',
  classBodyTable: 'container__tablet__body'
}
const submitDig = document.querySelector('button');
const addError = document.querySelector('.container__title__subtitle');
// get modal winner view
const modal = document.querySelector('#myModal');
const submitWinner = document.querySelector('.modal__content__header__button');
// create counter numbers
let inputVal = document.querySelector('[id=digitos]');
let numberRandom = generateNumberRandomNumber();


// initial

function submitActions(e) {
  e.preventDefault();
  const inputsObject = {
    enter: this,
    value: inputVal.value,
    valueCount: inputVal.value.length
  }
  validationNumbers(inputsObject);
  inputVal.value = '';
}

/**
 *  @param: {object} inputsObject
 **/

function validationNumbers(inputsObject) {
  let valueString = inputsObject.value.toString();
  compareValueOfString(valueString) || compareValueInput(inputsObject) ? addUserError() : remuveUserErrror();
  conditionalValidation(valueString, inputsObject);
}

function conditionalValidation(valueString, inputsObject) {
  !compareValueOfString(valueString) && compareValueCount(inputsObject) ? OBJGEN.counter += 1 : OBJGEN.counter;
  inputsObject.valueCount && OBJGEN.counter !== 0 && compareValueCount(inputsObject) ? compareUserNumber(valueString) : OBJGEN.counter;
}

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
    displayTableHead();
  }
}

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
 * @param: {number} userNumber,numberRandom
 **/
function loserUser(userNumber, numberRandom) {
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
 * create bodytable
 * @param:{object} score
 **/

function removeTable() {
  const bodyToremove = document.getElementsByClassName('container__tablet__body')[0].getElementsByTagName('tr')[0];
  bodyToremove.parentNode.removeChild(bodyToremove);
}

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
 * create RandomNumber
 *  @returns: {number} numberRandom;
 **/


function closeModule() {
  modal.classList.add(OBJGEN.noActiveDisplayModal);
  modal.classList.remove(OBJGEN.activeDisplayModal);
  removeTable();
}

let returnArray = (str) => str.split('').map(Number);
let addUserError = () => { addError.classList.add(OBJGEN.containerTitleActive) };
let remuveUserErrror = () => { addError.classList.remove(OBJGEN.containerTitleActive) };
let showwinner = () => { modal.classList.add(OBJGEN.activeDisplayModal) }

submitDig.addEventListener('click', submitActions);
submitWinner.addEventListener('click', closeModule);
