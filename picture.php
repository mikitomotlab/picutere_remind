<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>picuture</title>
  <style></style>
  <link  rel="stylesheet" type="text/css" href="style.css">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>


  <script src="main3.js" defer></script>
  <!-- <script src="hello_ajax.js" defer></script> -->
  <!-- <script src="try.js" defer></script> -->
  <script src="EXIF.js" ></script>
  <script src="effect.js"></script>
</head>
<body>
<div align="left">

<!--
<hr width="500">
<a href="index.html">トップ</a>
    <a href="about.html">プロフィール</a>
    <a href="link.html">リンク集</a><br>
<hr width="500"><br><br>



<section>
  <img id="myImageA" />
  <img src="image1.jpg" id="img1" />
<pre>Make and model: <span id="makeAndModel"></span></pre>
<br/>
-->

<body ondrop="onDrop(event);" ondragover="onDragOver(event);">
<div style="margin-left:5px;">
<h1>Exifの確認と削除</h1>
  <form name="form1">
    <p><input type="file" id="inputfile" onchange="onAddFile(event);" accept="image/jpeg"></p>
    <canvas id="SrcCanvas" onclick='document.getElementById("inputfile").click();'></canvas>
    <canvas id="DstCanvas" style="display:none;"></canvas>
    <img id="img_source" style="display:none;" src="dropbox.png">
    <p><input type="checkbox" id="chk_orientation" checked="checked"><label for="chk_orientation">Exifに画像方向の情報が存在するときは「画像方向」を残す。</label></p>
    <input type="submit" id="btn_start" onclick="return run();" value="削 除" style="background-color:#ccc;" disabled="disabled">
  </form>
  <div id="result"></div>
</div>

<div id="latitude"></div>
<div id="logitude"></div>
<form method="POST" action="aprication_v3.php">
  <input type="text" name="keyword" size="20" />
  <input type="submit" name="submit" value="送信" />
</form>

<h1>写真を登録する</h1>
<!-- <script type="text/javascript">

  function give_result() {
    alert("into function");

    var request = document.querySelector('#result');
    alert(request);
    // console.log(request.outerHTML);
    // post();
    xhr = new XMLHttpRequest();
    // 計算ボタンを押した際の動作
    // function post() {
    alert("into XMLHttp");
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
  }

</script> -->

<button id="btn" type="button" name="submit" value="送信">送信ボタン</button>

<!-- <form action="aprication_v1.php" method="post" name="resultsend"> -->
  <!-- <button type="submit" name="result" value=<div id="result"></div>>送信する</button> -->
  <!-- <button type="submit" name="result" onclick="give_result()">送信する</button> -->
  <!-- <input type="hidden" name="result" value=result> -->
	<!-- <input type="submit"><br> -->
	<!-- <input type="submit" value="呼び出し"> -->
<!-- </form> -->
</body>
</section>


<hr width="500">
  <br>
  <br>




</div>



</body>
</html>
