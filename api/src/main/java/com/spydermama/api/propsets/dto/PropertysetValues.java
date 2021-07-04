package com.spydermama.api.propsets.dto;

import java.util.List;

public class PropertysetValues {
	private List<SimpleProperty> simpleProperties;

	public PropertysetValues(List<SimpleProperty> simpleProperties) {
		super();
		this.simpleProperties = simpleProperties;
	}
	public List<SimpleProperty> getSimpleProperties() {
		return simpleProperties;
	}
	public void setSimpleProperties(List<SimpleProperty> simpleProperties) {
		this.simpleProperties = simpleProperties;
	}
}
