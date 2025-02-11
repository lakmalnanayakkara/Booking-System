package com.AppointmentsBookingSystem.backend.controller;

import com.AppointmentsBookingSystem.backend.dto.StandardResponse;
import com.AppointmentsBookingSystem.backend.dto.request.UserRegisterDTO;
import com.AppointmentsBookingSystem.backend.dto.request.UserSignInDTO;
import com.AppointmentsBookingSystem.backend.dto.response.UserRegisterResponseDTO;
import com.AppointmentsBookingSystem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/sign-up")
    public ResponseEntity<StandardResponse> signUpUser(@RequestBody UserRegisterDTO userRegisterDTO){
        UserRegisterResponseDTO userRegisterResponseDTO = userService.signUpUser(userRegisterDTO);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",userRegisterResponseDTO),
                HttpStatus.OK
        );
        return response;
    }

    @PostMapping(path = "/sign-in")
    public ResponseEntity<StandardResponse> signInUser(@RequestBody UserSignInDTO userSignInDTO){
        UserRegisterResponseDTO signInDTO = userService.signInUser(userSignInDTO);
        ResponseEntity<StandardResponse> response = new ResponseEntity<>(
                new StandardResponse(201,"SUCCESSFUL",signInDTO),
                HttpStatus.OK
        );
        return response;
    }

//    @GetMapping("/login-user")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
//    public String loginUser(){
//        return "Only for users";
//    }
//
//    @GetMapping("/login-admin")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public String loginAdmin(){
//        return "Only for admins";
//    }
}
