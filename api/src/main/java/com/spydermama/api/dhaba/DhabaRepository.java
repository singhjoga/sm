package com.spydermama.api.dhaba;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;


public interface DhabaRepository extends EntityRepository<Dhaba, String>{
	List<Dhaba> findAllByIsDisabledOrderByFirstName(Boolean isDisabled);
}
