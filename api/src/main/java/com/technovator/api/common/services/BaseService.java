package com.technovator.api.common.services;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.technovator.api.common.cache.StaticCache;
import com.technovator.api.common.utils.CommonUtil;

public class BaseService{

	@Autowired
	private StaticCache cache;
	
	public BaseService() {
		super();
	}

	public String getLoggedUser() {
		return CommonUtil.getLoggedUser();	
	}
	
	public String getApplicableLanguage(String userLang) {
		String result;
		if (StringUtils.isEmpty(userLang)) {
			result=cache.getSystemConfig().defaultLanguage();
		}else {
			result = userLang.toLowerCase();
			// if request language contains a locale specific, search without it
			if (result.contains("-")) {
				result = StringUtils.substringBefore(result, "-");			
			}
			if (!cache.getLanguages().contains(result)) {
				result=cache.getSystemConfig().defaultLanguage();
			}
		}
		
		return result;
	}
}