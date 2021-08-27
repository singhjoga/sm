package com.technovator.api.common.auditlog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.technovator.api.common.domain.AppObect;

public interface AuditableChild<PARENT_ID> extends AppObect{
	@JsonIgnore
	String getName();
	@JsonIgnore
	PARENT_ID getParentId();
	@JsonIgnore
	Class<? extends AuditableMain<?>> getParentEntity();
}
