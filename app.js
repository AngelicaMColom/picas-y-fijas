// select element to be listen
const submitDig = document.querySelector("button");
const addError =  document.querySelector(".conteiner__title__suptitle");

// get modal winner view
const modal = document.getElementById('myModal');
const submitWinner = document.querySelector(".modal__content__header__button");
// create counter numbers
let inputVal = document.querySelector('[id=digitos]');
let counter = 0;
let numberRandom  = 0;

// initial
function submitActions (e){
  e.preventDefault();
  const inputsObject = {
    enter : this,
    value : inputVal.value,
    valueCount : inputVal.value.length
  }
  conditionalValidation(inputsObject);
  inputVal.value = "";
}

// valide input and add cointer
function conditionalValidation(inputsObject) {
  let valueString = inputsObject.value.toString();
  compareValueOfString(valueString) || !inputsObject.value || inputsObject.value.includes(" ") || inputsObject.valueCount < 4 || inputsObject.valueCount > 4 ? addUserError() : remuveUserErrror();
  !compareValueOfString(valueString) && inputsObject.enter && inputsObject.valueCount === 4  ? counter ++ : counter;
  inputsObject.valueCount && counter != 0 ? convertNumbers ( valueString, counter) : counter;
}

// @param: input value and count which is initiated
function convertNumbers (userNumber,counter) {
  if (counter === 1) {
    numberRandom = getRandomInt(1000, 9999).toString();
    if(compareValueOfString(numberRandom)){
      numberRandom = getRandomInt(1000, 9999).toString();
    }else{
      numberRandom;
    }
  };
  console.log(userNumber,numberRandom);
  if (userNumber === numberRandom) {
    counter = 0;
    winnerUser();
  }else{
    loserUser(userNumber,numberRandom);
  }
}

function loserUser (userNumber,numberRandom) {
  let score = {
    userNumber,
    fija : 0,
    pica : 0
  }
  returnArray(numberRandom).forEach(function (value,index) {
    returnArray(userNumber).forEach(function (val,ind){
      if(index === ind && value === val){
        score.fija ++;
      } else if(index != ind && value === val){
        score.pica ++;
      }
    })
  })
  console.log(score);
}
let returnArray = (num) =>{ return num.split("").map(Number)};
let compareValueOfString = (num) => { return num.split("").map(Number).sort().some( (val, i, arrayU) => val === arrayU[i+1]) };
let getRandomInt = (min, max) => { return  Math.floor(Math.random() * (max - min)) + min };
let addUserError = () => { addError.classList.add("conteiner__title__suptitle_active")};
let remuveUserErrror = () => { addError.classList.remove("conteiner__title__suptitle_active")};
let closeModule = () => {modal.style.display = "none";}
let winnerUser = () => { modal.style.display = "block";}

submitDig.addEventListener('click', submitActions);
submitWinner.addEventListener('click',closeModule);
