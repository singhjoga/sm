package com.technovator.api.common.context;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
@Component
public class SpringContext implements ApplicationContextAware, EnvironmentAware{

	private static ApplicationContext context;
	private static Environment environment;
	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		this.context=context;
	}
	public static ApplicationContext getContext() {
		return context;
	}
	@Override
	public void setEnvironment(Environment environment) {
		this.environment=environment;
	}
	public static Environment getEnvironment() {
		return environment;
	}
	public static String getProperty(String key) {
		return getEnvironment().getProperty(key);
	}
	public static boolean isDebug() {
		 boolean isDebug =
			     java.lang.management.ManagementFactory.getRuntimeMXBean().
			         getInputArguments().toString().indexOf("-agentlib:jdwp") > 0;
		return isDebug;
	}
}
