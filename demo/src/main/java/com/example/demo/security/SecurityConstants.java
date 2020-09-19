package com.example.demo.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String OWNER_SIGN_UP_URLS = "/api/businessOwners/**";
    public static final String APPOINTMENT_URLS = "/api/appointment/**";
    public static final String APPOINTMENT_TASK_LIST_URLS = "/api/appointmentTaskList/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3000_000; //30 seconds

}
