package com.example.demo.validator;

import com.example.demo.domain.BusinessOwner;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BusinessOwnerValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return BusinessOwner.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {

        BusinessOwner owner = (BusinessOwner) o;

        if(owner.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }

        if(!owner.getPassword().equals(owner.getConfirmPassword())){
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }

    }
}
