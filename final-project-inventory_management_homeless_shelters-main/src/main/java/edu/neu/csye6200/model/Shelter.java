package edu.neu.csye6200.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "shelter")
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shelter_id")
    private int shelterId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "contact", nullable = false, length = 100)
    private String contact;
    
    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InventoryItem> inventories;

    public Shelter() {}

    public Shelter(String name, String address, String contact) {
        this.name = name;
        this.address = address;
        this.contact = contact;
    }

    // Getters and Setters
    public int getShelterId() {
        return shelterId;
    }

    public void setShelterId(int shelterId) {
        this.shelterId = shelterId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

}
