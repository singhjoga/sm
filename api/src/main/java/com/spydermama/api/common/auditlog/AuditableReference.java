package com.spydermama.api.common.auditlog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spydermama.api.common.domain.AppObect;

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
