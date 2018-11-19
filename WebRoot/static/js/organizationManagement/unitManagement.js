$(function(){
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	//=========================添加单位信息====================	
	$("#addUnitManagementInfo").click(function(){
		var addUnitParentNameValue = $("#addUnitParentName").val();
		if(addUnitParentNameValue==null || addUnitParentNameValue==''){
			$("#addUnitParentName").tips({
                side:2,
                msg:'直属单位名称不能为空！',
                time:2
            })
            return;
		}
		var addUnitNameValue = $("#addUnitName").val();
		if(addUnitNameValue==null || addUnitNameValue==''){
			$("#addUnitName").tips({
                side:2,
                msg:'单位名称不能为空！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'unitManagement/addUnitManagementInfo.do',
			data:{
				unitParentId: $("#addUnitParentId").val(),
				unitName: $("#addUnitName").val()
	    	},
			success: function(data){
				 $('#addUnitManagementModal').modal('hide');
				 $('#unitManageTable').bootstrapTable('refresh', {url: 'unitManagement/listAllSubUnitInfo.do?unitParentId='+$("#currentNodeId").val()});
				 flushAllTreeNodeInfo();
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
	
	//====================修改单位信息================
	$("#updateUnitManagementInfo").click(function(){
		var updateUnitParentNameValue = $("#updateUnitParentName").val();
		if(updateUnitParentNameValue==null || updateUnitParentNameValue==''){
			$("#updateUnitParentName").tips({
                side:2,
                msg:'直属单位名称不能为空！',
                time:2
            })
            return;
		}
		var updateUnitNameValue = $("#updateUnitName").val();
		if(updateUnitNameValue==null || updateUnitNameValue==''){
			$("#updateUnitName").tips({
                side:2,
                msg:'单位名称不能为空！',
                time:2
            })
            return;
		}
		$.ajax({
			type: "POST",
			url: 'unitManagement/updateUnitManagementInfo.do',
			data:{
				unitParentId: $("#updateUnitParentId").val(), 	
				unitId: $("#updateUnitId").val(),
				unitName: $("#updateUnitName").val()
	    	},
			success: function(data){
				$('#updateUnitManagementModal').modal('hide');
				$('#unitManageTable').bootstrapTable('refresh', {url: 'unitManagement/listAllSubUnitInfo.do?unitParentId='+$("#currentNodeId").val()});
				flushAllTreeNodeInfo();
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
	
	//添加单位展示属性菜单
	$("#addUnitParentName").click(function(){
		initAddUnitTreeListInfo();
		$("#addUnitTreeListModal").modal('show');
	});
	
	//修改单位展示属性菜单
	$("#updateUnitParentName").click(function(){
		initUpdateUnitTreeListInfo();
		$("#updateUnitTreeListModal").modal('show');
	});
	
});

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#unitManageTable').bootstrapTable({
			url : 'unitManagement/listAllSubUnitInfo.do',	// 请求后台的URL（*）
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
					field : 'unitId',
					title : '序号',
					align : 'center',
					visible : false
				}, 
				{
					field : 'unitName',
					title : '单位名称',
					align : 'center'
				},
				{
					field : 'unitParentId',
					title : '直属单位ID',
					align : 'center',
					visible : false
				},
				{
					field : 'unitParentName',
					title : '直属单位名称',
					align : 'center'
				},
				{
					field : 'unitOrder',
					title : '顺序号',
					align : 'center'
				}
			]
		});
	};
	return initObject;
};

function clickEveryTreeNode(event, treeId, treeNode) {
	$("#showcurrentNode").text(treeNode.name);
	$("#currentNodeId").val(treeNode.id);
    $('#unitManageTable').bootstrapTable('refresh', {url: 'unitManagement/listAllSubUnitInfo.do?unitParentId='+treeNode.id});
};

//======================添加单位信息===============
function addUnitManagementInfoButton(){
	//清空已选择的选项
	$("#addUnitParentId").val("");
	$("#addUnitParentName").val("");
	$("#addUnitName").val("");
	$("#addUnitManagementModal").modal('show');
}

//======================修改单位信息===============
function updateUnitManagementInfoButton(){
	var selectRowDatas = $("#unitManageTable").bootstrapTable('getSelections');
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
	$("#updateUnitParentId").val(selectRowDatas[0].unitParentId);
	$("#updateUnitParentName").val(selectRowDatas[0].unitParentName);
	$("#updateUnitId").val(selectRowDatas[0].unitId);
	$("#updateUnitName").val(selectRowDatas[0].unitName);
	$("#updateUnitManagementModal").modal('show');
}

//============================删除多选的单位信息=====================
function deleteUnitManagementInfoButton(){
	var unitIdsArray = [];
	var selectRowDatas = $("#unitManageTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '<span style="font-size:14px;font-weight:bold;color:red;">请选择需要删除的单位数据!</span>',
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
		unitIdsArray.push(selectRowDatas[i].unitId);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除选中的单位信息吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'unitManagement/deleteUnitManagementInfo.do',
        				dataType:"json",
        				data: {"unitIds":unitIdsArray},
        				traditional:true,
        				success: function(data){
        					$('#unitManageTable').bootstrapTable('refresh', {url: 'unitManagement/listAllSubUnitInfo.do?unitParentId='+$("#currentNodeId").val()});
        					flushAllTreeNodeInfo();
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

//================刷新树形节点======================
function flushAllTreeNodeInfo(){
	$.ajax({
		type: "GET",
		url: 'unitManagement/listUnitInfoAndSubUnitInfoJson.do',
		success: function(data){
			var setting = {
					showLine: true,
					check: {
						enable: false
					},
					view: {
						fontCss: {'font-weight':'bold'}
					},
					callback: {
						onClick: clickEveryTreeNode
					}
			};
			var zTreeNodes = eval(data);
			$.fn.zTree.init($("#unitTree"), setting, zTreeNodes);
			var treeObj = $.fn.zTree.getZTreeObj("unitTree");
			treeObj.expandAll(true);
		}
	});
}

//================添加用户信息单位属性的展示=========================
function initAddUnitTreeListInfo(){
	$.ajax({
		type: "GET",
		url: 'unitManagement/listUnitInfoAndSubUnitInfoJson.do',
		success: function(data){
			var setting = {
					showLine: true,
					check: {
						enable: false
					},
					view: {
						dblClickExpand: false,
						fontCss: {'font-weight':'bold'}
					},
					callback: {
						onClick: addSingleClickCheckNode
					}
			};
			var zTreeNodes = eval(data);
			$.fn.zTree.init($("#addUnitTreeListTree"), setting, zTreeNodes);
			var treeObj = $.fn.zTree.getZTreeObj("addUnitTreeListTree");
			treeObj.expandAll(true);
		}
	});
}

function addSingleClickCheckNode(event, treeId, treeNode) {
	if(treeNode.pId==0){
		$("#addUnitParentName").val("无");
	}else{
		$("#addUnitParentName").val(treeNode.name);
	}
	$("#addUnitParentId").val(treeNode.id);
	$("#addUnitTreeListModal").modal('hide');
};

//================修改用户信息单位属性的展示=========================
function initUpdateUnitTreeListInfo(){
	$.ajax({
		type: "GET",
		url: 'unitManagement/listUnitInfoAndSubUnitInfoJson.do',
		success: function(data){
			var setting = {
					showLine: true,
					check: {
						enable: false
					},
					view: {
						dblClickExpand: false,
						fontCss: {'font-weight':'bold'}
					},
					callback: {
						onClick: updateSingleClickCheckNode
					}
			};
			var zTreeNodes = eval(data);
			$.fn.zTree.init($("#updateUnitTreeListTree"), setting, zTreeNodes);
			var treeObj = $.fn.zTree.getZTreeObj("updateUnitTreeListTree");
			treeObj.expandAll(true);
		}
	});
}

function updateSingleClickCheckNode(event, treeId, treeNode) {
	//父节点
	$("#updateUnitParentId").val(treeNode.id);
	if(treeNode.pId==0){
		$("#updateUnitParentName").val("无");
	}else{
		$("#updateUnitParentName").val(treeNode.name);
	}
	$("#updateUnitTreeListModal").modal('hide');
};

