package com.fh.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.fh.controller.base.BaseController;

/**
 * 启动TOMCAT时运行此类
 */
public class StartFilter extends BaseController implements Filter{
	
	public void init(FilterConfig filterConfig) throws ServletException {
		/*
        ServletContext servletContext = filterConfig.getServletContext();
    	ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
    	*/
	}
	
	public void destroy() {
		
	}
	
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		
	}

}
