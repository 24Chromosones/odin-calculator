const add = (num1, num2) => {
    return num1 + num2
}

const subtract = (num1, num2) => {
    return num1 - num2
}

const multiply = (num1, num2) => {
    return num1 * num2
}

const divide = (num1, num2) => {
    if (num2 === 0) {
        return "💀"
    }
    return num1 / num2
}

const operate = (operator, num1, num2) => {
    if (operator === "+") {
        return add(num1, num2)
    }

    if (operator === "-") {
        return subtract(num1, num2)
    }

    if (operator === "*") {
        return multiply(num1, num2)
    }

    if (operator === "/") {
        return divide(num1, num2)
    }
}

const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const changeSign = document.querySelector('.change-sign')
const addDot = document.querySelector('.add-dot')

let numberInput = ""
let num1 = 0
let storedNum = 0
let operator = ""
let output = document.querySelector('.output')

for (let i=0; i<numbers.length; i++) {
    numbers[i].addEventListener("click", function (e) {
        if (numberInput.length < 12) {
            numberInput += e.target.innerText;
            num1 = parseFloat(numberInput);
            output.textContent = num1;
        }
    })
}

for (let i=0; i<operations.length; i++) {
    operations[i].addEventListener("click", function (e) {
        if (operator === "" && operator!== "="){
            operator = e.target.innerText
            storedNum = num1
            numberInput = ""
            output.textContent = operator
        } else {
            let newOperator = e.target.innerText
            if (newOperator === "=") {
                let result = operate(operator, storedNum, num1)
                console.log(result)
                storedNum = result
                if (result > 10000000) {
                    result = result.toExponential(8)
                }
                output.textContent = result
                operator = ""
                numberInput = ""
            } else {
                let result = operate(operator, storedNum, num1)
                console.log(result)
                if (result > 10000000) {
                    result = result.toExponential(8)
                }
                storedNum = result
                output.textContent = result
                numberInput = ""
                if (result === "💀") {
                    operator = ""
                }
            }

        }

    })
}

clear.addEventListener("click", function () {
    numberInput = ""
    num1 = 0
    storedNum = 0
    operator = ""
    output.textContent = ""
})

changeSign.addEventListener("click", function () {
    if (num1 < 0){
        numberInput = numberInput.substr(1)
        num1 = parseFloat(numberInput)
        output.textContent = num1
    } else if (num1 > 0) {
        numberInput = "-" + numberInput
        num1 = parseFloat(numberInput)
        output.textContent = num1
    }
})

addDot.addEventListener("click", function (){
    num1 /= 100
    if (num1 < 0.000001 && num1 > -0.000001) {
        num1 = num1.toExponential(7)
    }
    output.textContent = num1
})