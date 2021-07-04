package com.spydermama.api.common.db;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
@Component
public class EntityManagerProvider implements ApplicationContextAware{

	private static ApplicationContext context;

	@PersistenceContext
	private EntityManager em;
	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		this.context=context;
	}
	public static ApplicationContext getContext() {
		return context;
	}
	public static EntityManager getEntityManager() {

		EntityManagerProvider self = context.getBean(EntityManagerProvider.class);
		return self.em;
	}
	
	public static void closeEntityManager() {

	}
	
	public static EntityManagerFactory getEntityManagerFactory() {
		return context.getBean(EntityManagerFactory.class);
	}
}
