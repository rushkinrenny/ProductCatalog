package com.nagarro.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Serviceability {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer serviceabilitId;
	private Integer pincode;
	private Integer expectedDeliveryTime;
	private String productCode;

	public Serviceability() {
		super();
	}

	public Serviceability(Integer pincode, Integer expectedDeliveryTime, String productCode) {
		super();
		this.pincode = pincode;
		this.expectedDeliveryTime = expectedDeliveryTime;
		this.productCode = productCode;
	}

	public Serviceability(Integer serviceabilitId, Integer pincode, Integer expectedDeliveryTime, String productCode) {
		super();
		this.serviceabilitId = serviceabilitId;
		this.pincode = pincode;
		this.expectedDeliveryTime = expectedDeliveryTime;
		this.productCode = productCode;
	}

	public Integer getServiceabilitId() {
		return serviceabilitId;
	}

	public void setServiceabilitId(Integer serviceabilitId) {
		this.serviceabilitId = serviceabilitId;
	}

	public Integer getPincode() {
		return pincode;
	}

	public void setPincode(Integer pincode) {
		this.pincode = pincode;
	}

	public Integer getExpectedDeliveryTime() {
		return expectedDeliveryTime;
	}

	public void setExpectedDeliveryTime(Integer expectedDeliveryTime) {
		this.expectedDeliveryTime = expectedDeliveryTime;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

}
