package com.nagarro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.nagarro.model.User;
import com.nagarro.service.UserService;

@CrossOrigin
@Controller
public class UserLoginController {
	@Autowired
	private UserService userService;

	/**
	 * User authentication
	 * 
	 * @param email
	 * @param password
	 * @return
	 */
	@GetMapping("/userlogin/{email}/{password}")
	public ResponseEntity<User> getUser(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		User user = userService.findUserByEmailAndPassword(email, password);
		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
