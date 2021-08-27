package com.spydermama.api.dhaba.admins;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.controllers.BaseChildResourceController;

import io.swagger.annotations.Api;


@RestController
@Authorization(resource = AppObjects.Dhabas)
@RequestMapping({"/api/v1/dhabas/admins"})
@Api(tags = {AppObjects.Dhabas})
public class DhabaAdminController extends BaseChildResourceController<DhabaAdmin, DhabaAdmin, String>{
	private DhabaAdminService service;
	
	@Autowired
	public DhabaAdminController(DhabaAdminService service) {
		super(service);
		this.service=service;
	}
}
