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
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<!-- CSS -->
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/font-awesome.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-table.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-select.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/fileinput.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/jquery-confirm.min.css"/>
	<!-- JS -->
	<script type="text/javascript" src="static/js/jquery.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrapValidator.min.js"></script>
	<!-- 下拉选择框 -->
	<script type="text/javascript" src="static/js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="static/js/i18n/defaults-zh_CN.min.js"></script>
	<script type="text/javascript" src="static/js/echarts.min.js"></script>
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<script type="text/javascript" src="static/js/common/jquery.bootstrap.teninedialog.v3.js"></script>
	<script type="text/javascript" src="static/js/fileinput.js"></script>
	<script type="text/javascript" src="static/js/zh.js"></script>
	<script type="text/javascript" src="static/js/jquery-confirm.min.js"></script>

</head>
<body>
	<!-- 添加告警属性字段模态框 -->
	<div class="modal fade" id="addAlarmFieldConfigModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">添加告警属性</span>
				</div>
				<div class="modal-body">
					<div style="text-align:center;">
					<table style="margin:auto;">
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:100px;">告警类型</span>
									<select id="addAlarmTypeId" name="alarmTypeId" class="form-control" style="width:150px;">
										
									</select>
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:100px;">属性名称</span>
									<input type="text" id="addAlarmFieldName" name="alarmFieldName" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:100px;">属性表达式</span>
									<input type="text" id="addAlarmFieldAddition" name="alarmFieldAddition" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
					</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addAlarmFieldConfig">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改告警属性字段模态框 -->
	<div class="modal fade" id="updateAlarmFieldConfigModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改告警属性</span>
				</div>
				<div class="modal-body">
					<input type="text" id="updateId" name="id" class="form-control" style="display:none;">
					<div style="text-align:center;">
						<table style="margin:auto;">
							<tr>
								<td>
									<div class="input-group">
										<span class="input-group-addon" style="width:100px;">告警类型</span>
										<select id="updateAlarmTypeId" name="alarmTypeId" class="form-control" style="width:150px;">
										
										</select>
									</div>
								</td>
							</tr>
							<tr style="height:5px;"></tr>
							<tr>
								<td>
									<div class="input-group">
										<span class="input-group-addon" style="width:100px;">属性名称</span>
										<input type="text" id="updateAlarmFieldName" name="alarmFieldName" class="form-control" style="width:150px;">
									</div>
								</td>
							</tr>
							<tr style="height:5px;"></tr>
							<tr>
								<td>
									<div class="input-group">
										<span class="input-group-addon" style="width:100px;">属性表达式</span>
										<input type="text" id="updateAlarmFieldAddition" name="alarmFieldAddition" class="form-control" style="width:150px;">
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateAlarmFieldConfig">修改</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group">  
	        <button class="btn btn-default" data-toggle="modal" data-target="#addAlarmFieldConfigModal">  
	            <i class="glyphicon glyphicon-plus"></i>添加  
	        </button>
	        <button class="btn btn-default" onclick="updateSelectedAlarmFieldConfigs()">  
	            <i class="glyphicon glyphicon-edit"></i>修改  
	        </button>  
	        <button class="btn btn-default" onclick="deleteSelectedAlarmFieldConfigs()">  
	            <i class="glyphicon glyphicon-trash"></i>删除  
	        </button>
	    </div>  
	</div>  
	
	<!-- 告警属性配置Table -->
	<table id="alarmFieldConfigTable"></table>
	
	<!-- 引入JS文件 -->
	<script type="text/javascript" src="static/js/alarmFieldConfig/alarmFieldConfig.js"></script>

</body>
</html>