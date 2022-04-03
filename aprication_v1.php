<?php require('dbconnect.php'); ?>

<?php
	print("ようこそ！このホームページへ！");
?>

<?php

print 'mysql 関数で接続に成功しました。';

//main2.jsから値を受け取る
$pos = $_POST['pos'];

// header('Content-type:application/json; charset=utf8');
// $latitude = json_encode($latitude);
// $logitude = json_encode($logitude);

print 'aaa';
print $pos;//latitude, logitude どちらも受け取る
$position = explode(",", $pos); //,で文字を区切る
$latitude = $position[0];
$logitude = $position[1];

//DBへ登録する
// $pos = GeomFromText('POINT($latitude $logitude)');
$statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword) VALUES (:latitude, :logitude, now(), :keyword)';
$state = $db->prepare($statesql);
$params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => 'aaa');
$state ->execute($params);
echo 'メッセージが登録されました';


//mysql_close($con);
?>
