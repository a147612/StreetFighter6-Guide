# SF6 情境對策 · SF6 Situations

Street Fighter 6 的情境決策查詢工具 —— 每個情境下有哪些選擇，各自的**風險**、**回報**，以及成功後**能不能延續攻勢**。攻守雙向、三語（繁體中文 / English / 日本語）。

A situational decision reference for Street Fighter 6: for every situation, what your options are, what each one **risks**, what it **pays**, and whether your turn continues. Both sides of the interaction, in three languages.

> [!IMPORTANT]
> **非官方同人攻略。** 與 CAPCOM 無關聯，也未經其授權或背書。
> Street Fighter 6 © CAPCOM。商標與著作權歸原權利人所有。
>
> **Unofficial fan-made guide.** Not affiliated with, authorised by, or endorsed by CAPCOM.

---

## 這個專案在做什麼

大部分攻略告訴你「這招 −4 frame」。這份指南要回答的是**下一步該按什麼**：

- 我在角落倒地，對手站在我身上 —— 解摔、延遲解摔、Parry、速點、後跳、無敵技，哪個值得？
- 每個選擇失敗會扣多少血、掉多少 Drive、位置會變多差？
- 成功之後我拿到什麼 —— 一套連段、保住主導權、還是只是逃掉但把回合讓出去？
- 我用投擲把對手打倒、他在角落、我有 3 格 Drive —— 我能做什麼？（攻方資料通常沒人整理）

## 三個設計決定

**1. 選項寫一次，情境引用它。**
情境是「位置 × 狀態 × 資源」的組合加上一串選項 id，不是選項的副本。「解摔」只存在一份。

**3. 攻守是同一份相剋矩陣的兩個讀法。**
矩陣的一格是（進攻選項 × 防守選項 → 結果）。守方視角讀「列」，攻方視角讀「行」。關係不會寫兩遍，所以兩個視角不可能對不上。
矩陣就是主表格 —— 對手的選項是欄，每一列直接標出對上各個選擇的結果（`++ / + / = / − / −−`）。
欄位只放「真正會打到你的動作」：動力箭步不是欄，因為它只是位移手段，最後落在你身上的仍是
壓起身或摔投。
「這個選項被什麼打敗」是從矩陣**推導**出來的，不另外撰寫，所以兩者不可能不同步。

**4. 每一筆都標記 `estimated` 或 `sourced`。**
定性分級與傷害級距先做，覆蓋所有情境；精確 frame data 與數字之後逐項補上，附來源連結與遊戲版本號。UI 上明確區分兩者 —— **估計值永遠不會被當成事實呈現**。

## 用語

