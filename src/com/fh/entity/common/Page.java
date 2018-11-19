package com.fh.entity.common;

/**
 * 分页类
 */
public class Page {

	private int pageNumber; // 当前页
	private int pageSize; // 每页显示记录数
	private int currentStartIndex; // 当前查询起始索引
	private int totalPage; // 总页数
	private int totalResult; // 总记录数
	private PageData pageData = new PageData();

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * 根据pageNo和pageSize计算当前页第一条记录在总结果集中的位置,序号从1开始.
	 */
	public int getStartOffSet() {
		return (pageNumber - 1) * pageSize;
	}
	
	public int getEndOffSet() {
		return Math.min(pageSize, totalResult);
	}

	public int getTotalPage() {
		if (totalResult % pageSize == 0) {
			totalPage = totalResult / pageSize;
		} else {
			totalPage = totalResult / pageSize + 1;
		}
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalResult() {
		return totalResult;
	}

	public void setTotalResult(int totalResult) {
		this.totalResult = totalResult;
	}

	public int getCurrentStartIndex() {
		return currentStartIndex;
	}

	public void setCurrentStartIndex(int currentStartIndex) {
		this.currentStartIndex = currentStartIndex;
	}

	public int getShowCount() {
		return pageSize;
	}

	public void setShowCount(int showCount) {

		this.pageSize = showCount;
	}

	public PageData getPageData() {
		return pageData;
	}

	public void setPageData(PageData pageData) {
		this.pageData = pageData;
	}

}
