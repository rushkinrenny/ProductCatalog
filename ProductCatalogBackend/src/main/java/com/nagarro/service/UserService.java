package com.nagarro.service;

import com.nagarro.model.User;

public interface UserService {

	/**
	 * Add user details to Database for registration
	 * 
	 * @param userRegistration
	 */
	public void addUserRegistration(User userRegistration);

	/**
	 * Find User by Email and password
	 * 
	 * @param email
	 * @param Password
	 * @return
	 */
	public User findUserByEmailAndPassword(String email, String Password);
}