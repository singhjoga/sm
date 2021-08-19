package com.spydermama.api.common.validation;

import javax.persistence.EntityManager;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.spydermama.api.common.annotations.SystemReferenceData;
import com.spydermama.api.common.db.EntityManagerProvider;
import com.spydermama.api.config.config.SystemReferenceDataType;
import com.spydermama.api.refdata.RefData;

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
	    RefData result=em.find(RefData.class, value);
	    if (result==null) {
	    	return false;
	    }
	    return result.getTypeId().equals(type.getCode());
	}

}
