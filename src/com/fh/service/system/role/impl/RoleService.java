package com.fh.service.system.role.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.common.PageData;
import com.fh.entity.system.Role;
import com.fh.service.system.role.RoleManager;

/**	
 * 角色
 */
@Service("roleService")
public class RoleService implements RoleManager{

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/**
	 * 列出此组下级角色
	 */
	@SuppressWarnings("unchecked")
	public List<Role> listAllRolesByPId(PageData pd) throws Exception {
		return (List<Role>) dao.findForList("RoleMapper.listAllRolesByPId", pd);
	}
	
	/**
	 * 通过id查找
	 */
	public PageData findObjectById(PageData pd) throws Exception {
		return (PageData)dao.findForObject("RoleMapper.findObjectById", pd);
	}

	/**
	 * 统计所有的角色
	 */
	@Override
	public PageData countAllRole(PageData pd) throws Exception {
		return (PageData)dao.findForObject("RoleMapper.countAllRole", pd);
	}
	
	/**
	 * 添加
	 */
	public void add(PageData pd) throws Exception {
		dao.save("RoleMapper.insert", pd);
	}
	
	/**
	 * 保存修改
	 */
	public void edit(PageData pd) throws Exception {
		dao.update("RoleMapper.edit", pd);
	}
	
	/**
	 * 删除角色
	 */
	public void deleteRoleById(Integer ROLE_ID) throws Exception {
		dao.delete("RoleMapper.deleteRoleById", ROLE_ID);
	}
	
	/**
	 * 给当前角色附加菜单权限
	 */
	public void updateRoleRights(Role role) throws Exception {
		dao.update("RoleMapper.updateRoleRights", role);
	}
	
	/**
	 * 通过id查找
	 */
	public Role getRoleById(Integer ROLE_ID) throws Exception {
		return (Role) dao.findForObject("RoleMapper.getRoleById", ROLE_ID);
	}
	
	/**
	 * 给全部子角色加菜单权限
	 */
	public void setAllRights(PageData pd) throws Exception {
		dao.update("RoleMapper.setAllRights", pd);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Role> listAllRoles(PageData pd) throws Exception {
		return (List<Role>) dao.findForList("RoleMapper.listAllRoles", pd);
	}
	
}
