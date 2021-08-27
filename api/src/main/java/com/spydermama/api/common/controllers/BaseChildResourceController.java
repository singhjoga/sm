package com.spydermama.api.common.controllers;

import java.io.Serializable;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.Actions;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.Authorization;
import com.spydermama.api.common.domain.IdentifiableEntity;
import com.spydermama.api.common.services.BaseChildEntityService;

import io.swagger.annotations.ApiParam;

@Authorization
public abstract class BaseChildResourceController<T extends IdentifiableEntity<ID>, ID extends Serializable, PARENT_ID extends Serializable> extends BaseCrudController<T, ID> {
	private BaseChildEntityService<T, ID, PARENT_ID> service;

	public BaseChildResourceController(BaseChildEntityService<T, ID, PARENT_ID> service) {
		super(service);
		this.service = service;
	}

	@RequestMapping(method = RequestMethod.GET)
	@Authorization(action=Actions.Crud.View)
	@JsonView(value=Views.List.class) 
	public @ResponseBody ResponseEntity<List<T>> findAll(//
			@ApiParam(value="ID of the parent object",example = "1", required = true) @RequestParam(value = "parentId", required = true) PARENT_ID parentId) {

		List<T> body = service.findAll(parentId);
		return ResponseEntity.ok(body);
	}
	
}
