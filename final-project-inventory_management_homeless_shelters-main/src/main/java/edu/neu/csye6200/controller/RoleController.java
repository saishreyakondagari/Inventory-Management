package edu.neu.csye6200.controller;

import edu.neu.csye6200.model.Role;
import edu.neu.csye6200.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable int id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    @PutMapping("/{id}")
    public Role updateRole(@PathVariable int id, @RequestBody Role roleDetails) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
        role.setRoleType(roleDetails.getRoleType());
        role.setDescription(roleDetails.getDescription());
        return roleRepository.save(role);
    }

    @DeleteMapping("/{id}")
    public String deleteRole(@PathVariable int id) {
        roleRepository.deleteById(id);
        return "Role deleted successfully!";
    }
}
