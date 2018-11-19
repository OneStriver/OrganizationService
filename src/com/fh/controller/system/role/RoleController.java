package com.fh.controller.system.role;

import java.math.BigInteger;
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
import com.fh.entity.common.PageData;
import com.fh.entity.consts.ResultCode;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.Menu;
import com.fh.entity.system.Role;
import com.fh.entity.system.User;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.system.menu.MenuManager;
import com.fh.service.system.role.RoleManager;
import com.fh.service.system.user.UserManager;
import com.fh.util.Jurisdiction;
import com.fh.util.RightsHelper;
import com.fh.util.Tools;

import net.sf.json.JSONArray;
/** 
 * 类名称：RoleController 角色权限管理
 */
@Controller
@RequestMapping(value="/role")
public class RoleController extends BaseController {
	
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
	
	/** 
	 * 转到角色权限管理页面
	 */
	@RequestMapping(value="/toRoleListPage")
	public ModelAndView toRoleListPage(Integer menuId,Model model)throws Exception{
		//根据当前角色ID和菜单ID获取某个页面的按钮权限
		PageData pageData = new PageData();
		pageData = this.getPageData();
		User loginUserRole = Jurisdiction.getLoginUserRole();
		Integer loginRoleId = loginUserRole.getRole().getROLE_ID();
		pageData.put("roleId", loginRoleId);
		pageData.put("menuId", menuId);
		List<ButtonRight> roleIdAndMenuIdButtonList = buttonRightService.getButtonRightByRoleIdAndMenuId(pageData);
		String roleIdAndMenuIdButtonListStr = JSONArray.fromObject(roleIdAndMenuIdButtonList).toString();
		//跳转到对应的页面
		model.addAttribute("buttonList", roleIdAndMenuIdButtonListStr);
		model.addAttribute("loginRoleId", loginRoleId);
		ModelAndView mv = this.getModelAndView();
		mv.setViewName("system/role/role_list");
		return mv;
	}
	
