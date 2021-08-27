package com.technovator.api.common.auditlog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.technovator.api.common.domain.AppObect;

public interface AuditableReference<PARENT_ID, REF_ID> extends AppObect{
	@JsonIgnore
	PARENT_ID getParentId();
	@JsonIgnore
	Class<? extends AuditableMain<?>> getParentEntity();
	
	@JsonIgnore
	REF_ID getReferenceId();
	@JsonIgnore
	Class<? extends AuditableMain<?>> getReferenceEntity();
}
