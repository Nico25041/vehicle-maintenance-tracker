package com.nicolas.vehiclemaintenancetracker.util;
import com.nicolas.vehiclemaintenancetracker.entity.Car;
import java.util.Comparator;

public class CarComparators {
    public static final Comparator<Car> BY_MILES =
            Comparator.comparingInt(Car::getMiles);

    public static final Comparator<Car> BY_YEAR =
            Comparator.comparingInt(Car::getCarYear);

    public static final Comparator<Car> BY_MAKE =
            Comparator.comparing(Car::getMake);
}