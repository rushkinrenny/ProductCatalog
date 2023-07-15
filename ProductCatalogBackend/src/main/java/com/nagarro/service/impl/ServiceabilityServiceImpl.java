package com.nagarro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.model.Serviceability;
import com.nagarro.repository.ServiceabilityRepository;
import com.nagarro.service.ServiceabilityService;

@Service
public class ServiceabilityServiceImpl implements ServiceabilityService {

	@Autowired
	private ServiceabilityRepository serviceabilityRepository;

	@Override
	public void addServiceability(String productCode, Integer pincode, Integer expectedDeliveryTime) {
		serviceabilityRepository.save(new Serviceability(pincode, expectedDeliveryTime, productCode));
	}

	@Override
	public Serviceability findServiceabilityByProductCodeAndPincode(String productCode, Integer pincode) {
		Serviceability serviceability = serviceabilityRepository.findByProductCodeAndPincode(productCode, pincode);
		System.out.println(serviceability);
		return serviceability;

	}

}
