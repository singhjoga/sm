package com.spydermama.api.propsets;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spydermama.api.propsets.domain.PropertysetProp;
import com.spydermama.api.propsets.domain.PropertysetPropValue;
import com.spydermama.api.propsets.domain.PropertysetPropValueView;
import com.spydermama.api.propsets.dto.BaseProperty;
import com.spydermama.api.propsets.dto.PropertysetValues;
import com.spydermama.api.propsets.dto.SimpleProperty;
import com.spydermama.api.propsets.dto.UpdateRequest;
import com.spydermama.api.propsets.repository.PropertysetParentRepository;
import com.spydermama.api.propsets.repository.PropertysetPropRepository;
import com.spydermama.api.propsets.repository.PropertysetPropValueRepository;
import com.spydermama.api.propsets.repository.PropertysetPropValueViewRepository;
import com.technovator.api.common.exception.BadRequestException;
import com.technovator.api.common.exception.ResourceNotFoundException;
import com.technovator.api.common.properties.PropertiesHelper;

@Service
public class PropertysetValueService {
	private static final String DEFAULT_INST = "DEFAULT";
	@Autowired
	private PropertysetPropRepository propRepo;
	@Autowired
	private PropertysetPropValueViewRepository valueRepo;
	@Autowired
	private PropertysetPropValueRepository repo;
	@Autowired
	private PropertiesHelper propHelper;
	@Autowired
	PropertysetParentRepository parentRepo;

	@Transactional
	public PropertysetValues getValues(Long propertysetId, String instId) {
		return getValues(propertysetId, instId, false);
	}

	@Transactional
	public PropertysetValues getValues(Long propertysetId, boolean forDisplay) {
		return getValues(propertysetId, DEFAULT_INST, forDisplay);
	}

	@Transactional
	public PropertysetValues getValues(Long propertysetId, String instId, boolean forDisplay) {
		Set<String> propIds = new HashSet<>();
		// first find the property with values defined
		List<SimpleProperty> simpleProperties = new ArrayList<>();
		if (!DEFAULT_INST.equals(instId)) {
			// get the values for the instance
			addValues(valueRepo.findByPropertysetIdAndResourceInstanceId(propertysetId, instId), simpleProperties,
					propIds, forDisplay, false);
		}
		// default properties for the propertyset. Existing will not be overwritten
		addValues(valueRepo.findByPropertysetIdAndResourceInstanceId(propertysetId, DEFAULT_INST), simpleProperties,
				propIds, forDisplay, false);
		List<Long> parentIds = new ArrayList<>();
		parentRepo.findByPropsetId(propertysetId).forEach(e -> parentIds.add(e.getParentPropsetId()));
		// get the inherited. We are calling it here so that it does not overwrite the
		// same properties from instance
		if (!parentIds.isEmpty()) {
			addValues(valueRepo.findByPropertysetIdInAndResourceInstanceId(parentIds, DEFAULT_INST), simpleProperties,
					propIds, forDisplay, true);
		}

		// now, if it is for display, return the properties without values also, so that
		// the user can set the values
		if (forDisplay) {
			List<PropertysetProp> props = propRepo.findAllWihParent(propertysetId);
			for (PropertysetProp propsetProp : props) {
				// add only those props not having any values
				int propIndex = 0;
				if (propsetProp.getIsMultiInstance()) {
					// multi instance properties are always with instance index starting at 1
					propIndex = 1;
				}
				String propId = propsetProp.getId() + "-" + propIndex;
				if (propIds.contains(propId)) {
					continue;
				}
				BaseProperty dest;
				dest = new SimpleProperty();
				simpleProperties.add((SimpleProperty) dest);
				String suffix = propIndex > 0 ? "." + propIndex : "";

				dest.setPropertyId(propsetProp.getId());
				dest.setIsOptional(propsetProp.getIsOptional());
				dest.setName(propsetProp.getDisplayName() + suffix);
				dest.setTypeCode(propsetProp.getTypeCode());
				dest.setValidValues(propsetProp.getValidValues());
				setDisplayOrder(dest, propsetProp.getPropertysetId(), propsetProp.getDisplayOrder(), propIndex);
			}
		} else {
			// propHelper.resolveAllReferences(simpleProperties, null, true, true, null,
			// true, true, true);
			// propHelper.resolveAllReferences(envLevelPropertiesMap.values(), null, true,
			// true, null, true, true, true);
		}
		simpleProperties = simpleProperties.stream()
				.sorted((p1, p2) -> p1.getDisplayOrder().compareTo(p2.getDisplayOrder())).collect(Collectors.toList());

		return new PropertysetValues(simpleProperties);
	}

