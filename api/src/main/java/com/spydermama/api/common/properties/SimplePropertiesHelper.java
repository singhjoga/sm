package com.spydermama.api.common.properties;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thetechnovator.common.java.utils.StringMap;

@Component
public class SimplePropertiesHelper {
	public StringMap toStringMap(List<? extends PropertyWithValue> props) {
		StringMap result = new StringMap();
		for (PropertyWithValue prop: props) {
			result.put(prop.getName(), prop.getValue());
		}
		
		return result;
	}
}
