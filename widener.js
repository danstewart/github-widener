// This is a bit of a weird way to do things
// but it looks like GitHub only loads the parts of a page that have changed so making one page wide makes them all wide
// So we need to have a list of all pages that should be wide and remove full-width from the others
// The downside is this will make any wide pages not in the list smaller...
function widen() {
	let validPaths  = ['/blob/', '/commit/', '/pull/\dfcd+/files', '/edit/', '/blame'];
	let isValidPath = validPaths.some(p => new RegExp(p).test(window.location.pathname));
	let makeWide    = (isValidPath && document.getElementsByClassName('repository-content'));

	if (makeWide) {
		document.body.classList.add('full-width');
	} else {
		document.body.classList.remove('full-width');
	}
}

// Pretty gross but only thing I can get working
let oldUrl = '';
let currentUrl = window.location.href;
(function watchUrl(currentUrl) {
	if(currentUrl != oldUrl){
		widen();
		oldUrl = currentUrl;
	}

	oldUrl = window.location.href;
	setInterval(function() {
		watchUrl(window.location.href);
	}, 750);
})();
