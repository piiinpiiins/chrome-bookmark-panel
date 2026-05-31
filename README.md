# Bookmark Side Panel Chrome Extension

這個擴充功能會在 Chrome 左側顯示你的書籤面板，並與你目前的 Chrome 書籤同步。

## 功能說明

- 顯示可點擊的書籤樹狀列表
- 實時同步 Chrome 書籤變更
- 支援快速鍵切換書籤面板
- 若 Chrome 版本不支援側欄 API，會自動改為彈出視窗顯示

## 安裝方式

1. 開啟 Chrome，輸入 `chrome://extensions/`
2. 開啟右上角的「開發人員模式」(Developer mode)
3. 點選「載入未封裝擴充功能」(Load unpacked)
4. 選取本專案所在資料夾

## 使用方法

- 點擊 Chrome 工具列上的擴充功能圖示，可立即開啟書籤面板
- 使用快捷鍵：
  - Windows / Linux：`Ctrl+9`
  - macOS：`Command+Shift+9`
- 點擊書籤項目即可在新分頁打開對應網頁
- 若你想修改快捷鍵，可到：
  - `chrome://extensions/shortcuts`

## 注意事項

- macOS 上 `Command+9` 通常是 Chrome 的標籤頁切換快捷鍵，無法由擴充功能攔截，因此本擴充功能預設使用 `Command+Shift+9`
- 若要同步書籤，請確保 Chrome 已登入 Google 帳號並開啟書籤同步
- 若你的 Chrome 版本尚未支援 `side_panel` API，擴充功能會改以小視窗形式顯示書籤面板

## 文件結構

- `manifest.json`：擴充功能設定
- `background.js`：命令監聽與側欄開啟邏輯
- `sidepanel.html`：側欄 UI
- `sidepanel.js`：書籤渲染與同步邏輯
- `styles.css`：介面樣式

## 進階設定

1. 開啟 `chrome://extensions/shortcuts`
2. 找到「Bookmark Side Panel」
3. 將 `toggle-bookmark-panel` 改為你喜歡的快捷鍵

## 開發測試

每次修改後，請在 `chrome://extensions/` 中重新載入擴充功能，並測試書籤面板是否能正常開啟與同步。