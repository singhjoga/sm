package com.spydermama.api.propsets.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.RegEx;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.LifecycleStatus;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
@Entity(name="PROP_SET_PROP_VAL_VIEW")
@ApiModel(description = "Propertyset Property Value View")
public class PropertysetPropValueView{
	@Id 
	@ApiModelProperty(value = "Internal ID", position = 1, required=true, accessMode = AccessMode.READ_ONLY)
	@JsonView(value= {Views.List.class})
	@Column(name="PROP_SET_PROP_VAL_ID")
	private Long id;
	
	@ApiModelProperty(value = "Propertyset Property ID", position = 2, required=true)
	@JsonView(value= {Views.List.class, Views.Add.class})
	@Column(name="PROP_SET_PROP_ID")
	private Long propertyId;
	
	@Column(name="RES_INST_ID")
	@Size(min = 1, max = 200)
	@ApiModelProperty(value = "Resource Instance ID", position = 3, required=false)
	@JsonView(value= {Views.Allways.class})
	private String resourceInstanceId;

	@Column(name="PROP_INST_IDX")
	@ApiModelProperty(value = "Propery Instance Index", position = 4, required=false)
	@JsonView(value= {Views.Allways.class})
	private Integer propertyInstanceIndex;

	@Column
	@Size(max=3000)
	@JsonView(value = Views.Allways.class)
	@ApiModelProperty(value = "A valid value as per type", position = 11, required=true)
	private String value;

	@ApiModelProperty(value = "Propertyset ID", position = 2, required=true)
	@JsonView(value= {Views.List.class, Views.Add.class})
	@Column(name="PROP_SET_ID")
	private Long propertysetId;
	
	@Column(name="NAME")
	@Size(min = 1, max = 200)
	@NotNull(groups=OperationGroups.Add.class)
	@Pattern(regexp = RegEx.PROPERTY_NAME,groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Property name", position = 3, required=true)
	@JsonView(value= {Views.Allways.class})
	private String name;

	@Column(name="DISPLAY_NAME")
	@Size(min = 1, max = 200)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Property name", position = 4, required=true)
	@JsonView(value= {Views.Allways.class})
	private String displayName;
	
	@ApiModelProperty(value = "Display order", position = 5, required = true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@Column(name="DISPLAY_ORDER")
	@Min(0)
	@Max(999)
	private Integer displayOrder;
	
	@Column(name="TYPE_CODE")
	@Size(min = 1, max = 50)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Type of property e.g. STR, BOOL, NUM, UID, PWD etc.", position = 6, required=true, example="STR")
	@JsonView(value= {Views.Allways.class})	
	private String typeCode; 
	
	@Column(name="VALID_VALUES")
	@Size(max = 3000)
	@ApiModelProperty(value = "Valid values based on type code", position = 7, required=false)
	@JsonView(value= {Views.Allways.class})
	private String validValues;
	
	@ApiModelProperty(value = "'true' if the property is disabled i.e. not in use", position = 6,example = "false")
	@JsonView(value= {Views.Update.class,Views.List.class})
	@Column(name="IS_DISABLED")
	@LifecycleStatus
	private Boolean isDisabled=false;
	
	@ApiModelProperty(value = "'true' if the property is optional", position = 6,example = "false")
	@JsonView(value= {Views.Update.class,Views.List.class})
	@Column(name="IS_OPTIONAL")
	private Boolean isOptional=false;

	@ApiModelProperty(value = "'true' if the multiple instances of the properties are allowed", position = 7,example = "false")
	@JsonView(value= {Views.Update.class,Views.List.class})
	@Column(name="IS_MULTI_INST")
	private Boolean isMultiInstance=false;
	
	@Column(name="GROUP_NAME")
	@Size(max = 3000)
	@ApiModelProperty(value = "Grouping name. Used for displaying propertie", position = 8, required=false)
	@JsonView(value= {Views.Allways.class})
	private String groupName;	
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPropertysetId() {
		return propertysetId;
	}

	public void setPropertysetId(Long propertysetId) {
		this.propertysetId = propertysetId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
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

	public Boolean getIsDisabled() {
		return isDisabled;
	}

	public void setIsDisabled(Boolean isDisabled) {
		this.isDisabled = isDisabled;
	}

	public Boolean getIsOptional() {
		return isOptional;
	}

	public void setIsOptional(Boolean isOptional) {
		this.isOptional = isOptional;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
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

	public Boolean getIsMultiInstance() {
		return isMultiInstance;
	}

	public void setIsMultiInstance(Boolean isMultiInstance) {
		this.isMultiInstance = isMultiInstance;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}


}