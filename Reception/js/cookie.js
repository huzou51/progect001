// 对Cookie进行读取,添加,删除操作
var cookie={
//------------------------------------------Get start------------------------------------------// 

  	//读取cookie,n为cookie名 
	Get:function(n){ 
		
		//根据cookie名建立一个正则表达式
   		var re=new RegExp("(?:;)?"+n+"=([^;]*);?");

		//判断是否有返回值
		if(re.test(document.cookie)) 
		{
			//从cookie中取出值,并返回
   			return decodeURIComponent(RegExp["$1"]);
		}else{
			
			//返回null
			return null;
		}
   	}, //读取cookie结束
	
//------------------------------------------Get end------------------------------------------//
   
   
//------------------------------------------Set start------------------------------------------//

	//写入cookie,n为cookie名，v为value 
   	Set:function(n,v){
			
		//创建一个时间对象t
   		var eTime=new Date();
	
		//Cookie失效时间为1小时,8.64e7 一天, 3.6e6 一小时 
		eTime.setTime(eTime.getTime() + (1 * 3.6e6));
		
		//Cookie路径
		var path = "/";
		
		//Cookie域
		var domain;
		
		//Cookie安全标志
		var secure;
		
		//定义一个字符串变量,用来存放Cookie的属性值
		var sCookie = n + "=" +encodeURIComponent(v) +";expires=" + eTime.toGMTString()+"; path=" + path;

		//将信息写入cookie
		document.cookie = sCookie;
   	
	},//写入cookie结束
	
//------------------------------------------Set end------------------------------------------//


//------------------------------------------Del end------------------------------------------//     
   
	//删除cookie
	Del:function(n){ 
		
		//Cookie路径
		var path = "/";
		
		//Cookie域
		var domain;
		
		//Cookie安全标志
		var secure;
		
		//定义一个字符串变量,用来存放Cookie的属性值
		var sCookie = n + "=" + "" + ";expires=" + new Date(0).toGMTString() + "; path=" + path;
		
		//将信息写入cookie
		document.cookie = sCookie;

		//购物车里商品的总价
		amount = 0;
   	} 

//------------------------------------------Del end------------------------------------------// 
};


















