<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8" />
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<!-- CSS -->
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/font-awesome.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-table.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-select.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/select2.min.css"/>
	<!-- JS -->
	<script type="text/javascript" src="static/js/jquery.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrapValidator.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="static/js/select2.min.js"></script>
	<script type="text/javascript" src="static/js/zh-CN.js"></script>
	<script type="text/javascript" src="static/js/mqttws31.js"></script>
	<script type="text/javascript" src="static/js/common/jquery.bootstrap.teninedialog.v3.js"></script>

</head>
<body>
	
	<div id="toolbar" class="btn-group">
        <button id="btn_confirm" type="button" class="btn btn-info" style="margin-left:10px;margin-right:10px;">
            <span class="glyphicon glyphicon-ok"></span>确认
        </button>
        <button id="btn_clear" type="button" class="btn btn-danger">
            <span class="glyphicon glyphicon-remove"></span>清除
        </button>
    </div>
	<table id="realTimeAlarmTable">
	
	</table>
	
	<script type="text/javascript">
		//声明存储界面的告警数据
		var alarmDataArray = [];
		
		$(function(){
			// 初始化Table
			var oTable = new TableInit();
			oTable.Init();
			// 初始化Button的点击事件
		    var oButtonInit = new ButtonInit();
		    oButtonInit.Init();
		    
		    initMqttListener();
		    
		});
		
		// ====================实时告警表格初始化开始=======================
		var TableInit = function() {
			var initObject = new Object();
			// 初始化Table
			initObject.Init = function() {
				$('#realTimeAlarmTable').bootstrapTable({
					url : '#', 									// 请求后台的URL（*）
					method : 'GET', 							// 请求方式（*）
					toolbar: '#toolbar',                		// 工具按钮用哪个容器
					striped : true, 							// 是否显示行间隔色
					cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					pagination : true, 							// 是否显示分页（*）
					sortable : false, 							// 是否启用排序
					sortOrder : "asc", 							// 排序方式
					dataType : "json",
					sidePagination : "client", 					// 分页方式：client客户端分页，server服务端分页（*）
					pageNumber : 1, 							// 初始化加载第一页，默认第一页
					pageSize : 10, 								// 每页的记录行数（*）
					pageList : [10,30,50,80,100], 				// 可供选择的每页的行数（*）
					search : false, 							// 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
					showColumns : true, 						// 是否显示所有的列
					showRefresh : false, 						// 是否显示刷新按钮
					minimumCountColumns : 2, 					// 最少允许的列数
					clickToSelect : true, 						// 是否启用点击选中行
					height : 300, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
					showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
					cardView : false, 							// 是否显示详细视图
					detailView : false, 						// 是否显示父子表
					rowStyle: function (row, index) {
		                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
		                var strclass = "";
		                if (row.ackStatus.indexOf("已确认")!=-1) {
		                    strclass = 'danger';
		                }
		                return { classes: strclass }
		            },
					columns : [ 
						{
			                checkbox: true
			            },
						{
							field : 'alarmNumber',
							title : '告警序号'
						}, 
						{
							field : 'deviceName',
							title : '设备名称'
						},
						{
							field : 'alarmLevel',
							title : '告警级别'
						}, 
						{
							field : 'deviceId',
							title : '设备编号',
							visible : false
						},
						{
							field : 'alarmCode',
							title : '告警码',
							visible : false
						},
						{
							field : 'alarmDescription',
							title : '告警描述'
						},
						{
							field : 'alarmReason',
							title : '告警原因'
						},
						{
							field : 'recommendMeasure',
							title : '建议修复措施'
						}, 
						{
							field : 'alarmDetail',
							title : '告警详情'
						},
						{
							field : 'alarmHappenTime',
							title : '发生时间'
						},
						{
							field : 'alarmLastChangeTime',
							title : '最后更新时间'
						},
						{
							field : 'alarmAckStatus',
							title : '确认状态'
						},
						{
							field : 'alarmAckTime',
							title : '确认时间'
						},
						{
							field : 'alarmAckPerson',
							title : '确认人'
						} 
					]
				});
			};
			return initObject;
		};
		// ====================实时告警表格初始化结束=======================
		
		
		// ====================页面按钮初始化开始==========================
		function AlarmObject(type,orderNumber){
			this.alarmType = type;
			this.alarmOrderNumber = orderNumber;
		}
			
		var ButtonInit = function () {
		    var oInit = new Object();

		    oInit.Init = function () {
		        //确认告警
		        $("#btn_confirm").click(function(){
		        	//声明存储确认告警的对象
		    		var confirmAlarmDataArray = [];
		        	var selectRows = $('#realTimeAlarmTable').bootstrapTable('getSelections');
		        	for(var i=0;i<selectRows.length;i++){
		        		var confirmAlarmObj = new AlarmObject(2,selectRows[i].alarmNumber);
		        		confirmAlarmDataArray.push(confirmAlarmObj);
		        	}
		        	$.ajax({
						type: "POST",
						url: '<%=basePath%>realTimeAlarm/confirmRealTimeAlarm.do',
						dataType:"json",
						contentType:"application/json",
						data: JSON.stringify(confirmAlarmDataArray),
						success: function(data){
							for(var i=0;i<selectRows.length;i++){
					        	selectRows[i].alarmAckStatus='<span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;已确认';
					        	selectRows[i].alarmAckPerson=data;
					        	$('#realTimeAlarmTable').bootstrapTable('updateRow',{row: selectRows[i]});
							}
								
						}
					});
		        });
		        
		        //清除告警
				$("#btn_clear").click(function(){
					//声明存储清除告警的对象
		    		var clearAlarmDataArray = [];
		        	var selectRows = $('#realTimeAlarmTable').bootstrapTable('getSelections');
		        	if(selectRows.length <= 0){
		        		$.teninedialog({
		                    title:'操作提示',
		                    content:'<span style="font-size:15px;color:red;font-weight:bold;">请选择需要清除的告警！</span>'
		                });
		        		return;
		        	}else{
		        		//======清除的操作提示开始======
		        		$.teninedialog({
		                    title:'操作提示',
		                    content:'<span style="font-size:15px;color:red;font-weight:bold;">确认清除选中的告警?</span>',
		                    showCloseButton:false,
		                    otherButtons:["确定","取消"],
		                    otherButtonStyles:['btn-primary','btn-primary'],
		                    bootstrapModalOption:{keyboard: true},
		                    clickButton:function(sender,modal,index){
		                    	if(index==0){
		                    		$(this).closeDialog(modal);
		                    		for(var i=0;i<selectRows.length;i++){
		    			        		var clearAlarmObj = new AlarmObject(1,selectRows[i].alarmNumber);
		    			        		clearAlarmDataArray.push(clearAlarmObj);
		    			        	}
		    			        	$.ajax({
		    							type: "POST",
		    							url: '<%=basePath%>realTimeAlarm/clearRealTimeAlarm.do',
		    							dataType:"json",
		    	                        contentType:"application/json",
		    							data: JSON.stringify(clearAlarmDataArray),
		    							success: function(data){
		    								//循环删除需要清除的数据
		    								for(var i=0;i<selectRows.length;i++){
		    									for(var j=0;j<alarmDataArray.length;j++){
		    										if(selectRows[i].alarmNumber==alarmDataArray[j].alarmNumber){
		    											alarmDataArray.splice(j,1);
		    										}
		    									}	
		    					        	}
		    								$("#realTimeAlarmTable").bootstrapTable('load',alarmDataArray);
		    							}
		    						});
		                    	}else{
			                        $(this).closeDialog(modal);
		                    	}
		                    }
		                });
		        		//======清除的操作提示结束======
		        	}
		        });
		        
		    };
		    return oInit;
		};
		// ====================页面按钮初始化结束==========================
		
		
		// ==================订阅Mqtt监听实时告警消息开始===========================
		//自定义对象
		function RealTimeAlarmObject(no,source,equipName,severity,desc,cause,treatment,addition,raised_time,last_change_time,ack_time,ack_user){
			//告警序号
			this.alarmNumber = no;
			//告警名称
			this.deviceName = equipName;
			//告警级别
			if(severity=='critical'){
	            this.alarmLevel = '紧急告警';
			}else if(severity=='major'){
	            this.alarmLevel = '主要告警';
			}else if(severity=='minor'){
	            this.alarmLevel = '次要告警';
			}else if(severity=='warning'){
	            this.alarmLevel = '警告告警';
			}else if(severity=='indeterminate'){
	            this.alarmLevel = '通知告警';
			}
           	//设备编号
            this.deviceId = source;
           	//告警描述
            this.alarmDescription = desc;
           	//告警原因
            this.alarmReason = cause;
           	//建议修复措施
            this.recommendMeasure = treatment;
          	//告警详情
            this.alarmDetail = addition;
            this.alarmHappenTime = raised_time;
            this.alarmLastChangeTime = last_change_time;
            if(ack_time==''){
	            this.alarmAckStatus = '<span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;未确认';
            }else{
	            this.alarmAckStatus = '<span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;已确认';
            }
            this.alarmAckTime = ack_time;
            this.alarmAckPerson = ack_user;
		}
		
		//判断数组中是否有该数据
		function judgeCurrentAlarm(alarmArry,mqttObj){
		    
		    if(mqttObj.last_change_time=='' && mqttObj.cleared_time==''){
		    	return 'firstAlarm';
		    }else if(mqttObj.last_change_time!='' && mqttObj.cleared_time==''){
		    	return 'repeatAlarm';
		    }else if(mqttObj.cleared_time!=''){
		    	return 'clearAlarm';
		    }
		    
		}
		
		//启动Mqtt订阅消息
		function initMqttListener() {
			var ip = '192.168.1.153';
			var port = '8083';
			var clientId = 'RealTimeAlarmInfo';
			var topic = "/alarm/#";
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
				console.log("Mqtt 已经连接(onConnected)");
				client.subscribe(topic);
			}

			function onConnectionLost(responseObject) {
				if (responseObject.errorCode !== 0) {
					console.log("onConnectionLost:" + responseObject.errorMessage);
					console.log("Mqtt 连接已断开(Lost Connection)");
				}
			}

			function onMessageArrived(message) {
				var result = message.payloadString;
				console.log("Mqtt推送的消息:"+result);
				var mqttObj = JSON.parse(result);
				//自定义对象转换属性不一致的问题
				var realTimeAlarmObj = new RealTimeAlarmObject(mqttObj.no,mqttObj.source,mqttObj.equipName,
															mqttObj.severity,mqttObj.desc,mqttObj.cause,
															mqttObj.treatment,mqttObj.addition,mqttObj.raised_time,
															mqttObj.last_change_time,mqttObj.ack_time,mqttObj.ack_user);
				
				var returnStr = judgeCurrentAlarm(alarmDataArray,mqttObj);
				console.log("判断本次告警类型:"+returnStr);
				if(returnStr=='repeatAlarm'){
					for(var i=0;i<alarmDataArray.length;i++){
						if(mqttObj.no == alarmDataArray[i].orderNumber){
							alarmDataArray[i].happenTime = mqttObj.last_change_time;
							alarmDataArray[i].changeTime = mqttObj.last_change_time;
						}
					}
				}else if(returnStr=='firstAlarm'){
					alarmDataArray.unshift(realTimeAlarmObj);
				}else if(returnStr=='clearAlarm'){
					for(var i=0;i<alarmDataArray.length;i++){
						if(mqttObj.no==alarmDataArray[i].orderNumber){
							alarmDataArray.splice(i,1);
						}
					}
				}
				$("#realTimeAlarmTable").bootstrapTable('load',alarmDataArray);
			}
			
		}
		// ==================订阅Mqtt监听实时告警消息结束===========================
			
	</script>

</body>
</html>