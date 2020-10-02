async function handleClick() {
  const url = document.querySelector(".url-input").value;
  const result = await fetch(
    `http://localhost:3000/fetch?url=${url}`
  ).then((response) => response.json());
  document.querySelector(".resulttitle").innerHTML = result.title;
  document.querySelector(".resultExternallinks").innerHTML =
    result.externalLinks;
  document.querySelector(".resultInternallinks").innerHTML =
    result.internalLinks;
  var i = 0;
  while (result.headings[i] > 0) {
    document.querySelector(".resultHeadings_" + i).innerHTML =
      result.headings[i];
    i++;
  }
  document.querySelector(".resultlogForm").innerHTML = result.logForm != null;
}
