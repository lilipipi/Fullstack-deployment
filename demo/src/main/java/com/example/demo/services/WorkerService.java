package com.example.demo.services;

import com.example.demo.domain.Appointment;
import com.example.demo.domain.BusinessOwner;
import com.example.demo.domain.Service;
import com.example.demo.domain.Worker;
import com.example.demo.repo.AppointmentRepo;
import com.example.demo.repo.BusinessOwnerRepo;
import com.example.demo.repo.ServiceRepo;
import com.example.demo.repo.WorkerRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@org.springframework.stereotype.Service
public class WorkerService {

    @Autowired
    private WorkerRepo workerRepo;

    @Autowired
    private BusinessOwnerRepo businessOwnerRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private ServiceRepo serviceRepo;

    public Worker saveOrUpdateWorker(Worker worker, String username) {
        BusinessOwner owner = businessOwnerRepo.findByUsername(username);

        worker.setBusinessOwner(owner);
        worker.setOwnerName(owner.getUsername());

        String identifier = worker.getWorkerIdentifier().toUpperCase();
        worker.setWorkerIdentifier(identifier);

        List<Appointment> temp = new ArrayList<>();
        if(worker.getAppointments().size() > 0) {
            for(Appointment a : worker.getAppointments()) {
                Appointment tempAppo = appointmentRepo.findByAppointmentIdentifier(a.getAppointmentIdentifier());
                tempAppo.setWorkerName(worker.getWorkerIdentifier());
                tempAppo.setWorkerIdentifier(identifier);
                appointmentRepo.save(tempAppo);
                temp.add(tempAppo);
            }
        }
        worker.setAppointments(temp);

        if (worker.getServiceIdentifier() != null) {
            Service s = serviceRepo.findByServiceIdentifier(worker.getServiceIdentifier());
            worker.setServiceName(s.getServiceName());
        }

        workerRepo.save(worker);

        for (Appointment a : worker.getAppointments()) {
            a.setWorker(workerRepo.findByWorkerIdentifier(identifier));
            appointmentRepo.save(a);
        }

        return workerRepo.findByWorkerIdentifier(identifier);
    }

    public Worker findWorkerByIdentifier (String workerId, String username) {
        Worker worker = workerRepo.findByWorkerIdentifier(workerId.toUpperCase());
        if(!worker.getOwnerName().equals(username)) {
            return null;
        }

        return workerRepo.findByWorkerIdentifier(workerId.toUpperCase());
    }

    public Iterable<Worker> findAllWorker(String username) {
        return workerRepo.findAllByOwnerName(username);
    }
    public Iterable<Worker> findAll() {
        return workerRepo.findAll();
    }
    public void deleteWorkerByIdentifier(String workerId, String username) {
        Worker w = workerRepo.findByWorkerIdentifier(workerId);
        for(Appointment a : w.getAppointments()) {
            a.setWorkerName(null);
            a.setWorker(null);
            appointmentRepo.save(a);
        }
        workerRepo.delete(findWorkerByIdentifier(workerId, username));
    }
}
