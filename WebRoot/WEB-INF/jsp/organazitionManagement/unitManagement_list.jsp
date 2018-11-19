<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<meta charset="utf-8" />
		<title>单位管理</title>
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

	<!-- 缓存当前节点的ID -->
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
									<ul id="unitTree" class="ztree"></ul>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layui-col-md10">
				<table id="unitManageTable"></table>
			</div>
		</div>
    </div> 
    
    <!-- 
    <div class="ace-settings-container" id="ace-settings-container">
		<div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
			<i class="fa fa-cog" style="font-size:30px;"></i>
		</div>
		<div class="ace-settings-box clearfix" id="ace-settings-box" style="width:300px;height:98%;">
			<div class="pull-left">
				<div class="ace-settings-item">
					<div style="overflow:auto;width:100%;">
					<table>
						<tr>
							<td valign="top" bgcolor="#F9F9F9">
								<div>
									<ul id="unitTree" class="ztree"></ul>
								</div>
							</td>
						</tr>
					</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	 -->
	 
	<!-- 添加部队单位信息模态框 -->
	<div class="modal fade" id="addUnitManagementModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">添加单位信息</span>
				</div>
				<div class="modal-body">
					<table>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:110px;">直属单位名称</span>
									<input id="addUnitParentId" name="unitParentId" class="form-control" style="display:none;">
									<input id="addUnitParentName" name="unitParentName" class="form-control" style="width:150px;" placeholder="请选择">
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:110px;">单位名称</span>
									<input id="addUnitName" name="unitName" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addUnitManagementInfo">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 添加部队列表树形模态框 -->
	<div class="modal fade" id="addUnitTreeListModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:300px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">单位树形列表</span>
				</div>
				<div class="modal-body">
					<div style="overflow:auto;height:250px;">
						<table>
							<tr>
								<td valign="top" bgcolor="#F9F9F9">
									<div>
										<ul id="addUnitTreeListTree" class="ztree"></ul>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改部队单位信息模态框 -->
	<div class="modal fade" id="updateUnitManagementModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改单位信息</span>
				</div>
				<div class="modal-body">
					
					<table>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:110px;">直属单位名称</span>
									<input id="updateUnitParentId" name="unitParentId" class="form-control" style="display:none;">
									<input id="updateUnitParentName" name="unitParentName" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:10px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:110px;">单位名称</span>
									<input id="updateUnitId" name="unitId" class="form-control" style="display:none;">
									<input id="updateUnitName" name="unitName" class="form-control" style="width:150px;" readonly="readonly">
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateUnitManagementInfo">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改部队列表树形模态框 -->
	<div class="modal fade" id="updateUnitTreeListModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:300px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">单位树形列表</span>
				</div>
				<div class="modal-body">
					<div style="overflow:auto;height:350px;">
						<table>
							<tr>
								<td valign="top" bgcolor="#F9F9F9">
									<div>
										<ul id="updateUnitTreeListTree" class="ztree"></ul>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group">
	        <button class="btn btn-default" id="addButton" onclick="addUnitManagementInfoButton()">
	            <i class="glyphicon glyphicon-plus"></i>添加
	        </button>
	        <button class="btn btn-default" id="updateButton" onclick="updateUnitManagementInfoButton()">
	            <i class="glyphicon glyphicon-edit"></i>修改
	        </button>  
	        <button class="btn btn-default" id="deleteButton" onclick="deleteUnitManagementInfoButton()">
	            <i class="glyphicon glyphicon-trash"></i>删除  
	        </button>
	    </div>
	</div>
	
	<!-- ace scripts -->
	<script type="text/javascript" src="static/js/ace.min.js"></script>
	<script type="text/javascript" src="static/layuiadmin/layui/layui.js"></script>
	<script type="text/javascript" src="static/js/organizationManagement/unitManagement.js"></script>
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
			//
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
			$("#showcurrentNode").text(zTreeNodes[0].name);
	        $.fn.zTree.init($("#unitTree"), setting, zTreeNodes);
	        var treeObj = $.fn.zTree.getZTreeObj("unitTree");
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

