package com.spydermama.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.Actions;
import com.spydermama.api.base.ApplicationObjects;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.Authorization;
import com.spydermama.api.common.controllers.BaseParentResourceController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = ApplicationObjects.Customers)
@RequestMapping({"/api/v1/customers"})
@Api(tags = {ApplicationObjects.Customers})
public class CustomerController extends BaseParentResourceController<Customer, String>{
	private CustomerService service;
	
	@Autowired
	public CustomerController(CustomerService service) {
		super(service);
		this.service=service;
	}
	@RequestMapping(method = RequestMethod.GET)
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all customers")
	@ResponseBody
	public ResponseEntity<List<Customer>> findAll() {
		List<Customer> body = service.findAll();
		return ResponseEntity.ok(body);
	}
	@RequestMapping(method = RequestMethod.GET, value = "/withaddress")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all customers with address")
	@ResponseBody
	public ResponseEntity<List<CustomerWithAddress>> findAllWithAddress() {
		List<CustomerWithAddress> body = service.findAllWithAddress(false);
		return ResponseEntity.ok(body);
	}
	@RequestMapping(method = RequestMethod.GET, value = "/{id}/addresses")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all customers with address")
	@ResponseBody
	public ResponseEntity<List<CustomerWithAddress>> findAllWithAddress(@PathVariable String id,
			@RequestParam(name = "isDisabled",required = false) Boolean isDisabled) {
		List<CustomerWithAddress> body = service.findAllWithAddress(isDisabled);
		return ResponseEntity.ok(body);
	}
}
