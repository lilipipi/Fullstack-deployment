package com.example.demo.exceptions;

public class AppointmentIdExceptionResponse {

    private String appointmentIdentifier;

    public AppointmentIdExceptionResponse(String appointmentIdentifier) {
        this.appointmentIdentifier = appointmentIdentifier;
    }

    public String getAppointmentIdentifier() {
        return appointmentIdentifier;
    }

    public void setAppointmentIdentifier(String appointmentIdentifier) {
        this.appointmentIdentifier = appointmentIdentifier;
    }
}
