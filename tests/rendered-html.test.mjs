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
});

test("預先登記頁外連 Google Form 並清楚說明資料用途", async () => {
  const html = await readOutput("register/index.html");

  assert.match(html, new RegExp(formUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /預先登記不等同門票/);
  assert.match(html, /資料不公開/);
  assert.doesNotMatch(html, /docs\.google\.com\/spreadsheets/);
  assert.doesNotMatch(html, /\/api\/register/);
});

test("公開專案文件不暴露私人試算表網址", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

  assert.doesNotMatch(readme, /docs\.google\.com\/spreadsheets/);
  assert.match(readme, /GitHub Pages/);
  assert.match(readme, /Google Form/);
});
