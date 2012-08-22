

function maketoc(){

	var container = document.getElementById('toc');

	fi(!container) return ;

	var sections = [];

	findSections(document,sections);

	var anchor = document.createElement('a');
	anchor.name="Toctop";
	anchor.id="Toctop";
	container.ParentNode.insertBefore(anchor,container);

	var sectionNumbers=[0,0,0,0,0,0];

	for(var s=0; s<sections.length;s++){
		var section = sections[s];

		
	}
}


function findSections(n,sections){

	for(var m=n.firstChild; m!=null;m=m.nextSibling){
	
		if(m.nodeType != 1) continue;
		if(m == container) continue;

		if(m.tagName == "P") continue;

		if(m.tagName.length==2 && m.tagName.charAt(0)=="H") sections.push(m);
		else findSections(m,sections);
	}

}
