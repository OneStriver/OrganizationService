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
	<meta charset="utf-8">
  	<title>后台主页</title>
  	<meta name="renderer" content="webkit">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
  	<link rel="stylesheet" href="static/layuiadmin/layui/css/layui.css" media="all">
  	<link rel="stylesheet" href="static/layuiadmin/style/admin.css" media="all">
</head>

<body>
	
	<div class="layui-fluid">
	    <div class="layui-row layui-col-space15">
			<div class="layui-col-sm6 layui-col-md3">
				<div class="layui-card">
					<div class="layui-card-header">
						当前版本 <i class="layui-icon layui-icon-tips" lay-tips="当前版本" lay-offset="5"></i>
					</div>
					<div class="layui-card-body layuiadmin-card-list">
						<span style="margin-left:40%;font-size:16px;font-weight:bold;">V1.0.0</span>
					</div>
				</div>
			</div>
			<div class="layui-col-sm6 layui-col-md3">
				<div class="layui-card">
					<div class="layui-card-header">
						基于框架 <i class="layui-icon layui-icon-tips" lay-tips="基于框架" lay-offset="5"></i>
					</div>
					<div class="layui-card-body layuiadmin-card-list">
						<span style="margin-left:40%;font-size:16px;font-weight:bold;">BootStrap</span>
					</div>
				</div>
			</div>
			<div class="layui-col-sm6 layui-col-md3">
				<div class="layui-card">
					<div class="layui-card-header">
						联系方式 <i class="layui-icon layui-icon-tips" lay-tips="联系方式" lay-offset="5"></i>
					</div>
					<div class="layui-card-body layuiadmin-card-list">
						<span style="margin-left:40%;font-size:16px;font-weight:bold;">
							<a href="http://www.github.com/" target="_blank">GitHub</a>
						</span>
					</div>
				</div>
			</div>
			<div class="layui-col-sm6 layui-col-md3">
				<div class="layui-card">
					<div class="layui-card-header">
						问题反馈 <i class="layui-icon layui-icon-tips" lay-tips="问题反馈" lay-offset="5"></i>
					</div>
					<div class="layui-card-body layuiadmin-card-list">
						<span style="margin-left:40%;font-size:16px;font-weight:bold;">暂无计划</span>
					</div>
				</div>
			</div>
		</div>
    </div>

	<script src="static/layuiadmin/layui/layui.js"></script>
	<script>
		layui.config({
			base : 'static/layuiadmin/' //静态资源所在路径
		}).extend({
			index : 'lib/index' //主入口模块
		}).use([ 'index', 'console' ]);
	</script>

</body>
</html>