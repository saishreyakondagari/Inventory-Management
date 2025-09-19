import React, { useState, useEffect } from "react";
import { addShelter, getShelterById, updateShelter } from "../../services/shelterService";
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
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
const ReusableField = ({ label, name, value, onChange, error, required }) => {
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
      />
      {error && <Typography variant="body2" color="error">{error}</Typography>}
    </Grid>
  );
};

const ShelterForm = () => {
  const [shelter, setShelter] = useState({
    name: "",
    address: "",
    contact: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    address: null,
    contact: null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadShelter();
  }, [id]);

  const loadShelter = async () => {
    setLoading(true);
    try {
      const data = await getShelterById(id);
      setShelter(data);
    } catch (error) {
      console.error("Failed to load shelter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShelter({ ...shelter, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shelter.name) newErrors.name = 'Name is required';
    if (!shelter.address) newErrors.address = 'Address is required';
    if (!shelter.contact) newErrors.contact = 'Contact is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (id) await updateShelter(id, shelter);
      else await addShelter(shelter);
      navigate("/shelters");
    } catch (error) {
      console.error("Failed to save shelter:", error);
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
                {id ? "Edit Shelter" : "Add New Shelter"}
              </Typography>
            }
            action={
              <Tooltip title="Close">
                <Button onClick={() => navigate("/shelters")}>x</Button>
              </Tooltip>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <ReusableField
                  label="Shelter Name"
                  name="name"
                  value={shelter.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <ReusableField
                  label="Address"
                  name="address"
                  value={shelter.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                />
                <ReusableField
                  label="Contact"
                  name="contact"
                  value={shelter.contact}
                  onChange={handleChange}
                  error={errors.contact}
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

export default ShelterForm;
