package com.spydermama.api.customer;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.address.Address;
import com.technovator.api.common.constants.Views;

import io.swagger.annotations.ApiModelProperty;

public class CustomerWithAddress{
	@JsonView(value= {Views.Allways.class})
	@ApiModelProperty(value = "Customer object", position = 1, required=true)
	private Customer customer;
	@ApiModelProperty(value = "Default address", position = 2, required=true)	
	@JsonView(value= {Views.Allways.class})
	private Address address;
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	
}
