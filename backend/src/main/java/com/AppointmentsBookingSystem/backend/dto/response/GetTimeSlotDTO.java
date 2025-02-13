package com.AppointmentsBookingSystem.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetTimeSlotDTO {
    private LocalTime startingTime;
    private LocalTime endingTime;
}
