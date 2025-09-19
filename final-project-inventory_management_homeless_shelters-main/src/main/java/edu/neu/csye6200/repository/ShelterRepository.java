package edu.neu.csye6200.repository;

import edu.neu.csye6200.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShelterRepository extends JpaRepository<Shelter, Integer> {
}
