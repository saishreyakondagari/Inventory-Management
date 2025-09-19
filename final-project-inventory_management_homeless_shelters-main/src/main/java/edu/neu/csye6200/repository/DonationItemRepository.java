package edu.neu.csye6200.repository;

import edu.neu.csye6200.model.DonationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationItemRepository extends JpaRepository<DonationItem, Integer> {
}
