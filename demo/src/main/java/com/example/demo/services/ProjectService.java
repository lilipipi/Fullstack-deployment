package com.example.demo.services;

import com.example.demo.domain.Project;
import com.example.demo.repo.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    public Project saveOrUpdateProject(Project project){

        //Logic

        return projectRepo.save(project);
    }
}
