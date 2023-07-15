package com.nagarro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.model.Product;
import com.nagarro.model.Serviceability;
import com.nagarro.service.ProductService;
import com.nagarro.service.ServiceabilityService;

@CrossOrigin
@RestController
public class ServiceabilityController {
	@Autowired
	private ServiceabilityService serviceabilityService;

	@Autowired
	private ProductService productService;

	/**
	 * Get serviceability corresponding to pincode and productcode
	 * 
	 * @param productCode
	 * @param pincode
	 * @return
	 */
	@GetMapping("/service/{pincode}/{productcode}")
	public ResponseEntity<Serviceability> getServiceabilityByPincode(@PathVariable("productcode") String productCode,
			@PathVariable("pincode") Integer pincode) {
		try {
			Serviceability serviceability = serviceabilityService.findServiceabilityByProductCodeAndPincode(productCode,
					pincode);
			if (serviceability != null)
				return new ResponseEntity<Serviceability>(serviceability, HttpStatus.OK);
			else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Add serviceability
	 * 
	 * @param productCode
	 * @param pincode
	 * @param expectedDeliveryTime
	 * @return
	 */
	@PostMapping("/service")
	public ResponseEntity<Void> addServiceability(@RequestParam("productcode") String productCode,
			@RequestParam("pincode") String pincode,
			@RequestParam("expectedDeliveryTime") String expectedDeliveryTime) {
		try {
			Serviceability serviceability = serviceabilityService.findServiceabilityByProductCodeAndPincode(productCode,
					Integer.parseInt(pincode));
			if (serviceability == null) {
				serviceabilityService.addServiceability(productCode, Integer.parseInt(pincode),
						Integer.parseInt(expectedDeliveryTime));
				Product product = productService.getProductByProductCode(productCode);
				product.setNoOfServiceability(product.getNoOfServiceability() + 1);
				productService.updateProduct(product);
				return ResponseEntity.status(HttpStatus.OK).build();
			} else {
				return ResponseEntity.status(HttpStatus.FOUND).build();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
