package com.AppointmentsBookingSystem.backend.advisor;

import com.AppointmentsBookingSystem.backend.dto.StandardResponse;
import com.AppointmentsBookingSystem.backend.exception.BadCredentialsException;
import com.AppointmentsBookingSystem.backend.exception.NotFoundException;
import com.AppointmentsBookingSystem.backend.exception.RegisterFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StandardResponse> handleNotFoundException(Exception ex){
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(404,"NOT_FOUND", ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
        return response;
    }

    @ExceptionHandler(RegisterFailedException.class)
    public ResponseEntity<StandardResponse> handleRegisterFailedException(Exception ex){
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(500,"FAILED",ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
        return response;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardResponse> handleBadCredentialsException(Exception ex){
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(400,"BAD_REQUEST",ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
        return response;
    }
}
