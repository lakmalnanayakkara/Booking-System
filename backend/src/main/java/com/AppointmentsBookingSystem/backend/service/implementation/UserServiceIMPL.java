package com.AppointmentsBookingSystem.backend.service.implementation;

import com.AppointmentsBookingSystem.backend.dto.request.UserRegisterDTO;
import com.AppointmentsBookingSystem.backend.dto.request.UserSignInDTO;
import com.AppointmentsBookingSystem.backend.dto.response.UserRegisterResponseDTO;
import com.AppointmentsBookingSystem.backend.entity.User;
import com.AppointmentsBookingSystem.backend.exception.NotFoundException;
import com.AppointmentsBookingSystem.backend.exception.RegisterFailedException;
import com.AppointmentsBookingSystem.backend.repository.UserRepo;
import com.AppointmentsBookingSystem.backend.service.UserService;
import com.AppointmentsBookingSystem.backend.utils.JwtUtil;
import com.AppointmentsBookingSystem.backend.utils.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceIMPL implements UserService, UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserRegisterResponseDTO signUpUser(UserRegisterDTO userRegisterDTO) {
        User user = userRepo.findUserByUsername(userRegisterDTO.getUsername());
        if (user == null) {
            String hashedPassword = passwordEncoder.encode(userRegisterDTO.getPassword());
            userRegisterDTO.setPassword(hashedPassword);
            //userRegisterDTO.setRole("ROLE_"+userRegisterDTO.getRole().toUpperCase());
            User newUser = userMapper.userRegisterDTOToUser(userRegisterDTO);
            userRepo.save(newUser);

            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            UserRegisterResponseDTO responseDTO = new UserRegisterResponseDTO(
                    newUser.getUsername(),
                    newUser.getRole(),
                    token
            );
            return responseDTO;
        }else{
            throw new RegisterFailedException("User already exists");
        }
    }

    @Override
    public UserRegisterResponseDTO signInUser(UserSignInDTO userSignInDTO) {
        String username = userSignInDTO.getUsername();
        String password = userSignInDTO.getPassword();

        authenticate(username,password);
        UserDetails userDetails = loadUserByUsername(username);
        String token = jwtUtil.generateToken(userDetails);
        User user = userRepo.findUserByUsername(username);
        UserRegisterResponseDTO userSignResponseInDTO = new UserRegisterResponseDTO(
                user.getUsername(),
                user.getRole(),
                token
        );

        return userSignResponseInDTO;
    }

    private void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch (Exception e){
            throw new RegisterFailedException(e.getMessage());
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findUserByUsername(username);
        if(user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    getAuthorities(user)
            );
        }else {
            throw new NotFoundException("Username Not Found");
        }
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+user.getRole().toUpperCase()));
        return authorities;
    }
}
