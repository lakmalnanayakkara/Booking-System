package com.AppointmentsBookingSystem.backend.controller;

import com.AppointmentsBookingSystem.backend.dto.StandardResponse;
import com.AppointmentsBookingSystem.backend.dto.request.BookAppointmentDTO;
import com.AppointmentsBookingSystem.backend.dto.response.AppointmentsPaginatedDTO;
import com.AppointmentsBookingSystem.backend.dto.response.BookAppointmentResponseDTO;
import com.AppointmentsBookingSystem.backend.service.AppointmentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/appointment")
public class AppointmentDetailsController {
    @Autowired
    private AppointmentDetailsService appointmentDetailsService;

    @PostMapping(path = "/book-an-appointment")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
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

    @DeleteMapping(path = "/delete-an_appointment", params = "id")
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
}
