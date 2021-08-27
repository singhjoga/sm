package com.spydermama.api.propsets.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.AppObjects;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.auditlog.AuditableMain;
import com.spydermama.api.common.domain.IdentifiableEntity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="PROP_SET")
@ApiModel(description = "Propertyset model")
public class Propertyset implements AuditableMain<Long>,IdentifiableEntity<Long>{

	@Id
	@Column(name="PROP_SET_ID")
	@ApiModelProperty(value = "Internal ID", position = 1, required=true)
	@JsonView(value= {Views.List.class})
	private Long id;
	@Column(name="NAME")
	@Size(min = 1, max = 200,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Name", position = 2, required=true)
	@JsonView(value= {Views.Allways.class})
	private String name;
	@Column(name="DESCRIPTION")
	@Size(max = 3000,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Long description", position = 3,required=false)
	@JsonView(value= {Views.Allways.class})
	private String description;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String getAppObjectType() {
		return AppObjects.Propertysets;
	}
	
}
