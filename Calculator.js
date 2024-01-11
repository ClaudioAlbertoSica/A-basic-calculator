const idCounterforUserAcitionalbeButtons = 18 //It is the max ID number for the elements in the DOM wich are meant to be operated by the user (by mouse or keyboeard). All these ID's begin with "CalcButton_". So it's for the calculator buttons, not the display, for example.
let calculationToDisplay = String() //A string use for shwoing the keys pressed, in the calculator's display. And it's a different variable from the below "result", because this one can be used to format the displayed number with symbols different from the ones used to calculate (for instance the use of x for multiplication, instead of *, and the decimal separator can be changed in the future from , to . and so on)
let result = String() // This String will originate the number obteined as a result. 
let validKeys = [] //List to be automaticaly fulfilled with a list of keyboard keys recognized by the calculator
let additionalValidKeys = Array('*','Enter') //Additional keys to be used by the calculator

document.addEventListener("DOMContentLoaded", () => addListeners(), false)

function addListeners() {

 //   document.addEventListener("keypress", (event) => operateButton(event.key), true)

    for (i = 0; i <= idCounterforUserAcitionalbeButtons; i++) {
        let id = "CalcButton_" + i

        let thisElement = document.getElementById(id)

        let elementContent = thisElement.innerHTML

        thisElement.addEventListener("click", () => operateButton(elementContent), false)

        validKeys.push(elementContent)

    }

    validKeys.push(...additionalValidKeys)

    console.log(validKeys)

    document.addEventListener("keypress", (event) => {
        if(validKeys.includes(event.key)){
            operateButton(event.key)}}, false)
}

function operateButton(keyValue) {
try{
    keyValue = correctValues(keyValue)

    if (keyValue == "=") {
        result = eval(calculationToDisplay)
        modifyResult()
    }

    if (isNaN(keyValue)) { //just to add spaces beetween operators, and not beetween numbers.
        calculationToDisplay += " " + keyValue + " "
    } else {
        calculationToDisplay += keyValue
    }

    modifyDisplay()

}catch{
    result = "Something went wrong..."
    modifyResult()
}
}

function modifyDisplay() {
    document.getElementById("CalculationDisplay").innerHTML = calculationToDisplay
}

function modifyResult() {
    document.getElementById("ReultDisplay").innerHTML = result
}

function correctValues(keyValue) { //this function "corrects" values that comes from the dispayed calculator:, for example an eventual X that comes instead of the * mathematical operator, due to how I placed the listeners in the first place. I left a switch just in case I add more operators in the future, with this same issue
    let valueToReturn = keyValue

    switch (keyValue) {
        case ('x'): valueToReturn = '*'
        case ('Enter'): valueToReturn = '='
    }

    return valueToReturn
}

