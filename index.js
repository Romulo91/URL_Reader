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

  var logForm = "no";
  for (let i = 0; i < dom.window.document.forms.length; i++) {
    if (dom.window.document.forms[i].name.toUpperCase().includes("LOGIN")) {
      logForm = "yes";
      break;
    }
  }

  var doctype = dom.window.document.doctype;
  var str =
    "<!DOCTYPE " +
    doctype.name +
    (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : "") +
    (!doctype.publicId && doctype.systemId ? " SYSTEM" : "") +
    (doctype.systemId ? ' "' + doctype.systemId + '"' : "") +
    ">";
  var version = "";
  //more options need to be added:
  if (str.toUpperCase().includes("HTML 4")) {
    version = "Html 4.01 or older";
  } else {
    version = "Html 5 or newer";
  }

  return {
    title,
    externalLinks,
    internalLinks,
    headings,
    logForm,
    version,
  };
};

const home24 = async (url) => {
  const result = await fetch(url);
  return result.text();
};
