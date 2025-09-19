package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.UserDTO;
import edu.neu.csye6200.dto.LoginRequestDTO;
import edu.neu.csye6200.model.User;
import edu.neu.csye6200.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import edu.neu.csye6200.dto.ApiResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String roleType) {

        List<User> users;

        // Determine which overloaded method to call
        if (name != null) {
            users = userService.getUsers(name);
        } else if (email != null) {
            users = userService.getUsersByEmail(email);
        } else if (roleType != null) {
            users = userService.getUsersByRoleType(roleType);
        } else {
            users = userService.getUsers(); // Fetch all users if no criteria is provided
        }

        // Convert users to DTOs
        List<UserDTO> userDTOs = users.stream().map(UserDTO::new).toList();

        // Create and return the response
        ApiResponse<List<UserDTO>> response = new ApiResponse<>("Users retrieved successfully", userDTOs);
        return ResponseEntity.ok(response);
    }

    // Get a single user by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable("id") int userId) {
        try {
            // Retrieve the user
            User user = userService.getUserById(userId);
            if (user == null) {
                // If user not found, return 404
                ApiResponse<UserDTO> response = new ApiResponse<>("User not found", null);
                return ResponseEntity.status(404).body(response);
            }
            // If user is found, return the details
            ApiResponse<UserDTO> response = new ApiResponse<>("User retrieved successfully", new UserDTO(user));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle unexpected errors
            ApiResponse<UserDTO> response = new ApiResponse<>("An error occurred: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody User user) {
        try {
            // Create the user
            User newUser = userService.createUser(user);

            // Create the response with a success message
            ApiResponse<UserDTO> response = new ApiResponse<>("User created successfully", new UserDTO(newUser));
            return ResponseEntity.status(201).body(response); // Use 201 Created for successful creation
        } catch (Exception e) {
            // Handle unexpected errors
            ApiResponse<UserDTO> response = new ApiResponse<>("An error occurred: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }




    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDTO>> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            // Authenticate the user
            User user = userService.authenticateAndGetUser(loginRequestDTO.getEmail(), loginRequestDTO.getPassword());
            if (user != null) {
                ApiResponse<UserDTO> response = new ApiResponse<>("Login successful", new UserDTO(user));
                return ResponseEntity.ok(response);
            } else {
                ApiResponse<UserDTO> response = new ApiResponse<>("Invalid credentials", null);
                return ResponseEntity.status(401).body(response);
            }
        } catch (IllegalArgumentException e) {
            ApiResponse<UserDTO> response = new ApiResponse<>(e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(@PathVariable("id") int userId, @RequestBody User user) {
        try {
            // Retrieve the existing user to validate email
            User existingUser = userService.getUserById(userId);
            if (existingUser == null) {
                ApiResponse<UserDTO> response = new ApiResponse<>("User with ID " + userId + " does not exist", null);
                return ResponseEntity.status(404).body(response);
            }

            // Check if the email is being updated
            if (!existingUser.getEmail().equals(user.getEmail())) {
                ApiResponse<UserDTO> response = new ApiResponse<>("Email cannot be updated", null);
                return ResponseEntity.badRequest().body(response);
            }

            // Proceed to update the user
            User updatedUser = userService.updateUser(userId, user);
            ApiResponse<UserDTO> response = new ApiResponse<>("User updated successfully", new UserDTO(updatedUser));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<UserDTO> response = new ApiResponse<>("An error occurred: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable("id") int userId) {
        try {
            // Check if the user exists
            User existingUser = userService.getUserById(userId);
            if (existingUser == null) {
                ApiResponse<String> response = new ApiResponse<>("User with ID " + userId + " does not exist", null);
                return ResponseEntity.status(404).body(response);
            }

            // Proceed to delete the user
            userService.deleteUser(userId);
            ApiResponse<String> response = new ApiResponse<>("User deleted successfully", null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<String> response = new ApiResponse<>("An error occurred: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }
}
