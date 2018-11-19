$(function(){
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	//=========================添加按钮信息====================	
	$("#addMenuButtonRight").click(function(){
		var addObject = {
			roleId:$("#addButtonRoleId").val(),
			menuId:$("#addButtonMenuId").val(),
			buttonId:$("#addButtonListId").val()
		}
		$.ajax({
			type: "POST",
			url: 'buttonRight/saveMenuButtonRights.do',
			data: {
				addJsonStr:JSON.stringify(addObject)
			},
			success: function(data){
				 $('#addOperationButtonModal').modal('hide');
				 $('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+$("#currentNodeId").val()});
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
	
	//====================修改菜单按钮信息================
	$("#updateMenuButtonRight").click(function(){
		var updateObject = {
			id: $("#updateId").val(),
			roleId: $("#updateButtonRoleId").val(),
			menuId: $("#updateButtonMenuId").val(),
			buttonId: $("#updateButtonListId").val(),
			status: $("#updateStatus").val()
		}
		$.ajax({
			type: "POST",
			url: 'buttonRight/updateMenuButtonRights.do',
			data:{
				updateJsonStr:JSON.stringify(updateObject)
	    	},
			success: function(data){
				$('#updateOperationButtonModal').modal('hide');
				$('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+$("#currentNodeId").val()});
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
	
});
	
var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#buttonRightTable').bootstrapTable({
			url : 'buttonRight/listButtonRights.do', 	// 请求后台的URL（*）
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
			height : 480, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
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
					title : '序号',
					align : 'center',
					visible : false
				},
				{
					field : 'roleId',
					title : '角色ID',
					align : 'center',
					visible : false
				},
				{
					field : 'roleName',
					title : '角色名称',
					align : 'center'
				},
				{
					field : 'menuId',
					title : '菜单ID',
					align : 'center',
					visible : false
				},
				{
					field : 'menuName',
					title : '菜单名称',
					align : 'center'
				},
				{
					field : 'buttonId',
					title : '按钮ID',
					align : 'center',
					visible : false
				},
				{
					field : 'buttonName',
					title : '按钮名称',
					align : 'center'
				},
				{
					field : 'status',
					title : '状态',
					align : 'center',
					formatter : function (value, row, index) {
		                if (row.status == 1) {
		                    return '<span class="label label-success">开启</span>';
		                }
		                if (row.status == 0) {
		                    return '<span class="label label-danger">关闭</span>';
		                }
		            }
				}
			],
			
		});
	};
	return initObject;
};
 

function clickEveryTreeNode(event, treeId, treeNode) {
	$("#showcurrentNode").text(treeNode.name);
	$("#currentNodeId").val(treeNode.id);
	$('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+treeNode.id});
};

//======================添加菜单按钮信息===============
function addButtonRightMethod(){
	// 角色下拉列表
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllRoles.do',
		success: function(data){
			$("#addButtonRoleId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.ROLE_ID+'">'+obj.ROLE_NAME+'</option>';
			});
			$('#addButtonRoleId').append(appendStr);
		}
	});
	// 菜单下拉列表
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllNoSubMenuMenu.do',
		success: function(data){
			$("#addButtonMenuId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.MENU_ID+'">'+obj.MENU_NAME+'</option>';
			});
			$('#addButtonMenuId').append(appendStr);
		}
	});
	// 按钮下拉列表
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllSubMenuButton.do',
		success: function(data){
			$("#addButtonListId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.id+'">'+obj.name+'</option>';
			});
			$('#addButtonListId').append(appendStr);
		}
	});
	//
	$("#addOperationButtonModal").modal('show');
}

