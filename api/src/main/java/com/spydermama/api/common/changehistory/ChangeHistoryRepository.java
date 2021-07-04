package com.spydermama.api.common.changehistory;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ChangeHistoryRepository extends CrudRepository<ChangeHistory, Long>{
	List<ChangeHistory> findByEntityTypeAndEntityIdOrderByDateDesc(String resource, String resourceId);
}
