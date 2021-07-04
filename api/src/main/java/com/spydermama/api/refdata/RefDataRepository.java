package com.spydermama.api.refdata;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;


public interface RefDataRepository extends EntityRepository<RefData, String>{
	public List<RefData> findByTypeIdAndIsDisabledOrderByTypeIdAscIdAsc(String typeCode,Boolean isDisabled);
	List<RefData> findAllByIsDisabledOrderByTypeIdAscIdAsc(Boolean isDisabled);
}
