
'use strict'

// message listener.
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  Download(msg.download)
  Close(msg.close)
});

// Download method.
var Download = function(download) {
  console.log("get download message.");
  if (download) {
    // ドメインに対応したクラスを利用するように処理する.
    var downloaderList = {};
    downloaderList["safebooru.org"]      = new Safebooru_Downloader();
    // ドメインに対応したクラスを用いたダウンロード.
    var domainName = window.location.hostname;
    downloaderList[domainName].Download();
  }
}
var Safebooru_Downloader = function() {
  var myProto = Safebooru_Downloader.prototype;
  // ダウンロードメソッド.
  myProto.Download = function(){
    // この画面が画像確認画面か判定する
    if (window.location.href.match('s=view')) {
      this.DownloadInConfirmScreen();
    } else {
      // 各画像確認画面のurl配列 .
      var imageUrlArr = this.GetImageUrlArr();
      // 画像情報クラス配列を生成.
      var imageObjectArr = this.GetImageObjectArr(imageUrlArr);
      // 画像の要素生成とダウンロード.
      this.EndProcess(imageObjectArr);
    }
  };
  // view画面において画像をダウンロードする.
  myProto.DownloadInConfirmScreen = function() {
    // 画像Urlを抜き出す.
    var imageUrl = document.getElementById('image').src
    var fileName = imageUrl.match(".+/(.+?)([\?#;].*)?$")[1];
    console.log("cs.js imageUrl : "+imageUrl)
    console.log("cs.js fileName : "+fileName)
    // a要素生成.
    var a      = document.createElement('a');
    a.href     = imageUrl;
    a.download = fileName;
    // ダウンロード
    a.click();
  }  // 画像のurl配列を取得する.
  // list画面において画像のurl配列を取得する.
  myProto.GetImageUrlArr = function() {
    console.log("Call GetImageUrlArr");
    // input.
    var allPreviewImage = document.getElementsByClassName("preview");
    var imageUrlArr = [];
    // process.
    Array.prototype.forEach.call(allPreviewImage, function(imgNode, index, imgNodeList) {
      imageUrlArr.push(imgNode.parentElement.href);
    });
    // output.
    return imageUrlArr;
  }
  // サムネ先のhtmlを取得する.
  myProto.GetImageObjectArr = function(imageUrlArr) {
    var imageObjectArr = [];
    for(var i = 0; i < imageUrlArr.length; i++){
      var imageUrl = imageUrlArr[i];
      $.ajax({
        type: 'GET',
        url: imageUrl,
        dataType: 'text',
        async: false,
        timeout: 30000,
        success: function(data){
          var imageSrcUrl = $(data).find('#image')[0].src;
          var fileName    = imageSrcUrl.match(".+/(.+?)([\?#;].*)?$")[1];
          var ImageObject = new Image(imageSrcUrl, fileName);
          imageObjectArr.push(ImageObject);
          console.log(ImageObject);
        },
        error: function(){
        },
        complete: function(){}
      });
    }
    return imageObjectArr;
  };
  // 画像の要素生成とダウンロード.
  myProto.EndProcess = function(imageObjectArr) {
    var parentElem = document.createElement('div');
    Array.prototype.forEach.call(imageObjectArr, function(imageObject) {
      console.log(imageObject);
      var anchorTmpElem = document.createElement('a');
      anchorTmpElem.setAttribute('href', imageObject.Url);
      anchorTmpElem.setAttribute('target', '_blank');
      anchorTmpElem.setAttribute('download', imageObject.FileName);
      anchorTmpElem = parentElem.appendChild(anchorTmpElem);

      // イベントの発火
      if (document.dispatchEvent) {
        var ev = document.createEvent('MouseEvents');
        ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        anchorTmpElem.dispatchEvent(ev);
      } else if (document.fireEvent) {
        anchorTmpElem.click();
      }
      parentElem.removeChild(anchorTmpElem);
    });
  }
};

// tab close method.
var Close = function(close){
  if (close == true) {
    window.open('about:blank','_self').close();
  }
}

// image class.
var Image = function(url, fileName){
  this.Url = url;
  this.FileName = fileName;
};
// validate JQuery method.
function ValidateJquery() {
  // JQueryの利用を宣言する.
  !function () {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-2.0.0.min.js");
    document.body.appendChild(script);
  }();
  jQuery.noConflict();
}
// invalidate page jump method.
function InvalidatePageJump() {
  jQuery.noConflict();
  jQuery(document).ready(function($){
    window.oncontextmenu = null

    // cloudfront.net'がソースに含まれているのscript要素を削除する.
    var scriptList = document.getElementsByTagName("script");
    console.log(scriptList);
    Array.prototype.forEach.call(scriptList, function(scriptElem) {
      // console.log("InvalidatePageJump 3 : " + scriptElem.src);
      // try {
      //   scriptElem.parentElement.removeChild(scriptElem);
      // } catch(e) {
      //
      // }
      // if (scriptElem.src.indexOf('cloudfront', 0) != -1) {
      //   console.log("InvalidatePageJump 4 : " + scriptElem.src);
      //   scriptElem.parentElement.removeChild(scriptElem);
      // }
    });
    // 画像クリック時のページ遷移を無効化.
    $('img#image')[0].onclick = function() { return false; }
  });
}

// start up method.
$(document).ready(function(){
  // // sankakucomplexの場合は, ページ遷移を無効化する.
  // if(window.location.hostname == "chan.sankakucomplex.com") {
  //   // invalidate page jump.
  //   // ValidateJquery();
  //   // InvalidatePageJump();
  // }
});
