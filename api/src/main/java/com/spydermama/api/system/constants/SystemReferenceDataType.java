package com.spydermama.api.system.constants;

public enum SystemReferenceDataType {
	SexType("sex_type");//
	
	private String code;

	private SystemReferenceDataType(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}
	
}
