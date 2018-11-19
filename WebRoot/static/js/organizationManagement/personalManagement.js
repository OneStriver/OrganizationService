$(function(){
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	/*
	显示或隐藏某一列  showColumn hideColumn
	$('#forcePersonalTable').bootstrapTable('hideColumn', 'unitName');
	*/
});

var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#forcePersonalTable').bootstrapTable({
			url : 'personalManagement/optionQueryTerminalUserInfo.do',	// 请求后台的URL（*）
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
					field : 'unitId',
					title : '序号',
					align : 'center',
					visible : false
				}, 
				{
					field : 'unitName',
					title : '所属单位名称',
					align : 'center'
				},
				{
					field : 'imsi',
					title : '用户识别码(IMSI)',
					align : 'center'
				},
				{
					field : 'mdn',
					title : '电话号码(MDN)',
					align : 'center'
				},
				{
					field : 'esn',
					title : '电子序列号(ESN)',
					align : 'center'
				},
				{
					field : 'deviceType',
					title : '设备名称ID',
					align : 'center',
					visible : false
				},
				{
					field : 'deviceTypeName',
					title : '设备名称',
					align : 'center'
				},
				{
					field : 'msVocodec',
					title : '语音编码ID',
					align : 'center',
					visible : false
				},
				{
					field : 'msVocodecName',
					title : '语音编码',
					align : 'center'
				},
				{
					field : 'mscAddr',
					title : 'MSC地址',
					align : 'center'
				},
				{
					field : 'gateWayAddr',
					title : '网关地址',
					align : 'center'
				},
				{
					field : 'acountNum',
					title : '保密编号',
					align : 'center'
				},
				{
					field : 'status',
					title : '用户状态',
					align : 'center',
					formatter : function(value,row,index){
						if(value==0){
							return '离线';
						}else if(value==1){
							return '在线';
						}
					}
				},
				{
					field : 'lastUpdateTime',
					title : '最后更新时间',
					align : 'center'
				}
				
			]
		});
	};
	return initObject;
};

function clickEveryTreeNode(event, treeId, treeNode) {
	if(treeNode.pId==0){
		$("#showcurrentNode").text("全部人员");
	}else{
		$("#showcurrentNode").text(treeNode.name);
	}
	$("#currentNodeId").val(treeNode.id);
    $('#forcePersonalTable').bootstrapTable('refresh',{
    	url: 'personalManagement/optionQueryTerminalUserInfo.do',
    	query: {
    		unitId: treeNode.id,
			unitName: treeNode.name
    	}
    });
};
