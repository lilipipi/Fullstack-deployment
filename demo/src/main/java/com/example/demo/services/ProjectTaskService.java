package com.example.demo.services;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.Project;
import com.example.demo.domain.ProjectTask;
import com.example.demo.exceptions.ProjectNotFoundException;
import com.example.demo.repo.BacklogRepo;
import com.example.demo.repo.ProjectRepo;
import com.example.demo.repo.ProjectTaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepo backlogRepo;

    @Autowired
    private ProjectTaskRepo projectTaskRepo;

    @Autowired
    private ProjectRepo projectRepo;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        //Exception: project not found
        try{
            //task is to be added to a specific project, project != null, backlog is not null
            Backlog backlog = backlogRepo.findByProjectIdentifier(projectIdentifier);

            // set the backlog to project task
            projectTask.setBacklog(backlog);

            // we want our project sequence to be like this: IDPRO-1, IDPRO-2 ... 100 101
            Integer backlogSequence = backlog.getPTSequence();

            //Update the BL sequence
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);

            //Add sequence to project task
            projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            // Initial priority when priority null
            if(projectTask.getPriority() == null){
                projectTask.setPriority(3);
            } else if (projectTask.getPriority() == 0) {
                projectTask.setPriority(3);
            }
            //Initial project task status is null
            if(projectTask.getStatus() == null){
                projectTask.setStatus("TO_DO");
            }else if (projectTask.getStatus().equals("")){
                projectTask.setStatus("TO_DO");
            }
            return projectTaskRepo.save(projectTask);
        }catch (Exception e){
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public Iterable<ProjectTask>findBacklogById(String id){

        Project project = projectRepo.findByProjectIdentifier(id);
        if(project == null){
            throw new ProjectNotFoundException("Project with ID: '" + id + "' does not exist");
        }
        return projectTaskRepo.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findTaskByProjectSequence(String backlog_id, String task_id){

        Backlog backlog = backlogRepo.findByProjectIdentifier(backlog_id);
        if(backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + backlog_id + "' does not exist");
        }

        ProjectTask projectTask = projectTaskRepo.findByProjectSequence(task_id);
        if(projectTask == null){
            throw new ProjectNotFoundException("Project task with '" + task_id + "'not found");
        }

        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project task with '" + task_id + "' does not exist in current project");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String task_id){
        ProjectTask projectTask = findTaskByProjectSequence(backlog_id, task_id);

        projectTask = updatedTask;

        return projectTaskRepo.save(projectTask);
    }

    public void deleteTaskByProjectSequence(String backlog_id, String task_id){
        ProjectTask projectTask = findTaskByProjectSequence(backlog_id, task_id);

//        Backlog backlog = projectTask.getBacklog();
//        List<ProjectTask> tasks = projectTask.getBacklog().getProjectTasks();
//        tasks.remove(projectTask);
//        backlogRepo.save(backlog);

        projectTaskRepo.delete(projectTask);
    }

}
