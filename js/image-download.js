// このエクステンションで機能していないスクリプト.
function download(url, name){
  var a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', name || 'noname');
  a.dispatchEvent(new CustomEvent('click'));
}
