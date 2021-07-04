package com.spydermama.api.common.controllers;

import java.io.Serializable;
import java.net.URI;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.spydermama.api.common.controllers.RestResponse.AddResponse;
import com.spydermama.api.common.controllers.RestResponse.BulkOperationResponse;
import com.spydermama.api.context.Context;
import com.spydermama.api.exception.BadRequestException;
import com.thetechnovator.common.java.utils.DateUtil;

public abstract class BaseController {
	public BaseController() {
		super();
	}

	protected URI getCurrentURI() {
		return ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
	}

	protected URI getCurrentURI(Serializable id) {
		return ServletUriComponentsBuilder.fromCurrentRequest().pathSegment(id.toString()). build().toUri();
	}
	protected Date toDateParam(String dateStr, String paramName) {
		if (dateStr==null) return null;
		//first convert using json format
		Date dt = DateUtil.toDateFromJsonFormat(dateStr);
		if (dt == null) {
			dt = DateUtil.toDateFromGermanFormat(dateStr);
		}
		if (dt == null) {
			String msg = String.format("Parameter '%s' value '%s' is not in '%s' or '%s' format", paramName,dateStr,DateUtil.JSON_DATE, DateUtil.GERMAN_DATE);
			throw new BadRequestException(msg);
		}
		
		return dt;
	}
	protected Date toDateTimeParam(String dateStr, String paramName) {
		if (dateStr==null) return null;
		//first convert using json format
		Date dt = DateUtil.toDateTimeFromJsonFormat(dateStr);
		if (dt == null) {
			dt = DateUtil.toDateTimeFromGermanFormat(dateStr);
		}
		if (dt == null) {
			String msg = String.format("Parameter '%s' value '%s' is not in '%s' or '%s' format", paramName,dateStr,DateUtil.JSON_DATE_TIME, DateUtil.GERMAN_DATE_TIME);
			throw new BadRequestException(msg);
		}
		
		return dt;
	}

	protected ResponseEntity<AddResponse> addRestResponse(Long id) {
		return addRestResponse(id.toString());
	}
	protected ResponseEntity<AddResponse> addRestResponse(String id) {
		URI resUrl = getCurrentURI(id);
		return ResponseEntity.created(resUrl).body(RestResponseBuilder.addResponse(id, resUrl.toString()));
	}
	protected ResponseEntity<Void> okResponse() {
		return ResponseEntity.ok().build();
	}
	protected ResponseEntity<BulkOperationResponse> bulkOperationResponse(int affectedItems) {
		return ResponseEntity.ok(new BulkOperationResponse(affectedItems));
	}
	protected String getUserLanguage() {
		return Context.getInstance().getUserLanguage();
	}
	/*
	protected void authorize(String resource, String action) {
		authService.authorize(resource, action);
	}
	@Autowired
	public final void setAuthService(AuthService authService) {
		this.authService=authService;
	}
	*/
}