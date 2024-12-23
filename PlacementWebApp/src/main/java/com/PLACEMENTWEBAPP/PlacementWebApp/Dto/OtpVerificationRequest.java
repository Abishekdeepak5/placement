package com.PLACEMENTWEBAPP.PlacementWebApp.Dto;

import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.Student;

public class OtpVerificationRequest {
    private Student student; // The student object
    private int otp; // The OTP

    // Getters and Setters
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
    public int getOtp() {
        return otp;
    }
    public void setOtp(int otp) {
        this.otp = otp;
    }
}

