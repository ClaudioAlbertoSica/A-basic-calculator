const idCounterforUserAcitionalbeButtons = 14 //It is the max ID number for the elements in the DOM wich are meant to be operated by the user (by mouse or keyboeard). All these ID's begin with "CalcButton_". So it's for the calculator buttons, not the display, for example.
let calculation = String() //A string shwoing the keys pressed
let result = Number() //The number obteined as a result

document.addEventListener("DOMContentLoaded", () => addListeners(), false)

function addListeners () {

    for(i = 0; i <= idCounterforUserAcitionalbeButtons; i++){
        let id = "CalcButton_" + i
        
        let thisElement = document.getElementById(id)

        let elementContent = thisElement.innerHTML

        console.log(elementContent)

        thisElement.addEventListener("click", () => operateButton(elementContent), false)

        thisElement.addEventListener(new KeyboardEvent("keypress", {key:elementContent}), () => operateButton(elementContent), false)
    }
}

function operateButton(keyValue){

    if(keyValue == "="){
        let res = calculation.valueOf
        result = Number(res)
        console.log(typeof result)
        modifyResult()
    }

    calculation += keyValue

    modifyDisplay()

}

function modifyDisplay(){
    document.getElementById("CalculationDisplay").innerHTML = calculation
}

function modifyResult(){
    document.getElementById("ReultDisplay").innerHTML = result
}