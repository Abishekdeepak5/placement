package com.PLACEMENTWEBAPP.PlacementWebApp.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long registerNumber;
    private Date dateOfBirth;
    private int age;
    private int batch;
    private String email;
    private String community;
    private String caste;
    private boolean hosteler;
}
