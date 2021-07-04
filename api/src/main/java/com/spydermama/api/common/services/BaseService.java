package com.spydermama.api.common.services;

import com.spydermama.api.utils.CommonUtil;

public class BaseService{

	public BaseService() {
		super();
	}

	public String getLoggedUser() {
		return CommonUtil.getLoggedUser();	
	}
}