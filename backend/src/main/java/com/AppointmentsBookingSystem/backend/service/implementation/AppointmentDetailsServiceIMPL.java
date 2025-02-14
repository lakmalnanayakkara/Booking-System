package com.AppointmentsBookingSystem.backend.service.implementation;

import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.AppointmentsPaginatedDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;
import com.AppointmentsBookingSystem.backend.dto.response.GetTimeSlotDTO;
import com.AppointmentsBookingSystem.backend.entity.AppointmentDetails;
import com.AppointmentsBookingSystem.backend.exception.NotFoundException;
import com.AppointmentsBookingSystem.backend.repository.AppointmentDetailsRepository;
import com.AppointmentsBookingSystem.backend.service.AppointmentDetailsService;
import com.AppointmentsBookingSystem.backend.utils.mappers.AppointmentDetailsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentDetailsServiceIMPL implements AppointmentDetailsService {
    @Autowired
    private AppointmentDetailsRepository appointmentDetailsRepository;

    @Autowired
    private AppointmentDetailsMapper appointmentDetailsMapper;

    @Override
    public BookAppointmentResponseDTO bookAnAppointment(BookAppointmentDTO bookAppointmentDTO) {
        AppointmentDetails appointmentDetails = appointmentDetailsMapper.bookAppointmentDTOTOAppointmentDetails(bookAppointmentDTO);
        appointmentDetailsRepository.save(appointmentDetails);
        BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsMapper.appointmentDetailsToBookAppointmentResponseDTO(appointmentDetails);
        return bookAppointmentResponseDTO;
    }

    @Override
    public BookAppointmentResponseDTO updateAnAppointment(BookAppointmentDTO bookAppointmentDTO, int appointmentID) {
        AppointmentDetails appointmentDetails = appointmentDetailsRepository.getReferenceById(appointmentID);
        if(appointmentDetails != null){
            appointmentDetails.setAppointmentTitle(bookAppointmentDTO.getAppointmentTitle());
            appointmentDetails.setName(bookAppointmentDTO.getName());
            appointmentDetails.setEmail(bookAppointmentDTO.getEmail());
            appointmentDetails.setContactNumber(bookAppointmentDTO.getContactNumber());
            appointmentDetails.setMeetingType(bookAppointmentDTO.getMeetingType());

            appointmentDetailsRepository.save(appointmentDetails);
            BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsMapper.appointmentDetailsToBookAppointmentResponseDTO(appointmentDetails);
            return bookAppointmentResponseDTO;
        }else {
            throw new NotFoundException("Appointment couldn't found.");
        }
    }

    @Override
    public BookAppointmentResponseDTO deleteAnAppointment(int appointmentID) {
        AppointmentDetails appointmentDetails = appointmentDetailsRepository.getReferenceById(appointmentID);
        if(appointmentDetails != null){
            appointmentDetailsRepository.delete(appointmentDetails);
            BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsMapper.appointmentDetailsToBookAppointmentResponseDTO(appointmentDetails);
            return bookAppointmentResponseDTO;
        }else {
            throw new NotFoundException("Appointment couldn't found.");
        }
    }

    @Override
    public AppointmentsPaginatedDTO getAllAppointments(int pageNumber) {
        Page<AppointmentDetails> appointmentDetails = appointmentDetailsRepository.findAll(PageRequest.of(pageNumber,5));
        long total = appointmentDetailsRepository.count();
        if(appointmentDetails.getSize()>0){
            List<BookAppointmentResponseDTO> bookAppointmentResponseDTOList = appointmentDetailsMapper.pageableAppointmentDetailsToBookAppointmentResponseDTOList(appointmentDetails);
            return new AppointmentsPaginatedDTO(bookAppointmentResponseDTOList, total);
        }else {
            throw new NotFoundException("Appointments couldn't found.");
        }

    }

    @Override
    public AppointmentsPaginatedDTO getAllAppointmentsOfParticularUser(String userName, int pageNumber) {
        Page<AppointmentDetails> appointmentDetails = appointmentDetailsRepository.findAllByUsername(userName,PageRequest.of(pageNumber,5));
        long total = appointmentDetailsRepository.countAppointmentDetailsByUsername(userName);
        if(total>0){
            List<BookAppointmentResponseDTO> bookAppointmentResponseDTOList = appointmentDetailsMapper.pageableAppointmentDetailsToBookAppointmentResponseDTOList(appointmentDetails);
            return new AppointmentsPaginatedDTO(bookAppointmentResponseDTOList, total);
        }else {
            throw new NotFoundException("Appointments couldn't found.");
        }
    }

    @Override
    public BookAppointmentResponseDTO getAnAppointment(int appointmentID) {
        AppointmentDetails appointmentDetails = appointmentDetailsRepository.getReferenceById(appointmentID);
        if(appointmentDetails != null){
            BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsMapper.appointmentDetailsToBookAppointmentResponseDTO(appointmentDetails);
            return bookAppointmentResponseDTO;
        }else {
            throw new NotFoundException("Appointment couldn't found.");
        }
    }

    @Override
    public List<GetTimeSlotDTO> getAllTimeSlotsForParticularDay(LocalDate appointmentDate) {
        List<AppointmentDetails> appointmentDetails = appointmentDetailsRepository.findAllByAppointmentDate(appointmentDate);
        List<GetTimeSlotDTO> getTimeSlotDTOList = new ArrayList<>();

        for(AppointmentDetails appointmentDetail : appointmentDetails){
            GetTimeSlotDTO getTimeSlotDTO = new GetTimeSlotDTO(
                    appointmentDetail.getStartingTime(),
                    appointmentDetail.getEndingTime()
            );
            getTimeSlotDTOList.add(getTimeSlotDTO);
        }
        return getTimeSlotDTOList;
    }

    @Override
    public BookAppointmentResponseDTO anAppointmentDelete(int appointmentID) {
        AppointmentDetails appointmentDetails = appointmentDetailsRepository.getReferenceById(appointmentID);
        if(appointmentDetails != null){
            appointmentDetailsRepository.delete(appointmentDetails);
            BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsMapper.appointmentDetailsToBookAppointmentResponseDTO(appointmentDetails);
            return bookAppointmentResponseDTO;
        }else {
            throw new NotFoundException("Appointment couldn't found.");
        }
    }
}
