package com.example.demo.services;

import com.example.demo.domain.User;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.exceptions.UsernameAlreadyExistsException;
import com.example.demo.repo.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;


@DataJpaTest
@ExtendWith(SpringExtension.class)
@TestPropertySource(locations="classpath:test.properties")
class UserServiceTest {

    @TestConfiguration
    static class UserServiceImplTest {
        @Bean
        public UserService userService(){
            return new UserService();
        }

        @Bean
        public CustomUserDetailsService customUserDetailsService(){
            return new CustomUserDetailsService();
        }
    }

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepo userRepo;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private User user;
    private User repeatedUser;

    @BeforeEach
    public void setup(){
        user = new User();
        user.setId(1L);
        user.setUsername("admin");
        user.setPassword("password");
        user.setConfirmPassword("password");

        Mockito.when(userRepo.findByUsername(user.getUsername())).thenReturn(user);
        Mockito.when(userRepo.getById(user.getId())).thenReturn(user);
        Mockito.when(userRepo.save(user)).thenReturn(user);

        repeatedUser = new User();
        repeatedUser.setId(1L);
        repeatedUser.setUsername("admin");
        repeatedUser.setPassword("password");
        repeatedUser.setConfirmPassword("password");
        Mockito.when(userRepo.save(repeatedUser))
                .thenThrow(new UsernameAlreadyExistsException(repeatedUser.getUsername()));


    }

    @Test
    void saveUser() {
        User newUser = userService.saveUser(user);
        assertThat(newUser.getUsername().equals(user.getUsername()));
    }

    @Test
    void saveRepeatedUser(){
        Exception exception = assertThrows(UsernameAlreadyExistsException.class, () -> {
            userService.saveUser(repeatedUser);
        });
        String expectedMessage = "Username 'admin' already exists";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void findUserById() {
        // given
        Long userId = 1L;
        // when
        User found = userService.findUserById(userId);
        // then
        assertThat(found.getId().equals(userId));
    }

    @Test
    void findUnknownUser(){
        User nullUser = new User();

        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            userService.findUserById(nullUser.getId());
        });
        String expectedMessage = "User not found";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void deleteUserById() {
        User user2 = new User();
        user2.setId(2L);
        user2.setUsername("admin");
        user2.setPassword("password");
        user2.setConfirmPassword("password");

        Mockito.when(userRepo.save(user2)).thenReturn(user2);
        user2 = userRepo.save(user2);
        Mockito.when(userRepo.getById(user2.getId())).thenReturn(user2);
        User removedUser = userService.deleteUserById(2L);

        Mockito.verify(userRepo, Mockito.times(1)).delete(user2);
        assertThat(removedUser.getUsername().equals(user2.getUsername()));
    }

    @Test
    void deleteNullUser() {
        User nullUser = new User();

        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUserById(nullUser.getId());
        });
        String expectedMessage = "User not found";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void loadUserByUsername() {
        UserDetails newUser = customUserDetailsService.loadUserByUsername("admin");
        assertThat(newUser.getUsername().equals(user.getUsername()));
    }

    @Test
    void loadUserById() {
        UserDetails newUser = customUserDetailsService.loadUserById(1L);
        assertThat(newUser.getUsername().equals(user.getUsername()));
    }
}