package com.example.demo.web;

import com.example.demo.domain.BusinessOwner;
import com.example.demo.payload.JWTLoginSuccessResponse;
import com.example.demo.payload.LoginRequest;
import com.example.demo.security.JwtTokenProvider;
import com.example.demo.services.BusinessOwnerService;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.validator.BusinessOwnerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.example.demo.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/businessOwners")
@CrossOrigin
public class BusinessOwnerController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BusinessOwnerService businessOwnerService;

    @Autowired
    private BusinessOwnerValidator businessOwnerValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateOwner(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateBusinessOwnerToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerOwner(@Valid @RequestBody BusinessOwner owner, BindingResult result){
        // Validate passwords match
        businessOwnerValidator.validate(owner, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        BusinessOwner newOwner = businessOwnerService.saveBusinessOwner(owner);

        return new ResponseEntity<BusinessOwner>(newOwner, HttpStatus.CREATED);
    }
}
