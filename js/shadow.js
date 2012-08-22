
var Shadow = {};


Shadow.add=function(element,shadows){

	if(typeof element == "string")
		element = document.getElementById(element);
	shadows = shadows.replace(/^\s+/,"").replace(/\s+$/,"");
	var arg = shadows.split(/\s+/);

	var textNode = element.firstChild;

	element.style.position = "relative";


	var numshadows = arg.length/3;

	for(var i=0;i<numshadows;i++){
	
		var shadowX = arg[i*3];
		var shadowY = arg[i*3+1];
		var shadowColor = arg[i*3+2];

		var shadow =  document.createElement('span');
		shadow.setAttribute("style","position:absolute; left:"+shadowX+";"
					+"top:"+shadowY+";"
					+"color:"+shadowColor+";");

		shadow.appendChild(textNode.cloneNode(false));
		element.appendChild(shadow);
		
	}
	var text = document.createElement("span");
	text.setAttribute("style","position:relative");
	text.appendChild(textNode);
	element.appendChild(text);
}

Shadow.addAll = function(root,tagName){
	if(!root) root = document;
	if(!tagName) tagName="*";
	var elements = root.getElementsByTagName(tagName);

	for(var i=0;i<elements.length;i++){
	
		 var shadow = elements[i].getAttribute("shadow");
		 if(shadow) Shadow.add(elements[i],shadow);
	}
}
