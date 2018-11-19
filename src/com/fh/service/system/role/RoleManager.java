package com.fh.service.system.role;

import java.util.List;

import com.fh.entity.common.PageData;
import com.fh.entity.system.Role;

/**	
 * 角色接口类
 */
public interface RoleManager {
	
	/**
	 * 列出此组下级角色
	 */
	public List<Role> listAllRolesByPId(PageData pd) throws Exception;
	
	/**
	 * 通过id查找
	 */
	public PageData findObjectById(PageData pd) throws Exception;
	
	/**
	 * 统计所有的角色
	 */
	public PageData countAllRole(PageData pd) throws Exception;
	
	/**
	 * 添加
	 */
	public void add(PageData pd) throws Exception;
	
	/**
	 * 保存修改
	 */
	public void edit(PageData pd) throws Exception;
	
	/**
	 * 删除角色
	 */
	public void deleteRoleById(Integer ROLE_ID) throws Exception;
	
	/**
	 * 给当前角色附加菜单权限
	 */
	public void updateRoleRights(Role role) throws Exception;
	
	/**
	 * 通过id查找
	 */
	public Role getRoleById(Integer ROLE_ID) throws Exception;
	
	/**
	 * 给全部子角色加菜单权限
	 */
	public void setAllRights(PageData pd) throws Exception;
	
	/**
	 * 获取所有的角色
	 */
	public List<Role> listAllRoles(PageData pd) throws Exception;
	
}
