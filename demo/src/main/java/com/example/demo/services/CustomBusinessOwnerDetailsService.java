package com.example.demo.services;

import com.example.demo.domain.BusinessOwner;
import com.example.demo.repo.BusinessOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomBusinessOwnerDetailsService implements UserDetailsService {

    @Autowired
    private BusinessOwnerRepo ownerRepo;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        BusinessOwner owner = ownerRepo.findByUsername(s);

        if(owner == null) new UsernameNotFoundException("User not found");
        return owner;
    }

    @Transactional
    public BusinessOwner loadBusinessOwnerById(Long id){
        BusinessOwner owner = ownerRepo.getById(id);
        if(owner == null) new UsernameNotFoundException("User not found");
        return owner;
    }
}
