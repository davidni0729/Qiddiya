# Qiddiya 奇地亞｜官方活動網站

TianYen 發起的未來光影音樂派對宣傳與預先登記網站。MClub 為首場合作場域。

## 官網

[https://davidni0729.github.io/Qiddiya/](https://davidni0729.github.io/Qiddiya/)

英文版：
[https://davidni0729.github.io/Qiddiya/en/](https://davidni0729.github.io/Qiddiya/en/)

網站提供繁體中文與英文兩種語言，採用與 Freedom Party 相同的公開架構：Next.js 靜態輸出、GitHub Pages 自動發布、Google Form 預先登記。表單回覆保存在私人 Google Sheet，管理網址不放入公開網站或程式庫。

預先登記表：
[Qiddiya 奇地亞｜未來光影音樂派對預先登記](https://docs.google.com/forms/d/e/1FAIpQLSdKQR89NVsvXuGEm92o3EUt3AQCkdUJD_PRTrR18UxanCAkmg/viewform)

## Google Form 備援建立範本

目前正式表單已完成發布；以下流程僅供日後建立備援表單使用。

1. 開啟預定作為管理底表的 Google Sheet，選擇「擴充功能」→「Apps Script」。
2. 將 `google-apps-script/createQiddiyaRegistrationForm.gs` 的內容貼入編輯器。
3. 執行 `createQiddiyaRegistrationForm` 並完成 Google 授權。
4. 回到試算表的「Google Form 設定」分頁，取得公開填寫網址與編輯網址。
5. 將公開填寫網址更新至 `lib/registration.ts`。

腳本會自動建立完整表單、18 項聯絡與參與欄位、個資同意、VVIP 與品牌合作需求，並把回覆連結至管理底表。

## 本機開發

```bash
npm install
npm run dev
```

## 檢查

```bash
npm run lint
npm test
```

推送至 `main` 後，GitHub Actions 會自動建置並發布網站。
