<?php
	require_once "../connect_config.php";
	// 解决ajax跨域问题 表示所有网站都可以访问这个接口
	header('Access-Control-Allow-Origin:*');
	//返回数据的状态 消息 和数据
	$status = false;
	$msg = "";
	$data = array();
	//查询语句
	$query = "SELECT * FROM user";
	//链接数据库
	$conn = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME,DB_PORT) or die('数据库链接失败');
	$data1 = mysqli_query($conn,$query);
	if($data1){
		$status = true;
		$msg = "成功";
		$i = 0;
		while($row = mysqli_fetch_array($data1)){
			$data [$i]["id"] = $row["id"];
			$data [$i]["userName"] = $row["userName"];
			$data [$i]["password"] = $row["password"];
			$data [$i]["imgs"] = $row["imgs"];
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
?>