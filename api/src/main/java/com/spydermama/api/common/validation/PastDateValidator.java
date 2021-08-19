package com.spydermama.api.common.validation;

import java.util.Calendar;
import java.util.Date;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.spydermama.api.common.annotations.PastDate;

public class PastDateValidator implements ConstraintValidator<PastDate, Date>{
	private PastDate annotation;
	
	@Override
	public void initialize(PastDate constraintAnnotation) {
		this.annotation=constraintAnnotation;
		ConstraintValidator.super.initialize(constraintAnnotation);
	}

	@Override
	public boolean isValid(Date value, ConstraintValidatorContext context) {
		if (value==null) return true;

		Calendar cal  = Calendar.getInstance();
		if (annotation.seconds() != 0) {
			cal.add(Calendar.SECOND, -annotation.seconds());
		}
		if (annotation.minutes() != 0) {
			cal.add(Calendar.MINUTE, -annotation.minutes());
		}
		if (annotation.hours() != 0) {
			cal.add(Calendar.HOUR, -annotation.hours());
		}
		if (annotation.days() != 0) {
			cal.add(Calendar.DATE, -annotation.days());
		}
		if (annotation.months() != 0) {
			cal.add(Calendar.MONTH, -annotation.months());
		}
		if (annotation.years() != 0) {
			cal.add(Calendar.YEAR, -annotation.years());
		}


	    return value.getTime() < cal.getTimeInMillis();
	}

}
