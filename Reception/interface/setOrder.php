<?php
	require_once "connect_config.php";
	header("Content-Type:application/json");
	header("Content-Type:text/html;charset=utf-8");
	// 解决ajax跨域问题 表示所有网站都可以访问这个接口
	header('Access-Control-Allow-Origin:*');
	//返回数据的状态 消息 和数据
	$status = false;
	$msg = "";
	$data = array();
	
	//设置语句
	$setSql = "INSERT INTO dataOrder (name,price,number,priceall) VALUES ('$_POST[name]','$_POST[price]','$_POST[number]','$_POST[priceall]')";
	
	//获取数据
	$query = "SELECT * FROM dataOrder";
	//链接数据库
	$conn = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME,DB_PORT) or die('数据库链接失败');
	mysqli_select_db($conn,"message");
	$res = mysqli_query($conn,$setSql);
	if($res){
		$data1 = mysqli_query($conn,$query);
		if($data1){
			$status = true;
			$msg = "成功";
			$i = 0;
			while($row = mysqli_fetch_array($data1)){
				$data [$i]["id"] = $row["id"];
				$data [$i]["name"] = $row["name"];
				$data [$i]["price"] = $row["price"];
				$data [$i]["number"] = $row["number"];
				$data [$i]["priceall"] = $row["priceall"];
				$i++;
			};
		}else{
			$status = false;
			$msg = "数据查询失败";
			$valuse = array(
				$status,
				$msg
			);
		}
		echo json($status,$msg,$data,$i);
	}else{
		echo $_POST['callback'].'发送失败';
	}
	
	//封装json格式
	function json($status,$message="",$data=array(),$i){
		if(!is_bool($status)){
			return "";
		};
		$result = array(
			"status" => $status,
			"message" => $message,
			"data" => $data,
			"count" => $i
		);
		echo json_encode($result,JSON_UNESCAPED_UNICODE);
	}
	mysqli_close($conn);
?>