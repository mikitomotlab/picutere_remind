document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn').addEventListener('click', function() {
    var result = document.getElementById('result');
    alert(result);
    console.log('aaa');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          result.textContent = xhr.responseText;
        } else {
          result.textContent = 'サーバーエラーが発生しました。';
        }
      } else {
        result.textContent = '通信中...';
      }
    };

    var data = { result: 'result'};
    /*
    xhr.addEventListener('loadstart', function() {
      result.textContent = '通信中...';
    }, false);

    xhr.addEventListener('load', function() {
      result.textContent = xhr.responseText;
    }, false);

    xhr.addEventListener('error', function() {
      result.textContent = 'サーバーエラーが発生しました。';
    }, false);
    */
    /*xhr.open('GET', 'hello_ajax.php?name=' +
      encodeURIComponent(document.getElementById('result')), true);
    */
    xhr.open('POST', 'http://localhost/picture_remind/aprication_v1.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // xhr.send('data=' + encodeURIComponent(document.getElementById('data')));
    xhr.send('result=' + encodeURIComponent(document.getElementById('result')));
    // xhr.send(null);
  }, false);
}, false);