package com.AppointmentsBookingSystem.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentDetails {
    @Id
    @Column(name = "appointment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;

    @Column(name = "appointment_title", nullable = false)
    private String appointmentTitle;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "user_email", nullable = false)
    private String email;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "starting_time")
    private LocalTime startingTime;

    @Column(name = "ending_time")
    private LocalTime endingTime;

    @Column(name = "meeting_type", nullable = false)
    private String meetingType;

    @Column(name = "user_name", nullable = false)
    private String username;
}
