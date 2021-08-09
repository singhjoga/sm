package com.spydermama.api.system.country;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.spydermama.api.common.db.EntityManagerProvider;
import com.spydermama.api.common.db.NativeQueryBuilder;
import com.spydermama.api.common.repos.EntityRepository;


public interface CountryRepo extends EntityRepository<Country, String>{

	String QUERY1="SELECT c.CODE, c.DEF_LANG_CODE, c.ENG_NAME, n.LANG_CODE, n.LOCAL_NAME"+
				  " FROM COUNTRY c LEFT JOIN COUNTRY_NAME n ON c.CODE=n.CODE"+
				  " WHERE n.LANG_CODE = ?1 OR n.LANG_CODE IS NULL";
	@Query(value = QUERY1, nativeQuery = true)
	default List<CountryView> findByLangCode(String langCode) {
		NativeQueryBuilder qb = new NativeQueryBuilder("SELECT c.CODE, c.DEF_LANG_CODE, c.ENG_NAME, n.LANG_CODE, n.LOCAL_NAME FROM COUNTRY c", "n.LOCAL_NAME, c.ENG_NAME");
		qb.appendSql(" LEFT JOIN COUNTRY_NAME n ON c.CODE=n.CODE ");
		qb.appendWhere(langCode, "n.LANG_CODE", "=");
		qb.appendWhere("OR n.LANG_CODE IS NULL");
		
		javax.persistence.Query query = qb.buildNativeQuery(EntityManagerProvider.getEntityManager(), CountryView.class);
		@SuppressWarnings("unchecked")
		List<CountryView> result = query.getResultList();
		
		return result;
	}
}
