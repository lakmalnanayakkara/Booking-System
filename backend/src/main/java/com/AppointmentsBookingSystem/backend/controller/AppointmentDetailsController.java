package com.AppointmentsBookingSystem.backend.controller;

import com.AppointmentsBookingSystem.backend.dto.StandardResponse;
import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.AppointmentsPaginatedDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;
import com.AppointmentsBookingSystem.backend.dto.response.GetTimeSlotDTO;
import com.AppointmentsBookingSystem.backend.service.AppointmentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/appointment")
@CrossOrigin("http://localhost:3000")
public class AppointmentDetailsController {
    @Autowired
    private AppointmentDetailsService appointmentDetailsService;

    @PostMapping(path = "/book-an-appointment")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> bookAnAppointment(@RequestBody BookAppointmentDTO bookAppointmentDTO) {
        BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsService.bookAnAppointment(bookAppointmentDTO);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",bookAppointmentResponseDTO),
                HttpStatus.OK
        );
        return response;
    }

    @PutMapping(path = "/update-an-appointment",params = "id")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> updateAnAppointment(@RequestBody BookAppointmentDTO bookAppointmentDTO,@RequestParam(value = "id") int appointmentID) {
        BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsService.updateAnAppointment(bookAppointmentDTO,appointmentID);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(200,"SUCCESSFUL",bookAppointmentResponseDTO),
                HttpStatus.OK
        );
        return response;
    }

    @GetMapping(path = "/get-an-appointment",params = "id")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> getAnAppointment(@RequestParam(value = "id") int appointmentID) {
        BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsService.getAnAppointment(appointmentID);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(200,"SUCCESSFUL",bookAppointmentResponseDTO),
                HttpStatus.OK
        );
        return response;
    }

    @DeleteMapping(path = "/delete-an-appointment", params = "id")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> deleteAnAppointment(@RequestParam(value = "id") int appointmentID) {
        BookAppointmentResponseDTO bookAppointmentResponseDTO = appointmentDetailsService.deleteAnAppointment(appointmentID);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",bookAppointmentResponseDTO),
                HttpStatus.OK
        );
        return response;
    }

    @GetMapping(path = "/get-all-appointments",params = {"page"})
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<StandardResponse> getAllAppointments(@RequestParam(value = "page") int pageNumber) {
        AppointmentsPaginatedDTO appointmentsPaginatedDTO = appointmentDetailsService.getAllAppointments(pageNumber);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",appointmentsPaginatedDTO),
                HttpStatus.OK
        );
        return response;
    }

    @GetMapping(path = "/get-user-appointments",params = {"username","page"})
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> getAllAppointmentsOfParticularUser(
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "page") int pageNumber) {
        AppointmentsPaginatedDTO appointmentsPaginatedDTO = appointmentDetailsService.getAllAppointmentsOfParticularUser(userName,pageNumber);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",appointmentsPaginatedDTO),
                HttpStatus.OK
        );
        return response;
    }

    @GetMapping(path="/get-time-slots",params={"date"})
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<StandardResponse> getAllTimeSlotsForParticularDay(@RequestParam(value = "date") LocalDate appointmentDate){
        List<GetTimeSlotDTO> getTimeSlotDTOS = appointmentDetailsService.getAllTimeSlotsForParticularDay(appointmentDate);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESS",getTimeSlotDTOS),
                HttpStatus.OK
        );
        return response;
    }

}
