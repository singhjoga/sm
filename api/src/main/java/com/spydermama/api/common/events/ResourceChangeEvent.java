package com.spydermama.api.common.events;

import com.spydermama.api.common.domain.Resource;

public class ResourceChangeEvent<T extends Resource> extends BaseEvent<T>{
	public ResourceChangeEvent(T data, String resourceType, String action) {
		super(data, resourceType, action);
	}
}
