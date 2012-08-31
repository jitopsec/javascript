(
	function(){
		var tooltip = new Tooltip();
		if(window.addEventListener) window.addEventListener("load",init,false);
		if(window.attachEvent) window.attachEvent("onload",init);

		function init(){
			var links = document.getElementsByTagName("a");

			for(var i=0;i<links.length;i++){
				if(links[i].href) addTooltipToLink(links[i]);
			}
		};

		function addTooltipToLink(link){
			if(link.addEventListener){
				link.addEventListener("mouseover",mouseover,false);
				link.addEventListener("mouseout",mouseout,false);
			}else if(link.attachEvent){
				link.attachEvent("onmouseover",mouseover);
				link.attachEvent("onmouseout",mouseout);
			}

			var timer;

			function mouseover(event){

				var e = event || window.event;
				var x = e.clientX+Geometry.getHorizontalScroll()+25;
				var y = e.clientY+Geometry.getVerticalScroll()+25;

				if(timer) window.clearTimeout(timer);

				timer = window.setTimeout(showTooltip,500);

				function showTooltip(){
					
					if(link.protocol == "http:" && link.host == location.host){

						HTTP.getHeaders(link.href,function(header){
							var tip = "URL:"+link.href+"<br>"
								+"Type:"+header["Content-Type"]+"<br>"
								+"Size:"+header["Content-Length"]+"<br>"
								+"Date:"+header["Last-Modified"]+"<br>";
							tooltip.show(tip,x,y);
						};)
					
					}else{
						tooltip.show("URL:"+link.href,x,y);
					}
				};
			};

			function mouseout(event){
				if(timer) window.clearTimeout(timer);
				timer = null;
				tooltip.hide();
			};
		}

	}
)();
