package com.spydermama.api.dhaba;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.base.AppObjects;
import com.spydermama.api.common.services.BaseCrudService;

@Service
public class DhabaService extends BaseCrudService<Dhaba, String>{
	private DhabaRepository repo;
	@Autowired
	public DhabaService(DhabaRepository repo) {
		super(repo, Dhaba.class, String.class);
		this.repo = repo;
	}

	public List<Dhaba> findAll() {
		return findAll(false);
	}
	public List<Dhaba> findAll(Boolean isDisabled) {
		if (isDisabled == null) {
			repo.findAll();
		}
		return repo.findAllByIsDisabledOrderByFirstName(isDisabled);
	}

	@Override
	protected String getResourceType() {
		return AppObjects.DhabasCode;
	}
}
