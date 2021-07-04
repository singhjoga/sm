package com.spydermama.api.cache;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.spydermama.api.system.language.LanguageService;

@Component
public class StaticCache {
	private static final Logger LOG = LoggerFactory.getLogger(StaticCache.class);

	private EntityReferenceCache entityReferenceCache;
	
	@Autowired
	private LanguageService langService;
	
	private Set<String> languages;
	
	public void init() {
		loadLanguages();
		entityReferenceCache = new EntityReferenceCache();
		entityReferenceCache.init();
	}

	public EntityReferenceCache getEntityReferenceCache() {
		return entityReferenceCache;
	}

	public Set<String> getLanguages() {
		return languages;
	}

	private void loadLanguages() {
		languages = new HashSet<>();
		langService.findAll().stream().forEach(e->languages.add(e.getId()));
	}
}
