package com.example.demo.services;

import com.example.demo.domain.*;
import com.example.demo.exceptions.AppointmentIdException;
import com.example.demo.exceptions.AppointmentNotFoundException;
import com.example.demo.repo.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
//import org.springframework.stereotype.Service;

@org.springframework.stereotype.Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private AppointmentTaskListRepo appointmentTaskListRepo;

    @Autowired
    private ServiceRepo serviceRepo;

    @Autowired
    private WorkerRepo workerRepo;

    @Autowired
    private UserRepo userRepo;

    public Appointment saveOrUpdateAppointment(Appointment appointment, String username){

        if(appointment.getId() != null) {
            Appointment existingAppointment = appointmentRepo.findByAppointmentIdentifier(appointment.getAppointmentIdentifier());

            if(existingAppointment != null &&(!existingAppointment.getAppointmentOwner().equals(username))){
                throw new AppointmentNotFoundException("Appointment not found in your account");
            } else if (existingAppointment == null) {
                throw new AppointmentNotFoundException("Appointment with ID '" + appointment.getAppointmentIdentifier() + "' cannot be updated because it doesn't exist");
            }
        }

        try{

            User user = userRepo.findByUsername(username);

            appointment.setUser(user);
            appointment.setAppointmentOwner(user.getUsername());

            String identifier = appointment.getAppointmentIdentifier().toUpperCase();
            appointment.setAppointmentIdentifier(identifier);

            if(appointment.getId() == null){
                AppointmentTaskList appointmentTaskList = new AppointmentTaskList();
                appointment.setAppointmentTaskList(appointmentTaskList);
                appointmentTaskList.setAppointment(appointment);
                appointmentTaskList.setAppointmentIdentifier(identifier);
            }

            if(appointment.getId() != null){
                appointment.setCreated_At(appointmentRepo.findByAppointmentIdentifier(identifier).getCreated_At());
                appointment.setAppointmentTaskList(appointmentTaskListRepo.findByAppointmentIdentifier(identifier));
            }

            if (appointment.getServiceIdentifier() != null) {
                Service s = serviceRepo.findByServiceIdentifier(appointment.getServiceIdentifier().toUpperCase());
                List<Appointment> tempAppos = s.getAppointments();
                tempAppos.add(appointment);
                s.setAppointments(tempAppos);
                appointment.setServiceIdentifier(appointment.getServiceIdentifier().toUpperCase());
                appointment.setService(s);
                appointment.setServiceName(s.getServiceName());
                serviceRepo.save(s);
            }

            if (appointment.getWorkerIdentifier() != null) {
                Worker w = workerRepo.findByWorkerIdentifier(appointment.getWorkerIdentifier());
                List<Appointment> tempAppos = w.getAppointments();
                tempAppos.add(appointment);
                w.setAppointments(tempAppos);
                appointment.setWorkerIdentifier(appointment.getWorkerIdentifier().toUpperCase());
                appointment.setWorker(w);
                appointment.setWorkerName(w.getWorkerName());
                workerRepo.save(w);
            }
            return appointmentRepo.save(appointment);

        } catch (Exception e) {
            throw new AppointmentIdException("Appointment ID '"
                    + appointment.getAppointmentIdentifier().toUpperCase()
                    + "' already exists");
        }
    }

    public Appointment findAppointmentByIdentifier(String appointmentId, String username){

        Appointment appointment = appointmentRepo.findByAppointmentIdentifier(appointmentId.toUpperCase());

        if(appointment == null){
            throw new AppointmentIdException("Appointment ID '" + appointmentId + "' does not exist");
        }

        if(!appointment.getAppointmentOwner().equals(username)){
            throw new AppointmentNotFoundException("Appointment not found in your account");
        }

        return appointment;
    }

    public Iterable<Appointment> findAllAppointment(String username){
        return appointmentRepo.findAllByAppointmentOwner(username);
    }

    public void deleteAppointmentByIdentifier(String appointmentId, String username){

        appointmentRepo.delete(findAppointmentByIdentifier(appointmentId, username));
    }




}
