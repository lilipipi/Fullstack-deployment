package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.AppointmentTaskList;
import com.example.demo.domain.User;
import com.example.demo.exceptions.AppointmentIdException;
import com.example.demo.exceptions.AppointmentNotFoundException;
import com.example.demo.repo.AppointmentTaskListRepo;
import com.example.demo.repo.AppointmentRepo;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private AppointmentTaskListRepo appointmentTaskListRepo;

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
