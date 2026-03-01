package com.hemreozdes.parking.controllers;

import com.hemreozdes.parking.dtos.requests.CheckInRequest;
import com.hemreozdes.parking.entities.ParkingRecord;
import com.hemreozdes.parking.entities.ParkingSlot;
import com.hemreozdes.parking.services.ParkingRecordService;
import com.hemreozdes.parking.services.ParkingSlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/slots")
public class ParkingController {

    private final ParkingSlotService slotService;
    private final ParkingRecordService recordService;

    public ParkingController(ParkingSlotService slotService, ParkingRecordService recordService) {
        this.slotService = slotService;
        this.recordService = recordService;
    }

    @GetMapping
    public ResponseEntity<List<ParkingSlot>> getAllSlots() {
        return ResponseEntity.ok(slotService.getAllSlots());
    }

    @PostMapping("/{id}/checkin")
    public ResponseEntity<ParkingRecord> checkIn(@PathVariable Integer id, @RequestBody CheckInRequest request) {
        return ResponseEntity.ok(recordService.checkIn(id, request.getLicense()));
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<ParkingRecord> checkOut(@PathVariable Integer id) {
        return ResponseEntity.ok(recordService.checkOut(id));
    }

    @GetMapping("/{id}/active")
    public ResponseEntity<ParkingRecord> getActiveRecord(@PathVariable Integer id) {
        return recordService.getActiveRecord(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
