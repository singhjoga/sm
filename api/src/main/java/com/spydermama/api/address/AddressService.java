package com.spydermama.api.address;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technovator.api.common.auditlog.AuditableMain;
import com.technovator.api.common.constants.Actions;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.exception.BadRequestException;
import com.technovator.api.common.services.BaseCrudService;

@Service
public class AddressService extends BaseCrudService<Address, String>{
	private static final Logger LOG = LoggerFactory.getLogger(AddressService.class);
	private AddressRepository repo;
	@Autowired
	public AddressService(AddressRepository repo) {
		super(repo, Address.class, String.class);
		this.repo = repo;
	}

	@Override
	protected void beforeSave(Address newObj, Address oldObj, boolean isAdd) {
		/* If add
		 *   if this is the first address, set to default
		 *   else if the new is default, set the old default to false
		 * else
		 *   if isDefault is set
		 *     if earlier it was default and now not default, do not allow change
		 *     if earlier it was NOT default and now it is default, remove the isDefault from the default address
		 */
		//get all address for the same ObjectType and ObjectId
		String objType = isAdd?newObj.getObjectType():oldObj.getObjectType();
		String objId = isAdd?newObj.getObjectId():oldObj.getObjectId();
		List<Address> all = repo.findAllByObjectTypeAndObjectId(objType, objId);
		if (all.size()==0) {
			//first address for the object
			newObj.setIsDefault(true);
			return;
		}else {
			//find existing default address
			Address existingDefault= null;
			for (Address addr: all) {
				if (addr.getIsDefault() != null && addr.getIsDefault()) {
					existingDefault=addr;
					break;
				}
			}
			//there should always we a default address. If that is not the case, just put a warning proceed
			if (existingDefault==null) {
				LOG.warn("Object Type: "+objType+" with Id: "+objId+" had not default address.");
				newObj.setIsDefault(true);
				return;
			}
			boolean saveExisting=false;
			if (isAdd) {
				if (newObj.getIsDefault() != null && newObj.getIsDefault()) {
					// new is the default, remove from the old
					existingDefault.setIsDefault(false);
					saveExisting=true;
				}
			}else {
				if (!existingDefault.getId().equals(oldObj.getId())) {
					//it is edit of the address other than the default
					if (newObj.getIsDefault() != null && newObj.getIsDefault()) {
						// new is the default, remove from the old
						existingDefault.setIsDefault(false);
						saveExisting=true;
					}
				}else {
					// default address is modified
					if (newObj.getIsDefault() != null && !newObj.getIsDefault()) {
						// default flag is removed. It is not allowed. You make another address Default, then the flag of existing default is removed
						throw new BadRequestException("Default flag cannot be removed. Make another address default");
					}
				}
			}
			if (saveExisting) {
				repo.save(existingDefault);
				saveHistory(Actions.Crud.Update, (AuditableMain<?>) existingDefault, "isDefault set to false", null);
			}
		}
		super.beforeSave(newObj, oldObj, isAdd);
	}

	@Override
	protected void beforeDelete(Address savedObj) {
		if (savedObj.getIsDefault() != null && savedObj.getIsDefault()) {
			throw new BadRequestException("Default address cannot be deleted. Make another address default");
		}
		super.beforeDelete(savedObj);
	}

	public List<Address> findAll() {
		return repo.findAll();
	}
	public List<Address> findAllDefault(String objectType) {
		return repo.findAllByObjectTypeAndIsDefault(objectType, true);
	}
	public List<Address> findAllByObjectType(String objectType) {
		return repo.findAllByObjectType(objectType);
	}
	public List<Address> findAllDefault(String objectType, String objectId) {
		return repo.findAllByObjectTypeAndObjectId(objectType, objectId);
	}
	@Override
	protected String getAppObjectType() {
		return AppObjects.AddressesCode;
	}
}
