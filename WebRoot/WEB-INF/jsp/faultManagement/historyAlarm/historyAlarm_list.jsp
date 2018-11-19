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
	<link type="text/css" rel="stylesheet" href="static/css/select2.min.css"/>
	<!-- 时间选择控件 -->
	<link type="text/css" rel="stylesheet" href="static/css/bootstrap-datetimepicker.css"/>
	
	<!-- JS -->
	<script type="text/javascript" src="static/js/jquery.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrapValidator.min.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="static/js/select2.min.js"></script>
	<script type="text/javascript" src="static/js/zh-CN.js"></script>
	<script type="text/javascript" src="static/js/echarts.min.js"></script>
	<script type="text/javascript" src="static/js/common/jquery.bootstrap.teninedialog.v3.js"></script>
	<!-- 时间选择控件 -->
	<script type="text/javascript" src="static/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="static/js/bootstrap-datetimepicker.zh-CN.js"></script>

</head>
<body>
	<div style="border: 2px dotted green;padding:10px 10px 10px 10px;margin:10px 10px 0px 10px;text-align:center;">
		<table style="margin:auto;">
			<tr>
				<td>
					<div class="input-group">
						<span class="input-group-addon">开始时间</span>
						<input id="startDatetime" name="startDatetime" style="width:160px;margin-right:10px;" type="text" class="form-control">
						<span class="input-group-addon">告警类型</span>
						<select id="alarmTypeId" name="alarmTypeId" class="form-control" style="width:120px;margin-right:10px;">  
					          
					    </select>
					    <span class="input-group-addon">设备名称</span>
						<select id="deviceTypeId" name="deviceTypeId" class="form-control" style="width:120px;margin-right:10px;">
						
						</select>
						<span class="input-group-addon">确认告警</span>
						<select id="confirmAlarm" name="confirmAlarm" class="form-control" style="width:120px;margin-right:30px;">
						
						</select>
					</div>
				</td>
				<td rowspan="3">
					<button class="btn btn-info" id="optionQuery">条件查询</button>
				</td>
			</tr>
			<tr style="height:5px;"></tr>
			<tr>
				<td>
					<div class="input-group">
						<span class="input-group-addon">结束时间</span>
						<input id="endDatetime" name="endDatetime" type="text" class="form-control" style="width:160px;margin-right:10px;">
						<span class="input-group-addon">告警级别</span>
						<select id="alarmSeverityId" name="alarmSeverityId" class="form-control" style="width:120px;margin-right:10px;">
						
						</select>
						<span class="input-group-addon">清除告警</span>
						<select id="clearAlarm" name="clearAlarm" class="form-control" style="width:120px;margin-right:30px;">
						
						</select>
					</div>
				</td>
			</tr>
		</table>
	</div>
	
	<table id="historyAlarmTable"></table>
	
	<div id="toolbar" class="input-group">
        <span class="input-group">  
	        <span class="input-group-btn">  
	            <button id="exportAlarmLog" class="btn btn-info"><span class="glyphicon glyphicon-share"></span>导出告警</button>  
	        </span>
	        <span class="input-group-btn">  
	            <select id="exportTime" class="form-control" style="width:80px;">  
	                <option value="1">当前</option>  
	                <option value="2">全部</option>  
	            </select>  
	        </span>
	        <span style="margin-left: 50px;"></span>  
	        <span class="input-group-btn">  
	            <select id="deleteTime" class="form-control" style="width:110px;">  
	                <option value="1">一周前</option>  
	                <option value="2">一个月前</option>  
	                <option value="3">三个月前</option>  
	                <option value="4">全部</option>  
	            </select>  
	        </span>  
	        <span class="input-group-btn">  
	            <button id="deleteAlarmLog" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span>删除告警</button>  
	        </span>
	    </span> 
    </div>
    
	<script type="text/javascript" src="static/js/alarmManage/historyAlarm.js"></script>

</body>
</html>