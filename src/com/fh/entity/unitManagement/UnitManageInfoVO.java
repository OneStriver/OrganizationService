package com.fh.entity.unitManagement;

public class UnitManageInfoVO {

	private Integer unitId;
	private String unitName;
	private Integer unitParentId;
	private String unitParentName;
	private Integer unitOrder;

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Integer getUnitParentId() {
		return unitParentId;
	}

	public void setUnitParentId(Integer unitParentId) {
		this.unitParentId = unitParentId;
	}

	public String getUnitParentName() {
		return unitParentName;
	}

	public void setUnitParentName(String unitParentName) {
		this.unitParentName = unitParentName;
	}

	public Integer getUnitOrder() {
		return unitOrder;
	}

	public void setUnitOrder(Integer unitOrder) {
		this.unitOrder = unitOrder;
	}

}
