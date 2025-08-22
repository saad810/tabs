window.addEventListener("DOMContentLoaded", async () => {
    const result = await chrome.storage.local.get("windowsData");
    const windowsData = result.windowsData || [];
    console.log("Windows data loaded:", windowsData);

    // Display or process data
});


const root = document.getElementById("root");
