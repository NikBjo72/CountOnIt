'use strict'
console.log("Hej html!");

const app = { // Ojekt med vaiabler, så att bara en variabel finns i Global Scope
    numberOneEl: document.getElementById("numberOne"),
    numberTwoEl: document.getElementById("numberTwo"),
    mySelection: document.getElementById("calMethod"),
    countBtn: document.getElementById("countBtn")
}

countBtn.addEventListener("click", function() { // Lyssnare på räknaknappen.

    parseNumbers(app.numberOneEl.value, app.numberTwoEl.value); // Parsar string till number.

    let numberOneParsed = parseNumbers(app.numberOneEl.value, app.numberTwoEl.value)[0] // Plockar ur de två parsade numren ur arrryen från funktionen parseNumbers.
    let numberTwoParsed = parseNumbers(app.numberOneEl.value, app.numberTwoEl.value)[1]

    let WT = warningText(numberOneParsed, numberTwoParsed) // Kollar om variablerna och skriver ut varningstext om de inte är det. Returnerar true om både är nummer.

    if (WT === true){
        let calMethod = getCalMethod(); // Hämtar kalkyleringsmetoden, d.v.s. +, -, / eller *.
        calculation(numberOneParsed, numberTwoParsed, calMethod); // Beräknar talet med hjälp av switsch
    }
});

function checkNumber(input) { // Funktion som kollar att det hämtade elementet är ett tal.
    var input = +input; 
    if (input == input) { 
        return ("number"); 
    } else { 
        return ("NaN"); 
    } 
}

function getCalMethod(){ // Funktion som hämtar kalkyleringsmetoden från drop-down listen.
    let mySelectionIndex = app.mySelection.selectedIndex;
    let calMethod = app.mySelection[mySelectionIndex].value;
    return calMethod;
}

function saveCalculation(Inputcalculation){ // Funktion som sparar talet i fieldset uträkningar.
    let calculation = document.createElement("p");
    calculation.innerText = Inputcalculation;
    document.getElementById("calculations").appendChild(calculation);
}

function createNaNText(iD){ // Funktion som skapar en varningstext och plaserar den under inputrutorna.
    const notNaNText = document.createElement("small");
    notNaNText.setAttribute("id", iD);
    notNaNText.innerText = "Inte ett nummer!";
    document.getElementById("warning").appendChild(notNaNText);
}

function checkExistingElement(elementId){ // Funktion som kollar genom Id om elementet finns i DOM.
    let element = document.getElementById(elementId)
    if (typeof(element) != "undefined" && element != null)
        return true;
    else{
        return false;
        }
}

function warningText(numberOne, numberTwo){ // Funktion som kollar båda nummer samt lägger in varningstexter om det inmatade inte är nummer. Returnerar true om båda fälten är nummer.
    let one = true;
    let two = true;

    let x = checkExistingElement("warningOne")
    if (x === true){
        document.getElementById("warningOne").remove();
    }

    checkNumber(numberOne);
    if (checkNumber(numberOne) === "NaN"){
        createNaNText("warningOne")
        one = false;
    }

    let y = checkExistingElement("warningTwo")
    if (y === true){
        document.getElementById("warningTwo").remove();
    }
    
    checkNumber(numberTwo);
    if (checkNumber(numberTwo) === "NaN"){
        createNaNText("warningTwo")
        two = false;
    }
    
    if (one === true && two === true){
        return true;
    }
    else{
        return false;
    }
}

function parseNumbers(numberOne, numberTwo){ // Function som parsar de två inpatningarna till number med Float-metoden.
    let numberOneParsed = parseFloat (numberOne);
    let numberTwoParsed = parseFloat (numberTwo);
    return [numberOneParsed, numberTwoParsed];
}

function calculation(NoOne, NoTwo, calMethod){ // Funktion som räknar ut talet med hjälp av switch.
    switch (calMethod) {
        case "+":
            let resultPlus = NoOne + NoTwo;
            saveCalculation(NoOne + " + " + NoTwo + " = " + resultPlus)
            eraseOldNumbers();
            break;
    
        case "-":
            let resultMinus = NoOne - NoTwo;
            saveCalculation(NoOne + " - " + NoTwo + " = " + resultMinus)
            eraseOldNumbers();

            break;
    
        case "/":
            let resultMult = NoOne / NoTwo;
            saveCalculation(NoOne + " / " + NoTwo + " = " + resultMult)
            eraseOldNumbers();
            break;

        case "*":
            let resultDiv = NoOne * NoTwo;
            saveCalculation(NoOne + " * " + NoTwo + " = " + resultDiv)
            eraseOldNumbers();
            break;
            }
}
function eraseOldNumbers(){ // Funktion som tar bort text i inmatningsrutorna.
    app.numberOneEl.value ="";
    app.numberTwoEl.value ="";
}