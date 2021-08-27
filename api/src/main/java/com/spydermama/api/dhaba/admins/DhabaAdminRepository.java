package com.spydermama.api.dhaba.admins;

import java.util.List;

import com.technovator.api.common.repos.ChildEntityRepository;


public interface DhabaAdminRepository extends ChildEntityRepository<DhabaAdmin, DhabaAdmin, String>{
	default List<DhabaAdmin> findAll(String dhabaId) {
		return findAllByDhabaId(dhabaId);
	}
	List<DhabaAdmin> findAllByDhabaId(String dhabaId);
}
