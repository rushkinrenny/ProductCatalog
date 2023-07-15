package com.nagarro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.model.Admin;
import com.nagarro.service.AdminService;

@CrossOrigin
@RestController
public class AdminLoginController {
	@Autowired
	private AdminService adminService;

	/**
	 * Admin Authentication
	 * 
	 * @param email
	 * @param password
	 * @return
	 */
	@GetMapping("/adminlogin/{email}/{password}")
	public ResponseEntity<?> getAdmin(@PathVariable("email") String email, @PathVariable("password") String password) {
		Admin admin = adminService.findAdminByEmailAndPassword(email, password);
		if (admin != null) {
			return new ResponseEntity<>(admin, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}
