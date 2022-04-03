function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'C:/xampp/htdocs/picture_remind/main.js';

  if ( script.readyState ) {
    script.onreadystatechange = function() {
      if ( script.readyState === 'loaded' || script.readyState === 'complete' ) {
        script.onreadystatechange = null;
        callback();
      };
    };
  } else {
    script.onload = function() {
      callback();
    };
  };

  document.getElementsByTagName('head')[0].appendChild(script);
};

function give_result() {
  // document.getElementById('sendresult').onclick = function(){
    // alert("into function")
    // post();
  // }
  alert("into function")

  // loadScript('main.js', function(){
  //   var request = html;
  //   alert(request);
  //   alert("request");
  // })

  const request = document.querySelecter('.check');
  alert(request);
  console.log(request.outerHTML);
  // post();
  xhr = new XMLHttpRequest();
  // 計算ボタンを押した際の動作
  // function post() {
  xhr.open('POST', 'aprication_v1.php', true);
  alert("into function post");
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  // フォームに入力した値をリクエストとして設定
  // var request = html;
  // var request = getElementById("result").value;
  if(request == null){
    alert("変数に値が格納されていません");
  }
  // alert(request)
  alert("request");
  xhr.send(request);
}