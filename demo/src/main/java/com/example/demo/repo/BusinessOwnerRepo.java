package com.example.demo.repo;

import com.example.demo.domain.BusinessOwner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessOwnerRepo extends CrudRepository<BusinessOwner, Long> {
    BusinessOwner findByUsername(String username);
    BusinessOwner getById(Long id);
}
