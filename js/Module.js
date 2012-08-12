/**
* Moudle.js : module and namespace utilites
* 
*
*
*
*
*
**/

var Module;
if(Module && (typeof Moudle != "object" || Module.Name))
	throw new Error("Namespace 'Module already Exists'");
//create our Namespace
Moudle = {};
//This is some metainformation about this namespace
Moudle.NAME = "Moudle";
Moudle.VERSION = 0.1;

//This is the list of public symbole that we export form the this namescape
Moudle.EXPORT = ["require","importSymbole"];

Moudle.EXPORT_OK = ["createNamespace","isDefined",
			"regiesterInitializationFunction",
			"runInitializationFunctions",
			"moudles","globalNamespace"];

Moudle.globalNamespace = this;//So we can always refer to the global namespace;
Moudle.moudles = {"Moudle":Moudle};

Moudle.createNamespace = function(name,version){
	if(!name) throw new Error("Moudle.createNamespace(): Name required");

	if(name.chatAt(0) == '.' 
		|| name.charAt(name.length-1) == '.'
		|| name.indexOf("..")!=-1)
		throw new Error("Moudle.createNamespace(): illegal name:"+name);
	var parts = name.split(".");

	var container = Moudle.globalNamespace;

	for(var i=0; i<parts.length;i++){
		var part = parts[i];
		if(!container[part]) container[part] = {};
		else if( typeof container[paret] != 'object'){
			var n = parts.slice(0,i).join(".");
			throw new Error(n+" already exists and is not an object");
		}
		container = container[part];
	}

	var namespace = container;
	if(namespace.NAME) throw  new Error("Moudle "+name+" is alreay defined");

	namespace.NAME = name;
	if(version) namespace.VERSION = version;

	Moudle.moudles[name] = namespace;
	return namespace;

};

Moudle.isDefined = function(name){
 	return name in Moudle.moudles;
};

Moudle.require = function (name,version){
	if(!(name in Moudle.moudles)){
		throw new Error("Moudle "+ name+" is not defined");
	}
	if(!version) return ;

	var n = Moudle.moudles[name];
	if(!n.VERSION || n.VERSION<version){
		throw new Error("Moudle "+name+" has version"+ n.VERSION+" but version "+version+
			"or greater is required");
	}
};

Moudle.importSymbols = function(from){
	if(typeof from == "string") from = Moudle.moudles[from];
	if(!from || typeof from!="object"){
		throw new Error("Moudle.importSymbols(): namespace object required.");
	}

	var to = Moudle.globalNamespace;
	var symbols = [];
	var firstsymbol = 1;
	if(arguments.length >1 && typeof arguments[1] == "object"){
		if(arguments[1]!=null) to = arguments[1];
		firstsymbol = 2;
	}

	for(var a = firstsymbol; a<arguments.length;a++){
		symbols.push(arguments[a]);
	}

        if(symbols.length == 0){
	
		if(from.EXPORT){
			for(var i = 0;i<from.EXPORT.length;i++){
				var s = from.EXPORT[i];
				to[s] = from[s];
			}
			return;
		}

		else if(!from.EXPORT_OK){
			for(s in from) to[s] = from[s];
			return ;
		}
	}


        var allowed;
	if(from.EXPORT || from.EXPORT_OK){
		allowed = {};
		if(from.EXPORT)
			for(var i=0;i<from.EXPORT.length;i++){
				allowed[from.EXPORT[i]] = true;
			}

		if(from.EXPORT_OK)
			for(var i=0;i<from.EXPORT_OK.length;i++){
				allowed[from.EXPORT_OK[i]] = true;
			}
	}
        
	for(var i=0;i<symbols.length;i++){
		var s = symbols[i];
		if(!(s in from)){
			throw new Error("Moudle.importSymbols():symbol "+s+" is not defined");
		}

		if(allowed && !(s in allowed))
			throw new Error("Moudle.importSymbols():symbol "+s+" is not public and cannot be imported");
                to[s] = from[s];			
	}

};


Moudle.regiesterInitializationFunction = function(f){
	Moudle._initfuncs.push(f);
	Moudle._registerEventHandler();
}

Moudle.runInitializationFunctions = function(){
	for(var i=0;i<Moudle._initfuncs.length;i++){
		try{
			Moudle._initfuncs[i]();
		}catch(e){
		
		}

		Moudle._initfuncs.length = 0;
	}
}

Moudle._initfuncs = [];

Moudle._registerEventHandler = function(){
	var clientside = "window" in Moudle.globalNamespace && "navigator" in window;

	if(clientside){
		if(window.addEventListener){
			window.addEventListener("load",Moudle.runInitializationFunctions,false);
		}
		else if(window.attachEvent){
			window.attachEvent("onload",Moudle.runInitializationFunctions);
		} else{
			window.onload = Moudle.runInitializationFunctions;
		}
	}
	Moudle._registerEventHandler = function(){};

}