	@Transactional
	public void saveSimpleValues(String instId, List<UpdateRequest> values) {
		for (UpdateRequest req : values) {
			PropertysetProp prop = getProperty(req.getPropertyId());
			// if property can have multiple instance, instanceIndex is must. verify it
			if (prop.getIsMultiInstance()
					&& (req.getProperyInstanceIndex() == null || req.getProperyInstanceIndex() < 1)) {
				throw new BadRequestException("PropertyInstanceIndex is required for multi instance properties");
			}

			Integer propInstIndex = req.getProperyInstanceIndex() == null ? 0 : req.getProperyInstanceIndex();
			PropertysetPropValue value = find(instId, req.getPropertyId(), propInstIndex);
			if (value == null) {
				value = new PropertysetPropValue();
				value.setPropertyId(req.getPropertyId());
				value.setPropertyInstanceIndex(propInstIndex);
				value.setResourceInstanceId(instId);
			}
			value.setValue(req.getValue());
			repo.save(value);
		}
	}

	private PropertysetPropValue find(String instId, Long propId, Integer propInstIndex) {
		PropertysetPropValue value = repo.findByPropertyIdAndResourceInstanceIdAndPropertyInstanceIndex(propId, instId,
				propInstIndex);
		return value;
	}

	private PropertysetProp getProperty(Long propId) {
		PropertysetProp prop = propRepo.findById(propId).orElse(null);
		if (prop == null) {
			throw new ResourceNotFoundException("PropertysetProperty", propId);
		}
		return prop;
	}

	private void addValues(List<PropertysetPropValueView> values, List<SimpleProperty> simpleProperties, //
			Set<String> propIds, boolean forDisplay,
			boolean inherited) {

		for (PropertysetPropValueView value : values) {
			// add only those props not having any values
			String propId = value.getPropertyId() + "-" + value.getPropertyInstanceIndex();
			if (propIds.contains(propId)) {
				continue;
			}
			propIds.add(propId);
			simpleProperties.add(createSimplePropFrom(value, forDisplay, inherited));
		}
	}

	private SimpleProperty createSimplePropFrom(PropertysetPropValueView src, boolean forDisplay, boolean inherited) {
		SimpleProperty prop = new SimpleProperty();
		copyCommon(prop, src, forDisplay, inherited);
		prop.setValue(src.getValue());

		return prop;
	}

	private void copyCommon(BaseProperty dest, PropertysetPropValueView src, boolean forDisplay, boolean inherited) {
		dest.setPropertyId(src.getPropertyId());
		dest.setIsOptional(src.getIsOptional());
		// suffix the property with property index for a multi-value property
		String suffix = src.getPropertyInstanceIndex() != null && src.getPropertyInstanceIndex() > 0
				? "." + src.getPropertyInstanceIndex()
				: "";
		if (forDisplay) {
			dest.setName(src.getDisplayName() + suffix);
		} else {
			dest.setName(src.getName());
		}
		dest.setTypeCode(src.getTypeCode());
		dest.setValidValues(src.getValidValues());
		dest.setIsInherited(inherited);
		setDisplayOrder(dest, src.getPropertysetId(), src.getDisplayOrder(), src.getPropertyInstanceIndex());
	}

	private void setDisplayOrder(BaseProperty dest, Long propsetId, Integer displayOrder, Integer instIndex) {
		String dispOrder = String.format("%03d.%03d.%03d", propsetId, instIndex, displayOrder);
		dest.setDisplayOrder(dispOrder);
	}
}
