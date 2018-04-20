
'use strict'

// setup method.
function Setup() {
  document.getElementById("CloseButton").onclick = SendClose;
}

// send download method.
function SendDownload() {
  var queryInfo = {
    active: true ,windowId: chrome.windows.WINDOW_ID_CURRENT
  };
  chrome.tabs.query(queryInfo, function(result) {
    var currentTab = result.shift();
    var msgContent = {download:true, close: false};
    chrome.tabs.sendMessage(currentTab.id, msgContent, function() {});
    console.log("pu.js sendMessage download");
  });
}

// send close method.
function SendClose() {
  var queryInfo = {
    active: true ,windowId: chrome.windows.WINDOW_ID_CURRENT
  };
  chrome.tabs.query(queryInfo, function(result) {
    var currentTab = result.shift();
    var msgContent = {download:false, close: true};
    chrome.tabs.sendMessage(currentTab.id, msgContent, function() {});
    console.log("pu.js sendMessage close");
  });
}

// start up method.
document.addEventListener( 'DOMContentLoaded', function (){
  Setup();
  SendDownload();
}, false);
