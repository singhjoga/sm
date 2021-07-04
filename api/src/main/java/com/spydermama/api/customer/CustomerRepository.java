package com.spydermama.api.customer;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;


public interface CustomerRepository extends EntityRepository<Customer, String>{
	List<Customer> findAllByIsDisabledOrderByFirstName(Boolean isDisabled);
}
