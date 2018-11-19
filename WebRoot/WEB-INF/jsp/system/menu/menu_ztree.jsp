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
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<script type="text/javascript" src="static/zTree_v3/js/jquery-3.3.1.min.js"></script>
	<link type="text/css" rel="stylesheet" href="static/zTree_v3/css/metroStyle/metroStyle.css"/>
	<script type="text/javascript" src="static/zTree_v3/js/jquery.ztree.all.min.js"></script>
<body>
<table style="width:100%;" border="0">
	<tr>
		<td style="width:15%;" valign="top" bgcolor="#F9F9F9">
			<div style="width:15%;">
				<ul id="leftTree" class="ztree"></ul>
			</div>
		</td>
		<td style="width:85%;" valign="top" >
			<iframe name="treeFrame" id="treeFrame" frameborder="0" src="<%=basePath%>/menu.do?MENU_ID=${MENU_ID}" style="margin:0 auto;width:100%;height:100%;"></iframe>
		</td>
	</tr>
</table>
		
<script type="text/javascript">
	$(function(){
		var setting = {
		    showLine: true,
		    check: {
				enable: false
			}
		};
		var getzTreeNodes = ${zTreeNodes};
		var zTreeNodes = eval(getzTreeNodes);
        $.fn.zTree.init($("#leftTree"), setting, zTreeNodes);
	});
	
	function treeFrameT(){
		var hmainT = document.getElementById("treeFrame");
		var bheightT = document.documentElement.clientHeight;
		hmainT .style.width = '100%';
		hmainT .style.height = (bheightT-26) + 'px';
	}
	treeFrameT();
	window.onresize=function(){  
		treeFrameT();
	};
</SCRIPT>
</body>
</html>

