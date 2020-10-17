package com.example.demo.web;

import com.example.demo.domain.Service;
import com.example.demo.services.AppointmentService;
import com.example.demo.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/service")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping("")
    public ResponseEntity<?> createNewService(@Valid @RequestBody Service service, BindingResult result, Principal principal){
        Service service1 = serviceService.saveOrUpdateService(service, principal.getName());
        return new ResponseEntity<Service>(service1, HttpStatus.CREATED);
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<?> getServiceById(@PathVariable String serviceId, Principal principal) {
        Service service = serviceService.findServiceByIdentifier(serviceId, principal.getName());
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Service> getAllService(Principal principal) {
        return serviceService.findAllService(principal.getName());
    }

    @GetMapping("/allServices")
    public Iterable<Service> getAllServices(){
        return serviceService.findAll();
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable String serviceId, Principal principal) {
        serviceService.deleteServiceByIdentifier(serviceId, principal.getName());

        return new ResponseEntity<String>("Service with ID '" +serviceId + "'deleted sucessfully", HttpStatus.OK);
    }

}