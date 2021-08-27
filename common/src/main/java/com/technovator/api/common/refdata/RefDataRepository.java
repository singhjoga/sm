package com.technovator.api.common.refdata;

import java.util.List;

import com.technovator.api.common.repos.EntityRepository;


public interface RefDataRepository extends EntityRepository<RefData, String>{
	public List<RefData> findByTypeIdAndIsDisabledOrderByTypeIdAscIdAsc(String typeCode,Boolean isDisabled);
	List<RefData> findAllByIsDisabledOrderByTypeIdAscIdAsc(Boolean isDisabled);
}
