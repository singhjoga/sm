package com.spydermama.api.refdata;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.common.services.BaseEntityService;

@Service
public class RefDataService extends BaseEntityService<RefData, String>{
	@Autowired
	private RefDataValueRepository valueRepo;
	private RefDataRepository repo;
	@Autowired
	public RefDataService(RefDataRepository repo) {
		super(repo, RefData.class, String.class);
		this.repo = repo;
	}

	public List<RefData> findAll() {
		return findAll(false);
	}
	public List<RefData> findAll(Boolean isDisabled) {
		if (isDisabled == null) {
			repo.findAll();
		}
		return repo.findAllByIsDisabledOrderByTypeIdAscIdAsc(isDisabled);
	}

	public List<RefDataValue> findByReferenceType(String typeCode, String langCode) {
		return valueRepo.findByTypeCode(typeCode, getApplicableLanguage(langCode));
	}
	
}
