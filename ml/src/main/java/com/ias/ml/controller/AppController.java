package com.ias.ml.controller;

import com.ias.ml.service.MLService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    private final MLService mlService;

    public AppController(MLService mlService) {
        this.mlService = mlService;
    }

    @RequestMapping("/run")
    public void execute(@RequestBody String image){
        mlService.predict(image);
    }
}
