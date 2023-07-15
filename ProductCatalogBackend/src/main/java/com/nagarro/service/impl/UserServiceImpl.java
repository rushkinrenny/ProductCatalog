package com.nagarro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exception.UserAlreadyPresentException;
import com.nagarro.model.User;
import com.nagarro.repository.UserRepository;
import com.nagarro.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Override
	public void addUserRegistration(User userRegistration) {
		if (userRepository.findByEmail(userRegistration.getEmail()) == null)
			userRepository.save(userRegistration);
		else {

			throw new UserAlreadyPresentException("userRegistration", "email already present",
					userRegistration.getEmail());
		}

	}

	@Override
	public User findUserByEmailAndPassword(String email, String Password) {
		User user = userRepository.findByEmailAndPassword(email, Password);
		return user;
	}

}
