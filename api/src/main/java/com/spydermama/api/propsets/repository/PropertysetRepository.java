package com.spydermama.api.propsets.repository;

import com.spydermama.api.propsets.domain.Propertyset;
import com.technovator.api.common.repos.EntityRepository;

public interface PropertysetRepository extends EntityRepository<Propertyset, Long> {
	Propertyset findByName(String name);
}
