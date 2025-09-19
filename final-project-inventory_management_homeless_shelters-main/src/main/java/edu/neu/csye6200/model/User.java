package edu.neu.csye6200.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, length = 255, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;    

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "password", nullable = false)
    private String password; // New field for hashed password

    public User() {}

    public User(String name, String email, Role role, String phone, String address, String password) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.password = password; // Initialize password
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password; // Setter for password (should store hashed passwords)
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + (role != null ? role.getRoleType() : "null") +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
