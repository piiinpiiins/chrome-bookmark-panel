chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-bookmark-panel") {
        if (chrome.sidePanel && chrome.sidePanel.open) {
            chrome.sidePanel.open();
        } else {
            chrome.windows.create({
                url: chrome.runtime.getURL("sidepanel.html"),
                type: "popup",
                width: 360,
                height: 720
            });
        }
    }
});
