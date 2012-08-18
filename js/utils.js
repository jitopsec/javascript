
var uniqueID = (function(){
        var id=0;
        return function(){ return "_id_"+(id++);};
})();

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

function copyProperties(/*object*/ from ,/*object*/ to){
	if(!to){
		to = {};
	}

	for(p in from){
		to[p] = from[p];
	}
	return to;
}

function  filterArray(/*array*/ array ,/*boolean function*/ filter){

	var  results = [];
	var length = a.length;
	for(var i=0;i<length;i++){
		var element = a[i];
		if(filter(element)){
			results.push(element);
		}
	}
	return results;
}

function getArgs(){
	var args = new Object();
	var query = window.location.search.substring(1);
	var pairs = query.split("&");

	for(var i=0; i<pairs.length;i++){
		var pos = pairs[i].indexOf("=");
		if(pos == -1) continue;
		var argName = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
                value = decodeURIComponent(value);
		args[argName] = value;
	}
	return args;
}
