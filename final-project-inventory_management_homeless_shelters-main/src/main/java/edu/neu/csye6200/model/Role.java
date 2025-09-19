package edu.neu.csye6200.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleId;

    @Column(name = "role_type", nullable = false, length = 100)
    private String roleType;

    @Column(name = "description", length = 255)
    private String description;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents serialization of the users field
    private Set<User> users;

    public Role() {}

    public Role(String roleType, String description) {
        this.roleType = roleType;
        this.description = description;
    }

    // Getters and setters
    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Role{" +
                "roleId=" + roleId +
                ", roleType='" + roleType + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
