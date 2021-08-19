package com.spydermama.api.system.language;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;


public interface LanguageRepo extends EntityRepository<Language, String>{
	List<Language> findAllByIsDisabled(Boolean isDisabled);
}
