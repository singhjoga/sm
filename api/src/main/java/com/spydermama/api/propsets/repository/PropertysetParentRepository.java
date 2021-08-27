package com.spydermama.api.propsets.repository;

import java.util.List;

import com.spydermama.api.propsets.domain.PropertysetParent;
import com.technovator.api.common.repos.EntityRepository;

public interface PropertysetParentRepository extends EntityRepository<PropertysetParent, PropertysetParent> {
	List<PropertysetParent> findByPropsetId(Long id);
}
