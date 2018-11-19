package com.fh.entity.system;

import java.io.Serializable;

/**
 * 类名称：用户
 * @author HeYin
 */
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer USER_ID; // 用户id
	private String USERNAME; // 用户名
	private String NICKNAME; // 昵称
	private String PASSWORD; // 密码
	private String RIGHTS; // 权限
	private Integer ROLE_ID; // 角色id
	private String ROLENAME; // 角色名字
	private String IP; // 用户登录ip地址
	private String LAST_LOGIN; // 最后登录时间
	private String STATUS; // 状态
	private String BZ; // 备注
	private Role role; // 角色对象

	private String keywords; // 关键词
	private String lastLoginStart;
	private String lastLoginEnd;

	private int pageNumber;
	private int pageSize;

	public User() {
		super();
	}

	public Integer getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(Integer uSER_ID) {
		USER_ID = uSER_ID;
	}

	public String getUSERNAME() {
		return USERNAME;
	}

	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}

	public String getNICKNAME() {
		return NICKNAME;
	}

	public void setNICKNAME(String nICKNAME) {
		NICKNAME = nICKNAME;
	}

	public String getPASSWORD() {
		return PASSWORD;
	}

	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}

	public String getRIGHTS() {
		return RIGHTS;
	}

	public void setRIGHTS(String rIGHTS) {
		RIGHTS = rIGHTS;
	}

	public Integer getROLE_ID() {
		return ROLE_ID;
	}

	public void setROLE_ID(Integer rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}

	public String getLAST_LOGIN() {
		return LAST_LOGIN;
	}

	public void setLAST_LOGIN(String lAST_LOGIN) {
		LAST_LOGIN = lAST_LOGIN;
	}

	public String getIP() {
		return IP;
	}

	public void setIP(String iP) {
		IP = iP;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getROLENAME() {
		return ROLENAME;
	}

	public void setROLENAME(String rOLENAME) {
		ROLENAME = rOLENAME;
	}

	public String getBZ() {
		return BZ;
	}

	public void setBZ(String bZ) {
		BZ = bZ;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getLastLoginStart() {
		return lastLoginStart;
	}

	public void setLastLoginStart(String lastLoginStart) {
		this.lastLoginStart = lastLoginStart;
	}

	public String getLastLoginEnd() {
		return lastLoginEnd;
	}

	public void setLastLoginEnd(String lastLoginEnd) {
		this.lastLoginEnd = lastLoginEnd;
	}

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

}
