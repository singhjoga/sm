package com.spydermama.api.dhaba.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.customer.CustomerWithAddress;
import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.controllers.BaseParentResourceController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = AppObjects.Dhabas)
@RequestMapping({"/api/v1/dhabas"})
@Api(tags = {AppObjects.Dhabas})
public class DhabaController extends BaseParentResourceController<Dhaba, String>{
	private DhabaService service;
	
	@Autowired
	public DhabaController(DhabaService service) {
		super(service);
		this.service=service;
	}
	@RequestMapping(method = RequestMethod.GET)
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@Operation( value="Returns all dhabas")
	@ResponseBody
	public ResponseEntity<List<Dhaba>> findAll() {
		List<Dhaba> body = service.findAll();
		return ResponseEntity.ok(body);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/withaddress")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@Operation( value="Returns all dhabas with addresses")
	@ResponseBody
	public ResponseEntity<List<Dhaba>> findAllWithAddress() {
		List<Dhaba> body = service.findAllWithAddress(false);
		return ResponseEntity.ok(body);
	}
}
