package com.spydermama.api.common.changehistory;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.common.domain.AbstractResource;
import com.spydermama.api.common.services.BaseService;

@Service
public class ChangeHistoryService extends BaseService{
	@Autowired
	private ChangeHistoryRepository repo;
	public Long add(String action, Auditable<?> auditable, String details) {
		return add(action,auditable, details, null);
	}
	public Long add(String action, Auditable<?> auditable, String details, String prefix) {
		if (StringUtils.isEmpty(details)) {
			return null;
		}
		if (prefix != null) {
			details = prefix+": "+details;
		}
		ChangeHistory obj = new ChangeHistory();
		obj.setAction(action);
		obj.setDate(new Date());
		obj.setDetails(details);
		obj.setEntityType(auditable.getResourceType());
		obj.setEntityId(auditable.getId().toString());
		obj.setEntityName(auditable.getName());
		obj.setUser(getLoggedUser());
		
		repo.save(obj);
		
		return obj.getId();
	}
	
	public List<ChangeHistory> find(String entity, String entityId) {
		return repo.findByEntityTypeAndEntityIdOrderByDateDesc(entity, entityId);
	}
	public List<ChangeHistory> find(Auditable<?> auditable) {
		return find(auditable,null);
	}
	public List<ChangeHistory> find(Auditable<?> auditable, List<ChangeHistory> childAuditables) {
		List<ChangeHistory> history = repo.findByEntityTypeAndEntityIdOrderByDateDesc(auditable.getResourceType(), auditable.getId().toString());
	/*	addToResult(history, auditable);
		if (childAuditables != null && !childAuditables.isEmpty()) {
			Comparator<ChangeHistory> comp = Comparator.comparing(ChangeHistory::getDate).reversed();
			history.addAll(childAuditables);
			history.sort(comp);
		}
		*/
		return history; 
	}
	
	private void addToResult(List<ChangeHistory> history, Auditable<?> auditable) {
		//add the added record, which is not part of the history to preserve space
		ChangeHistory add = new ChangeHistory();
		if (auditable instanceof AbstractResource) { //this the case always
			AbstractResource common = (AbstractResource) auditable;
			if (common.getCreateDate()==null) {
				return;
			}
			add.setDate(common.getCreateDate());
			add.setUser(common.getCreateUser());
		}
		add.setAction("Add");
		add.setDetails("Added");
		add.setEntityId(auditable.getId().toString());
		add.setEntityName(auditable.getName());
		add.setEntityType(auditable.getResourceType());
		history.add(add);
	}
}
