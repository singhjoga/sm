package com.spydermama.api.system.country;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.common.services.BaseService;

@Service
public class CountryService extends BaseService{
	private static Logger LOG = LoggerFactory.getLogger(CountryService.class);
	@Autowired
	private CountryRepo repo;
	public CountryService() {

	}

	public List<CountryView> findAllByLanguage(String langCode) {
		String lang = getApplicableLanguage(langCode);
		LOG.info("Countries in '"+lang+"' language. User language '"+langCode+"'");
		return repo.findByLangCode(lang);
	}
}
