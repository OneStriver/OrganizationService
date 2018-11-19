package com.fh.entity.unitManagement;

import java.util.List;

public class UnitManagementInfo {

	private Integer unitId;
	private String unitName;
	private Integer unitParentId;
	private Integer unitOrder;
	private String unitIcon;
	private UnitManagementInfo parentUnitManagementInfo;
	private List<UnitManagementInfo> subUnitManagementInfo;
	private boolean hasUnitManagementInfo = false;
	private boolean parentNode = false;
	
	public UnitManagementInfo() {
		super();
	}
	
	public UnitManagementInfo(Integer unitId, String unitName) {
		super();
		this.unitId = unitId;
		this.unitName = unitName;
	}

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

	public Integer getUnitOrder() {
		return unitOrder;
	}

	public void setUnitOrder(Integer unitOrder) {
		this.unitOrder = unitOrder;
	}

	public String getUnitIcon() {
		return unitIcon;
	}

	public void setUnitIcon(String unitIcon) {
		this.unitIcon = unitIcon;
	}

	public UnitManagementInfo getParentUnitManagementInfo() {
		return parentUnitManagementInfo;
	}

	public void setParentUnitManagementInfo(UnitManagementInfo parentUnitManagementInfo) {
		this.parentUnitManagementInfo = parentUnitManagementInfo;
	}

	public List<UnitManagementInfo> getSubUnitManagementInfo() {
		return subUnitManagementInfo;
	}

	public void setSubUnitManagementInfo(List<UnitManagementInfo> subUnitManagementInfo) {
		this.subUnitManagementInfo = subUnitManagementInfo;
	}

	public boolean isHasUnitManagementInfo() {
		return hasUnitManagementInfo;
	}

	public void setHasUnitManagementInfo(boolean hasUnitManagementInfo) {
		this.hasUnitManagementInfo = hasUnitManagementInfo;
	}

	public boolean isParentNode() {
		return parentNode;
	}

	public void setParentNode(boolean parentNode) {
		this.parentNode = parentNode;
	}

}
