package com.spydermama.api.common.validation;

import javax.persistence.EntityManager;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.spydermama.api.common.annotations.SystemReferenceData;
import com.spydermama.api.common.db.EntityManagerProvider;
import com.spydermama.api.common.domain.LookupData;
import com.spydermama.api.config.config.SystemReferenceDataType;

public class SystemReferenceDataValidator implements ConstraintValidator<SystemReferenceData, Object>{

	private SystemReferenceData annotation;
	
	@Override
	public void initialize(SystemReferenceData constraintAnnotation) {
		this.annotation=constraintAnnotation;
		ConstraintValidator.super.initialize(constraintAnnotation);
	}

	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		if (value==null) return true;
		SystemReferenceDataType type = annotation.value();
	    EntityManager em = EntityManagerProvider.getEntityManager();
	    LookupData result=em.find(LookupData.class, value);
	    if (result==null) {
	    	return false;
	    }
	    return result.getReferenceType().equals(type.name());
	}

}
