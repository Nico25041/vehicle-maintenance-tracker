package com.nicolas.vehiclemaintenancetracker.repository;
import com.nicolas.vehiclemaintenancetracker.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CarRepository extends JpaRepository<Car,Long>{
}