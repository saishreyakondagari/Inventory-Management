package edu.neu.csye6200.repository;

import edu.neu.csye6200.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryItem, Integer> {
	List<InventoryItem> findByShelter_ShelterId(int shelterId);
	List<InventoryItem> findByItemNameContainingIgnoreCase(String itemName);
	InventoryItem findByItemNameAndShelter_ShelterId(String itemName, int shelterId);
}
