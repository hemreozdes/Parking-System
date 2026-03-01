package com.hemreozdes.parking.repos;

import com.hemreozdes.parking.entities.ParkingRecord;
import com.hemreozdes.parking.entities.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParkingRecordRepo extends JpaRepository<ParkingRecord,Integer> {
    Optional<ParkingRecord> findBySlotAndCheckOutTimeIsNull(ParkingSlot slot);
}
