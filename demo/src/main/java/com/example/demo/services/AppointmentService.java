package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.AppointmentTaskList;
import com.example.demo.exceptions.AppointmentIdException;
import com.example.demo.repo.AppointmentTaskListRepo;
import com.example.demo.repo.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private AppointmentTaskListRepo appointmentTaskListRepo;

    public Appointment saveOrUpdateAppointment(Appointment appointment){
        try{
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

    public Appointment findAppointmentByIdentifier(String appointmentId){

        Appointment appointment = appointmentRepo.findByAppointmentIdentifier(appointmentId.toUpperCase());

        if(appointment == null){
            throw new AppointmentIdException("Appointment ID '" + appointmentId + "' does not exist");
        }

        return appointment;
    }

    public Iterable<Appointment> findAllAppointment(){
        return appointmentRepo.findAll();
    }

    public void deleteAppointmentByIdentifier(String appointmentId){
        Appointment appointment = appointmentRepo.findByAppointmentIdentifier(appointmentId.toUpperCase());

        if (appointment == null){
            throw new AppointmentIdException("Appointment ID '" + appointmentId + "' not found");
        }

        appointmentRepo.delete(appointment);
    }




}
