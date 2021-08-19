package com.spydermama.api.system.language;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.common.services.BaseEntityService;

@Service
public class LanguageService extends BaseEntityService<Language, String>{
	private LanguageRepo repo;
	@Autowired
	public LanguageService(LanguageRepo repo) {
		super(repo, Language.class, String.class);
		this.repo=repo;
	}
	public List<Language> findAllByIsDisabled(Boolean isDisabled){
		return repo.findAllByIsDisabled(isDisabled);
	}
}
