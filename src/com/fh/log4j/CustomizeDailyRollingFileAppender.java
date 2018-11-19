package com.fh.log4j;

import org.apache.log4j.DailyRollingFileAppender;
import org.apache.log4j.Priority;

public class CustomizeDailyRollingFileAppender extends DailyRollingFileAppender {
	
	@Override  
    public boolean isAsSevereAsThreshold(Priority priority) {  
        return this.getThreshold().equals(priority);  
    }

}
