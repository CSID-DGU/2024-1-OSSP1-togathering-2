package togathering.Plogging.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerController {


    @GetMapping("/dockerdocker")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("Hello Docker-Spring World!");
    }

}