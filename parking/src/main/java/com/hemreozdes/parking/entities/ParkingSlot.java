package com.hemreozdes.parking.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int floor;
    private int slotNumber;
    private boolean occupied;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "active_record_id")
    private ParkingRecord activeRecord;

    public ParkingSlot() {
    }
    public ParkingSlot(int id, int floor, int slotNumber, boolean occupied, ParkingRecord activeRecord) {
        this.id = id;
        this.floor = floor;
        this.slotNumber = slotNumber;
        this.occupied = occupied;
        this.activeRecord = activeRecord;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getFloor() {
        return floor;
    }
    public void setFloor(int floor) {
        this.floor = floor;
    }

    public int getSlotNumber() {
        return slotNumber;
    }
    public void setSlotNumber(int slotNumber) {
        this.slotNumber = slotNumber;
    }

    public boolean isOccupied() {
        return occupied;
    }
    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }

    public ParkingRecord getActiveRecord() {
        return activeRecord;
    }
    public void setActiveRecord(ParkingRecord activeRecord) {
        this.activeRecord = activeRecord;
    }
}
