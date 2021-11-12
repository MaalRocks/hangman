class Game {
    constructor(counterTextElement, solutionTextElement, mistakeTextElement, rndArray) {
        this.counterTextElement = counterTextElement
        this.solutionTextElement = solutionTextElement
        this.mistakeTextElement = mistakeTextElement
        this.rndArray = rndArray
        this.clear();
        this.setSolution();
        this.updateDisplay();
        this.whichKeyPressed();
    }

    clear() {
        this.counter = ""
        this.lastAnswer = ""
        this.mistakes = ""
        this.solution = ""
    }


    setSolution() {
        this.solution = prompt("Bitte geben Sie ein Wort ein: ",  "Suppe" /*rndWords[Math.floor(Math.random() * rndWords.length)]*/   ).toUpperCase()
        if (this.solution == null || this.solution == "") {
            this.solution = "Benutzer hat die Eingabe abgebrochen"
        }

        this.solution = Array.from(this.solution.toUpperCase())
        this.obfuscateSolution()

        // hier möglicherweise checken ob der input wert einem wert aus der kopie des strings enspricht
        // wenn ja dann ermittelt die stelle(n) und schreibe diesn wert an diese Stellen
        // danach update das display
    }

    obfuscateSolution() {
        this.solutionObfuscated = this.solution.slice()

        for (let i = 1; i < this.solution.length; i++) {
            this.solutionObfuscated[i] = "_";
        }
    }

    whichKeyPressed() {
        document.addEventListener("keydown", event => {
            if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 186 || event.keyCode == 191 || event.keyCode == 219 || event.keyCode == 222) {
                
                // Wenn es sich um einen Buchstaben handelt dann:
                // gehe den solutionArray durch
                // vergleiche jeden charackter mit der eingabe
                // ist der charackter gleich dann:
                // stelle ihn an der selben stelle im obfsArray dar (pop and push)
                // gucke ob der buchstabe im string vorhanden ist
                // wenn vorhanden:
                // speichere die position(en) und den wert des Buchstaben sowie oft er im wort vorkommt
                // wenn nicht vorhanden:
                // speichere den wert des Buchstaben
                // und push diesen wert in das mistakesArray

                

                if (this.solution.includes(event.key.toUpperCase())) {
                    for (let i = 0; i < this.solution.length; i++) {
                        if (this.solution[i] == event.key.toUpperCase()) {
                            this.solutionObfuscated[i] = event.key.toUpperCase();
                        }
                    }

                    this.lastAnswer = event.key.toUpperCase()
                    console.log("Der Buchstabe: " + this.lastAnswer + " an Position: " + this.solution.indexOf(this.lastAnswer) + " ist richtig")
                    this.updateDisplay()
                }
                else {

                    if (this.mistakes.includes(event.key.toUpperCase())) {
                        return
                    }
                    else {
                        this.mistakes = event.key.toUpperCase()
                        console.log("Der Buchstabe " + event.key.toUpperCase() + " kommt in der Lösung nicht vor")
                        this.updateDisplay()
                    }
                }
            }
            else
            {
                console.log("Kein Buchstabe")
            }
        });
    }

    updateDisplay() {
        this.counterTextElement.textContent = this.counterTextElement.textContent + this.counter
        this.solutionTextElement.textContent = this.solutionObfuscated.join(" ")
        this.mistakeTextElement.textContent = this.mistakeTextElement.textContent + this.mistakes
        this.checkForWin()
    }


    checkForWin() {
        if (this.solution == this.solutionObfuscated) {
            console.log("gewonnen");
        }
    }

    changeScreen() {

    }

}


const rndWords = ["Wurstnudel", "Soßengeflecht", "Nordbert"]

const hangman = new Game(document.querySelector("[data-counter]"), 
                         document.querySelector("[data-answer]"), 
                         document.querySelector("[data-mistake]"),
                         rndWords
                         )


