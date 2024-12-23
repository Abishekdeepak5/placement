package com.PLACEMENTWEBAPP.PlacementWebApp.Dto;

import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.Student;

public class ResponseDto {
    private Student student;
    private String accessToken;
    private String refreshToken;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
