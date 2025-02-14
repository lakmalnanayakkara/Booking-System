package com.AppointmentsBookingSystem.backend.service;

import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.AppointmentsPaginatedDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;
import com.AppointmentsBookingSystem.backend.dto.response.GetTimeSlotDTO;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentDetailsService {
    BookAppointmentResponseDTO bookAnAppointment(BookAppointmentDTO bookAppointmentDTO);

    BookAppointmentResponseDTO updateAnAppointment(BookAppointmentDTO bookAppointmentDTO, int appointmentID);

    AppointmentsPaginatedDTO getAllAppointments(int pageNumber);

    AppointmentsPaginatedDTO getAllAppointmentsOfParticularUser(String userName, int pageNumber);

    BookAppointmentResponseDTO getAnAppointment(int appointmentID);

    List<GetTimeSlotDTO> getAllTimeSlotsForParticularDay(LocalDate appointmentDate);

    BookAppointmentResponseDTO anAppointmentDelete(int appointmentID);

    BookAppointmentResponseDTO deleteAnAppointment(int appointmentID);
}
