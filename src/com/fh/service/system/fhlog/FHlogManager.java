package com.fh.service.system.fhlog;

import java.util.List;

import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.LogRecord;

/** 
 * 说明： 操作日志记录接口
 */
public interface FHlogManager{

	/**
	 * 新增
	 */
	public void saveLogRecord(String USERNAME, String CONTENT)throws Exception;
	
	/**
	 * 删除
	 */
	public void deleteLogRecord(PageData pd)throws Exception;
	
	/**
	 * 列表(全部)
	 */
	public PageData countLogRecord(PageData pd)throws Exception;
	
	/**
	 * 列表
	 */
	public List<LogRecord> listLogRecord(Page page)throws Exception;
	
	/**
	 * 批量删除
	 */
	public void deleteBatchLogRecord(String[] ArrayDATA_IDS)throws Exception;
	
}

