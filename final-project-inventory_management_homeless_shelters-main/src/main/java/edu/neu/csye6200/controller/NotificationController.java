package edu.neu.csye6200.controller;

import edu.neu.csye6200.model.InventoryItem;
import edu.neu.csye6200.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

   @Autowired
   private NotificationService notificationService;

   // Endpoint to fetch low stock items
   @GetMapping("/low-stock")
   public List<InventoryItem> getLowStockItems() {
      return notificationService.getLowStockItems();
   }

   // Endpoint to fetch most available items
   @GetMapping("/most-available")
   public List<InventoryItem> getMostAvailableItems() {
      return notificationService.getMostAvailableItems();
   }
}