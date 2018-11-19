<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<meta charset="utf-8" />
		<title>人员管理</title>
	  	<meta name="renderer" content="webkit">
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="icon" href="favicon.ico" type="image/x-icon" />
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
									<ul id="forcePersonalTree" class="ztree"></ul>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layui-col-md10">
				<table id="forcePersonalTable"></table>
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
									<ul id="forcePersonalTree" class="ztree"></ul>
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
     
    <!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group">
	        <button class="btn btn-default" id="addButton" onclick="addTerminalUserInfoButton()">
	            <i class="glyphicon glyphicon-plus"></i>添加
	        </button>
	        <button class="btn btn-default" id="updateButton" onclick="updateTerminalUserInfoButton()">
	            <i class="glyphicon glyphicon-edit"></i>修改
	        </button>  
	        <button class="btn btn-default" id="deleteButton" onclick="deleteTerminalUserInfoButton()">
	            <i class="glyphicon glyphicon-trash"></i>删除  
	        </button>
	    </div>
	</div>
     
	<!-- ace scripts -->
	<script type="text/javascript" src="static/js/ace.min.js"></script>
	<script type="text/javascript" src="static/layuiadmin/layui/layui.js"></script>
	<script type="text/javascript" src="static/js/organizationManagement/personalManagement.js"></script>
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
			if(zTreeNodes[0].pId==0){
				$("#showcurrentNode").text("全部用户");
			}else{
				$("#showcurrentNode").text(zTreeNodes[0].name);
			}
	        $.fn.zTree.init($("#forcePersonalTree"), setting, zTreeNodes);
	        var treeObj = $.fn.zTree.getZTreeObj("forcePersonalTree");
			treeObj.expandAll(true);
		});
		layui.config({
			base : 'static/layuiadmin/' //静态资源所在路径
		}).extend({
			index : 'lib/index' //主入口模块
		}).use([ 'index', 'console' ]);
	</script>
	
</body>
</html>

