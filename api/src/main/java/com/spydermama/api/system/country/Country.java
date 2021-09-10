package com.spydermama.api.system.country;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.system.language.Language;
import com.technovator.api.common.annotations.EntityReference;
import com.technovator.api.common.constants.OperationGroups;
import com.technovator.api.common.constants.RegEx;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.domain.IdentifiableEntity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="COUNTRY")
@ApiModel(description = "Country")
public class Country implements IdentifiableEntity<String>{

	@Id
	@Column(name="CODE")
	@Size(min = 3, max = 20, groups=OperationGroups.Always.class)
	@Schema(description = "Reference Code. Use as a Key other places for the references", position = 1, required=true)
	@Pattern(regexp = RegEx.NAME,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value = {Views.List.class, Views.Add.class})
	private String id;

	@Column(name="DEF_LANG_CODE")
	@Schema(description = "Default language Id", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Language.class)
	private String defaultLanguageId;

	@Column(name="ENG_NAME")
	@Schema(description = "Name in English", position = 3, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String englishName;
	
	@Column(name="DATE_FORMAT")
	@Schema(description = "Date format for UI", position = 4, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String dateFormat;
	
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
	public String getEnglishName() {
		return englishName;
	}
	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}
	public String getDateFormat() {
		return dateFormat;
	}
	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

}
