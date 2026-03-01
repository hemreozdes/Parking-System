package com.hemreozdes.parking.services;

import com.hemreozdes.parking.entities.ParkingSlot;
import com.hemreozdes.parking.repos.ParkingSlotRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {
    private final ParkingSlotRepo slotRepository;
    public ParkingSlotService(ParkingSlotRepo slotRepository) {
        this.slotRepository = slotRepository;
    }
    public List<ParkingSlot> getAllSlots() {
        return slotRepository.findAll();
    }
    public List<ParkingSlot> getSlotsByFloor(int floor) {
        return slotRepository.findByFloor(floor);
    }
    public ParkingSlot getSlotById(Integer id) {
        return slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot couldn't find: "));
    }
    public ParkingSlot updateSlot(ParkingSlot slot) {
        return slotRepository.save(slot);
    }
}
