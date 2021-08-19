package com.spydermama.api.common.auditlog;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AuditLogRepository extends CrudRepository<AuditLog, Long>{
	List<AuditLog> findByObjectTypeAndObjectIdOrderByDateDesc(String resource, String resourceId);
}