// 购物车
var common = { 
//------------------------------------------intoCar start------------------------------------------//
   
	//添加至购物车,goods_id为商品ID,goods_name为商品名称,price为商品会员价,quantity为商品数目
	intoCart:function(goods_id,goods_name,price,quantity){ 
		
		//商品id、商品名称不能为空
		if(goods_id == "" && goods_name == "")
		{
			//跳出出程序
			return;
		}
	
		//从cookie中取出商品信息列表
		var goods_list = cookie.Get("cartList");
	
		//如果商品信息列表为空
		if(goods_list==null || goods_list=="" || goods_list=="null") 
   		{ 	
			//添加商品信息到商品信息列表
			goods_list=goods_id+"|"+goods_name+"|"+price+"|"+quantity;
		
			//将商品信息列表存入cookie
			cookie.Set("cartList",goods_list);

			showDIV();
			return false;

			//跳出出程序,并显示提示信息
			//return alert("商品已经添加到购物车中");
		}
		
		//判断商品信息列表是否已经存在该商品
		if(common.hasOne(goods_id)) 
		{ 		
			//添加商品信息到商品信息列表
			goods_list += "&"+goods_id+"|"+goods_name+"|"+price+"|"+quantity;
					
			//将商品信息列表存入cookie
			cookie.Set("cartList",goods_list);
				
			//显示提示信息
			showDIV();
			return false;
			//alert("商品已经添加到购物车中");
			 
		}else{
			//定义一个字符串变量
			var tempStr;
			
			//取得数组形式的商品信息列表
			var arr = common.convertArray(); 
			
			//循环取出数组中的各个商品信息
			for(i=0;i<arr.length;i++)
			{ 
				//商品id相符
				if(arr[i][0]==goods_id)
				{ 
					//修改商品的购买数量
					arr[i][4]++;
				}
				//以字符"|"为分割,将数组转换为字符串
				tempStr=arr[i].join("|"); 
				
				arr[i] = tempStr;
			}
			
			//以字符"&"为分割,将数组转换为字符串
			tempStr=arr.join("&"); 

			//将更新后的商品信息列表保存到Cookie
			cookie.Set("cartList",tempStr);
		
			//显示提示信息
			//alert("购物车中已含有此商品");
			showDIV();
			return false;
		}
	} ,//添加商品信息结束
	
//------------------------------------------intoCar end------------------------------------------//

//------------------------------------------updateQuantity end------------------------------------------//
	//更改单一商品的购买数量
	updateQuantity:function(goods_id,quantity){
		
		//定义一个字符串变量
		var tempStr;
		
		//取得数组形式的商品信息列表
   		var arr = common.convertArray(); 
		
		//循环取出数组中的各个商品信息
		for(i=0;i<arr.length;i++)
		{ 
			//商品id相符
			if(arr[i][0]==goods_id)
			{ 
				//修改商品的购买数量
				arr[i][4]=quantity;
			}
			//以字符"|"为分割,将数组转换为字符串
			tempStr=arr[i].join("|"); 
			
			arr[i] = tempStr;
		}
		
		//以字符"&"为分割,将数组转换为字符串
		tempStr=arr.join("&"); 

		//将更新后的商品信息列表保存到Cookie
		cookie.Set("cartList",tempStr);
		
		//更新购物车
		getCartInfo();
		// intoCart();
		
	},//更改商品数量结束

//------------------------------------------updateQuantity end------------------------------------------//



//------------------------------------------reMoveOne end------------------------------------------//	

	//移除购物车中的某一商品
   	reMoveOne:function(goods_id){ 
   
  		//判断商品是否存在
   		if(common.hasOne(goods_id))
		{
			//中断执行,并显示提示信息
			return alert("选择的商品不存在购物车!");
		}

		//取得数组形式的商品信息列表
   		var arr = common.convertArray();
		
		//如果数组只有一个值
		if(arr.length ==1)
		{
			//清空购物车
			cookie.Del("cartList");
			
			//更新购物车
			
		}
		
		//循环取出数组中的各个商品信息
		for(i=0;i<arr.length;i++)
		{ 
			//商品id相符
			if(arr[i][0]==goods_id)
			{ 
				//将该项从数组中移除
				arr = common.delArr(arr,i);
			}
		}
		
		//循环取出数组中的各个商品信息
		for(i=0;i<arr.length;i++)
		{ 
			//以字符"|"为分割,将数组转换为字符串
			tempStr=arr[i].join("|"); 
			
			//将转换后的字符串,传给arr的第i项
			arr[i] = tempStr;
		}

		//以字符"&"为分割,将数组转换为字符串
		tempStr=arr.join("&"); 

		//将更新后的商品信息列表保存到Cookie
		cookie.Set("cartList",tempStr); 
		
		//更新购物车
		getCartInfo();
				
   }, //移除物品结束 
//------------------------------------------reMoveOne end------------------------------------------//	

    
//------------------------------------------hasOne start------------------------------------------//
   
   	//检验购物车内是否已经含有该商品,goods_id为商品id
   	hasOne:function(goods_id){ 
		//如果商品id为空
		if(goods_id=="" || goods_id=="null" || goods_id==null)
		{
			//返回true
			return true;
		}
		
		//取得数组形式的商品信息列表
   		var arr = common.convertArray(); 
		
		//如果商品列表为空
		if(arr=="" || arr=="null" || arr==null)
		{
			//返回true
			return true;
		}
		
		//循环取出数组中的各个商品信息
		for(i=0;i<arr.length;i++)
		{ 
			//商品id相符
			if(arr[i][0]==goods_id)
			{ 
				//中断执行,并返回false;
   				return false; 
			}
		}
		
		//中断执行,并返回false;
   		return true; 
				
	} ,//检验结束

//------------------------------------------hasOne end------------------------------------------//


//------------------------------------------delArr start------------------------------------------//

	//移除数组中指定项 
	delArr:function(arr,n) { //n表示第几项，从0开始算起。
	 
	 	//如果n<0，则不进行任何操作。
   		if(n<0)
		{ 
			//返回原数组
   			return arr; 
		}else{ 
			//返回操作后的数组
   			return arr.slice(0,n).concat(arr.slice(n+1,arr.length));
		}
   	}, 

//------------------------------------------delArr start------------------------------------------//



//------------------------------------------convertArray start------------------------------------------//		
	
	//将商品信息列表转换为数组形式
	convertArray:function(){
	
		//定义个数组,用来存储转换后的商品信息列表
		var  goods_Arr = Array();
		
		//定义一个字符串变量,用来存储单一商品的详细信息
		var goods_inf;
	
		//从Cookies中取出商品信息列表
   		var goods_list = cookie.Get("cartList"); 
		
		//如果商品信息列表为空
   		if(goods_list == "" || goods_list == "null" || goods_list == null)
		{
			//中断程序的执行,并返回一个空数组
			return null;
   		}
		
		//判断商品信息列表中是否含有多条商品信息
   		if(goods_list.lastIndexOf("&") != -1)
		{ 
			//根据字符"&",把商品信息列表分割成字符串数组arr
   			var arr=goods_list.split("&");
						 
			//对数组arr进行循环
   			for(i=0;i<arr.length;i++) 
   			{	
				//取出单一商品个属性的值
				goods_inf=arr[i].substr(arr[i].indexOf("=")+1,arr[i].length);
				 
				//根据字符"|",把单一商品的详细信息分割成字符串数组
				goods_Arr[i] = goods_inf.split("|");
   			}
			 
  		}else{
		
			//取出单一商品的详细信息
			goods_inf=goods_list.substr((goods_list.indexOf("=")+1),goods_list.length);
		
			//根据字符"|",把单一商品的详细信息分割成字符串数组	 
			goods_Arr[0] = goods_inf.split("|");
		}
		
		//返回转换后结果
		return goods_Arr; 
			
	}//重置结束

//------------------------------------------convertArray end------------------------------------------//	
 
};

