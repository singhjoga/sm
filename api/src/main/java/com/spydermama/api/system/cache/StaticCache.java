package com.spydermama.api.system.cache;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.spydermama.api.system.SystemService;
import com.spydermama.api.system.config.SystemConfiguration;
import com.spydermama.api.system.language.LanguageService;
import com.technovator.api.common.cache.SystemCache;

@Component
@Primary
public class StaticCache implements SystemCache{
	private static final Logger LOG = LoggerFactory.getLogger(StaticCache.class);
	@Autowired
	private LanguageService langService;
	@Autowired
	private SystemService systemService;
	
	private Set<String> languages;
	private SystemConfiguration systemConfig;
	
	public void init() {
		loadLanguages();
		systemConfig = new SystemConfiguration(systemService.getProperties());
	}
	public Set<String> getLanguages() {
		return languages;
	}

	public SystemConfiguration getSystemConfig() {
		return systemConfig;
	}

	private void loadLanguages() {
		languages = new HashSet<>();
		langService.findAllByIsDisabled(false).stream().forEach(e->languages.add(e.getId()));
	}
	@Override
	public String getDefaultLanguageId() {
		return getSystemConfig().defaultLanguage();
	}
	@Override
	public void load() {
		// TODO Auto-generated method stub
		
	}
	
}
