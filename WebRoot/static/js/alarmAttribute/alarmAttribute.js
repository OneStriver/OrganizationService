$(function(){
			
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	$('#addAlarmAttributeModal').on('show.bs.modal', function (e) {
		//发送请求获取设备类型
		$.ajax({
			type: "GET",
			url:'alarmAttribute/getDeviceType.do',
			success: function(data){
				$("#addDeviceTypeId").empty();
				var jsonObj = JSON.parse(data);
				var appendStr = '';
				$.each(jsonObj,function(n,obj){
					appendStr += '<option value="'+obj.deviceTypeId+'">'+obj.deviceTypeName+'</option>';
				});
				$('#addDeviceTypeId').append(appendStr);
			}
		});
		//发送请求获取告警类型
		$.ajax({
			type: "GET",
			url:'alarmAttribute/getAlarmType.do',
			success: function(data){
				$("#addAlarmTypeId").empty();
				var jsonObj = JSON.parse(data);
				var appendStr = '';
				$.each(jsonObj,function(n,obj){
					appendStr += '<option value="'+obj.alarmTypeId+'">'+obj.alarmTypeName+'</option>';
				});
				$('#addAlarmTypeId').append(appendStr);
			}
		});
		//发送请求获取告警级别
		$.ajax({
			type: "GET",
			url:'alarmAttribute/getAlarmSeverity.do',
			success: function(data){
				$("#addAlarmSeverityId").empty();
				var jsonObj = JSON.parse(data);
				var appendStr = '';
				$.each(jsonObj,function(n,obj){
					appendStr += '<option value="'+obj.alarmSeverityId+'">'+obj.alarmSeverityName+'</option>';
				});
				$('#addAlarmSeverityId').append(appendStr);
			}
		});
		//首先是清空之前填写的数据
		$("#addAlarmCode").val("");
		$("#addAlarmDescription").val("");
		$("#addAlarmCause").val("");
		$("#addAlarmTreatment").val("");
		$("#addAddition").val("");
		$("#addLimitStrategy").val("");
		$("#addPushStrategy").val("");
		$("#addAutoClearTimeout").val("");
	})
	
	//=========================添加告警属性====================	
	$("#addAlarmAttribute").click(function(){
		var addAlarmCodeValue = $("#addAlarmCode").val();
		var addAlarmCauseValue = $("#addAlarmCause").val();
		if(addAlarmCodeValue==null || addAlarmCodeValue==''){
			$("#addAlarmCode").tips({
                side:2,
                msg:'告警码不能为空！',
                time:2
            })
            return;
		}
		var regex= /^[0-9]*$/;
		var regexValue = regex.test(addAlarmCodeValue);
		if(!regexValue){
			$("#addAlarmCode").tips({
                side:2,
                msg:'告警码只能是数字！',
                time:2
            })
            return;
		}
		if(addAlarmCauseValue==null || addAlarmCauseValue==''){
			$("#addAlarmCause").tips({
                side:2,
                msg:'告警原因不能为空！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'alarmAttribute/saveAlarmAttribute.do',
			data:{
				deviceTypeId: $("#addDeviceTypeId").val(),
				alarmCode: addAlarmCodeValue,
				alarmTypeId: $("#addAlarmTypeId").val(),
				alarmSeverityId: $("#addAlarmSeverityId").val(),
				alarmDescription: $("#addAlarmDescription").val(),
				alarmCause: addAlarmCauseValue,
				alarmTreatment: $("#addAlarmTreatment").val(),
				addition: $("#addAddition").val(),
				limitStrategy: $("#addLimitStrategy").val(),
				pushStrategy: $("#addPushStrategy").val(),
				autoClearEnable: $("#addAutoClearEnable").val(),
				alarmSuppress: $("#addAlarmSuppress").val(),
				autoClearTimeout: $("#addAutoClearTimeout").val()
	    	},
			success: function(data){
				 $('#addAlarmAttributeModal').modal('hide');
				 $('#alarmAttributeTable').bootstrapTable('refresh', {url: 'alarmAttribute/listAlarmAttribute.do'});
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

	//====================修改告警属性================
	$("#updateAlarmAttribute").click(function(){
		var updateAlarmCodeValue = $("#updateAlarmCode").val();
		var updateAlarmCauseValue = $("#updateAlarmCause").val();
		if(updateAlarmCodeValue==null || updateAlarmCodeValue==''){
			$("#updateAlarmCode").tips({
                side:2,
                msg:'告警码不能为空！',
                time:2
            })
            return;
		}
		var regex= /^[0-9]*$/;
		var regexValue = regex.test(updateAlarmCodeValue);
		if(!regexValue){
			$("#updateAlarmCode").tips({
                side:2,
                msg:'告警码只能是数字！',
                time:2
            })
            return;
		}
		if(updateAlarmCauseValue==null || updateAlarmCauseValue==''){
			$("#updateAlarmCause").tips({
                side:2,
                msg:'告警原因不能为空！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'alarmAttribute/updateAlarmAttribute.do',
			data:{
				deviceTypeId: $("#updateDeviceTypeId").val(),
				alarmCode: updateAlarmCodeValue,
				alarmTypeId: $("#updateAlarmTypeId").val(),
				alarmSeverityId: $("#updateAlarmSeverityId").val(),
				alarmDescription: $("#updateAlarmDescription").val(),
				alarmCause: updateAlarmCauseValue,
				alarmTreatment: $("#updateAlarmTreatment").val(),
				addition: $("#updateAddition").val(),
				limitStrategy: $("#updateLimitStrategy").val(),
				pushStrategy: $("#updatePushStrategy").val(),
				autoClearEnable: $("#updateAutoClearEnable").val(),
				alarmSuppress: $("#updateAlarmSuppress").val(),
				autoClearTimeout: $("#updateAutoClearTimeout").val()
	    	},
			success: function(data){
				$('#updateAlarmAttributeModal').modal('hide');
				$('#alarmAttributeTable').bootstrapTable('refresh', {url: 'alarmAttribute/listAlarmAttribute.do'});
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
	
	initUploadAlarmDataFile('alarmDataFile','alarmAttribute/uploadAlarmDataZipPackage.do');
	$("#confirmAlarmDataFile").click(function(){
    	var uploadFileName = $("#alarmDataFile").val();
    	var fileExtension = uploadFileName.endsWith('.zip');
    	if(fileExtension){
    		$("#alarmDataFile").fileinput("upload");
    	}else{
    		$("#alarmDataFile").tips({
				side : 1,
				msg : '只能上传zip后缀的资源包',
				bg : '#68B500',
				time : 3
			});
    	}
    });
	
	$("#alarmDataFile").on("fileuploaded", function(event, data, previewId, index) {
        alert("上传成功!");
        $("#alarmDataImport").modal("hide");
        //重新刷新当前页面
        location = 'alarmAttribute/toAlarmDataPage.do';
    });
	
	$("#confirmExportAlarmDatas").click(function(){
		//关闭模态框
		 $('#exportAlarmDatas').modal('hide');
		window.location.href='alarmAttribute/exportAllAlarmDatas.do';
	});
	
});

function addAlarmAttributeButton(){
	//发送请求获取设备类型
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getDeviceType.do',
		success: function(data){
			$("#addDeviceTypeId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.deviceTypeId+'">'+obj.deviceTypeName+'</option>';
			});
			$('#addDeviceTypeId').append(appendStr);
		}
	});
	//发送请求获取告警类型
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getAlarmType.do',
		success: function(data){
			$("#addAlarmTypeId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.alarmTypeId+'">'+obj.alarmTypeName+'</option>';
			});
			$('#addAlarmTypeId').append(appendStr);
		}
	});
	//发送请求获取告警级别
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getAlarmSeverity.do',
		success: function(data){
			$("#addAlarmSeverityId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.alarmSeverityId+'">'+obj.alarmSeverityName+'</option>';
			});
			$('#addAlarmSeverityId').append(appendStr);
		}
	});
	$("#addAlarmCode").val("");
	$("#addAlarmDescription").val("");
	$("#addAlarmCause").val("");
	$("#addAlarmTreatment").val("");
	$("#addAddition").val("");
	$("#addLimitStrategy").val("");
	$("#addPushStrategy").val("");
	$("#addAutoClearTimeout").val("");
	$("#addAlarmAttributeModal").modal('show');
}


function updateAlarmAttributeButton(){
	var selectRowDatas = $("#alarmAttributeTable").bootstrapTable('getSelections');
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
	//发送请求获取设备类型
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getDeviceType.do',
		success: function(data){
			$("#updateDeviceTypeId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.deviceTypeId==selectRowDatas[0].deviceTypeId){
					appendStr += '<option value="'+obj.deviceTypeId+'" selected="selected">'+obj.deviceTypeName+'</option>';
				}else{
					appendStr += '<option value="'+obj.deviceTypeId+'">'+obj.deviceTypeName+'</option>';
				}
			});
			$('#updateDeviceTypeId').append(appendStr);
		}
	});
	//发送请求获取告警类型
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getAlarmType.do',
		success: function(data){
			$("#updateAlarmTypeId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.alarmTypeId==selectRowDatas[0].alarmTypeId){
					appendStr += '<option value="'+obj.alarmTypeId+'" selected="selected">'+obj.alarmTypeName+'</option>';
				}else{
					appendStr += '<option value="'+obj.alarmTypeId+'">'+obj.alarmTypeName+'</option>';
				}
			});
			$('#updateAlarmTypeId').append(appendStr);
		}
	});
	//发送请求获取告警级别
	$.ajax({
		type: "GET",
		url:'alarmAttribute/getAlarmSeverity.do',
		success: function(data){
			$("#updateAlarmSeverityId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.alarmSeverityId==selectRowDatas[0].alarmSeverityId){
					appendStr += '<option value="'+obj.alarmSeverityId+'" selected="selected">'+obj.alarmSeverityName+'</option>';
				}else{
					appendStr += '<option value="'+obj.alarmSeverityId+'">'+obj.alarmSeverityName+'</option>';
				}
			});
			$('#updateAlarmSeverityId').append(appendStr);
		}
	});
	//自动清除
	$("#updateAutoClearEnable option").each(function(){
		var tempValue = $(this).val();
		if(tempValue == selectRowDatas[0].autoClearEnable){
			$("#updateAutoClearEnable").val(tempValue);  	             
		}
	});
	//告警抑制
	$("#updateAlarmSuppress option").each(function(){
		var tempValue = $(this).val();
		if(tempValue == selectRowDatas[0].alarmSuppress){
			$("#updateAlarmSuppress").val(tempValue);  	             
		}
	});
	$("#updateAlarmCode").val(selectRowDatas[0].alarmCode);
	$("#updateAlarmDescription").val(selectRowDatas[0].alarmDescription);
	$("#updateAlarmCause").val(selectRowDatas[0].alarmCause);
	$("#updateAlarmTreatment").val(selectRowDatas[0].alarmTreatment);
	$("#updateAddition").val(selectRowDatas[0].addition);
	$("#updateLimitStrategy").val(selectRowDatas[0].limitStrategy);
	$("#updatePushStrategy").val(selectRowDatas[0].pushStrategy);
	$("#updateAutoClearTimeout").val(selectRowDatas[0].autoClearTimeout);
	//
	$("#updateAlarmAttributeModal").modal('show');
}

