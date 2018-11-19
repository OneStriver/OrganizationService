package com.fh.controller.system.fhlog;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.entity.common.Page;
import com.fh.entity.common.PageData;
import com.fh.entity.system.ButtonRight;
import com.fh.entity.system.LogRecord;
import com.fh.entity.system.User;
import com.fh.service.system.buttonRight.ButtonRightManager;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.util.Jurisdiction;
import com.fh.util.excel.LogRecordExcelView;

import net.sf.json.JSONArray;

/** 
 * 说明：操作日志记录
 */
@Controller
@RequestMapping(value="/fhlog")
public class FHlogController extends BaseController {
	
	@Resource(name="fhlogService")
	private FHlogManager fhlogService;
	@Resource(name="buttonRightService")
	private ButtonRightManager buttonRightService;
	
	/**
	 * 转到日志页面
	 */
	@RequestMapping(value="/toListLogsPage")
	public ModelAndView toListLogsPage(Integer menuId,Model model)throws Exception{
		//根据当前角色ID和菜单ID获取某个页面的按钮权限
		PageData pageData = new PageData();
		pageData = this.getPageData();
		User loginUserRole = Jurisdiction.getLoginUserRole();
		Integer loginRoleId = loginUserRole.getRole().getROLE_ID();
		pageData.put("roleId", loginRoleId);
		pageData.put("menuId", menuId);
		List<ButtonRight> roleIdAndMenuIdButtonList = buttonRightService.getButtonRightByRoleIdAndMenuId(pageData);
		String roleIdAndMenuIdButtonListStr = JSONArray.fromObject(roleIdAndMenuIdButtonList).toString();
		ModelAndView mv = this.getModelAndView();
		model.addAttribute("buttonList", roleIdAndMenuIdButtonListStr);
		mv.setViewName("system/fhlog/fhlog_list");
		return mv;
	}
	
	/**
	 * 列表
	 */
	@RequestMapping(value="/listLogs")
	@ResponseBody
	public Map<String,Object> listLogs(int pageNumber,int pageSize,Page page) throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"查询FHLog表的日志记录");
		
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		pd = this.getPageData();
		String keywords = pd.getString("keywords");				//关键词检索条件
		if(null != keywords && !"".equals(keywords)){
			pd.put("keywords", keywords.trim());
		}
		String lastStart = pd.getString("lastStart");	//开始时间
		String lastEnd = pd.getString("lastEnd");		//结束时间
		if(lastStart != null && !"".equals(lastStart)){
			pd.put("lastStart", lastStart+" 00:00:00");
		}
		if(lastEnd != null && !"".equals(lastEnd)){
			pd.put("lastEnd", lastEnd+" 00:00:00");
		}
		//首先是查询出所有的记录条数
		PageData countLogRecordPageData = fhlogService.countLogRecord(pd);
		long logRecordCount = ((Long)countLogRecordPageData.get("logRecordCount")).longValue();
		//条件查询告警日志
		page.setPageData(pd);
		page.setCurrentStartIndex((pageNumber - 1) * pageSize);
		page.setPageSize(Math.min(pageSize, (int)logRecordCount));
		List<LogRecord> logRecordList = fhlogService.listLogRecord(page);		//列出FHlog列表
		map.put("total", logRecordCount);  
        map.put("rows", logRecordList);
		return map;
	}
	
	/**
	 * 删除
	 */
	@RequestMapping(value="/deleteCurrentLogRecord",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String deleteCurrentLogRecord() throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"删除FHlog表中的日志");
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			fhlogService.deleteLogRecord(pd);
			return "删除成功!";
		} catch (Exception e) {
			e.printStackTrace();
			return "删除失败!";
		}
	}
	
	 /**
	  * 批量删除
	  */
	@RequestMapping(value="/deleteSelectLogRecords",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String deleteSelectLogRecords(String[] DATA_IDS) throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"批量删除FHlog");
		if(null != DATA_IDS && !"".equals(DATA_IDS)){
			fhlogService.deleteBatchLogRecord(DATA_IDS);
			return "批量删除成功!";
		}else{
			return "没有日志数据!";
		}
	}
	
	 /**
	  * 导出到excel
	  */
	@RequestMapping(value="/exportAllLogRecords")
	public ModelAndView exportAllLogRecords(Page page) throws Exception{
		logBefore(logger, Jurisdiction.getUsername()+"导出FHlog表到Excel");
		ModelAndView mv = this.getModelAndView();
		Map<String,Object> logRecordMap = new HashMap<String,Object>();
		List<String> titles = new ArrayList<String>();
		titles.add("用户名"); 		
		titles.add("事件");			
		titles.add("操作时间");  		
		logRecordMap.put("titles", titles);
		//首先是查询出所有的记录条数
		PageData pageData = new PageData();
		pageData = this.getPageData();
		page.setPageData(pageData);
		page.setPageSize(0);
		List<LogRecord> allLogList = fhlogService.listLogRecord(page);
		logRecordMap.put("logRecordList", allLogList);
		LogRecordExcelView excelView = new LogRecordExcelView();	//执行excel操作
		mv = new ModelAndView(excelView,logRecordMap);
		return mv;
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder){
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(format,true));
	}
}
