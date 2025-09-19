import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authAPIs"; // Import the login function
import CustomisedSnackbar from '../components/snackbar';
import { useNavigate } from "react-router-dom";
import routes from "../constants/routes.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setLoading(true); // Show loading indicator
    setMessage(""); // Clear previous messages

    try {
      // Call the login function from authAPI.js
      const response = await login(email, password);
      if (response.status == 200) {
        // Handle successful login
        setOpenSnackbar(true);
        setSnackbarMessage("Login successful!");
        // Redirect to home page
        navigate(routes.HOME);
        sessionStorage.setItem("ID", response.data.data.userId);
        sessionStorage.setItem("Name", response.data.data.name);
        sessionStorage.setItem("Email", response.data.data.email);
        sessionStorage.setItem("Role", response.data.data.roleType);
      }
      console.log(response.data); // Process the response as needed
    } catch (error) {
      // Handle error response
      if (error.response) {
        setOpenSnackbar(true);
        setSnackbarMessage(error.response.data.message);
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage("An unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomisedSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
        clickHandler={() => setOpenSnackbar(false)}
      />
      <Paper elevation={10} sx={{ padding: 2, height: "400px", width: "100%" }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
            mt: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
          <TextField
            placeholder="Enter email"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <TextField
            placeholder="Enter password"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>
        {message && (
          <Typography
            color={message.startsWith("Error") ? "error" : "primary"}
            sx={{ mt: 2, textAlign: "center" }}
          >
            {message}
          </Typography>
        )}
        <Grid container justifyContent="right" sx={{ mt: 1 }}>
          <Grid item>
            <Link component={RouterLink} to="/register">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginPage;
