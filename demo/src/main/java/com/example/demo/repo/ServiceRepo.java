package com.example.demo.repo;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepo extends CrudRepository<Service, Long> {

    Service findByServiceIdentifier(String serviceIdentifier);

    Iterable<Service> findAllByOwnerName(String username);
}
