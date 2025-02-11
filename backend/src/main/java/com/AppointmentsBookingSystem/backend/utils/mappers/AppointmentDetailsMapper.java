package com.AppointmentsBookingSystem.backend.utils.mappers;

import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;
import com.AppointmentsBookingSystem.backend.entity.AppointmentDetails;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AppointmentDetailsMapper {
    AppointmentDetails bookAppointmentDTOTOAppointmentDetails(BookAppointmentDTO bookAppointmentDTO);
    BookAppointmentResponseDTO appointmentDetailsToBookAppointmentResponseDTO(AppointmentDetails appointmentDetails);
    List<BookAppointmentResponseDTO> pageableAppointmentDetailsToBookAppointmentResponseDTOList(Page<AppointmentDetails> appointmentDetailsPage);
}
