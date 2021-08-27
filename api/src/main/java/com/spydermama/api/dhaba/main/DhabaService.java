package com.spydermama.api.dhaba.main;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.address.Address;
import com.spydermama.api.address.AddressService;
import com.spydermama.api.customer.Customer;
import com.spydermama.api.customer.CustomerWithAddress;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.services.BaseCrudService;

@Service
public class DhabaService extends BaseCrudService<Dhaba, String>{
	@Autowired
	private AddressService addressService;	
	private DhabaRepository repo;
	@Autowired
	public DhabaService(DhabaRepository repo) {
		super(repo, Dhaba.class, String.class);
		this.repo = repo;
	}

	public List<Dhaba> findAll() {
		return findAll(false);
	}
	public List<Dhaba> findAll(Boolean isDisabled) {
		if (isDisabled == null) {
			repo.findAll();
		}
		return repo.findAllByIsDisabledOrderByName(isDisabled);
	}
	public List<Dhaba> findAllWithAddress(Boolean isDisabled) {
		List<Dhaba> result;
		if (isDisabled == null) {
			result = repo.findAllByOrderByName();
		}else {
			result = repo.findAllByIsDisabledOrderByName(isDisabled);
		}

		List<Address> allAddresses = addressService.findAllByObjectType(AppObjects.DhabasCode);
		Map<String, List<Address>> map = allAddresses.stream().collect(Collectors.groupingBy(Address::getObjectId));
		for (Dhaba obj: result) {
			obj.setAddresses(map.get(obj.getId()));
		}
		
		return result;
	}

	@Override
	protected String getAppObjectType() {
		return AppObjects.DhabasCode;
	}
}
