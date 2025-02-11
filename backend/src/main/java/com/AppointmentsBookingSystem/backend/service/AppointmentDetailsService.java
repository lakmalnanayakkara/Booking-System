package com.AppointmentsBookingSystem.backend.service;

import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.AppointmentsPaginatedDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;

public interface AppointmentDetailsService {
    BookAppointmentResponseDTO bookAnAppointment(BookAppointmentDTO bookAppointmentDTO);

    BookAppointmentResponseDTO updateAnAppointment(BookAppointmentDTO bookAppointmentDTO, int appointmentID);

    BookAppointmentResponseDTO deleteAnAppointment(int appointmentID);

    AppointmentsPaginatedDTO getAllAppointments(int pageNumber);
}
