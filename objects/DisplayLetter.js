function DisplayLetter  ( inWord){
    // Letter Object to check letters in word..and 
    this.letter = inLetter;
    this.word   = inWord;
    this.displayLetters = function(){
        console.log("showing letter " + this.letter);
        console.log("showing word " + this.word);
    }// end displayLetters


}// end Letter Contstructor

module.exports = Letter;