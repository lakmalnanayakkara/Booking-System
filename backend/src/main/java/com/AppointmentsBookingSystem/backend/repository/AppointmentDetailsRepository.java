package com.AppointmentsBookingSystem.backend.repository;

import com.AppointmentsBookingSystem.backend.entity.AppointmentDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface AppointmentDetailsRepository extends JpaRepository<AppointmentDetails,Integer> {

    Page<AppointmentDetails> findAllByUsername(String username, Pageable pageable);

    long countAppointmentDetailsByUsername(String userName);

    List<AppointmentDetails> findAllByAppointmentDate(LocalDate appointmentDate);
}
