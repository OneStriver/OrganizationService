$(function(){
	
	// 初始化Table
	var oTable = new TableInit();
	oTable.Init();
	
	initOptionQueryRole();
	
	//================添加系统用户=======================
	$("#addSystemUserData").click(function(){
		//判断输入的正确性
		if($("#addRoleId").val()==""){
			$("#addRoleId").tips({
				side:3,
	            msg:'请选择角色',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#addRoleId").focus();
			return false;
		}
		if($("#addLoginName").val()==""){
			$("#addLoginName").tips({
				side:3,
	            msg:'请输入用户名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#addLoginName").focus();
			return false;
		}
		if($("#addNickName").val()==""){
			$("#addNickName").tips({
				side:3,
	            msg:'请输入昵称',
	            bg:'#AE81FF',
	            time:3
	        });
			$("#addNickName").focus();
			return false;
		}
		if($("#addPassword").val()==""){
			$("#addPassword").tips({
				side:3,
	            msg:'请输入密码',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#addPassword").focus();
			return false;
		}
		if($("#addPassword").val()!=$("#addChkpwd").val()){
			$("#addChkpwd").tips({
				side:3,
	            msg:'两次输入的密码不相同',
	            bg:'#AE81FF',
	            time:3
	        });
			$("#addChkpwd").focus();
			return false;
		}
		$.ajax({
			type: "POST",
			url: 'user/saveSystemUserData.do',
			traditional: true,
			data:{
				ROLE_ID: $("#addRoleId").val(),
				USERNAME: $("#addLoginName").val(),
				NICKNAME: $("#addNickName").val(),
				PASSWORD: $("#addPassword").val(),
				BZ: $("#addBz").val()
	    	},
			success: function(data){
				$('#addSystemUserModal').modal('hide');
				$('#systermUserTable').bootstrapTable('refresh', {url: 'user/listUsers.do'});
				if(data=="0"){
					$.alert({
						title: '提示',
						content: '添加用户成功',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}else{
					$.alert({
						title: '提示',
						content: '<span style="font-weight:bold;color:red;">添加用户失败!</span>',
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
		
	//============================修改系统用户开始=====================
	$("#updateSystemUserData").click(function(){
		//判断输入的正确性
		if($("#updateRoleId").val()==""){
			$("#updateRoleId").tips({
				side:3,
	            msg:'请选择角色',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#updateRoleId").focus();
			return false;
		}
		if($("#updateLoginName").val()==""){
			$("#updateLoginName").tips({
				side:3,
	            msg:'请输入用户名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#updateLoginName").focus();
			return false;
		}
		if($("#updateNickName").val()==""){
			$("#updateNickName").tips({
				side:3,
	            msg:'请输入昵称',
	            bg:'#AE81FF',
	            time:3
	        });
			$("#updateNickName").focus();
			return false;
		}
		if($("#updatePassword").val()!=$("#updateChkpwd").val()){
			$("#updateChkpwd").tips({
				side:3,
	            msg:'两次输入的密码不相同',
	            bg:'#AE81FF',
	            time:3
	        });
			$("#updateChkpwd").focus();
			return false;
		}
		$.ajax({
			type: "POST",
			url: 'user/updateSystemUserData.do',
			traditional: true,
			data:{
				USER_ID: $("#updateUserId").val(),
				ROLE_ID: $("#updateRoleId").val(),
				USERNAME: $("#updateLoginName").val(),
				NICKNAME: $("#updateNickName").val(),
				PASSWORD: $("#updatePassword").val(),
				BZ: $("#updateBz").val()
	    	},
			success: function(data){
				$('#updateSystemUserModal').modal('hide');
				$('#systermUserTable').bootstrapTable('refresh', {url: 'user/listUsers.do'});
				if(data=="0"){
					$.alert({
						title: '提示',
						content: '修改用户成功',
						buttons: {
							ok: {
								text: "确定"
							}
						}
					});
				}else{
					$.alert({
						title: '提示',
						content: '<span style="font-weight:bold;color:red;">修改用户失败!</span>',
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
		
	//===============日历显示插件==============
	/*$("#lastLoginStart").datetimepicker({
  	  format: 'yyyy-mm-dd',
  	  minView: "month",
  	  language: 'zh-CN',
  	  autoclose:true,
  	}).on("click",function(){
  	  $("#lastLoginStart").datetimepicker("setEndDate",$("#lastLoginEnd").val())
  	});*/
	
  	/*$("#lastLoginEnd").datetimepicker({
  	  format: 'yyyy-mm-dd',
  	  minView: "month",
  	  language: 'zh-CN',
  	  autoclose:true,
  	}).on("click",function(){
  	  $("#lastLoginEnd").datetimepicker("setStartDate",$("#lastLoginStart").val())
  	});*/
  	
  	//============条件检索用户信息===================
  	$("#optionQueryUser").click(function(){
  		var lastLoginStartTime = $("#lastLoginStart").val();
  		var lastLoginEndTime = $("#lastLoginEnd").val();
		if(lastLoginStartTime=="" && lastLoginEndTime!=""){
			/*$("#lastLoginStart").tips({
				side:3,
	            msg:'请选择开始时间',
	            bg:'#AE81FF',
	            time:1
	        });*/
			$("#lastLoginStart").focus();
			return false;
		}
		if(lastLoginStartTime!="" && lastLoginEndTime==""){
			/*$("#lastLoginEnd").tips({
				side:3,
	            msg:'请选择结束时间',
	            bg:'#AE81FF',
	            time:1
	        });*/
			$("#lastLoginEnd").focus();
			return false;
		}
    	$('#systermUserTable').bootstrapTable('refresh', {url: 'user/listUsers.do'});
	});
	
});

//================添加系统用户=====================
function addSystemUserButton(){
	//发送请求获取所有的角色
	$.ajax({
		type: "GET",
		url: 'user/getAllUserRole.do',
		success: function(data){
			$("#addRoleId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.ROLE_ID+'">'+obj.ROLE_NAME+'</option>';
			});
			$('#addRoleId').append(appendStr);
		}
	});
	$("#addLoginName").val("");
	$("#addNickName").val("");
	$("#addPassword").val("");
	$("#addChkpwd").val("");
	$("#addBz").val("");
	$("#addSystemUserModal").modal('show');
}

//================修改系统用户=====================
function updateSystemUserButton(){
	var selectRowDatas = $("#systermUserTable").bootstrapTable('getSelections');
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
	//发送请求获取所有的角色
	$.ajax({
		type: "GET",
		url:'user/getAllUserRole.do',
		success: function(data){
			$("#updateRoleId").empty();
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				if(obj.ROLE_ID==selectRowDatas[0].ROLE_ID){
					appendStr += '<option value="'+obj.ROLE_ID+'" selected="selected">'+obj.ROLE_NAME+'</option>';
				}else{
					appendStr += '<option value="'+obj.ROLE_ID+'">'+obj.ROLE_NAME+'</option>';
				}
			});
			$('#updateRoleId').append(appendStr);
		}
	});
	$("#updateUserId").val(selectRowDatas[0].USER_ID);
	$("#updateLoginName").val(selectRowDatas[0].USERNAME);
	$("#updateNickName").val(selectRowDatas[0].NICKNAME);
	$("#updatePassword").val("");
	$("#updateChkpwd").val("");
	$("#updateBz").val(selectRowDatas[0].BZ);
	//打开修改用户的模态框
	$("#updateSystemUserModal").modal('show');
}

//================删除系统用户=====================
function deleteSystemUserButton(){
	var deleteSelectRows = [];
	var selectRowDatas = $("#systermUserTable").bootstrapTable('getSelections');
	if(selectRowDatas.length==0){
		$.alert({
		    title: '提示',
		    content: '<span style="font-size:14px;font-weight:bold;color:red;">请选择需要删除的用户!</span>',
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
		deleteSelectRows.push(selectRowDatas[i].USER_ID);
	}
	$.confirm({
        title: '<span style="font-size:14px;">提示</span>',
        content: '<span style="font-size:14px;font-weight:bold;color:red;">确认删除选中的用户吗?</span>',
        buttons: {
            ok: {
                text: "确定",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
        			$.ajax({
        				type: 'POST',
        				url: 'user/deleteSystemUserData.do',
        				data: {USER_IDS:deleteSelectRows},
        				traditional: true,
        				success: function(data){
        					$('#systermUserTable').bootstrapTable('refresh', {url: 'user/listUsers.do'});
        					if(data=="0"){
        						$.alert({
        							title: '提示',
        							content: '删除用户成功',
        							buttons: {
        								ok: {
        									text: "确定"
        								}
        							}
        						});
        					}else{
        						$.alert({
        							title: '提示',
        							content: '<span style="font-weight:bold;color:red;">删除用户失败!</span>',
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

//================初始化条件查询的角色====================
function initOptionQueryRole() {
	var title	= ['请选择'];
	$.each(title , function(k , v) {
		title[k] = '<option value="">'+v+'</option>';
	});
	$("#listRoleId").empty();
	$('#listRoleId').append(title[0]);
	//发送请求获取所有的角色
	$.ajax({
		type: "GET",
		url:'user/getAllUserRole.do',
		success: function(data){
			var jsonObj = JSON.parse(data);
			var appendStr = '';
			$.each(jsonObj,function(n,obj){
				appendStr += '<option value="'+obj.ROLE_ID+'">'+obj.ROLE_NAME+'</option>';
			});
			$('#listRoleId').append(appendStr);
		}
	});
}


var TableInit = function() {
	var initObject = new Object();
	// 初始化Table
	initObject.Init = function() {
		$('#systermUserTable').bootstrapTable({
			url : 'user/listUsers.do', 					// 请求后台的URL（*）
			method : 'GET', 							// 请求方式（*）
			toolbar: '#toolbar',                		// 工具按钮用哪个容器
			striped : true, 							// 是否显示行间隔色
			cache : false, 								// 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, 							// 是否显示分页（*）
			sortable : false, 							// 是否启用排序
			sortOrder : "asc", 							// 排序方式
			dataType : "json",
			queryParamsType : "",
			queryParams : function (params) {
        		var temp = {
    				pageNumber: params.pageNumber,
    				pageSize: params.pageSize,   
       				keywords: $("#keywords").val(),
       				lastLoginStart: $("#lastLoginStart").val(),
       				lastLoginEnd: $("#lastLoginEnd").val(),
       				ROLE_ID: $("#listRoleId").val()
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
					field : 'USER_ID',
					align : 'center',
					halign : 'center',
					title : '用户ID',
					visible : false
				},
				{
					field : 'ROLE_ID',
					align : 'center',
					halign : 'center',
					title : '角色ID',
					visible : false
				},
				{
					field : 'USERNAME',
					align : 'center',
					halign : 'center',
					title : '用户名'
				}, 
				{
					field : 'NICKNAME',
					align : 'center',
					halign : 'center',
					title : '昵称'
				}, 
				{
					field : 'ROLENAME',
					align : 'center',
					halign : 'center',
					title : '角色'
				},
				{
					field : 'PASSWORD',
					align : 'center',
					halign : 'center',
					title : '密码',
					visible : false
				},
				{
					field : 'LAST_LOGIN',
					align : 'center',
					halign : 'center',
					title : '最后登陆时间'
				},
				{
					field : 'IP',
					align : 'center',
					halign : 'center',
					title : 'IP地址'
				},
				{
					field : 'BZ',
					align : 'center',
					halign : 'center',
					title : '备注'
				}
			]
		});
	};
	return initObject;
};