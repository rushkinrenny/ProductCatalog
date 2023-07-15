package com.nagarro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.model.Admin;
import com.nagarro.repository.AdminRepository;
import com.nagarro.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Override
	public Admin findAdminByEmailAndPassword(String email, String Password) {
		Admin admin = adminRepository.findByEmailAndPassword(email, Password);
		return admin;
	}

}
