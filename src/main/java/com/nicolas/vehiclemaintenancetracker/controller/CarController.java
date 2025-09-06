package com.nicolas.vehiclemaintenancetracker.controller;

import com.nicolas.vehiclemaintenancetracker.entity.Car;
import com.nicolas.vehiclemaintenancetracker.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.nicolas.vehiclemaintenancetracker.util.CarComparators;
import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")  // <-- allow your frontend

public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }
    @DeleteMapping
    public int deleteCar(@RequestBody Car car){
        return carService.removeCar(car);
    }
    @GetMapping("/{id}")
    public Car getCar(Car car){
        return carService.getCar(car);
    }
    @GetMapping("/sorted-year")
    public List<Car> getAllCarsSortedByYear() {
        List<Car> cars = carService.getAllCars();
        cars.sort(CarComparators.BY_YEAR); // sorts in place
        return cars;
    }

    @GetMapping("/sorted-miles")
    public List<Car> getAllCarsSortedByMiles() {
        List<Car> cars = carService.getAllCars();
        cars.sort(CarComparators.BY_MILES); // sorts in place
        return cars;
    }
    @GetMapping("/sorted-make")
    public List<Car> getAllCarsSortedByMake() {
        List<Car> cars = carService.getAllCars();
        cars.sort(CarComparators.BY_MAKE); // sorts in place
        return cars;
    }
    @GetMapping("/needs-service")
    public List<Car> getCarsNeedingService() {
        return carService.getCarsNeedingService();
    }
}
