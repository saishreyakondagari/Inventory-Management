package edu.neu.csye6200.service;

import edu.neu.csye6200.model.User;
import edu.neu.csye6200.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // PasswordEncoder instance for hashing and verifying passwords
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsers(String name) {
        return userRepository.findByNameContaining(name);
    }

    public List<User> getUsersByEmail(String email) {
        return userRepository.findByEmailContaining(email);
    }

    public List<User> getUsersByRoleType(String roleType) {
        return userRepository.findByRoleType(roleType);
    }

    // Method to get a user by ID
    public User getUserById(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    // Method to create a new user with hashed password
    public User createUser(User user) {
        // Validate email and password
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Method to update an existing user with password handling
    public User updateUser(int userId, User user) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist");
        }

        // Retrieve the existing user to preserve fields
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser != null) {
            user.setUserId(userId); // Ensure the ID is not changed
            user.setEmail(existingUser.getEmail()); // Preserve email since it's typically immutable

            // If a new password is provided, hash it; otherwise, retain the existing password
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            } else {
                user.setPassword(existingUser.getPassword());
            }
        }

        return userRepository.save(user);
    }

    // Method to delete a user
    public void deleteUser(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist");
        }
        userRepository.deleteById(userId);
    }

    // Method to authenticate a user by comparing the password
    public User authenticateAndGetUser(String email, String rawPassword) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (rawPassword == null || rawPassword.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        // Retrieve the user by email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null; // User does not exist
        }

        // Compare the raw password with the hashed password
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user; // Return the authenticated user
        }

        return null; // Authentication failed
    }
}
