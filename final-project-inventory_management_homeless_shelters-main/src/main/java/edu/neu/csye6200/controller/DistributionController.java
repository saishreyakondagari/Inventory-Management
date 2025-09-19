package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.DistributionDTO;
import edu.neu.csye6200.service.DistributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/distributions")
public class DistributionController {

    @Autowired
    private DistributionService distributionService;

    // Create Distribution
    @PostMapping
    public ResponseEntity<DistributionDTO> createDistribution(@RequestBody DistributionDTO distributionDTO) {
        return ResponseEntity.ok(distributionService.createDistribution(distributionDTO));
    }

    // Get All Distributions
    @GetMapping
    public ResponseEntity<List<DistributionDTO>> getAllDistributions() {
        return ResponseEntity.ok(distributionService.getAllDistributions());
    }

    // Get Distribution By ID
    @GetMapping("/{id}")
    public ResponseEntity<DistributionDTO> getDistributionById(@PathVariable Integer id) {
        return ResponseEntity.ok(distributionService.getDistributionById(id));
    }

    // Update Distribution
    @PutMapping("/{id}")
    public ResponseEntity<DistributionDTO> updateDistribution(
            @PathVariable Integer id, @RequestBody DistributionDTO distributionDTO) {
        return ResponseEntity.ok(distributionService.updateDistribution(id, distributionDTO));
    }

    // Delete Distribution
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDistribution(@PathVariable Integer id) {
        distributionService.deleteDistribution(id);
        return ResponseEntity.ok("Distribution deleted successfully");
    }
}
