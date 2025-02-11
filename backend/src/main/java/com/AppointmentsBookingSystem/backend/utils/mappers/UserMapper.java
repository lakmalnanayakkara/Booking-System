package com.AppointmentsBookingSystem.backend.utils.mappers;

import com.AppointmentsBookingSystem.backend.dto.request.UserRegisterDTO;
import com.AppointmentsBookingSystem.backend.dto.request.UserSignInDTO;
import com.AppointmentsBookingSystem.backend.dto.response.UserRegisterResponseDTO;
import com.AppointmentsBookingSystem.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userRegisterDTOToUser(UserRegisterDTO userRegisterDTO);
}
