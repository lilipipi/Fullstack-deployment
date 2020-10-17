package com.example.demo.repo;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.Service;
import com.example.demo.domain.Worker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepo extends CrudRepository<Worker, Long> {

    Worker findByWorkerIdentifier(String serviceIdentifier);

    Iterable<Worker> findAllByOwnerName(String username);
}
