// このエクステンションで機能していないスクリプト.


// - 画像一括保存用のChrome拡張 ---- //
//
//
//
// ----- //

// g.e-hentai.orgの画面内の画像を検索して一括保存するクラス.
// var GeHentai_Downloader = function() {
//   // メソッド.
//   var myProto = GeHentai_Downloader.prototype;
//   myProto.Download = function(){
//     // input.
//     this.GetCurrentHtml();
//     // 現在のソースが取得できたら.
//     chrome.runtime.onMessage.addListener(function(request, sender) {
//       if (request.action == "getSource") {
//         this.GeHentai_Downloader.prototype.GetImgUrl(request.source);
//       }
//     });
//   };
//     // サムネ先のhtmlを取得する.
//   myProto.LoadImgHtml = function(url) {
//     console.log("pass 10 : " + url);
//     $.ajax({
//       type: 'GET',
//       url: url,
//       dataType: 'html',
//       success: function(data) {
//         console.log("GetHtml", $(data).find('#img'));
//       }
//     });
//   };
//   // 現在の画像一覧ページのhtmlを取得する.
//   myProto.GetCurrentHtml = function() {
//     chrome.tabs.executeScript(null, {
//       file: "js/getPagesSource.js"
//     }, function() {
//       // If you try and inject into an extensions page or the webstore/NTP you'll get an error
//       if (chrome.runtime.lastError) {
//         console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
//       }
//     });
//   };
//   // メニュー画面において画像を処理する.
//   myProto.GetImgUrl = function(source){
//     var allImage = curElem.getElementsByTagName( "img" );
//     // process.
//     Array.prototype.forEach.call(allImage, function(imgNode, index, imgNodeList) {
//       // hrefが存在してかつ画像である場合.
//       if (imgNode.parentElement.href && ~imgNode.parentElement.href.indexOf("/s/")) {
//         console.log("pass 30");
//         console.log(imgNode.parentElement.href);
//
//         this.LoadImgHtml(imgNode.parentElement.href);
//       }
//     });
//   }
// };
//
// // 画面内の画像を検索して一括保存するメソッド.
// window.ImageDownloader = new GeHentai_Downloader()
//



// メモ {
  // 処理.
  //document.getElementsByTagName( "img" )[0].parentElement.href
  // 呼び出し.
  //ImageSearcher.Search()
// }



// 画面内の画像をダウンロードするメソッド.
window.TestImageDownloader = {
  download: function(url, name){
    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', name || 'noname');
    a.dispatchEvent(new CustomEvent('click'));
  }
}


// テスト用.
window.TestFunc = {
  helloWorld: function() {
    alert("Hello World!")
  }
};