選項名稱採用台灣玩家社群實際在用的說法，而非直譯：**壓起身**（meaty）、**退康**（shimmy）、
**解摔**、**速點／搶招**（abare）、**強制倒地**（hard knockdown）。動力系統沿用遊戲內官方
繁中譯名：**動力撥擋 / 動力衝擊 / 動力反攻 / 動力箭步**。
參考 [PTT 快打板術語表](https://www.ptt.cc/bbs/streetfight/M.1688196913.A.C6E.html)，
並依實際使用習慣校正過（該表的「壓持續」偏重利用招式後段判定的技術面，
描述對手起身壓制時「壓起身」更貼切）。

格鬥遊戲的詞彙多半以英日文借詞流通，所以每個選項同時附上**英文原詞**與**一句白話解釋** ——
對很多人來說「meaty」比任何中譯都更快認出那是什麼。滑過表格欄位標題或展開任一列都看得到。

## 圖片政策

所有圖解都是自製 SVG（位置圖、frame 時間軸、相剋熱圖、指令記號）。**本專案不收錄任何 CAPCOM 官方素材** —— 沒有 logo、沒有角色立繪、沒有遊戲 UI 圖示、沒有從遊戲檔案抽出的圖片。

依據 [Capcom Video Policy](https://www.capcomusa.com/video-policy/)，拆解遊戲內元素單獨散布是明文禁止的，而自製的衍生美術是允許的。自製 SVG 落在允許的那一邊 —— 而且對「角落倒地、對手貼身、我有 3 格 Drive」這種狀態，示意圖本來就比截圖清楚。

資料模型有一個選填的 `screenshots` 欄位，供之後補上**自行拍攝並加註**的教學圖；圖解本身不依賴它。本專案不設付費牆、不掛廣告。

## 開發

```bash
npm install
npm run dev        # http://localhost:5173/StreetFighter6-Guide/
npm run build      # tsc -b && vite build
npm run validate   # 資料引用完整性檢查
```

推到 `main` 會由 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 自動建置並發佈到 GitHub Pages。
部署到根路徑的平台（Cloudflare Pages、Netlify）時用 `BASE_PATH=/ npm run build`。

## 技術

Vite · React · TypeScript，無 UI 框架依賴。內容資料以型別約束 —— 三語任一漏翻、引用不存在的選項 id，都會讓 `tsc` 失敗而不是靜默降級。

主題預設跟隨系統設定（`prefers-color-scheme`），可手動覆寫為淺色 / 深色。

### 目錄

```
src/
├─ data/
│  ├─ schema.ts          資料模型（選項定義 / 情境評價分離、雙向矩陣、查證標記）
│  ├─ options.ts         選項登錄表（攻守共 32 項，只有身分，沒有評價）
│  ├─ situations/        情境內容，一個群組一個檔案
│  └─ index.ts           registry 與 join
├─ i18n/                 介面字串（三語，型別強制完整）
├─ components/glass/     Liquid Glass — CSS 層 + 折射層 React 移植
├─ components/viz/       SVG 圖表元件
└─ styles/               設計 token（深淺色、風險/回報分級）
```

### 內容進度

| 群組 | 分類軸 | 內容 |
|---|---|---|
| A 倒地起身 | 位置 | 場中 / 靠角 / 角落 · 34 筆 |
| B 防禦中被壓 | 位置 | 場中 / 靠角 / 角落 · 26 筆 |
| C 貼身對峙 | 誰有利 | 對手有利 / 五五 · 16 筆 |
| D Burnout | 位置 | 場中 / 角落 · 13 筆 |
| E 立回 | 距離 | 遠距離 / 中距離 · 14 筆 |
| F 對空 | 跳的距離 | 遠跳入 / 近跳入 · 10 筆 |
| G 動力衝擊 | 位置 | 場中 / 牆邊 · 11 筆 |
| H 血量門檻 | 誰快死 | 我剩一套 / 對手剩一套 · 10 筆 |
| I–K 進攻 | — | 待做 |

合計 18 個情境、134 筆評價。**每個群組只用一個分類軸** —— 混合軸是這份指南最早的設計錯誤。

### 查證

第一輪對照外部資料的結果：**21 筆已從 `estimated` 升為 `sourced`**，並修正了數處低估。
主要來源為 [SuperCombo Wiki](https://wiki.supercombo.gg/w/Street_Fighter_6/Defense)、
[Hotspawn 防禦指南](https://www.hotspawn.com/street-fighter/guide/street-fighter-6-how-to-play-defense)、
[Street Fighter Wiki](https://streetfighter.fandom.com/wiki/Drive_Parry) 與
[EventHubs](https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/)。

這些來源都沒有標註遊戲版本，所以 `patch` 欄位記錄的是**查閱日期**而非版本號，並在來源
註記中寫明。這是刻意的：假裝有版本號比誠實說「不知道是哪一版」更糟。

`npm run validate` 會用 esbuild 打包資料層後實際 import 進來檢查引用完整性：
懸空的選項 id、重複 id、標成 `sourced` 卻沒有來源、空白的語言欄位（`tsc` 抓不到這個，
因為空字串仍是合法字串）都會讓 CI 失敗。

## 致謝與授權

Liquid Glass 的 UI 基底來自 [stormaref/LiquidGlassSkill](https://github.com/stormaref/LiquidGlassSkill)（MIT）；其折射場公式源自 [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js)（MIT, © 2025 Armagan Amcalar）。移植版保留原著作權標示於
[`src/components/glass/refraction.ts`](src/components/glass/refraction.ts)。

本專案原始碼採用 MIT 授權（見 [LICENSE](LICENSE)）。攻略內容供個人學習參考使用。
