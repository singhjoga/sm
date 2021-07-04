package com.spydermama.api.common.properties.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.domain.AbstractResource;

import io.swagger.annotations.ApiModelProperty;

@MappedSuperclass
public abstract class BasePropertyEntity<T extends BasePropertyEntity<T>> extends AbstractResource{
	@Column(name="NAME")
	@Size(min = 1, max = 500)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Property name", position = 1, required=true)
	@JsonView(value= {Views.Allways.class})
	private String name;
	
	@Size(max = 1000)
	@ApiModelProperty(value = "Long description", position = 2)
	@JsonView(value= {Views.Allways.class})
	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="TYPE_CODE")
	@Size(min = 1, max = 20)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Type of property e.g. STR, BOOL, NUM, UID, PWD etc.", position = 3, required=true, example="STR")
	@JsonView(value= {Views.Allways.class})	
	private String typeCode; 
	
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
	public String getTypeCode() {
		return typeCode;
	}
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public abstract T create();
	public T copy() {
		T copy = create();
		copyTo(copy);
		return copy;
	}
		
	public T copyTo(T copyTo) {
		copyTo.setDescription(description);
		copyTo.setName(name);
		copyTo.setTypeCode(typeCode);
		
		return copyTo;
	}
}