package com.AppointmentsBookingSystem.backend.service;

import com.AppointmentsBookingSystem.backend.dto.request.UserRegisterDTO;
import com.AppointmentsBookingSystem.backend.dto.request.UserSignInDTO;
import com.AppointmentsBookingSystem.backend.dto.response.UserRegisterResponseDTO;

public interface UserService {
    UserRegisterResponseDTO signUpUser(UserRegisterDTO userRegisterDTO);

    UserRegisterResponseDTO signInUser(UserSignInDTO userSignInDTO);
}
