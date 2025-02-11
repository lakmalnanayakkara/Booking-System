package com.AppointmentsBookingSystem.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegisterResponseDTO {
    private String username;
    private String role;
    private String jwtToken;
}
