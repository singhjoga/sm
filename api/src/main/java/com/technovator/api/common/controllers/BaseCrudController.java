package com.technovator.api.common.controllers;

import java.io.Serializable;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonView;
import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.controllers.RestResponse.AddResponse;
import com.technovator.api.common.controllers.RestResponse.ErrorResponse;
import com.technovator.api.common.domain.IdentifiableEntity;
import com.technovator.api.common.services.BaseCrudService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ExampleProperty;

@Authorization
public class BaseCrudController<T extends IdentifiableEntity<ID>, ID extends Serializable> extends BaseController {
	
	private BaseCrudService<T, ID> service;
	public BaseCrudController(BaseCrudService<T, ID> service) {
		super();
		this.service = service;
	}
	@RequestMapping(method = RequestMethod.POST)
	@Authorization(action = Actions.Crud.Add)
	@ApiOperation( value = "Add a new resource")
	/*
	@ApiResponses(value = {
	        @ApiResponse(code=HttpStatus.SC_BAD_REQUEST, message = "Bad request", response = ErrorResponse.class,
	        examples = @io.swagger.annotations.Example(
	        	            value = {
	        	                @ExampleProperty(value = "{'property': 'test'}", mediaType = "application/json")
	        	            }))
	        })
	        */
	@ResponseBody
	public ResponseEntity<AddResponse> add(@JsonView(value = Views.Add.class) @RequestBody T obj) {
		T saved = service.add(obj);
		return addRestResponse(saved.getId().toString());
	}

	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.View.class)
	@ApiOperation( value = "Get an existing resource by ID. Not Found error is thrown if the resource is not found")
	@ResponseBody
	public ResponseEntity<T> getOne(@PathVariable ID id) {
		return ResponseEntity.ok(service.getById(id));
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	@Authorization(action = Actions.Crud.Update)
	@ApiOperation( value = "Update an existing resource")
	@ResponseBody
	public ResponseEntity<Void> update(@PathVariable ID id, @JsonView(value = Views.Update.class) @RequestBody T obj) {
		service.update(id, obj);
		return okResponse();
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	@Authorization(action = Actions.Crud.Delete)
	@ApiOperation( value = "Delete an existing resource. Validation error is returned if it is referenced in other resources")
	@ResponseBody
	public ResponseEntity<Void> delete(@PathVariable ID id) {
		service.delete(id);
		return okResponse();
	}
	
	
}