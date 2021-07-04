package com.spydermama.api.exception;

import com.thetechnovator.common.java.exceptions.TechnicalException;

public class AccessDeniedException extends TechnicalException{

	private static final long serialVersionUID = -12069870686023303L;

	public AccessDeniedException(String msg) {
		super(msg);
	}

}
