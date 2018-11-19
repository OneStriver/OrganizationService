$(function(){
	
	$('#addAlarmFieldConfigModal').on('show.bs.modal', function (e) {
		//首先是清空之前填写的数据
		$("#addAlarmFieldName").val("");
		$("#addAlarmFieldAddition").val("");
		$.ajax({
			type: "GET",
			url:'alarmFieldConfig/getAllAlarmType.do',
			success: function(data){
				$("#addAlarmTypeId").empty();
				var appendStr = '';
				$.each(data,function(n,obj){
					appendStr += '<option value="'+obj.alarmTypeId+'">'+obj.alarmTypeName+'</option>';
				});
				$('#addAlarmTypeId').append(appendStr);
			}
		});
	})
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
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	//=========================添加开始====================	
	$("#addAlarmFieldConfig").click(function(){
		var addAlarmTypeIdValue = $("#addAlarmTypeId").val();
		var addAlarmFieldNameValue = $("#addAlarmFieldName").val();
		var addAlarmFieldAdditionValue = $("#addAlarmFieldAddition").val();
		if(addAlarmFieldNameValue==null || addAlarmFieldNameValue==''){
			$("#addAlarmFieldName").tips({
                side:2,
                msg:'属性名称不能为空！',
                time:2
            })
            return;
		}
		if(addAlarmFieldAdditionValue==null || addAlarmFieldAdditionValue==''){
			$("#addAlarmFieldAddition").tips({
                side:2,
                msg:'属性表达式不能为空！',
                time:2
            })
            return;
		}
		var regex= /^{[a-zA-Z0-9]*}$/;
		var regexValue = regex.test(addAlarmFieldAdditionValue);
		if(!regexValue){
			$("#addAlarmFieldAddition").tips({
                side:2,
                msg:'格式不对,格式为{字母和数字}！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'alarmFieldConfig/saveAlarmFieldConfig.do',
			data:{
				alarmTypeId: addAlarmTypeIdValue,
				alarmFieldName: addAlarmFieldNameValue,
				alarmFieldAddition: addAlarmFieldAdditionValue
			},
			success: function(data){
				$('#addAlarmFieldConfigModal').modal('hide');
				$('#alarmFieldConfigTable').bootstrapTable('refresh', {url: 'alarmFieldConfig/getAlarmFieldConfig.do'});
				if(data=="0"){
					$.alert({
						title: '提示',
						content: '添加成功！',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}else{
					$.alert({
						title: '提示',
						content: '<span style="font-weight:bold;color:red;">添加失败！</span>',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}
			}
		});
    });	
	//=========================添加结束====================	

	//============================修改开始=================
	$("#updateAlarmFieldConfig").click(function(){
		var updateAlarmTypeIdValue = $("#updateAlarmTypeId").val();
		var updateAlarmFieldNameValue = $("#updateAlarmFieldName").val();
		var updateAlarmFieldAdditionValue = $("#updateAlarmFieldAddition").val();
		if(updateAlarmFieldNameValue==null || updateAlarmFieldNameValue==''){
			$("#updateAlarmFieldName").tips({
                side:2,
                msg:'属性名称不能为空！',
                time:2
            })
            return;
		}
		if(updateAlarmFieldAdditionValue==null || updateAlarmFieldAdditionValue==''){
			$("#updateAlarmFieldAddition").tips({
                side:2,
                msg:'属性表达式不能为空！',
                time:2
            })
            return;
		}
		var regex= /^{[a-zA-Z0-9]*}$/;
		var regexValue = regex.test(updateAlarmFieldAdditionValue);
		if(!regexValue){
			$("#updateAlarmFieldAddition").tips({
                side:2,
                msg:'格式不对,格式为{字母和数字}！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'alarmFieldConfig/updateAlarmFieldConfig.do',
			data:{
				id: $("#updateId").val(),
				alarmTypeId: $("#updateAlarmTypeId").val(),
				alarmFieldName: $("#updateAlarmFieldName").val(),
				alarmFieldAddition: $("#updateAlarmFieldAddition").val()
	    	},
			success: function(data){
				$('#updateAlarmFieldConfigModal').modal('hide');
				$('#alarmFieldConfigTable').bootstrapTable('refresh', {url: 'alarmFieldConfig/getAlarmFieldConfig.do'});
				if(data=="0"){
					$.alert({
						title: '提示',
						content: '修改成功！',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}else{
					$.alert({
						title: '提示',
						content: '<span style="font-weight:bold;color:red;">修改失败！</span>',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}
			}
		});
	});
	//===========================修改结束===================
	
});

function updateSelectedAlarmFieldConfigs(){
	var selectRowDatas = $("#alarmFieldConfigTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要修改的数据！',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}else if(selectRowDatas.length>1){
		$.alert({
		    title: '提示',
		    content: '每次只能修改一行！',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	$("#updateAlarmFieldConfigModal").modal('show');
	$("#updateId").val(selectRowDatas[0].id);
	$("#updateAlarmTypeId option").each(function(){
		var tempValue = $(this).val();
		console.log("-----------------"+tempValue);
		if(tempValue == selectRowDatas[0].alarmTypeId){
			$("#updateAlarmTypeId").val(tempValue);  	             
		}
	});
	$("#updateAlarmFieldName").val(selectRowDatas[0].alarmFieldName);
	$("#updateAlarmFieldAddition").val(selectRowDatas[0].alarmFieldAddition);
}

//============================删除多选的数据开始===============
var sendSelectRows = [];
function deleteSelectedAlarmFieldConfigs(){
	var selectRowDatas = $("#alarmFieldConfigTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要删除的数据!',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectRowDatas.length;i++){
		sendSelectRows.push(selectRowDatas[i].id);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除选中的告警数据吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'alarmFieldConfig/deleteAlarmFieldConfig.do',
        				data: {"sendSelectRows":sendSelectRows},
        				traditional: true,
        				success: function(data){
        					$('#alarmFieldConfigTable').bootstrapTable('refresh', {url: 'alarmFieldConfig/getAlarmFieldConfig.do'});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '删除成功！',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">删除失败！</span>',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}
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
//===========================删除多选的数据结束=========================

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#alarmFieldConfigTable').bootstrapTable({
			url : 'alarmFieldConfig/getAlarmFieldConfig.do', 									// 请求后台的URL（*）
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
    				pageSize: params.pageSize
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
					field : 'id',
					title : '主键Id',
					visible: false,
					align : 'center'
				},
				{
					field : 'alarmTypeId',
					title : '告警类型Id',
					visible: false,
					align : 'center'
				},
				{
					field : 'alarmTypeName',
					title : '告警类型',
					align : 'center'
				},
				{
					field : 'alarmFieldName',
					title : '属性名称',
					align : 'center'
				},
				{
					field : 'alarmFieldAddition',
					title : '属性表达式',
					align : 'center'
				}
			]
		});
	};
	return initObject;
};
