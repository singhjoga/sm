package com.spydermama.api.exception;

import com.thetechnovator.common.java.exceptions.TechnicalException;

public class AuthorizationException extends TechnicalException{

	private static final long serialVersionUID = -4619016806767898336L;
	public AuthorizationException(String message) {
		super(message);
	}

}
