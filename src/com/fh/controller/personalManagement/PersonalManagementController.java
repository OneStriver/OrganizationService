package com.fh.controller.personalManagement;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.personalManagement.HssDeviceType;
import com.fh.entity.personalManagement.HssVoiceType;
import com.fh.entity.personalManagement.TerminalUserInfoDO;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.User;
import com.fh.entity.unitManagement.UnitManagementInfo;
import com.fh.service.personalManagement.PersonalManagementService;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.unitManagement.UnitManagementService;
import com.fh.util.Jurisdiction;

import net.sf.json.JSONArray;

/** 
 * 人员管理
 */
@Controller
@RequestMapping(value="/personalManagement")
public class PersonalManagementController extends BaseController {

	@Resource(name="unitManagementService")
	private UnitManagementService unitManagementService;
	@Resource(name="personalManagementService")
	private PersonalManagementService personalManagementService;
	@Resource(name="fhlogService")
	private FHlogManager FHLOG;
	@Resource(name="buttonRightService")
	private ButtonRightManager buttonRightService;
	private List<UnitManagementInfo> cacheUnitIdsList = new ArrayList<UnitManagementInfo>();
	private List<TerminalUserInfoDO> cacheTerminalUserInfoList = new ArrayList<TerminalUserInfoDO>();
	private Map<Integer,String> cacheHssVoiceTypeMap = new ConcurrentHashMap<Integer,String>();
	private Map<Integer,String> cacheHssDeviceTypeMap = new ConcurrentHashMap<Integer,String>();
	private DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@PostConstruct
	public void getAllHssVoiceCodeType() throws Exception{
		cacheHssVoiceTypeMap.clear();
		//查询所有的语音编码
		PageData pd = new PageData();
		List<HssVoiceType> hssVoiceTypeList = personalManagementService.getAllHssVoiceType(pd);
		for (HssVoiceType hssVoiceType : hssVoiceTypeList) {
			cacheHssVoiceTypeMap.put(hssVoiceType.getId(), hssVoiceType.getName());
		}
	}
	
	@PostConstruct
	public void getAllHssDeviceType() throws Exception{
		cacheHssDeviceTypeMap.clear();
		//查询所有的设备类型
		PageData pd = new PageData();
		List<HssDeviceType> hssDeviceTypeList = personalManagementService.getAllHssDeviceType(pd);
		for (HssDeviceType hssDeviceType : hssDeviceTypeList) {
			cacheHssDeviceTypeMap.put(hssDeviceType.getId(), hssDeviceType.getName());
		}
	}
	
	/**
	 * 转到人员管理页面
	 * 显示所有部队单位层级和子菜单层级(单位管理左侧树形节点显示)
	 * 顶级节点的parentId是0
	 */
	@RequestMapping(value="/listUnitInfoAndSubUnitInfo")
	public ModelAndView listUnitInfoAndSubUnitInfo(Integer menuId,Model model)throws Exception{
		//根据当前角色ID和菜单ID获取某个页面的按钮权限
		PageData pageData = new PageData();
		pageData = this.getPageData();
		User loginUserRole = Jurisdiction.getLoginUserRole();
		Integer loginRoleId = loginUserRole.getRole().getROLE_ID();
		pageData.put("roleId", loginRoleId);
		pageData.put("menuId", menuId);
		List<ButtonRight> roleIdAndMenuIdButtonList = buttonRightService.getButtonRightByRoleIdAndMenuId(pageData);
		String roleIdAndMenuIdButtonListStr = JSONArray.fromObject(roleIdAndMenuIdButtonList).toString();
		//
		ModelAndView mv = this.getModelAndView();
		try{
			JSONArray arr = JSONArray.fromObject(unitManagementService.listUnitInfoAndSubUnitInfo(0));
			String json = arr.toString();
			json = json.replaceAll("unitId", "id")
					.replaceAll("unitName", "name")
					.replaceAll("unitParentId", "pId")
					.replaceAll("subUnitManagementInfo", "children")
					.replaceAll("hasUnitManagementInfo", "checked")
					.replaceAll("parentNode", "isParent");
			model.addAttribute("zTreeNodes", json);
			model.addAttribute("buttonList", roleIdAndMenuIdButtonListStr);
			mv.setViewName("organazitionManagement/personalManagement_list");
		} catch(Exception e){
			logger.error(e.toString(), e);
		}
		return mv;
	}
	
