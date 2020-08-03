package com.example.demo.services;

import com.example.demo.domain.Project;
import com.example.demo.exceptions.ProjectIdException;
import com.example.demo.repo.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    public Project saveOrUpdateProject(Project project){
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepo.save(project);

        } catch (Exception e) {
            throw new ProjectIdException("Project ID '"
                    + project.getProjectIdentifier().toUpperCase()
                    + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId){

        Project project = projectRepo.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project ID '"
                    + projectId
                    + "' does not exist");
        }

        return project;
    }

    public Iterable<Project> findAllProject(){
        return projectRepo.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepo.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null){
            throw new ProjectIdException("Project ID '" + projectId + "' not found");
        }

        projectRepo.delete(project);
    }
}
