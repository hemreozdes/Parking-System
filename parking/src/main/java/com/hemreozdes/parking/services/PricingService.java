package com.hemreozdes.parking.services;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class PricingService {
    private static final double FIRST_HOUR_RATE = 50.0;
    private static final double ADDITIONAL_HOUR_RATE = 30.0;

    public double calculate(LocalDateTime checkIn, LocalDateTime checkOut) {
        long minutes = Duration.between(checkIn, checkOut).toMinutes();
        if (minutes <= 60) return FIRST_HOUR_RATE;
        long additionalHours = (long) Math.ceil((minutes - 60) / 60.0);
        return FIRST_HOUR_RATE + (additionalHours * ADDITIONAL_HOUR_RATE);
    }
}
