const screen = document.querySelector('#outputText');
displayNumber();
displayOperator();
clearDisplayButton();
addDecimalButton();
displayMinus();
equalsButton();
let number1 = null;
let number2 = null;
let sign = null;

function operate(operator, num1, num2) {
  console.log(sign);
  console.log(num1);
  console.log(num2);
  switch (operator) {
    case "+":
      number1 = add(num1, num2);
      //round to 3 decimals if more than 3 decimals else r
      /*if(!Number.isInteger(number1) && number1.toString().includes(".")){
        if ((number1.toString().slice(number1.toString().indexOf(".") + 1).length) > 3){
          number1 = number1.toFixed(3);
        }
      }*/
      screen.textContent = number1;
      number2 = null;
      sign = null;
      break;
    case "-":
      number1 = subtract(num1, num2);
      screen.textContent = number1;
      number2 = null;
      sign = null;
      break;
    case "*":
      number1 = multiply(num1, num2);
      screen.textContent = number1;
      number2 = null;
      sign = null;
      break;
    default:
      number1 = divide(num1, num2);
      screen.textContent = number1;
      number2 = null;
      sign = null;
  }
}

function displayNumber() {
  const numbers = document.querySelectorAll('.number');
  numbers.forEach(function (number) {
    number.addEventListener('click', function (e) {
      //if last input is number concat the next number
      if ((screen.textContent.slice(-1) >= 0 && screen.textContent.slice(-1) <= 9) ||
        screen.textContent.slice(-1) === ".") {
        screen.textContent += `${number.textContent}`;
      }
      /*if the last input is - concat a number, unless number 1 has a value,then
       store the sign*/
      else if (screen.textContent.slice(-1) === "-") {
        //if a sign exists
        if (number1) {
          sign = screen.textContent.slice(-2, -1);
        }
        screen.textContent += `${number.textContent}`;
      }
      else {
        sign = screen.textContent.slice(-1);
        screen.textContent += `${number.textContent}`;
      }
    })
  });
}

function displayOperator() {
  const mathSigns = document.querySelectorAll('.operate');
  mathSigns.forEach(function (mathSign) {
    mathSign.addEventListener('click', function (e) {
      if (screen.textContent === "") return;

      //if sign exist and the last input is not - then evaluate
      else if (sign) {
        if (screen.textContent.slice(-1) === "-") return;
        number2 = screen.textContent.slice(screen.textContent.indexOf(sign, 1) + 1)
        operate(sign, number1, number2);
        screen.textContent += `${mathSign.textContent}`;
      }
      //if input before is a number tack on the operator at the end of screen
      else if (screen.textContent.slice(-1) >= 0 && screen.textContent.slice(-1) <= 9) {
        number1 = +screen.textContent;
        screen.textContent += `${mathSign.textContent}`;
      }
      //replace - only if number1 exists and sign===null else do nothing
      else if (screen.textContent.slice(-1) === '-') {
        if (number1 !== null && sign === null) {
          screen.textContent = `${screen.textContent.slice(0, screen.textContent.length - 1) +
            mathSign.textContent}`;
        }
        else { }
      }
      else {
        //replace operator if operator is last character on screen
        screen.textContent = `${screen.textContent.slice(0, screen.textContent.length - 1) +
          mathSign.textContent}`;
      }
    });
  });
}

function clearDisplayButton() {
  const clear = document.querySelector('.clear');
  clear.addEventListener('click', (e) => screen.textContent = "");
}

function addDecimalButton() {
  const decimal = document.querySelector('.decimal');
  decimal.addEventListener('click', function (e) {
    if (screen.textContent === "") {
      screen.textContent += `0${decimal.textContent}`;
    }
    //if last input is . do nothing
    else if (screen.textContent.slice(-1) === ".") return;

    //if the last input is number and there is no decimal in that number
    else if (screen.textContent.slice(-1) >= 0 && screen.textContent.slice(-1) <= 9) {
      //if first number input is null and demical doesn't exist in first number
      if (number1 === null && !screen.textContent.includes('.')) screen.textContent += ".";

      else if (number1 !== null && !screen.textContent.includes('.', screen.textContent.indexOf(sign, 1))) {
        screen.textContent += ".";
      }

      else return;
    }
    else {
      sign = screen.textContent.slice(-1);
      screen.textContent += `0${decimal.textContent}`;
    }
  });
}

function displayMinus() {
  const minus = document.querySelector('.minus');
  minus.addEventListener('click', function (e) {
    // if blank input change to -
    if (screen.textContent === "") screen.textContent = minus.textContent;
    //if there is a sign stored evaluate
    else if (sign) {
      if (screen.textContent.slice(-1) === "-") return;
      number2 = screen.textContent.slice(screen.textContent.indexOf(sign, 1) + 1)
      operate(sign, number1, number2);
      screen.textContent += `${minus.textContent}`;
    }
    //checks second number for more than one decimal
    else if (screen.textContent.slice(-1) >= 0 && screen.textContent.slice(-1) <= 9) {
      number1 = +screen.textContent;
      screen.textContent += `${minus.textContent}`;
    }
    //if last input on screen is minus do nothing
    else if (screen.textContent.slice(-1) === "-") return;

    else {
      //if last input on screen is operator add minus
      sign = screen.textContent.slice(-1);
      screen.textContent += `${minus.textContent}`;
    }
  });
}



function add(a, b) {
  //rounds to same amount of decimals
  if (a.toString().includes(".") || b.toString().includes(".")) {
    let aLength = a.toString().slice(number1.toString().indexOf(".") + 1).length;
    let bLength = b.toString().slice(number1.toString().indexOf(".") + 1).length;
    if (aLength > bLength) {
      return (+a + +b).toFixed(aLength);
    }
    else return (+a + +b).toFixed(bLength);
  }
  return +a + +b;

}

function subtract(a, b) {
  //rounds to same amount of decimals
  if (a.toString().includes(".") || b.toString().includes(".")) {
    let aLength = a.toString().slice(number1.toString().indexOf(".") + 1).length;
    let bLength = b.toString().slice(number1.toString().indexOf(".") + 1).length;
    if (aLength > bLength) {
      return (a - b).toFixed(aLength);
    }
    else return (a - b).toFixed(bLength);
  }
  return a - b;
}

function multiply(a, b) {
  if (a.toString().includes(".") || b.toString().includes(".")) {
    let aLength = a.toString().slice(number1.toString().indexOf(".") + 1).length;
    let bLength = b.toString().slice(number1.toString().indexOf(".") + 1).length;
    if (aLength > bLength) {
      return (a * b).toFixed(aLength);
    }
    else return (a * b).toFixed(bLength);
  }
  return a * b;
}

function divide(a, b) {
  if (a.toString().includes(".") || b.toString().includes(".")) {
    let aLength = a.toString().slice(number1.toString().indexOf(".") + 1).length;
    let bLength = b.toString().slice(number1.toString().indexOf(".") + 1).length;
    if (aLength > bLength) {
      return (a / b).toFixed(aLength);
    }
    else return (a / b).toFixed(bLength);
  }
  return a / b;
}

function equalsButton() {
  const equals = document.querySelector('.equals');
  equals.addEventListener('click', function (e) {
    if (sign) {
      if (screen.textContent.slice(-1) === "-") return;
      number2 = screen.textContent.slice(screen.textContent.indexOf(sign, 1) + 1)
      operate(sign, number1, number2);
    }
  });
}