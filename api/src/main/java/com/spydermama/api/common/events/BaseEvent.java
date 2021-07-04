package com.spydermama.api.common.events;

import com.spydermama.api.common.domain.Resource;

public class BaseEvent<T extends Resource> {
	private T data;
	private String resourceType;
	private String action;

	public BaseEvent(T data, String resourceType, String action) {
		super();
		this.data = data;
		this.resourceType = resourceType;
		this.action = action;
	}

	public T getData() {
		return data;
	}

	public String getResourceType() {
		return resourceType;
	}

	public String getAction() {
		return action;
	}
	
}
