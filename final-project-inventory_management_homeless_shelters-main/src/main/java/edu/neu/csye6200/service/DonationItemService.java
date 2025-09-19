package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.DonationItemDTO;
import edu.neu.csye6200.model.Donation;
import edu.neu.csye6200.model.DonationItem;
import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.repository.DonationItemRepository;
import edu.neu.csye6200.repository.DonationRepository;
import edu.neu.csye6200.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DonationItemService {

    @Autowired
    private DonationItemRepository donationItemRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional
    public DonationItem createDonationItem(DonationItemDTO donationItemDTO) {
        // Find donation and inventory item
        Optional<Donation> donation = donationRepository.findById(donationItemDTO.getDonationId());
        InventoryItem inventoryItem = inventoryRepository.findById(donationItemDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("InventoryItem not found"));

        if (donation.isPresent()) {
            // Ensure sufficient inventory
            if (inventoryItem.getQuantity() < donationItemDTO.getQuantity()) {
                throw new RuntimeException("Insufficient inventory for item: " + inventoryItem.getItemName());
            }

            // Update inventory quantity
            int updatedQuantity = inventoryItem.getQuantity() - donationItemDTO.getQuantity();
            inventoryItem.setQuantity(updatedQuantity);
            inventoryRepository.save(inventoryItem);

            // Create DonationItem
            DonationItem donationItem = new DonationItem(
                    inventoryItem,
                    donation.get(),
                    donationItemDTO.getQuantity()
            );

            return donationItemRepository.save(donationItem);
        } else {
            throw new RuntimeException("Donation not found");
        }
    }

    public List<DonationItem> getAllDonationItems() {
        return donationItemRepository.findAll();
    }

    public DonationItem getDonationItemById(int id) {
        return donationItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DonationItem not found"));
    }

    @Transactional
    public void deleteDonationItem(int id) {
        Optional<DonationItem> donationItem = donationItemRepository.findById(id);
        if (donationItem.isPresent()) {
            // Restore inventory quantity
            InventoryItem item = donationItem.get().getInventoryItem();
            int updatedQuantity = item.getQuantity() + donationItem.get().getQuantity();
            item.setQuantity(updatedQuantity);
            inventoryRepository.save(item);

            // Delete DonationItem
            donationItemRepository.deleteById(id);
        } else {
            throw new RuntimeException("DonationItem not found");
        }
    }
}
