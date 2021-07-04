package com.spydermama.api.exception;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.apache.commons.lang3.StringUtils;

/**
 * Validation exceptions
 * 
 * This can handle validation exceptions from multiple objects.
 * 
 * @author JogaSingh
 *
 */
public class ValidationExceptionList extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private List<Set<ConstraintViolation<?>>> violations;

	public ValidationExceptionList(List<? extends Set<? extends ConstraintViolation<?>>> violations) {
		super();
		this.violations = new ArrayList<>();
		for (Set<? extends ConstraintViolation<?>> s: violations) {
			Set<ConstraintViolation<?>> newSet = new HashSet<>(s);
			this.violations.add(newSet);
		}
	}
	public List<Set<ConstraintViolation<?>>> getViolations() {
		return violations;
	}
	@Override
	public String getMessage() {
		return toString();
	}
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		int i=0;
		for (Set<ConstraintViolation<?>> violationsSet: violations) {
			i++;
			for (ConstraintViolation<?> violation : violationsSet) {
				if (sb.length()>0) {
					sb.append(System.lineSeparator());
				}
				String field=StringUtils.substringAfterLast(violation.getPropertyPath().toString(), ".");
				if (StringUtils.isEmpty(field)) {
					field=violation.getPropertyPath().toString();
				}

				field=field+"."+i;

				String errorCode=violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName();
				sb.append("field=").append(field).append(", message=").append(violation.getMessage()).append(", errorCode=").append(errorCode);
				
			}	
		}
		
		return sb.toString();
	}
	
}
