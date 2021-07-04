package com.spydermama.api.propsets.dto;

public class BaseProperty{
	private Long propertyId;
	private String name;
	private String typeCode;
	private String validValues;
	private Boolean isOptional=false;
	private String displayOrder;
	private Boolean isInherited=false;
	private Integer properyInstanceIndex;
	
	public Integer getProperyInstanceIndex() {
		return properyInstanceIndex;
	}
	public void setProperyInstanceIndex(Integer properyInstanceIndex) {
		this.properyInstanceIndex = properyInstanceIndex;
	}
	public Long getPropertyId() {
		return propertyId;
	}
	public void setPropertyId(Long id) {
		this.propertyId = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTypeCode() {
		return typeCode;
	}
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
	public String getValidValues() {
		return validValues;
	}
	public void setValidValues(String validValues) {
		this.validValues = validValues;
	}
	public Boolean getIsOptional() {
		return isOptional;
	}
	public void setIsOptional(Boolean isOptional) {
		this.isOptional = isOptional;
	}
	public String getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}
	public Boolean getIsInherited() {
		return isInherited;
	}
	public void setIsInherited(Boolean isInherited) {
		this.isInherited = isInherited;
	}
}
