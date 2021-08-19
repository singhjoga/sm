package com.spydermama.api.common.events;

import com.spydermama.api.common.domain.AppObect;

public class ResourceChangeEvent<T extends AppObect> extends BaseEvent<T>{
	public ResourceChangeEvent(T data, String resourceType, String action) {
		super(data, resourceType, action);
	}
}
