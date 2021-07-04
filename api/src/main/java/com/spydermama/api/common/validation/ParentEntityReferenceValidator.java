package com.spydermama.api.common.validation;

import com.spydermama.api.common.annotations.ParentEntityReference;
import com.spydermama.api.common.domain.IdentifiableEntity;

public class ParentEntityReferenceValidator extends BaseEntityReferenceValidator<ParentEntityReference>{

	@Override
	protected Class<? extends IdentifiableEntity<?>> getValue(ParentEntityReference annotation) {
		return annotation.value();
	}

}
