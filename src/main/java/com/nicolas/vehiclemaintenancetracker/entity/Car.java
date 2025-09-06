package com.nicolas.vehiclemaintenancetracker.entity;
import jakarta.persistence.*;

@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int carYear;
    private String color;
    private String make;
    private String model;
    private int miles;
    private int milesAtLastService; // new field

    // Getters & Setters
    public int getMilesAtLastService() {
        return milesAtLastService;
    }

    public void setMilesAtLastService(int milesAtLastService) {
        if (milesAtLastService < 0 || milesAtLastService > this.miles) {
            throw new IllegalArgumentException("Miles at last service must be >= 0 and <= current miles");
        }
        this.milesAtLastService = milesAtLastService;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCarYear() {
        return carYear;
    }

    public void setCarYear(int year) {
        if(year < 1900 || year > 2026){
            throw new IllegalArgumentException("Car year is invalid.");
        }
        this.carYear = year;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getMiles() {
        return miles;
    }

    public void setMiles(int miles) {
        if(miles < 0){
            throw new IllegalArgumentException("Miles cannot be negative");
        }
        this.miles = miles;
    }

}
