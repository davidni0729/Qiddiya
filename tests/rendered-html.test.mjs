import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdKQR89NVsvXuGEm92o3EUt3AQCkdUJD_PRTrR18UxanCAkmg/viewform";

async function readOutput(path) {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

test("首頁保留 Qiddiya 品牌與 GitHub Pages 資產路徑", async () => {
  const html = await readOutput("index.html");

  assert.match(html, /QIDDIYA/);
  assert.match(html, /城市，進入下一個頻率。/);
  assert.match(html, /TIANYEN PRESENTS/);
  assert.match(html, /MCLUB/);
  assert.match(html, /\/Qiddiya\/images\/qiddiya-hero\.jpg/);
  assert.doesNotMatch(html, /SOULO/i);
  assert.doesNotMatch(html, /ULTRA/i);
  assert.match(html, /\/Qiddiya\/en\//);
});

test("英文首頁提供完整英文內容與中文切換", async () => {
  const html = await readOutput("en/index.html");

  assert.match(html, /The city enters a new frequency\./);
  assert.match(html, /This is not just a party\./);
  assert.match(html, /FIRST VENUE PARTNER/);
  assert.match(html, /\/Qiddiya\//);
  assert.doesNotMatch(html, /FIRST VENUE SPONSOR/);
});

test("預先登記頁外連 Google Form 並清楚說明資料用途", async () => {
  const html = await readOutput("register/index.html");

  assert.match(html, new RegExp(formUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /預先登記不等同門票/);
  assert.match(html, /資料不公開/);
  assert.doesNotMatch(html, /docs\.google\.com\/spreadsheets/);
  assert.doesNotMatch(html, /\/api\/register/);
});

test("英文預先登記頁保留私密回覆說明與表單連結", async () => {
  const html = await readOutput("en/register/index.html");

  assert.match(html, /Pre-registration is not a ticket/);
  assert.match(html, /Responses stay private/);
  assert.match(html, new RegExp(formUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, /docs\.google\.com\/spreadsheets/);
});

test("中英文法律頁均已輸出", async () => {
  const privacy = await readOutput("en/privacy/index.html");
  const terms = await readOutput("en/terms/index.html");

  assert.match(privacy, /Privacy Statement/);
  assert.match(terms, /Terms of Use/);
  assert.match(privacy, /\/Qiddiya\/privacy\//);
  assert.match(terms, /\/Qiddiya\/terms\//);
});

test("公開專案文件不暴露私人試算表網址", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

  assert.doesNotMatch(readme, /docs\.google\.com\/spreadsheets/);
  assert.match(readme, /GitHub Pages/);
  assert.match(readme, /Google Form/);
});
