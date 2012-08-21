

function log(category,message,object){

	if(log.options[category+"Disabled"]) return;
	
	var id = category+"_log";

	var container = document.getElementById(id);

	if(!container && log.options[category+"Enabled"]){
		container = document.createElement("div");
		container.id = id;
		container.className = "log";
		document.body.appendChild(container);
	}

	if(!container) return ;
	
	if(log.options.timestamp)
		message = new Date()+":"+(mesage?message:'');
	
	var entry = document.createElement("div");
	entry.className = category+"_message";

	if(message){
		entry.appendChild(document.createTextNode(message))
	}

	if(object && typeof object == "object"){
		entry.appendChild(log.makeTable(object,0));
	}
	container.appendChild(entry);
} 

log.makeTable = function(object,level){
	if(level > log.options.maxRecursion)
		return document.createTextNode(object.toString());
	var table = document.createElement("table");
	table.border = 1;
	
	var header = document.createElement("tr");
	var headerName = document.createElement("th");
	var headerType= document.createElement("th");
	var headerValue= document.createElement("th");

	headerName.appendChild(document.createTextNode("Name"));
	headerType.appendChild(document.createTextNode("Type"));
	headerValue.appendChild(document.createTextNode("Value"));

	header.appendChild(headerName);
	header.appendChild(headerType);
	header.appendChild(headerValue);

	table.appendChild(header);

	var names=[];

	for(var name in object){
		names.push(name);
	}
	names.sort();

	for(var i=0;i<names.length;i++){
		var name,value,type;
		name = names[i];
		try{
			value = object[name];
			type = typeof value;
		}catch(e){
			value= "<unknown value>";
			type="unknown";
		};
		
		if(log.options.filter && !log.options.filter(name,value)) continue;
		if(type == 'function') value="{}";

		var row = document.createElement("tr");
		row.vAlign = "top";
		var rowName = document.createElement("td");
		var rowType= document.createElement("td");
		var rowValue = document.createElement("td");


		rowName.appendChild(document.createTextNode(name));
		rowType.appendChild(document.createTextNode(type));
                

		if(type == "object"){
		
			rowValue.appendChild(log.makeTable(value,level+1));
		}else{
			rowValue.appendChild(document.createTextNode(value));
		}

		row.appendChild(rowName);
		row.appendChild(rowType);
		row.appendChild(rowValue);

		table.appendChild(row);

	}

	return table;
}

log.options = {};

log.debug = function(message,object){ log("debug",message,object)};
log.warn= function(message,object){ log("warn",message,object)};

