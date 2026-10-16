# 呈盛大板 3D 石材設計模擬器｜GitHub Pages PWA 安裝修正版 2.13

## 重要：不能從 ZIP 或手機檔案管理器直接安裝

此專案是 PWA 網頁應用程式，不是已編譯的 APK／IPA。請先上傳到 GitHub 並啟用 GitHub Pages，使用 HTTPS 網址開啟；直接點開 ZIP 內的 HTML 或 `file://` 本機檔案，只會進入瀏覽器，不能完成 PWA 安裝。

## 上傳到 GitHub Pages

1. 解壓縮本 ZIP。
2. 把解壓縮後的**全部內容**直接上傳到 Repository 根目錄（不要再套一層資料夾）。
3. Repository → Settings → Pages → Source 選 `Deploy from a branch`；Branch 選 `main`，目錄選 `/(root)`，按 Save。
4. 等 Pages 部署完成，使用 `https://<帳號>.github.io/<repo>/` 開啟。不要使用 `github.com/.../blob/...` 或 `raw.githubusercontent.com` 網址。

根目錄包含：`index.html`、`pc.html`、`manifest.webmanifest`、`sw.js`、`icons/`、`.nojekyll`。

## Android（建議 Samsung 手機使用 Chrome）

1. 用 Chrome 開啟 GitHub Pages 的 HTTPS 首頁。
2. 等頁面載入，再按網頁中的「安裝 APP／安裝教學」提示，或 Chrome 右上角 `⋮` → `安裝應用程式`。
3. 確認安裝後，回到手機主畫面／應用程式清單，點選「呈盛大板3D」圖示開啟。
4. 如果只有「加到主畫面」，新圖示可能只是網頁捷徑；請刪除舊捷徑，再從 Chrome 的「安裝應用程式」流程安裝。

## iPhone／iPad

1. 用 Safari 開啟 GitHub Pages 的 HTTPS 首頁。
2. 點「分享」→「加入主畫面」。若出現「以網頁 App 開啟」選項，請保持開啟。
3. 點「加入」，再回到主畫面點呈盛圖示開啟。不要直接從 Safari 書籤開啟，否則會保留瀏覽器網址列。

## 如何確認是否已獨立開啟

- 已安裝且從主畫面圖示開啟：應使用獨立視窗，通常看不到瀏覽器網址列。
- 還在 Safari／Chrome 分頁內：manifest 的 `display: standalone` 不會自動隱藏瀏覽器介面；必須完成安裝，再從 APP 圖示啟動。
- 網站更新後若沒有變化：刪除舊捷徑／舊 PWA，重新開啟 Pages 網址並安裝；Service Worker 快取更新可能需要幾次重新整理。

## 檔案說明

- `index.html`: 手機響應式入口與 PWA 安裝提示
- `pc.html`: 電腦寬版頁面
- `manifest.webmanifest`: `display: standalone`，啟動網址採用相對路徑，兼容 GitHub project pages
- `sw.js`: Service Worker 與快取（快取版本已更新）
- `icons/`: 呈盛提供圖示
- `.nojekyll`: GitHub Pages 靜態檔案設定

## 限制

這是 PWA，不是已編譯的原生 APK／iOS IPA。PWA 的第一次安裝需要瀏覽器協助，但完成安裝後應從主畫面圖示以獨立 APP 視窗開啟。Three.js 等外部引擎第一次仍可能需要網路；離線能力與 3D 功能需在實機驗收。資料仍以本機儲存為主，跨裝置自動同步尚未接通。
