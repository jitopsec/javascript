var XML;
if(typeof XML=="object" && XML.NAME="xml"){
	throw new Error("XML namescape already exists");
}

XML={};

XML.newDocument = function(rootTagName,namespaceURL){

	if(!rootTagName) rootTagName="";
	if(!namespaceURL) namespaceURL="";

	if(document.implementation && document.implementation.createDocument){
		return document.implementation.createDocument(rootTagName,namespaceURL,null);
	}else{
	
		var doc = new ActiveXObject("MSXML2.DOMDocument");

		if(rootTagName){
			var perfix = "";
			var tagname = rootTagName;

			var pos =tagname.indexOf(":");

			if(pos != -1){
				prefix = rootTagName.substring(0,pos);
				tagname = rootTagName.substring(pos+1);
			}

			if(namespaceURL){
				if(!prefix) prefix = "a0";
			}else{
				prefix = "";
			}

			var text='<'+(prefix?(prefix+':'):'')+tagname+(namespaceURL?(' xmlns:'+perfix+'="'+namespaceURL+'"')+'/>');
			doc.loadXML(text);
		}
		return doc;
	}
};
