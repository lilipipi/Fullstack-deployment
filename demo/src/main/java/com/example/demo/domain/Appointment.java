package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Appointment name is required")
    private String appointmentName;
    @NotBlank(message = "Appointment Identifier is required")
    @Size(min = 4, max = 5, message = "Please use 4 to 5 characters")
    @Column(updatable = false, unique = true)
    private String appointmentIdentifier;
    @NotBlank(message = "Appointment description is required")
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date appointmentDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updated_At;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "appointment")
    @JsonIgnore
    private AppointmentTaskList appointmentTaskList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String appointmentOwner;

    public Appointment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppointmentName() {
        return appointmentName;
    }

    public void setAppointmentName(String appointmentName) {
        this.appointmentName = appointmentName;
    }

    public String getAppointmentIdentifier() {
        return appointmentIdentifier;
    }

    public void setAppointmentIdentifier(String appointmentIdentifier) {
        this.appointmentIdentifier = appointmentIdentifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public AppointmentTaskList getAppointmentTaskList() {
        return appointmentTaskList;
    }

    public void setAppointmentTaskList(AppointmentTaskList appointmentTaskList) {
        this.appointmentTaskList = appointmentTaskList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAppointmentOwner() {
        return appointmentOwner;
    }

    public void setAppointmentOwner(String appointmentOwner) {
        this.appointmentOwner = appointmentOwner;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", appointmentName='" + appointmentName + '\'' +
                ", appointmentIdentifier='" + appointmentIdentifier + '\'' +
                ", description='" + description + '\'' +
                ", appointmentDate=" + appointmentDate +
                ", created_At=" + created_At +
                ", updated_At=" + updated_At +
                ", appointmentTaskList=" + appointmentTaskList +
                '}';
    }
}
