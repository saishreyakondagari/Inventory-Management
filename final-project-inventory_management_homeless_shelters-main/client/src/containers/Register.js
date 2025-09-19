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
  import { register } from "../services/authAPIs"; // Import the register API function
  import routes from "../constants/routes.json";
  
  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
  
      // Validate password match
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
      }
  
      // Consolidate body object
      const body = {
        name: name,
        email: email,
        password: password,
        role: {
          roleId: 4, // Default roleId for new users
        },
      };
  
      try {
        // Call the register API
        const response = await register(body);
  
        // Handle success
        setMessage("Registration successful! Please log in.");
        console.log(response.data);
      } catch (error) {
        // Handle errors
        if (error.response) {
          setMessage(`Error: ${error.response.data.message}`);
        } else {
          setMessage("An unexpected error occurred.");
        }
        console.error(error);
      } finally {
        setLoading(false);
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
        <Paper elevation={10} sx={{ padding: 2, height: "550px", width: "100%" }}>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
            <TextField
              placeholder="Enter full name"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              placeholder="Enter email"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              placeholder="Enter password"
              fullWidth
              required
              type="password"
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              placeholder="Confirm password"
              fullWidth
              required
              type="password"
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
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
              <Link component={RouterLink} to={routes.LOGIN}>
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  };
  
  export default Register;
  