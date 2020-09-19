package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class AppointmentTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false, unique = true)
    private String appointmentSequence;
    @NotBlank(message="please include an appointment summary")
    private String summary;
    private String status;
    private Integer priority;

    //task Many - 1 appointmentTaskList
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appointmentTaskList_id", updatable = false, nullable = false)
    @JsonIgnore
    private AppointmentTaskList appointmentTaskList;

    @Column(updatable = false)
    private String appointmentIdentifier;

    //Not updating these
    private Date create_At;
    private Date update_At;

    public AppointmentTask() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppointmentSequence() {
        return appointmentSequence;
    }

    public void setAppointmentSequence(String appointmentSequence) {
        this.appointmentSequence = appointmentSequence;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getAppointmentIdentifier() {
        return appointmentIdentifier;
    }

    public void setAppointmentIdentifier(String appointmentIdentifier) {
        this.appointmentIdentifier = appointmentIdentifier;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    public AppointmentTaskList getAppointmentTaskList() {
        return appointmentTaskList;
    }

    public void setAppointmentTaskList(AppointmentTaskList appointmentTaskList) {
        this.appointmentTaskList = appointmentTaskList;
    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    @Override
    public String toString() {
        return "AppointmentTask{" +
                "id=" + id +
                ", appointmentSequence='" + appointmentSequence + '\'' +
                ", summary='" + summary + '\'' +
                ", status='" + status + '\'' +
                ", priority=" + priority +
                ", appointmentTaskList=" + appointmentTaskList +
                ", appointmentIdentifier='" + appointmentIdentifier + '\'' +
                ", create_At=" + create_At +
                ", update_At=" + update_At +
                '}';
    }
}
