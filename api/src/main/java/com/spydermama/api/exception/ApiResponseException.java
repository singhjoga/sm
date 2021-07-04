package com.spydermama.api.exception;

import java.util.List;

import com.spydermama.api.common.controllers.RestResponse.ErrorResponse;

public class ApiResponseException extends RuntimeException{
	private static final long serialVersionUID = 803520438277873441L;
	private List<ErrorResponse> errors;
	
	public ApiResponseException(String message, List<ErrorResponse> errors) {
		super(message);
		this.errors = errors;
	}

	public List<ErrorResponse> getErrors() {
		return errors;
	}
	
}
