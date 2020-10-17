package com.example.demo.web;

import com.example.demo.domain.Worker;
import com.example.demo.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @PostMapping("")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody Worker worker, BindingResult result, Principal principal) {
        Worker worker1 = workerService.saveOrUpdateWorker(worker, principal.getName());
        return new ResponseEntity<>(worker1, HttpStatus.CREATED);
    }

    @GetMapping("/{workerId}")
    public ResponseEntity<?> getWorkerById(@PathVariable String workerId, Principal principal) {
        Worker worker = workerService.findWorkerByIdentifier(workerId, principal.getName());
        return new ResponseEntity<>(worker, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Worker> getAllWorker(Principal principal) {
        return workerService.findAllWorker(principal.getName());
    }
    @GetMapping("/allWorkers")
    public Iterable<Worker> getAllWorkers() {
        return workerService.findAll();
    }
    @DeleteMapping("/{workerId}")
    public ResponseEntity<?> deleteWorker(@PathVariable String workerId, Principal principal) {
        workerService.deleteWorkerByIdentifier(workerId, principal.getName());

        return new ResponseEntity<String>("Worker with ID '" + workerId + "' deleted", HttpStatus.OK);
    }
}
