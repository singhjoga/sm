package com.spydermama.api.dhaba.admins;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.base.AppObjects;
import com.spydermama.api.common.services.BaseChildEntityService;

@Service
public class DhabaAdminService extends BaseChildEntityService<DhabaAdmin, DhabaAdmin, String>{
	private DhabaAdminRepository repo;
	@Autowired
	public DhabaAdminService(DhabaAdminRepository repo) {
		super(repo, DhabaAdmin.class, DhabaAdmin.class);
		this.repo = repo;
	}

	public List<DhabaAdmin> findAll() {
		return findAll(false);
	}
	public List<DhabaAdmin> findAll(Boolean isDisabled) {
		if (isDisabled == null) {
			repo.findAll();
		}
		return null;
	}

	@Override
	protected String getAppObjectType() {
		return AppObjects.DhabasAdminCode;
	}
}
