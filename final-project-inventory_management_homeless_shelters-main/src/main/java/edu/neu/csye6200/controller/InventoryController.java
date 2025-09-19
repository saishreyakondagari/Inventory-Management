package edu.neu.csye6200.controller;

import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Create a new inventory item
    @PostMapping("/add")
    public InventoryItem addItem(@RequestBody InventoryItem inventoryItem) {
        return inventoryService.addItem(inventoryItem);
    }

    // Get all inventory items
    @GetMapping("/all")
    public List<InventoryItem> getAllItems() {
        return inventoryService.getAllItems();
    }

    // Get a specific inventory item by ID
    @GetMapping("/{id}")
    public InventoryItem getItemById(@PathVariable int id) {
        return inventoryService.getItemById(id);
    }

    // Get inventory items by shelter ID
    @GetMapping("/shelter/{shelterId}")
    public List<InventoryItem> getItemsByShelter(@PathVariable int shelterId) {
        return inventoryService.getItemsByShelter(shelterId);
    }

    // Update an existing inventory item
    @PutMapping("/{id}")
    public InventoryItem updateItem(@PathVariable int id, @RequestBody InventoryItem updatedItem) {
        return inventoryService.updateItem(id, updatedItem);
    }

    // Delete an inventory item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id) {
        inventoryService.deleteItem(id);
    }
    
    @GetMapping("/search")
    public List<InventoryItem> searchItems(@RequestParam String itemName) {
        return inventoryService.searchItemsByName(itemName);
    }
}
