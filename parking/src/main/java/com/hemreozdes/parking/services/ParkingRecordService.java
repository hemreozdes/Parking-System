package com.hemreozdes.parking.services;

import com.hemreozdes.parking.entities.ParkingRecord;
import com.hemreozdes.parking.entities.ParkingSlot;
import com.hemreozdes.parking.repos.ParkingRecordRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ParkingRecordService {

    private final ParkingRecordRepo recordRepository;
    private final ParkingSlotService slotService;
    private final PricingService pricingService;

    public ParkingRecordService(ParkingRecordRepo recordRepository, ParkingSlotService slotService, PricingService pricingService) {
        this.recordRepository = recordRepository;
        this.slotService = slotService;
        this.pricingService = pricingService;
    }

    public ParkingRecord checkIn(Integer slotId, String license) {
        ParkingSlot slot = slotService.getSlotById(slotId);
        if (slot.isOccupied()) {
            throw new RuntimeException("This slot is occupied: " + slotId);
        }
        ParkingRecord record = new ParkingRecord();
        record.setLicense(license);
        record.setCheckInTime(LocalDateTime.now());
        record.setSlot(slot);
        ParkingRecord savedRecord = recordRepository.save(record);
        slot.setOccupied(true);
        slot.setActiveRecord(savedRecord);
        slotService.updateSlot(slot);

        return savedRecord;
    }

    public ParkingRecord checkOut(Integer slotId) {
        ParkingSlot slot = slotService.getSlotById(slotId);
        ParkingRecord record = recordRepository.findBySlotAndCheckOutTimeIsNull(slot)
                .orElseThrow(() -> new RuntimeException("In this slot, there is no active car: " + slotId));

        LocalDateTime checkOutTime = LocalDateTime.now();
        record.setCheckOutTime(checkOutTime);
        record.setFee(pricingService.calculate(record.getCheckInTime(), checkOutTime));

        slot.setOccupied(false);
        slot.setActiveRecord(null);
        slotService.updateSlot(slot);

        return recordRepository.save(record);
    }
    public Optional<ParkingRecord> getActiveRecord(Integer slotId) {
        ParkingSlot slot = slotService.getSlotById(slotId);
        return recordRepository.findBySlotAndCheckOutTimeIsNull(slot);
    }

}
