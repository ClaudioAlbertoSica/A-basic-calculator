const idCounterforUserAcitionalbeButtons = 18 //It is the max ID number for the elements in the DOM wich are meant to be operated by the user (by mouse or keyboeard). All these ID's begin with "CalcButton_". So it's for the calculator buttons, not the display, for example.
let calculationToDisplay = String() //A string use for shwoing the keys pressed, in the calculator's display. And it's a different variable from the below "result", because this one can be used to format the displayed number with symbols different from the ones used to calculate (for instance the use of x for multiplication, instead of *, and the decimal separator can be changed in the future from , to . and so on)
let result = String() // This String will originate the number obteined as a result. 
let validKeys = [] //List to be automaticaly fulfilled with a list of keyboard keys recognized by the calculator
let additionalValidKeys = Array('*', 'enter') //Additional keys to be used by the calculator
let memStoredResult = String() //The variable used to store a result in the calculators memory

document.addEventListener("DOMContentLoaded", () => addListeners(), false)

function addListeners() {

    //   document.addEventListener("keypress", (event) => operateButton(event.key), true)

    for (i = 0; i <= idCounterforUserAcitionalbeButtons; i++) {
        let id = "CalcButton_" + i

        let thisElement = document.getElementById(id)

        let elementContent = thisElement.innerHTML.toLowerCase()

        thisElement.addEventListener("click", () => operateButton(elementContent), false)

        validKeys.push(elementContent)

    }

    validKeys.push(...additionalValidKeys)

    document.addEventListener("keypress", (event) => {
        let typedKey = event.key.toLowerCase()
        if (validKeys.includes(typedKey)) {
            operateButton(typedKey)
        }
    }, false)

}

function operateButton(keyValue) {
    try {
        keyValue = correctValues(keyValue)

        switch (keyValue) {

            case ('='):
                manageEqualKey()
                break

            case ('r'):
                manageResetKey()
                break

            case ('m'):
                manageMemoryKey()
                break

            default:
                if (isNaN(keyValue)) { //just to add spaces beetween operators, and not beetween numbers.
                    calculationToDisplay += " " + keyValue + " "
                } else {
                    calculationToDisplay += keyValue
                }

                modifyCalculationDisplay(calculationToDisplay)
                break

        }

    } catch (error){
        console.log(error.message)
        result = "Something went wrong..."
        modifyResultDisplay(result)
    }
}

function evaluateResult() {
    result = eval(calculationToDisplay)
    calculationToDisplay = result
}

function modifyCalculationDisplay(toDisplay) {
    document.getElementById("CalculationDisplay").innerHTML = toDisplay
}


function modifyResultDisplay(resultToDisplay) {
    document.getElementById("ResultDisplay").innerHTML = resultToDisplay
}

function correctValues(keyValue) { //this function "corrects" values that comes from the dispayed calculator:, for example an eventual X that comes instead of the * mathematical operator, due to how I placed the listeners in the first place. I left a switch just in case I add more operators in the future, with this same issue
    let valueToReturn = keyValue

    switch (keyValue) {
        case ('x'): valueToReturn = '*'; break;
        case ('enter'): valueToReturn = '='; break;
    }

    return valueToReturn
}


function fadeResultDisplay() { //Briefly fades Result display, indicating a result was stored in the memory
    modifyResultDisplay("")
    setTimeout(() => modifyResultDisplay(result), 300)
}

function manageEqualKey() {
    evaluateResult()
    modifyResultDisplay(result)
    calculationToDisplay = result
}

function manageResetKey() {

    if (result == "Result displayed here" && document.getElementById("CalculationDisplay").innerHTML == "Keeping stored result in memory") { //Basically I'm verifying if are both displays set as the else condition would leave them if I was to store something in the memory, so: idea is that touching 2 times the Reset key will erase the memory
        memStoredResult = ""
        document.getElementById("CalcButton_15").innerHTML = "M"
        calculationToDisplay = "Memory was deleted"
    } else {
        if (memStoredResult != "") {
            calculationToDisplay = "Keeping stored result in memory"
        } else {
            calculationToDisplay = "Calculation shown here"
        }
    }
    result = "Result displayed here"
    modifyCalculationDisplay(calculationToDisplay)
    modifyResultDisplay(result)
    calculationToDisplay = ""
}

function manageMemoryKey() {

    if(memStoredResult != ""){
        calculationToDisplay += " " + memStoredResult + " "
        modifyCalculationDisplay(calculationToDisplay)
    }else{
        evaluateResult()
        memStoredResult = result
        fadeResultDisplay()
        document.getElementById("CalcButton_15").innerHTML = "Use Strd"
    }
}