package com.spydermama.api.utils;

import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.spydermama.api.base.Constants;

public class CommonUtil {
	public static String genUUID() {
		return StringUtils.replace(UUID.randomUUID().toString(),"-","");
	}
	public static String getLoggedUser() {
		// Get logged in user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication==null) {
			return Constants.SYSTEM_USER;
		}
		return authentication.getName();
	}
	
	public static String getTempDir() {
		return System.getProperty("java.io.tmpdir");
	}
}
