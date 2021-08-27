package com.technovator.api.common.controllers;

import java.io.Serializable;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonView;
import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.auditlog.AuditLog;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.domain.IdentifiableEntity;
import com.technovator.api.common.services.BaseCrudService;

import io.swagger.annotations.ApiOperation;

@Authorization
public abstract class BaseParentResourceController<T extends IdentifiableEntity<ID>, ID extends Serializable> extends BaseCrudController<T, ID> {
	private BaseCrudService<T, ID> service;
	public BaseParentResourceController(BaseCrudService<T, ID> service) {
		super(service);
		this.service = service;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/{id}/history")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns the change history for given resource id")
	@ResponseBody
	public ResponseEntity<List<AuditLog>> getHistory(@PathVariable ID id) {
		List<AuditLog> body = service.getHistory(id);
		return ResponseEntity.ok(body);
	}
}
