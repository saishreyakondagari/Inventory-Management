package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.DistributionDTO;
import edu.neu.csye6200.model.Distribution;
import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.repository.DistributionRepository;
import edu.neu.csye6200.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistributionService {

    @Autowired
    private DistributionRepository distributionRepository;
    
    @Autowired
    private InventoryRepository inventoryRepository;


    public DistributionDTO createDistribution(DistributionDTO dto) {
    	InventoryItem inventoryItem = inventoryRepository.findById(dto.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("Item not found in inventory"));

        if (inventoryItem.getQuantity() < dto.getQuantity()) {
            throw new IllegalArgumentException("Insufficient quantity in inventory");
        }

        // Deduct the quantity from inventory
        int updatedQuantity = inventoryItem.getQuantity() - dto.getQuantity();

        inventoryItem.setQuantity(updatedQuantity);
        inventoryRepository.save(inventoryItem);

        // Save the distribution
        Distribution distribution = mapToEntity(dto);
        Distribution savedDistribution = distributionRepository.save(distribution);

        return mapToDTO(savedDistribution);

    }

    public DistributionDTO updateDistribution(Integer id, DistributionDTO dto) {
        Distribution distribution = distributionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Distribution not found"));

        distribution.setItemId(dto.getItemId());
        distribution.setItemName(dto.getItemName());
        distribution.setQuantity(dto.getQuantity());
        distribution.setDistributionDate(dto.getDistributionDate());

        Distribution updatedDistribution = distributionRepository.save(distribution);
        return mapToDTO(updatedDistribution);
    }

    public DistributionDTO getDistributionById(Integer id) {
        Distribution distribution = distributionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Distribution not found"));
        return mapToDTO(distribution);
    }

    public List<DistributionDTO> getAllDistributions() {
        return distributionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteDistribution(Integer id) {
        if (!distributionRepository.existsById(id)) {
            throw new IllegalArgumentException("Distribution not found");
        }
        distributionRepository.deleteById(id);
    }

    private DistributionDTO mapToDTO(Distribution distribution) {
        DistributionDTO dto = new DistributionDTO();
        dto.setDistributionId(distribution.getDistributionId());
        dto.setItemId(distribution.getItemId());
        dto.setItemName(distribution.getItemName());
        dto.setQuantity(distribution.getQuantity());
        dto.setDistributionDate(distribution.getDistributionDate());
        return dto;
    }

    private Distribution mapToEntity(DistributionDTO dto) {
        Distribution distribution = new Distribution();
        distribution.setDistributionId(dto.getDistributionId());
        distribution.setItemId(dto.getItemId());
        distribution.setItemName(dto.getItemName());
        distribution.setQuantity(dto.getQuantity());
        distribution.setDistributionDate(dto.getDistributionDate());
        return distribution;
    }
}
