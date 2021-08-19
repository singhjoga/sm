package com.spydermama.api.common.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.spydermama.api.common.validation.PastDateValidator;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Constraint(validatedBy = PastDateValidator.class)
public @interface PastDate {
  int seconds() default 0;
  int minutes() default 0;
  int hours() default 0;
  int days() default 0;
  int months() default 0;
  int years() default 0;
  String message() default "Date '${validatedValue}' is out of range";
  Class<?>[] groups() default { };
  Class<? extends Payload>[] payload() default {};
}
