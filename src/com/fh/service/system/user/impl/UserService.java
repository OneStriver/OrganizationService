package com.fh.service.system.user.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.User;
import com.fh.service.system.user.UserManager;


/**
 * 系统用户
 */
@Service("userService")
public class UserService implements UserManager{

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/**
	 * 登录判断
	 */
	public PageData getUserByNameAndPwd(PageData pd)throws Exception{
		return (PageData)dao.findForObject("UserMapper.getUserInfo", pd);
	}
	
	/**
	 * 更新登录时间
	 */
	public void updateLastLogin(PageData pd)throws Exception{
		dao.update("UserMapper.updateLastLogin", pd);
	}
	
	/**
	 * 通过用户ID获取用户信息和角色信息
	 */
	public User getUserAndRoleById(Integer USER_ID) throws Exception {
		return (User) dao.findForObject("UserMapper.getUserAndRoleById", USER_ID);
	}
	
	/**
	 * 通过USERNAEME获取数据
	 */
	public PageData findByUsername(PageData pd)throws Exception{
		return (PageData)dao.findForObject("UserMapper.findByUsername", pd);
	}
	
	/**
	 * 列出某角色下的所有用户
	 */
	@SuppressWarnings("unchecked")
	public List<PageData> listAllUserByRoldId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("UserMapper.listAllUserByRoldId", pd);
	}
	
	/**
	 * 统计数据库中用户数量
	 */
	@Override
	public PageData countAllUser(PageData pd) throws Exception {
		return (PageData) dao.findForObject("UserMapper.countAllUser", pd);
	}
	
	/**
	 * 用户列表
	 */
	@SuppressWarnings("unchecked")
	public List<User> listUsers(Page page)throws Exception{
		return (List<User>) dao.findForList("UserMapper.userlistPage", page);
	}
	
	/**
	 * 通过id获取数据
	 */
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("UserMapper.findById", pd);
	}
	
	/**
	 * 保存用户
	 */
	public void saveU(PageData pd)throws Exception{
		dao.save("UserMapper.saveU", pd);
	}
	 
	/**
	 * 修改用户
	 */
	public void editU(PageData pd)throws Exception{
		dao.update("UserMapper.editU", pd);
	}
	
	/**
	 * 删除用户
	 */
	public void deleteU(PageData pd)throws Exception{
		dao.delete("UserMapper.deleteU", pd);
	}
	
	/**
	 * 批量删除用户
	 */
	public void deleteAllU(Integer[] USER_IDS)throws Exception{
		dao.delete("UserMapper.deleteAllU", USER_IDS);
	}
	
	/**
	 * 更新登录用户的密码
	 */
	@Override
	public void updateLoginUserPassword(PageData pd) throws Exception {
		dao.update("UserMapper.updateLoginUserPassword", pd);
	}
	
	/**
	 * 获取总数
	 */
	public PageData getUserCount(PageData pd)throws Exception{
		return (PageData)dao.findForObject("UserMapper.getUserCount", pd);
	}
	
}
