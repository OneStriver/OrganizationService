$(function(){
	//开始时间和结束时间日期显示
	$("#startDatetime").datetimepicker({
  	  	format: 'yyyy-mm-dd hh:ii:ss',
  	  	language: 'zh-CN',
  	  	autoclose:true
  	}).on("click",function(){
  		$("#startDatetime").datetimepicker("setEndDate",$("#endDatetime").val())
  	});
	
  	$("#endDatetime").datetimepicker({
  		format: 'yyyy-mm-dd hh:ii:ss',
  		language: 'zh-CN',
  		autoclose:true
  	}).on("click",function(){
  		$("#endDatetime").datetimepicker("setStartDate",$("#startDatetime").val())
  	});
	
  	//初始化查询条件数据
	initOptionData();
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	$("#optionQuery").click(function(){
		var t1 = $('#historyAlarmTable').bootstrapTable('getVisibleColumns');
		$('#historyAlarmTable').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10,url: 'historyAlarm/getOptionQueryAlarm.do'});
	});
	
	//============导出告警开始====================
	$("#exportAlarmLog").click(function(){
		window.location.href='historyAlarm/exportAlarm.do?'
							+'startDatetime='+$("#startDatetime").val()
							+'&endDatetime='+$("#endDatetime").val()
							+'&alarmLevel='+$("#alarmLevel").val()
							+'&deviceType='+$("#deviceType").val()
							+'&isConfirm='+$("#isConfirm").val()
							+'&isClear='+$("#isClear").val()
							+'&keyWord='+$("#keyWord").val()
							+'&exportTime='+$("#exportTime").val();
	});
	//============导出告警结束====================
	
	//============删除告警开始====================
	$("#deleteAlarmLog").click(function(){
		var optionParam = {
				deleteTime: $("#deleteTime").val()
    	};
		$.ajax({
			type: "GET",
			url: 'historyAlarm/deleteAlarm.do',
			dataType:"json",
			data: optionParam,
			success: function(data){
				$('#historyAlarmTable').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
		    	$('#historyAlarmTable').bootstrapTable('refresh', {url: 'historyAlarm/getOptionQueryAlarm.do'});
		    	getOptionHistoryAlarmChart();
				if(data=='0'){
					$.teninedialog({
	                    title:'操作提示',
	                    content:'<span style="font-size:15px;color:green;font-weight:bold;">删除告警成功！</span>'
	                });
				}else{
					$.teninedialog({
	                    title:'操作提示',
	                    content:'<span style="font-size:15px;color:red;font-weight:bold;">删除告警失败！</span>'
	                });
				}
			}
		});
	});
	//============删除告警结束====================
});

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#historyAlarmTable').bootstrapTable({
			url : 'historyAlarm/getOptionQueryAlarm.do',// 请求后台的URL（*）
			method : 'GET', 							// 请求方式（*）
			toolbar: '#toolbar',                		// 工具按钮用哪个容器
			striped : true, 							// 是否显示行间隔色
			cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, 							// 是否显示分页（*）
			sortable : false, 							// 是否启用排序
			sortOrder : "asc", 							// 排序方式
			dataType : "json",
			queryParamsType:'',
			queryParams : function (params) {
        		var temp = {   
    				pageNumber: params.pageNumber,
    				pageSize: params.pageSize,
		            startDatetime: $("#startDatetime").val(),
		            endDatetime: $("#endDatetime").val(),
		            alarmTypeId: $("#alarmTypeId").val(),
		            alarmSeverityId: $("#alarmSeverityId").val(),
		            deviceTypeId: $("#deviceTypeId").val(),
		            confirmAlarm: $("#confirmAlarm").val(),
		            clearAlarm: $("#clearAlarm").val()
            	};
    		    return temp;
            },
			sidePagination : "server", 					// 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, 							// 初始化加载第一页，默认第一页
			pageSize : 10, 								// 每页的记录行数（*）
			pageList : [10,30,50,80,100], 				// 可供选择的每页的行数（*）
			search : false, 							// 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			showColumns : true, 						// 是否显示所有的列
			showRefresh : false, 						// 是否显示刷新按钮
			minimumCountColumns : 2, 					// 最少允许的列数
			clickToSelect : true, 						// 是否启用点击选中行
			height : 480, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
			cardView : false, 							// 是否显示详细视图
			detailView : true, 							// 是否显示父子表
            onExpandRow: function (index, row, $detail) {
            	var parentSerialNumber = row.serialNumber;
            	var alarmTypeId = row.alarmTypeId;
            	//发送ajax获取动态列
            	var changeColumnFieldTitles = new Array();
            	var changeColumnKeys = new Array();
            	var alarmDataArray = [];
            	// 加载动态表格
            	$.ajax({
            		url : "historyAlarm/getHistoryAlarmBySerialNumber.do",
            		type : 'GET',
            		dataType : "json",
            		data:{
            			alarmTypeId:alarmTypeId,
            			parentSerialNumber:parentSerialNumber
            		},
            		async : false,
            		success : function(returnValue) {
            			for(var key in returnValue) { 
            				//缓存所有的键
            				changeColumnKeys.push(key);
            				//缓存所有的值
            				changeColumnFieldTitles.push({
            					"field" : key,
            					"title" : returnValue[key],
            					"align" : 'center'
            				});
                        }
            		}
            	});
            	var subHistoryAlarmTable = $detail.html('<table></table>').find('table');
            	$(subHistoryAlarmTable).bootstrapTable({
            		url : "#",
            		method : 'GET',
            		striped : true,
            		cache : false,
            		pagination : false,
            		sortable : false,
                    columns : changeColumnFieldTitles
            	});
            	$.ajax({
            		url : 'historyAlarm/getSubHistoryAlarm.do',
            		type : 'GET',
            		dataType : "json",
            		async : false,
            		data:{
            			parentSerialNumber:parentSerialNumber
            		},
            		success : function(returnValue) {
            			var subHistoryAlarm = new SubHistoryAlarm();
            			for(var key in returnValue) {
            				subHistoryAlarm[key]=returnValue[key];
                        }
            			alarmDataArray.push(subHistoryAlarm);
            			$(subHistoryAlarmTable).bootstrapTable("load",alarmDataArray);
            		}
            	});
            },
			columns : [ 
				{
					field : 'serialNumber',
					title : '告警序号',
					align : 'center'
				}, 
				{
					field : 'deviceTypeName',
					title : '设备名称',
					align : 'center'
				},
				{
					field : 'alarmTypeId',
					title : '告警类型ID'
				},
				{
					field : 'alarmTypeName',
					title : '告警类型',
					align : 'center'
				},
				{
					field : 'alarmSeverityName',
					title : '告警级别',
					align : 'center'
				}, 
				{
					field : 'alarmDescription',
					title : '告警描述',
					align : 'center'
				},
				{
					field : 'alarmCause',
					title : '告警原因',
					align : 'center'
				},
				{
					field : 'alarmTreatment',
					title : '建议修复措施',
					align : 'center'
				},
				{
					field : 'raisedTime',
					title : '发生时间',
					align : 'center'
				},
				{
					field : 'lastChangeTime',
					title : '最后更新时间',
					align : 'center'
				},
				{
					field : 'ackTime',
					title : '确认时间',
					align : 'center'
				},
				{
					field : 'ackUserName',
					title : '确认人',
					align : 'center'
				},
				{
					field : 'clearTime',
					title : '清除时间',
					align : 'center'
				}, 
				{
					field : 'clearUserName',
					title : '清除人',
					align : 'center'
				} 
			]
		});
	};
	return initObject;
};