//======================修改菜单按钮信息===============
function updateButtonRightMethod(){
	var selectRowDatas = $("#buttonRightTable").bootstrapTable('getSelections');
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
	//发送请求获取角色名称
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllRoles.do',
		success: function(data){
			$("#updateButtonRoleId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.ROLE_ID==selectRowDatas[0].roleId){
					appendStr += '<option value="'+obj.ROLE_ID+'" selected="selected">'+obj.ROLE_NAME+'</option>';
				}else{
					appendStr += '<option value="'+obj.ROLE_ID+'">'+obj.ROLE_NAME+'</option>';
				}
			});
			$('#updateButtonRoleId').append(appendStr);
		}
	});
	//发送请求获取菜单列表
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllNoSubMenuMenu.do',
		success: function(data){
			$("#updateButtonMenuId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.MENU_ID==selectRowDatas[0].menuId){
					appendStr += '<option value="'+obj.MENU_ID+'" selected="selected">'+obj.MENU_NAME+'</option>';
				}else{
					appendStr += '<option value="'+obj.MENU_ID+'">'+obj.MENU_NAME+'</option>';
				}
			});
			$('#updateButtonMenuId').append(appendStr);
		}
	});
	//发送请求获取所有菜单按钮
	$.ajax({
		type: "GET",
		url:'buttonRight/listAllSubMenuButton.do',
		success: function(data){
			$("#updateButtonListId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.id==selectRowDatas[0].buttonId){
					appendStr += '<option value="'+obj.id+'" selected="selected">'+obj.name+'</option>';
				}else{
					appendStr += '<option value="'+obj.id+'">'+obj.name+'</option>';
				}
			});
			$('#updateButtonListId').append(appendStr);
		}
	});
	$("#updateId").val(selectRowDatas[0].id);
	$("#updateRoleId").val(selectRowDatas[0].roleId);
	$("#updateMenuId").val(selectRowDatas[0].menuId);
	$("#updateButtonId").val(selectRowDatas[0].buttonId);
	$("#updateStatus").val(selectRowDatas[0].status);
	//
	$("#updateOperationButtonModal").modal('show');
}

//============================删除菜单按钮信息=====================
function deleteButtonRightMethod(){
	var idsArray = [];
	var selectRowDatas = $("#buttonRightTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '<span style="font-size:14px;font-weight:bold;color:red;">请选择需要删除的数据!</span>',
		    buttons: {
                ok: {
                    text: "确定",
                    btnClass: 'btn-primary'
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectRowDatas.length;i++){
		idsArray.push(selectRowDatas[i].id);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除选中的数据吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'buttonRight/deleteMenuButtonRights.do',
        				traditional:true,
        		        data:{
        		        	selectIds:idsArray
        		        },
        				success: function(data){
        					$('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+$("#currentNodeId").val()});
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

//======================开启按钮权限=====================
var openButtonRightArray = [];
function openMenuButtonMethod(){
	var selectMenuButtonDatas = $("#buttonRightTable").bootstrapTable('getSelections');
	if(selectMenuButtonDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要开启按钮权限的数据!',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectMenuButtonDatas.length;i++){
		openButtonRightArray.push(selectMenuButtonDatas[i].id);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;">确认开启选中按钮的权限吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'buttonRight/openMenuButtonRights.do',
        				traditional:true,
        		        data:{
        		        	selectMenuButtonIds:openButtonRightArray
        		        },
        				success: function(data){
        					$('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+$("#currentNodeId").val()});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '开启按钮权限成功！',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">开启按钮权限失败！</span>',
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

//======================关闭按钮权限=====================
var closeButtonRightArray = [];
function closeMenuButtonMethod(){
	var selectMenuButtonDatas = $("#buttonRightTable").bootstrapTable('getSelections');
	if(selectMenuButtonDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '请选择需要关闭按钮权限的数据!',
		    buttons: {
                ok: {
                    text: "确定"
                }
		    }
		});
		return false;
	}
	for(var i=0;i<selectMenuButtonDatas.length;i++){
		closeButtonRightArray.push(selectMenuButtonDatas[i].id);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;">确认关闭选中按钮的权限吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'buttonRight/closeMenuButtonRights.do',
        				traditional:true,
        		        data:{
        		        	selectMenuButtonIds:closeButtonRightArray
        		        },
        				success: function(data){
        					$('#buttonRightTable').bootstrapTable('refresh', {url: 'buttonRight/listButtonRights.do?menuId='+$("#currentNodeId").val()});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '关闭按钮权限成功！',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">关闭按钮权限失败！</span>',
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
