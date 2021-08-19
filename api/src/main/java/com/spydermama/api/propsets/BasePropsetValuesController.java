package com.spydermama.api.propsets;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spydermama.api.base.Actions;
import com.spydermama.api.base.AppObjects;
import com.spydermama.api.common.annotations.Authorization;
import com.spydermama.api.common.controllers.BaseController;
import com.spydermama.api.common.domain.IdentifiableEntity;
import com.spydermama.api.common.services.BaseEntityService;
import com.spydermama.api.propsets.dto.PropertysetValues;
import com.spydermama.api.propsets.dto.UpdateRequest;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Authorization
public abstract class BasePropsetValuesController<T extends IdentifiableEntity<ID>, ID extends Serializable> extends BaseController{
	@Autowired
	private PropertysetValueService propsetValueService;
	private BaseEntityService<T, ID> service;
	public BasePropsetValuesController(BaseEntityService<T, ID> service) {
		super();
		this.service=service;
	}

	@RequestMapping(method = RequestMethod.GET)
	@Authorization(action=Actions.Crud.View)
	@ApiOperation(value = "All properties of the given resource")
	public @ResponseBody ResponseEntity<PropertysetValues> findAll(//
			@ApiParam(value="ID of the resource",example = "1", required = true) @RequestParam(value = "id", required = true) ID id) {

		T obj = service.getById(id);
		PropertysetValues result = propsetValueService.getValues(getPropertysetId(obj), obj.getId().toString(),true);
		return ResponseEntity.ok(result);
	}
	@RequestMapping(method = RequestMethod.GET,value="/effective")
	@Authorization(resource=AppObjects.Credentials, action=Actions.Credentials.ViewPassword)
	@ApiOperation(value = "All properties of the given resource after resolving the references")
	public @ResponseBody ResponseEntity<PropertysetValues> findAllEffective(//
			@ApiParam(value="ID of the resource",example = "1", required = true) @RequestParam(value = "id", required = true) ID id) {

		T obj = service.getById(id);
		PropertysetValues result = propsetValueService.getValues(getPropertysetId(obj), obj.getId().toString(),false);
		return ResponseEntity.ok(result);
	}
	@RequestMapping(method = RequestMethod.POST)
	@Authorization(action=Actions.Crud.View)
	@ApiOperation(value = "Save property value of the given resource")
	public @ResponseBody ResponseEntity<Void> save(//
			@ApiParam(value="ID of the resource",example = "1", required = true) @RequestParam(value = "id", required = true) ID id, //
			@RequestBody UpdateRequest req) {

		propsetValueService.saveSimpleValues(id.toString(), Arrays.asList(req));
		return okResponse();
	}
	@RequestMapping(method = RequestMethod.POST, value = "/bulk")
	@Authorization(action=Actions.Crud.View)
	@ApiOperation(value = "Save property value of the given resource")
	public @ResponseBody ResponseEntity<Void> bulkSave(//
			@ApiParam(value="ID of the resource",example = "1", required = true) @RequestParam(value = "id", required = true) ID id, //
			@RequestBody List<UpdateRequest> req) {

		propsetValueService.saveSimpleValues(id.toString(), req);
		return okResponse();
	}
	
	protected abstract Long getPropertysetId(T obj);
}
