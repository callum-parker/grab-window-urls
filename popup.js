f_get_all_window_urls = function() {
	chrome.tabs.query({currentWindow:true}, function(tabs) {
		// get the input
		d = document;
		var output_urls_textarea = d.getElementById('output_url_textarea');
		
		// write it out
		for (var i = 0; i < tabs.length; i++) {
			output_urls_textarea.value += tabs[i]["url"] + "\n";
		};
	});
};

f_load_all_window_urls = function() {
	// create a window
	chrome.windows.create({}, function (window) {
		// get the input
		d = document;
		var input_urls_textarea = d.getElementById('input_url_textarea');
		var urls = input_urls_textarea.value.split("\n");
		
		// create the tabs in it
		// for some reason if we dont stop before the end element
		// this loop will load a the extensions url as a tab
		for (var i = 0; i < urls.length -1; i++) {
			chrome.tabs.create({windowId:window.id, url:urls[i]});
		};
	});
};

// connect the buttons to their handler functions
document.addEventListener('DOMContentLoaded', function() {
	// get all window urls button
	var get_urls_button = document.getElementById('get_all_window_urls');
	get_urls_button.addEventListener('click', f_get_all_window_urls, false);
	
	// load all window urls button
	var load_urls_button = document.getElementById('load_all_window_urls');
	load_urls_button.addEventListener('click', f_load_all_window_urls, false);
	
}, false);