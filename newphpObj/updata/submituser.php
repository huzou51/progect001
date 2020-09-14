<?php
	require_once "../connect_config.php";
	header('Access-Control-Allow-Origin:*');
	
	//链接数据库
	$conn = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME,DB_PORT) or die('数据库链接失败');
	//获取数据
	$id = $_POST["id"];
	$userName = $_POST["userName"];
	$password = $_POST["password"];
	$imgs = $_POST["imgs"];
	                
	//更新sql
	$updata = "UPDATE user SET userName='$userName',password='$password',imgs='$imgs' WHERE id='$id'";
	mysqli_query($conn,$updata);
	echo "修改成功"
?>