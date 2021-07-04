package com.spydermama.api.system.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.common.services.BaseEntityService;

@Service
public class LanguageService extends BaseEntityService<Language, String>{
	@Autowired
	public LanguageService(LanguageRepo repo) {
		super(repo, Language.class, String.class);
	}
}
