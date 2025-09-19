import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Grid,
} from "@mui/material";

const AddDonation = () => {
  const [users, setUsers] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [existingItems, setExistingItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [shelterId, setShelterId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isNewItem, setIsNewItem] = useState(false);

  const baseURL = "http://localhost:8000"; // Adjust the API endpoint as necessary

  // Fetch users, shelters, and inventory items
  useEffect(() => {
    axios
      .get(`${baseURL}/api/users`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get(`${baseURL}/api/shelters`)
      .then((response) => setShelters(response.data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);

  // Fetch inventory items based on the selected shelter
  useEffect(() => {
    if (shelterId) {
      axios
        .get(`${baseURL}/api/inventory/shelter/${shelterId}`)
        .then((response) => setExistingItems(response.data))
        .catch((error) => console.error("Error fetching items:", error));
    }
  }, [shelterId]);

  const handleAddDonation = async () => {
    try {
      let itemId;

      if (isNewItem) {
        // Add a new item
        const newItemResponse = await axios.post(`${baseURL}/api/inventory`, {
          itemName,
          description: itemDescription,
          quantity,
          shelterId,
        });
        itemId = newItemResponse.data.itemId;
      } else {
        // Use existing item and update its quantity
        const existingItem = existingItems.find(
          (item) => item.itemName === itemName
        );
        if (!existingItem) {
          alert("Invalid item selected.");
          return;
        }
        itemId = existingItem.itemId;
        await axios.put(`${baseURL}/api/inventory/${itemId}`, {
          quantity: existingItem.quantity + Number(quantity),
        });
      }

      // Create a new donation
      const donationResponse = await axios.post(`${baseURL}/api/donations`, {
        userId,
      });
      const donationId = donationResponse.data.donationId;

      // Create a donation-item entry
      await axios.post(`${baseURL}/api/donation-items`, {
        donationId,
        itemId,
        quantity,
      });

      alert("Donation added successfully!");
    } catch (error) {
      console.error("Error adding donation:", error);
      alert("Failed to add donation. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Donation
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <MenuItem value="" disabled>
                Select a user
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="shelter-select-label">Shelter</InputLabel>
            <Select
              labelId="shelter-select-label"
              value={shelterId}
              onChange={(e) => setShelterId(e.target.value)}
            >
              <MenuItem value="" disabled>
                Select a shelter
              </MenuItem>
              {shelters.map((shelter) => (
                <MenuItem key={shelter.shelterId} value={shelter.shelterId}>
                  {shelter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                setIsNewItem(e.target.value === "new");
              }}
            >
              <MenuItem value="" disabled>
                Select an item
              </MenuItem>
              {existingItems.map((item) => (
                <MenuItem key={item.itemId} value={item.itemName}>
                  {item.itemName}
                </MenuItem>
              ))}
              <MenuItem value="new">Add New Item</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {isNewItem && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddDonation}
          >
            Donate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDonation;
