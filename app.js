// select element to be listen
const ObjGenerals = {
  digitalCounter: 4,
  counter: 0,
  containerTitleActive: "container__title__suptitle_active",
  addTable: document.querySelector(".container__body__tablet"),
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

// valide input and add cointer
function conditionalValidation(inputsObject) {
  let valueString = inputsObject.value.toString();
  compareValueOfString(valueString) || compareValueInput(inputsObject) ? addUserError() : remuveUserErrror();
  !compareValueOfString(valueString) && compareValueCount(inputsObject) ? ObjGenerals.counter += 1 : ObjGenerals.counter;
  inputsObject.valueCount && ObjGenerals.counter !== 0 ? convertNumbers(valueString) : ObjGenerals.counter;
}

function compareValueInput(inputsObject) {

  return !inputsObject.value || inputsObject.value.includes(" ") ||
    inputsObject.valueCount < ObjGenerals.digitalCounter ||
    inputsObject.valueCount > ObjGenerals.digitalCounter;
}

function compareValueCount(inputsObject) {

  return inputsObject.enter && inputsObject.valueCount === ObjGenerals.digitalCounter;
}

/**
 * @param: {number} userNumber input value and count which is initiated
 */

function convertNumbers(userNumber) {
  console.log(userNumber, numberRandom);
  if(userNumber === numberRandom) {
    ObjGenerals.counter = 0;
    numberRandom = generateNumberRandomNumber();
    winnerUser();
  } else {
    loserUser(userNumber, numberRandom);
    createTableHead();
  }
}

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

function createTableHead() {
  ObjGenerals.addTable.style.display = "block";
}

function createTableBody(score) {
  for (let i = 1; i < 4; i++){
      let tr = document.createElement('tr');

      let td1 = document.createElement('td');
      let td2 = document.createElement('td');

      let text1 = document.createTextNode('Text1');
      let text2 = document.createTextNode('Text2');

      td1.appendChild(text1);
      td2.appendChild(text2);
      tr.appendChild(td1);
      tr.appendChild(td2);

      //table.appendChild(tr);
  }

}



function generateNumberRandomNumber() {
  let numberValue = getRandomInt(ObjGenerals.minValueRandom, ObjGenerals.maxValueRandom).toString();
  if(compareValueOfString(numberValue)) {
    numberValue = getRandomInt(ObjGenerals.minValueRandom, ObjGenerals.maxValueRandom).toString();
  }

  return numberValue;
}

function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
};

function compareValueOfString(num) {

  return num.split("")
    .map(Number).sort()
    .some((val, i, arrayU) => val === arrayU[i + 1]);
}

let returnArray = (num) => { return num.split("").map(Number) };
let addUserError = () => { addError.classList.add(ObjGenerals.containerTitleActive) };
let remuveUserErrror = () => { addError.classList.remove(ObjGenerals.containerTitleActive) };
let closeModule = () => { modal.style.display = "none"; }
let winnerUser = () => { modal.style.display = "block"; }

submitDig.addEventListener('click', submitActions);
submitWinner.addEventListener('click', closeModule);
