const fetch = require("node-fetch");
const jsdom = require("jsdom");
const express = require("express");
const path = require("path");
const router = express.Router();
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  const html = await home24(url);
  const result = parseHtml(url, html);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
var headings = [];
const parseHtml = (url, responseText) => {
  const dom = new jsdom.JSDOM(responseText);

  for (i = 1; i <= 6; i++) {
    headings[i - 1] = dom.window.document.querySelectorAll("h" + i).length;
  }
  const title = dom.window.document.querySelector("title").textContent;
  var allLinks = dom.window.document.links.length;
  var internalLinks = dom.window.document.querySelectorAll(
    "a[href^='" +
      url +
      "'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']"
  ).length;
  const externalLinks = (allLinks - internalLinks).toString();

  // Log-In Form

  var logForm = dom.window.document.querySelector('form[name="loginform"]');
  // var logForm = true;
  // for (let i = 0; i < doc.forms.length; i++) {
  //   if (dom.window.document.forms[i].name.toUpperCase().includes("LOGIN")) {
  //     loginForm = true;
  //     break;
  //   }
  // }

  return {
    title,
    externalLinks,
    internalLinks,
    headings,
    logForm,
  };
};

const home24 = async (url) => {
  const result = await fetch(url);
  return result.text();
};
