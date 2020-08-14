//package com.example.demo.web;
//
//import com.example.demo.domain.User;
//import com.example.demo.payload.LoginRequest;
//import com.example.demo.security.SecurityConstants;
//import io.restassured.builder.RequestSpecBuilder;
//import io.restassured.filter.log.LogDetail;
//import io.restassured.filter.log.RequestLoggingFilter;
//import io.restassured.filter.log.ResponseLoggingFilter;
//import io.restassured.specification.RequestSpecification;
//import org.junit.BeforeClass;
//import org.junit.jupiter.api.BeforeEach;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
//import org.testng.annotations.Test;
//
//import static io.restassured.RestAssured.given;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//public class UserControllerTest2 extends AbstractTestNGSpringContextTests {
//    private RequestSpecification specification;
//
//    @Test
//    public void authenticateUser() {
//        specification =
//                new RequestSpecBuilder()
//                        .setBasePath("/api/users/login")
//                        .setPort(8080)
//                        .addFilter(new RequestLoggingFilter(LogDetail.ALL))
//                        .addFilter(new ResponseLoggingFilter(LogDetail.ALL))
//                        .build();
//
//        LoginRequest loginRequest = new LoginRequest();
//        loginRequest.setUsername("testUser@email.com");
//        loginRequest.setPassword("password");
//
//        assertEquals(200, given().spec(specification).contentType("application/json").body(loginRequest).when().post().statusCode());
//    }
//    @Test
//    public void registerUser() {
//        specification =
//                new RequestSpecBuilder()
//                        .setBasePath("/api/users/register")
//                        .setPort(8080)
//                        .addFilter(new RequestLoggingFilter(LogDetail.ALL))
//                        .addFilter(new ResponseLoggingFilter(LogDetail.ALL))
//                        .build();
//
//        User user = new User();
//        user.setUsername("testUser@email.com");
//        user.setPassword("password");
//        user.setConfirmPassword("password");
//        assertEquals(201, given().spec(specification).contentType("application/json").body(user).when().post().statusCode());
//    }
//}