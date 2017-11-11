function Word (inWord){
    // Letter Object to check letters in word..and 
    this.word   = inWord;
    this.displayWord = function(){
        console.log("showing word " + this.word);
    }// end displayLetters
    this.setDashArray = function(){
    	// sets the array with dashes for display
    	// var  dashArray = new Array;
    	//[];
    	var dashArray = "";
    	var holdArray = this.word.split("");
    	// keeping this as a string instead of an array to parse and  display better.
    	for(var index in holdArray){
    		if (holdArray[index] === ' '){
	    		dashArray = dashArray + " "

    		} else {
	    		dashArray = dashArray + "-"

    		} // end if
    	} //  end for

	return dashArray;
    }// end this.set
    
    this.getSize = function(){
    	// 
    	var wordSize = this.word.length;

    	return wordSize;

    } // end getSize
}// end Word Contstructor

module.exports = Word;