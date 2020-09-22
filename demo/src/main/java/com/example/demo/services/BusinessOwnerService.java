package com.example.demo.services;

import com.example.demo.domain.BusinessOwner;
import com.example.demo.exceptions.UsernameAlreadyExistsException;
import com.example.demo.repo.BusinessOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BusinessOwnerService {

    @Autowired
    private BusinessOwnerRepo businessOwnerRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public BusinessOwner saveBusinessOwner (BusinessOwner newOwner){
        try{
            newOwner.setPassword((bCryptPasswordEncoder.encode(newOwner.getPassword())));
            newOwner.setConfirmPassword("");
            //Username is unique
            newOwner.setUsername(newOwner.getUsername());
            //pw and confirmation matches

            //dont show password/confirm password



            return businessOwnerRepo.save(newOwner);
        } catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '" + newOwner.getUsername() + "' already exists");
        }
    }
}
