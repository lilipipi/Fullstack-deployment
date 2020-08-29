package com.example.demo.web;

import com.example.demo.domain.AppointmentTask;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.services.AppointmentTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/appointmentTaskList")
@CrossOrigin
public class AppointmentTaskListController {

    @Autowired
    private AppointmentTaskService appointmentTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{appointmentTaskList_id}")
    public ResponseEntity<?> addPTtoAppointmentTaskList(@Valid @RequestBody AppointmentTask appointmentTask,
                                                        BindingResult result, @PathVariable String appointmentTaskList_id, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }

        AppointmentTask appointmentTask1 = appointmentTaskService.addAppointmentTask(appointmentTaskList_id, appointmentTask, principal.getName());

        return new ResponseEntity<AppointmentTask>(appointmentTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{appointmentTaskList_id}")
    public Iterable<AppointmentTask> getAppointmentAppointmentTaskList(@PathVariable String appointmentTaskList_id){
       return appointmentTaskService.findAppointmentTaskListById(appointmentTaskList_id);
    }

    @GetMapping("/{appointmentTaskList_id}/{task_id}")
    public ResponseEntity<?> getAppointmentTask(@PathVariable String appointmentTaskList_id, @PathVariable String task_id){
        AppointmentTask appointmentTask = appointmentTaskService.findTaskByAppointmentSequence(appointmentTaskList_id, task_id);
        return new ResponseEntity<AppointmentTask>(appointmentTask, HttpStatus.OK);
    }

    @PatchMapping("{appointmentTaskList_id}/{task_id}")
    public ResponseEntity<?> updateAppointmentTask(@Valid @RequestBody AppointmentTask appointmentTask, BindingResult result,
                                               @PathVariable String appointmentTaskList_id, @PathVariable String task_id){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }

        AppointmentTask updatedTask = appointmentTaskService.updateByAppointmentSequence(appointmentTask, appointmentTaskList_id, task_id);

        return new ResponseEntity<AppointmentTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("{appointmentTaskList_id}/{task_id}")
    public ResponseEntity<?> deleteAppointmentTask(@PathVariable String appointmentTaskList_id, @PathVariable String task_id){
        appointmentTaskService.deleteTaskByAppointmentSequence(appointmentTaskList_id, task_id);
        return new ResponseEntity<String>("Appointment task '" + task_id + "' was deleted sucessfully", HttpStatus.OK);
    }
}

