document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.querySelector("#name");
  const inputNumber = document.querySelector("#number");
  const inputExpMonth = document.querySelector("#exp-mm");
  const inputExpYear = document.querySelector("#exp-yy");
  const inputCvc = document.querySelector("#cvc");

  const nameText = document.querySelector("#card-name");
  const numberText = document.querySelector("#card-numbers");
  const expMMText = document.querySelector("#card-exp-mm");
  const expYYText = document.querySelector("#card-exp-yy");
  const cvcText = document.querySelector("#card-cvc");

  const completeBox = document.querySelector("#complete-box");
  const formSubmit = document.querySelector(".form-submit");
  const btnConfirm = document.querySelector("#confirm");

  function setListeners() {

    inputName.addEventListener("keydown", event => {
      const isValidInput = isValid(event.keyCode, inputName, 50, false)
      
      if (!isValidInput){
        event.preventDefault();
      }
    });
    inputName.addEventListener("input", event => {
      writeInput(inputName.value, nameText);
    });
    
    inputNumber.addEventListener("keydown", event =>{
      
      const isValidInput = isValid(event.keyCode, inputNumber, 19, true)
      if (!isValidInput){
        event.preventDefault();
      }

      if([4, 9, 14].includes(inputNumber.value.length) && event.keyCode != 8){
        inputNumber.value += " ";
      }

   
    });
    inputNumber.addEventListener("input", event => {
        const regex = /^[0-9]{16}$/;
        let textToWrite = inputNumber.value;

        if (regex.test(textToWrite)){
          const inputValue = textToWrite.split("");

          inputValue.splice(4, 0, " ");
          inputValue.splice(9, 0, " ");
          inputValue.splice(14, 0, " ");

          textToWrite = inputValue.join("");
        }
        
        inputNumber.value = textToWrite;
        writeInput(textToWrite, numberText);
    });

    inputExpMonth.addEventListener("keydown", event => {
      const isValidInput = isValid(event.keyCode, inputExpMonth, 2, true)
      
      if (!isValidInput){
        event.preventDefault();
      }
    });
    inputExpMonth.addEventListener("input", event => {
      writeInput(inputExpMonth.value, expMMText);
    });

    inputExpYear.addEventListener("keydown", event => {
      const isValidInput = isValid(event.keyCode, inputExpYear, 2, true)
      
      if (!isValidInput){
        event.preventDefault();
      }
    });
    inputExpYear.addEventListener("input", event => {
      writeInput(inputExpYear.value, expYYText);
    });

    inputCvc.addEventListener("keydown", event => {
      const isValidInput = isValid(event.keyCode, inputCvc, 3, true)
      
      if (!isValidInput){
        event.preventDefault();
      }
    });
    inputCvc.addEventListener("input", event => {
      writeInput(inputCvc.value, cvcText);
    });

    btnConfirm.addEventListener("click", event =>{
      event.preventDefault();
      const regex = /^[0-9 ]+$/;
      let error = false;

      const nameInputisValid = inputName.value.length <= 25;
      const numberInputisValid = regex.test(inputNumber.value) && inputNumber.value.length == 19;
      const expMInputisValid = regex.test(inputExpMonth.value) && inputExpMonth.value.length == 2;
      const expYInputisValid = regex.test(inputExpYear.value) && inputExpYear.value.length == 2;
      const CvcInputisValid = regex.test(inputCvc.value) && inputCvc.value.length == 3;
      const spinner = document.querySelector(".spinner");
      
      if (!nameInputisValid){
        showAlert(inputName ,inputName.parentElement,"wrong format, max: 25ch");
        error = true;
      }
      if (!numberInputisValid){
        showAlert(inputNumber ,inputNumber.parentElement ,"wrong format, only numbers and 16 digits");
        error = true;
      }
      if (!expMInputisValid || !expYInputisValid){
        if(!expYInputisValid){
          showAlert(inputExpYear ,inputExpMonth.parentElement.parentElement.parentElement ,"");
        }
        showAlert(inputExpMonth ,inputExpMonth.parentElement.parentElement.parentElement ,"wrong format, only numbers and 2 digits");
        error = true;
      }
      if (!CvcInputisValid){
        showAlert(inputCvc ,inputCvc.parentElement ,"wrong format, only numbers and 3 digits");
        error = true;
      }

      if(!error){
        spinner.classList.remove("d-none");
        
        setTimeout(() => {
          spinner.classList.add("d-none");
          showComplete();
        }, 1500);
      }
    });

  }
  setListeners();

  function writeInput(char, pointer) {
    pointer.textContent = char.toUpperCase();
  }

  function isValid (keyPressed, inputToValidate, maxLength, onlyNumbers = false){
    
    if(inputToValidate.value.length >= maxLength && !([8, 37, 39, 9].includes(keyPressed))) {
        return false;
    }
    
    if (onlyNumbers){
      // KeyAllowed: backspace, left and right arrows and Numbers
      const keyAllowed = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

      if ( !(keyAllowed.includes(keyPressed)) ){
        return false;
      }
    }
    return true;
  }

  function showAlert(input ,parent, text){
    const textAlert = document.createElement("p");
    textAlert.textContent = text;
    textAlert.classList.add("alert-error");

    parent.appendChild(textAlert);
    input.classList.add("input-error");
    
    setTimeout(() => {
      textAlert.remove();
      input.classList.remove("input-error");
    }, 2500);
  }

  function showComplete(){
    formSubmit.classList.add("d-none");
    completeBox.classList.remove("d-none");
  }

//END DOMCONTENDLOAD  
});
