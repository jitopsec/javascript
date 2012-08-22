

function make(tagName,attributes,children){
	if(arguments.length == 2 
		&& (attributes instanceof Array || typeof attributes == "string")){
		
		children = attributes;
		attributes = null;
	}

	var e = document.createElement(tagName);

	if(attributes){
		for(var name in attributes)
			e.setAttribute(name,attributes[name]);
	}

	if(children){
		if(children instanceof Array){
			for(var i=0;i<children.length;i++){
				var child = children[i];

				if(typeof child == 'string'){
					child = document.createTextNode(child);
				}
				e.appendChild(child);
			}
		}else if(typeof children =='string'){
			e.appendChild(document.createTextNode(children));
		}else{
			e.appendChild(children);
		}
	}

	return e;
}

function maker(tag){
	return function(attrs,kids){
		if(arguments == 1) return make(tag,attrs);
		else return make(tag,attrs,kids);
	};
}
