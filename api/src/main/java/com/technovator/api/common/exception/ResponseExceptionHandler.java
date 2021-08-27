package com.technovator.api.common.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.technovator.api.common.controllers.RestResponse;
import com.technovator.api.common.controllers.RestResponseBuilder;
import com.technovator.api.common.controllers.RestResponse.ErrorResponse;
import com.technovator.api.common.controllers.RestResponse.ValidationError;
import com.thetechnovator.common.java.exceptions.TechnicalException;

@RestControllerAdvice
@Component
public class ResponseExceptionHandler {
	private static final Logger LOG = LoggerFactory.getLogger(ResponseExceptionHandler.class);
	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse handleResourceNotFound(ResourceNotFoundException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), e.getErrorCode());
	}

	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleTechnicalException(IllegalStateException e) {
		LOG.error(e.getMessage(),e);
		return RestResponseBuilder.errorResponse(e.getMessage(), CommonErrorCodes.INTERNAL_ERROR);
	}	
	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ErrorResponse handleAccessDenied(AccessDeniedException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), CommonErrorCodes.ACCESS_DENIED);
	}	
	@ExceptionHandler(AuthorizationException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ErrorResponse handleAccessDenied(AuthorizationException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), e.getErrorCode());
	}	
	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleAccessDenied(BadRequestException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), e.getErrorCode());
	}	
	@ExceptionHandler(TechnicalException.class)
	@ResponseStatus(HttpStatus.FAILED_DEPENDENCY)
	public ErrorResponse handleTechnicalException(TechnicalException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), e.getErrorCode());
	}	

	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleAccessDenied(IllegalArgumentException e) {
		LOG.error(e.getMessage(),e);
		return RestResponseBuilder.errorResponse(e.getMessage(), CommonErrorCodes.INTERNAL_ERROR);
	}
	@ExceptionHandler(BusinessRulesException.class)
	@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
	public ErrorResponse handleAccessDenied(BusinessRulesException e) {
		LOG.warn(e.getMessage());
		return RestResponseBuilder.errorResponse(e.getMessage(), e.getErrorCode());
	}
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
	    List<ValidationError> errors = new ArrayList<RestResponse.ValidationError>();
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	    	FieldError fieldError = ((FieldError) error);
	        String fieldName = fieldError.getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.add(new ValidationError(fieldName, errorMessage, fieldError.getCode()));
	    });
	    return RestResponseBuilder.errorResponse("Validation errors", CommonErrorCodes.VALIDATION_ERROR,errors);
	}
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidRequestException.class)
	public ErrorResponse handleInvalidRequestExceptions(InvalidRequestException ex) {
	    return ex.getResponse();
	}
	@ExceptionHandler(ValidationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse validationException(ValidationException e) {
		ErrorResponse resp = createConstraintViolationsResponse(e.getViolations());
		resp.setMessage("Validation error");
		
		return resp;
	}
	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse onConstraintValidationException(ConstraintViolationException e) {
		ErrorResponse resp = createConstraintViolationsResponse(e.getConstraintViolations());
		resp.setMessage("Constration violation");
		
		return resp;
	}
	private ErrorResponse createConstraintViolationsResponse(Set<ConstraintViolation<?> > violations) {
		ErrorResponse resp = new ErrorResponse();
		for (ConstraintViolation<?> violation : violations) {
			addError(resp,violation,null);
		}
		return resp;	
	}
	private void addError(ErrorResponse resp, ConstraintViolation<?> violation, Integer index) {
		String field=StringUtils.substringAfterLast(violation.getPropertyPath().toString(), ".");
		if (StringUtils.isEmpty(field)) {
			field=violation.getPropertyPath().toString();
		}
		if (index != null) {
			field=field+"."+index;
		}
		String errorCode=violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName();
		resp.getErrors().add(new ValidationError(field, violation.getMessage(), errorCode));
	}
}
