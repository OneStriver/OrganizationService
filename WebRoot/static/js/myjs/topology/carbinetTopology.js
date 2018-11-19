//声明数组缓存数据
var alarmDataArray = [];

$(function() {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();
	setInterval("loadData()", 3000);
	// initMqttListener();

});

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#alarmTable').bootstrapTable({
			url : '#', 									// 请求后台的URL（*）
			method : 'get', 							// 请求方式（*）
			striped : true, 							// 是否显示行间隔色
			cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, 							// 是否显示分页（*）
			sortable : false, 							// 是否启用排序
			sortOrder : "asc", 							// 排序方式
			queryParams : initObject.queryParams,		// 传递参数（*）
			sidePagination : "client", 					// 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, 							// 初始化加载第一页，默认第一页
			pageSize : 10, 								// 每页的记录行数（*）
			pageList : [ 10 ], 							// 可供选择的每页的行数（*）
			search : true, 								// 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			showColumns : true, 						// 是否显示所有的列
			showRefresh : false, 						// 是否显示刷新按钮
			minimumCountColumns : 2, 					// 最少允许的列数
			clickToSelect : true, 						// 是否启用点击选中行
			height : 500, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", 							// 每一行的唯一标识，一般为主键列
			showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
			cardView : false, 							// 是否显示详细视图
			detailView : false, 						// 是否显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : 'alarmNum',
				title : '告警编号'
			}, {
				field : 'alarmLevel',
				title : '告警级别'
			}, {
				field : 'deviceName',
				title : '设备名称'
			}, {
				field : 'hasConfirm',
				title : '已确认'
			}, {
				field : 'happenTime',
				title : '发生时间'
			}, {
				field : 'alarmDescription',
				title : '具体问题'
			}, {
				field : 'recommendRepairMeasure',
				title : '建议修复措施'
			} ]
		});
	};
	return initObject;
};

var t1 = [ {
	"alarmNum" : "2",
	"alarmLevel" : "2",
	"deviceName" : "交换机",
	"hasConfirm" : "否",
	"happenTime" : "2018-1-24",
	"alarmDescription" : "测试",
	"recommendRepairMeasure" : "无"
} ];

function loadData() {
	var data = '{"alarmNum":"3","alarmLevel":"3","deviceName":"交换机","hasConfirm":"否","happenTime":"'+Date.parse(new Date())+'","alarmDescription":"测试","recommendRepairMeasure":"无"}';
	var result = JSON.parse(data);
	if (t1.length == 50) {
		t1.splice((t1.length-1),1);
	}
	t1.unshift(result);
	$("#alarmTable").bootstrapTable('load', t1);
}

function initMqttListener() {
	var ip = 'localhost';
	var port = '8083';
	var clientId = 'AlarmStatusId';
	var topic = "alarm/#";
	client = new Paho.MQTT.Client(ip, Number(port), clientId);// 建立客户端实例
	var options = {
		timeout : 10,
		keepAliveInterval : 20,
		onSuccess : onConnect
	};

	client.connect(options);// 连接服务器并注册连接成功处理事件

	client.onConnectionLost = onConnectionLost;// 注册连接断开处理事件
	client.onMessageArrived = onMessageArrived;// 注册消息接收处理事件

	function onConnect() {
		console.log("onConnected");
		client.subscribe(topic);
	}

	function onConnectionLost(responseObject) {
		if (responseObject.errorCode !== 0) {
			console.log("onConnectionLost:" + responseObject.errorMessage);
			console.log("连接已断开");
		}
	}

	function onMessageArrived(message) {
		var result = message.payloadString;
		console.log(result);
		var obj = JSON.parse(result); 
		if(alarmDataArray.length==50){
			alarmDataArray.splice((alarmDataArray.length-1),1); 
		}
		alarmDataArray.unshift(obj);
		$("#alarmTable").bootstrapTable('load',alarmDataArray);
	}
}