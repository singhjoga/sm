package com.spydermama.api.common.properties;

import java.util.List;

public interface PropertyWithValueList<V extends PropertyValue> extends Property{
	public List<V> getValues();
	public void setValues(List<V> values);
}
