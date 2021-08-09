package com.spydermama.api.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.system.config.SystemProperty;
import com.spydermama.api.system.config.SystemPropertyRepo;
import com.thetechnovator.common.java.utils.StringMap;

@Service
public class SystemService{
	@Autowired
	private SystemPropertyRepo repo;
	public SystemService() {

	}
	
	public StringMap getProperties() {
		List<SystemProperty> list = repo.findAll();
		StringMap map = new StringMap();
		
		for (SystemProperty prop: list) {
			map.put(prop.getName(), prop.getValue());
		}
		
		return map;
	}
}
