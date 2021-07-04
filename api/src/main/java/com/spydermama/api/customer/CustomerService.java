package com.spydermama.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.base.Resources;
import com.spydermama.api.common.services.BaseCrudService;

@Service
public class CustomerService extends BaseCrudService<Customer, String>{
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
			repo.findAll();
		}
		return repo.findAllByIsDisabledOrderByFirstName(isDisabled);
	}

	@Override
	protected String getResourceType() {
		return Resources.Customers;
	}
}
