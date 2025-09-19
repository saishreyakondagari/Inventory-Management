import React, { useEffect, useState } from "react";
import { getInventoryItems, deleteInventoryItem, getItemsByShelter } from "../../services/inventoryService";
import { getShelters } from "../../services/shelterService"; // Fetch shelter list
import { useNavigate } from "react-router-dom";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ConfirmDialog from './ConfirmDialog';

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  // Load shelters and items on component mount
  useEffect(() => {
    loadShelters();
    loadInventoryItems();
  }, []);

  // Fetch all shelters
  const loadShelters = async () => {
    const data = await getShelters();
    setShelters(data);
  };

  // Fetch all inventory items
  const loadInventoryItems = async () => {
    const data = await getInventoryItems();
    setInventoryItems(data);
  };

  // Fetch items based on shelter selection
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

  // Handle item deletion
  const handleDelete = (id) => {
    setSelectedItemId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    await deleteInventoryItem(selectedItemId);
    loadInventoryItems(); // Refresh list
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">
          Inventory List
        </Typography>
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 200 }}>
            {/* <InputLabel id="shelter-filter-label">Filter by Shelter</InputLabel> */}
            <Select
              labelId="shelter-filter-label"
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
                    onClick={() => navigate(`/inventory/edit/${item.itemId}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.itemId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <ConfirmDialog
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        open={openConfirmDialog}
        setOpen={(open) => setOpenConfirmDialog(open)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default InventoryList;
