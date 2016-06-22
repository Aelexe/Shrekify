$(document).ready(function() {
	var aspectRatios = [1, 1.3, 1.5, 1.7, 1.9]; // Available aspect ratios of Shrek images.
	var minAspectRatio = 0.9; // Minimum aspect ratio of images to replace.
	var maxAspectRatio = 2; // Maximum aspect ratio of images to replace.
	var imageCount = 10; // Amount of images of each aspect ratio (used to randomise).
	var attempts = 20; // How many times to attempt Shrekification.
	var shrekifyChance = 1; // Chance to Shrekify a single image on the page (out of 100).
	
	// Stop if it's not time to Shrekify.
	if(getRandomNumber(1, 100) > shrekifyChance) {
		return;
	}
	
	// Get all the imgs.
	var imgs = $("img");
	
	// Create a subset of imgs that are loaded or have set dimensions.
	var loadedImgs = [];
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs.eq(i);
		
		if((img.css("width") && img.css("height")) || (img.attr("width") && img.attr("height")) || img.complete) {
			loadedImgs.push(img);
		}
	}
	
	// Stop if we have no imgs.
	if(loadedImgs.length === 0) {
		return;
	}
	
	// Attempt to Shrekify a random img in the subset until we succeed or exceed the attempt limit.
	for(i = 0; i < attempts; i++) {
		if(shrekifyImg(loadedImgs[getRandomNumber(0, loadedImgs.length - 1)])){break;}
	}
	
	/**
	 * Shrekifies an img element, replacing the image with Shrek.
	 * 
	 * The aspect ratio of the img element is calculated and used to select a Shrek of the closest ratio,
	 * giving it a more seamless feel.
	 * 
	 * Returns a boolean indicating success.
	 * 
	 */
	function shrekifyImg(img) {
		// Calculate the aspect ratio of the img element.
		var aspectRatio = img.width() / img.height();
		
		// Check the aspect ratio is within our limit.
		if(aspectRatio >= minAspectRatio && aspectRatio <= maxAspectRatio) {
			var closestMatch = null;
			
			// Do some maths to work out which aspect ratio to use.
			for(var i = 0; i < aspectRatios.length; i++) {
				if(closestMatch === null || Math.abs(aspectRatio - aspectRatios[i]) < Math.abs(aspectRatio - closestMatch)) {
					closestMatch = aspectRatios[i];
				}
			}
			
			// Pick a random file of the matched aspect ratio.
			var fileName = "src/images/" + closestMatch + "/shrek" + (getRandomNumber(1, imageCount)) + ".png";
			
			// Set the img src to it and reset the dimensions (as they may be lost, due to the image changing).
			img.attr("width", img.width() + "px");
			img.attr("height", img.height() + "px");
			img.attr("src", chrome.extension.getURL(fileName));
			return true;
		}
		
		return false;
	}
	
	/**
	 * Returns a random number between min and max inclusive.
	 * One day I'll remember this without Google.
	 */
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
});