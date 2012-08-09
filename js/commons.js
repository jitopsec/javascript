//Return true if the last character is c

String.prototype.endWith = function(c){
	return (c == this.charAt(this.length-1));
};
