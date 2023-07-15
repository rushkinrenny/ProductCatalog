package com.nagarro.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Product {
	@Id
	private String productCode;
	private String productName;
	private String productBrand;
	private String productDetails;
	private Integer productPrice;

	@Column(name = "no_of_serviceability", columnDefinition = "Decimal(10) default '0'")
	private Integer noOfServiceability = 0;

	@Lob
	private byte[] image;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(String productCode, String productName, String productBrand, String productDetails,
			Integer productPrice, Integer noOfServiceability, byte[] image) {
		super();
		this.productCode = productCode;
		this.productName = productName;
		this.productBrand = productBrand;
		this.productDetails = productDetails;
		this.productPrice = productPrice;
		this.noOfServiceability = noOfServiceability;
		this.image = image;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductBrand() {
		return productBrand;
	}

	public void setProductBrand(String productBrand) {
		this.productBrand = productBrand;
	}

	public String getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(String productDetails) {
		this.productDetails = productDetails;
	}

	public Integer getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Integer productPrice) {
		this.productPrice = productPrice;
	}

	public Integer getNoOfServiceability() {
		return noOfServiceability;
	}

	public void setNoOfServiceability(Integer noOfServiceability) {
		this.noOfServiceability = noOfServiceability;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

}
