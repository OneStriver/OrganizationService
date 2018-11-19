package com.fh.service.system.menu;

import java.util.List;

import com.fh.entity.common.PageData;
import com.fh.entity.system.Menu;


/**
 * 说明：MenuService 菜单处理接口
 */
public interface MenuManager {

	/**
	 * @param parentId
	 */
	public List<Menu> listSubMenuByParentId(Integer parentId)throws Exception;
	
	/**
	 * @param pd
	 */
	public PageData getMenuById(PageData pd) throws Exception;
	
	/**
	 * @param menu
	 */
	public void saveMenu(Menu menu) throws Exception;
	
	/**
	 * @param pd
	 */
	public PageData findMaxId(PageData pd) throws Exception;
	
	/**
	 * @param MENU_ID
	 */
	public void deleteMenuById(Integer MENU_ID) throws Exception;
	
	/**
	 * @param menu
	 */
	public void edit(Menu menu) throws Exception;
	
	/**
	 * @param pd
	 */
	public PageData editicon(PageData pd) throws Exception;
	
	/**
	 * @param MENU_ID
	 */
	public List<Menu> listAllMenu(Integer MENU_ID) throws Exception;
	
	/**
	 * @param MENU_ID
	 */
	public List<Menu> listAllMenuQx(Integer MENU_ID) throws Exception;
}
