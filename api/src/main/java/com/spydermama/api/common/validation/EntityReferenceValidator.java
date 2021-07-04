package com.spydermama.api.common.validation;

import com.spydermama.api.common.annotations.EntityReference;
import com.spydermama.api.common.domain.IdentifiableEntity;

public class EntityReferenceValidator extends BaseEntityReferenceValidator<EntityReference>{

	@Override
	protected Class<? extends IdentifiableEntity<?>> getValue(EntityReference annotation) {
		return annotation.value();
	}

}
