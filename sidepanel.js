const treeContainer = document.getElementById("tree");
const statusEl = document.getElementById("status");

function setStatus(message) {
  statusEl.textContent = message;
}

function createBookmarkNode(bookmark) {
  const item = document.createElement("div");
  item.className = "bookmark-item";

  const label = document.createElement("span");
  label.textContent = bookmark.title || "未命名書籤";
  label.className = bookmark.url ? "bookmark-link" : "bookmark-folder";

  if (bookmark.url) {
    label.addEventListener("click", () => {
      chrome.tabs.create({ url: bookmark.url });
    });
  }

  item.appendChild(label);

  if (bookmark.children && bookmark.children.length > 0) {
    const childList = document.createElement("div");
    childList.className = "bookmark-children";
    bookmark.children.forEach((child) => {
      childList.appendChild(createBookmarkNode(child));
    });
    item.appendChild(childList);
  }

  return item;
}

async function renderBookmarks() {
  try {
    setStatus("正在載入書籤...");
    const nodes = await chrome.bookmarks.getTree();
    treeContainer.innerHTML = "";

    if (!nodes || nodes.length === 0) {
      setStatus("未找到任何書籤。請確認 Chrome 已登入並啟用書籤同步。");
      return;
    }

    nodes.forEach((node) => {
      treeContainer.appendChild(createBookmarkNode(node));
    });

    setStatus("已同步目前的 Chrome 書籤。按 Ctrl+9 可快速切換此面板。 ");
  } catch (error) {
    console.error(error);
    setStatus("讀取書籤時發生錯誤，請重新整理或檢查權限。");
  }
}

function attachBookmarkListeners() {
  const refresh = () => renderBookmarks();
  chrome.bookmarks.onCreated.addListener(refresh);
  chrome.bookmarks.onRemoved.addListener(refresh);
  chrome.bookmarks.onChanged.addListener(refresh);
  chrome.bookmarks.onMoved.addListener(refresh);
  chrome.bookmarks.onChildrenReordered.addListener(refresh);
}

window.addEventListener("DOMContentLoaded", async () => {
  attachBookmarkListeners();
  await renderBookmarks();
});
