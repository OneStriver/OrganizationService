package com.fh.entity.consts;

public enum ResultCode {

	SUCCESS("0"), FAILURE("1");

	private String value;

	// 构造方法
	private ResultCode() {
	}

	private ResultCode(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
