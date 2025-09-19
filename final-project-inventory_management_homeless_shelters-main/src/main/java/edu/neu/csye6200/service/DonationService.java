package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.DonationDTO;
import edu.neu.csye6200.model.Donation;
import edu.neu.csye6200.model.User;
import edu.neu.csye6200.repository.DonationRepository;
import edu.neu.csye6200.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new donation
    public Donation createDonation(DonationDTO donationDTO) {
        Optional<User> user = userRepository.findById(donationDTO.getUserId());
        if (user.isPresent()) {
            Donation donation = new Donation(user.get());
            return donationRepository.save(donation);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Fetch all donations
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Fetch donation by ID
    public Donation getDonationById(int donationId) {
        return donationRepository.findById(donationId)
                .orElseThrow(() -> new RuntimeException("Donation not found with ID: " + donationId));
    }
}
