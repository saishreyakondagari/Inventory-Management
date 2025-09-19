package edu.neu.csye6200.controller;

import edu.neu.csye6200.model.Shelter;
import edu.neu.csye6200.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/shelters")
public class ShelterController {

    @Autowired
    private ShelterService shelterService;

    // Add a new shelter
    @PostMapping
    public Shelter addShelter(@RequestBody Shelter shelter) {
        return shelterService.addShelter(shelter);
    }

    // Get all shelters
    @GetMapping
    public List<Shelter> getAllShelters() {
        return shelterService.getAllShelters();
    }

    // Get a shelter by ID
    @GetMapping("/{id}")
    public Shelter getShelterById(@PathVariable int id) {
        return shelterService.getShelterById(id);
    }

    // Update a shelter
    @PutMapping("/{id}")
    public Shelter updateShelter(@PathVariable int id, @RequestBody Shelter updatedShelter) {
        return shelterService.updateShelter(id, updatedShelter);
    }

    // Delete a shelter
    @DeleteMapping("/{id}")
    public void deleteShelter(@PathVariable int id) {
        shelterService.deleteShelter(id);
    }
}
