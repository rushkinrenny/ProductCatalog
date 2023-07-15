package com.nagarro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nagarro.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

	public Product findByProductCode(String productCode);

	// get list of product one or many inputs like productcode, productname,
	// productbrand
	@Query("select p from Product p where p.productCode like %?%1 OR p.productName like %?%2 OR p.productBrand like %?%3")
	public List<Product> findProductByInputParameter(@Param("productcode") String productCode,
			@Param("productname") String productName, @Param("productbrand") String productBrand);

}