	/**
	 * 点击某一个树形节点显示该节点以及下面所有子节点的所有用户信息
	 * 使用当前点击节点的id作为下级节点的父节点id,(如果当前节点的id为1说明是部队列表的节点不需要查询)
	 */
	@RequestMapping(value="/optionQueryTerminalUserInfo")
	@ResponseBody
	public Map<String, Object> optionQueryTerminalUserInfo(int pageNumber,int pageSize,Integer unitId,String unitName,Page pageObject) throws Exception {
		String currentUserName = Jurisdiction.getUsername();
		cacheUnitIdsList.clear();
		cacheTerminalUserInfoList.clear();
		logBefore(logger, currentUserName+"查询当前节点和下面子节点的所有用户信息");
		Map<String, Object> map = new HashMap<String, Object>();
		PageData pd = new PageData();
		if(unitId==null){
			unitId = 1;
		}
		pd.put("unitParentId", unitId);
		List<UnitManagementInfo> currentUnitAndSubUnitInfoList = unitManagementService.listCurrentUnitInfoAndSubUnitInfo(unitId, cacheUnitIdsList);
		if(unitId!=null && unitId!=1){
			currentUnitAndSubUnitInfoList.add(new UnitManagementInfo(unitId,unitName));
		}
		//条件查询用户的信息
		pd.put("cacheUnitInfosList", currentUnitAndSubUnitInfoList);
		PageData countHssUserInfoPageData = personalManagementService.countAllHssTerminalUserInfo(pd);
		long hssUserInfoCount = ((Long)countHssUserInfoPageData.get("allTerminalUserInfoCount")).longValue();
		pageObject.setPageData(pd);
		pageObject.setCurrentStartIndex((pageNumber - 1) * pageSize);
		pageObject.setPageSize(Math.min(pageSize, (int)hssUserInfoCount));
		List<TerminalUserInfoDO> unitManagementInfoList = personalManagementService.listTerminalUserInfoPage(pageObject);
		for (TerminalUserInfoDO terminalUserInfoDO : unitManagementInfoList) {
			//设置语音编码的名称
			Integer msVocodecKey = terminalUserInfoDO.getMsVocodec();
			String msVocodecValue = cacheHssVoiceTypeMap.get(msVocodecKey);
			if(msVocodecValue!=null && !"".equals(msVocodecValue)){
				terminalUserInfoDO.setMsVocodecName(msVocodecValue);
			}else{
				terminalUserInfoDO.setMsVocodecName("未知");
			}
			//设置设备类型的名称
			Integer deviceTypeKey = terminalUserInfoDO.getDeviceType();
			String deviceTypeValue = cacheHssDeviceTypeMap.get(deviceTypeKey);
			if(deviceTypeValue!=null && !"".equals(deviceTypeValue)){
				terminalUserInfoDO.setDeviceTypeName(deviceTypeValue);
			}else{
				terminalUserInfoDO.setDeviceTypeName("未知");
			}
			//设置当前用户所属部队的名称
			Integer terminalUserInfoUnitId = terminalUserInfoDO.getUnitId();
			for (UnitManagementInfo unitManagementInfo : currentUnitAndSubUnitInfoList) {
				Integer unitManagementInfoUnitId = unitManagementInfo.getUnitId();
				if(unitManagementInfoUnitId==terminalUserInfoUnitId){
					terminalUserInfoDO.setUnitName(unitManagementInfo.getUnitName());
					break;
				}
			}
			String getSetUnitName = terminalUserInfoDO.getUnitName();
			if(getSetUnitName==null || "".equals(getSetUnitName)){
				terminalUserInfoDO.setUnitName("未知");
			}
			//设置MSC地址和网关地址
			String currLoc = terminalUserInfoDO.getCurrLoc();
			if(currLoc!=null && !"".equals(currLoc) && !"@".equals(currLoc)){
				terminalUserInfoDO.setMscAddr(currLoc.split("@")[0]);
				terminalUserInfoDO.setGateWayAddr(currLoc.split("@")[1]);
			}
			//最后更新时间转换
			Timestamp timestamp = terminalUserInfoDO.getTimestamp();
			if(timestamp!=null){
				String convertTimeStampStr = sdf.format(timestamp);
				terminalUserInfoDO.setLastUpdateTime(convertTimeStampStr);
			}
		}
		//循环处理数据
		map.put("total", hssUserInfoCount);  
        map.put("rows", unitManagementInfoList);
		return map;
	}
	
}
