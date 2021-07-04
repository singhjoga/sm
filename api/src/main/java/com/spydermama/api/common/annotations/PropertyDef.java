package com.spydermama.api.common.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface PropertyDef {
   public static final String DEFAULT="N/A";
   String property();
   String defaultValue() default DEFAULT;
   boolean required() default false;
   boolean usereference() default false;
}
