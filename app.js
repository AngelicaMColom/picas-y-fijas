
// select element to be listen
const submitDig = document.querySelector("button");
const addError =  document.querySelector(".conteiner__title__suptitle");
let inputVal = document.querySelector('[id=digitos]');
// get modal winner view
const modal = document.getElementById('myModal');
const submitWinner = document.querySelector(".modal__content__header__button");
// create counter numbers
let counter = 0;
let randomNumer = 0;

// initial
function submitActions (e){
  e.preventDefault();
  const inputEnter = this;
  let inputValue = inputVal.value;
  let inputValuecount = inputValue.length;
  !inputValue || inputValue.includes(" ") || inputValuecount < 4 || inputValuecount > 4 ? addUserError() : remuveUserErrror();
  inputEnter && inputValuecount === 4  ? counter++ : counter;
  convertNumbers (inputValue, counter);
  inputVal.value = "";
 }

// @param: input value and count which is initiated
function convertNumbers (inputValue, counter){
    if (counter === 1) {
      randomNumer = getRandomInt(1000, 9999).toString();
    };
    let userNumer = inputValue.toString();
    if (userNumer === randomNumer) {
      counter = 0;
      winnerUser();
    }else{
      loserUser(randomNumer, userNumer);
    }
    console.log(randomNumer );
}

function loserUser (randomNumer, userNumer) {
  const arrayRandomNumer = randomNumer.split("");
  let arrayUserNumer = userNumer.split("");
  let arrayRandomNumerToReduce =  arrayRandomNumer.reduce(function(a, b){ return (a === b) ? a : NaN; });
  let arrayUserNumerToReduce =  arrayRandomNumer.reduce(function(a, b){ return (a === b) ? a : NaN; });
  arrayRandomNumer.forEach(function (value,index) {
    arrayUserNumer.forEach(function (val,ind){
      if(index === ind && value === val){
        console.log("fija")
        console.log(val,ind, value,index);
      } else if(index != ind && value === val && arrayRandomNumerToReduce && arrayUserNumerToReduce ){
        console.log("pica");
        console.log(val,ind, value,index);
      }

    })

  })
}

let getRandomInt = (min, max) => { return Math.floor(Math.random() * (max - min)) + min };
let addUserError = () => { addError.classList.add("conteiner__title__suptitle_active")};
let remuveUserErrror = () => { addError.classList.remove("conteiner__title__suptitle_active")};
let closeModule = () => {modal.style.display = "none";}
let winnerUser = () => { modal.style.display = "block";}


submitDig.addEventListener('click', submitActions);
submitWinner.addEventListener('click',closeModule);
