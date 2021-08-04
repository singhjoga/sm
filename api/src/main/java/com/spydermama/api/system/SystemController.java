package com.spydermama.api.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.Actions;
import com.spydermama.api.base.Resources;
import com.spydermama.api.base.Views;
import com.spydermama.api.common.annotations.Authorization;
import com.spydermama.api.common.controllers.BaseController;
import com.spydermama.api.system.language.Language;
import com.spydermama.api.system.language.LanguageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = Resources.SystemProperties)
@RequestMapping({"/api/v1/system"})
@Api(tags = {Resources.SystemProperties})
public class SystemController extends BaseController{
	@Autowired
	private LanguageService langService;

	public SystemController() {
		super();
	}
	@RequestMapping(method = RequestMethod.GET,value = "/languages")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all supported languages")
	@ResponseBody
	public ResponseEntity<List<Language>> getLanguages() {
		List<Language> body = langService.findAll();
		return ResponseEntity.ok(body);
	}
}
