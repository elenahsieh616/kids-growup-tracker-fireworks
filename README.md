# 🌟 寶貝成長紀錄 · Fireworks Edition

> 以煙火夜空為主題的兒童成長追蹤 Web App，記錄身高體重、對照 WHO 標準、追蹤保健品效果，一鍵產出完整成長報告。

**Live Demo：** https://elenahsieh616.github.io/kids-growup-tracker-fireworks/

![CI](https://github.com/elenahsieh616/kids-growup-tracker-fireworks/actions/workflows/ci.yml/badge.svg)

---

## 功能特色

| 功能 | 說明 |
|------|------|
| **成長曲線** | 對照 WHO P3–P97 百分位，即時顯示孩子在同齡中的位置（0–10 歲） |
| **成長速率分析** | 年化成長速率、與最低標準比較、遺傳身高預測 |
| **保健品追蹤** | 記錄補充品開始日期，自動比較服用前後的成長速率 |
| **成長報告** | 含圖表、數據、醫療建議，可列印 / 存為圖片 / 分享 LINE |
| **家庭共享** | 以 email 邀請家人共同查看並新增紀錄 |
| **批次匯入** | 一次填入多筆歷史量測資料 |
| **備份還原** | JSON 格式匯出 / 匯入，資料不怕遺失 |
| **PWA 安裝** | 可加入手機主畫面，iOS / Android 均支援，支援離線瀏覽 |
| **雙語介面** | 繁體中文 / English 即時切換，日期選單隨語言更新 |
| **資料驗證** | 自動偵測未來日期、出生前日期、身高體重異常跳動 |
| **帳號刪除** | 一鍵永久刪除帳號及所有相關資料 |

---

## 技術棧

| 層次 | 技術 |
|------|------|
| 前端 | Vanilla HTML / CSS / JavaScript（無框架，模組化分檔） |
| 後端 | [Supabase](https://supabase.com)（PostgreSQL + RLS + Storage） |
| 認證 | Google OAuth 2.0（via Supabase Auth） |
| 圖表 | Chart.js v4.4.0 + chartjs-plugin-annotation |
| 報告截圖 | html2canvas v1.4.1（懶加載） |
| PWA | manifest.json + Service Worker（cache-first，離線可用） |
| 部署 | GitHub Pages |
| CI/CD | GitHub Actions（ESLint 自動 lint，push / PR 觸發） |

---

## 專案結構

```
index.html              # App 主頁面（HTML 結構）
style.css               # 全域樣式
app.js                  # 全部前端邏輯（含自訂日期選單、Modal 無障礙）
i18n.js                 # 多語系字串（繁中 / English）
db.js                   # Supabase 資料庫存取層
report.js               # 成長報告產生（html2canvas）
manifest.json           # PWA Manifest
sw.js                   # Service Worker（cache-first，v3）
tests.html              # 核心演算法單元測試頁
.eslintrc.json          # ESLint 設定（browser + es2020）
package.json            # npm scripts（lint）
.github/
  workflows/
    ci.yml              # GitHub Actions CI（自動 lint）
data/
  who.js                # WHO 生長標準資料（0–120 個月，男女各組）
images/
  icon-512.png          # App 圖示（PWA + iOS 主畫面）
  desktop-bg.png        # 桌機背景
  mobile-bg.png         # 手機背景
  header-bg.jpg         # App 標題區背景
  content-bg.jpg        # 報告內容背景
GrowTracker_PRD.md      # 產品需求文件（Markdown）
Code.gs                 # Google Apps Script（輔助工具）
```

---

## 本地開發

不需要 build 步驟，直接用瀏覽器開啟即可：

```bash
# 使用任意靜態伺服器，例如：
npx serve .
# 或
python -m http.server 8080
```

> **注意：** Google OAuth redirect URI 設定為 GitHub Pages 網址，本地測試時登入會失敗。如需本地測試登入，請在 Supabase Dashboard → Authentication → URL Configuration 加入 `http://localhost:8080`。

---

## Lint

```bash
npm install
npm run lint
```

---

## Supabase 設定

資料庫共 4 張資料表：

| 資料表 | 說明 |
|--------|------|
| `children` | 孩子基本資料（姓名、生日、性別、父母身高、表情符號、顏色主題） |
| `measurements` | 身高體重量測紀錄（含備註、資料來源） |
| `supplements` | 保健品 / 配方奶紀錄（含類型、品名、備註） |
| `child_shares` | 家庭共享邀請（owner → invitee email） |

所有資料表均啟用 **Row Level Security（RLS）**，用戶只能存取自己的資料。

孩子照片儲存於 `child-photos` 私有 Bucket，以 Signed URL 存取（1 小時有效期）。

---

## 無障礙（Accessibility）

- 所有 Modal 有 **ARIA role、focus trap 及 ESC 關閉**
- 折疊區塊（collapse header）支援 **鍵盤 Enter / Space 觸發**
- 日期選單改用三欄式 `<select>`（年 / 月 / 日），不依賴系統原生 date picker，跨平台顯示一致
- Toast 通知含關閉按鈕，含 `aria-label`

---

## 支援語言

- 繁體中文（預設）
- English

語言偏好存於 `localStorage`，切換後全站即時更新，包含日期選單月份名稱。

---

## 資料來源

生長曲線參考數據來自 **WHO Child Growth Standards**（0–120 個月 / 0–10 歲，男女各組，P3 / P10 / P50 / P90 / P97）。

> 本 App 產出之報告僅供參考，不作為醫療診斷依據。如有任何成長疑慮，建議諮詢兒科醫師進行專業評估。
