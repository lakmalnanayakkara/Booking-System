package com.AppointmentsBookingSystem.backend.repository;

import com.AppointmentsBookingSystem.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<User, Integer> {
    User findUserByUsername(String username);
}
