chrome.action.onClicked.addListener(async () => {
    // Get first 10 windows
    const windows = await chrome.windows.getAll({ populate: true });
    const first10Windows = windows.slice(0, 10);

    // Store in storage for the page to read
    await chrome.storage.local.set({ windowsData: first10Windows });

    // Open the extension page
    await chrome.tabs.create({
        url: chrome.runtime.getURL("src/tabs.html") // Correct path
    });
});
