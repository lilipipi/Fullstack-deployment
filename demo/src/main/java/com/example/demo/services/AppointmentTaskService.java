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

    public AppointmentTask addAppointmentTask(String appointmentIdentifier, AppointmentTask appointmentTask){
        //Exception: appointment not found
        try{
            //task is to be added to a specific appointment, appointment != null, appointmentTaskList is not null
            AppointmentTaskList appointmentTaskList = appointmentTaskListRepo.findByAppointmentIdentifier(appointmentIdentifier);

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
        }catch (Exception e){
            throw new AppointmentNotFoundException("Appointment not found");
        }
    }

    public Iterable<AppointmentTask>findAppointmentTaskListById(String id){

        Appointment appointment = appointmentRepo.findByAppointmentIdentifier(id);
        if(appointment == null){
            throw new AppointmentNotFoundException("Appointment with ID: '" + id + "' does not exist");
        }
        return appointmentTaskRepo.findByAppointmentIdentifierOrderByPriority(id);
    }

    public AppointmentTask findTaskByAppointmentSequence(String appointmentTaskList_id, String task_id){

        AppointmentTaskList appointmentTaskList = appointmentTaskListRepo.findByAppointmentIdentifier(appointmentTaskList_id);
        if(appointmentTaskList == null) {
            throw new AppointmentNotFoundException("Appointment with ID: '" + appointmentTaskList_id + "' does not exist");
        }

        AppointmentTask appointmentTask = appointmentTaskRepo.findByAppointmentSequence(task_id);
        if(appointmentTask == null){
            throw new AppointmentNotFoundException("Appointment task with '" + task_id + "'not found");
        }

        if(!appointmentTask.getAppointmentIdentifier().equals(appointmentTaskList_id)){
            throw new AppointmentNotFoundException("Appointment task with '" + task_id + "' does not exist in current appointment");
        }

        return appointmentTask;
    }

    public AppointmentTask updateByAppointmentSequence(AppointmentTask updatedTask, String appointmentTaskList_id, String task_id){
        AppointmentTask appointmentTask = findTaskByAppointmentSequence(appointmentTaskList_id, task_id);

        appointmentTask = updatedTask;

        return appointmentTaskRepo.save(appointmentTask);
    }

    public void deleteTaskByAppointmentSequence(String appointmentTaskList_id, String task_id){
        AppointmentTask appointmentTask = findTaskByAppointmentSequence(appointmentTaskList_id, task_id);

//        AppointmentTaskList appointmentTaskList = appointmentTask.getAppointmentTaskList();
//        List<AppointmentTask> tasks = appointmentTask.getAppointmentTaskList().getAppointmentTasks();
//        tasks.remove(appointmentTask);
//        appointmentTaskListRepo.save(appointmentTaskList);

        appointmentTaskRepo.delete(appointmentTask);
    }

}
