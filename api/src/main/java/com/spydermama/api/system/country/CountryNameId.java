package com.spydermama.api.system.country;

import java.io.Serializable;

import javax.persistence.Column;

public class CountryNameId implements Serializable{
	private static final long serialVersionUID = -4206628926761273927L;

	@Column(name="CODE")
	private String countryId;

	@Column(name="LANG_CODE")
	private String languageId;

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

}
