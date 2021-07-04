package com.spydermama.api.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="LOOKUP_DATA")
@ApiModel(value = "System reference data model")
public class LookupData {

	@Id
	@Column(name="CODE")
	@ApiModelProperty(value = "Short code. This code is referenced in other APIs")
	private String code;

	@Column(name="REFERENCE_TYPE")
	@ApiModelProperty(value = "Type of reference data")
	private String referenceType;
	
	@Column(name="DESCRIPTION")
	@ApiModelProperty(value = "Description of the reference data")
	private String description;

	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getReferenceType() {
		return referenceType;
	}
	public void setReferenceType(String referenceType) {
		this.referenceType = referenceType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
