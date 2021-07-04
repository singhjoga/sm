package com.spydermama.api.refdata;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.RegEx;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.LifecycleStatus;
import com.spydermama.api.common.domain.IdentifiableEntity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="REF_DATA")
@ApiModel(description = "System reference data")
public class RefData implements IdentifiableEntity<String>{

	@Id
	@Column(name="CODE")
	@Size(min = 3, max = 20, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Reference Code. Use as a Key other places for the references", position = 1, required=true)
	@Pattern(regexp = RegEx.NAME,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value = {Views.List.class, Views.Add.class})
	private String id;

	@Column(name="TYPE_CODE")
	@Size(min = 1, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Reference type code. One of the 'UserRefData' type code in System reference data", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String typeId;

	@Column(name="IS_DISABLED")
	@ApiModelProperty(value = "'true' if the entry is disabled i.e. not in use", position = 4,example = "false")
	@JsonView(value= {Views.Update.class,Views.List.class})
	@LifecycleStatus	
	private Boolean isDisabled;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public Boolean getIsDisabled() {
		return isDisabled;
	}
	public void setIsDisabled(Boolean isDisabled) {
		this.isDisabled = isDisabled;
	}
}
