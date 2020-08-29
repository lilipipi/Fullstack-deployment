//package com.example.demo.services;
//
//import com.example.demo.domain.Appointment;
//import com.example.demo.exceptions.AppointmentIdException;
//import com.example.demo.repo.AppointmentRepo;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//@DataJpaTest
//@ExtendWith(SpringExtension.class)
//@TestPropertySource(locations="classpath:test.properties")
//class AppointmentServiceTest {
//
//    @TestConfiguration
//    static class AppointmentServiceImplTest {
//        @Bean
//        public AppointmentService appointmentService(){
//            return new AppointmentService();
//        }
//    }
//
//    @Autowired
//    private AppointmentService appointmentService;
//
//    @MockBean
//    private AppointmentRepo appointmentRepo;
//
//
//    @BeforeEach
//    public void setup(){
//        Appointment appo = new Appointment();
//        appo.setAppointmentIdentifier("TEST1");
//        appo.setAppointmentName("appointment 1");
//        appo.setDescription("Test");
//
//        Mockito.when(appointmentRepo.findByAppointmentIdentifier(appo.getAppointmentIdentifier())).thenReturn(appo);
//
//
//
//        Appointment appo0 = new Appointment();
//        appo0.setAppointmentIdentifier("TEST0");
//        appo0.setAppointmentName("appointment 0");
//        appo0.setDescription("Test0");
//        Mockito.when(appointmentRepo.findByAppointmentIdentifier(appo0.getAppointmentIdentifier())).thenReturn(appo0);
//    }
//
////    @Test
////    void saveAppointment() {
////        Appointment appo2 = new Appointment();
////        appo2.setAppointmentIdentifier("TEST2");
////        appo2.setAppointmentName("appointment 2");
////        appo2.setDescription("Test 2");
////
////        Mockito.when(appointmentRepo.save(appo2)).thenReturn(appo2);
////
////        Appointment returnedAppointment = appointmentService.saveOrUpdateAppointment(appo2);
////        assertThat(returnedAppointment.getAppointmentIdentifier().equals(appo2.getAppointmentIdentifier()));
////    }
//
////    @Test
////    void saveExistingAppointment(){
////        Appointment appo4 = new Appointment();
////        appo4.setAppointmentIdentifier("TEST1");
////        appo4.setAppointmentName("appointment 1");
////        appo4.setDescription("Test");
////        System.out.println(appo4.toString());
////
////        Mockito.when(appointmentRepo.save(appo4))
////                .thenThrow(new AppointmentIdException("Appointment ID 'TEST1' already exists"));
////
////
////
////        Exception exception = assertThrows(AppointmentIdException.class, () -> {
////            appointmentService.saveOrUpdateAppointment(appo4);
////        });
////
////
////
////        String expectedMessage = "Appointment ID 'TEST1' already exists";
////        String actualMessage = exception.getMessage();
////
////        assertTrue(actualMessage.contains(expectedMessage));
////    }
//
////    @Test
////    void updateAppointment(){
////        Appointment updatedAppo = new Appointment();
////        updatedAppo.setId((long) 10);
////        updatedAppo.setAppointmentIdentifier("TEST10");
////        updatedAppo.setAppointmentName("appointment 10");
////        updatedAppo.setDescription("Test");
////
////        Mockito.when(appointmentRepo.save(updatedAppo)).thenReturn(updatedAppo);
////        Appointment updatedAppo2 = appointmentService.saveOrUpdateAppointment(updatedAppo);
////        assertThat(updatedAppo.getAppointmentIdentifier().equals(updatedAppo2.getAppointmentIdentifier()));
////    }
//
//
//
//    @Test
//    void findAppointmentByIdentifier() {
//        // given
//        String appoId = "TEST1";
//        // when
//        Appointment found = appointmentService.findAppointmentByIdentifier(appoId);
//
//        // then
//        System.out.println(found.toString());
//        assertThat(found.getAppointmentIdentifier().equals(appoId));
//    }
//
//    @Test
//    public void findAppointmentByIdentifier_AppointmentNotFoundException() {
//        Exception exception = assertThrows(AppointmentIdException.class, () -> {
//            appointmentService.findAppointmentByIdentifier("NotFound");
//        });
//
//        String expectedMessage = "Appointment ID 'NotFound' does not exist";
//        String actualMessage = exception.getMessage();
//
//        assertTrue(actualMessage.contains(expectedMessage));
//    }
//
//
//
////    @Test
////    void findAllAppointment() {
////        List<Appointment> appointments = (List<Appointment>) appointmentService.findAllAppointment();
////        assertThat(appointments != null);
////    }
//
//    @Test
//    void deleteAppointmentByIdentifier() {
//        String appoId = "TEST0";
//        // when
//        appointmentService.deleteAppointmentByIdentifier("TEST0");
//        appointmentRepo.deleteById(appointmentService.findAppointmentByIdentifier("TEST0").getId());
//
//        // then
//        Exception exception = assertThrows(AppointmentIdException.class, () -> {
//            appointmentService.findAppointmentByIdentifier("TEST0");
//        });
//        String expectedMessage = "Appointment ID 'TEST0' does not exist";
//        String actualMessage = exception.getMessage();
//        assertTrue(actualMessage.contains(expectedMessage));
//    }
//
//    @Test
//    void deleteAppointmentByIdentifier_noAppointmentFound(){
//        Exception exception = assertThrows(AppointmentIdException.class, () -> {
//            appointmentService.deleteAppointmentByIdentifier("NothingFound");
//        });
//        String expectedMessage = "Appointment ID 'NothingFound' not found";
//        String actualMessage = exception.getMessage();
//        System.out.println(expectedMessage);
//        System.out.println(actualMessage);
//        assertTrue(actualMessage.contains(expectedMessage));
//    }
//}