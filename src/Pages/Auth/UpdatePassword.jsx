
import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import Layout from "../../CommonComponent/Layout";
import { useAuth } from "../../Context/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../CommonComponent/Loading";

const defaultTheme = createTheme();

const UpdatePassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const upData={
      user_id:auth?.user?._id,
      password:data.password
    }
    try {
      const response = await axios.post(
        "https://restapinodejs.onrender.com/api/update-password",
        upData,
        {
          headers: {
            "x-access-token": auth?.token,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response?.data?.msg);
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error?.response?.data?.message || "An error occurred");
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={5}
            style={{ padding: "1rem 2rem 2rem 2rem", marginTop: "2rem" }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="New Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters long",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />

                {!loading ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Password
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    
                  >
                    <Loading />
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default UpdatePassword;
