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
	<link type="text/css" rel="stylesheet" href="static/css/jquery-ui.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/jquery-ui-timepicker-addon.min.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/fileinput.css"/>
	<link type="text/css" rel="stylesheet" href="static/css/jquery-confirm.min.css"/>
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
	<script type="text/javascript" src="static/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="static/js/jquery-ui-timepicker-addon.min.js"></script>
	<script type="text/javascript" src="static/js/jquery-ui-timepicker-zh-CN.js"></script>
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<script type="text/javascript" src="static/js/common/jquery.bootstrap.teninedialog.v3.js"></script>
	<script type="text/javascript" src="static/js/fileinput.js"></script>
	<script type="text/javascript" src="static/js/zh.js"></script>
	<script type="text/javascript" src="static/js/jquery-confirm.min.js"></script>

</head>
<body>
	<!-- 选择导入ZIP资源包的弹出框 -->
	<div id="importAlarmAttributes" class="modal fade" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 弹出框头部 -->
				<div class="modal-header">
					<h5 class="modal-title">
						<span style="font-weight:bold;">导入告警数据ZIP包</span>
					</h5>
				</div>
				<div class="modal-body">
					<input type="file" id="alarmDataFile" name="alarmDataFile">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						id="confirmAlarmDataFile">确定</button>
					<button type="button" class="btn green" data-dismiss="modal"
						id="cancelAlarmDataFile">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 选择导出ZIP资源包的弹出框 -->
	<div id="exportAlarmAttributes" class="modal fade" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 弹出框头部 -->
				<div class="modal-header">
					<h5 class="modal-title">
						<span style="font-weight:bold;">提示</span>
					</h5>
				</div>
				<div class="modal-body">
					<span style="color:red;font-weight:bold;text-align:center;">确认导出模版数据吗?</span>
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

	<!-- 添加告警属性模态框 -->
	<div class="modal fade" id="addAlarmAttributeModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:550px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">添加告警属性</span>
				</div>
				<div class="modal-body">
					<table>
						<tr>
							<td style="padding-right:20px;">
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">设备名称</span>
									<select id="addDeviceTypeId" name="deviceTypeId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警码</span>
									<input type="text" id="addAlarmCode" name="alarmCode" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警类型</span>
									<select id="addAlarmTypeId" name="alarmTypeId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警级别</span>
									<select id="addAlarmSeverityId" name="alarmSeverityId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警描述</span>
									<input type="text" id="addAlarmDescription" name="alarmDescription" class="form-control" style="width:150px;">
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警原因</span>
									<input type="text" id="addAlarmCause" name="alarmCause" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">处理方式</span>
									<input type="text" id="addAlarmTreatment" name="alarmTreatment" class="form-control" style="width:150px;">
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">附加信息</span>
									<input type="text" id="addAddition" name="addition" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">处理策略</span>
									<input type="text" id="addLimitStrategy" name="limitStrategy" class="form-control" style="width:150px;" placeholder="(单位:次数)">
								</div>	
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">推送策略</span>
									<input type="text" id="addPushStrategy" name="pushStrategy" class="form-control" style="width:150px;" placeholder="(单位:次数)">
								</div>	
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">自动清除</span>
									<select id="addAutoClearEnable" name="autoClearEnable" class="form-control" style="width:150px;">
						            	<option value="0">关闭自动清除</option>
										<option value="1">开启自动清除</option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警抑制</span>
									<select id="addAlarmSuppress" name="alarmSuppress" class="form-control" style="width:150px;">
						            	<option value="0">关闭告警抑制</option>
										<option value="1">开启告警抑制</option>
									</select>
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">超时时间</span>
									<input type="text" id="addAutoClearTimeout" name="autoClearTimeout" class="form-control" style="width:150px;" placeholder="(单位:秒)">
								</div>	
							</td>
							<td>
							
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addAlarmAttribute">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改告警属性模态框 -->
	<div class="modal fade" id="updateAlarmAttributeModal" role="dialog" data-backdrop="static">
		<div class="modal-dialog" style="width:550px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;
					</button>
					<span class="modal-title" style="font-weight:bold;">修改告警属性</span>
				</div>
				<div class="modal-body">
					<table>
						<tr>
							<td style="padding-right:20px;">
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">设备名称</span>
									<select id="updateDeviceTypeId" name="deviceTypeId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警码</span>
									<input type="text" id="updateAlarmCode" name="alarmCode" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警类型</span>
									<select id="updateAlarmTypeId" name="alarmTypeId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警级别</span>
									<select id="updateAlarmSeverityId" name="alarmSeverityId" class="form-control" style="width:150px;">
									</select>
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警描述</span>
									<input type="text" id="updateAlarmDescription" name="alarmDescription" class="form-control" style="width:150px;">
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警原因</span>
									<input type="text" id="updateAlarmCause" name="alarmCause" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">处理方式</span>
									<input type="text" id="updateAlarmTreatment" name="alarmTreatment" class="form-control" style="width:150px;">
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">附加信息</span>
									<input type="text" id="updateAddition" name="addition" class="form-control" style="width:150px;">
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">处理策略</span>
									<input type="text" id="updateLimitStrategy" name="limitStrategy" class="form-control" style="width:150px;" placeholder="(单位:次数)">
								</div>	
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">推送策略</span>
									<input type="text" id="updatePushStrategy" name="pushStrategy" class="form-control" style="width:150px;" placeholder="(单位:次数)">
								</div>	
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">自动清除</span>
									<select id="updateAutoClearEnable" name="autoClearEnable" class="form-control" style="width:150px;">
						            	<option value="0">关闭自动清除</option>
										<option value="1">开启自动清除</option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">告警抑制</span>
									<select id="updateAlarmSuppress" name="alarmSuppress" class="form-control" style="width:150px;">
						            	<option value="0">关闭告警抑制</option>
										<option value="1">开启告警抑制</option>
									</select>
								</div>
							</td>
						</tr>
						<tr style="height:5px;"></tr>
						<tr>
							<td>
								<div class="input-group">
									<span class="input-group-addon" style="width:80px;">超时时间</span>
									<input type="text" id="updateAutoClearTimeout" name="autoClearTimeout" class="form-control" style="width:150px;" placeholder="(单位:秒)">
								</div>	
							</td>
							<td>
							
							</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateAlarmAttribute">修改</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 操作按钮 -->
	<div id="toolbar">  
	    <div class="btn-group">  
	        <button class="btn btn-default" onclick="addAlarmAttributeButton()">  
	            <i class="glyphicon glyphicon-plus"></i>添加
	        </button>
	        <button class="btn btn-default" onclick="updateAlarmAttributeButton()">  
	            <i class="glyphicon glyphicon-edit"></i>修改
	        </button>  
	        <button class="btn btn-default" onclick="deleteAttributeButton()">  
	            <i class="glyphicon glyphicon-trash"></i>删除  
	        </button>
	        <button class="btn btn-default" onclick="openAlarmSuppression()" value="1">  
	            <i class="glyphicon glyphicon-folder-open"></i>&nbsp;开启告警抑制
	        </button>
	        <button class="btn btn-default" onclick="closeAlarmSuppression()" value="2">  
	            <i class="glyphicon glyphicon-folder-close"></i>&nbsp;关闭告警抑制
	        </button>
	        <!-- 
	        <button class="btn btn-default" data-toggle="modal" data-target="#importAlarmAttributes">  
	            <i class="glyphicon glyphicon-import"></i>模版导入
	        </button> 
	        <button class="btn btn-default" data-toggle="modal" data-target="#exportAlarmAttributes">
	            <i class="glyphicon glyphicon-export"></i>模版导出
	        </button>   
	         -->
	    </div>  
	</div>  
	
	<!-- 告警属性Table -->
	<table id="alarmAttributeTable"></table>
	
	<script type="text/javascript" src="static/js/alarmAttribute/alarmAttribute.js"></script>

</body>
</html>