<?php
try{
  $db = new PDO("mysql:host=127.0.0.1;dbname=picture_data;charset=utf8" , 'root' , '');
}catch (PDOException $e) {
  echo 'DB接続エラー: '. $e->getMessage();
}
?>
