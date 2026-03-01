package com.hemreozdes.parking.repos;

import com.hemreozdes.parking.entities.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingSlotRepo extends JpaRepository<ParkingSlot,Integer> {
    List<ParkingSlot> findByFloor(int floor);
}
