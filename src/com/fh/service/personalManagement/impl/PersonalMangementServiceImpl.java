package com.fh.service.personalManagement.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.dataSourceConfig.DataSourceContextHolder;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.personalManagement.HssDeviceType;
import com.fh.entity.personalManagement.HssVoiceType;
import com.fh.entity.personalManagement.TerminalUserInfoDO;
import com.fh.service.personalManagement.PersonalManagementService;

/** 
 * 说明： 部队单位信息管理
 */
@Service("personalManagementService")
public class PersonalMangementServiceImpl implements PersonalManagementService{

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	

	@Override
	public PageData countAllHssTerminalUserInfo(PageData pd) throws Exception {
		DataSourceContextHolder.setCustomerType("dataSourceTwo");
		return (PageData)dao.findForObject("HssUserInfoMapper.countAllHssTerminalUserInfo", pd);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TerminalUserInfoDO> listTerminalUserInfoPage(Page page) throws Exception {
		DataSourceContextHolder.setCustomerType("dataSourceTwo");
		return (List<TerminalUserInfoDO>)dao.findForList("HssUserInfoMapper.listTerminalUserInfoPage", page);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<HssVoiceType> getAllHssVoiceType(PageData pd) throws Exception {
		DataSourceContextHolder.setCustomerType("dataSourceThree");
		return (List<HssVoiceType>)dao.findForList("HssUserInfoMapper.getAllHssVoiceType", pd);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<HssDeviceType> getAllHssDeviceType(PageData pd) throws Exception {
		DataSourceContextHolder.setCustomerType("dataSourceThree");
		return (List<HssDeviceType>)dao.findForList("HssUserInfoMapper.getAllHssDeviceType", pd);
	}
	
}

