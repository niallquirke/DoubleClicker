var namesToValues = [];
namesToValues["background"] = 0;
namesToValues["foreground"] = 1;

document.addEventListener('DOMContentLoaded', function () {
	if(namesToValues[localStorage["right_click"]] != (0 | 1)){
		namesToValues[localStorage["right_click"]] = 0;
	}
	restore_options(); enableEvents();
});

function restore_options() {
	document.getElementById("right_click")[namesToValues[localStorage["right_click"]]].selected = true;	
}
 
function right_click_changed() {
	localStorage["right_click"] = document.getElementById("right_click").value;
	var foreorback = document.getElementById("right_click").value;
	chrome.storage.local.set({'foreorback': foreorback});
}

function enableEvents() {
	document.getElementById('right_click').onchange = function(){right_click_changed();};
	document.getElementById('closeButon').onclick = function(){window.opener='x';window.close();};
}