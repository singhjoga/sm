package com.spydermama.api.propsets.repository;

import java.util.List;

import com.spydermama.api.propsets.domain.PropertysetPropValueView;
import com.technovator.api.common.db.EntityManagerProvider;
import com.technovator.api.common.db.NativeQueryBuilder;
import com.technovator.api.common.repos.EntityRepository;

public interface PropertysetPropValueViewRepository extends EntityRepository<PropertysetPropValueView, Long> {
	public List<PropertysetPropValueView> findByPropertysetIdAndResourceInstanceId(Long propsetId,String instanceId);
	public List<PropertysetPropValueView> findByPropertysetIdInAndResourceInstanceId(List<Long> propsetId,String instanceId);
	
	default public List<PropertysetPropValueView> findAll(Long propsetId, String envCode, String instanceId) {
		NativeQueryBuilder qb = new NativeQueryBuilder("SELECT * FROM prop_set_prop_val_view v","v.prop_set_id,v.display_order,v.prop_inst_idx");
		qb.appendWhere(propsetId, "v.prop_set_id", "=");
		qb.appendWhere(envCode, "v.ENV_CODE", "=");
		qb.appendWhere(instanceId, "v.RES_INST_ID", "=");
		javax.persistence.Query query = qb.buildNativeQuery(EntityManagerProvider.getEntityManager(), PropertysetPropValueView.class);
		List<PropertysetPropValueView> result = query.getResultList();
		return result;
	}	
	default public List<PropertysetPropValueView> findAllInherited(List<Long> parentIds, String envCode) {
		NativeQueryBuilder qb = new NativeQueryBuilder("SELECT * FROM prop_set_prop_val_view v","v.prop_set_id,v.display_order,v.prop_inst_idx");
		qb.appendWhere(parentIds, "v.prop_set_id", "IN");
		qb.appendWhere(envCode, "v.ENV_CODE", "=");
		qb.appendWhere("DEFAULT", "v.RES_INST_ID", "=");
		javax.persistence.Query query = qb.buildNativeQuery(EntityManagerProvider.getEntityManager(), PropertysetPropValueView.class);
		List<PropertysetPropValueView> result = query.getResultList();
		return result;
	}	
}
