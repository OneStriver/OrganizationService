<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8" />
	<title>角色管理</title>
	<meta name="renderer" content="webkit">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<!-- CSS -->
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/font-awesome.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-table.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-select.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/select2.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/zTree_v3/css/metroStyle/metroStyle.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/jquery-confirm.min.css"/>
	<!-- JS -->
	<script type="text/javascript" src="static/js/jquery.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrapValidator.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="static/js/select2.min.js"></script>
	<script type="text/javascript" src="static/js/zh-CN.js"></script>
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<script type="text/javascript" src="static/zTree_v3/js/jquery.ztree.all.js"></script>
	<script type="text/javascript" src="static/js/jquery-confirm.min.js"></script>
</head>

<body>

	<!-- (管理员)菜单权限模态框 -->
	<div class="modal fade" id="menuQxModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">权限管理</span>
				</div>
				
				<div class="modal-body">
					<div style="overflow: scroll; scrolling: yes;height:300px;width: 310px;">
						<ul id="menuQxTree" class="ztree" style="overflow:auto;"></ul>
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="setUpRoleMenuQx">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 单个角色菜单权限模态框 -->
	<div class="modal fade" id="singleRoleMenuQxModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">权限管理</span>
				</div>
				
				<div class="modal-body">
					<div style="overflow: scroll; scrolling: yes;height:300px;width: 310px;">
						<ul id="singleRoleMenuQxTree" class="ztree" style="overflow:auto;"></ul>
					</div>
					<input type="hidden" id="singleHiddenRoleId"/>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="setUpSingleRoleMenuQx()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 添加角色模态框 -->
	<div class="modal fade" id="addRoleDataModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:230px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">新增角色</span>
				</div>
				
				<div class="modal-body">
					<div class="input-group" style="margin-top: 10px;">
						<span class="input-group-addon" style="width:80px;">角色名</span>
						<input id="addRoleName" name="ROLE_NAME" style="width:120px;" type="text" placeholder="请输入角色名" class="form-control">
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addRoleData">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改角色模态框 -->
	<div class="modal fade" id="updateRoleDataModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:230px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改角色</span>
				</div>
				
				<div class="modal-body">
					<div class="input-group" style="margin-top: 10px;">
						<span class="input-group-addon" style="width:80px;">角色名</span>
						<input id="updateRoleName" name="ROLE_NAME" style="width:120px;" type="text" placeholder="请输入角色名" class="form-control">
					</div>
					<input type="hidden" id="updateSingleHiddenRoleId"/>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateRoleData">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 操作按钮 -->
	<div id="toolbar">
	    <div class="btn-group" style="margin-left:10px;">
	       <button class="btn btn-default" id="addButton" onclick="addRoleInfoMethod()">  
	           <i class="glyphicon glyphicon-plus"></i>添加  
	       </button>  
	       <button class="btn btn-default" id="updateButton" onclick="updateRoleInfoMethod()">  
	           <i class="glyphicon glyphicon-edit"></i>修改  
	       </button>  
	       <button class="btn btn-default" id="deleteButton" onclick="deleteRoleInfoMethod()">  
	           <i class="glyphicon glyphicon-trash"></i>&nbsp;删除  
	       </button>
	       <c:if test="${loginRoleId==1}">
		       <button class="btn btn-default" id="superManagerButton" onclick="viewSuperManageMenuQx(${loginRoleId})">
		           <i class="glyphicon glyphicon-leaf"></i>&nbsp;超级管理员权限  
		       </button>  
	       </c:if>
	       <c:if test="${loginRoleId==2}">
		       <button class="btn btn-default" id="normalManagerButton" onclick="viewNormalManageMenuQx(${loginRoleId})">
		           <i class="glyphicon glyphicon-leaf"></i>&nbsp;普通管理员权限  
		       </button>  
	       </c:if>  
	    </div>  
	</div>	
	
	<table id="roleQxTable"></table>
	
	<script type="text/javascript" src="static/js/system/sysrole.js"></script>
	<script type="text/javascript">
	$(function(){
		//控制按钮的显示和隐藏
		var reveivedButtonList = ${buttonList};
		var currentPageButtonList = eval(reveivedButtonList);
		if(currentPageButtonList!=null && currentPageButtonList.length>0){
			$.each(currentPageButtonList, function(index,object){ 
		        if(object.buttonId==1 && object.status==0){
		        	$("#addButton").css('display','none');
		        }
		        if(object.buttonId==3 && object.status==0){
		        	$("#updateButton").css('display','none');
		        }
		        if(object.buttonId==5 && object.status==0){
		        	$("#deleteButton").css('display','none');
		        }
		    });
		}
	});
	</script>

</body>
</html>