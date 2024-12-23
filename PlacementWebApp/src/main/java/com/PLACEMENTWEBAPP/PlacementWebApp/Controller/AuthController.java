package com.PLACEMENTWEBAPP.PlacementWebApp.Controller;

import com.PLACEMENTWEBAPP.PlacementWebApp.Dto.LoginDto;
import com.PLACEMENTWEBAPP.PlacementWebApp.Dto.OtpVerificationRequest;
import com.PLACEMENTWEBAPP.PlacementWebApp.Dto.ResponseDto;
import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.StudentDTO;
import com.PLACEMENTWEBAPP.PlacementWebApp.Service.AuthService;
import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Student student){
        System.out.println("Welcome to signup");
        try{
            authService.createNewStudent(student);
            return ResponseEntity.ok("otp sent to mail!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping("/signup/verify")
    public ResponseEntity<?>verifyOtp(@RequestBody OtpVerificationRequest otpVerificationRequest){

        System.out.println("Welcome to verifyOtp");
        try{
            Student student=otpVerificationRequest.getStudent();
            int otp= otpVerificationRequest.getOtp();
            authService.verifyOtp(otp, student);
            return ResponseEntity.ok("verified successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) throws Exception {
        System.out.println("Welcome to login page");
        try{
          return ResponseEntity.ok( authService.Login(loginDto));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error : " + e.getMessage());

        }

    }

}
