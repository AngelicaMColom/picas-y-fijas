// select element to be listen
const OBJGEN = {
  digitalCounter: 4,
  counter: 0,
  containerTitleActive: "container__title__suptitle_active",
  addTable: document.querySelector(".container__body__tablet"),
  addBodyTable: document.querySelector("tbody"),
  baseHige: 600,
  minValueRandom: 1000,
  maxValueRandom: 9999
}
const submitDig = document.querySelector("button");
const addError = document.querySelector(".container__title__suptitle");
// get modal winner view
const modal = document.querySelector('#myModal');
const submitWinner = document.querySelector(".modal__content__header__button");
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
  conditionalValidation(inputsObject);
  inputVal.value = "";
}

/**
 *  @param: {object} inputsObject
 **/
function conditionalValidation(inputsObject) {
  let valueString = inputsObject.value.toString();
  compareValueOfString(valueString) || compareValueInput(inputsObject) ? addUserError() : remuveUserErrror();
  !compareValueOfString(valueString) && compareValueCount(inputsObject) ? OBJGEN.counter += 1 : OBJGEN.counter;
  inputsObject.valueCount && OBJGEN.counter !== 0 && compareValueCount(inputsObject) ? compareUserNumber(valueString) : OBJGEN.counter;
}

/**
 * @param: {number} userNumber input value and count which is initiated
 **/
function compareUserNumber(userNumber) {
  if (OBJGEN.counter === 1) {
    numberRandom = generateNumberRandomNumber();
  }
  if(userNumber === numberRandom) {
    OBJGEN.counter = 0;
    winnerUser();
  } else {
    loserUser(userNumber, numberRandom);
    displayTableHead();
  }
}

/**
 * @param: {number} userNumber,numberRandom
 **/
function loserUser(userNumber, numberRandom) {
  let score = {
    userNumber,
    fija: 0,
    pica: 0
  }
  returnArray(numberRandom).forEach((value, index) => {
    returnArray(userNumber).forEach((val, ind) => {
      if(value === val) {
        index === ind ? score.fija += 1 : score.pica += 1;
      }
    })
  })
  createTableBody(score);
}

/**
 * display table
 **/
function displayTableHead() {
  OBJGEN.addTable.style.display = "block";
}

/**
 * create bodytable
 * @param:{object} score
 **/
function createTableBody(score) {
  addheight();
  let tr = document.createElement('tr');
  Object.values(score).forEach(val => {
    let td1 = document.createElement('td');
    let texNode = document.createTextNode(val);
    td1.appendChild(texNode);
    tr.appendChild(td1);
  })
  OBJGEN.addBodyTable.appendChild(tr);
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
 * compare each value of the string
 *  @param:{string} userNumber or numberRandom
 *  @returns: {boolean}
 **/
function compareValueOfString(str) {

  return str.split("")
    .map(Number).sort()
    .some((val, i, arrayU) => val === arrayU[i + 1]);
}

/**
 * compare value of the string given by the user
 *  @param:{Object} inputsObject
 *  @returns: {boolean}
 **/

function compareValueInput(inputsObject) {

  return !inputsObject.value || inputsObject.value.includes(" ") ||
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

function addheight() {
  if (OBJGEN.counter > 3) {
    const suffix =  'px';
    let pxNumber = OBJGEN.baseHige += 50;
         document.documentElement.style.setProperty(`--baseHige`, pxNumber + suffix);

  }
}
let returnArray = (str) => { return str.split("").map(Number) };
let addUserError = () => { addError.classList.add(OBJGEN.containerTitleActive) };
let remuveUserErrror = () => { addError.classList.remove(OBJGEN.containerTitleActive) };
let closeModule = () => { modal.style.display = "none"; }
let winnerUser = () => { modal.style.display = "block"; }

submitDig.addEventListener('click', submitActions);
submitWinner.addEventListener('click', closeModule);
