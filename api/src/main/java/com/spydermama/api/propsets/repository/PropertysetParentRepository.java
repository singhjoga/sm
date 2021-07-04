package com.spydermama.api.propsets.repository;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;
import com.spydermama.api.propsets.domain.PropertysetParent;

public interface PropertysetParentRepository extends EntityRepository<PropertysetParent, PropertysetParent> {
	List<PropertysetParent> findByPropsetId(Long id);
}
