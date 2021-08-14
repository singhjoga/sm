package com.spydermama.api.address;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
@Authorization(resource = ApplicationObjects.Addresses)
@RequestMapping({"/api/v1/addresses"})
@Api(tags = {ApplicationObjects.Addresses})
public class AddressController extends BaseParentResourceController<Address, String>{
	private AddressService service;
	
	@Autowired
	public AddressController(AddressService service) {
		super(service);
		this.service=service;
	}
	@RequestMapping(method = RequestMethod.GET)
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all customers")
	@ResponseBody
	public ResponseEntity<List<Address>> getHistory() {
		List<Address> body = service.findAll();
		return ResponseEntity.ok(body);
	}
}
