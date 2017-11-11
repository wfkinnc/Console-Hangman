function Letter  (inLetter){
    // Letter Object to check letters in word..and 
    // update the dashArray with letters instead of dashes
    this.letter = inLetter;
    // this.word = inWord;
    // this.holdWord = inHoldWord;
    // this.word   = inWord;
    // this.holdWord = inHoldWord;

    this.displayLetters = function(){
      console.log("Letter Guessed  was: " + this.letter);
    }// end displayLetxters

    this.setDashArray = function(inWord,inHoldWord){
    	//
    	// this sets the inboud inHoldWord to a combination of
    	// matched letters and dashes. 
    	// This is displaed in the game when a letter is entered.
    	//
    	this.tmpWord = inWord;
    	this.hldWord = inHoldWord;
   	// sets the array with dashes for display
    	var tmpArray = this.tmpWord.split("");
        var hldArray = this.hldWord.split("");

    	var numMatch  = 0;
        var numDashs  = 0;
        var dashArray = "";
        for  (var index in tmpArray){
    		
  		if (tmpArray[index].toLowerCase() ===  this.letter.toLowerCase()){
    			hldArray[index] = this.letter;
    			numMatch++;
    		} // end if
	   	}// end for

        // convert arra back into a string for display..
        for(var index in hldArray){
                numDashs = (hldArray[index] == "-") ? ++numDashs : numDashs;
                dashArray = dashArray + hldArray[index];
        } //  end for

        //get the number dashes in the array, if no dashes, then word has been solved
        var retValue = '{"holdWord": "' + dashArray  + '" , "matchInd":' + numMatch + ' , "numDashs":' + numDashs +' }';

        return retValue;

	}// end this.d

}// end Letter Contstructor

module.exports = Letter;