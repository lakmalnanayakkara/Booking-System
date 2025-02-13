package com.AppointmentsBookingSystem.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookAppointmentDTO {
    private String appointmentTitle;
    private String name;
    private String email;
    private String contactNumber;
    private LocalDate appointmentDate;
    private LocalTime startingTime;
    private LocalTime endingTime;
    private String meetingType;
    private String username;
}