//子表格对象
function SubHistoryAlarm(){
	
};

function getChangeColumn(alarmTypeId,parentSerialNumber){
	var changeColumns = new Array();
	// 加载动态表格
	$.ajax({
		url : "historyAlarm/getHistoryAlarmBySerialNumber.do",
		type : 'GET',
		dataType : "json",
		data:{
			alarmTypeId:alarmTypeId,
			parentSerialNumber:parentSerialNumber
		},
		async : false,
		success : function(returnValue) {
			// 异步获取要动态生成的列
			for(var key in returnValue) { 
                console.log("键：" + key + ",值 :"+ returnValue[key]);  
                changeColumns.push({
					"field" : key,
					"title" : returnValue[key],
					"align" : 'center'
				});
            }
		}
	});
	return changeColumns;
}

//================初始化查询条件数据结开始====================
function initOptionData() {
	var title	= ['请选择' ,'请选择' ,'请选择','请选择','请选择'];
	$.each(title , function(k , v) {
		title[k] = '<option value="">'+v+'</option>';
	});
	$('#alarmTypeId').append(title[0]);
	$('#alarmSeverityId').append(title[1]);
	$('#deviceTypeId').append(title[2]);
	$('#confirmAlarm').append(title[3]);
	$('#clearAlarm').append(title[4]);
	
	//加载告警类型
	$.ajax({
		type: "GET",
		url:'alarmFieldConfig/getAllAlarmType.do',
		success: function(data){
			$("#updateAlarmTypeId").empty();
			var appendStr = '';
			$.each(data,function(n,obj){
				appendStr += '<option value="'+obj.alarmTypeId+'">'+obj.alarmTypeName+'</option>';
			});
			$('#updateAlarmTypeId').append(appendStr);
		}
	});
	//加载告警等级数据
	$("#alarmSeverityId").append('<option value="1">紧急告警</option>');
	$("#alarmSeverityId").append('<option value="2">主要告警</option>');
	$("#alarmSeverityId").append('<option value="3">次要告警</option>');
	$("#alarmSeverityId").append('<option value="4">警告告警</option>');
	$("#alarmSeverityId").append('<option value="5">通知告警</option>');
	//加载设备类型数据
	$.ajax({
		type: "GET",
		url: 'historyAlarm/getDeviceType.do',
		success: function(data){
			var jsonObj = JSON.parse(data); 
			$.each(jsonObj,function(n,obj){
				var option	= '<option value="'+obj.deviceId+'">'+obj.deviceName+'</option>';
				$("#deviceTypeId").append(option);
			});
		}
	});
	//加载是否确认的数据
	$("#confirmAlarm").append('<option value="1">未确认</option>');
	$("#confirmAlarm").append('<option value="2">已确认</option>');
	//加载是否清除的数据
	$("#clearAlarm").append('<option value="1">未清除</option>');
	$("#clearAlarm").append('<option value="2">已清除</option>');
}
//================初始化查询条件数据结束====================

