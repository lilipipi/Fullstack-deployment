package com.example.demo.repo;

import com.example.demo.domain.AppointmentTaskList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentTaskListRepo extends CrudRepository<AppointmentTaskList, Long> {

    AppointmentTaskList findByAppointmentIdentifier(String identifier);
}
