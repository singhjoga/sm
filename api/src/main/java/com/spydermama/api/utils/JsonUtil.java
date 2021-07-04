package com.spydermama.api.utils;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thetechnovator.common.java.exceptions.BusinessException;

public class JsonUtil {

	private static ObjectMapper mapper = new ObjectMapper();

	public static String objectToJsonString(Object obj, boolean prettyPrint) throws BusinessException {
		try {
			if (prettyPrint) {
				return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
			} else {
				return mapper.writeValueAsString(obj);
			}
		} catch (JsonProcessingException e) {
			throw new BusinessException(e);
		}
	}

	public static <T> T jsonStringToObject(String json, Class<T> returnType) throws BusinessException {
		try {
			return mapper.readValue(json, returnType);
		} catch (JsonParseException e) {
			throw new BusinessException(e);
		} catch (JsonMappingException e) {
			throw new BusinessException(e);
		} catch (IOException e) {
			throw new BusinessException(e);
		}
	}
}
