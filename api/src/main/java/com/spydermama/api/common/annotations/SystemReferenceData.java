package com.spydermama.api.common.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.spydermama.api.common.validation.SystemReferenceDataValidator;
import com.spydermama.api.config.config.SystemReferenceDataType;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Constraint(validatedBy = SystemReferenceDataValidator.class)
public @interface SystemReferenceData {
  SystemReferenceDataType value();
  String message() default "System Reference data for type '{value}' not found for '${validatedValue}'";
  Class<?>[] groups() default { };
  Class<? extends Payload>[] payload() default {};
}
