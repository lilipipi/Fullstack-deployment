package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class AppointmentTaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer ATSequence = 0;
    private String appointmentIdentifier;

    //AppointmentTaskList 1-1 with appointment
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="appointment_id", nullable = false)
    @JsonIgnore
    private Appointment appointment;

    //AppointmentTaskList 1-many appointment tasks
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "appointmentTaskList", orphanRemoval = true)
    private List<AppointmentTask> appointmentTasks = new ArrayList<>();


    public AppointmentTaskList() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getATSequence() {
        return ATSequence;
    }

    public void setATSequence(Integer ATSequence) {
        this.ATSequence = ATSequence;
    }

    public String getAppointmentIdentifier() {
        return appointmentIdentifier;
    }

    public void setAppointmentIdentifier(String appointmentIdentifier) {
        this.appointmentIdentifier = appointmentIdentifier;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public List<AppointmentTask> getAppointmentTasks() {
        return appointmentTasks;
    }

    public void setAppointmentTasks(List<AppointmentTask> appointmentTasks) {
        this.appointmentTasks = appointmentTasks;
    }
}
