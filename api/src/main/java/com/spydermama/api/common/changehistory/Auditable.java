package com.spydermama.api.common.changehistory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spydermama.api.common.domain.Resource;

public interface Auditable<ID> extends Resource{
	@JsonIgnore
	String getName();
	ID getId();
}
