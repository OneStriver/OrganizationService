package com.fh.service.unitManagement.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.unitManagement.UnitManagementInfo;
import com.fh.service.unitManagement.UnitManagementService;

/** 
 * 说明： 部队单位信息管理
 */
@Service("unitManagementService")
public class UnitMangementServiceImpl implements UnitManagementService{

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Override
	public void insertUnitManagementInfo(UnitManagementInfo unitManagementInfo) throws Exception {
		dao.save("UnitManagementMapper.insertUnitManagementInfo", unitManagementInfo);
	}

	@Override
	public void updateUnitManagementInfo(UnitManagementInfo unitManagementInfo) throws Exception {
		dao.update("UnitManagementMapper.updateUnitManagementInfo", unitManagementInfo);
	}

	@Override
	public void deleteUnitManagementInfo(PageData pd) throws Exception {
		dao.delete("UnitManagementMapper.deleteUnitManagementInfo", pd);
	}
	
	@Override
	public PageData countAllUnitManagementInfo(PageData pd) throws Exception {
		return (PageData)dao.findForObject("UnitManagementMapper.countAllUnitManagementInfo", pd);
	}

	@Override
	public PageData countUnitManagementInfo(PageData pd) throws Exception {
		return (PageData)dao.findForObject("UnitManagementMapper.countUnitManagementInfo", pd);
	}
	
	/**
	 * 根据id查询当前单位信息
	 */
	@Override
	public UnitManagementInfo getUnitManagementInfoById(PageData pageData) throws Exception {
		return (UnitManagementInfo)dao.findForObject("UnitManagementMapper.getUnitManagementInfoById", pageData);
	}
	
	/**
	 * 分页获取子单位信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<UnitManagementInfo> listPageSubUnitManagementInfo(Page page) throws Exception {
		return (List<UnitManagementInfo>)dao.findForList("UnitManagementMapper.listPageSubUnitManagementInfo", page);
	}

	/**
	 * 左侧树显示出所有的单位管理的层级和子层级
	 */
	@Override
	public List<UnitManagementInfo> listUnitInfoAndSubUnitInfo(Integer unitParentId) throws Exception {
		List<UnitManagementInfo> subUnitManagementInfoByParentIdList = this.listSubUnitManagementInfoByParentId(unitParentId);
		for(UnitManagementInfo unitManagementInfo : subUnitManagementInfoByParentIdList){
			unitManagementInfo.setSubUnitManagementInfo(this.listUnitInfoAndSubUnitInfo(unitManagementInfo.getUnitId()));
			if(unitManagementInfo.getSubUnitManagementInfo()!=null && unitManagementInfo.getSubUnitManagementInfo().size()!=0){
				unitManagementInfo.setParentNode(true);
			}else{
				unitManagementInfo.setParentNode(false);
			}
		}
		return subUnitManagementInfoByParentIdList;
	}
	
	/**
	 * 查询当前直属当前单位的,不查询子单位
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<UnitManagementInfo> listSubUnitManagementInfoByParentId(Integer unitParentId) throws Exception {
		return (List<UnitManagementInfo>)dao.findForList("UnitManagementMapper.listSubUnitManagementInfoByParentId", unitParentId);
	}

	/**
	 * 循环查询出该节点下面的所有子节点
	 */
	@Override
	public List<UnitManagementInfo> listCurrentUnitInfoAndSubUnitInfo(Integer unitParentId,List<UnitManagementInfo> list) throws Exception {
		List<UnitManagementInfo> subUnitManagementInfoByParentIdList = this.listSubUnitManagementInfoByParentId(unitParentId);
		for(UnitManagementInfo unitManagementInfo : subUnitManagementInfoByParentIdList){
			list.add(unitManagementInfo);
			this.listCurrentUnitInfoAndSubUnitInfo(unitManagementInfo.getUnitId(),list);
		}
		return list;
	}

}

