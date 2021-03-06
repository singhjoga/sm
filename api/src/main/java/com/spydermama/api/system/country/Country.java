package com.spydermama.api.system.country;

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
import com.spydermama.api.common.annotations.EntityReference;
import com.spydermama.api.common.domain.IdentifiableEntity;
import com.spydermama.api.system.language.Language;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="COUNTRY")
@ApiModel(description = "Supported languages")
public class Country implements IdentifiableEntity<String>{

	@Id
	@Column(name="CODE")
	@Size(min = 3, max = 20, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Reference Code. Use as a Key other places for the references", position = 1, required=true)
	@Pattern(regexp = RegEx.NAME,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value = {Views.List.class, Views.Add.class})
	private String id;

	@Column(name="DEF_LANG_CODE")
	@ApiModelProperty(value = "Default language Id", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Language.class)
	private String defaultLanguageId;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDefaultLanguageId() {
		return defaultLanguageId;
	}
	public void setDefaultLanguageId(String defaultLanguageId) {
		this.defaultLanguageId = defaultLanguageId;
	}

}
