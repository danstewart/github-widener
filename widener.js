// This is a bit of a weird way to do things
// but it looks like GitHub only loads the parts of a page that have changed so making one page wide makes them all wide
// So we need to have a list of all pages that should be wide and remove full-width from the others
// The downside is this will make any wide pages not in the list smaller...
function widen() {
	let validPaths  = ['/blob/', '/commit/', '/pull/\\d+/files', '/edit/', '/blame'];
	let isValidPath = validPaths.some(p => new RegExp(p).test(window.location.pathname));
	let makeWide    = (isValidPath && document.getElementsByClassName('repository-content'));

	if (makeWide) {
		document.body.classList.add('full-width');
	} else {
		document.body.classList.remove('full-width');
	}
}

// Listen for messages from background.js
// Need to watch for title changes since GitHub doesn't actually load new pages
browser.runtime.onMessage.addListener(() => widen());

// Run for initial page load
widen();
