package com.fh.listener;

import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.mysql.jdbc.AbandonedConnectionCleanupThread;

/**
 * 关闭JDBC Driver监听器
 */
public class JdbcCleanUpContextListener implements ServletContextListener {

	@Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    	//这里如果Web应用拥有多个数据库的连接，可以一并关闭
    	try {
	        Enumeration<Driver> drivers = DriverManager.getDrivers();
	        Driver driver = null;
	        while (drivers.hasMoreElements()) {
	            driver = drivers.nextElement();
					DriverManager.deregisterDriver(driver);
	        }
	        AbandonedConnectionCleanupThread.shutdown();
    	} catch (SQLException e) {
    		e.printStackTrace();
    	} catch (InterruptedException e) {
    		e.printStackTrace();
    	}

    }


}
