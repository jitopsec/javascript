

function animateCSS(element,numFrames,timePerFrame,animation,whendone){
	var frame = 0;
	var time = 0;
	var intervalId = setInterval(displayNextFrame,timePerFrame);

	function displayNextFrame(){
		
		if(frame>=numFrames){
			clearInterval(intervalId);
			if(whendone) whendone(element);
			return ;
		}

		for(var cssprop in animation){
			try{
				var value = animation[cssprop](frame,time);
				element.style[cssprop] = value;
			}catch(e){}
		}

		frame++;
		time+=timePerFrame;
	}

}


