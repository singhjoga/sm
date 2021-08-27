package com.spydermama.api.propsets.repository;

import java.util.List;

import com.spydermama.api.propsets.domain.PropertysetProp;
import com.technovator.api.common.db.EntityManagerProvider;
import com.technovator.api.common.db.NativeQueryBuilder;
import com.technovator.api.common.repos.EntityRepository;

public interface PropertysetPropRepository extends EntityRepository<PropertysetProp, Long> {
	List<PropertysetProp> findByPropertysetId(Long propsetId);
	default public List<PropertysetProp> findAllWihParent(Long propsetId) {
		String propsetFilter = "SELECT * FROM prop_set WHERE prop_set_id="+propsetId+" OR prop_set_id IN (SELECT parent_prop_set_id FROM prop_set_parent WHERE prop_set_id="+propsetId+")";
		NativeQueryBuilder qb = new NativeQueryBuilder("SELECT * FROM prop_set_prop v","v.prop_set_id,v.display_order");
		if (propsetId != null) {
			qb.appendSql(" INNER JOIN ("+propsetFilter+") s ON v.prop_set_id=s.prop_set_id");
		}
		javax.persistence.Query query = qb.buildNativeQuery(EntityManagerProvider.getEntityManager(), PropertysetProp.class);
		List<PropertysetProp> result = query.getResultList();
		return result;
	}	
}