//============================删除多选的数据开始=====================
var deviceTypeIdArray = [];
var alarmCodeArray = [];
function deleteAttributeButton(){
	var selectRowDatas = $("#alarmAttributeTable").bootstrapTable('getSelections');
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
		deviceTypeIdArray.push(selectRowDatas[i].deviceTypeId);
		alarmCodeArray.push(selectRowDatas[i].alarmCode);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除选中的告警属性吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'alarmAttribute/deleteAlarmAttribute.do',
        				data: {"deviceTypeIds":deviceTypeIdArray,"alarmCodes":alarmCodeArray},
        				traditional: true,
        				success: function(data){
        					$('#alarmAttributeTable').bootstrapTable('refresh', {url: 'alarmAttribute/listAlarmAttribute.do'});
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

//======================开启告警抑制=====================
function openAlarmSuppression(){
	var openAlarmControlRows = [];
	var openAlarmControlObj;
	var selectControlRowDatas = $("#alarmAttributeTable").bootstrapTable('getSelections');
	if(selectControlRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要开启告警抑制的数据!',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectControlRowDatas.length;i++){
		openAlarmControlObj = {
				"deviceTypeId":selectControlRowDatas[i].deviceTypeId,
				"alarmCode":selectControlRowDatas[i].alarmCode
		};
		openAlarmControlRows.push(openAlarmControlObj);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;">确认开启选中告警属性的告警抑制吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'alarmAttribute/openAlarmSuppression.do',
        				dataType:"json",
        		        contentType:"application/json",
        				data: JSON.stringify(openAlarmControlRows),
        				success: function(data){
        					$('#alarmAttributeTable').bootstrapTable('refresh', {url: 'alarmAttribute/listAlarmAttribute.do'});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '开启告警抑制成功！',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">开启告警抑制失败！</span>',
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

//=====================关闭告警抑制=====================
function closeAlarmSuppression(){
	var closeAlarmControlRows = [];
	var closeAlarmControlObj;
	var selectControlRowDatas = $("#alarmAttributeTable").bootstrapTable('getSelections');
	if(selectControlRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要关闭告警抑制的数据!',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectControlRowDatas.length;i++){
		closeAlarmControlObj = {
				"deviceTypeId":selectControlRowDatas[i].deviceTypeId,
				"alarmCode":selectControlRowDatas[i].alarmCode
		};
		closeAlarmControlRows.push(closeAlarmControlObj);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;">确认关闭选中告警属性的告警抑制吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'alarmAttribute/closeAlarmSuppression.do',
        				dataType:"json",
        		        contentType:"application/json",
        				data: JSON.stringify(closeAlarmControlRows),
        				success: function(data){
        					$('#alarmAttributeTable').bootstrapTable('refresh', {url: 'alarmAttribute/listAlarmAttribute.do'});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '关闭告警抑制成功！',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">关闭告警抑制失败！</span>',
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

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#alarmAttributeTable').bootstrapTable({
			url : 'alarmAttribute/listAlarmAttribute.do', 	// 请求后台的URL（*）
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
			height : 550, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
			cardView : false, 							// 是否显示详细视图
			detailView : false, 						// 是否显示父子表
			columns : [
				{
					checkbox: true,  
					visible: true                  		// 是否显示复选框  
                },
                {
					field : 'deviceTypeId',
					title : '设备类型ID',
					visible: false,
					align : 'center'
				},
				{
					field : 'deviceTypeName',
					title : '设备类型',
					align : 'center'
				}, 
				{
					field : 'alarmCode',
					title : '告警码',
					align : 'center'
				},
				{
					field : 'alarmTypeId',
					title : '告警类型ID',
					visible: false,
					align : 'center'
				},
				{
					field : 'alarmTypeName',
					title : '告警类型',
					align : 'center'
				},
				{
					field : 'alarmSeverityId',
					title : '告警级别ID',
					visible: false,
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
					title : '建议处理方式',
					align : 'center'
				},
				{
					field : 'addition',
					title : '附加信息表达式',
					align : 'center'
				},
				{
					field : 'limitStrategy',
					title : '处理限制策略',
					align : 'center'
				},
				{
					field : 'pushStrategy',
					title : '推送限制策略',
					align : 'center'
				},
				{
					field : 'autoClearEnable',
					title : '自动清除',
					align : 'center',
					formatter : function (value, row, index) {
		                if (row.autoClearEnable == 1) {
		                    return '<span class="label label-success">开启</span>';
		                }
		                if (row.autoClearEnable == 0) {
		                    return '<span class="label label-danger">关闭</span>';
		                }
		            }
				},
				{
					field : 'autoClearTimeout',
					title : '自动清除时间(秒)',
					align : 'center'
				},
				{
					field : 'alarmSuppress',
					title : '告警抑制',
					align : 'center',
					formatter : function (value, row, index) {
		                if (row.alarmSuppress == 1) {
		                    return '<span class="label label-success">开启</span>';
		                }
		                if (row.alarmSuppress == 0) {
		                    return '<span class="label label-danger">关闭</span>';
		                }
		            }
				}
			]
		});
	};
	return initObject;
};

//================初始化模版导入的弹框===========================
function initUploadAlarmDataFile(controlName, uploadUrl) {
    var control = $('#' + controlName);
    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true, //默认异步上传
        showCaption: true,//是否显示标题
        showUpload: false, //是否显示上传按钮
        maxFileCount: 1,//最大上传文件数限制
        validateInitialCount:true,
        fileActionSettings: {
        	showRemove: false,
        	showUpload: false
        },
        browseClass: "btn btn-primary", //按钮样式
        allowedFileExtensions: [], //接收的文件后缀
        previewFileIcon: {
            'zip': '<i class="glyphicon glyphicon-file"></i>'
        },
        showPreview: false //是否显示预览
    });
}