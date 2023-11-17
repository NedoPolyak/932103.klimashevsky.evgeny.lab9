"use strict"


const numbersInputBox = document.querySelector(".numbersInputContainer-numbers") //Результирующая строка
const allButtons = document.querySelectorAll(".buttonsContainer-button") //Все элементы кнопки
const numBtns = document.querySelectorAll("[number-btn-id]") //Элементы кнопки 0-9
const signBtns = document.querySelectorAll("[sign-btn-id]") //Элементы кнопки -+/*.
const controlBtns = document.querySelectorAll("[control-btn-id]") //Элементы кнопки C и =


function getLastInputElementType() {//Определение если был нажат элемент .
    const CalculationString = numbersInputBox.textContent
    const CalculationArray = CalculationString.split(" ")
    const lastIndex = CalculationArray.length - 1
    const lastElement = CalculationArray[lastIndex]

    if (lastElement.slice(-1) === ".") {
        return ("NaN")
    }
    
    for (let i = 0; i < lastElement.length; i++) {
        if (lastElement[i] === ".") {
            return ("float")
        }
    }
    const lastElementInteger = parseInt(lastElement)

    if (isNaN(lastElementInteger)) {
        const lastElementFloat = parseFloat(lastElement)
        if (isNaN(lastElementFloat)) {
            return ("NaN")
        }
        else {
            return ("float")
        }
    }
    else {
        return ("int")
    }
}


function deleteLastInputElement () { //Очиститель, если был нажат элемент <--
    let CalculationString = numbersInputBox.textContent
    const CalculationArray = CalculationString.split(" ")
    let lastElement = CalculationArray[CalculationArray.length - 1]

    if (lastElement === "") {
        CalculationArray.pop()
        CalculationArray.pop()
    }
    else {
        lastElement = lastElement.split("")
        lastElement.pop() //убрать последний символ
        lastElement = lastElement.join("")

        CalculationArray.pop()
        CalculationArray.push(lastElement)
    }
    

    CalculationString = CalculationArray.join(" ")
    numbersInputBox.textContent = CalculationString
}


function calculate () { //вычисление результата
    let CalculationString = numbersInputBox.textContent
    const CalculationArray = CalculationString.split(" ")


    function checkForImportantSigns () { //приоритет умножению и делению при их наличии
        for (let i = 0; i < CalculationArray.length; i++) {
            if (CalculationArray[i] === "*" || CalculationArray[i] === "/") {
                return true
            }
        }
        return false
    }

    function checkForLessImportantSigns () { //сложение вычитание будут выполняться после
        for (let i = 0; i < CalculationArray.length; i++) {
            if (CalculationArray[i] === "+" || CalculationArray[i] === "-") {
                return true
            }
        }
        return false
    }


    function getNumberType (number) { //Тип значения
        for (let i = 0; i < number.length; i++) {
            if (number[i] === ".") {
                return ("float")
            }
        }
    
        return ("int")
    }


    //сначала выполняются все приоритетные операции - умножение и деление
    for (let i = 0; checkForImportantSigns() === true; i++) { // цикл по находящимся в вычисляемой строке приоритетным операциям
        if (CalculationArray[i] === "*" || CalculationArray[i] === "/") { //Нахождение
            if (CalculationArray[i] === "*") {

                let firstNum = CalculationArray[i - 1] //преобразование множителя по типу
                if (getNumberType(firstNum) === "float") {
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }

                let secondNum = CalculationArray[i + 1]//преобразование множителя по типу
                if (getNumberType(secondNum) === "float") {
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum * secondNum

                CalculationArray.splice(i, 2) //Очистить старые элементы массива
                CalculationArray[i - 1] = result
                
            }
            if (CalculationArray[i] === "/") {

                let firstNum = CalculationArray[i - 1] //преобразование числителя по типу
                if (getNumberType(firstNum) === "float") {
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }
                
                let secondNum = CalculationArray[i + 1] //преобразование частного по типу
                if (getNumberType(secondNum) === "float") {
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum / secondNum

                CalculationArray.splice(i, 2) //Очистить старые элементы массива
                CalculationArray[i - 1] = result
            }
        }

        if (i === CalculationArray.length) { //если переменная-i выходит из массива, то она зануляется;
            i = 0
        }
    }

    //после выполняются все менее приоритетные операции - сложение и вычитание
    for (let i = 0; checkForLessImportantSigns() === true; i++) {

        if (CalculationArray[i] === "+" || CalculationArray[i] === "-") { 
            if (CalculationArray[i] === "+") {
                let firstNum = CalculationArray[i - 1]
                if (getNumberType(firstNum) === "float") { //преобразование по типу
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }
                
                let secondNum = CalculationArray[i + 1]
                if (getNumberType(secondNum) === "float") { //преобразование по типу
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }
                
                let result = firstNum + secondNum 

                CalculationArray.splice(i, 2) //Очистить старые элементы массива
                CalculationArray[i - 1] = result
            }
            if (CalculationArray[i] === "-") {
                let firstNum = parseInt(CalculationArray[i - 1])
                if (getNumberType(firstNum) === "float") {  //преобразование по типу
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }

                let secondNum = parseInt(CalculationArray[i + 1]) 
                if (getNumberType(secondNum) === "float") {  //преобразование по типу
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum - secondNum

                CalculationArray.splice(i, 2) //Очистить старые элементы массива
                CalculationArray[i - 1] = result
            }
        }

        if (i === CalculationArray.length) {
            i = 0
        }
        
    }

    CalculationString = CalculationArray.join(" ")
    numbersInputBox.textContent = CalculationString //конец вычисления
}


numBtns.forEach(btn => { //ввод числа
    const number = btn.getAttribute("number-btn-id")
    btn.addEventListener("click", () => {
        numbersInputBox.textContent = numbersInputBox.textContent + number
    })
})


signBtns.forEach(btn => { //ввод операции
    const sign = btn.getAttribute("sign-btn-id")
    btn.addEventListener("click", () => {

        const lastInputElementType = getLastInputElementType()
        if(lastInputElementType !== "NaN"){
            if (sign === "divide") {
                numbersInputBox.textContent = numbersInputBox.textContent + " / "
            }
            else if (sign === "multiply") {
                numbersInputBox.textContent = numbersInputBox.textContent + " * "
            }
            else if (sign === "plus") {
                numbersInputBox.textContent = numbersInputBox.textContent + " + "
            }
            else if (sign === "minus") {
                numbersInputBox.textContent = numbersInputBox.textContent + " - "
            }
            else if (sign === "dot" && lastInputElementType === "int") {
                numbersInputBox.textContent = numbersInputBox.textContent + "."
            }
        }
    })
})


controlBtns.forEach(btn => { //вывод или очищение
    const operationType = btn.getAttribute("control-btn-id")
    btn.addEventListener("click", () => {
        if (operationType === "clear") {
            deleteLastInputElement()
        }
        else if (operationType === "clearAll") {
            numbersInputBox.textContent = ""
        }
        else if (operationType === "result") {
            calculate()
        }
    })
})
