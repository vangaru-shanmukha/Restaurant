package com.react.restaurant.service;

import com.react.restaurant.entity.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Users findByUsername(String username);
}
