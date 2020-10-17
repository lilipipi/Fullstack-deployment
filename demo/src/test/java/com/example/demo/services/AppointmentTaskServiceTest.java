//package com.example.demo.services;
//
//import com.example.demo.domain.Appointment;
//import com.example.demo.domain.AppointmentTask;
//import com.example.demo.domain.AppointmentTaskList;
//import com.example.demo.exceptions.AppointmentNotFoundException;
//import com.example.demo.exceptions.UsernameAlreadyExistsException;
//import com.example.demo.repo.AppointmentRepo;
//import com.example.demo.repo.AppointmentTaskListRepo;
//import com.example.demo.repo.AppointmentTaskRepo;
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
//class AppointmentTaskServiceTest {
//
//    @TestConfiguration
//    static class AppointmentTaskServiceTestImpl {
//        @Bean
//        public AppointmentTaskService appointmentTaskService(){
//            return new AppointmentTaskService();
//        }
//
//        @Bean
//        public AppointmentService appointmentService(){
//            return new AppointmentService();
//        }
//    }
//
//    @Autowired
//    private AppointmentTaskService appointmentTaskService;
//
//    @Autowired
//    private AppointmentService appointmentService;
//
//    @MockBean
//    private AppointmentTaskRepo appointmentTaskRepo;
//
//    @MockBean
//    private AppointmentTaskListRepo appointmentTaskListRepo;
//
//    @MockBean
//    private AppointmentRepo appointmentRepo;
//
//    private AppointmentTask appointmentTask;
//    private AppointmentTaskList taskList;
//    private Appointment appointment;
//
//    @BeforeEach
//    public void setup(){
//        appointment = new Appointment();
//        taskList = new AppointmentTaskList();
//        appointmentTask = new AppointmentTask();
//
//        appointment.setAppointmentIdentifier("TEST1");
//        appointment.setAppointmentName("appointment 1");
//        appointment.setDescription("Test");
//
//        taskList.setAppointmentIdentifier("TEST1");
//        taskList.setAppointment(appointment);
//
//        appointmentTask.setAppointmentSequence("TEST1-1");
//        appointmentTask.setAppointmentIdentifier("TEST1");
//        appointmentTask.setAppointmentTaskList(taskList);
//        appointmentTask.setSummary("test");
//
//        taskList.getAppointmentTasks().add(appointmentTask);
//
//        Mockito.when(appointmentTaskListRepo.findByAppointmentIdentifier(taskList.getAppointmentIdentifier()))
//                .thenReturn(taskList);
//
//        Mockito.when(appointmentRepo.findByAppointmentIdentifier(appointment.getAppointmentIdentifier()))
//                .thenReturn(appointment);
//
//        Mockito.when(appointmentTaskRepo.findByAppointmentIdentifierOrderByPriority(appointment.getAppointmentIdentifier()))
//                .thenReturn(taskList.getAppointmentTasks());
//
//        Mockito.when(appointmentTaskRepo.save(appointmentTask)).thenReturn(appointmentTask);
//
//        Mockito.when(appointmentTaskRepo.findByAppointmentSequence(appointmentTask.getAppointmentSequence()))
//                .thenReturn(appointmentTask);
//    }
//
//    @Test
//    void addAppointmentTask() {
//        AppointmentTask newAppointmentTask = appointmentTaskService.addAppointmentTask(appointment.getAppointmentIdentifier(), appointmentTask);
//        assertThat(newAppointmentTask.equals(appointmentTask));
//    }
//
//    @Test
//    void addUnknownAppointmentTask() {
//        Exception exception = assertThrows(AppointmentNotFoundException.class, () -> {
//            appointmentTaskService.addAppointmentTask("NotFound", appointmentTask);
//        });
//        String expectedMessage = "Appointment not found";
//        String actualMessage = exception.getMessage();
//        assertTrue(actualMessage.contains(expectedMessage));
//    }
//
//    @Test
//    void findAppointmentTaskListById() {
//        List<AppointmentTask> tasks = (List<AppointmentTask>) appointmentTaskService.findAppointmentTaskListById(appointment.getAppointmentIdentifier());
//        assertThat(taskList.getAppointmentTasks().equals(tasks));
//    }
//
//    @Test
//    void findTaskByAppointmentSequence() {
//        AppointmentTaskList newAppointmentTaskList = appointmentTaskListRepo.findByAppointmentIdentifier(taskList.getAppointmentIdentifier());
//        AppointmentTask newAppointmentTask = appointmentTaskRepo.findByAppointmentSequence(appointmentTask.getAppointmentSequence());
//
//        AppointmentTask found = appointmentTaskService.findTaskByAppointmentSequence(newAppointmentTaskList.getAppointmentIdentifier(), newAppointmentTask.getAppointmentSequence());
//        assertThat(found.equals(appointmentTask));
//    }
//
//    @Test
//    void updateByAppointmentSequence() {
//        AppointmentTask newAppointmentTask = appointmentTaskService.updateByAppointmentSequence(appointmentTask,
//                taskList.getAppointmentIdentifier(), appointmentTask.getAppointmentSequence());
//        assertThat(newAppointmentTask.equals(appointmentTask));
//    }
//
//
//    @Test
//    void deleteTaskByAppointmentSequence() {
//        AppointmentTask newAppointmentTask = appointmentTaskService.deleteTaskByAppointmentSequence(taskList.getAppointmentIdentifier(), appointmentTask.getAppointmentSequence());
//        assertThat(newAppointmentTask.equals(appointmentTask));
//    }
//}