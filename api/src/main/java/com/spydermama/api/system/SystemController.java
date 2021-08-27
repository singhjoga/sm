package com.spydermama.api.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.system.country.Country;
import com.spydermama.api.system.country.CountryService;
import com.spydermama.api.system.country.CountryView;
import com.spydermama.api.system.language.Language;
import com.spydermama.api.system.language.LanguageService;
import com.technovator.api.common.annotations.Authorization;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.controllers.BaseController;
import com.thetechnovator.common.java.utils.StringMap;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Authorization(resource = AppObjects.SystemProperties)
@RequestMapping({"/api/v1/system"})
@Api(tags = {AppObjects.SystemProperties})
public class SystemController extends BaseController{
	@Autowired
	private LanguageService langService;
	@Autowired
	private CountryService countryService;
	@Autowired
	private SystemService systemService;
	public SystemController() {
		super();
	}
	@RequestMapping(method = RequestMethod.GET,value = "/languages")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all supported languages")
	@ResponseBody
	public ResponseEntity<List<Language>> getLanguages() {
		List<Language> body = langService.findAllByIsDisabled(false);
		return ResponseEntity.ok(body);
	}
	@RequestMapping(method = RequestMethod.GET,value = "/countries")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns list of countries")
	@ResponseBody
	public ResponseEntity<List<CountryView>> getCountries() {
		List<CountryView> body = countryService.findAllByLanguage(getUserLanguage());
		return ResponseEntity.ok(body);
	}
	@RequestMapping(method = RequestMethod.GET,value = "/countries/{id}")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns list of countries")
	@ResponseBody
	public ResponseEntity<Country> getCountry(
			@PathVariable String id) {
		Country body = countryService.findById(id);
		return ResponseEntity.ok(body);
	}
	@RequestMapping(method = RequestMethod.GET,value = "/properties")
	@Authorization(action = Actions.Crud.View)
	@JsonView(value = Views.List.class)
	@ApiOperation( value="Returns all system properties")
	@ResponseBody
	public ResponseEntity<StringMap> getProperties() {
		StringMap body = systemService.getProperties();
		return ResponseEntity.ok(body);
	}
}
