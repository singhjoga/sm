package com.spydermama.api.propsets.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.properties.PropertyValue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
@Entity(name="PROP_SET_PROP_VAL")
@ApiModel(description = "Propertyset Property Value")
public class PropertysetPropValue implements PropertyValue{
	@Id 
	@Schema(description = "Internal ID", position = 1, required=true, accessMode = AccessMode.READ_ONLY)
	@JsonView(value= {Views.List.class})
	@Column(name="PROP_SET_PROP_VAL_ID")
	private Long id;
	
	@Schema(description = "Propertyset Property ID", position = 2, required=true)
	@JsonView(value= {Views.List.class, Views.Add.class})
	@Column(name="PROP_SET_PROP_ID")
	private Long propertyId;
	
	@Column(name="RES_INST_ID")
	@Size(min = 1, max = 200)
	@Schema(description = "Resource Instance ID", position = 3, required=false)
	@JsonView(value= {Views.Allways.class})
	private String resourceInstanceId;

	@Column(name="PROP_INST_IDX")
	@Schema(description = "Propery Instance Index", position = 4, required=false)
	@JsonView(value= {Views.Allways.class})
	private Integer propertyInstanceIndex;
	
	@Column
	@Size(max=3000)
	@JsonView(value = Views.Allways.class)
	@Schema(description = "A valid value as per type", position = 11, required=true)
	private String value;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getResourceInstanceId() {
		return resourceInstanceId;
	}

	public void setResourceInstanceId(String resourceInstanceId) {
		this.resourceInstanceId = resourceInstanceId;
	}

	public Integer getPropertyInstanceIndex() {
		return propertyInstanceIndex;
	}

	public void setPropertyInstanceIndex(Integer propertyInstanceIndex) {
		this.propertyInstanceIndex = propertyInstanceIndex;
	}

}