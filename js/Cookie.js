function Cookie(name){

	this.$name = name;
	var allcookies = document.cookie;

	if(allcookies == "") return;

	var cookies = allcookies.split(";");

	var cookie = null;

	for(var i=0;i<cookies.length;i++){
	
		if(cookie[i].substring(0,name.length+1) == (name+"=")){
			cookie = cookie[i];
			break;
		}
	}

	if(cookie == null){
		return;
	}
	
	var cookieValue = cookie.substring(name.length+1);

	var a = cookieValue.split("&");

	for(var i=0;i<a.length;i++){
	
		a[i]=a[i].split(":");
	}

	for(var i=0;i<a.length;i++){
	
		this[a[i][0]] = decodeURIComponent(a[i][1]);
	}

}

Cookie.prototype.store = function(daysToLive,path,domain,secure){
	var cookieValue = "";

	for(var property in this){
		if((property.charAt(0)=="$") || ((typeof this[property]) =="function")) continue;
		
		if(cookieValue!="") cookieValue+="&";

		cookieValue+=property+":"+encodeURIComponent(this[property]);
	}

	var cookie = this.$name+"="+cookieValue;

	if(daysToLive || daysToLive ==0){
		cookie +="; max-age="+(daysToLive*24*60*60);
	}

	if(path) cookie+="; path="+path;
	if(domain) cookie+="; domain="+domain;
	if(secure) cookie+="; secure";

	document.cookie = cookie;
	
}

Cookie.prototype.remove = function(path,domain,secure){
	for(var prop in this){
		if(prop.charAt(0)!="$" && typeof this[prop] != "function")
			delete this[prop];
	}
	this.store(0,path,domain,secure);

}

Cookie.enabled = function(){
	if(navigator.cookieEnabled != undefined) return navigator.cookieEnabled;

	if(Cookie.enabled.cache!=undefined) return Cookie.enabled.cache;

	document.cookie="testCookie=test;max-age=10000";

	var cookies = document.cookie;

	if(cookies.indexOf("testCookie=test") == -1){
		return Cookie.enabled.cache = false;
	}else{
		document.cookie="testCookie=test;max-age=0";
		return Cookie.enabled.cache = true;
	}

}
