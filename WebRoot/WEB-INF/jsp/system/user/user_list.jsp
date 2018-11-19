<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8" />
	<title>用户管理</title>
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
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/font-awesome.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-table.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-select.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/select2.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-datetimepicker.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/jquery-confirm.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/layuiadmin/layui/css/layui.css" media="all">
	<!-- JS -->
	<script type="text/javascript" src="static/js/jquery.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrapValidator.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="static/js/select2.min.js"></script>
	<script type="text/javascript" src="static/js/zh-CN.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<script type="text/javascript" src="static/js/jquery-confirm.min.js"></script>
	
</head>
<body>

	<table>
		<tr>
			<td>
				<div class="input-group" style="margin-left: 10px;margin-top: 10px;">
					<span class="input-group-addon">关键词</span>
					<input id="keywords" name="keywords" style="width: 120px;margin-right: 10px;height:38px;" type="text" placeholder="请输入关键字" class="form-control">
					<span class="input-group-addon">开始时间</span>
					<input id="lastLoginStart" name="lastLoginStart" type="text" style="width: 160px;margin-right: 10px;" placeholder="请选择开始时间" class="layui-input form-control">
					<span class="input-group-addon">结束时间</span>
					<input id="lastLoginEnd" name="lastLoginEnd" type="text" style="width: 160px;margin-right: 10px;" placeholder="请选择结束时间" class="layui-input form-control">
					<span class="input-group-addon">角色</span>
					<select id="listRoleId" name="ROLE_ID" class="form-control" style="width: 120px;height:38px;">
						
					</select>
				</div>
			</td>
			<td>
				<div class="input-group" style="margin-top:10px;margin-left:20px;">
					<span class="input-group-btn">
						<button class="btn btn-info" id="optionQueryUser">
							<i class="glyphicon glyphicon-search"></i>检索
						</button>
					</span>
			    </div>
			</td>
		</tr>
	</table>
	
	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group" style="margin-left: 10px;">  
	        <button class="btn btn-default" id="addButton" onclick="addSystemUserButton()">  
	            <i class="glyphicon glyphicon-plus"></i>添加
	        </button>
	        <button class="btn btn-default" id="updateButton" onclick="updateSystemUserButton()">  
	            <i class="glyphicon glyphicon-edit"></i>修改
	        </button> 
	        <button class="btn btn-default" id="deleteButton" onclick="deleteSystemUserButton()">  
	            <i class="glyphicon glyphicon-trash"></i>&nbsp;删除  
	        </button>
	    </div>  
	</div>
	
	<!-- 添加用户模态框 -->
	<div class="modal fade" id="addSystemUserModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">新增用户</span>
				</div>
				<div class="modal-body">
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">角色</span>
						<select id="addRoleId" name="ROLE_ID" class="form-control" style="width:200px;">
						</select>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">用户名</span>
						<input type="text" id="addLoginName" name="USERNAME" maxlength="32" placeholder="请输入用户名" title="用户名" class="form-control"  style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">昵称</span>
						<input type="text" id="addNickName" name="NICKNAME" maxlength="32" placeholder="请输入昵称" title="昵称" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">密码</span>
						<input type="password" id="addPassword" name="PASSWORD"  maxlength="32" placeholder="请输入密码" title="密码" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">确认密码</span>
						<input type="password" id="addChkpwd" name="chkpwd"  maxlength="32" placeholder="请确认密码" title="确认密码" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group">
						<span class="input-group-addon" style="width:100px;">备注</span>
						<input type="text" id="addBz" name="BZ" placeholder="请输入备注" title="备注" maxlength="64" class="form-control" style="width:200px;"/>
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addSystemUserData">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改用户模态框 -->
	<div class="modal fade" id="updateSystemUserModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:350px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改用户</span>
				</div>
				<div class="modal-body">
					<div class="input-group" style="margin-bottom:5px;display:none;">
						<span class="input-group-addon" style="width:100px;">用户ID</span>
						<input id="updateUserId" name="USER_ID" class="form-control" style="width:200px;" />
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">角色</span>
						<select id="updateRoleId" name="ROLE_ID" class="form-control" style="width:200px;">
						</select>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">用户名</span>
						<input type="text" id="updateLoginName" name="USERNAME" maxlength="32" placeholder="请输入用户名" title="用户名" class="form-control" readonly="readonly" style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">昵称</span>
						<input type="text" id="updateNickName" name="NICKNAME" maxlength="32" placeholder="请输入昵称" title="昵称" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">密码</span>
						<input type="password" id="updatePassword" name="PASSWORD"  maxlength="32" placeholder="请输入密码" title="密码" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group" style="margin-bottom:5px;">
						<span class="input-group-addon" style="width:100px;">确认密码</span>
						<input type="password" id="updateChkpwd" name="chkpwd"  maxlength="32" placeholder="请确认密码" title="确认密码" class="form-control" style="width:200px;"/>
					</div>
					<div class="input-group">
						<span class="input-group-addon" style="width:100px;">备注</span>
						<input type="text" id="updateBz" name="BZ" placeholder="请输入备注" title="备注" maxlength="64" class="form-control" style="width:200px;"/>
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateSystemUserData">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 选择导入excel的弹出框 -->
	<div id="importSystemUserModal" class="modal fade" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 弹出框头部 -->
				<div class="modal-header">
					<h5 class="modal-title">
						<span style="font-weight:bold;">导入用户</span>
					</h5>
				</div>
				<div class="modal-body">
					<input type="file" id="importSystemUser" name="importSystemUser">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						id="confirmImportSystemUser">确定</button>
					<button type="button" class="btn green" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 选择导出excel的弹出框 -->
	<div id="exportSystemUserModal" class="modal fade" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 弹出框头部 -->
				<div class="modal-header">
					<h5 class="modal-title">
						<span style="font-weight:bold;">提示</span>
					</h5>
				</div>
				<div class="modal-body">
					<span style="color:red;font-weight:bold;text-align:center;">确认导出用户数据吗?</span>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						id="confirmExportAlarmDatas">确定</button>
					<button type="button" class="btn green" data-dismiss="modal"
						id="cancelExportAlarmDatas">取消</button>
				</div>
			</div>
		</div>
	</div>  
	
	<table id="systermUserTable"></table>
	
	<script type="text/javascript" src="static/layuiadmin/layui/layui.js"></script>
	<script type="text/javascript" src="static/js/system/sysuser.js"></script>
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
		layui.config({
			base : 'static/layuiadmin/' //静态资源所在路径
		}).extend({
			index : 'lib/index' //主入口模块
		}).use([ 'index', 'laydate'],function(){
			var laydate = layui.laydate;
			laydate.render({
			  elem: '#lastLoginStart',
			  type: 'datetime'
			});
			laydate.render({
			  elem: '#lastLoginEnd',
			  type: 'datetime'
			});
		});
	</script>

</body>
</html>