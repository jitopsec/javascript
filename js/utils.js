function println(message){

	document.write(message,"<br>");
}

function copyPropertyNameToArray(object,array){

	if(!a) a=[];

	for(var propertyName in object){
		a.push(propertyName);
	}
	return array;
}

function max(/*......*/){

	var m = Number.NEGATIVE_INFINITY;
	for(var i=0; i<arguments.length;i++){
		if(arguments[i]>m){
			m = arguments[i];
		}
	}
	return m;
}
