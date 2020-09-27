package com.react.restaurant.service;

import com.react.restaurant.entity.Users;
import com.react.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> result = Optional.ofNullable(userRepository.findByUsername(username));
        Users user = null;
        if(result.isPresent() == false) {
            throw new UsernameNotFoundException("Invalid username / password");
        }
        user = result.get();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(new ArrayList<>()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<?> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority("")).collect(Collectors.toList());
    }
}
