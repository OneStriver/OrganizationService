package com.fh.service.system.buttonRight;

import java.util.List;

import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.MenuButton;

/** 
 * 按钮权限类
 */
public interface ButtonRightManager {
	
	/**
	 * 获取所有的菜单权限对应的按钮
	 */
	List<ButtonRight> getButtonRightByMenuId(PageData pageData) throws Exception;
	
	/**
	 * 获取所有的菜单权限对应的按钮
	 */
	List<ButtonRight> getButtonRightByRoleIdAndMenuId(PageData pageData) throws Exception;
	
	/**
	 * 查询数据库中所有的记录
	 */
	PageData countAllButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 获取当前菜单下的按钮
	 */
	PageData countOptionsButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 获取所有的菜单权限对应的按钮
	 */
	List<ButtonRight> listOptionsButtonRights(Page page) throws Exception;
	
	/**
	 * 获取所有的菜单按钮
	 */
	List<MenuButton> listAllSubMenuButton(PageData pageData) throws Exception;
	
	/**
	 * 给菜单页面添加按钮
	 */
	void addButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 修改页面菜单按钮
	 */
	void updateButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 删除页面菜单按钮
	 */
	void deleteButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 开启页面菜单按钮
	 */
	void openButtonRights(PageData pageData) throws Exception;
	
	/**
	 * 开启页面菜单按钮
	 */
	void closeButtonRights(PageData pageData) throws Exception;
	
}
