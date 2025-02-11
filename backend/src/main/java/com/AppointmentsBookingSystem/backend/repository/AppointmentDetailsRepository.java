package com.AppointmentsBookingSystem.backend.repository;

import com.AppointmentsBookingSystem.backend.entity.AppointmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AppointmentDetailsRepository extends JpaRepository<AppointmentDetails,Integer> {
}
