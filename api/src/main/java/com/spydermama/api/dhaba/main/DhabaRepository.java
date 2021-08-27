package com.spydermama.api.dhaba.main;

import java.util.List;

import com.technovator.api.common.repos.EntityRepository;


public interface DhabaRepository extends EntityRepository<Dhaba, String>{
	List<Dhaba> findAllByIsDisabledOrderByName(Boolean isDisabled);
	List<Dhaba> findAllByOrderByName();
}
