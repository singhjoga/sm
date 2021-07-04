package com.spydermama.api.propsets.dto;

import com.spydermama.api.common.properties.PropertyWithValue;
import com.spydermama.api.common.properties.ReferencedValue;

public class SimpleProperty extends BaseProperty implements PropertyWithValue, ReferencedValue{
	private String value;
	private Object referencedValue;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Object getReferencedValue() {
		return referencedValue;
	}
	public void setReferencedValue(Object referencedValue) {
		this.referencedValue = referencedValue;
	}
}
