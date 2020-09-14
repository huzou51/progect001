<?php
	require_once "../connect_config.php";
	//根据ID进行删除
	$del_id = $_GET["id"];
	$delete = "DELETE FROM theElderly WHERE id = $del_id";
	
	//链接数据库
	$conn = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME,DB_PORT) or die('数据库链接失败');
	$res = mysqli_query($conn,$delete);
	
	echo "删除成功";
	mysqli_close($conn);
?>