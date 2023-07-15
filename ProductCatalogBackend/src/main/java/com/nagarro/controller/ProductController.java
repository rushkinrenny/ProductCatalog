package com.nagarro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nagarro.model.Product;
import com.nagarro.service.ProductService;
import com.nagarro.utils.ImageUtil;

@CrossOrigin
@RestController
public class ProductController {

	@Autowired
	ProductService productService;

	@Autowired
	ImageUtil imageUtility;

	@Autowired
	Product product;

	/**
	 * Add Product to database
	 * 
	 * @param productCode
	 * @param productName
	 * @param productBrand
	 * @param productDetails
	 * @param productPrice
	 * @param file
	 * @return
	 */
	@PostMapping(path = "/products", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Void> addProducts(@RequestParam("productcode") String productCode,
			@RequestParam("productname") String productName, @RequestParam("productbrand") String productBrand,
			@RequestParam("productdetails") String productDetails, @RequestParam("productprice") String productPrice,
			@RequestParam("image") MultipartFile file) {
		try {
			product.setProductCode(productCode);
			product.setProductName(productName);
			product.setProductBrand(productBrand);
			product.setProductDetails(productDetails);
			product.setProductPrice(Integer.parseInt(productPrice));

			if (imageUtility.saveImage(product, file)) {
				productService.addProduct(product);
				return ResponseEntity.status(HttpStatus.CREATED).build();
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * get a product corresponding to productcode
	 * 
	 * @param productCode
	 * @return
	 */
	@GetMapping("/products/{productcode}")
	public ResponseEntity<Product> getProductByProductCode(@PathVariable("productcode") String productCode) {
		Product product = productService.getProductByProductCode(productCode);
		return new ResponseEntity<Product>(product, HttpStatus.OK);

	}

	/**
	 * get product list
	 * 
	 * @return
	 */
	@GetMapping("/allproducts")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> productList = productService.getProduct();
		return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);

	}

	/**
	 * Get products list corresponding to input parameters
	 * 
	 * @param productName
	 * @param productCode
	 * @param productBrand
	 * @return
	 */
	@GetMapping("/products")
	public ResponseEntity<List<Product>> searchProducts(
			@RequestParam(name = "productname", required = false) String productName,
			@RequestParam(name = "productcode", required = false) String productCode,
			@RequestParam(name = "productbrand", required = false) String productBrand) {
		List<Product> productList = null;
		if (productCode.isBlank()) {
			productCode = null;
		}
		if (productName.isBlank()) {
			productName = null;
		}
		if (productBrand.isBlank()) {
			productBrand = null;
		}
		if ((productName != null || productCode != null || productBrand != null)) {
			productList = productService.getProduct(productCode, productName, productBrand);
			return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
		} else if ((productName == null && productCode == null && productBrand == null)) {
			productList = productService.getProduct();
			return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
		}
		return new ResponseEntity<List<Product>>(productList, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	/**
	 * Get product details corresponding to particular productCode
	 * 
	 * @param productCode
	 * @return
	 */
	@GetMapping("/productdetails/{productcode}")
	public ResponseEntity<String> getProductDetails(@PathVariable("productcode") String productCode) {

		try {
			Product product = productService.getProductByProductCode(productCode);
			String productDetails = product.getProductDetails();
			return new ResponseEntity<String>(productDetails, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Get product details corresponding to particular productCode
	 * 
	 * @param productCode
	 * @return
	 */
	@GetMapping("/productprice/{productcode}")
	public ResponseEntity<Integer> getProductPrice(@PathVariable("productcode") String productCode) {

		try {
			Product product = productService.getProductByProductCode(productCode);
			Integer productPrice = product.getProductPrice();
			return new ResponseEntity<Integer>(productPrice, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
