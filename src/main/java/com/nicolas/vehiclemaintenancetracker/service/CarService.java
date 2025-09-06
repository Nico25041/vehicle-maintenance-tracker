package com.nicolas.vehiclemaintenancetracker.service;
import com.nicolas.vehiclemaintenancetracker.entity.Car;
import com.nicolas.vehiclemaintenancetracker.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }
    public int removeCar(Car car){
        carRepository.delete(car);
        return 0;
    }
    public Car getCar(Car car){
        return carRepository.getReferenceById(car.getId());
    }
    public List<Car> getCarsNeedingService() {
        return carRepository.findAll()
                .stream()
                .filter(car -> (car.getMiles() - car.getMilesAtLastService()) >= 5000)
                .toList();
    }
    public Map<String, Object> getCarStats() {
        List<Car> cars = carRepository.findAll();
        Map<String, Object> stats = new HashMap<>();

        // Average miles
        stats.put("averageMiles", cars.stream()
                .mapToInt(Car::getMiles)
                .average()
                .orElse(0));


        // Cars needing service
        stats.put("carsNeedingService", cars.stream()
                .filter(car -> car.getMiles() - car.getMilesAtLastService() >= 5000)
                .count());

        stats.put("newestCarYear", cars.stream()
                .mapToInt(Car::getCarYear)
                .max()
                .orElse(0));

        // Most common make
        stats.put("mostCommonMake", cars.stream()
                .collect(Collectors.groupingBy(Car::getMake, Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A"));

        return stats;
    }



}
