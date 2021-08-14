package com.spydermama.api.address;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.base.ApplicationObjects;
import com.spydermama.api.common.services.BaseCrudService;

@Service
public class AddressService extends BaseCrudService<Address, String>{
	private AddressRepository repo;
	@Autowired
	public AddressService(AddressRepository repo) {
		super(repo, Address.class, String.class);
		this.repo = repo;
	}

	public List<Address> findAll() {
		return repo.findAll();
	}
	public List<Address> findAllDefault(String objectType) {
		return repo.findAllByObjectTypeAndIsDefault(objectType, true);
	}

	@Override
	protected String getResourceType() {
		return ApplicationObjects.AddressesCode;
	}
}
