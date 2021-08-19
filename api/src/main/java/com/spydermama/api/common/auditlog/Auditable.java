package com.spydermama.api.common.auditlog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spydermama.api.common.domain.AppObect;

public interface Auditable<ID> extends AppObect{
	@JsonIgnore
	String getName();
	ID getId();
}
