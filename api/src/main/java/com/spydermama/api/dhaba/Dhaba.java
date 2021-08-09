package com.spydermama.api.dhaba;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.EntityReference;
import com.spydermama.api.common.annotations.UniqueKey;
import com.spydermama.api.common.domain.AbstractResource;
import com.spydermama.api.system.country.Country;
import com.spydermama.api.system.language.Language;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="CUST")
@ApiModel(description = "Customer profile")
public class Dhaba extends AbstractResource<String>{

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
	
	@Column(name="COUNTRY_CODE")
	@ApiModelProperty(value = "Reference Id for Country", position = 5, required=true)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Country.class)
	private String countryId;

	@Column(name="ZIP")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Zip code", position = 6, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String zipCode;

	@Column(name="AREA")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Area", position = 7, required=false)
	@JsonView(value= {Views.Allways.class})
	private String area;

	@Column(name="STREET")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Street", position = 8, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String street;

	@Column(name="HNO")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "House No.", position = 9, required=true)
	@JsonView(value= {Views.Allways.class})
	private String houseNo;

	@Column(name="CITY")
	@Size(min = 0, max = 100, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "City", position = 10, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String city;

	@Column(name="STATE")
	@Size(min = 0, max = 100, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "State", position = 11, required=false)
	@JsonView(value= {Views.Allways.class})
	private String state;

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

	public String getFirstName() {
		return firstName;
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

	public String getCountryId() {
		return countryId;
	}

	public void setCountryId(String countryId) {
		this.countryId = countryId;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getHouseNo() {
		return houseNo;
	}

	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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

}
