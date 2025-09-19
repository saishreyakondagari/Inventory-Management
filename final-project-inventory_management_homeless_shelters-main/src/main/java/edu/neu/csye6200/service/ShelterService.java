package edu.neu.csye6200.service;

import edu.neu.csye6200.model.Shelter;
import edu.neu.csye6200.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShelterService {

    @Autowired
    private ShelterRepository shelterRepository;

    // Add a new shelter
    public Shelter addShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }

    // Get all shelters
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    // Get a shelter by ID
    public Shelter getShelterById(int id) {
        return shelterRepository.findById(id).orElseThrow(() -> new RuntimeException("Shelter not found"));
    }

    // Update a shelter
    public Shelter updateShelter(int id, Shelter updatedShelter) {
        return shelterRepository.findById(id).map(shelter -> {
            shelter.setName(updatedShelter.getName());
            shelter.setAddress(updatedShelter.getAddress());
            shelter.setContact(updatedShelter.getContact());
            return shelterRepository.save(shelter);
        }).orElseThrow(() -> new RuntimeException("Shelter not found"));
    }

    // Delete a shelter
    public void deleteShelter(int id) {
        shelterRepository.deleteById(id);
    }
}
