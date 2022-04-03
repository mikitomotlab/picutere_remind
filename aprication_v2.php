<?php require('dbconnect.php'); ?>

<?php
	print("ようこそ！このホームページへ！");
?>

<?php

//$con = mysql_connect('localhost', 'miki', '19960807Sm', 'picture_data');

print 'mysql 関数で接続に成功しました。';

$pos = $_POST['pos'];
// header('Content-type:application/json; charset=utf8');
// $latitude = json_encode($latitude);
// $logitude = json_encode($logitude);

print 'aaa';
print $pos;
$position = explode(",", $pos);
$latitude = $position[0];
$logitude = $position[1];

//picture.phpへ出力
document.getElementById("latitude").innerHTML = $latitude;
document.getElementById("logitude").innerHTML = $logitude;

//mysql_close($con);
?>
