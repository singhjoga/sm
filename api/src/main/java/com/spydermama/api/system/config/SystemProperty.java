package com.spydermama.api.system.config;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.Views;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="SYSTEM_PROP")
@ApiModel(description = "System Properties")
public class SystemProperty{

	@Id
	@Column(name="NAME")
	@ApiModelProperty(value = "Property name", position = 1, required=true)
	@JsonView(value = {Views.Allways.class})
	private String name;

	@Column(name="VALUE")
	@ApiModelProperty(value = "Property value", position = 2, required=true)
	@JsonView(value= {Views.Allways.class})
	private String value;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
