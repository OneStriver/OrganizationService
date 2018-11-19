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
  	<title>登录页面</title>
  	<meta name="renderer" content="webkit">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
  	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  	<link rel="stylesheet" href="static/layuiadmin/layui/css/layui.css" media="all">
  	<link rel="stylesheet" href="static/layuiadmin/style/admin.css" media="all">
  	<link rel="stylesheet" href="static/layuiadmin/style/login.css" media="all">
</head>

<body class="layui-layout-body">
	
	<div class="layadmin-user-login layadmin-user-display-show" id="LAY-user-login" style="display: none;">
    <div class="layadmin-user-login-main">
      <div class="layadmin-user-login-box layadmin-user-login-header">
        <h2>欢迎登录系统</h2>
      </div>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="loginUsername"></label>
          <input type="text" id="loginUsername" lay-verify="loginUsername" placeholder="用户名" class="layui-input">
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="loginPassword"></label>
          <input type="password" name="loginPassword" id="loginPassword" lay-verify="loginPassword" placeholder="密码" class="layui-input">
        </div>
        <div class="layui-form-item">
          <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="LAY-user-login-submit">
          	<i class="layui-icon">&#xe609;</i> 登录	
          </button>
        </div>
      </div>
    </div>
    <div class="layui-trans layadmin-user-login-footer">
      <p>Copyright © <a href="http://www.github.com/" target="_blank">GitHub</a> 2018</p>
    </div>
  </div>
  
  <script src="static/layuiadmin/layui/layui.js"></script>  
  <script>
	//TOCMAT重启之后 点击左侧列表跳转登录首页 
	if (window != top) {
		top.location.href = location.href;
	}
    layui.config({
	    base: 'static/layuiadmin/' //静态资源所在路径
	}).extend({
	    index: 'lib/index' //主入口模块
	}).use(['index', 'user'], function(){
	    var $ = layui.$,
	    setter = layui.setter,
	    admin = layui.admin,
	    form = layui.form,
	    router = layui.router(),
	    search = router.search;

	    form.render();
	    
	    form.verify({
		  loginUsername: function(value, item){ //value：表单的值、item：表单的DOM对象
		    if(value==null || value==''){
		      return '用户名不能为空';
		    }
		  },
		  loginPassword: function(value, item){ //value：表单的值、item：表单的DOM对象
		    if(value==null || value==''){
			  return '密码不能为空';
			}
		  }
		});

	   //登录
	   form.on('submit(LAY-user-login-submit)',function(){
	    	var loginname = $("#loginUsername").val();
			var password = $("#loginPassword").val();
			var code = loginname+",FH,"+password;
			$.ajax({
				type: "POST",
				url: 'login_login',
		    	data: {KEYDATA:code,tm:new Date().getTime()},
				dataType:'json',
				cache: false,
				success: function(data){
					var postResult = data.result;
					if("success" == postResult){
						layer.msg("登录成功", {icon: 1,offset: '100px'});
			            setTimeout("window.location.href='main/index'",500)//延迟500毫秒跳转登录成功之后界面
					}else if("usererror" == postResult){
						layer.msg("用户名或密码有误", {icon: 5,offset: '100px'});
					}else{
						layer.msg("缺少参数或参数错误", {icon: 5,offset: '100px'});
					}
				}
			});
	    });
	});
  </script>
	 
</body>
</html>