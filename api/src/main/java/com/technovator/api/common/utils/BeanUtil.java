package com.technovator.api.common.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.collections4.MultiValuedMap;
import org.apache.commons.collections4.multimap.ArrayListValuedHashMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.spydermama.api.propsets.dto.SimpleProperty;
import com.technovator.api.common.annotations.PropertyDef;
import com.thetechnovator.common.java.exceptions.BusinessException;
import com.thetechnovator.common.java.utils.StringMap;

public class BeanUtil {
	private static final Logger LOG = LoggerFactory.getLogger(BeanUtil.class);

	public static <T> T createFromProperties(Class<T> cls, StringMap props) throws BusinessException {
		try {
			T bean = cls.newInstance();
			initProperties(bean, props);
			return bean;
		} catch (InstantiationException | IllegalAccessException e) {
			throw new IllegalStateException(e.getMessage(), e);
		}
	}
	public static <T> T createFromProperties(Class<T> cls, List<SimpleProperty> props) throws BusinessException {
		try {
			T bean = cls.newInstance();
			initProperties(bean, props);
			return bean;
		} catch (InstantiationException | IllegalAccessException e) {
			throw new IllegalStateException(e.getMessage(), e);
		}
	}
	public static void initProperties(Object bean, StringMap props) throws BusinessException {
		for (Field field : FieldUtils.getAllFields(bean.getClass())) {
			PropertyDef def = field.getAnnotation(PropertyDef.class);
			if (def == null) {
				continue;
			}

			String property = def.property();
			Boolean required = def.required();
			String defaultValue = def.defaultValue();
			Object value;
			if (property.endsWith("*")) {
				value = getAllValuesFor(props, property);
			} else {
				value = props.get(property);
			}
			if (value == null && !defaultValue.equals(PropertyDef.DEFAULT)) {
				value = defaultValue;
			}
			if (value == null) {
				if (required) {
					throw new BusinessException("Coud not find the required property " + property);
				}
				continue;
			}
			if (field.getType().isAssignableFrom(value.getClass())) {
				setFieldValue(bean, field, value);
			} else if (value instanceof String) {
				setFieldValueFromString(bean, field, (String) value);
			} else {
				throw new IllegalStateException(
						"Value type mismatch for property " + property + " Expected type is " + field.getType().getName() + ", value is of type " + value.getClass().getName());
			}
		}
	}

	public static void initProperties(Object bean, List<SimpleProperty> props) throws BusinessException {
		MultiValuedMap<String, SimpleProperty> map = new ArrayListValuedHashMap<>();
		props.forEach(e -> map.put(e.getName(), e));
		for (Field field : FieldUtils.getAllFields(bean.getClass())) {
			PropertyDef def = field.getAnnotation(PropertyDef.class);
			if (def == null) {
				continue;
			}

			String property = def.property();
			Boolean required = def.required();
			Boolean useref = def.usereference();
			String defaultValue = def.defaultValue();
			String refProp=null;
			Object value=null;
			if (property.contains(":")) {
				//referenced value in simple property is separated with colon
				refProp=StringUtils.substringAfter(property, ":");
				property=StringUtils.substringBefore(property, ":");
			}
			if (!map.containsKey(property)) {
				if (required) {
					throw new BusinessException("Coud not find the required property " + property);
				}
				if (!defaultValue.equals(PropertyDef.DEFAULT)) {
					value = defaultValue;
				}else {
					continue;
				}
			}else {
				boolean isCollection =Collection.class.isAssignableFrom(field.getType());
				if (!isCollection && map.get(property).size() > 1) {
					throw new BusinessException("Multiple values found for " + property);				
				}
				if (isCollection) {
					List<Object> values = new ArrayList<>();
					for (SimpleProperty prop: map.get(property)) {
						values.add(getValue(prop, refProp,useref));
					}
					value = values;
				} else {
					for (SimpleProperty prop: map.get(property)) {
						value = getValue(prop, refProp,useref);
					}
				}
			}
			if (field.getType().isAssignableFrom(value.getClass())) {
				setFieldValue(bean, field, value);
			} else if (value instanceof String) {
				setFieldValueFromString(bean, field, (String) value);
			} else {
				throw new IllegalStateException(
						"Value type mismatch for property " + property + " Expected type is " + field.getType().getName() + ", value is of type " + value.getClass().getName());
			}
		}
	}

	private static Object getValue(SimpleProperty prop, String refPropName, Boolean useref) {
		if (useref) {
			//just use the referenced value
			return prop.getReferencedValue();
		}
		if (StringUtils.isEmpty(refPropName)) {
			return prop.getValue();
		} else {
			return getFieldValue(prop.getReferencedValue(), refPropName);
		}
	}

	public static void copyProperties(Object dest, Object src) {
		try {
			PropertyUtils.copyProperties(dest, src);
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			throw new IllegalStateException(e);
		}

	}

	private static List<Object> getAllValuesFor(StringMap props, String property) {
		List<Object> values = new ArrayList<>();
		String name = StringUtils.substringBefore(property, "*");
		for (String key : props.keySet()) {
			if (key.startsWith(name)) {
				values.add(props.get(key));
			}
		}
		if (values.isEmpty()) {
			return null;
		} else {
			return values;
		}
	}

	private static void setFieldValueFromString(Object bean, Field field, String strValue) {
		Object value = null;
		if (field.getType().isArray()) {
			String[] strValues = StringUtils.split(strValue);
			value = ConvertUtils.convert(strValues, field.getType());
		} else {
			value = ConvertUtils.convert(strValue, field.getType());
		}
		setFieldValue(bean, field, value);
	}

	public static void setFieldValue(Object bean, Field field, Object value) {
		try {
			field.setAccessible(true);
			field.set(bean, value);
			LOG.debug("Field " + field.getName() + " value set to " + value + " Type: " + field.getType().getName());
		} catch (IllegalArgumentException e) {
			throw new IllegalStateException(e);
		} catch (IllegalAccessException e) {
			throw new IllegalStateException(e);
		}

	}

	public static Object getFieldValue(Object bean, String fieldName) {
		try {
			Field field = FieldUtils.getField(bean.getClass(), fieldName, true);
			field.setAccessible(true);
			return field.get(bean);
		} catch (IllegalArgumentException e) {
			throw new IllegalStateException(e);
		} catch (IllegalAccessException e) {
			throw new IllegalStateException(e);
		}
	}

	public static Object getFieldValue(Object bean, Field field) {
		try {
			field.setAccessible(true);
			return field.get(bean);
		} catch (IllegalArgumentException e) {
			throw new IllegalStateException(e);
		} catch (IllegalAccessException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Object> getFieldValue(Object bean, List<Field> fields) {
		List<Object> result = new ArrayList<>();
		for (Field field : fields) {
			result.add(getFieldValue(bean, field));
		}

		return result;
	}
}
