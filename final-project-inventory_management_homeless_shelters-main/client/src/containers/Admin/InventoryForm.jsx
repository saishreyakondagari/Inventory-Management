import React, { useState, useEffect } from "react";
import {
  addInventoryItem,
  getInventoryById,
  updateInventoryItem,
} from "../../services/inventoryService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Fade,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
  overflow: 'visible',
}));

const FormTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Reusable Field Component
const ReusableField = ({ label, name, value, onChange, error, required, type = 'text' }) => {
  return (
    <Grid item xs={12}>
      <FormTextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        variant="outlined"
        error={!!error}
        helperText={error}
        type={type}
      />
      {error && <Typography variant="body2" color="error">{error}</Typography>}
    </Grid>
  );
};

const InventoryForm = () => {
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    quantity: 0,
    shelter: { shelterId: "" },
  });
  const [errors, setErrors] = useState({
    itemName: null,
    description: null,
    quantity: null,
    shelterId: null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadInventoryItem();
  }, [id]);

  const loadInventoryItem = async () => {
    setLoading(true);
    try {
      const data = await getInventoryById(id);
      setItem(data);
    } catch (error) {
      console.error("Error loading inventory item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleShelterChange = (e) => {
    setItem({
      ...item,
      shelter: { shelterId: e.target.value },
    });
    setErrors({ ...errors, shelterId: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!item.itemName) newErrors.itemName = 'Item Name is required';
    if (!item.description) newErrors.description = 'Description is required';
    if (!item.quantity || item.quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    if (!item.shelter.shelterId) newErrors.shelterId = 'Shelter ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (id) {
        await updateInventoryItem(id, item);
      } else {
        await addInventoryItem(item);
      }
      navigate("/inventory");
    } catch (error) {
      console.error("Error saving inventory item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '600px', mx: 'auto' }}>
      <Fade in={true}>
        <StyledCard>
          <CardHeader
            title={
              <Typography variant="h4" color="primary">
                {id ? "Edit Inventory Item" : "Add Inventory Item"}
              </Typography>
            }
            action={
              <Tooltip title="Close">
                <IconButton onClick={() => navigate("/inventory")}>
                  <Close />
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <ReusableField
                  label="Item Name"
                  name="itemName"
                  value={item.itemName}
                  onChange={handleChange}
                  error={errors.itemName}
                  required
                />
                <ReusableField
                  label="Description"
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                  error={errors.description}
                />
                <ReusableField
                  label="Quantity"
                  name="quantity"
                  value={item.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                  type="number"
                  required
                />
                <ReusableField
                  label="Shelter ID"
                  name="shelterId"
                  value={item.shelter.shelterId}
                  onChange={handleShelterChange}
                  error={errors.shelterId}
                  required
                />
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </StyledCard>
      </Fade>
    </Box>
  );
};

export default InventoryForm;
