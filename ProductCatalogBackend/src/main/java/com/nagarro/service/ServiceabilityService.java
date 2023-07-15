package com.nagarro.service;

import com.nagarro.model.Serviceability;

public interface ServiceabilityService {
	/**
	 * Find serviceability corresponds to producutcode and pincode
	 * 
	 * @param productCode
	 * @param pincode
	 * @return
	 */
	public Serviceability findServiceabilityByProductCodeAndPincode(String productCode, Integer pincode);

	/**
	 * Add serviceability
	 * 
	 * @param productCode
	 * @param pincode
	 * @param expectedDeliveryTime
	 */
	public void addServiceability(String productCode, Integer pincode, Integer expectedDeliveryTime);
}
