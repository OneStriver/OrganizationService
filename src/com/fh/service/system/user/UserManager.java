package com.fh.service.system.user;

import java.util.List;

import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.User;
/** 
 * 用户接口类
 */
public interface UserManager {
	
	/**
	 * 登录判断
	 */
	public PageData getUserByNameAndPwd(PageData pd)throws Exception;
	
	/**
	 * 更新登录时间
	 */
	public void updateLastLogin(PageData pd)throws Exception;
	
	/**
	 * 通过用户ID获取用户信息和角色信息
	 */
	public User getUserAndRoleById(Integer USER_ID) throws Exception;
	
	/**
	 * 通过USERNAEME获取数据
	 */
	public PageData findByUsername(PageData pd)throws Exception;
	
	/**
	 * 列出某角色下的所有用户
	 */
	public List<PageData> listAllUserByRoldId(PageData pd) throws Exception;
	
	/**
	 * 列出某角色下的所有用户
	 */
	public PageData countAllUser(PageData pd) throws Exception;
	
	/**
	 * 用户列表
	 */
	public List<User> listUsers(Page page)throws Exception;
	
	/**
	 * 通过id获取数据
	 */
	public PageData findById(PageData pd)throws Exception;
	
	/**
	 * 修改用户
	 */
	public void editU(PageData pd)throws Exception;
	
	
	/**
	 * 保存用户
	 */
	public void saveU(PageData pd)throws Exception;
	
	/**
	 * 删除用户
	 */
	public void deleteU(PageData pd)throws Exception;
	
	/**
	 * 批量删除用户
	 */
	public void deleteAllU(Integer[] USER_IDS)throws Exception;
	
	/**
	 * 修改登录用户的密码
	 */
	public void updateLoginUserPassword(PageData pd)throws Exception;
	
	/**
	 * 获取总数
	 */
	public PageData getUserCount(PageData pd)throws Exception;
	
}
