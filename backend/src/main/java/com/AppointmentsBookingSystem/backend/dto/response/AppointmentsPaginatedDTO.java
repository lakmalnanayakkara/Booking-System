package com.AppointmentsBookingSystem.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentsPaginatedDTO {
    private List<BookAppointmentResponseDTO> appointments;
    private long total;
}
