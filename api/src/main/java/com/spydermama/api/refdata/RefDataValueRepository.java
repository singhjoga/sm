package com.spydermama.api.refdata;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.spydermama.api.common.repos.EntityRepository;


public interface RefDataValueRepository extends EntityRepository<RefDataValue, RefDataValueId>{
	String QUERY1="SELECT * FROM REF_DATA_VAL WHERE CODE IN (SELECT CODE FROM REF_DATA WHERE TYPE_CODE=?1 AND LANG_CODE=?2 AND IS_DISABLED=0) ORDER BY VALUE";
	@Query(value = QUERY1, nativeQuery = true)
	public List<RefDataValue> findByTypeCode(String typeCode, String langCode);
}
