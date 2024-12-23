package com.PLACEMENTWEBAPP.PlacementWebApp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="student")
@NoArgsConstructor
@AllArgsConstructor
public class Student implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @Column(unique = true)
    @NotNull
    private Long registerNumber;
    @NotNull
    private Date dateOfBirth;
    @NotNull
    private int age;
    @NotNull
    private int batch;
    @Column(unique = true)
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String community;
    @NotNull
    private String caste;
    @NotNull
    private boolean hosteler;
    private boolean verified;

    @Enumerated(EnumType.STRING)
    private Role role = Role.STUDENT;

    private int otp;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return roles or authorities; if no roles, return an empty list
        return List.of(() -> role.name());    }

    @Override
    public String getPassword() {
        return this.password; // Ensure your password field is mapped correctly
    }

    @Override
    public String getUsername() {
        return this.email; // Use email as the username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Modify based on your application's needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Modify based on your application's needs
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Modify based on your application's needs
    }

    @Override
    public boolean isEnabled() {
        return true; // Modify based on your application's needs
    }


    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getRegisterNumber() {
        return registerNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setBatch(int batch) {
        this.batch = batch;
    }
    public void setOtp(int otp){
        this.otp=otp;
    }
    public  int getOtp(){
        return this.otp;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}
