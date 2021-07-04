package com.spydermama.api.common.changehistory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spydermama.api.common.domain.Resource;

public interface AuditableChild<PARENT_ID> extends Resource{
	@JsonIgnore
	String getName();
	@JsonIgnore
	PARENT_ID getParentId();
	@JsonIgnore
	Class<? extends Auditable<?>> getParentEntity();
}
