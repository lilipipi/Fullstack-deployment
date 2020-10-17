package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.BusinessOwner;
import com.example.demo.domain.Service;
import com.example.demo.repo.AppointmentRepo;
import com.example.demo.repo.BusinessOwnerRepo;
import com.example.demo.repo.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    private ServiceRepo serviceRepo;

    @Autowired
    private BusinessOwnerRepo businessOwnerRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    public Service saveOrUpdateService(Service service, String username) {

        BusinessOwner owner = businessOwnerRepo.findByUsername(username);

        service.setBusinessOwner(owner);
        service.setOwnerName(owner.getUsername());

        String identifier = service.getServiceIdentifier().toUpperCase();
        service.setServiceIdentifier(identifier);

        List<Appointment> temp = new ArrayList<>();
        if (service.getAppointments().size() > 0) {
            for (Appointment a : service.getAppointments()) {
                Appointment tempAppo = appointmentRepo.findByAppointmentIdentifier(a.getAppointmentIdentifier());
                tempAppo.setServiceName(service.getServiceIdentifier());
                tempAppo.setServiceIdentifier(identifier);
                appointmentRepo.save(tempAppo);
                temp.add(tempAppo);
            }
        }
        service.setAppointments(temp);

        serviceRepo.save(service);

        for (Appointment a : service.getAppointments()) {
            a.setService(serviceRepo.findByServiceIdentifier(identifier));
            appointmentRepo.save(a);
        }

        return serviceRepo.findByServiceIdentifier(identifier);
    }

    public Service findServiceByIdentifier(String serviceId, String username) {
        Service service = serviceRepo.findByServiceIdentifier(serviceId.toUpperCase());
        if(!service.getOwnerName().equals(username)) {
            return null;
        }
        return serviceRepo.findByServiceIdentifier(serviceId.toUpperCase());
    }

    public Iterable<Service> findAll() {return serviceRepo.findAll(); }

    public Iterable<Service> findAllService(String username) {
        return serviceRepo.findAllByOwnerName(username);
    }

    public void deleteServiceByIdentifier(String serviceId, String username) {
        Service s = serviceRepo.findByServiceIdentifier(serviceId);
        for (Appointment a : s.getAppointments()) {
            a.setServiceName(null);
            a.setService(null);
            appointmentRepo.save(a);
        }
        serviceRepo.delete(findServiceByIdentifier(serviceId, username));
    }
}
