package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.DonationItemDTO;
import edu.neu.csye6200.model.DonationItem;
import edu.neu.csye6200.service.DonationItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donation-items")
public class DonationItemController {

    @Autowired
    private DonationItemService donationItemService;

    @PostMapping
    public ResponseEntity<DonationItem> createDonationItem(@RequestBody DonationItemDTO donationItemDTO) {
        DonationItem donationItem = donationItemService.createDonationItem(donationItemDTO);
        return ResponseEntity.ok(donationItem);
    }

    @GetMapping
    public ResponseEntity<List<DonationItem>> getAllDonationItems() {
        List<DonationItem> donationItems = donationItemService.getAllDonationItems();
        return ResponseEntity.ok(donationItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationItem> getDonationItemById(@PathVariable int id) {
        DonationItem donationItem = donationItemService.getDonationItemById(id);
        return ResponseEntity.ok(donationItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonationItem(@PathVariable int id) {
        donationItemService.deleteDonationItem(id);
        return ResponseEntity.noContent().build();
    }
}
