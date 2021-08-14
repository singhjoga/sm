package com.spydermama.api.address;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.OperationGroups;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.EntityReference;
import com.spydermama.api.common.domain.AbstractResource;
import com.spydermama.api.system.country.Country;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="ADDR")
@ApiModel(description = "Addresses")
public class Address extends AbstractResource<String>{
	@Column(name="OBJ_TYPE")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@NotNull(groups=OperationGroups.Add.class)
	@ApiModelProperty(value = "Object type", position = 5, required=false)
	@JsonView(value= {Views.Add.class})
	private String objectType;

	@Column(name="OBJ_ID")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Object id", position = 6, required=false)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Add.class, Views.List.class})
	private String objectId;
	
	@Column(name="COUNTRY_CODE")
	@ApiModelProperty(value = "Reference Id for Country", position = 7, required=true)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Country.class)
	private String countryId;

	@Column(name="ZIP")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Zip code", position = 8, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String zipCode;
	
	@Column(name="STATE")
	@Size(min = 0, max = 100, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "State", position = 9, required=false)
	@JsonView(value= {Views.Allways.class})
	private String state;
	
	@Column(name="CITY")
	@Size(min = 0, max = 100, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "City", position = 10, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String city;


	@Column(name="AREA")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Area", position = 11, required=false)
	@JsonView(value= {Views.Allways.class})
	private String area;

	@Column(name="STREET")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Street", position = 12, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	private String street;

	@Column(name="HNO")
	@Size(min = 0, max = 50, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "House No.", position = 13, required=true)
	@JsonView(value= {Views.Allways.class})
	private String houseNo;
	
	@Column(name="LONGITUDE")
	@ApiModelProperty(value = "Longitude coordinates", position = 14, required=false)
	@JsonView(value= {Views.Allways.class})
	private BigDecimal longitude;

	@Column(name="LATITUDE")
	@ApiModelProperty(value = "Latitude coordinates", position = 15, required=false)
	@JsonView(value= {Views.Allways.class})
	private BigDecimal latitude;

	@Column(name="IS_DEFAULT")
	@ApiModelProperty(value = "'true' if the address is default", position = 52,example = "false")
	@JsonView(value= {Views.Update.class,Views.List.class})
	private Boolean isDefault;
	
	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
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

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

}
