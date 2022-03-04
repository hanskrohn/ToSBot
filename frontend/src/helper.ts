/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
let html = '';

export function setHTML(resHTML) {
  html = resHTML;
}

export function getHTML() {
  return html;
}

let url = '';

export function setURL(resURL) {
  let urlWithHash = resURL;
  // remove any # portion from URL (relevant sometimes)
  urlWithHash = urlWithHash.split('#')[0];
  url = urlWithHash;
}

export function getURL() {
  return url;
}
