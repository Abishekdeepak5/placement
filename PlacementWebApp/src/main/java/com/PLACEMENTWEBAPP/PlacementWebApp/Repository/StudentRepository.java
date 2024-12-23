package com.PLACEMENTWEBAPP.PlacementWebApp.Repository;

import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    boolean existsByEmail(String email);
    boolean existsByRegisterNumber(Long registerNumber);

    Student findByRegisterNumber(Long registerNumber);
}
