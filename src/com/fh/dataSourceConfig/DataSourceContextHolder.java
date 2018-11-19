package com.fh.dataSourceConfig;

public class DataSourceContextHolder {
	
	private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();
	
	public static void setCustomerType(String customerType){
		contextHolder.set(customerType);
	}
	
	public static String getCustomType(){
		return contextHolder.get();
	}
	
	public static void clearCustomerType(){
		contextHolder.remove();
	}
	
}
