import React, { useEffect, useState } from "react";
import { getDistributions } from "../../services/distributionService"; // Service for fetching distributions
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const DistributionList = () => {
  const [distributions, setDistributions] = useState([]);

  // Fetch all distributions on component mount
  useEffect(() => {
    loadDistributions();
  }, []);

  const loadDistributions = async () => {
    try {
      const data = await getDistributions();
      console.log(data)
      setDistributions(data);
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" component="h1" mb={2}>
        Distribution List
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="distribution-table">
          <TableHead>
            <TableRow>
              <TableCell>Distribution ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Distribution Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributions.map((distribution) => (
              <TableRow key={distribution.distributionId}>
                <TableCell>{distribution.distributionId}</TableCell>
                <TableCell>{distribution.itemName}</TableCell>
                <TableCell>{distribution.itemId}</TableCell>
                <TableCell>{distribution.quantity}</TableCell>
                <TableCell>
                  {new Date(distribution.distributionDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DistributionList;