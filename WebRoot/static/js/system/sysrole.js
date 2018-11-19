$(function(){
	

	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	//============================保存管理员选择的菜单权限开始=====================
	$("#setUpRoleMenuQx").click(function(){
		var treeObj = $.fn.zTree.getZTreeObj("menuQxTree");
        	nodes = treeObj.getCheckedNodes(true);
		var tempNode;
		var ids = "";
		for(var i=0; i<nodes.length; i++){
			tempNode = nodes[i];
			if(i!=nodes.length-1){
				ids += tempNode.id+",";
			}else{
				ids += tempNode.id;
			}
		}
		$.ajax({
			type: "POST",
			url: 'role/saveMenuQx.do',
			traditional: true,
			data:{
				ROLE_ID: "2",
				menuIds: ids
	    	},
			success: function(data){
				$('#menuQxModal').modal('hide');
				$('#roleQxTable').bootstrapTable('refresh', {url: 'role/listRoles.do'});
				$.alert({
				    title: '提示',
				    content: data,
				    buttons: {
	                    ok: {
	                        btnClass: 'btn-primary',
	                        text: "确定"
	                    }
				    }
				});
			}
		});
	});
	
	//===========================添加角色开始(在普通管理员下面)==========================	
	$("#addRoleData").click(function(){
		$.ajax({
			type: "POST",
			url: 'role/saveRoleData.do',
			traditional: true,
			data:{
				PARENT_ID: "2",
				ROLE_NAME: $("#addRoleName").val()
	    	},
			success: function(data){
				$('#addRoleDataModal').modal('hide');
				$('#roleQxTable').bootstrapTable('refresh', {url: 'role/listRoles.do'});
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
	
	//============================修改角色开始========================
	$("#updateRoleData").click(function(){
		$.ajax({
			type: "POST",
			url: 'role/updateRoleData.do',
			traditional: true,
			data:{
				ROLE_ID: $("#updateSingleHiddenRoleId").val(),
				ROLE_NAME: $("#updateRoleName").val()
	    	},
			success: function(data){
				$('#updateRoleDataModal').modal('hide');
				$('#roleQxTable').bootstrapTable('refresh', {url: 'role/listRoles.do'});
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

// 查看超级管理员权限
function viewSuperManageMenuQx(param){
	$.ajax({
		type: "GET",
		url: 'role/listMenuQx.do',
		data:{
			ROLE_ID: param,
    	},
		success: function(data){
			var setting = {
			    showLine: true,
			    check: {
					enable: true
				}
			};
			var allTreeNodes = eval(data.zTreeNodes);
	        $.fn.zTree.init($("#menuQxTree"), setting, allTreeNodes);
		}
	});
	$("#menuQxModal").modal('show');
}

//查看普通管理员权限
function viewNormalManageMenuQx(param){
	$.ajax({
		type: "GET",
		url: 'role/listMenuQx.do',
		data:{
			ROLE_ID: param,
    	},
		success: function(data){
			var setting = {
			    showLine: true,
			    check: {
					enable: true
				}
			};
			var allTreeNodes = eval(data.zTreeNodes);
	        $.fn.zTree.init($("#menuQxTree"), setting, allTreeNodes);
		}
	});
	$("#menuQxModal").modal('show');
}

var singleRolezTree;
//==========================每一个角色菜单权限确定开始===================	
function setUpSingleRoleMenuQx(){
	var treeObj = $.fn.zTree.getZTreeObj("singleRoleMenuQxTree");
		nodes = treeObj.getCheckedNodes(true);
	var tempNode;
	var ids = "";
	for(var i=0; i<nodes.length; i++){
		tempNode = nodes[i];
		if(i!=nodes.length-1){
			ids += tempNode.id+",";
		}else{
			ids += tempNode.id;
		}
	}
	$.ajax({
		type: "POST",
		url: 'role/saveMenuQx.do',
		traditional: true,
		data:{
			ROLE_ID: $("#singleHiddenRoleId").val(),
			menuIds: ids
    	},
		success: function(data){
			$('#singleRoleMenuQxModal').modal('hide');
			$('#roleQxTable').bootstrapTable('refresh', {url: 'role/listRoles.do'});
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

function operateFormatter(value, row, index) {
    return [
    '<button id="roleMenuPermission" type="button" class="btn btn-info  btn-sm" style="margin-right:10px;">菜单权限</button>'
    ].join('');
}
window.operateEvents = {
	'click #roleMenuPermission': function (e, value, row, index) {
		//给输入框赋值
		$("#singleHiddenRoleId").val(row.ROLE_ID);
		$.ajax({
			type: "GET",
			url: 'role/listMenuQx.do',
			data:{
				ROLE_ID: row.ROLE_ID,
	    	},
			success: function(data){
				var setting = {
				    showLine: true,
				    check: {
						enable: true
					}
				};
				var allTreeNodes = eval(data.zTreeNodes);
		        $.fn.zTree.init($("#singleRoleMenuQxTree"), setting, allTreeNodes);
			}
		});
		$("#singleRoleMenuQxModal").modal('show');
 	}
};	
	
var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#roleQxTable').bootstrapTable({
			url : 'role/listRoles.do', 					// 请求后台的URL（*）
			method : 'GET', 							// 请求方式（*）
			toolbar: '#toolbar',                		// 工具按钮用哪个容器
			striped : true, 							// 是否显示行间隔色
			cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, 						// 是否显示分页（*）
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
			search : false, 								// 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			showColumns : true, 						// 是否显示所有的列
			showRefresh : false, 						// 是否显示刷新按钮
			minimumCountColumns : 2, 					// 最少允许的列数
			clickToSelect : true, 						// 是否启用点击选中行
			height : 300, 								// 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			showToggle : true, 							// 是否显示详细视图和列表视图的切换按钮
			cardView : false, 							// 是否显示详细视图
			detailView : false, 						// 是否显示父子表
			columns : [
				{
                    checkbox: true,  
                    visible: true                  		// 是否显示复选框  
                },
                {
					field : 'ROLE_ID',
					title : '角色ID',
					align : 'center',
					halign : 'center',
					visible : false
				},
				{
					field : 'ROLE_NAME',
					align : 'center',
					halign : 'center',
					title : '角色'
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

//======================添加角色信息===============
function addRoleInfoMethod(){
	$("#addRoleName").val("");
	$("#addRoleDataModal").modal('show');
}

//======================修改角色信息===============
function updateRoleInfoMethod(){
	var selectRowDatas = $("#roleQxTable").bootstrapTable('getSelections');
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
	$("#updateSingleHiddenRoleId").val(selectRowDatas[0].ROLE_ID);
	$("#updateRoleName").val(selectRowDatas[0].ROLE_NAME);
	//
	$("#updateRoleDataModal").modal('show');
}

//============================删除角色信息=====================
function deleteRoleInfoMethod(){
	var roleIdsArray = [];
	var selectRowDatas = $("#roleQxTable").bootstrapTable('getSelections');
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
		roleIdsArray.push(selectRowDatas[i].ROLE_ID);
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
        				url: 'role/deleteCurrentRoleData.do',
        				traditional:true,
        		        data:{
        		        	selectIds:roleIdsArray
        		        },
        				success: function(data){
        					$('#roleQxTable').bootstrapTable('refresh', {url: 'role/listRoles.do'});
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

