const idCounterforUserAcitionalbeButtons = 14 //It is the max ID number for the elements in the DOM wich are meant to be operated by the user (by mouse or keyboeard). All these ID's begin with "CalcButton_". So it's for the calculator buttons, not the display, for example.
let calculation = String() //A string shwoing the keys pressed
let result = Number() // The number obteined as a result


document.addEventListener("DOMContentLoaded", () => addListeners(), false)

function addListeners() {

    for (i = 0; i <= idCounterforUserAcitionalbeButtons; i++) {
        let id = "CalcButton_" + i

        let thisElement = document.getElementById(id)

        let elementContent = thisElement.innerHTML

        console.log(elementContent)

        thisElement.addEventListener("click", () => operateButton(elementContent), false)

        thisElement.addEventListener(new KeyboardEvent("keypress", { key: elementContent }), () => operateButton(elementContent), false)
    }
}

function operateButton(keyValue) {
try{
    keyValue = correctValues(keyValue)

    if (keyValue == "=") {
        result = eval(calculation)
        modifyResult()
    }

    if (isNaN(keyValue)) { //just to add spaces beetween operators, and not beetween numbers.
        calculation += " " + keyValue + " "
    } else {
        calculation += keyValue
    }

    modifyDisplay()
}catch{
    result = "Something went wrong..."
    modifyResult()
}
}

function modifyDisplay() {
    document.getElementById("CalculationDisplay").innerHTML = calculation
}

function modifyResult() {
    document.getElementById("ReultDisplay").innerHTML = result
}

function correctValues(keyValue) { //this function "corrects", for example an eventual X that comes instead of the * mathematical operator, due to how I placed the listeners in the first place. I left a switch just in case I add more operators in the future, with this same issue
    let valueToReturn = keyValue

    switch (keyValue) {
        case ('x'): valueToReturn = '*'
    }

    return valueToReturn
}

