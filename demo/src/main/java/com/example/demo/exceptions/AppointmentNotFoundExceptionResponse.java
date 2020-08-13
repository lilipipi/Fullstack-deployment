package com.example.demo.exceptions;

public class AppointmentNotFoundExceptionResponse {
    private String AppointmentNotFound;

    public AppointmentNotFoundExceptionResponse(String appointmentNotFound) {
        AppointmentNotFound = appointmentNotFound;
    }

    public String getAppointmentNotFound() {
        return AppointmentNotFound;
    }

    public void setAppointmentNotFound(String appointmentNotFound) {
        AppointmentNotFound = appointmentNotFound;
    }
}
