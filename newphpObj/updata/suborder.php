<?php
	require_once "../connect_config.php";
	
	//链接数据库
	$conn = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME,DB_PORT) or die('数据库链接失败');
	//获取数据
	$id = $_POST["id"];
	$name = $_POST["name"];
	$price = $_POST["price"];
	$number = $_POST["number"];
	$priceall = $_POST["priceall"];
	                
	//更新sql
	$updata = "UPDATE dataOrder SET name='$name',price='$price',number='$number',priceall='$priceall' WHERE id='$id'";
	mysqli_query($conn,$updata);
	echo "修改成功"
?>