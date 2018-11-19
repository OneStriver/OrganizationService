$(function() {
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	//日历显示
	/*
	$("#lastStart").datetimepicker({
  	  format: 'yyyy-mm-dd',
  	  minView: "month",
  	  language: 'zh-CN',
  	  autoclose:true,
  	}).on("click",function(){
  	  $("#lastStart").datetimepicker("setEndDate",$("#lastEnd").val())
  	});
	
  	$("#lastEnd").datetimepicker({
  	  format: 'yyyy-mm-dd',
  	  minView: "month",
  	  language: 'zh-CN',
  	  autoclose:true,
  	}).on("click",function(){
  	  $("#lastEnd").datetimepicker("setStartDate",$("#lastStart").val())
  	});
  	*/
	
  	//============条件检索用户信息===================
  	$("#optionQueryLogRecord").click(function(){
  		var lastStartTime = $("#lastStart").val();
  		var lastEndTime = $("#lastEnd").val();
		if(lastStartTime=="" && lastEndTime!=""){
			/*$("#lastStart").tips({
				side:3,
	            msg:'请选择开始时间',
	            bg:'#AE81FF',
	            time:1
	        });*/
			$("#lastStart").focus();
			return false;
		}
		if(lastStartTime!="" && lastEndTime==""){
			/*$("#lastEnd").tips({
				side:3,
	            msg:'请选择结束时间',
	            bg:'#AE81FF',
	            time:1
	        });*/
			$("#lastEnd").focus();
			return false;
		}
  		$('#operationLogRecordTable').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
    	$('#operationLogRecordTable').bootstrapTable('refresh', {url: 'fhlog/listLogs.do'});
	});
  	
   //============导出日志数据开始====================
	$("#exportLogRecord").click(function(){
		window.location.href='fhlog/exportAllLogRecords.do';
	});
	//============导出日志数据结束====================
	
});

//============================删除多条日志数据开始=====================
function deleteSelectLogRecords(){
	var selectRowDatas = $("#operationLogRecordTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '<span style="font-size:14px;font-weight:bold;color:red;">请选择需要批量删除的日志记录!</span>',
		    buttons: {
                ok: {
                    text: "确定",
                    btnClass: 'btn-primary'
                }
		    }
		});
		return false;
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认批量删除选中的日志数据吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
                	var deleteSelectRows = [];
        			for(var i=0;i<selectRowDatas.length;i++){
        				deleteSelectRows.push(selectRowDatas[i].FHLOG_ID);
        			}
        			$.ajax({
        				type: 'POST',
        				url: 'fhlog/deleteSelectLogRecords.do',
        				data: {DATA_IDS:deleteSelectRows},
        				traditional: true,
        				success: function(data){
        					$('#operationLogRecordTable').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
        					$('#operationLogRecordTable').bootstrapTable('refresh', {url: 'fhlog/listLogs.do'});
        					$.alert({
        					    title: '提示',
        					    content: data,
        					    buttons: {
        		                    ok: {
        		                        text: "确定",
        		                        btnClass: 'btn-primary'
        		                    }
        					    }
        					});
        				}
        			});
                }
            },
            cancel: {
                text: "取消",
                btnClass: 'btn-default',
                keys: ['esc'],
                action:function () {
                	
                }
            }
        }
    });
}
//===========================删除多条日志数据结束=========================


//表格中行数据的按钮
function operateFormatter(value, row, index) {
    return [
    '<button id="deleteLogRecord" type="button" class="btn btn-info  btn-sm">删除</button>'
    ].join('');
}
window.operateEvents = {
    'click #deleteLogRecord': function (e, value, row, index) {
    	$.confirm({
            title: '<span style="font-size:14px;">提示</span>',
            content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除当前日志数据吗?</span>',
            buttons: {
                ok: {
                    text: "确定",
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function(){
                    	var deleteSingleData = [];
        				deleteSingleData.push(row.code);
                    	$.ajax({
            				type: 'POST',
            				url: 'fhlog/deleteCurrentLogRecord.do',
            				data: {FHLOG_ID:row.FHLOG_ID},
            				traditional: true,
            				success: function(data){
            					$('#operationLogRecordTable').bootstrapTable('refresh', {url: 'fhlog/listLogs.do'});
            					$.alert({
            					    title: '提示',
            					    content: data,
            					    buttons: {
            		                    ok: {
            		                        text: "确定",
            		                        btnClass: 'btn-primary'
            		                    }
            					    }
            					});
            				}
            			});
                    }
                },
                cancel: {
                    text: "取消",
                    btnClass: 'btn-default',
                    keys: ['esc'],
                    action:function () {
                    	
                    }
                }
            }
        });
 	}
};	
//=========================初始化表格开始==============================
var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#operationLogRecordTable').bootstrapTable({
			url : 'fhlog/listLogs.do', 	// 请求后台的URL（*）
			height : 1000,
			method : 'GET', 							// 请求方式（*）
			toolbar: '#toolbar',                		// 工具按钮用哪个容器
			striped : true, 							// 是否显示行间隔色
			cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, 							// 是否显示分页（*）
			sortable : false, 							// 是否启用排序
			sortOrder : "asc", 							// 排序方式
			dataType : "json",
			queryParamsType : "",
			queryParams : function (params) {
        		var temp = {
    				pageNumber: params.pageNumber,
    				pageSize: params.pageSize,   
       				keywords: $("#keywords").val(),
       				lastStart: $("#lastStart").val(),
       				lastEnd: $("#lastEnd").val()
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
			height : 500, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
			cardView : false, 							// 是否显示详细视图
			detailView : false, 						// 是否显示父子表
			columns : [
				{
                    checkbox: true,  
                    visible: true                  		// 是否显示复选框  
                },
                {
					field : 'FHLOG_ID',
					align : 'center',
					halign : 'center',
					title : '日志ID',
					visible : false
				},
				{
					field : 'USERNAME',
					align : 'center',
					halign : 'center',
					title : '用户名'
				},
				{
					field : 'CONTENT',
					align : 'center',
					halign : 'center',
					title : '事件'
				},
				{
					field : 'CZTIME',
					align : 'center',
					halign : 'center',
					title : '操作时间'
				}, 
				{
					field : 'operation',
					align : 'center',
					halign : 'center',
					title : '操作',
					events: operateEvents,
	                formatter: operateFormatter
				}
			]
		});
	};
	return initObject;
};
//=========================初始化表格结束==============================

//导出excel
function toExcel(){
	window.location.href='fhlog/excel.do';
}