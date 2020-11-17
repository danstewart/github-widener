let isExpanded = false;

const expand = () => {
	isExpanded = true;
	document.body.classList.add('full-width');
}

const shrink = () => {
	isExpanded = false;
	document.body.classList.remove('full-width');
}

const toggle = () => {
	if (isExpanded)
		shrink();
	else
		expand();
}

// This is a bit of a weird way to do things
// but it looks like GitHub only loads the parts of a page that have changed so making one page wide makes them all wide
// So we need to have a list of all pages that should be wide and remove full-width from the others
// The downside is this will make any wide pages not in the list smaller...
function autoWiden() {
	// If we're on gist and we're on a non code page
	// ie. Not in the list of invalidPaths and the path has at least 2 items in it
	const validGist = () => {
		if (window.location.hostname !== 'gist.github.com') return false;

		let invalidPaths = ['discover', 'forked', 'starred', 'stargazers', 'forks'];
		let pathParts    = window.location.pathname.split('/');
		let pathEnd      = pathParts.slice(-1)[0];

		return pathParts.length > 2 && invalidPaths.every(p => pathEnd != p);
	};

	// If we're on GitHub in one of the code paths
	const validGithub = () => {
		let validPaths = ['/blob/', '/commit/', '/pull/\\d+/files', '/edit/', '/blame', '/projects'];
		let isValid    = validPaths.some(p => new RegExp(p).test(window.location.pathname));

		return isValid && document.getElementsByClassName('repository-content');
	};

	let makeWide = validGist() || validGithub();
	makeWide ? expand() : shrink();
}

// Listen for messages from background.js
// Need to watch for title changes since GitHub doesn't actually load new pages
browser.runtime.onMessage.addListener(action => {
	if (action === 'Changed')
		autoWiden();
	else if (action === 'Clicked')
		toggle();
	else
		console.error(`Unknown action: ${action}`);
});

// Run for initial page load
autoWiden();
