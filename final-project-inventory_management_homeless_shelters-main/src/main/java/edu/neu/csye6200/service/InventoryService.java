package edu.neu.csye6200.service;

import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public InventoryItem addItem(InventoryItem inventoryItem) {
    	InventoryItem existingItem = inventoryRepository.findByItemNameAndShelter_ShelterId(
                inventoryItem.getItemName(),
                inventoryItem.getShelter().getShelterId()
        );

        if (existingItem != null) {
            // If the item exists, update the quantity
            existingItem.setQuantity(existingItem.getQuantity() + inventoryItem.getQuantity());
            return inventoryRepository.save(existingItem);
        } else {
            // If the item does not exist, save it as a new item
            return inventoryRepository.save(inventoryItem);
        }
    }

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem getItemById(int id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public List<InventoryItem> getItemsByShelter(int shelterId) {
        return inventoryRepository.findByShelter_ShelterId(shelterId);
    }


    public InventoryItem updateItem(int id, InventoryItem updatedItem) {
        return inventoryRepository.findById(id).map(item -> {
            item.setItemName(updatedItem.getItemName());
            item.setDescription(updatedItem.getDescription());
            item.setQuantity(updatedItem.getQuantity());
            item.setShelter(updatedItem.getShelter());
            return inventoryRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public void deleteItem(int id) {
        inventoryRepository.deleteById(id);
    }
    
    public List<InventoryItem> searchItemsByName(String itemName) {
    	return inventoryRepository.findByItemNameContainingIgnoreCase(itemName);
    }
}
