package com.PLACEMENTWEBAPP.PlacementWebApp.Dto;

public class LoginDto {
    private Long RegisterNumber;
    private String password;

    public Long getRegisterNumber() {
        return RegisterNumber;
    }
    public void setRegisterNumber(Long registerNumber) {
        RegisterNumber = registerNumber;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
