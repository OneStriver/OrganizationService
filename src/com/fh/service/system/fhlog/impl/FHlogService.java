package com.fh.service.system.fhlog.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.LogRecord;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.util.Tools;

/** 
 * 说明： 操作日志记录
 */
@Service("fhlogService")
public class FHlogService implements FHlogManager{

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	private PageData pageData = new PageData();
	
	/**
	 * 新增
	 */
	@Override
	public void saveLogRecord(String USERNAME, String CONTENT)throws Exception{
		PageData countLogRecordPageData = countLogRecord(pageData);
		long logRecordCount = ((Long)countLogRecordPageData.get("logRecordCount")).longValue();
		PageData pd = new PageData();
		//pd.put("FHLOG_ID", UuidUtil.get32UUID());		//主键
		pd.put("FHLOG_ID", (int)logRecordCount+1);		//主键
		pd.put("USERNAME", USERNAME);					//用户名
		pd.put("CONTENT", CONTENT);						//事件
		pd.put("CZTIME", Tools.date2Str(new Date()));	//操作时间
		dao.save("FHlogMapper.saveLogRecord", pd);
	}
	
	/**
	 * 删除
	 */
	@Override
	public void deleteLogRecord(PageData pd)throws Exception{
		dao.delete("FHlogMapper.deleteLogRecord", pd);
	}

	@Override
	public PageData countLogRecord(PageData pd) throws Exception {
		return (PageData)dao.findForObject("FHlogMapper.countLogRecord", pd);
	}
	
	/**
	 * 列表(条件查询)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<LogRecord> listLogRecord(Page page)throws Exception{
		return (List<LogRecord>)dao.findForList("FHlogMapper.listLogRecord", page);
	}
	
	/**
	 * 批量删除
	 */
	@Override
	public void deleteBatchLogRecord(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("FHlogMapper.deleteBatchLogRecord", ArrayDATA_IDS);
	}
	
}

