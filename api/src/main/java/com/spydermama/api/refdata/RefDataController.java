package com.spydermama.api.refdata;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spydermama.api.base.AppObjects;
import com.spydermama.api.common.annotations.Authorization;
import com.spydermama.api.common.controllers.BaseController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = AppObjects.RefData)
@RequestMapping({"/api//v1/refdata"})
@Api(tags = {AppObjects.RefData})
public class RefDataController extends BaseController{
	private RefDataService service;
	
	@Autowired
	public RefDataController(RefDataService service) {
		this.service=service;
	}

	@RequestMapping(method=RequestMethod.GET,value="/{referenceType}")
	@ApiOperation(value="Returns the list of a particular type of reference data")
	public ResponseEntity<List<RefDataValue>> getByReferenceType(@PathVariable String referenceType) {
			return ResponseEntity.ok(service.findByReferenceType(referenceType, getUserLanguage()));
	}
	
}
