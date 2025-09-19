import React, { useEffect, useState } from "react";
import { getInventoryItems, getItemsByShelter } from "../../services/inventoryService";
import { createDistribution } from "../../services/distributionService";
import { useNavigate } from "react-router-dom";
import { getShelters } from "../../services/shelterService"; // Fetch shelter list
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MakeDistribution = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [distributionQuantity, setDistributionQuantity] = useState(0);
  const [openDistributeDialog, setOpenDistributeDialog] = useState(false);
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadInventoryItems();
    loadShelters();
  }, []);

  const loadInventoryItems = async () => {
    const data = await getInventoryItems();
    setInventoryItems(data);
  };

   const loadShelters = async () => {
      const data = await getShelters();
      setShelters(data);
    };
  

  const handleDistribute = (item) => {
    setSelectedItem(item);
    setOpenDistributeDialog(true);
  };

  const confirmDistribution = async () => {
    if (distributionQuantity <= 0 || distributionQuantity > selectedItem.quantity) {
      alert("Invalid quantity.");
      return;
    }

    try {
      await createDistribution({
        itemId: selectedItem.itemId,
        itemName: selectedItem.itemName,
        quantity: distributionQuantity,
      });

      // Refresh inventory list after distribution
      loadInventoryItems();
      setOpenDistributeDialog(false);
      setDistributionQuantity(0);
    } catch (error) {
      console.error("Error creating distribution:", error);
      alert("Failed to distribute item.");
    }
  };

  const handleFilterChange = async (event) => {
    const shelterId = event.target.value;
    setSelectedShelter(shelterId);

    if (shelterId) {
      const data = await getItemsByShelter(shelterId);
      setInventoryItems(data);
    } else {
      loadInventoryItems(); // Load all items if no filter is selected
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">
          Inventory List
        </Typography>
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedShelter}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Shelters</em>
              </MenuItem>
              {shelters.map((shelter) => (
                <MenuItem key={shelter.shelterId} value={shelter.shelterId}>
                  {shelter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => navigate("/inventory/add")}>
            Add Item
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="inventory-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Shelter</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.shelter.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDistribute(item)}
                  >
                    Distribute
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Distribute Dialog */}
      <Dialog open={openDistributeDialog} onClose={() => setOpenDistributeDialog(false)}>
        <DialogTitle>Distribute Item</DialogTitle>
        <DialogContent>
          <Typography>
            Distribute {selectedItem?.itemName} (Available: {selectedItem?.quantity})
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={distributionQuantity}
            onChange={(e) => setDistributionQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDistributeDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDistribution} color="primary">
            Distribute
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MakeDistribution;