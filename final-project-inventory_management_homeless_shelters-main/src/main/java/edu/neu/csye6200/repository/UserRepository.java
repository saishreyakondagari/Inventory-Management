package edu.neu.csye6200.repository;

import edu.neu.csye6200.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email); // Add this method
    // Fetch users by first name
    // Find users by name (partial match)
    List<User> findByNameContaining(String name);

    // Find users by email (partial match)
    List<User> findByEmailContaining(String email);

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.roleType = :roleType")
    List<User> findByRoleType(@Param("roleType") String roleType);
}