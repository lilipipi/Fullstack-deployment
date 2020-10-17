package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.AppointmentTaskList;
import com.example.demo.domain.AppointmentTask;
import com.example.demo.exceptions.AppointmentNotFoundException;
import com.example.demo.repo.AppointmentTaskListRepo;
import com.example.demo.repo.AppointmentRepo;
import com.example.demo.repo.AppointmentTaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentTaskService {

    @Autowired
    private AppointmentTaskListRepo appointmentTaskListRepo;

    @Autowired
    private AppointmentTaskRepo appointmentTaskRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private AppointmentService appointmentService;

    public AppointmentTask addAppointmentTask(String appointmentIdentifier, AppointmentTask appointmentTask, String username){
        //Exception: appointment not found

            //task is to be added to a specific appointment, appointment != null, appointmentTaskList is not null
            AppointmentTaskList appointmentTaskList = appointmentService.findAppointmentByIdentifier(appointmentIdentifier, username).getAppointmentTaskList();  //appointmentTaskListRepo.findByAppointmentIdentifier(appointmentIdentifier);

            // set the appointmentTaskList to appointment task
            appointmentTask.setAppointmentTaskList(appointmentTaskList);

            // we want our appointment sequence to be like this: IDPRO-1, IDPRO-2 ... 100 101
            Integer appointmentTaskListSequence = appointmentTaskList.getATSequence();

            //Update the BL sequence
            appointmentTaskListSequence++;
            appointmentTaskList.setATSequence(appointmentTaskListSequence);

            //Add sequence to appointment task
            appointmentTask.setAppointmentSequence(appointmentIdentifier+"-"+appointmentTaskListSequence);
            appointmentTask.setAppointmentIdentifier(appointmentIdentifier);

            // Initial priority when priority null
            if(appointmentTask.getPriority() == null){
                appointmentTask.setPriority(3);
            } else if (appointmentTask.getPriority() == 0) {
                appointmentTask.setPriority(3);
            }
            //Initial appointment task status is null
            if(appointmentTask.getStatus() == null){
                appointmentTask.setStatus("TO_DO");
            }else if (appointmentTask.getStatus().equals("")){
                appointmentTask.setStatus("TO_DO");
            }
            return appointmentTaskRepo.save(appointmentTask);
    }

    public Iterable<AppointmentTask>findAppointmentTaskListById(String id, String username){

        appointmentService.findAppointmentByIdentifier(id, username);
        return appointmentTaskRepo.findByAppointmentIdentifierOrderByPriority(id);
    }

    public AppointmentTask findTaskByAppointmentSequence(String appointmentTaskList_id, String task_id, String username){

        appointmentService.findAppointmentByIdentifier(appointmentTaskList_id, username);

        AppointmentTask appointmentTask = appointmentTaskRepo.findByAppointmentSequence(task_id);
        if(appointmentTask == null){
            throw new AppointmentNotFoundException("Appointment task with '" + task_id + "'not found");
        }

        if(!appointmentTask.getAppointmentIdentifier().equals(appointmentTaskList_id)){
            throw new AppointmentNotFoundException("Appointment task with '" + task_id + "' does not exist in current appointment");
        }

        return appointmentTask;
    }

    public AppointmentTask updateByAppointmentSequence(AppointmentTask updatedTask, String appointmentTaskList_id, String task_id, String username){
        AppointmentTask appointmentTask = findTaskByAppointmentSequence(appointmentTaskList_id, task_id, username);

        appointmentTask = updatedTask;

        return appointmentTaskRepo.save(appointmentTask);
    }

    public AppointmentTask deleteTaskByAppointmentSequence(String appointmentTaskList_id, String task_id, String username){
        AppointmentTask appointmentTask = findTaskByAppointmentSequence(appointmentTaskList_id, task_id, username);
        appointmentTaskRepo.delete(appointmentTask);
        return appointmentTask;
    }

}
