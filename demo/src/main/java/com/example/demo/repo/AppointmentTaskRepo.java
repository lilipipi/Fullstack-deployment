package com.example.demo.repo;

import com.example.demo.domain.AppointmentTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentTaskRepo extends CrudRepository<AppointmentTask, Long> {

    List<AppointmentTask> findByAppointmentIdentifierOrderByPriority(String id);

    AppointmentTask findByAppointmentSequence(String task_id);
}
