package com.spydermama.api.propsets.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import io.swagger.annotations.ApiModel;

@Entity(name="PROP_SET_PARENT")
@ApiModel(description = "Propertyset parent model")
@IdClass(value=PropertysetParent.class)
public class PropertysetParent implements Serializable{

	private static final long serialVersionUID = -4540393534020560609L;
	@Id
	@Column(name="PROP_SET_ID")
	private Long propsetId;
	@Id
	@Column(name="PARENT_PROP_SET_ID")
	private Long parentPropsetId;
	public Long getPropsetId() {
		return propsetId;
	}
	public void setPropsetId(Long propsetId) {
		this.propsetId = propsetId;
	}
	public Long getParentPropsetId() {
		return parentPropsetId;
	}
	public void setParentPropsetId(Long parentPropsetId) {
		this.parentPropsetId = parentPropsetId;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((parentPropsetId == null) ? 0 : parentPropsetId.hashCode());
		result = prime * result + ((propsetId == null) ? 0 : propsetId.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PropertysetParent other = (PropertysetParent) obj;
		if (parentPropsetId == null) {
			if (other.parentPropsetId != null)
				return false;
		} else if (!parentPropsetId.equals(other.parentPropsetId))
			return false;
		if (propsetId == null) {
			if (other.propsetId != null)
				return false;
		} else if (!propsetId.equals(other.propsetId))
			return false;
		return true;
	}
	
}
