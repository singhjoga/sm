package com.spydermama.api.propsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.exception.ResourceNotFoundException;
import com.spydermama.api.propsets.domain.Propertyset;
import com.spydermama.api.propsets.repository.PropertysetRepository;

@Service
public class PropertysetService {

	@Autowired
	private PropertysetRepository repo;
	
	public Propertyset findByName(String name) {
		Propertyset result = repo.findByName(name);
		if (result == null) {
			throw new ResourceNotFoundException("Propertyset", name);
		}
		return result;
	}
}
