// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let tabGroup = document.querySelector("tab-group");
tabGroup.addTab(
  {
    title: "index",
    src: `https://github.com/MCMicS/electron-tabs-samples/tree/puchenhui/refreshTab/`,
    active: true,
    closable: false,
    visible: true,
    iconURL: 'img/28975452.jpg',
    webviewAttributes: {
      allowpopups: true,
    },
  });

openAddTab = (details, name, iconClass = '') => {
  let tab = tabGroup.addTab({
    title: name,
    src: details.url,
    active: true,
    icon: iconClass,
    webviewAttributes: {
      allowpopups: true,
    },
  });
  tab.webview.addEventListener('close', () => tab.close())
}
openAddTab({url: "https://github.com/puchenhui"}, 'Second', 'profile-icon')

onFlushed = () => {
  let activeTab = tabGroup.getActiveTab()
  if (activeTab) {
    console.log(activeTab);
    let webview = activeTab.webview;
    console.log('Reload tab with URL: ' + webview.getURL());
    webview.reload();
  }
}

toMin = () => {
  window.electronAPI.toMin()
}
toMax = () => {
  const max = document.getElementById('max');
  window.electronAPI.toMax()
  //最大化图形切换
  if (max.getAttribute('src') == './img/win_small.png') {
      max.setAttribute('src', './img/win_max.png');
  } else {
      max.setAttribute('src', './img/win_small.png');
  }
}
toClose = () => {
  window.electronAPI.toClose()
}

//addAppButtons1()
addAppButtons()

function addAppButtons1() {
  const nav = tabGroup.buttonContainer.parentElement
  nav.appendChild(document.querySelector('.nav-btn'))
}
function addAppButtons() {
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", 'app-nav');
  const nav = tabGroup.buttonContainer.parentElement
  nav.appendChild(buttonContainer)
  buttonContainer.appendChild(createButtonToGroup(onFlushed, './img/win_refresh.svg', 'flushed'))
  buttonContainer.appendChild(createButtonToGroup(toMin, './img/win_min.png'))
  buttonContainer.appendChild(createButtonToGroup(toMax, './img/win_small.png', 'max'))
  buttonContainer.appendChild(createButtonToGroup(toClose, './img/win_close.png'))
}

function createButtonToGroup(toCall, imageSrc, imageId = '') {
  const button = document.createElement("button")
  const img = document.createElement("img")
  button.appendChild(img)
  img.id = imageId
  img.src = imageSrc
  button.addEventListener("click", toCall, false);
  return button
}
