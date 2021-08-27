package com.technovator.api.common.refdata;

import java.io.Serializable;

import javax.persistence.Column;

public class RefDataValueId implements Serializable{

	private static final long serialVersionUID = 6274251513201884474L;

	@Column(name="CODE")
	private String code;

	@Column(name="LANG_CODE")
	private String languageCode;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLanguageCode() {
		return languageCode;
	}

	public void setLanguageCode(String languageCode) {
		this.languageCode = languageCode;
	}

}
