package com.spydermama.api.propsets.dto;

public class UpdateRequest{
	private Long propertyId;
	private String value;
	private Integer properyInstanceIndex;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Integer getProperyInstanceIndex() {
		return properyInstanceIndex;
	}
	public void setProperyInstanceIndex(Integer properyInstanceIndex) {
		this.properyInstanceIndex = properyInstanceIndex;
	}
	public Long getPropertyId() {
		return propertyId;
	}
	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

}
