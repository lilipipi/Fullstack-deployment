package com.example.demo.web;

import com.example.demo.domain.User;
import com.example.demo.payload.LoginRequest;
import com.example.demo.security.SecurityConstants;
import com.example.demo.services.UserService;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.specification.RequestSpecification;
import org.assertj.core.api.SoftAssertions;
import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;

import java.util.Arrays;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

class UserControllerTest extends AbstractTestNGSpringContextTests {
    private RequestSpecification specification = new RequestSpecBuilder()
            .setBasePath("/api/users/register")
            .setPort(8080)
            .addFilter(new RequestLoggingFilter(LogDetail.ALL))
            .addFilter(new ResponseLoggingFilter(LogDetail.ALL))
            .build();

    @Autowired
    private UserService userService;


    @Test
    void authenticateUser() {
        specification =
                new RequestSpecBuilder()
                        .setBasePath("/api/users/login")
                        .setPort(8080)
                        .addFilter(new RequestLoggingFilter(LogDetail.ALL))
                        .addFilter(new ResponseLoggingFilter(LogDetail.ALL))
                        .build();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testUser@email.com");
        loginRequest.setPassword("password");

        assertEquals(200, given().spec(specification).contentType("application/json").body(loginRequest).when().post().statusCode());
    }

    @Test
    void registerUser() {
        User user = new User();
        user.setUsername("testUser@email.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        given().spec(specification).contentType("application/json").body(user).when().post().then().assertThat().statusCode(201);
    }

    @Test
    void getUserById() {
    }

    @Test
    void testAuthenticateUser() {
    }

    @Test
    void testRegisterUser() {
    }

    @Test
    void deleteAppointment() {
    }
}