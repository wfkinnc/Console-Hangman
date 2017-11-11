// Console Version of Hangman.
// Takes words from the words file

// inquirer takes letters and matches the word.
// If match, then dislay letter and Correct in Green
// If not match, then display Incorrect in Red


var inquirer 	= require("inquirer");
// for colors
var colors 		= require("colors");
// factor to multiple letters by to determine number of possible guesses
var guessFactor	= 1.5;

// count of number of times the game has player

var cntrGame		= 0;
var cntrGuess		= 0;
var numActlGuesses 	= 0;
var numPossGuesses	= 0;
var numRemnGuesses	= 0;
var Word 			= require("./objects/Word.js");
var Letter 			= require("./objects/Letter.js");


// getting list of words
var GameWords = require("./words/csWords.js");


/******************************************************************
* prototype for Word - showDashedArray
*******************************************************************/
// adds a prototype method of showDashedArray
Word.prototype.showDashedArray = function(){

	var letterArray = this.word.split('');
	// determining the number of guesses which is the
	// product of the number of letters * guess factor.
	// var numLetters	= letterArray.length;
	// var numActlGuesses	= numLetters * guessFactor;
	var displayDashedWord = "";
	for (var index in letterArray){
		if (letterArray[index] === " "){
			displayDashedWord = displayDashedWord + " ";
		} else {
			displayDashedWord = displayDashedWord + "-";
		}
	}

	console.log("-----------------------");
	console.log(displayDashedWord.green);
	console.log("-----------------------");
}// end prototype showDashedArray

/********************************************************************
* prototype for Word - matchLetterInWord
*********************************************************************/
Word.prototype.matchLetterInWord = function(passLetter){
	var letterArray = this.word.split('');
	var displayDashedWord = "";
	for (var index in letterArray){
		if (letterArray[index] === passLetter){
			displayDashedWord = displayDashedWord + passLetter;
		} else {
			displayDashedWord = displayDashedWord + "-";
		} //  endif

	}// end for
	console.log("-----------------------");
	console.log(displayDashedWord.green);
	console.log("-----------------------");
} // end  prototype matchLetterInWord

/******************************************************************
* prototype for Letter - wordMatched
******************************************************************/

Letter.prototype.wordMatched 	= function(){
// compares the original word to the hold world.. to see if everything 
// is matched.

} // end  prototype for wordMatched
 

// // creating and storing a new classroom object
var csHangManWords  = new GameWords();
// contains the array  of letters which have been matched.
var csHoldWord		= "";
var csMatchInd      = 0;
var csDashInd       = 0;
// function to play the games.
// displays the word
// prompts for letters

/********************************************************************************
* play game
********************************************************************************/
var playGame = function(){
// resetting numActlGuesses = 0
numActlGuesses = 0;
cntrGame++;

var wordIndex = Math.floor(Math.random() * (csHangManWords.wordArray.length - 0) + 0);

console.log("*****************");
console.log(" Starting Game Number: " + cntrGame);
console.log("*****************");


var gameWord = new Word(csHangManWords.wordArray[wordIndex]);
gameWord.displayWord();
//gameWord.showDashedArray();
csHoldWord = gameWord.setDashArray();
// displaying the hold word with dashes
	console.log("-----------------------");
	console.log(csHoldWord.green);
	console.log("-----------------------");

numPossGuesses = gameWord.getSize();

// capturing letters
var getLetter = function(){
// incrementing numActlGuesses 
numRemnGuesses = numPossGuesses - numActlGuesses;
console.log("Number of guesses so far: " + numActlGuesses);
console.log("Number of guesses left: " + numRemnGuesses);
inquirer.prompt([{
	name: "enteredLetter",
	message: "Please guess a letter... You have " + numRemnGuesses + " guesses left. " 
}]).then(function(letter){

	if (letter.enteredLetter === '1'){

		playGame();

	} else {

		if (numActlGuesses === 1){
		} else {

		}

		var newLetter 	= new Letter(letter.enteredLetter);

		csHoldInfo 		= JSON.parse(newLetter.setDashArray(gameWord.word,csHoldWord));
		csHoldWord      = csHoldInfo.holdWord;

		csMatchInd		= csHoldInfo.matchInd;
		csDashInd 		= csHoldInfo.numDashs;

		console.log("-----------------------");
		console.log(csHoldWord.green);
		console.log("-----------------------");

		if (csMatchInd === 0){
			var mssg = "Sorry, no match with: " + newLetter.letter;
			console.log(mssg.yellow);
		}

		// if numDashes is 0, then game is over, prompt for another game
		var playOverOptions = [{ 
			type: "list",
			name: "playOver",
			message: "",
			choices: ["Yes", "No"]
			}];


		if (csDashInd === 0){
			//option to start over when the word is finished
			playOverOptions[0].message = "You Won, would you like to play again?"
			inquirer.prompt(playOverOptions).then(function(playAgain){

				// if no, go to game over for a message
				// if  yes, play again
				if (playAgain.playOver === "No"){
					gameOver()
				} else {
					playGame();
				} // end if
		
			})
		} else { 
		// if numRemnGuess  is 0, then prompot that the game is over
			if (numRemnGuesses === 1){
				playOverOptions[0].message = "You are out of guesses, would you like to play again?"
				inquirer.prompt(playOverOptions).then(function(playAgain){
					// if no, go to game over for a message
					// if  yes, play again
					if (playAgain.playOver === "No"){
						gameOver()
					} else {
						playGame();
					}// end if
				})// end inquirer

			} else {

				getLetter();

			}
		} // end if (csDashInd)




	}// end if

})
	// incrementing guesses for the word.
	numActlGuesses++;

}// end getLetter

getLetter();

}// var playGame = function(){



// initates the game.
playGame();

function gameOver(){
	// good bye and thanks message.
	console.log("***********************************************");
	console.log("   Thank you for playing Console Hang Man!!    ");
	console.log("***********************************************");
}