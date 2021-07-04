package com.spydermama.api.system.country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.base.Resources;
import com.spydermama.api.common.services.BaseCrudService;

@Service
public class CountryService extends BaseCrudService<Country, String>{
	@Autowired
	public CountryService(CountryRepo repo) {
		super(repo, Country.class, String.class);
	}

	@Override
	protected String getResourceType() {
		return Resources.Customers;
	}
}
