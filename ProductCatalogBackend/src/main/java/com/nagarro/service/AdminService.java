package com.nagarro.service;

import com.nagarro.model.Admin;

public interface AdminService {
	/**
	 * Get Admin by Email and Password
	 * 
	 * @param email
	 * @param Password
	 * @return
	 */
	public Admin findAdminByEmailAndPassword(String email, String Password);
}
