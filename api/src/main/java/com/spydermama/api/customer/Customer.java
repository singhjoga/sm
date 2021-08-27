package com.spydermama.api.customer;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.system.constants.SystemReferenceDataType;
import com.spydermama.api.system.language.Language;
import com.technovator.api.common.annotations.EntityReference;
import com.technovator.api.common.annotations.PastDate;
import com.technovator.api.common.annotations.SystemReferenceData;
import com.technovator.api.common.annotations.UniqueKey;
import com.technovator.api.common.auditlog.AuditableMain;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.OperationGroups;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.domain.AbstractResource;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="CUST")
@ApiModel(description = "Customer profile")
public class Customer extends AbstractResource<String> implements AuditableMain<String>{

	@Column(name="FIRST_NAME")
	@Size(min = 1, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "First name", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String firstName;	

	@Column(name="LAST_NAME")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Last name", position = 3, required=false)
	@JsonView(value= {Views.Allways.class})
	private String lastName;	

	@Column(name="EMAIL")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Email address", position = 4, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@UniqueKey
	private String email;	

	@Column(name="PHONE")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Phone", position = 12, required=false)
	@JsonView(value= {Views.Allways.class})
	private String phone;

	@Column(name="MOBILE")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Mobile phone no", position = 13, required=false)
	@JsonView(value= {Views.Allways.class})
	private String mobile;

	@Column(name="LANG_CODE")
	@ApiModelProperty(value = "Reference Id for Language", position = 14, required=false)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Language.class)
	private String languageId;	

	@Column(name="SEX_TYPE")
	@ApiModelProperty(value = "Sex type", position = 15, required=false)
	@JsonView(value= {Views.Allways.class})
	@SystemReferenceData(value = SystemReferenceDataType.SexType)
	private String sexType;
	
	@Column(name="BIRTH_DATE")
	@ApiModelProperty(value = "Date of birth", position = 16, required=false)
	@JsonView(value= {Views.Allways.class})
	@PastDate(years = 16)
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date birthDate;
	
	public String getFirstName() {
		return firstName;
	}

	public String getSexType() {
		return sexType;
	}

	public void setSexType(String sexType) {
		this.sexType = sexType;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLanguageId() {
		return languageId;
	}

	public void setLanguageId(String languageId) {
		this.languageId = languageId;
	}

	@Override
	public String getAppObjectType() {
		return AppObjects.CustomersCode;
	}

	@Override
	public String getName() {
		return firstName+" "+lastName;
	}

}
