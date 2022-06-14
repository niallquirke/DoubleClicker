setTimeout(() => {
	var tid = null, _last = null;
	var foreorback;
	var fore = false;
	chrome.storage.local.get('foreorback', function (result){
		foreorback = result.foreorback;
		if(foreorback == "foreground"){
			fore = true;
		}
		$("foreorback").val(foreorback);
	});
	function isHtmlLink(aNode){
		return ((aNode instanceof HTMLAnchorElement && aNode.href) || (aNode instanceof HTMLAreaElement && aNode.href) || aNode instanceof HTMLLinkElement);
	};

	function onClick(e){
		if (!e.isTrusted || e.button != 0  || e.shiftKey || e.altKey || e.metaKey){
			return;
		}
		if (e.detail == 1) {
			for (var node = e.target; node && !isHtmlLink(node); node = node.parentNode);
			console.log("isLinkNode: " + !!node);
			if (node && node.getAttribute("href") != "#") {
				_last = e.target;
				var evt = new MouseEvent(e.type,e);
				e.preventDefault();
				e.stopPropagation();           
				tid = setTimeout(() => e.target.dispatchEvent(evt), 300);
			}
		}
		if (e.detail == 2 && _last == e.target) {
			e.preventDefault();
			e.stopPropagation();
			clearTimeout(tid);

			var evt = new MouseEvent("click", Object.defineProperties(e, {detail:{value:1}, ctrlKey:{value:true}, shiftKey:{value:fore}}));
			evt.stopPropagation();
			e.target.dispatchEvent(evt);
		}
	};
	addEventListener("click", onClick, true);
}, location.href != "about:srcdoc" ? 0 : 2000);