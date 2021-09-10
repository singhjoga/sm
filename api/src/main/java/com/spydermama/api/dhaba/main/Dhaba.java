package com.spydermama.api.dhaba.main;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.address.Address;
import com.technovator.api.common.annotations.UniqueKey;
import com.technovator.api.common.auditlog.AuditableMain;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.OperationGroups;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.domain.AbstractResource;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="DHABA")
@ApiModel(description = "Dhaba profile")
public class Dhaba extends AbstractResource<String> implements AuditableMain<String>{

	@Column(name="NAME")
	@Size(min = 1, max = 500, groups=OperationGroups.Always.class)
	@Schema(description = "Name", position = 2, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@UniqueKey
	private String name;	

	@Column(name="ORDER_EMAIL")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@Schema(description = "Email for orders", position = 3, required=false)
	@JsonView(value= {Views.Allways.class})
	private String orderEmail;	

	@Column(name="ORDER_PHONE")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@Schema(description = "Phone no. for orders", position = 4, required=false)
	@JsonView(value= {Views.Allways.class})
	private String orderPhone;
	
	@Column(name="TAX_NO")
	@Size(min = 0, max = 500, groups=OperationGroups.Always.class)
	@Schema(description = "Tax no", position = 5, required=true)
	@JsonView(value= {Views.Allways.class})
	private String taxNo;

	@Column(name="DELIVERY_SELF")
	@Schema(description = "Makes delivery by itself", position = 6, required=false)
	@JsonView(value= {Views.Allways.class})
	private Boolean deliverySelf;

	@Column(name="DELIVERY_PICKUP")
	@Schema(description = "Allows self pickup", position = 7, required=false)
	@JsonView(value= {Views.Allways.class})
	private Boolean deliveryPickup;
	
	@Column(name="DELIVERY_DINEIN")
	@Schema(description = "Allows dine-in", position = 8, required=false)
	@JsonView(value= {Views.Allways.class})
	private Boolean deliveryDineIn;
	
	@Column(name="DELIVERY_3RDPARTY")
	@Schema(description = "Delivery through 3rd party", position = 9, required=false)
	@JsonView(value= {Views.Allways.class})
	private Boolean delivery3rdParty;

	@Transient
	@JsonView(value= {Views.Allways.class})
	private List<Address> addresses;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getOrderEmail() {
		return orderEmail;
	}

	public void setOrderEmail(String orderEmail) {
		this.orderEmail = orderEmail;
	}

	public String getOrderPhone() {
		return orderPhone;
	}

	public void setOrderPhone(String orderPhone) {
		this.orderPhone = orderPhone;
	}

	public String getTaxNo() {
		return taxNo;
	}

	public void setTaxNo(String taxNo) {
		this.taxNo = taxNo;
	}

	public Boolean getDeliverySelf() {
		return deliverySelf;
	}

	public void setDeliverySelf(Boolean deliverySelf) {
		this.deliverySelf = deliverySelf;
	}

	public Boolean getDeliveryPickup() {
		return deliveryPickup;
	}

	public void setDeliveryPickup(Boolean deliveryPickup) {
		this.deliveryPickup = deliveryPickup;
	}

	public Boolean getDeliveryDineIn() {
		return deliveryDineIn;
	}

	public void setDeliveryDineIn(Boolean deliveryDineIn) {
		this.deliveryDineIn = deliveryDineIn;
	}

	public Boolean getDelivery3rdParty() {
		return delivery3rdParty;
	}

	public void setDelivery3rdParty(Boolean delivery3rdParty) {
		this.delivery3rdParty = delivery3rdParty;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	@Override
	public String getAppObjectType() {
		return AppObjects.DhabasCode;
	}

}
