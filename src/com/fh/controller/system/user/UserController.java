package com.fh.controller.system.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.common.UpdatePasswordEntity;
import com.fh.entity.consts.ResultCode;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.Role;
import com.fh.entity.system.User;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.system.role.RoleManager;
import com.fh.service.system.user.UserManager;
import com.fh.util.Jurisdiction;
import com.google.gson.Gson;

import net.sf.json.JSONArray;

/** 
 * 类名称：UserController
 */
@Controller
@RequestMapping(value="/user")
public class UserController extends BaseController {
	
	@Resource(name="userService")
	private UserManager userService;
	@Resource(name="roleService")
	private RoleManager roleService;
	@Resource(name="fhlogService")
	private FHlogManager FHLOG;
	@Resource(name="buttonRightService")
	private ButtonRightManager buttonRightService;
	
	/**
	 * 转到用户查询页面
	 */
	@RequestMapping(value="/tolistUsersPage")
	public ModelAndView toHistoryAlarmPage(Integer menuId,Model model)throws Exception{
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
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		mv.addObject("pd", pd);	
		model.addAttribute("buttonList", roleIdAndMenuIdButtonListStr);
		mv.setViewName("system/user/user_list");
		return mv;
	}
	
	/**
	 * 显示用户列表
	 */
	@RequestMapping(value="/listUsers")
	@ResponseBody
	public Map<String, Object> listUsers(Page page)throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pageData = new PageData();
		pageData = this.getPageData();
		String keywords = pageData.getString("keywords");
		if(null != keywords && !"".equals(keywords)){
			pageData.put("keywords", keywords.trim());
		}
		String lastLoginStart = pageData.getString("lastLoginStart");
		String lastLoginEnd = pageData.getString("lastLoginEnd");
		if(lastLoginStart != null && !"".equals(lastLoginStart)){
			pageData.put("lastLoginStart", lastLoginStart+" 00:00:00");
		}
		if(lastLoginEnd != null && !"".equals(lastLoginEnd)){
			pageData.put("lastLoginEnd", lastLoginEnd+" 00:00:00");
		}
		page.setPageData(pageData);
		List<User> userList = userService.listUsers(page);
		for (User user : userList) {
			user.setROLE_ID(user.getRole().getROLE_ID());
			user.setROLENAME(user.getRole().getROLE_NAME());
		}
		map.put("total", userList.size());  
        map.put("rows", userList);
		return map;
	}
	
	/**
	 * 获取所有的角色
	 */
	@RequestMapping(value="/getAllUserRole",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getAllUserRole() throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"获取所有的角色");
		PageData pageData = new PageData();
		pageData = this.getPageData();
		pageData.put("ROLE_ID", 2);
		List<Role> roleList = roleService.listAllRolesByPId(pageData);
		Gson gson = new Gson();
		String jsonStr = gson.toJson(roleList);
		return jsonStr;
	}
	
	/**
	 * 添加用户
	 */
	@RequestMapping(value="/saveSystemUserData",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String saveSystemUserData() throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"新增系统用户");
		PageData pageData = new PageData();
		//获取数据库中日期
		PageData countAllUserPageData = userService.countAllUser(pageData);
		long allUserCount = ((Long)countAllUserPageData.get("allUserCount")).longValue();
		pageData = this.getPageData();
		pageData.put("USER_ID", (int)allUserCount+1);
		pageData.put("LAST_LOGIN", "");
		pageData.put("IP", "");
		pageData.put("STATUS", "0");
		pageData.put("PASSWORD", new SimpleHash("SHA-1", pageData.getString("USERNAME"), pageData.getString("PASSWORD")).toString());	//密码加密
		//判断用户名是否存在
		if(null == userService.findByUsername(pageData)){	
			userService.saveU(pageData);
			FHLOG.saveLogRecord(Jurisdiction.getUsername(), "新增系统用户："+pageData.getString("USERNAME"));
			return ResultCode.SUCCESS.getValue();
		}else{
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 修改用户
	 */
	@RequestMapping(value="/updateSystemUserData",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String updateSystemUserData() throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"修改用户信息");
		PageData pageData = new PageData();
		try {
			//获取到传递的参数
			pageData = this.getPageData();
			if(pageData.getString("PASSWORD") != null && !"".equals(pageData.getString("PASSWORD"))){
				pageData.put("PASSWORD", new SimpleHash("SHA-1", pageData.getString("USERNAME"), pageData.getString("PASSWORD")).toString());
			}
			userService.editU(pageData);	//执行修改
			FHLOG.saveLogRecord(Jurisdiction.getUsername(), "修改系统用户："+pageData.getString("USERNAME"));
			return ResultCode.SUCCESS.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	
	/**
	 * 删除用户
	 */
	@RequestMapping(value="/deleteSystemUserData",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String deleteSystemUserData(Integer[] USER_IDS) throws Exception {
		logBefore(logger, Jurisdiction.getUsername()+"删除用户");
		try {
			if(null != USER_IDS && !"".equals(USER_IDS)){
				userService.deleteAllU(USER_IDS);
				FHLOG.saveLogRecord(Jurisdiction.getUsername(), "删除用户");
				return ResultCode.SUCCESS.getValue();
			}else{
				return ResultCode.FAILURE.getValue();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResultCode.FAILURE.getValue();
		}
	}
	

	/**
	 * 转到修改登录用户的密码页面
	 */
	@RequestMapping(value="/loginUserEditPassword")
	public ModelAndView loginUserEditPassword(String userId)throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("userId", userId);
		mv.addObject("pd", pd);	
		mv.setViewName("system/user/loginUserEditPassword");
		return mv;
	}
	
	/**
	 * 修改登录用户的密码操作
	 */
	@RequestMapping(value="/updateLoginUserPassword",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String updateLoginUserPassword(UpdatePasswordEntity updatePasswordEntity) throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"修改登录用户密码");
		PageData pd = new PageData();
		String newPassword = updatePasswordEntity.getNewPassword();
		pd.put("USER_ID", updatePasswordEntity.getUserId());
		PageData getDbPageData = (PageData)userService.findById(pd);
		String getDbUserName = (String)getDbPageData.get("USERNAME");
		if(newPassword != null && !"".equals(newPassword)){
			pd.put("PASSWORD", new SimpleHash("SHA-1", getDbUserName, newPassword).toString());
		}
		userService.updateLoginUserPassword(pd);	//执行修改
		FHLOG.saveLogRecord(Jurisdiction.getUsername(), "修改登录用户："+newPassword+"的密码");
		return ResultCode.SUCCESS.getValue();
	}
	

}