//================初始化图表数据开始=======================
function getOptionHistoryAlarmChart(){
	var myChart = echarts.init(document.getElementById('historyAlarmChart'));
    // 显示标题，图例和空的坐标轴
    myChart.setOption({
    	title : {
            text: '历史告警饼状图',
            left:'center',
            textStyle: {
                color: 'blue'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series : [
            {
                name: '历史告警',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]        
    });
    
  //数据加载完之前先显示一段简单的loading动画
    myChart.showLoading(); 
    //类别数组（用于存放饼图的类别）
    var names = []; 
    var showData = [];
    var optionParam = {
    		startDatetime: $("#startDatetime").val(),
            endDatetime: $("#endDatetime").val(),
            alarmLevel: $("#alarmLevel").val(),
            deviceType: $("#deviceType").val(),
            optionPieChart: $("#optionPieChart").val()
	};
    
    $.ajax({
        type: 'GET',
        url: 'historyAlarm/getOptionHistoryAlarmChart.do',
        data: optionParam,
        success: function (result) {
        	console.log('ajax返回的值:'+result);
        	var convertResult = JSON.parse(result);
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            $.each(convertResult, function (index, item) {
                names.push(item.chartShowName);    //挨个取出类别并填入类别数组 
                showData.push({
                    name: item.chartShowName,
                    value: item.charShowCount
                });
            });
            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({       //加载数据图表                
                legend: {                    
                    data: names
                },
                series: [{                    
                    data: showData
                }]
            });
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("饼状图请求数据失败!");
            myChart.hideLoading();
        }
    });
};	
//================初始化图表数据结束=======================