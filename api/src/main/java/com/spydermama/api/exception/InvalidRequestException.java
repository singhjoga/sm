package com.spydermama.api.exception;

import com.spydermama.api.common.controllers.RestResponse.ErrorResponse;

public class InvalidRequestException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private ErrorResponse response;

	public InvalidRequestException(ErrorResponse response) {
		super();
		this.response = response;
	}

	public ErrorResponse getResponse() {
		return response;
	}
	
}
