package com.example.demo.repo;

import com.example.demo.domain.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepo extends CrudRepository<Appointment, Long> {

    Appointment findByAppointmentIdentifier(String AppointmentId);

    @Override
    Iterable<Appointment> findAll();

    Iterable<Appointment> findAllByAppointmentOwner(String username);
}
