const VISIBLE_LENGTH = 4;
let currentWindowIndex = 0;
function getWindowName(name) {
    return name ? name : "untitled";
}
function renderImage(imageURL, tabtitle) {
    return imageURL ? `<image src=${imageURL} title="${tabtitle}" alt="${tabtitle}" class="image"></image>` : `<div class="image"></div>`;
}

function renderWindowCard(content, index) {

    //    for images
    const maxVisible = VISIBLE_LENGTH;
    const visibleTabs = content.tabs.slice(0, maxVisible);
    const hiddenCount = content.tabs.length - visibleTabs.length;

    const imagesHTML = visibleTabs.map(tab => renderImage(tab.favIconUrl, tab.title)).join('');

    const moreHTML = hiddenCount > 0
        ? `<div class="more-count">+${hiddenCount}</div>`
        : "";

    return `
    <div class="window-card" data-window-index="${index}">
    <p id="windowName">${getWindowName(content.title)}</p>
                    <div class="window-bottom">
                        <div id="imageContainer">
                               ${imagesHTML}
                               <span class="more-count">${moreHTML}</span>
                        </div>
                        <div id="window-actions">
                            <button id="openWindow"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.783 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75v-4a.75.75 0 0 1 1.5 0v4A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h4a.75.75 0 0 1 0 1.5h-4ZM13 3.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0V5.56l-5.22 5.22a.75.75 0 0 1-1.06-1.06l5.22-5.22h-4.69a.75.75 0 0 1-.75-.75Z" />
                                </svg></button>
                            <button id="saveWindow"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="1.5"
                                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z" />
                                    <path fill="currentColor"
                                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"
                                        opacity=".5" />
                                </svg></button>
                            <button id="closeWindow"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M20 2H8c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h12c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2m0 14H8V4h12v12M4 6v14h14v2H4a2 2 0 0 1-2-2V6h2m5.77 6.84L12.6 10L9.77 7.15l1.4-1.4L14 8.6l2.84-2.83l1.4 1.4L15.4 10l2.83 2.84l-1.4 1.4L14 11.4l-2.83 2.84l-1.4-1.4Z" />
                                </svg></button>
                        </div>

                    </div>
                    </div>
`
}

function renderTabCard(content) {
    let bgClass = "";
    if (content.active) {
        bgClass = "active-tab";
    } else if (content.sleeping) {
        bgClass = "sleeping-tab";
    } else if (content.frozen) {
        bgClass = "frozen-tab";
    } else {
        bgClass = "";
    }
    return `
        <div id="tab" class="${bgClass}">
                    <image src=${content.favIconUrl} width="28" height="28" title="${content.title}" alt="${content.title}" class="image"></image>
                    <div id="siteTitle">
                        <span>${content.title}</span>
                    </div>
                    <div id="actions">
                        <button id="openTab">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.783 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75v-4a.75.75 0 0 1 1.5 0v4A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h4a.75.75 0 0 1 0 1.5h-4ZM13 3.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0V5.56l-5.22 5.22a.75.75 0 0 1-1.06-1.06l5.22-5.22h-4.69a.75.75 0 0 1-.75-.75Z" />
                            </svg>
                        </button>
                        <button id="closeTab">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V5h14v14M17 8.4L13.4 12l3.6 3.6l-1.4 1.4l-3.6-3.6L8.4 17L7 15.6l3.6-3.6L7 8.4L8.4 7l3.6 3.6L15.6 7L17 8.4Z" />
                            </svg>
                        </button>
                        <button id="saveTab"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"
                                viewBox="0 0 24 24">
                                <path fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="1.5"
                                    d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z" />
                                <path fill="currentColor"
                                    d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"
                                    opacity=".5" />
                            </svg></button>
                    </div>
                </div>
    `
}



function errorFallBack(errorMessage) {
    console.log("[data]error")
    return `
    <div class="errorMessage">
        <p>${errorMessage}</p>
    </div>`
}

function renderWindowUI(content) {
    console.log("[data]render window UI")
    windowCardContainer.innerHTML = ""; // clear before rendering
    content.forEach((window, index) => {
        windowCardContainer.innerHTML += renderWindowCard(window, index);
    });


}


function renderTabsUI(windowIndex) {
    const window = windowsData[windowIndex];
    const tabContainer = document.querySelector(".tabs-content");
    tabContainer.innerHTML = "";

    if (!window || !window.tabs) {
        tabContainer.innerHTML = errorFallBack("No tabs in this window.");
        return;
    }

    window.tabs.forEach(tab => {
        tabContainer.innerHTML += renderTabCard(tab);
    });
}





let windowsData = []
const windowCardContainer = document.querySelector(".window-content");
const openWindow = document.querySelector("#openWindow");
const closeWindow = document.querySelector("#closeWindow");
const saveWindow = document.querySelector("#saveWindow");

window.addEventListener("DOMContentLoaded", async () => {
    const result = await chrome.storage.local.get("windowsData");
    windowsData = result.windowsData || [];
    console.log("Windows data loaded:", windowsData);
    if (windowsData.length > 0) {
        console.log("[data]rendering")
        renderWindowUI(windowsData);


    } else {
        console.log("[no data]not rendering")
        windowCardContainer.innerHTML = "";
        windowCardContainer.innerHTML = errorFallBack("No window data available.");
    }

    renderTabsUI(0);

    document.querySelectorAll(".window-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const index = parseInt(card.getAttribute("data-window-index"), 10);
            currentWindowIndex = index;

            // remove selection from all
            document.querySelectorAll(".window-card").forEach(c => c.classList.remove("selected"));

            // highlight the clicked one
            card.classList.add("selected");

            // render its tabs
            renderTabsUI(index);
        });
    });

    // Display or process data
});
// if there is data
