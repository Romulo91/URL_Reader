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

  for (let i = 0; i < result.headings.length; i++) {
    document.querySelector(".resultHeadings_" + i).innerHTML =
      result.headings[i];
  }

  document.querySelector(".resultlogForm").innerHTML = result.logForm;
  document.querySelector(".resultVersion").innerHTML = result.version;
}
