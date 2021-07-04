package com.spydermama.api.propsets.repository;

import com.spydermama.api.common.repos.EntityRepository;
import com.spydermama.api.propsets.domain.Propertyset;

public interface PropertysetRepository extends EntityRepository<Propertyset, Long> {
	Propertyset findByName(String name);
}
