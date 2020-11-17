// Listen for page title change and notify widener.js
browser.history.onTitleChanged.addListener(() => {
	browser.tabs.query({ currentWindow: true, active: true }).then(
		(tabs) => browser.tabs.sendMessage(tabs[0].id, 'Changed')
	);
});

// Button handler
browser.browserAction.onClicked.addListener(() => {
	browser.tabs.query({ currentWindow: true, active: true }).then(
		(tabs) => browser.tabs.sendMessage(tabs[0].id, 'Clicked')
	);
});
