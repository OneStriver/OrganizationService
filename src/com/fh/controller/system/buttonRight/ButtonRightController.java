package com.fh.controller.system.buttonRight;

import java.util.ArrayList;
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
import com.fh.entity.system.Menu;
import com.fh.entity.system.MenuButton;
import com.fh.entity.system.Role;
import com.fh.entity.system.User;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.system.menu.MenuManager;
import com.fh.service.system.role.RoleManager;
import com.fh.service.system.user.UserManager;
import com.fh.util.Jurisdiction;
import com.google.gson.Gson;

import net.sf.json.JSONArray;

/** 
 * 类名称：ButtonRightController 菜单页面按钮权限管理
 */
@Controller
@RequestMapping(value="/buttonRight")
public class ButtonRightController extends BaseController {
	
	String menuUrl = "role.do"; //菜单地址(权限用)
	@Resource(name="menuService")
	private MenuManager menuService;
	@Resource(name="roleService")
	private RoleManager roleService;
	@Resource(name="userService")
	private UserManager userService;
	@Resource(name="fhlogService")
	private FHlogManager FHLOG;
	@Resource(name="buttonRightService")
	private ButtonRightManager buttonRightService;
	//缓存再也没有子节点的菜单
	private List<Menu> cacheBottomMenuList = new ArrayList<Menu>();
	private Gson gson = new Gson();
	
