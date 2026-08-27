# Qiddiya 奇地亞官方網站

TianYen 發起的未來光影音樂派對宣傳與預先登記網站。MClub 為首場贊助場域。

## Google Form 建立與串接

已建立 Google Sheet 管理底表：

https://docs.google.com/spreadsheets/d/1SZSfYNI8TYT_UnuZmPtX3AY6pphaiVeHcBY60mW87z4/edit

Google 安全機制要求試算表擁有者本人完成一次授權：

1. 開啟管理底表，選擇「擴充功能」→「Apps Script」。
2. 將 `google-apps-script/createQiddiyaRegistrationForm.gs` 的內容貼入編輯器。
3. 執行 `createQiddiyaRegistrationForm` 並完成 Google 授權。
4. 回到試算表的「Google Form 設定」分頁，取得公開填寫網址與編輯網址。
5. 將公開填寫網址設定為官網的 Google Form 報名入口。

腳本會自動建立完整表單、18 項聯絡與參與欄位、個資同意、VVIP 與品牌合作需求，並把回覆連結至管理底表。

## 本機開發

```bash
npm install
npm run dev
```

## 檢查

```bash
npm run lint
npm run build
```
