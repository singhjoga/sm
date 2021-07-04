package com.spydermama.api.common.services;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.spydermama.api.cache.StaticCache;
import com.spydermama.api.common.domain.IdentifiableEntity;
import com.spydermama.api.common.repos.BaseRepository;
import com.spydermama.api.exception.ResourceNotFoundException;
import com.spydermama.api.system.config.SystemConfiguration;

public class BaseEntityService<T extends IdentifiableEntity<ID>, ID extends Serializable> extends BaseService {

	protected BaseRepository<T, ID> repo;
	protected Class<T> entityClass;
	@Autowired
	protected StaticCache staticCache;

	public BaseEntityService(BaseRepository<T, ID> repo, Class<T> entityClass, Class<ID> idClass) {
		super();
		this.repo=repo;
		this.entityClass=entityClass;
	}

	public T getById(ID id) {
		return getById(id, false);
	}

	public T getById(ID id, boolean optionaö) {
		T obj = repo.findById(id).orElse(null);
		if (obj == null && !optionaö) {
			throw new ResourceNotFoundException(entityClass.getSimpleName(), id.toString());
		}
		return obj;
	}

	public T findById(ID id) {
		T obj = repo.findById(id).orElse(null);
	
		return obj;
	}

	public List<T> findAll() {
		return repo.findAll();
	}
	
	public String getApplicableLanguage(String requestLanguage) {
		Set<String> allowedLangues = staticCache.getLanguages();
		if (allowedLangues.contains(requestLanguage)) {
			return requestLanguage;
		}
		// if request language contains a locale specific, search without it
		if (requestLanguage.contains("-")) {
			requestLanguage = StringUtils.substringBefore(requestLanguage, "-");			
		}
		if (allowedLangues.contains(requestLanguage)) {
			return requestLanguage;
		}else {
			return SystemConfiguration.DEFAULT_LANGUAGE;
		}
	}
}