package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.User;
import com.example.demo.exceptions.AppointmentIdException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.exceptions.UsernameAlreadyExistsException;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try{
            //Make sure that password and confirmPassword match
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            //Username has to be unique
            newUser.setUsername(newUser.getUsername());

            //We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");

            return userRepo.save(newUser);
        }catch(Exception e){
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public User findUserById(Long id){
        User newUser = userRepo.getById(id);

        if(newUser == null){
            throw new UserNotFoundException("User not found");
        }

        return newUser;
    }

    public User deleteUserById(Long id){
        User user = userRepo.getById(id);

        if (user == null){
            throw new UserNotFoundException("User not found");
        }

        userRepo.delete(user);
        return user;
    }
}