	/** 
	 * 进入权限首页
	 */
	@RequestMapping(value="listRoles")
	@ResponseBody
	public Map<String,Object> listRoles()throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		pd = this.getPageData();
		//只有普通管理员下面
		pd.put("ROLE_ID", 2);
		List<Role> roleList = roleService.listAllRolesByPId(pd);		//列出此组下面的角色
		map.put("total", roleList.size());  
        map.put("rows", roleList);
		return map;
	}
	
	/**
	 * 新增角色信息
	 */
	@RequestMapping(value="/saveRoleData")
	@ResponseBody
	public String saveRoleData()throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"新增角色");
		PageData pageData = new PageData();
		try{
			pageData = this.getPageData();
			PageData countAllRolePageData = roleService.countAllRole(pageData);
			long allRoleCount = ((Long)countAllRolePageData.get("allRoleCount")).longValue();
			pageData.put("ROLE_ID", (int)allRoleCount+1);
			pageData.put("RIGHTS", "");
			roleService.add(pageData);
			FHLOG.saveLogRecord(Jurisdiction.getUsername(), "新增角色:"+pageData.getString("ROLE_NAME"));
			return ResultCode.SUCCESS.getValue();
		} catch(Exception e){
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 修改角色信息
	 */
	@RequestMapping(value="/updateRoleData")
	@ResponseBody
	public String updateRoleData()throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"修改角色");
		PageData pd = new PageData();
		try{
			pd = this.getPageData();
			roleService.edit(pd);
			FHLOG.saveLogRecord(Jurisdiction.getUsername(), "修改角色:"+pd.getString("ROLE_NAME"));
			return ResultCode.SUCCESS.getValue();
		} catch(Exception e){
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 删除角色信息
	 */
	@RequestMapping(value="/deleteCurrentRoleData")
	@ResponseBody
	public String deleteCurrentRoleData(@RequestParam(value="selectIds") Integer[] ids)throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"删除角色");
		PageData pd = new PageData();
		try{
			for (Integer roleId : ids) {
				pd.put("ROLE_ID", roleId);
				List<Role> roleList_z = roleService.listAllRolesByPId(pd);			//列出此部门的所有下级
				if(roleList_z.size() > 0){
					logger.info("删除角色失败，请先删除下级角色!");
					return ResultCode.FAILURE.getValue();
				}else{
					List<PageData> userlist = userService.listAllUserByRoldId(pd);	//此角色下的用户
					if(userlist.size() > 0){										//此角色已被使用就不能删除
						logger.info("删除角色失败，此角色已经被使用!");
						return ResultCode.FAILURE.getValue();
					}else{
						roleService.deleteRoleById(roleId);							//执行删除
						FHLOG.saveLogRecord(Jurisdiction.getUsername(), "删除角色ID为:"+roleId);
					}
				}
			}
			return ResultCode.SUCCESS.getValue();
		} catch(Exception e){
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 显示菜单列表ztree(菜单授权菜单)
	 */
	@RequestMapping(value="/listMenuQx")
	@ResponseBody
	public Map<String,Object> listMenuQx(Integer ROLE_ID)throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		Role role = roleService.getRoleById(ROLE_ID);			//根据角色ID获取角色对象
		String roleRights = role.getRIGHTS();					//取出本角色菜单权限
		List<Menu> menuList = menuService.listAllMenuQx(0);		//获取所有菜单
		menuList = this.readMenu(menuList, roleRights);			//根据角色权限处理菜单权限状态(递归处理)
		JSONArray arr = JSONArray.fromObject(menuList);
		String json = arr.toString();
		json = json.replaceAll("MENU_ID", "id").replaceAll("PARENT_ID", "pId").replaceAll("MENU_NAME", "name").replaceAll("subMenu", "children").replaceAll("parentNode", "isParent").replaceAll("hasMenu", "checked");
		map.put("zTreeNodes", json);
		map.put("ROLE_ID",ROLE_ID);
		return map;
	}
	
	/**
	 * 保存角色菜单权限
	 * @param ROLE_ID 角色ID
	 * @param menuIds 菜单ID集合
	 */
	@RequestMapping(value="/saveMenuQx",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String saveMenuqx(Integer ROLE_ID,String menuIds)throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"修改菜单权限");
		FHLOG.saveLogRecord(Jurisdiction.getUsername(), "修改角色菜单权限，角色ID为:"+ROLE_ID);
		PageData pd = new PageData();
		if(null != menuIds && !"".equals(menuIds.trim())){
			BigInteger rights = RightsHelper.sumRights(Tools.str2StrArray(menuIds));//用菜单ID做权处理
			Role role = roleService.getRoleById(ROLE_ID);	//通过id获取角色对象
			role.setRIGHTS(rights.toString());
			roleService.updateRoleRights(role);				//更新当前角色菜单权限
			pd.put("rights",rights.toString());
		}else{
			Role role = new Role();
			role.setRIGHTS("");
			role.setROLE_ID(ROLE_ID);
			roleService.updateRoleRights(role);				//更新当前角色菜单权限(没有任何勾选)
			pd.put("rights","");
		}
		pd.put("ROLE_ID", ROLE_ID);
		if(ROLE_ID!=1 && ROLE_ID!=2){					//当修改admin权限时,不修改其它角色权限
			roleService.setAllRights(pd);				//更新此角色所有子角色的菜单权限
		}
		return "修改角色菜单权限成功!";
	}

	/**根据角色权限处理权限状态(递归处理)
	 * @param menuList：传入的总菜单
	 * @param roleRights：加密的权限字符串
	 * @return
	 */
	public List<Menu> readMenu(List<Menu> menuList,String roleRights){
		for(int i=0;i<menuList.size();i++){
			menuList.get(i).setHasMenu(RightsHelper.testRights(roleRights, menuList.get(i).getMENU_ID()));
			this.readMenu(menuList.get(i).getSubMenu(), roleRights);					//是：继续排查其子菜单
		}
		return menuList;
	}
	
	
}