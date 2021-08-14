package com.spydermama.api.address;

import java.util.List;

import com.spydermama.api.common.repos.EntityRepository;


public interface AddressRepository extends EntityRepository<Address, String>{
	List<Address> findAllByObjectTypeAndIsDefault(String objectType, Boolean isDefault);
	List<Address> findAllByObjectTypeAndObjectId(String objectType, String objectId);
}
