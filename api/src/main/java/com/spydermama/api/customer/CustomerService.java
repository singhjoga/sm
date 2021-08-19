package com.spydermama.api.customer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.address.Address;
import com.spydermama.api.address.AddressService;
import com.spydermama.api.base.AppObjects;
import com.spydermama.api.common.services.BaseCrudService;

@Service
public class CustomerService extends BaseCrudService<Customer, String>{
	@Autowired
	private AddressService addressService;
	
	private CustomerRepository repo;
	@Autowired
	public CustomerService(CustomerRepository repo) {
		super(repo, Customer.class, String.class);
		this.repo = repo;
	}

	public List<Customer> findAll() {
		return findAll(false);
	}
	public List<Customer> findAll(Boolean isDisabled) {
		if (isDisabled == null) {
			return repo.findAll();
		}
		return repo.findAllByIsDisabledOrderByFirstName(isDisabled);
	}
	public List<CustomerWithAddress> findAllWithAddress(Boolean isDisabled) {
		List<CustomerWithAddress> result = new ArrayList<>();
		List<Customer> customers;
		if (isDisabled == null) {
			customers = repo.findAll();
		}else {
			customers = repo.findAllByIsDisabledOrderByFirstName(isDisabled);
		}

		List<Address> allAddresses = addressService.findAllDefault(AppObjects.CustomersCode);
		Map<String, Address> map = allAddresses.stream().collect(Collectors.toMap(e->e.getObjectId(), e->e ));
		for (Customer cust: customers) {
			Address address = map.get(cust.getId());
			CustomerWithAddress custWithAddress = new CustomerWithAddress();
			custWithAddress.setCustomer(cust);
			custWithAddress.setAddress(address);
			result.add(custWithAddress);
		}
		
		return result;
	}
	@Override
	protected String getResourceType() {
		return AppObjects.CustomersCode;
	}
}
