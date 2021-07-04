package com.spydermama.api.common.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonView;
import com.spydermama.api.base.Views;

import io.swagger.annotations.ApiModel;

/**
 * Common REST Response
 * @author JogaSingh
 *
 */
@JsonInclude(Include.NON_NULL)
@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
public class RestResponse {
	public static class WarningResponse extends MessageDetail{
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private List<Warning> warnings;
		public WarningResponse() {
			super(null,null);
		}
		public WarningResponse(String message, Set<String> warningList) {
			super(message, null);
			if (warningList != null && !warningList.isEmpty()) {
				warnings = new ArrayList<RestResponse.Warning>();
				for (String warnMsg: warningList) {
					warnings.add(new Warning(warnMsg,null));
				}
			}
		}
		public List<Warning> getWarnings() {
			return warnings;
		}
		public void setWarnings(List<Warning> warnings) {
			this.warnings = warnings;
		}
		
	}
	@ApiModel("ErrorModel")
	public static class ErrorResponse extends MessageDetail{
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private List<ValidationError> errors=new ArrayList<>();		
		public ErrorResponse() {
			this(null, null,null);
		}
		public ErrorResponse(String message, String code, List<ValidationError> errors) {
			super(message, code);
			if (errors != null) {
				this.errors = errors;
			}
		}
		public List<ValidationError> getErrors() {
			return errors;
		}
		public void setErrors(List<ValidationError>  errors) {
			this.errors = errors;
		}
	}

	public static class Warning extends MessageDetail{
		public Warning() {
			this(null, null);
		}
		public Warning(String message, String code) {
			super(message, code);
		}
	}
	public static class Error extends MessageDetail{		
		public Error() {
			this(null,null);
		}
		public Error(String message, String code) {
			super(message, code);
		}
	}
	public static class ValidationError extends Error{
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private String field;
		public ValidationError() {
			super(null, null);
		}
		public ValidationError(String field, String message, String code) {
			super(message, code);
			this.field=field;
		}
		public String getField() {
			return field;
		}
		public void setField(String field) {
			this.field = field;
		}
	}

	public static class MessageDetail {
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private String message;
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private String code;
		public MessageDetail(String message, String code) {
			super();
			this.message = message;
			this.code = code;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		
	}

	public static class AddResponse {
		
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private String id;
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private String location;
		
		public AddResponse() {
		}
		public AddResponse(String id, String location) {
			this.id = id;
			this.location = location;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getLocation() {
			return location;
		}
		public void setLocation(String location) {
			this.location = location;
		}
		
	}
	public static class BulkOperationResponse{
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})
		private int affectedItems;
		@JsonView(value= {Views.Add.class,Views.Update.class,Views.List.class})		
		private WarningResponse warning;
		public BulkOperationResponse(int affectedItems) {
			this.affectedItems=affectedItems;
		}
		public int getAffectedItems() {
			return affectedItems;
		}
		public void setAffectedItems(int affectedItems) {
			this.affectedItems = affectedItems;
		}
		public WarningResponse getWarning() {
			return warning;
		}
		public void setWarning(WarningResponse warning) {
			this.warning = warning;
		}
		
	}
}
