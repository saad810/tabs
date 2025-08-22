const EXT_FILE = "tabs.html"

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function isTabOpened(currentTab) {
    return currentTab?.includes(EXT_FILE);
}


chrome.action.onClicked.addListener(async () => {
    // get current window
    
    const windows = await chrome.windows.getAll({ populate: true });
    const first10Windows = windows.slice(0, 10);
    
    // Store in storage for the page to read
    await chrome.storage.local.set({ windowsData: first10Windows });
    
      // get active window id
    const currWindow = await chrome.windows.getCurrent(
        { populate: true } // Ensure we get the populated window with tabs
    );
    const currWindowEXT_TAB = currWindow.tabs.find(tab => isTabOpened(tab.url));

    if (currWindowEXT_TAB) {
        // If the extension tab is found in the current window, activate it
        chrome.tabs.update(currWindowEXT_TAB.id, { active: true });
    }

    const { id: currtabID, url } = await getCurrentTab();
    const extensionTab = isTabOpened(url);


    if (!extensionTab) {
        await chrome.tabs.create({
            url: chrome.runtime.getURL("src/tabs.html") // Correct path
        });
    } else {
        chrome.tabs.update(currtabID, { active: true });
    }

});
