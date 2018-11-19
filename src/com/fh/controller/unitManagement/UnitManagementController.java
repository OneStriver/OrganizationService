package com.fh.controller.unitManagement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.consts.ResultCode;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.User;
import com.fh.entity.unitManagement.UnitManageInfoVO;
import com.fh.entity.unitManagement.UnitManagementInfo;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.unitManagement.UnitManagementService;
import com.fh.util.Jurisdiction;

import net.sf.json.JSONArray;

/** 
 * 单位管理
 */
@Controller
@RequestMapping(value="/unitManagement")
public class UnitManagementController extends BaseController {

	@Resource(name="unitManagementService")
	private UnitManagementService unitManagementService;
	@Resource(name="fhlogService")
	private FHlogManager FHLOG;
	@Resource(name="buttonRightService")
	private ButtonRightManager buttonRightService;
	private List<UnitManageInfoVO> cacheUnitManageInfoVOList = new ArrayList<UnitManageInfoVO>();
	private List<UnitManagementInfo> list = new ArrayList<UnitManagementInfo>();
	/**
	 * 显示所有部队单位层级和子菜单层级(单位管理左侧树形节点显示)
	 * 顶级节点的parentId是0
	 */
	@RequestMapping(value="/listUnitInfoAndSubUnitInfoJson",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String listUnitInfoAndSubUnitInfoJson()throws Exception{
		try{
			JSONArray arr = JSONArray.fromObject(unitManagementService.listUnitInfoAndSubUnitInfo(0));
			String json = arr.toString();
			json = json.replaceAll("unitId", "id")
					.replaceAll("unitName", "name")
					.replaceAll("unitParentId", "pId")
					.replaceAll("subUnitManagementInfo", "children")
					.replaceAll("hasUnitManagementInfo", "checked")
					.replaceAll("parentNode", "isParent");
			return json;
		} catch(Exception e){
			logger.error(e.toString(), e);
		}
		return null;
	}
	
	/**
	 * 转到单位管理页面
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
		list.clear();
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
			mv.setViewName("organazitionManagement/unitManagement_list");
		} catch(Exception e){
			logger.error(e.toString(), e);
		}
		return mv;
	}
	
	/**
	 * 点击某一个树形节点显示该节点下面的所有子节点
	 */
	@RequestMapping(value="/listAllSubUnitInfo")
	@ResponseBody
	public Map<String, Object> listAllSubUnitInfo(int pageNumber,int pageSize,Integer unitParentId,Page pageObject) throws Exception {
		String currentUserName = Jurisdiction.getUsername();
		cacheUnitManageInfoVOList.clear();
		logBefore(logger, currentUserName+"查询父节点下面的子节点");
		Map<String, Object> map = new HashMap<String, Object>();
		//判断条件是否为空
		if(unitParentId==null){
			unitParentId = 1;
		}
		//查询子节点总数量
		PageData pd = new PageData();
		pd.put("unitParentId",unitParentId);
		PageData countUnitManagementInfoPageData = unitManagementService.countUnitManagementInfo(pd);
		long unitManageMentInfoCount = ((Long)countUnitManagementInfoPageData.get("unitManagementInfoCount")).longValue();
		pd.put("unitId",unitParentId);
		UnitManagementInfo unitManagementInfoById = unitManagementService.getUnitManagementInfoById(pd);
		//条件子节点信息
		pageObject.setPageData(pd);
		pageObject.setCurrentStartIndex((pageNumber - 1) * pageSize);
		pageObject.setPageSize(Math.min(pageSize, (int)unitManageMentInfoCount));
		List<UnitManagementInfo> unitManagementInfoList = unitManagementService.listPageSubUnitManagementInfo(pageObject);
		//循环处理数据
		for (UnitManagementInfo unitManagementInfo : unitManagementInfoList) {
			//前台返回单位的实体类
			UnitManageInfoVO unitManageInfoVO = new UnitManageInfoVO();
			unitManageInfoVO.setUnitId(unitManagementInfo.getUnitId());;
			unitManageInfoVO.setUnitName(unitManagementInfo.getUnitName());
			unitManageInfoVO.setUnitParentId(unitManagementInfo.getUnitParentId());
			if(unitParentId==1){
				unitManageInfoVO.setUnitParentName("无");
			}else{
				unitManageInfoVO.setUnitParentName(unitManagementInfoById.getUnitName());
			}
			unitManageInfoVO.setUnitOrder(unitManagementInfo.getUnitOrder());
			//添加每一个对象
			cacheUnitManageInfoVOList.add(unitManageInfoVO);
		}
		map.put("total", unitManageMentInfoCount);  
        map.put("rows", cacheUnitManageInfoVOList);
		return map;
	}
	
	/**
	 * 添加单位信息
	 */
	@RequestMapping(value="/addUnitManagementInfo")
	@ResponseBody
	public String addUnitManagementInfo(Integer unitParentId,String unitName)throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"添加单位信息");
		try {
			//判断条件是否为空
			if(unitParentId==null){
				unitParentId = 1;
			}
			//获取当前的子单位
			PageData pd = new PageData();
			pd.put("unitParentId",unitParentId);
			PageData countUnitManagementInfoPageData = unitManagementService.countUnitManagementInfo(pd);
			long unitManageMentInfoCount = ((Long)countUnitManagementInfoPageData.get("unitManagementInfoCount")).longValue();
			PageData countAllUnitManagementInfoPageData = unitManagementService.countAllUnitManagementInfo(pd);
			long allUnitManageMentInfoCount = ((Long)countAllUnitManagementInfoPageData.get("allUnitManagementInfoCount")).longValue();
			//
			UnitManagementInfo unitManagementInfo = new UnitManagementInfo();
			unitManagementInfo.setUnitId((int)allUnitManageMentInfoCount+1);
			unitManagementInfo.setUnitName(unitName);
			unitManagementInfo.setUnitParentId(unitParentId);
			unitManagementInfo.setUnitOrder((int)unitManageMentInfoCount+1);
			unitManagementService.insertUnitManagementInfo(unitManagementInfo);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 修改单位信息
	 */
	@RequestMapping(value="/updateUnitManagementInfo")
	@ResponseBody
	public String updateUnitManagementInfo(Integer unitId,Integer unitParentId,String unitName)throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"修改单位信息");
		try {
			UnitManagementInfo unitManagementInfo = new UnitManagementInfo();
			unitManagementInfo.setUnitParentId(unitParentId);
			unitManagementInfo.setUnitId(unitId);
			unitManagementInfo.setUnitName(unitName);
			unitManagementService.updateUnitManagementInfo(unitManagementInfo);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 删除单位信息
	 */
	@RequestMapping(value="/deleteUnitManagementInfo")
	@ResponseBody
	public String deleteUnitManagementInfo(@RequestParam(value="unitIds") Integer[] unitIds)throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"删除单位信息");
		try {
			List<Integer> convertList = Arrays.asList(unitIds);
			PageData pageData = new PageData();
			pageData.put("unitIds", convertList);
			unitManagementService.deleteUnitManagementInfo(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
}
