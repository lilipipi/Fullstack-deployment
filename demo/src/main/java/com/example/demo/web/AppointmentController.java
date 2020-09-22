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
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewAppointment(@Valid @RequestBody Appointment appointment, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        Appointment appointment1 = appointmentService.saveOrUpdateAppointment(appointment, principal.getName());
        return new ResponseEntity<Appointment>(appointment1, HttpStatus.CREATED);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable String appointmentId, Principal principal) {
        Appointment appointment = appointmentService.findAppointmentByIdentifier(appointmentId, principal.getName());
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Appointment> getAllAppointments(Principal principal) {
        return appointmentService.findAllAppointment(principal.getName());
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String appointmentId, Principal principal) {
        appointmentService.deleteAppointmentByIdentifier(appointmentId, principal.getName());

        return new ResponseEntity<String>("Appointment with ID '" + appointmentId + "' deleted successfully", HttpStatus.OK);
    }
}
