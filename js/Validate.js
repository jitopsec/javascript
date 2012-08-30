(function(){

	if(window.addEventListener) window.addEventListener("load",init,false);
	else if(window.attachEvent) window.attachEvent("onload",init);

	function init(){
		
		for(var i=0; i<document.forms.length;i++){
			
			var form = document.forms[i];

			var needsValidation = false;


			for(var j=0; j<form.elements.length;j++){
			
				var element = form.elements[j];

				if(element.type !="text") continue;

				var pattern = element.getAttribute("pattern");
				var required = element.getAttribute("required");

				if(required && !pattern){
					pattern = "\\S";
					element.setAttribute("pattern",pattern);
				}

				if(pattern){
					element.onchange = validateOnChange;
					needsValidation = true;
				}

				if(needsValidation) form.onsubmit= validateOnSubmit;
			}
		
		}
	}

	function validateOnChange(){
		var textField = this;
		var pattern =textField.getAttribute("pattern");
		var value = textField.value;
		if(value.search(pattern) == -1 ) textField.className = "invalid";
		else textField.className = "valid";
	}

	function validateOnSubmit(){
		var invalid = false;

		for(var i=0;i<this.elements.length;i++){
			var element = this.elements[i];
			if(element.type =="text" &&  element.onchange==validateOnChange){
				element.onchange();
				if(element.className == "invalid") invalid = true;
			}
		}
		
		if(invalid){
			alert("The form is incompletely or incorrectly filled out");
			return false;
		}

	}

})();
