//Following was adapted from https://github.com/tetsuwo/website-blocker-chrome.ext
chrome.tabs.onCreated.addListener(function(tab) {
    if (determineIsBlocked(tab.url)) {
        blockPage(tab.id, tab.url);
    }
});

chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
        if (determineIsBlocked(tab.url)) {
            blockPage(tab.id, tab.url);
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "loading") {
        if (determineIsBlocked(tab.url)) {
            blockPage(tab.id, tab.url);
        }
        return;
    }
});