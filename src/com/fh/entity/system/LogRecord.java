package com.fh.entity.system;

/**
 * 日志记录实体
 */
public class LogRecord {

	private String FHLOG_ID;
	private String USERNAME;
	private String CONTENT;
	private String CZTIME;

	public String getFHLOG_ID() {
		return FHLOG_ID;
	}

	public void setFHLOG_ID(String fHLOG_ID) {
		FHLOG_ID = fHLOG_ID;
	}

	public String getUSERNAME() {
		return USERNAME;
	}

	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}

	public String getCONTENT() {
		return CONTENT;
	}

	public void setCONTENT(String cONTENT) {
		CONTENT = cONTENT;
	}

	public String getCZTIME() {
		return CZTIME;
	}

	public void setCZTIME(String cZTIME) {
		CZTIME = cZTIME;
	}

}
