package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.DonationDTO;
import edu.neu.csye6200.model.Donation;
import edu.neu.csye6200.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    // POST: Create a new donation
    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody DonationDTO donationDTO) {
        Donation donation = donationService.createDonation(donationDTO);
        return ResponseEntity.ok(donation);
    }

    // GET: Fetch all donations
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    // GET: Fetch a single donation by ID
    @GetMapping("/{donationId}")
    public ResponseEntity<Donation> getDonationById(@PathVariable int donationId) {
        Donation donation = donationService.getDonationById(donationId);
        return ResponseEntity.ok(donation);
    }
}
