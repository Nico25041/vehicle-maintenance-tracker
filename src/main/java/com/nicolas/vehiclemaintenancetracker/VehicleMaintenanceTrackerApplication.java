package com.nicolas.vehiclemaintenancetracker;

import com.nicolas.vehiclemaintenancetracker.entity.Car;
import com.nicolas.vehiclemaintenancetracker.repository.CarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VehicleMaintenanceTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(VehicleMaintenanceTrackerApplication.class, args);
    }
}
