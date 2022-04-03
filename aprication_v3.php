<?php require('dbconnect.php'); ?>

<?php
	print("ようこそ！このホームページへ！");
?>

<?php

$pos = $_POST['pos'];

print 'aaa';
print $pos;
$position = explode(",", $pos);
$latitude = $position[0];
$logitude = $position[1];

// print 'mysql 関数で接続に成功しました。';
// $latitude = document.getElementById("latitude");
// $logitude = document.getElementById("logitude");
// $keyword = $_POST['keyword'];
if(isset($logitude)){
	?>
	<form method="POST" action="aprication_v3.php">
    <input type="text" name="keyword" size="20" />
    <input type="submit" name="submit" value="送信" />
    </form>
<?php
	$keyword = $_POST['keyword'];
    print 'aaa';
    print $keyword;
	if(isset($keyword)){
        $statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword) VALUES (:latitude, :logitude, now(), :keyword)';
        $state = $db->prepare($statesql);
        $params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => $keyword);
        $state ->execute($params);
        echo 'メッセージが登録されました';
	}
}
// $t = json_encode($time);

// $params = file_get_contents('php://input');
// $latitude = $params["latitude"];
// $logitude = $params["logitude"];
// $t = $params["time"];
// print($latitude);
// print($logitude);
// print($t);

// $setpos = $db->prepare("INSERT INTO data VALUES (GeomFromText('POINT($latitude $logitude)'))  ");
// $setpos->execute();
// $statement = $db->prepare('INSERT INTO data SET pictured=$t  ');
// $statement->execute();
//DBへ登録する
// $pos = GeomFromText('POINT($latitude $logitude)');


// $statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword) VALUES (:latitude, :logitude, now(), :keyword)';
// $state = $db->prepare($statesql);
// $params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => 'aaa');
// $state ->execute($params);
// echo 'メッセージが登録されました';


//mysql_close($con);
?>
