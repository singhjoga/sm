package com.technovator.api.common.properties;

import java.util.Collection;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class PropertiesHelper {

	private static final Logger LOG = LoggerFactory.getLogger(PropertiesHelper.class);
	public void resolveAllReferences(Collection<? extends Property> props, String envCode, boolean resolveCredentials, boolean throwErrorWhenRefNotFound, Properties localProps,
			Boolean resolveValueReferences, boolean resolveCredReferences, boolean resolveTypeReferences) {
	}

	public void resolveFileReferences(Collection<? extends Property> props) {
	}
}
