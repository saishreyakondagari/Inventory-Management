package edu.neu.csye6200.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_id")
    private int donationId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "donation_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP) // Store full timestamp
    private Date donationDate;

    public Donation() {}

    public Donation(User user) {
        this.user = user;
        this.donationDate = new Date(); // Automatically set the current date and time
    }

    public int getDonationId() {
        return donationId;
    }

    public void setDonationId(int donationId) {
        this.donationId = donationId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(Date donationDate) {
        this.donationDate = donationDate;
    }
}
