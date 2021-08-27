package com.technovator.api.common.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStartedEvent;
import org.springframework.context.event.ContextStoppedEvent;
import org.springframework.stereotype.Component;

import com.technovator.api.common.cache.StaticCache;

@Component
public class StartupInitializer implements ApplicationListener<ApplicationContextEvent>{
	private static final Logger LOG = LoggerFactory.getLogger(StartupInitializer.class);

	@Autowired
	private StaticCache cache;
	
	@Override
	public void onApplicationEvent(ApplicationContextEvent event) {
		if (event instanceof ContextRefreshedEvent) {
			LOG.info("Initializing application...");
			cache.init();
			LOG.info("Application initialization completed");
		}if (event instanceof ContextClosedEvent) {
			LOG.info("Closing application");

		}if (event instanceof ContextStartedEvent) {
			LOG.info("ContextStartedEvent");
		}if (event instanceof ContextStoppedEvent) {
			LOG.info("ContextStoppedEvent");
		}			
	}

}
