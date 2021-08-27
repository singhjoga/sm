package com.spydermama.api.system.cache;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.spydermama.api.system.SystemService;
import com.spydermama.api.system.config.SystemConfiguration;
import com.spydermama.api.system.language.LanguageService;

@Component
public class StaticCache {
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
	
}
