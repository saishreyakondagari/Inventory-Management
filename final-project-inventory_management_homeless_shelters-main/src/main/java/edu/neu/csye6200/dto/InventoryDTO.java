package edu.neu.csye6200.dto;

import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.model.Shelter;

public class InventoryDTO {

    private int itemId;
    private String itemName;
    private String description;
    private int quantity;
    private Shelter shelter;

    // Constructor to map from InventoryItem entity
    public InventoryDTO(InventoryItem item) {
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.description = item.getDescription();
        this.quantity = item.getQuantity();
        this.shelter = item.getShelter();
    }

    // Getters and Setters
    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelterId(Shelter shelter) {
        this.shelter = shelter;
    }
}
