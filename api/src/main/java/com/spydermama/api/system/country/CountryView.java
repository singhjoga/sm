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
import com.spydermama.api.system.language.Language;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;


@ApiModel(description = "Country names in language")
@Entity(name="COUNTRY_VIEW")
public class CountryView{

	@Id
	@Column(name="CODE")
	@Size(min = 3, max = 20, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Reference Code. Use as a Key other places for the references", position = 1, required=true)
	@Pattern(regexp = RegEx.NAME,groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value = {Views.List.class, Views.Add.class})
	private String countryId;

	@Column(name="ENG_NAME")
	@ApiModelProperty(value = "English name", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String englishName;
	
	@Column(name="LANG_CODE")
	@ApiModelProperty(value = "Language Id", position = 3, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Language.class)
	private String languageId;

	
	@Column(name="LOCAL_NAME")
	@ApiModelProperty(value = "Local name", position = 3, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String localName;

	@Column(name="DEF_LANG_CODE")
	@ApiModelProperty(value = "Default language Id", position = 4, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Language.class)
	private String defaultLanguageId;

	@Column(name="DATE_FORMAT")
	@ApiModelProperty(value = "Date format for UI", position = 4, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String dateFormat;
	
	public String getCountryId() {
		return countryId;
	}

	public void setCountryId(String countryId) {
		this.countryId = countryId;
	}

	public String getLanguageId() {
		return languageId;
	}

	public void setLanguageId(String languageId) {
		this.languageId = languageId;
	}

	public String getEnglishName() {
		return englishName;
	}

	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}

	public String getLocalName() {
		return localName;
	}

	public void setLocalName(String localName) {
		this.localName = localName;
	}

	public String getDefaultLanguageId() {
		return defaultLanguageId;
	}

	public void setDefaultLanguageId(String defaultLanguageId) {
		this.defaultLanguageId = defaultLanguageId;
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

}
