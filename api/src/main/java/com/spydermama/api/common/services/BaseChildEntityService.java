package com.spydermama.api.common.services;

import java.io.Serializable;
import java.util.List;

import com.spydermama.api.common.domain.IdentifiableEntity;
import com.spydermama.api.common.repos.ChildEntityRepository;

public abstract class BaseChildEntityService<T extends IdentifiableEntity<ID>, ID extends Serializable, PARENT_ID extends Serializable> extends BaseCrudService<T,ID>{
	private ChildEntityRepository<T, ID,PARENT_ID> repo;	
	public BaseChildEntityService(ChildEntityRepository<T, ID, PARENT_ID> repo, Class<T> entityClass, Class<ID> idClass) {
		super(repo,entityClass,idClass);
		this.repo = repo;
	}
	public List<T> findAll(PARENT_ID parentId) {
		return repo.findAll(parentId);
	}
}
