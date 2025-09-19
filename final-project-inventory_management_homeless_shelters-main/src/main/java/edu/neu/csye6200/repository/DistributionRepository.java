package edu.neu.csye6200.repository;

import edu.neu.csye6200.model.Distribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributionRepository extends JpaRepository<Distribution, Integer> {
}
