package com.example.demo.web;

import com.example.demo.domain.Appointment;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewAppointment(@Valid @RequestBody Appointment appointment, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        Appointment appointment1 = appointmentService.saveOrUpdateAppointment(appointment);
        return new ResponseEntity<Appointment>(appointment1, HttpStatus.CREATED);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable String appointmentId) {

        Appointment appointment = appointmentService.findAppointmentByIdentifier(appointmentId);

        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Appointment> getAllAppointments() {
        return appointmentService.findAllAppointment();
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String appointmentId) {
        appointmentService.deleteAppointmentByIdentifier(appointmentId);

        return new ResponseEntity<String>("Appointment with ID '" + appointmentId + "' deleted successfully", HttpStatus.OK);
    }
}
