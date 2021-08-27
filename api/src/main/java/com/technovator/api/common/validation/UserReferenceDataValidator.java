package com.technovator.api.common.validation;

import javax.persistence.EntityManager;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.technovator.api.common.annotations.UserReferenceData;
import com.technovator.api.common.db.EntityManagerProvider;
import com.technovator.api.common.refdata.RefData;
import com.technovator.api.common.refdata.UserReferenceDataType;

public class UserReferenceDataValidator implements ConstraintValidator<UserReferenceData, Object>{

	private UserReferenceData annotation;
	
	@Override
	public void initialize(UserReferenceData constraintAnnotation) {
		this.annotation=constraintAnnotation;
		ConstraintValidator.super.initialize(constraintAnnotation);
	}

	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		if (value==null) return true;
		UserReferenceDataType type = annotation.value();
	    EntityManager em = EntityManagerProvider.getEntityManager();
	    RefData result=em.find(RefData.class, value);
	    if (result==null) {
	    	return false;
	    }
	    return result.getTypeId().equals(type.name());
	}

}
