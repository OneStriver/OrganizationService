﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
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
  	<title>组织架构管理系统</title>
  	<meta name="renderer" content="webkit">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
  	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  	<link rel="stylesheet" href="static/layuiadmin/layui/css/layui.css" media="all">
  	<link rel="stylesheet" href="static/layuiadmin/style/admin.css" media="all">	
</head>

<body class="layui-layout-body">
	
	<div id="LAY_app">
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <!-- 头部区域 -->
        <ul class="layui-nav layui-layout-left">
          <li class="layui-nav-item layadmin-flexible" lay-unselect>
            <a href="javascript:;" layadmin-event="flexible" title="侧边伸缩">
              <i class="layui-icon layui-icon-shrink-right" id="LAY_app_flexible"></i>
            </a>
          </li>
        </ul>
        <ul class="layui-nav layui-layout-right" lay-filter="layadmin-layout-right">
          <li class="layui-nav-item" style="margin-right:20px;" lay-unselect>
            <a href="javascript:;">
              <cite>${user.NICKNAME}</cite>
            </a>
            <dl class="layui-nav-child">
            	<!-- 超级管理员和普通管理员可以修改密码  -->
            	<c:if test="${(roleId==1) || (roleId==2)}">
		          	<dd><a lay-href="user/loginUserEditPassword?userId=${user.USER_ID}">修改密码</a></dd>
            	</c:if>
	            <dd><a lay-href="logout">退出</a></dd>
            </dl>
          </li>
          <!-- 
          <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a href="javascript:;">
	            <i class="layui-icon layui-icon-more-vertical"></i>
            </a>
          </li>
           -->
        </ul>
      </div>
      
      <!-- 侧边菜单 -->
      <div class="layui-side layui-side-menu">
        <div class="layui-side-scroll">
          <div class="layui-logo">
            <span style="color:white;font-size:16px;font-weight:bold;">组织架构管理系统</span>
          </div>
          <ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">
            <c:forEach items="${menuList}" var="menuOne">
            	<c:if test="${menuOne.hasMenu && '1' == menuOne.MENU_STATE}">
            		<li data-name="home" class="layui-nav-item">
            			<a href="javascript:void(0)" lay-tips="${menuOne.MENU_NAME }" lay-direction="2">
            				<i class="${menuOne.MENU_ICON }"></i>
							<cite>${menuOne.MENU_NAME }</cite>
		              	</a>
		              	<c:if test="${'[]' != menuOne.subMenu}">
		              		<dl class="layui-nav-child">
		              			<c:forEach items="${menuOne.subMenu}" var="menuTwo">
		              				<c:if test="${menuTwo.hasMenu && '1' == menuTwo.MENU_STATE}">
		              					<dd data-name="console">
						                  <a lay-href="${menuTwo.MENU_URL }?menuId=${menuTwo.MENU_ID}">${menuTwo.MENU_NAME }</a>
						                </dd>
		              				</c:if>
		              			</c:forEach>
		              		</dl>
		              	</c:if>
            		</li>
            	</c:if>
            </c:forEach>
          </ul>
        </div>
      </div>
      
      <!-- 页面标签 -->
      <div class="layadmin-pagetabs" id="LAY_app_tabs">
        <div class="layui-icon layadmin-tabs-control layui-icon-prev" layadmin-event="leftPage"></div>
        <div class="layui-icon layadmin-tabs-control layui-icon-next" layadmin-event="rightPage"></div>
        <div class="layui-icon layadmin-tabs-control layui-icon-down">
          <ul class="layui-nav layadmin-tabs-select" lay-filter="layadmin-pagetabs-nav">
            <li class="layui-nav-item" lay-unselect>
              <a href="javascript:;"></a>
              <dl class="layui-nav-child layui-anim-fadein">
                <dd layadmin-event="refresh"><a href="javascript:;">刷新当前标签页</a></dd>
                <dd layadmin-event="closeThisTabs"><a href="javascript:;">关闭当前标签页</a></dd>
                <dd layadmin-event="closeOtherTabs"><a href="javascript:;">关闭其它标签页</a></dd>
                <dd layadmin-event="closeAllTabs"><a href="javascript:;">关闭全部标签页</a></dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="layui-tab" lay-unauto lay-allowClose="true" lay-filter="layadmin-layout-tabs">
          <ul class="layui-tab-title" id="LAY_app_tabsheader">
            <li lay-id="homeTab" lay-attr="homeTab" class="layui-this"><i class="layui-icon layui-icon-home"></i></li>
          </ul>
        </div>
      </div>
      
      <!-- 主体内容 -->
      <div class="layui-body" id="LAY_app_body">
        <div class="layadmin-tabsbody-item layui-show">
          <iframe src="tab.do" frameborder="0" class="layadmin-iframe"></iframe>
        </div>
      </div>
      
      <!-- 辅助元素，一般用于移动设备下遮罩 -->
      <div class="layadmin-body-shade" layadmin-event="shade"></div>
    </div>
  </div>
  
	<script src="static/layuiadmin/layui/layui.js"></script>
	<script>
		layui.config({
			base : 'static/layuiadmin/' //静态资源所在路径
		}).extend({
			index : 'lib/index' //主入口模块
		}).use('index');
	</script>

</body>
</html>