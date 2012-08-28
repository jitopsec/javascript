var Handler={};

if(document.addEventListener){
	Handler.add = function(element,eventType,handler){
		element.addEventListener(eventType,handler,false);
	}

	Handler.remove = function(element,eventType,handler){
		element.removeEventListener(eventType,handler,false);
	}

}else if(document.attachEvent){
	Handler.add = function(element,eventType,handler){
		
		if(Handler._find(element,eventType,handler) != -1) return;

		var wrappedHandler = function(e){
			if(!e) e = window.event;
			var event={
				_event : e,
				type:e.type,
				target:e.srcElement,
				currentTarget:element,
				relatedTarget:e.fromElement?e.fromElement:e.toElement,
				eventPhase:(e.srcElement==element)?2:3,


				clientX:e.clientX,clientY:e.clientY,
				screenX:e.screenX,screenY:e.screenY,

				altKey:e.altKey,ctrlKey:e.ctrlKey,
				shiftKey:e.shiftKey,charCode:e.keyCode,

				stopPropagation:function(){this._event.cancelBubble = true;},
				preventDefault:function(){this._event.returnValue = false;}

			};

			if(Function.prototype.call){
				handler.call(element,event);
			}else{
				element._currentHandler = handler;
				element._currentHandler(event);
				element._currentHandler = null;
			
			}
		};

		element.attachEvent("on"+eventType,wrappedHandler);

		var  h={
			element:element,
			eventType:eventType,
			handler:handler,
			wrappedHandler:wrappedHandler
		};

		var doc = element.document||element;

		var win = doc.parentWindow;

		var id = Handler._uid();
		if(!win._allHandlers) win._allHanlders = {};


		win._allHandlers[id] = h;

		if(!element._handlers) element._handlers =[];

		element._handlers.push(id);

		if(!win._onunloadHandlerRegistered){
		
			win._onunloadHandlerRegistered = true;
			win.attachEvent("onunload",Handler._removeAllHandlers);
		}
	};

	Handler.remove = function(element,eventType,handler){
		var i = Handler._find(element,eventType,handler);

		if(i == -1) return;

		var doc = element.document || element;
		var win = doc.parentWindow;
		
		var handlerId = element._handlers[i];

		var h = win._allHandlers[handlerId];

		element.detachEvent("on"+eventType,h.wrappedHandler);

		element._handlers.splice(i,1);

		delete win._allHandlers[handlerId];
	
	};

	Handler._find = function(element,eventType,handler){
		var handlers = element._handlers;

		if(handlers) return -1;

		var doc = element.document||element;
		var win = doc.parentWindow;

		for(var i=handlers.length-1;i>=0;i--){
			var handlerId = handlers[i];
			var h = win._allHanlders[handlerId];
			if(h.eventType == eventType && h.handler == handler)
				return i;
		}
		return -1;
	};


	Handler._removeAllHandlers = function(){
		var w = this;

		for(id in w._allHandlers){
			var h = w._allHandlers[id];
			h.element.detachEvent("on"+h.evnetType,h.wrappedHandler);
			delete w._allHandlers[id];
		}
	};

	Handler._counter = 0;

	Handler._uid = function(){return "h"+Handler._counter++};

}
