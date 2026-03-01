package com.hemreozdes.parking.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "parking_records")
public class ParkingRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String license;
    private double fee;
    @Column(nullable = false)
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    @ManyToOne
    @JoinColumn(name = "slot_id")
    private ParkingSlot slot;

    public ParkingRecord() {
    }
    public ParkingRecord(int id,double fee, String license, LocalDateTime checkInTime, LocalDateTime checkOutTime, ParkingSlot slot) {
        this.id = id;
        this.fee = fee;
        this.license = license;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.slot = slot;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public double getFee() {
        return fee;
    }
    public void setFee(double fee) {
        this.fee = fee;
    }

    public String getLicense() {
        return license;
    }
    public void setLicense(String license) {
        this.license = license;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }
    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }
    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public ParkingSlot getSlot() {
        return slot;
    }
    public void setSlot(ParkingSlot slot) {
        this.slot = slot;
    }
}
