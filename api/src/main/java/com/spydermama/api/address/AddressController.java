package com.spydermama.api.address;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.controllers.BaseParentResourceController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = AppObjects.Addresses)
@RequestMapping({"/api/v1/addresses"})
@Api(tags = {AppObjects.Addresses})
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
	@Operation( value="Returns all addresses for an object and object id")
	@ResponseBody
	public ResponseEntity<List<Address>> findAll(
			@RequestParam(name = "objectType") String objectType,
			@RequestParam(name = "objectId") String objectId
			) {
		List<Address> body = service.findAllDefault(objectType,objectId);
		return ResponseEntity.ok(body);
	}
}
