package com.spydermama.api.common.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.spydermama.api.common.validation.UserReferenceDataValidator;
import com.spydermama.api.refdata.UserReferenceDataType;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Constraint(validatedBy = UserReferenceDataValidator.class)
public @interface UserReferenceData {
  UserReferenceDataType value();
  String message() default "User Reference data for type '{value}' not found for '${validatedValue}'";
  Class<?>[] groups() default { };
  Class<? extends Payload>[] payload() default {};
}
