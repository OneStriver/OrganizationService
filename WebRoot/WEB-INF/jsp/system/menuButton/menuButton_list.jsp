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
		<title>菜单按钮管理</title>
	  	<meta name="renderer" content="webkit">
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="icon" href="favicon.ico" type="image/x-icon" />
		<style type="text/css">
		input[readonly] {
			background-color: gray;
		}
		</style>
		<!-- CSS -->
		<link type="text/css" rel="stylesheet" href="static/zTree_v3/css/metroStyle/metroStyle.css"/>
		<link type="text/css" rel="stylesheet" href="static/css/bootstrap.min.css"/>
		<link type="text/css" rel="stylesheet" href="static/css/font-awesome.css"/>
		<link type="text/css" rel="stylesheet" href="static/css/bootstrap-table.min.css"/>
		<link type="text/css" rel="stylesheet" href="static/layuiadmin/layui/css/layui.css" media="all">
  		<link type="text/css" rel="stylesheet" href="static/layuiadmin/style/admin.css" media="all">
  		<link type="text/css" rel="stylesheet" href="static/css/jquery-confirm.min.css">
		<link type="text/css" rel="stylesheet" href="static/css/sideBarMenu.css"/>
		<!-- JS -->
		<script type="text/javascript" src="static/zTree_v3/js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="static/zTree_v3/js/jquery.ztree.all.min.js"></script>
		<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
		<script type="text/javascript" src="static/js/jquery-confirm.min.js"></script>
		<script type="text/javascript" src="static/js/jquery.tips.js"></script>
		<script type="text/javascript" src="static/js/common/jquery.bootstrap.teninedialog.v3.js"></script>
	</head>
<body>
	
	<!-- 添加操作按钮信息模态框 -->
	<div class="modal fade" id="addOperationButtonModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">添加菜单按钮信息</span>
				</div>
				<div class="modal-body">
					<table>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">角色名称</span>
									<select id="addButtonRoleId" name="roleId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">菜单名称</span>
									<select id="addButtonMenuId" name="menuId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">按钮列表</span>
									<select id="addButtonListId" name="buttonId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addMenuButtonRight">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 修改操作按钮信息模态框 -->
	<div class="modal fade" id="updateOperationButtonModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改菜单按钮信息</span>
				</div>
				<div class="modal-body">
					<input style="display:none;" id="updateId">
					<input style="display:none;" id="updateStatus">
					<table>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">角色名称</span>
									<select id="updateButtonRoleId" name="roleId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">菜单名称</span>
									<select id="updateButtonMenuId" name="menuId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon">按钮列表</span>
									<select id="updateButtonListId" name="buttonId" class="form-control" style="width:120px;margin-right:10px;">  
								          
								    </select>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateMenuButtonRight">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 缓存当前菜单节点的ID -->
	<input style="display:none;" id="currentNodeId">
	<div class="layui-fluid">
	    <div class="layui-row layui-col-space15">
			<div class="layui-col-md2">
				<div style="text-align:center;">
					<span style="font-size:15px;font-weight:bold;color:red;text-align:center;">当前节点:</span>
					<span id="showcurrentNode" style="font-size:15px;font-weight:bold;color:red;"></span>
				</div>
				<div style="overflow:auto;">
					<table>
						<tr>
							<td valign="top" bgcolor="#F9F9F9">
								<div>
									<ul id="menuButtonTree" class="ztree"></ul>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layui-col-md10">
				<table id="buttonRightTable"></table>
			</div>
		</div>
    </div> 
	
	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group">
	    	<c:if test="${roleId==1}">
	   			<button class="btn btn-default" onclick="addButtonRightMethod()">
		            <i class="glyphicon glyphicon-plus"></i>添加
		        </button>
		        <button class="btn btn-default" onclick="updateButtonRightMethod()">
		            <i class="glyphicon glyphicon-edit"></i>修改
		        </button> 
		        <button class="btn btn-default" onclick="deleteButtonRightMethod()">
		            <i class="glyphicon glyphicon-trash"></i>删除  
		        </button>
	    	</c:if>
	        <button class="btn btn-default" onclick="openMenuButtonMethod()">
	            <i class="glyphicon glyphicon-folder-open"></i>&nbsp;开启按钮权限
	        </button>
	        <button class="btn btn-default" onclick="closeMenuButtonMethod()">
	            <i class="glyphicon glyphicon-folder-close"></i>&nbsp;关闭按钮权限
	        </button>
	    </div>
	</div>
	
	<!-- ace scripts -->
	<script type="text/javascript" src="static/js/ace.min.js"></script>
	<script type="text/javascript" src="static/layuiadmin/layui/layui.js"></script>
	<script type="text/javascript" src="static/js/system/sysButtonRight.js"></script>
	<script type="text/javascript">
		$(function(){
			//属性结构展示
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
			var getzTreeNodes = ${zTreeNodes};
			var zTreeNodes = eval(getzTreeNodes);
			$("#showcurrentNode").text("未选择");
	        $.fn.zTree.init($("#menuButtonTree"), setting, zTreeNodes);
	        var treeObj = $.fn.zTree.getZTreeObj("menuButtonTree");
			treeObj.expandAll(true);
		});
		layui.config({
			base : 'static/layuiadmin/' //静态资源所在路径
		}).extend({
			index : 'lib/index' //主入口模块
		}).use([ 'index', 'console']);
	</script>
	
</body>
</html>