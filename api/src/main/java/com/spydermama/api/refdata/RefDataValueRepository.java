package com.spydermama.api.refdata;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.spydermama.api.common.repos.EntityRepository;


public interface RefDataValueRepository extends EntityRepository<RefDataValue, RefDataValueId>{
	String QUERY1="SELECT v.* FROM REF_DATA_VAL v INNER JOIN REF_DATA d ON v.CODE=d.CODE AND d.IS_DISABLED=0 AND d.TYPE_CODE=?1"
			+ " WHERE  v.LANG_CODE=?2 ORDER BY d.DISPLAY_ORDER";
	@Query(value = QUERY1, nativeQuery = true)
	public List<RefDataValue> findByTypeCode(String typeCode, String langCode);
}
