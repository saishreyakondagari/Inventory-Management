package edu.neu.csye6200.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donated_items")
public class DonationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_item_id")
    private int donationItemId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", nullable = false)
    private InventoryItem inventoryItem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    public DonationItem() {}

    public DonationItem(InventoryItem inventoryItem, Donation donation, int quantity) {
        this.inventoryItem = inventoryItem;
        this.donation = donation;
        this.quantity = quantity;
    }

    public int getDonationItemId() {
        return donationItemId;
    }

    public void setDonationItemId(int donationItemId) {
        this.donationItemId = donationItemId;
    }

    public InventoryItem getInventoryItem() {
        return inventoryItem;
    }

    public void setInventoryItem(InventoryItem inventoryItem) {
        this.inventoryItem = inventoryItem;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