//购物车里商品的种数和总价
var amount = 0;
function getCount(){
	amount = 0;	
	//取得数组形式的商品信息列表
	var arr = common.convertArray(); 
	
	//如果商品列表为空
	if(arr=="" || arr=="null" || arr==null)
	{
		//返回0
		return 0;
	}		
	for(i=0;i<arr.length;i++)
	{		
		//计算商品总额
		amount+=arr[i][2]*arr[i][3];
	}
	//中断执行,并返回arr.length;
	return arr.length; 
				
}

//show DIV
function showDIV() {
	create_bg();
	var visual = document.createElement("div");
	visual.id = "new_dialogue";
	var html = "";
	html = '<div id="infoDIV"'
			+ '<span style="float:left;"></span>'
			+ '<div style="float:left">商品已成功添加到购物车</div>'
			+ '<div style="width:20px;float:left;" onclick="closeDIV()" onmouseover="this.style.cursor=\'hand\'">&nbsp;</div>'
			+ '<br/><br/>'
			+ '<span>购物车内共有<strong>'
			+ getCount()
			+ '</strong>种商品&nbsp;&nbsp;&nbsp;</span><span>合计：<strong><span id="totalPrices">'
			+ amount
			+ '</span></strong></span><div style="height:10px;"></div>'
			+ '<a href="car.html'
			+ '" title="查看购物车">查看购物车</a>'
			+ '&nbsp;&nbsp;&nbsp;<a href="javascript:cookie.Del(\'cartList\');closeDIV();" title="清空购物车">清空购物车</a>'
			+ '&nbsp;&nbsp;&nbsp;<a href="商品详情.html">继续购物</a>'
			+ '</div>';
	visual.innerHTML = html;
	document.body.appendChild(visual);
}

// 生成背景
function create_bg() {
	// 建立一个div的节点
	bg = document.createElement("div");
	bg.id = "dark_bg";
	with (bg.style) {
		position = "absolute";
		top = "0";
		left = "0";
		width = document.documentElement.scrollWidth + "px";
		if (document.documentElement.scrollHeight < document.documentElement.clientHeight) {
			height = document.documentElement.clientHeight + "px";
		} else {
			height = document.documentElement.scrollHeight + "px";
		}

	}
	// 打开对话框后禁用浏览器的滚动条
	//document.documentElement.style.overflow = "hidden";
	//document.body.style.overflow = "hidden";
	// 把这个节点附加到body上
	document.body.appendChild(bg);
}

//close DIV
function closeDIV() {
	//document.documentElement.style.overflow = "auto";
	//document.body.style.overflow = "auto";
	var new_dialogue = document.getElementById("new_dialogue");
	var dark_bg = document.getElementById("dark_bg");
	new_dialogue.parentNode.removeChild(new_dialogue);
	dark_bg.parentNode.removeChild(dark_bg);
}