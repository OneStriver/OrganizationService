package com.fh.service.personalManagement;

import java.util.List;

import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.personalManagement.HssDeviceType;
import com.fh.entity.personalManagement.HssVoiceType;
import com.fh.entity.personalManagement.TerminalUserInfoDO;

/** 
 * 说明： 部队单位下面的人员接口类
 */
public interface PersonalManagementService{
	
	/**
	 * 统计某个部队单位层级下面的所有人员(包括子层级下面的人员)
	 */
	public PageData countAllHssTerminalUserInfo(PageData pd)throws Exception;
	
	/**
	 * 条件查询用户信息
	 */
	public List<TerminalUserInfoDO> listTerminalUserInfoPage(Page page)throws Exception;
	
	/**
	 * 查询所有的语音编码
	 */
	public List<HssVoiceType> getAllHssVoiceType(PageData pd)throws Exception;
	
	/**
	 * 查询所有的设备类型
	 */
	public List<HssDeviceType> getAllHssDeviceType(PageData pd)throws Exception;
	
	
}

