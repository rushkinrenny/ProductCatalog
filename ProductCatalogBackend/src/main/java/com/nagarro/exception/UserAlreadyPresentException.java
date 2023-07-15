package com.nagarro.exception;

/**
 * User defined Exception class for handle Resource not found exception
 * 
 * @author akash03
 *
 */
public class UserAlreadyPresentException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	String resourceName;
	String fieldName;
	String fieldValue;

	public UserAlreadyPresentException(String resourceName, String fieldName, String fieldValue) {
		super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}

	@Override
	public String toString() {
		return "ResourceNotFoundException [resourceName=" + resourceName + ", fieldName=" + fieldName + ", FieldValue="
				+ fieldValue + "]";
	}

}
