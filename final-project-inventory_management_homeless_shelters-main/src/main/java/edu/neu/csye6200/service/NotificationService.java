package edu.neu.csye6200.service;

import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Fetch items with quantity < 5 (Low Stock)
    public List<InventoryItem> getLowStockItems() {
        return inventoryRepository.findAll().stream()
                .filter(item -> item.getQuantity() < 5)
                .collect(Collectors.toList());
    }

    // Fetch top 5 most available items (Priority Lean-out)
    public List<InventoryItem> getMostAvailableItems() {
        return inventoryRepository.findAll().stream()
                .sorted((a, b) -> b.getQuantity() - a.getQuantity())
                .limit(5)
                .collect(Collectors.toList());
    }
}