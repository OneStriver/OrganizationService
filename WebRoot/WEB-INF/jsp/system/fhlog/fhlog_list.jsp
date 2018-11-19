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
	<title>日志管理</title>
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
					<input id="lastStart" name="lastStart" type="text" style="width: 160px;margin-right: 10px;" placeholder="请选择开始时间" class="layui-input form-control">
					<span class="input-group-addon">结束时间</span>
					<input id="lastEnd" name="lastEnd" type="text" style="width: 160px;margin-right: 10px;" placeholder="请选择结束时间" class="layui-input form-control">
				</div>
			</td>
			<td>
				<div class="input-group" style="margin-top:10px;margin-left:20px;">
					<span class="input-group-btn">
						<button class="btn btn-info" id="optionQueryLogRecord" style="margin-right:10px;">
							<i class="glyphicon glyphicon-search"></i>检索
						</button>
						<button class="btn btn-info" id="exportLogRecord">
							<i class="glyphicon glyphicon-export"></i>导出日志
						</button>
					</span>
			    </div>
			</td>
		</tr>
	</table>
	
	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group" style="margin-left: 10px;">  
	        <button class="btn btn-default" id="batchDeleteButton" onclick="deleteSelectLogRecords()">  
	            <i class="glyphicon glyphicon-trash"></i>&nbsp;批量删除  
	        </button>
	    </div>  
	</div>
	
	<table id="operationLogRecordTable"></table>
	
	<script type="text/javascript" src="static/layuiadmin/layui/layui.js"></script>
	<script type="text/javascript" src="static/js/system/sysLog.js"></script>
	<script type="text/javascript">
		$(function(){
			//控制按钮的显示和隐藏
			var reveivedButtonList = ${buttonList};
			var currentPageButtonList = eval(reveivedButtonList);
			if(currentPageButtonList!=null && currentPageButtonList.length>0){
				$.each(currentPageButtonList, function(index,object){ 
			        if(object.buttonId==6 && object.status==0){
			        	$("#batchDeleteButton").css('display','none');
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
			  elem: '#lastStart',
			  type: 'datetime'
			});
			laydate.render({
			  elem: '#lastEnd',
			  type: 'datetime'
			});
		});
	</script>

</body>
</html>