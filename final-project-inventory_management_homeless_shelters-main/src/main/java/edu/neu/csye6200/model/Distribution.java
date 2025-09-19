package edu.neu.csye6200.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "distribution")
public class Distribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer distributionId;

    private Integer itemId;
    private String itemName;
    private Integer quantity;
    private LocalDate distributionDate;

    // Getters and setters
    public Integer getDistributionId() {
        return distributionId;
    }

    public void setDistributionId(Integer distributionId) {
        this.distributionId = distributionId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDistributionDate() {
        return distributionDate;
    }

    public void setDistributionDate(LocalDate distributionDate) {
        this.distributionDate = LocalDate.now();
    }

}
