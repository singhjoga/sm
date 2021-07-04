package com.spydermama.api.common.properties;

public interface PropertyValue {
	String getValue();
	void setValue(String value);
	default Boolean getIsInherited() {
		return false;
	}
	default void setIsInherited(Boolean isInherited) {
	}
}