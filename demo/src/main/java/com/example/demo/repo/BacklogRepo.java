package com.example.demo.repo;

import com.example.demo.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepo extends CrudRepository<Backlog, Long> {

    Backlog findByProjectIdentifier(String identifier);
}
