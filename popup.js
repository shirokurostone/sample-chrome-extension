
const copyToClipboard = (convert) => {
    chrome.tabs.getSelected((tab) => {
        const str = convert(tab)
        navigator.clipboard.writeText(str);
        chrome.notifications.create({"type": "basic", "title": "copy", "message": str, "iconUrl": "identicon.png"}, (id) => {
          setTimeout(()=>{chrome.notifications.clear(id)}, 2000)
        });
    });
};

document.querySelector("#title").addEventListener("click", () => {
    copyToClipboard(tab => tab.title);
});
document.querySelector("#url").addEventListener("click", () => {
    copyToClipboard(tab => tab.url);
});
document.querySelector("#title-url").addEventListener("click", () => {
    copyToClipboard(tab => tab.title + "\n" + tab.url);
});
document.querySelector("#markdown").addEventListener("click", () => {
    copyToClipboard(tab => "[" + tab.title + "](" + tab.url + ")");
});

