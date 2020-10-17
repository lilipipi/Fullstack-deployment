package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Worker Identifier is required")
    @Column(updatable = false, unique = true)
    private String workerIdentifier;
    @NotBlank(message = "Worker name is required")
    private String workerName;

    private String workerAge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private BusinessOwner businessOwner;

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "worker")
    private List<Appointment> appointments = new ArrayList<>();

    private String ownerName;

    private String serviceIdentifier;

    private String serviceName;

    public Worker() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkerIdentifier() {
        return workerIdentifier;
    }

    public void setWorkerIdentifier(String workerIdentifier) {
        this.workerIdentifier = workerIdentifier;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public String getWorkerAge() {
        return workerAge;
    }

    public void setWorkerAge(String workerAge) {
        this.workerAge = workerAge;
    }

    public BusinessOwner getBusinessOwner() {
        return businessOwner;
    }

    public void setBusinessOwner(BusinessOwner businessOwner) {
        this.businessOwner = businessOwner;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getServiceIdentifier() {
        return serviceIdentifier;
    }

    public void setServiceIdentifier(String serviceIdentifier) {
        this.serviceIdentifier = serviceIdentifier;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
}
