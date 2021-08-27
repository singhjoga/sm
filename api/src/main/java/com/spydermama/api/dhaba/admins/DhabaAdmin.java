package com.spydermama.api.dhaba.admins;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.customer.Customer;
import com.spydermama.api.dhaba.main.Dhaba;
import com.technovator.api.common.annotations.EntityReference;
import com.technovator.api.common.auditlog.AuditableMain;
import com.technovator.api.common.auditlog.AuditableReference;
import com.technovator.api.common.constants.AppObjects;
import com.technovator.api.common.constants.OperationGroups;
import com.technovator.api.common.constants.Views;
import com.technovator.api.common.domain.IdentifiableEntity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity(name="DHABA_ADMIN")
@ApiModel(description = "Dhaba admin")
@IdClass(value = DhabaAdmin.class)
public class DhabaAdmin implements IdentifiableEntity<DhabaAdmin>, AuditableReference<String, String>, Serializable{

	private static final long serialVersionUID = 6440151353941979923L;

	@Column(name="DHABA_ID")
	@Id
	@Size(min = 1, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Dhaba ID", position = 1, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Dhaba.class)
	private String dhabaId;	


	@Column(name="CUST_ID")
	@Id
	@Size(min = 1, max = 500, groups=OperationGroups.Always.class)
	@ApiModelProperty(value = "Customer ID", position = 1, required=true)
	@NotNull(groups=OperationGroups.Add.class)
	@JsonView(value= {Views.Allways.class})
	@EntityReference(value = Customer.class)
	private String customerId;


	public String getDhabaId() {
		return dhabaId;
	}


	public void setDhabaId(String dhabaId) {
		this.dhabaId = dhabaId;
	}


	public String getCustomerId() {
		return customerId;
	}


	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}


	@Override
	public DhabaAdmin getId() {
		return this;
	}


	@Override
	public void setId(DhabaAdmin id) {
		this.setCustomerId(id.getCustomerId());
		this.setDhabaId(id.getDhabaId());
	}


	@Override
	public String getAppObjectType() {
		return AppObjects.DhabasAdminCode;
	}

	@Override
	public String getParentId() {
		return dhabaId;
	}
	@Override
	public Class<? extends AuditableMain<?>> getParentEntity() {
		return Dhaba.class;
	}


	@Override
	public String getReferenceId() {
		return customerId;
	}


	@Override
	public Class<? extends AuditableMain<?>> getReferenceEntity() {
		return Customer.class;
	}
	
	

}
