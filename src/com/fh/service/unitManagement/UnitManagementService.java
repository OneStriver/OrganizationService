package com.fh.service.unitManagement;

import java.util.List;

import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.unitManagement.UnitManagementInfo;

/** 
 * 说明： 部队单位信息接口类
 */
public interface UnitManagementService{
	
	/**
	 * 新增
	 */
	public void insertUnitManagementInfo(UnitManagementInfo unitManagementInfo)throws Exception;
	
	/**
	 * 修改
	 */
	public void updateUnitManagementInfo(UnitManagementInfo unitManagementInfo)throws Exception;
	
	/**
	 * 删除
	 */
	public void deleteUnitManagementInfo(PageData pd)throws Exception;
	
	/**
	 * 统计所有的单位信息
	 */
	public PageData countAllUnitManagementInfo(PageData pd)throws Exception;
	
	/**
	 * 条件统计当前单位信息
	 */
	public PageData countUnitManagementInfo(PageData pd)throws Exception;
	
	/**
	 * 条件查询单位信息
	 */
	public List<UnitManagementInfo> listPageSubUnitManagementInfo(Page page)throws Exception;
	
	/**
	 * 条件查询单位信息
	 */
	public UnitManagementInfo getUnitManagementInfoById(PageData pageData)throws Exception;
	
	/**
	 * 条件查询单位信息
	 */
	public List<UnitManagementInfo> listSubUnitManagementInfoByParentId(Integer unitParentId)throws Exception;
	
	/**
	 * 树形结构展示使用
	 */
	public List<UnitManagementInfo> listUnitInfoAndSubUnitInfo(Integer unitParentId)throws Exception;
	
	/**
	 * 树形结构展示使用
	 */
	public List<UnitManagementInfo> listCurrentUnitInfoAndSubUnitInfo(Integer unitParentId,List<UnitManagementInfo> list)throws Exception;
	
}

