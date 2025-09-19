import React, { useEffect, useState } from "react";
import { getShelters, deleteShelter } from "../../services/shelterService";
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
  Stack,
  Divider,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ConfirmDialog from './ConfirmDialog';

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ShelterList = () => {
  const [shelters, setShelters] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedShelterId, setSelectedShelterId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    const data = await getShelters();
    setShelters(data);
  };

  const handleDelete = (id) => {
    setSelectedShelterId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    await deleteShelter(selectedShelterId);
    loadShelters(); // Refresh the list
  };

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">
          Shelter List
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/shelters/add")}>
          Add Shelter
        </Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelters.map((shelter) => (
              <TableRow key={shelter.shelterId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{shelter.name}</TableCell>
                <TableCell>{shelter.address}</TableCell>
                <TableCell>{shelter.contact}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/shelters/edit/${shelter.shelterId}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(shelter.shelterId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <ConfirmDialog
        title="Delete Shelter"
        description="Are you sure you want to delete this shelter?"
        open={openConfirmDialog}
        setOpen={(open) => setOpenConfirmDialog(open)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default ShelterList;