	/**
	 * 获取所有角色
	 */
	@RequestMapping(value="/listAllRoles",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String listAllRoles() throws Exception{
		PageData pd = new PageData();
		List<Role> allRolesList = roleService.listAllRoles(pd);
		Gson gson = new Gson();
		String jsonStr = gson.toJson(allRolesList);
		return jsonStr;
	}
	/**
	 * 获取所有没有子节点的菜单
	 */
	@RequestMapping(value="/listAllNoSubMenuMenu",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String listAllNoSubMenuMenu() throws Exception{
		cacheBottomMenuList.clear();
		//获取所有菜单
		List<Menu> menuList = menuService.listAllMenuQx(0);
		//获取没有子节点的菜单
		List<Menu> allBottomMenuList = getAllBottomMenu(menuList);
		Gson gson = new Gson();
		String jsonStr = gson.toJson(allBottomMenuList);
		return jsonStr;
	}
	/**
	 * 获取所有没有子节点的菜单
	 */
	@RequestMapping(value="/listAllSubMenuButton",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String listAllSubMenuButton() throws Exception{
		PageData pd = new PageData();
		List<MenuButton> allSubMenuButtonList = buttonRightService.listAllSubMenuButton(pd);
		Gson gson = new Gson();
		String jsonStr = gson.toJson(allSubMenuButtonList);
		return jsonStr;
	}
	
	/** 
	 * 转到菜单页面按钮权限管理页面
	 */
	@RequestMapping(value="/toButtonRightPage")
	public ModelAndView toButtonRightPage(Integer menuId,Model model)throws Exception{
		//根据当前角色ID和菜单ID获取某个页面的按钮权限
		User loginUserRole = Jurisdiction.getLoginUserRole();
		Integer loginRoleId = loginUserRole.getRole().getROLE_ID();
		//页面跳转处理
		cacheBottomMenuList.clear();
		ModelAndView mv = this.getModelAndView();
		//获取所有菜单
		List<Menu> menuList = menuService.listAllMenuQx(0);
		//获取没有子节点的菜单
		List<Menu> allBottomMenuList = getAllBottomMenu(menuList);
		Menu menu = new Menu();
		menu.setMENU_ID(0);
		menu.setMENU_NAME("菜单按钮列表");
		menu.setPARENT_ID(0);
		menu.setSubMenu(allBottomMenuList);
		menu.setHasMenu(true);
		menu.setParentNode(true);
		for (Menu bottomMenu : allBottomMenuList) {
			bottomMenu.setPARENT_ID(0);
		}
		JSONArray arr = JSONArray.fromObject(menu);
		String json = arr.toString();
		json = json.replaceAll("MENU_ID", "id")
				.replaceAll("MENU_NAME", "name")
				.replaceAll("PARENT_ID", "pId")
				.replaceAll("subMenu", "children")
				.replaceAll("hasMenu", "checked")
				.replaceAll("parentNode", "isParent");
		model.addAttribute("menuId", menuId);
		model.addAttribute("roleId", loginRoleId);
		model.addAttribute("zTreeNodes", json);
		mv.setViewName("system/menuButton/menuButton_list");
		return mv;
	}
	
	/** 
	 * 获取所有的按钮权限
	 */
	@RequestMapping(value="/listButtonRights")
	@ResponseBody
	public Map<String,Object> listButtonRights(int pageNumber,int pageSize,Integer roleId,Integer menuId,Page pageObject)throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("roleId", roleId);
		pd.put("menuId", menuId);
		PageData countOptionsButtonRightsPageData = buttonRightService.countOptionsButtonRights(pd);
		long optionsButtonRightsCount = ((Long)countOptionsButtonRightsPageData.get("menuButtonCount")).longValue();
		//条件子节点信息
		pageObject.setPageData(pd);
		pageObject.setCurrentStartIndex((pageNumber - 1) * pageSize);
		pageObject.setPageSize(Math.min(pageSize, (int)optionsButtonRightsCount));
		List<ButtonRight> menuButtonRightsList = buttonRightService.listOptionsButtonRights(pageObject);
		map.put("total", optionsButtonRightsCount);  
        map.put("rows", menuButtonRightsList);
		return map;
	}
	
	/**
	 * 递归获取再也没有子菜单节点
	 */
	private List<Menu> getAllBottomMenu(List<Menu> menuList){
		for (Menu menu : menuList) {
			List<Menu> subMenuList = menu.getSubMenu();
			if(subMenuList.size()>0){
				getAllBottomMenu(subMenuList);
			}else{
				cacheBottomMenuList.add(menu);
			}
		}
		return cacheBottomMenuList;
	}
	
	/**
	 * 添加菜单按钮信息
	 */
	@RequestMapping(value="/saveMenuButtonRights")
	@ResponseBody
	public String saveMenuButtonRights(@RequestParam(value="addJsonStr") String buttonRightStr){
		logBefore(logger, Jurisdiction.getUsername()+"添加菜单按钮信息");
		PageData pageData = new PageData();
		ButtonRight fromJson = gson.fromJson(buttonRightStr, ButtonRight.class);
		try {
			PageData countAllButtonRightsPageData = buttonRightService.countAllButtonRights(pageData);
			long allButtonRightsCount = ((Long)countAllButtonRightsPageData.get("allMenuButtonCount")).longValue();
			ButtonRight buttonRight = new ButtonRight();
			buttonRight.setId((int)allButtonRightsCount+1);
			buttonRight.setRoleId(fromJson.getRoleId());
			buttonRight.setMenuId(fromJson.getMenuId());
			buttonRight.setButtonId(fromJson.getButtonId());
			//默认开启
			buttonRight.setStatus(1);
			pageData.put("buttonRight", buttonRight);
			buttonRightService.addButtonRights(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 修改菜单按钮信息
	 */
	@RequestMapping(value="/updateMenuButtonRights")
	@ResponseBody
	public String updateMenuButtonRights(@RequestParam(value="updateJsonStr") String buttonRightStr){
		logBefore(logger, Jurisdiction.getUsername()+"修改菜单按钮信息");
		PageData pageData = new PageData();
		ButtonRight fromJson = gson.fromJson(buttonRightStr, ButtonRight.class);
		try {
			pageData.put("buttonRight", fromJson);
			buttonRightService.updateButtonRights(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 删除菜单按钮信息
	 */
	@RequestMapping(value="/deleteMenuButtonRights")
	@ResponseBody
	public String deleteMenuButtonRights(@RequestParam(value="selectIds") Integer[] ids){
		logBefore(logger, Jurisdiction.getUsername()+"删除菜单按钮信息");
		try {
			PageData pageData = new PageData();
			pageData.put("ids", ids);
			buttonRightService.deleteButtonRights(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 开启菜单按钮信息
	 */
	@RequestMapping(value="/openMenuButtonRights")
	@ResponseBody
	public String openMenuButtonRights(@RequestParam(value="selectMenuButtonIds") Integer[] ids){
		logBefore(logger, Jurisdiction.getUsername()+"开启菜单按钮信息");
		try {
			PageData pageData = new PageData();
			pageData.put("ids", ids);
			buttonRightService.openButtonRights(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 关闭菜单按钮信息
	 */
	@RequestMapping(value="/closeMenuButtonRights")
	@ResponseBody
	public String closeMenuButtonRights(@RequestParam(value="selectMenuButtonIds") Integer[] ids){
		logBefore(logger, Jurisdiction.getUsername()+"关闭菜单按钮信息");
		try {
			PageData pageData = new PageData();
			pageData.put("ids", ids);
			buttonRightService.closeButtonRights(pageData);
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
}