package com.spydermama.api.propsets.repository;

import java.util.List;

import com.spydermama.api.common.db.EntityManagerProvider;
import com.spydermama.api.common.db.NativeQueryBuilder;
import com.spydermama.api.common.repos.EntityRepository;
import com.spydermama.api.propsets.domain.PropertysetProp;
import com.spydermama.api.propsets.domain.PropertysetPropValue;

public interface PropertysetPropValueRepository extends EntityRepository<PropertysetPropValue, Long> {
	List<PropertysetProp> findByPropertyId(Long propsetId);
	default public List<PropertysetPropValue> search(Long propsetId, String envCode, String instanceId) {
		
		NativeQueryBuilder qb = new NativeQueryBuilder("SELECT * FROM prop_set_prop_val v",null);
		if (propsetId != null) {
			qb.appendSql("INNER JOIN prop_set_prop p ON v.prop_set_prop_id=p.prop_set_prop_id ");
			qb.appendSql("INNER JOIN prop_set s ON p.prop_set_id=s.prop_set_id AND s.prop_set_id=?",propsetId);
		}
		qb.appendWhere(envCode, "v.ENV_CODE", "=");
		qb.appendWhere(instanceId, "v.RES_INST_ID", "=");
		javax.persistence.Query query = qb.buildNativeQuery(EntityManagerProvider.getEntityManager(), PropertysetPropValue.class);
		List<PropertysetPropValue> result = query.getResultList();
		return result;
	}
	PropertysetPropValue findByPropertyIdAndResourceInstanceIdAndPropertyInstanceIndex(Long propId, String resInstId, Integer propInstIdx);
}
