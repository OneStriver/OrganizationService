package com.fh.service.system.buttonRight.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.MenuButton;
import com.fh.service.system.buttonRight.ButtonRightManager;

/**
 * 菜单对应页面中的按钮权限类
 */
@Service("buttonRightService")
public class ButtonRightService implements ButtonRightManager {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	/**
	 * 根据菜单ID获取菜单页面中的按钮
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<ButtonRight> getButtonRightByMenuId(PageData pageData) throws Exception {
		return (List<ButtonRight>) dao.findForList("ButtonRightMapper.getButtonRightByMenuId", pageData);
	}
	
	/**
	 * 根据菜单ID和角色ID获取页面中的按钮
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<ButtonRight> getButtonRightByRoleIdAndMenuId(PageData pageData) throws Exception {
		return (List<ButtonRight>) dao.findForList("ButtonRightMapper.getButtonRightByRoleIdAndMenuId", pageData);
	}
	
	/**
	 * 统计数据库中所有数据
	 */
	@Override
	public PageData countAllButtonRights(PageData pageData) throws Exception {
		return (PageData)dao.findForObject("ButtonRightMapper.countAllButtonRights", pageData);
	}

	/**
	 * 统计菜单下的按钮数量
	 */
	@Override
	public PageData countOptionsButtonRights(PageData pageData) throws Exception {
		return (PageData)dao.findForObject("ButtonRightMapper.countOptionsButtonRights", pageData);
	}
	
	/**
	 * 条件获取菜单按钮权限
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<ButtonRight> listOptionsButtonRights(Page page) throws Exception {
		return (List<ButtonRight>) dao.findForList("ButtonRightMapper.listOptionsButtonRights", page);
	}
	
	/**
	 * 获取所有的按钮信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<MenuButton> listAllSubMenuButton(PageData pageData) throws Exception {
		return (List<MenuButton>) dao.findForList("ButtonRightMapper.listAllSubMenuButton", pageData);
	}
	
	@Override
	public void addButtonRights(PageData pageData) throws Exception {
		dao.save("ButtonRightMapper.addButtonRights", pageData);
	}

	@Override
	public void updateButtonRights(PageData pageData) throws Exception {
		dao.update("ButtonRightMapper.updateButtonRights", pageData);
	}

	@Override
	public void deleteButtonRights(PageData pageData) throws Exception {
		dao.delete("ButtonRightMapper.deleteButtonRights", pageData);
	}

	@Override
	public void openButtonRights(PageData pageData) throws Exception {
		dao.update("ButtonRightMapper.openButtonRights", pageData);
	}

	@Override
	public void closeButtonRights(PageData pageData) throws Exception {
		dao.update("ButtonRightMapper.closeButtonRights", pageData);
	}
	
}
