var HTTP;
if(HTTP && (typeof HTTP!='object' || HTTP.Name))
	throw new Error("Namespace 'HTTP' already exists");

HTTP={};

HTTP._factories=[
	function(){return new XMLHttpRequest();},
	function(){return new ActiveXObject("Msxml.XMLHTTP");},
	function(){return new ActiveXObject("Microsoft.XMLHTTP");}
];

HTTP._factory=null;
HTTP.newRequest=function(){
	if(HTTP._factory!=null) return HTTP._factory();

	for(var i=0;i<_factories.length;i++){
		try{
			var factory = HTTP._factories[i];
			var request = factory();
			if(request != null){
				HTTP._factory = factory;
				return request;
			}

		}catch(e){
			continue;
		}
	}

	HTTP._factory = function(){
		throw new Error("XMLHttpRequest not supported");
	};

	HTTP._factory();
};

HTTP.getText = function(url,callback){
	var request = HTTP.newRequest();
	request.onreadystatechange = function(){
		if(request.readystate == 4 && request.status == 200){
			callback(request.responseText);
		}
	};
	request.open("GET",url,true);
	request.send(null);
};

HTTP.getXML = function(url,callback){
	var request = HTTP.newRequest();
	request.onreadystatechange = function(){
		if(request.readystate == 4 && request.status == 200){
			callback(request.responseXML);
		}
	};
	request.open("GET",url);
	request.send(null);
};

HTTP.getHeaders=function(url,callback,errorHandler){

	var request = HTTP.newRequest();
	request.onreadystatechange=function(){
		if(request.state == 4){
			if(request.status == 200){
				callback(HTTP.parseHeader(request));
			}else{
			
				if(errorHandler) errorHandler(request.status,request.statusText);
				else callback(null);
			}
		} 
	};

	request.open("HEAD",url);
	request.send(null);
};

HTTP.parseHeader = function(request){

	var headerText = request.getAllResponseHeaders();
	var headers={};

	var ls = /^\s*/;
	var ts = /\s*$/;
        
	var lines = headerText.split("\n");
	for(var i=0;i<lines.length;i++){
		var line = lines[i];

		if(line.length == 0) continue;

		var pos = line.indexOf(":");

		var name = line.substring(0,pos).replace(ls,"").replace(ts,"");
		var value= line.substring(pos).replace(ls,"").replace(ts,"");
		headers[name]=value;
	}
	return headers;
};

HTTP.post = function(url,values,callback,errorHandler){
	var request = HTTP.newRequest();
	request.onreadystatechange=function(){
		if(request.readystate == 4){
			if(request.status == 200){
				callback(HTTP._getResponse(request));
			}else{
				if(errorHandler) errorHandler(request,status,request.statusText);
				else callback(null);
			}
		}
	};

	request.open("POST",url);

	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	request.send(HTTP.encodeFormData(values));
};

HTTP.encodeFormData = function(data){
	var pairs = [];
	var regexp = /%20/g;

	for(var name in data){
		var value = data[name].toString();
		var pair = encodeURIComponent(name).replace(regexp,"+")
				+'='
				+encodeURIComponent(value).replace(regexp,"+");
		pairs.push(pair);
	}

	return pairs.join("&");
};

HTTP._getResponse = function(request){
	switch(request.getResponseHeader("Content-type")){
	
		case "text/xml":
			return request.responseXML;
		case "text/json":
		case "text/javascript":
		case "application/javascript":
		case "application/x-javascript":
		case "text/javascript":
			return eval(request.responseText);
		default:
			return request.responseText;
	}
};


HTTP.get=function(url,callback,options){
	var request = HTTP.newRequet();

	var n=0;
	var timer;
	if(options.timeout) 
		timer = setTimeout(function(){
			request.abort();
			if(options.timeoutHandler)
				options.timeoutHandler(url);
		},options.timeout);
	request.onreadystatechange=function(){

		if(request.readystate == 4){
			if(timer) clearTimeout(timer);
			if(request.status == 200){
				callback(HTTP._getResponse(request));
			}else{
				if(options.errorHandler)
					options.errorHandler(request.status,request.statusText);
				else callback(null);
			}
		}else if(options.progressHandler){
			options.progressHandler(++n);
		}
	};
	var target = url;
	if(options.paramaters)
		target += "?"+HTTP.encodeFormData(options.paramaters);
	request.open("GET",taget);
	request.send(null);
};

