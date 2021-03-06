package com.spydermama.api.utils;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.spydermama.api.exception.BadRequestException;

public class RequestValidationUtil {
	public static void assertNotNull(Object param, String paramName) {
		if (param == null) {
			throw new BadRequestException("Field "+paramName+" cannot be null");
		}
	}
	public static void assertNull(Object param, String paramName) {
		if (param != null) {
			throw new BadRequestException("Field "+paramName+" must not be set");
		}
	}	public static void assertNotEmpty(String param, String paramName) {
		if (StringUtils.isEmpty(param)) {
			throw new BadRequestException("Field "+paramName+" cannot be empty");
		}
	}
	public static void assertGreaterThanZero(Number param, String paramName) {
		if (param == null) {
			throw new BadRequestException("Field "+paramName+" cannot be null");
		}
		if (param.doubleValue() <= 0) {
			throw new BadRequestException("Field "+paramName+" should be greater than zero");
		}
	}
	public static void assertNotNull(Object param, String paramName, List<String> retunList) {
		if (param == null) {
			retunList.add("Field "+paramName+" cannot be null");
		}
	}
	public static void assertNull(Object param, String paramName, List<String> retunList) {
		if (param != null) {
			retunList.add("Field "+paramName+" must not be set");
		}
	}	public static void assertNotEmpty(String param, String paramName, List<String> retunList) {
		if (StringUtils.isEmpty(param)) {
			retunList.add("Field "+paramName+" cannot be empty");
		}
	}
	public static void assertGreaterThanZero(Number param, String paramName, List<String> retunList) {
		if (param == null) {
			retunList.add("Field "+paramName+" cannot be null");
		}
		if (param.doubleValue() <= 0) {
			retunList.add("Field "+paramName+" should be greater than zero");
		}
	}
}
