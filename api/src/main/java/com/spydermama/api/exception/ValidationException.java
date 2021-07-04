package com.spydermama.api.exception;

import java.util.HashSet;
import java.util.Set;

import javax.validation.ConstraintViolation;

/**
 * Validation exceptions
 * 
 * @author JogaSingh
 *
 */
public class ValidationException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private Set<ConstraintViolation<?>> violations;

	public ValidationException(Set<? extends ConstraintViolation<?>> violations) {
		super();
		this.violations =new HashSet<>(violations);
	}
	public Set<ConstraintViolation<?>> getViolations() {
		return violations;
	}
	
}
