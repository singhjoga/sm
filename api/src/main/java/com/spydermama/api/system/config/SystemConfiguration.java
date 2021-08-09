package com.spydermama.api.system.config;

import com.thetechnovator.common.java.utils.StringMap;

public class SystemConfiguration {
	public static String PROP_DEFAULT_LANGUAGE="defaultLanguageId";
	public static String PROP_COUNTRY="countryId";
	
	private StringMap propMap;

	public SystemConfiguration(StringMap propMap) {
		super();
		this.propMap = propMap;
	}
	public String defaultLanguage() {
		return propMap.get(PROP_DEFAULT_LANGUAGE);
	}
	public String country() {
		return propMap.get(PROP_COUNTRY);
	}
}
