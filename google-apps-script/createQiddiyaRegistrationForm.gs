function createQiddiyaRegistrationForm() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const properties = PropertiesService.getScriptProperties();
  const existingFormId = properties.getProperty("QIDDIYA_FORM_ID");

  if (existingFormId) {
    try {
      const existingForm = FormApp.openById(existingFormId);
      writeFormLinks_(existingForm);
      return existingForm.getPublishedUrl();
    } catch (error) {
      properties.deleteProperty("QIDDIYA_FORM_ID");
    }
  }

  const form = FormApp.create("Qiddiya 奇地亞｜未來光影音樂派對預先登記");
  form
    .setDescription(
      "城市，進入下一個頻率。\n\n" +
      "Qiddiya 奇地亞由 TianYen 發起，MClub 為首場贊助場域。" +
      "本表單為活動優先通知與參與需求登記，不代表門票、訂位或保證入場。" +
      "正式日期、場域、票務與參與方式將另行公告。"
    )
    .setConfirmationMessage(
      "訊號已成功接收。活動日期、票務與正式參與辦法確認後，將透過你登記的 Email 通知。預先登記不等同門票或保證入場。"
    )
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true)
    .setPublishingSummary(false)
    .setShowLinkToRespondAgain(false);

  form.addSectionHeaderItem()
    .setTitle("01｜基本聯絡資訊")
    .setHelpText("請留下可正常接收活動通知的聯絡方式。");

  form.addTextItem()
    .setTitle("姓名")
    .setHelpText("請填寫真實姓名，供活動通知與名單核對。")
    .setRequired(true);

  const emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText("請輸入有效的 Email 格式。")
    .build();
  form.addTextItem()
    .setTitle("Email")
    .setHelpText("活動日期、票務與入場辦法將寄送至此信箱。")
    .setValidation(emailValidation)
    .setRequired(true);

  const phoneValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern("^[0-9+()\\-\\s]{8,20}$")
    .setHelpText("請輸入可聯繫的手機號碼。")
    .build();
  form.addTextItem()
    .setTitle("手機號碼")
    .setHelpText("僅用於必要的活動聯繫，不公開顯示。")
    .setValidation(phoneValidation)
    .setRequired(true);

  form.addTextItem().setTitle("LINE ID").setHelpText("選填；方便活動前的重要通知。");
  form.addTextItem().setTitle("Instagram 帳號").setHelpText("選填，可不加 @。");
  form.addTextItem().setTitle("所在城市").setHelpText("例如：台北、新北、台中。").setRequired(true);

  form.addPageBreakItem()
    .setTitle("02｜參與需求")
    .setHelpText("讓我們更理解你期待的 Qiddiya 體驗。");

  form.addMultipleChoiceItem()
    .setTitle("預計同行人數（含本人）")
    .setChoiceValues(["1 人", "2 人", "3 人", "4 人", "5 人以上"])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("你最感興趣的 Qiddiya 體驗是？")
    .setHelpText("可複選。")
    .setChoiceValues(["巨型光雕", "電子音樂", "沉浸影像", "裝置藝術", "永續未來城市", "VVIP 限定體驗"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("是否希望收到 VVIP／優先入場資訊？")
    .setHelpText("VVIP 最終資格與辦法將另行通知。")
    .setChoiceValues(["有興趣", "無", "待確認"])
    .setRequired(true);

  form.addPageBreakItem()
    .setTitle("03｜合作與來源")
    .setHelpText("品牌、贊助、包場或內容合作需求可於此登記。");

  form.addMultipleChoiceItem()
    .setTitle("是否有品牌合作、贊助或包場需求？")
    .setChoiceValues(["有", "無", "待確認"])
    .setRequired(true);
  form.addTextItem().setTitle("公司／品牌名稱").setHelpText("有合作需求者填寫。");
  form.addTextItem().setTitle("職稱／負責領域").setHelpText("例如：品牌行銷、異業合作、公關。");

  form.addMultipleChoiceItem()
    .setTitle("你從哪裡得知 Qiddiya？")
    .setChoiceValues(["Instagram", "Facebook", "朋友推薦", "DJ／KOL", "MClub", "合作品牌", "媒體報導", "私人邀請", "其他"])
    .setRequired(true);
  form.addTextItem().setTitle("邀請碼").setHelpText("收到私人邀請者填寫。");
  form.addParagraphTextItem().setTitle("想告訴我們的需求或期待").setHelpText("可填寫無障礙需求、合作想法或其他問題。");

  form.addPageBreakItem()
    .setTitle("04｜資格與個資同意")
    .setHelpText("完成以下確認後即可送出預先登記。");

  form.addCheckboxItem()
    .setTitle("年齡資格確認")
    .setChoiceValues(["我已年滿 18 歲"])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("個人資料蒐集與使用同意")
    .setHelpText(
      "我同意 TianYen 為 Qiddiya 奇地亞活動通知、名單管理與參與偏好分析蒐集及使用本表單資料。" +
      "資料不會出售予第三方，並僅於完成活動聯繫所需期間保存。"
    )
    .setChoiceValues(["我已閱讀並同意上述個人資料蒐集與使用說明"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("是否願意接收 TianYen 後續光影、音樂與文化活動資訊？")
    .setHelpText("未選擇不影響本次預先登記。")
    .setChoiceValues(["是", "否"]);

  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  form.setAcceptingResponses(true);

  properties.setProperty("QIDDIYA_FORM_ID", form.getId());
  writeFormLinks_(form);
  return form.getPublishedUrl();
}

function writeFormLinks_(form) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "Google Form 設定";
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName, 0);

  sheet.clear();
  sheet.getRange("A1:B1").merge().setValue("QIDDIYA 奇地亞｜Google Form 串接資訊");
  sheet.getRange("A2:B2").merge().setValue("表單建立完成後，將公開填寫網址提供給官網串接。");
  sheet.getRange("A4:B7").setValues([
    ["表單名稱", form.getTitle()],
    ["公開填寫網址", form.getPublishedUrl()],
    ["表單編輯網址", form.getEditUrl()],
    ["表單 ID", form.getId()],
  ]);
  sheet.getRange("A1:B1").setBackground("#061B52").setFontColor("#FFFFFF").setFontWeight("bold").setFontSize(16);
  sheet.getRange("A2:B2").setBackground("#075BFF").setFontColor("#FFFFFF");
  sheet.getRange("A4:A7").setBackground("#D9FF43").setFontWeight("bold");
  sheet.getRange("A4:B7").setWrap(true).setVerticalAlignment("middle");
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 620);
  sheet.setFrozenRows(2);
}
