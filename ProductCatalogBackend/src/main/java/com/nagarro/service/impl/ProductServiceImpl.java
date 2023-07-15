package com.nagarro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exception.UserAlreadyPresentException;
import com.nagarro.model.Product;
import com.nagarro.repository.ProductRepository;
import com.nagarro.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository productRepository;

	@Override
	public void addProduct(Product product) {
		if (productRepository.findByProductCode(product.getProductCode()) == null) {

			productRepository.save(product);
		} else {
			throw new UserAlreadyPresentException("Product", "ProductCode already present : ",
					product.getProductCode());
		}
	}

	@Override
	public List<Product> getProduct() {
		return productRepository.findAll();

	}

	@Override
	public List<Product> getProduct(String productCode, String productName, String productBrand) {
		return productRepository.findProductByInputParameter(productCode, productName, productBrand);
	}

	@Override
	public Product getProductByProductCode(String productCode) {
		return productRepository.findByProductCode(productCode);
	}

	@Override
	public void updateProduct(Product product) {
		productRepository.save(product);

	}

}
